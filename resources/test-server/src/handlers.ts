import { HttpHandler } from 'msw';
import { fromOpenApi } from '@mswjs/source/open-api';
import { customHandlers } from './handlers/custom/index.js';
import algodSpec from '../algod.oas3.json' assert { type: 'json' };

// Layer 3: OpenAPI-generated handlers (baseline)
// Modify the spec to use our mock server URL
const mockSpec = {
  ...algodSpec,
  servers: [{ url: 'http://mock' }]
};
const openApiHandlers = await fromOpenApi(mockSpec as any);

// Layer 2: HAR recordings (will be added when HAR files are available)
// import { fromHar } from '@mswjs/source/har';
// const harHandlers = await fromHar('./recordings/*.har');

export const handlers: HttpHandler[] = [
  // Layer 1: Custom handlers (highest priority)
  ...customHandlers,

  // Layer 2: HAR recordings (uncomment when HAR files are added)
  // ...harHandlers,

  // Layer 3: OpenAPI baseline (fallback)
  ...openApiHandlers,
];