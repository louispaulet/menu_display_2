const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-5.4-mini';
const DEFAULT_IMAGE_DETAIL = 'high';
const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://exquisite-menus-2.thefrenchartist.dev',
  'https://exquisite-menus.thefrenchartist.dev',
];
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const menuSchema = {
  type: 'object',
  properties: {
    restaurantName: {
      anyOf: [{ type: 'string' }, { type: 'null' }],
      description: 'Restaurant name printed on the menu, or null if not visible.',
    },
    menuTitle: {
      anyOf: [{ type: 'string' }, { type: 'null' }],
      description: 'Menu title such as Dinner, Brunch, Cocktails, or null if absent.',
    },
    subtitle: {
      anyOf: [{ type: 'string' }, { type: 'null' }],
      description: 'Menu subtitle, date, season, or short contextual line, or null if absent.',
    },
    language: {
      anyOf: [{ type: 'string' }, { type: 'null' }],
      description: 'Primary language code or language name inferred from the menu.',
    },
    currency: {
      anyOf: [{ type: 'string' }, { type: 'null' }],
      description: 'Currency symbol or ISO code used by prices, or null if absent.',
    },
    sections: {
      type: 'array',
      description: 'Menu sections in reading order.',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Section heading. Use General if no explicit heading is visible.',
          },
          notes: {
            type: 'array',
            description: 'Visible section-wide notes, serving-size legends, sauce defaults, or preparation notes that apply to multiple items.',
            items: { type: 'string' },
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Dish, drink, or menu item name exactly as read, cleaned of OCR noise.',
                },
                description: {
                  anyOf: [{ type: 'string' }, { type: 'null' }],
                  description: 'Item description or ingredient line, or null if absent.',
                },
                price: {
                  anyOf: [{ type: 'string' }, { type: 'null' }],
                  description: 'Price exactly as shown, preserving symbols and decimals, or null if absent.',
                },
                dietaryTags: {
                  type: 'array',
                  description: 'Visible dietary markers only, such as vegetarian, vegan, gluten-free, spicy.',
                  items: { type: 'string' },
                },
                notes: {
                  anyOf: [{ type: 'string' }, { type: 'null' }],
                  description: 'Small visible notes tied only to this item, or null if absent.',
                },
              },
              required: ['name', 'description', 'price', 'dietaryTags', 'notes'],
              additionalProperties: false,
            },
          },
        },
        required: ['name', 'notes', 'items'],
        additionalProperties: false,
      },
    },
    extractionWarnings: {
      type: 'array',
      description: 'Warnings for cropped, blurry, ambiguous, or unreadable parts of the menu.',
      items: { type: 'string' },
    },
    sourceConfidence: {
      type: 'string',
      enum: ['low', 'medium', 'high'],
      description: 'Overall confidence in the extraction.',
    },
  },
  required: [
    'restaurantName',
    'menuTitle',
    'subtitle',
    'language',
    'currency',
    'sections',
    'extractionWarnings',
    'sourceConfidence',
  ],
  additionalProperties: false,
};

class HttpError extends Error {
  constructor(status, message, code = 'request_failed') {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
  }
}

function parseAllowedOrigins(env = {}) {
  const configured = env.ALLOWED_ORIGINS;
  if (!configured) return DEFAULT_ALLOWED_ORIGINS;

  return configured
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function getCorsHeaders(request, env = {}) {
  const origin = request.headers.get('Origin');
  const allowedOrigins = parseAllowedOrigins(env);
  const allowOrigin = origin && (allowedOrigins.includes('*') || allowedOrigins.includes(origin))
    ? origin
    : null;

  return {
    ...(allowOrigin ? { 'Access-Control-Allow-Origin': allowOrigin, Vary: 'Origin' } : {}),
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(body, status, request, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...getCorsHeaders(request, env),
    },
  });
}

function noContentResponse(request, env) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, env),
  });
}

function errorResponse(error, request, env) {
  const status = error instanceof HttpError ? error.status : 500;
  const code = error instanceof HttpError ? error.code : 'internal_error';
  const message = error instanceof Error ? error.message : 'Something went wrong.';

  return jsonResponse({ error: { code, message } }, status, request, env);
}

