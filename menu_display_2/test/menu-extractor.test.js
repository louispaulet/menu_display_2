import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';

import worker from '../../worker/menu-extractor.js';

const {
  MAX_UPLOAD_BYTES,
  normalizeMenu,
  parseOpenAIResponse,
  validateMenuImage,
} = worker.__test;

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wellBeanExtraction = JSON.parse(
  readFileSync(join(__dirname, 'fixtures/well-bean-deli-extraction.json'), 'utf8'),
);

const sampleMenu = {
  restaurantName: 'Cafe Lumiere',
  menuTitle: 'Dinner',
  subtitle: 'Spring',
  language: 'en',
  currency: 'EUR',
  sections: [
    {
      name: 'Starters',
      notes: [],
      items: [
        {
          name: 'Asparagus Veloute',
          description: 'Green asparagus, herbs, creme fraiche',
          price: '14',
          dietaryTags: ['vegetarian'],
          notes: null,
        },
      ],
    },
  ],
  extractionWarnings: [],
  sourceConfidence: 'high',
};

describe('menu-extractor worker', () => {
  it('GET /api/health returns ok with cors headers', async () => {
    const response = await worker.fetch(
      new Request('https://menus.example/api/health', {
        headers: { Origin: 'http://localhost:5173' },
      }),
      {
        ALLOWED_ORIGINS: 'http://localhost:5173',
      },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
    expect(await response.json()).toEqual({ ok: true });
  });

  it('OPTIONS /api/menu-extractions returns cors preflight response', async () => {
    const response = await worker.fetch(
      new Request('https://menus.example/api/menu-extractions', {
        method: 'OPTIONS',
        headers: {
          Origin: 'http://localhost:5173',
          'Access-Control-Request-Method': 'POST',
        },
      }),
      {
        ALLOWED_ORIGINS: 'http://localhost:5173',
      },
    );

    expect(response.status).toBe(204);
    expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
    expect(response.headers.get('access-control-allow-methods')).toMatch(/POST/);
  });

  it('validateMenuImage rejects unsupported file types', () => {
    const file = new File(['not an image'], 'menu.txt', { type: 'text/plain' });

    expect(() => validateMenuImage(file)).toThrow(/Upload a JPEG, PNG, or WebP menu image/);
  });

  it('validateMenuImage rejects oversized images', () => {
    const file = new File([new Uint8Array(MAX_UPLOAD_BYTES + 1)], 'menu.png', { type: 'image/png' });

    expect(() => validateMenuImage(file)).toThrow(/Keep the menu image under 10MB/);
  });

  it('parseOpenAIResponse extracts structured menu JSON and metadata', () => {
    const parsed = parseOpenAIResponse({
      output: [
        {
          content: [
            {
              type: 'output_text',
              text: JSON.stringify(sampleMenu),
            },
          ],
        },
      ],
    });

    expect(parsed).toEqual(sampleMenu);
  });

  it('normalizeMenu hoists repeated item notes into section notes', () => {
    const repeatedNote = 'Served on a sesame bun with sprouts, tomato, sauce, and a pickle.';
    const parsed = normalizeMenu({
      ...sampleMenu,
      sections: [
        {
          name: 'Burgers',
          items: [
            {
              name: 'Tofu Burger',
              description: 'Fresh tofu patty',
              price: '2.25',
              dietaryTags: [],
              notes: repeatedNote,
            },
            {
              name: 'Tempeh Burger',
              description: 'Tempeh and brown rice',
              price: '2.25',
              dietaryTags: [],
              notes: repeatedNote,
            },
            {
              name: 'Falafel Burger',
              description: 'Chickpeas and tahini',
              price: '2.25',
              dietaryTags: [],
              notes: repeatedNote,
            },
          ],
        },
      ],
    });

    expect(parsed.sections[0].notes).toEqual([repeatedNote]);
    expect(parsed.sections[0].items.map((item) => item.notes)).toEqual([null, null, null]);
  });

  it('normalizeMenu separates serving-size labels from compact prices', () => {
    const parsed = normalizeMenu({
      ...sampleMenu,
      sections: [
        {
          name: 'Salads',
          items: [
            {
              name: 'Marinated Artichokes',
              description: null,
              price: '1/3 cup .95',
              dietaryTags: [],
              notes: '1/3 cup',
            },
            {
              name: 'Pimento Stuffed Olives',
              description: null,
              price: '1/2 cup .65',
              dietaryTags: [],
              notes: null,
            },
          ],
        },
      ],
    });

    expect(parsed.sections[0].items[0].price).toBe('.95');
    expect(parsed.sections[0].items[0].notes).toBe('1/3 cup');
    expect(parsed.sections[0].items[1].price).toBe('.65');
    expect(parsed.sections[0].items[1].notes).toBe('1/2 cup');
  });

  it('POST /api/menu-extractions rejects invalid uploads before calling OpenAI', async () => {
    const formData = new FormData();
    formData.set('menuImage', new File(['hello'], 'notes.txt', { type: 'text/plain' }));

    const response = await worker.fetch(
      new Request('https://menus.example/api/menu-extractions', {
        method: 'POST',
        body: formData,
        headers: { Origin: 'http://localhost:5173' },
      }),
      {
        ALLOWED_ORIGINS: 'http://localhost:5173',
        OPENAI_API_KEY: 'test-key',
      },
    );

    expect(response.status).toBe(415);
    expect((await response.json()).error.message).toMatch(/Upload a JPEG, PNG, or WebP menu image/);
  });

  describe('POST /api/menu-extractions with OpenAI mock', () => {
    const originalFetch = globalThis.fetch;
    
    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it('normalizes Well Bean Deli JSON returned by OpenAI', async () => {
      let openAIRequestBody;

      globalThis.fetch = vi.fn().mockImplementation(async (_url, init) => {
        openAIRequestBody = JSON.parse(init.body);

        return new Response(JSON.stringify({
          output: [
            {
              content: [
                {
                  type: 'output_text',
                  text: JSON.stringify(wellBeanExtraction.menu),
                },
              ],
            },
          ],
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      });

      const formData = new FormData();
      formData.set('menuImage', new File([new Uint8Array([1, 2, 3])], 'well-bean.webp', { type: 'image/webp' }));

      const response = await worker.fetch(
        new Request('https://menus.example/api/menu-extractions', {
          method: 'POST',
          body: formData,
          headers: { Origin: 'http://localhost:5173' },
        }),
        {
          ALLOWED_ORIGINS: 'http://localhost:5173',
          OPENAI_API_KEY: 'test-key',
          OPENAI_IMAGE_DETAIL: 'low',
          OPENAI_MENU_MODEL: 'gpt-test-menu',
        },
      );

      const body = await response.json();
      const burgers = body.menu.sections.find((section) => section.name === 'BURGERS');
      const salads = body.menu.sections.find((section) => section.name === 'SALADS');
      const artichokes = salads.items.find((item) => item.name === 'Marinated Artichokes');

      expect(response.status).toBe(200);
      expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
      expect(body.menu.restaurantName).toBe('The Well Bean Deli');
      expect(body.meta.model).toBe('gpt-test-menu');
      expect(body.meta.detail).toBe('low');
      expect(burgers.notes).toEqual([
        'Served on a ww. sesame bun with sprouts, tomato, our special sauce, marinade, and a dill pickle.',
      ]);
      expect(burgers.items.map((item) => item.notes)).toEqual(Array.from({ length: 7 }, () => null));
      expect(salads.notes).toEqual(['1/2 pt. / pt.']);
      expect(artichokes.price).toBe('.95');
      expect(artichokes.notes).toBe('1/3 cup');
      expect(openAIRequestBody.model).toBe('gpt-test-menu');
      expect(openAIRequestBody.text.format.strict).toBe(true);
    });
  });
});
