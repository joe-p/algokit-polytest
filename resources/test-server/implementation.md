# MSW + Fastify Mock Server Implementation Plan

## Goal
Create a minimal containerized mock server using MSW handlers exposed via Fastify for multi-language testing.

## Implementation Steps

### 1. Project Setup
```bash
mkdir msw-mock-server
cd msw-mock-server
npm init -y
npm install fastify msw
npm install -D typescript tsx @types/node
```

### 2. Core Files

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

**server.ts** (minimal implementation)
```typescript
import Fastify from 'fastify';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const mswServer = setupServer(...handlers);
mswServer.listen({ onUnhandledRequest: 'warn' });

const fastify = Fastify({ logger: true });

// Catch-all proxy through MSW
fastify.all('/*', async (request, reply) => {
  const url = `http://mock${request.url}`;
  
  const response = await fetch(url, {
    method: request.method,
    headers: request.headers as HeadersInit,
    body: request.method !== 'GET' && request.method !== 'HEAD'
      ? JSON.stringify(request.body)
      : undefined,
  });

  const data = await response.text();
  
  reply
    .code(response.status)
    .headers(Object.fromEntries(response.headers.entries()))
    .send(data);
});

await fastify.listen({ 
  port: Number(process.env.PORT) || 3000,
  host: '0.0.0.0' 
});
```

**handlers.ts** (empty starting point)
```typescript
import { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [
  // Add your MSW handlers here
];
```

**package.json scripts**
```json
{
  "scripts": {
    "start": "tsx server.ts"
  }
}
```

### 3. Docker

**Dockerfile**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

**.dockerignore**
```
node_modules
*.log
.git
```

### 4. Build and Run

```bash
# Local
npm start

# Docker
docker build -t msw-mock-server .
docker run -p 3000:3000 msw-mock-server
```

## Next Steps (During Implementation)
1. Add MSW handlers to `handlers.ts`
2. Optionally split handlers into separate files and import
3. Optionally add environment-based scenarios
4. Add HAR file parsing if needed

## What's Intentionally Missing
- No example endpoints (you'll add those)
- No health check endpoint
- No handler organization structure
- No scenario switching
- No HAR parsing
- No advanced error handling

This gives you the minimal foundation. Everything else is added as you need it.