function validateMenuImage(file) {
  if (!file || typeof file.arrayBuffer !== 'function') {
    throw new HttpError(400, 'Upload a menu image using the menuImage field.', 'missing_menu_image');
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new HttpError(415, 'Upload a JPEG, PNG, or WebP menu image.', 'unsupported_media_type');
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    throw new HttpError(413, 'Keep the menu image under 10MB.', 'payload_too_large');
  }
}

function encodeBase64(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const chunkSize = 0x8000;
  let binary = '';

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
}

async function fileToDataUrl(file) {
  const base64 = encodeBase64(await file.arrayBuffer());
  return `data:${file.type};base64,${base64}`;
}

function findOutputText(openAIResponse) {
  if (typeof openAIResponse.output_text === 'string') return openAIResponse.output_text;

  for (const outputItem of openAIResponse.output ?? []) {
    for (const contentItem of outputItem.content ?? []) {
      if (contentItem.type === 'refusal') {
        throw new HttpError(422, contentItem.refusal || 'The model refused to extract this menu.', 'model_refusal');
      }

      if (contentItem.type === 'output_text' && typeof contentItem.text === 'string') {
        return contentItem.text;
      }
    }
  }

  throw new HttpError(502, 'OpenAI did not return menu JSON.', 'invalid_openai_response');
}

function assertMenuShape(menu) {
  if (!menu || typeof menu !== 'object' || Array.isArray(menu)) {
    throw new HttpError(502, 'OpenAI returned an invalid menu object.', 'invalid_openai_response');
  }

  if (!Array.isArray(menu.sections)) {
    throw new HttpError(502, 'OpenAI returned a menu without sections.', 'invalid_openai_response');
  }

  for (const section of menu.sections) {
    if (!section || typeof section.name !== 'string' || !Array.isArray(section.items)) {
      throw new HttpError(502, 'OpenAI returned an invalid section.', 'invalid_openai_response');
    }

    if (section.notes !== undefined && !Array.isArray(section.notes)) {
      throw new HttpError(502, 'OpenAI returned invalid section notes.', 'invalid_openai_response');
    }

    for (const item of section.items) {
      if (!item || typeof item.name !== 'string' || !Array.isArray(item.dietaryTags)) {
        throw new HttpError(502, 'OpenAI returned an invalid menu item.', 'invalid_openai_response');
      }
    }
  }
}

function cleanText(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim();
}

function addUnique(list, value) {
  const cleaned = cleanText(value);
  if (!cleaned) return;

  const hasMatch = list.some((existing) => existing.toLowerCase() === cleaned.toLowerCase());
  if (!hasMatch) list.push(cleaned);
}

function parseCompactPrice(price) {
  const cleaned = cleanText(price);
  if (!cleaned) return null;

  const match = cleaned.match(
    /^((?:\d+\/\d+|\d+(?:\.\d+)?)\s*(?:cup|cups|pt\.?|pts\.?|pint|pints|quart|quarts|qt\.?|qts\.?|oz\.?|ounce|ounces|slice|slices|piece|pieces|pc\.?|pcs\.?)\.?)\s+([$€£¥]?\s*\.?\d+(?:\.\d{1,2})?)$/i,
  );

  if (!match) return null;

  return {
    note: cleanText(match[1]),
    price: cleanText(match[2]),
  };
}

function mergeItemNote(existingNote, noteToAdd) {
  const notes = [];
  addUnique(notes, existingNote);
  addUnique(notes, noteToAdd);

  if (notes.length === 0) return null;
  return notes.join(' · ');
}

function normalizeItem(item) {
  const normalized = {
    ...item,
    description: item.description === undefined ? null : item.description,
    price: item.price === undefined ? null : item.price,
    dietaryTags: Array.isArray(item.dietaryTags) ? item.dietaryTags : [],
    notes: item.notes === undefined ? null : item.notes,
  };

  const compactPrice = parseCompactPrice(normalized.price);
  if (compactPrice) {
    normalized.price = compactPrice.price;
    normalized.notes = mergeItemNote(normalized.notes, compactPrice.note);
  }

  const cleanedNote = cleanText(normalized.notes);
  normalized.notes = cleanedNote || null;

  return normalized;
}

