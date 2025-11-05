# Test Server

MSW + Fastify mock server for multi-language testing.

## Quick Start

```bash
# Local
npm install
npm start

# Docker
docker build -t test-server .
docker run -p 3000:3000 test-server
```

## Adding Mock Handlers

Edit `src/handlers.ts`:

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://mock/api/users', () => {
    return HttpResponse.json({ users: [] });
  }),
];
```

Server listens on port 3000 (configurable via `PORT` env var).