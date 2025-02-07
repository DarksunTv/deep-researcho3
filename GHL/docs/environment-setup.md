# Environment Setup

## Prerequisites

- Node.js v16+
- PostgreSQL 14+
- Docker (optional)

## Development Environment

- **Local Server:**  
  ```bash
  yarn dev
  ```
- **Environment Variables:**  
  Required keys in `.env`:
  ```
  OPENAI_API_KEY=sk-xxx
  GHL_API_KEY=xxx
  SUPABASE_URL=xxx
  SUPABASE_KEY=xxx
  ```
- **Local Database:**  
  Use a local instance of PostgreSQL or Supabase CLI for development data.

## Testing Environment

- **Automated Tests:**  
  Configure testing tools to run unit and integration tests.
- **Mock Services:**  
  Use mocks for external API calls (GoHighLevel, Supabase, etc.).

## Staging Environment

- **Staging Server:**  
  Should mirror production settings to test full workflows.
- **CI/CD Pipeline:**  
  Deploy to staging after passing automated tests.

## Production Environment

- **Cloud Deployment:**  
  Use a cloud platform with auto-scaling (e.g., Kubernetes or Docker Swarm).
- **Security:**  
  Harden API endpoints and secure environment variables.

## Security Measures

- **API Rate Limiting:**
  - OpenAI: 3 requests/second
  - GHL: 100 requests/minute
  - Supabase: Based on tier

- **Error Handling:**
  - Implement circuit breakers
  - Retry mechanisms for API calls
  - Error logging to external service

## Resolutions

- **nth-check:**  
  "resolutions": {
    "nth-check": "2.0.1"
  }
- **postcss:**  
  "resolutions": {
    "postcss": "8.4.31"
  }