function normalizeSection(section) {
  const sectionNotes = [];
  for (const note of section.notes ?? []) addUnique(sectionNotes, note);

  const items = section.items.map(normalizeItem);
  const noteCounts = new Map();

  for (const item of items) {
    if (!item.notes) continue;
    const key = item.notes.toLowerCase();
    noteCounts.set(key, {
      count: (noteCounts.get(key)?.count ?? 0) + 1,
      text: item.notes,
    });
  }

  const notesToHoist = new Set();
  for (const [key, note] of noteCounts) {
    if (note.count > 1) {
      notesToHoist.add(key);
      addUnique(sectionNotes, note.text);
    }
  }

  const normalizedItems = items.map((item) => (
    item.notes && notesToHoist.has(item.notes.toLowerCase())
      ? { ...item, notes: null }
      : item
  ));

  return {
    ...section,
    notes: sectionNotes,
    items: normalizedItems,
  };
}

function normalizeMenu(menu) {
  return {
    ...menu,
    sections: menu.sections.map(normalizeSection),
  };
}

function parseOpenAIResponse(openAIResponse) {
  if (openAIResponse.status === 'incomplete') {
    throw new HttpError(502, 'OpenAI could not finish extracting the menu.', 'incomplete_openai_response');
  }

  const text = findOutputText(openAIResponse);
  let menu;

  try {
    menu = JSON.parse(text);
  } catch {
    throw new HttpError(502, 'OpenAI returned malformed menu JSON.', 'invalid_openai_response');
  }

  assertMenuShape(menu);
  return normalizeMenu(menu);
}

async function callOpenAI({ dataUrl, env }) {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new HttpError(500, 'OPENAI_API_KEY is not configured.', 'missing_openai_key');
  }

  const model = env.OPENAI_MENU_MODEL || DEFAULT_MODEL;
  const detail = env.OPENAI_IMAGE_DETAIL || DEFAULT_IMAGE_DETAIL;
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      store: false,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: [
                'You extract restaurant menu information from uploaded menu photos.',
                'Return only facts visible in the image. Do not invent images, pairings, recipes, prices, or missing items.',
                'Preserve section order and item order. Clean obvious OCR artifacts while keeping menu wording faithful.',
                'Put repeated service lines, serving-size legends, sauce defaults, and notes that apply to multiple items in section notes, not on every item.',
                'Use item notes only for notes unique to that item. If a serving size is printed next to a price, keep the serving size in notes and the numeric amount in price.',
              ].join(' '),
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: 'Extract this menu into the requested JSON shape so the app can render a polished text-only menu with section notes and clean item prices.',
            },
            {
              type: 'input_image',
              image_url: dataUrl,
              detail,
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'menu_extraction',
          description: 'Structured menu information extracted from a menu photo.',
          strict: true,
          schema: menuSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    let message = `OpenAI request failed with status ${response.status}.`;
    try {
      const body = await response.json();
      message = body?.error?.message || message;
    } catch {
      // Keep the status-only message if OpenAI returns a non-JSON error.
    }
    throw new HttpError(502, message, 'openai_request_failed');
  }

  return { body: await response.json(), model, detail };
}

async function handleMenuExtraction(request, env) {
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    throw new HttpError(415, 'Upload the menu as multipart/form-data.', 'unsupported_media_type');
  }

  const formData = await request.formData();
  const file = formData.get('menuImage');
  validateMenuImage(file);

  const dataUrl = await fileToDataUrl(file);
  const openAIResponse = await callOpenAI({ dataUrl, env });
  const menu = parseOpenAIResponse(openAIResponse.body);

  return {
    menu,
    meta: {
      model: openAIResponse.model,
      detail: openAIResponse.detail,
      generatedAt: new Date().toISOString(),
    },
  };
}

async function routeRequest(request, env) {
  const url = new URL(request.url);

  if (request.method === 'OPTIONS') {
    return noContentResponse(request, env);
  }

  if (url.pathname === '/api/health' && request.method === 'GET') {
    return jsonResponse({ ok: true }, 200, request, env);
  }

  if (url.pathname === '/api/menu-extractions' && request.method === 'POST') {
    const result = await handleMenuExtraction(request, env);
    return jsonResponse(result, 200, request, env);
  }

  return jsonResponse(
    { error: { code: 'not_found', message: 'Not found.' } },
    404,
    request,
    env,
  );
}

export default {
  async fetch(request, env = {}) {
    try {
      return await routeRequest(request, env);
    } catch (error) {
      return errorResponse(error, request, env);
    }
  },
  __test: {
    MAX_UPLOAD_BYTES,
    normalizeMenu,
    parseOpenAIResponse,
    validateMenuImage,
  },
};
