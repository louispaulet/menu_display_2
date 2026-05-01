import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../../worker/menu-extractor.js';

const {
  MAX_UPLOAD_BYTES,
  parseOpenAIResponse,
  validateMenuImage,
} = worker.__test;

const sampleMenu = {
  restaurantName: 'Cafe Lumiere',
  menuTitle: 'Dinner',
  subtitle: 'Spring',
  language: 'en',
  currency: 'EUR',
  sections: [
    {
      name: 'Starters',
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

test('GET /api/health returns ok with cors headers', async () => {
  const response = await worker.fetch(
    new Request('https://menus.example/api/health', {
      headers: { Origin: 'http://localhost:5173' },
    }),
    {
      ALLOWED_ORIGINS: 'http://localhost:5173',
    },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173');
  assert.deepEqual(await response.json(), { ok: true });
});

test('OPTIONS /api/menu-extractions returns cors preflight response', async () => {
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

  assert.equal(response.status, 204);
  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173');
  assert.match(response.headers.get('access-control-allow-methods'), /POST/);
});

test('validateMenuImage rejects unsupported file types', () => {
  const file = new File(['not an image'], 'menu.txt', { type: 'text/plain' });

  assert.throws(
    () => validateMenuImage(file),
    /Upload a JPEG, PNG, or WebP menu image/,
  );
});

test('validateMenuImage rejects oversized images', () => {
  const file = new File([new Uint8Array(MAX_UPLOAD_BYTES + 1)], 'menu.png', { type: 'image/png' });

  assert.throws(
    () => validateMenuImage(file),
    /Keep the menu image under 10MB/,
  );
});

test('parseOpenAIResponse extracts structured menu JSON and metadata', () => {
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

  assert.deepEqual(parsed, sampleMenu);
});

test('POST /api/menu-extractions rejects invalid uploads before calling OpenAI', async () => {
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

  assert.equal(response.status, 415);
  assert.match((await response.json()).error.message, /Upload a JPEG, PNG, or WebP menu image/);
});
