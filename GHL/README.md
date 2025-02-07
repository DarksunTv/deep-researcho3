# GHL Workflow Integration with Chatbot

## Overview
This project integrates GoHighLevel (GHL) workflow functionalities with a chatbot interface. It provides a robust API client for interacting with GHL, exposes RESTful endpoints, and integrates with AI capabilities for workflow analysis and optimization.

## What's Implemented
- **Authentication & Configuration**  
  - Configured in [src/config/auth.js](src/config/auth.js) using environment variables.

- **GHL API Client**  
  - Core workflow methods implemented in [src/api/GHLClient.js](src/api/GHLClient.js) (get, create, update, delete workflows).

- **API Endpoints**  
  - Express routes in [src/api/routes.js](src/api/routes.js) that map to the GHL client methods.

- **Chatbot Integration**  
  - Command handler in [src/api/chatbot.js](src/api/chatbot.js) for operations like listing, getting, creating, editing, and deleting workflows.

- **AI Workflow Integration**  
  - AI capabilities in [src/ai/workflowAI.js](src/ai/workflowAI.js) for generating summaries, suggesting optimizations, and troubleshooting support.
  - *Note*: The AI Assistant in [src/ai/aiAssistant.js](src/ai/aiAssistant.js) currently has an error (`TypeError: Configuration is not a constructor`) and needs updating.

- **Operations Client**  
  - Additional operations for contacts, messaging, documents, automation, and analytics are implemented in [src/api/GHLOperationsClient.js](src/api/GHLOperationsClient.js).

- **Logging & Error Handling**  
  - Logging is implemented using winston in [src/utils/logger.js](src/utils/logger.js).

- **Testing**  
  - Test suites are provided in the [src/tests](src/tests) directory (e.g., tests for GHLClient, WorkflowAI, and logger).

## Requirements & Prerequisites
- **Node.js**: v20.11.0 (or later)
- **npm**
- **Environment Variables**: Create a `.env` file based on [`.env.example`](.env.example) with the following keys:
  - `GHL_API_KEY`: Your GHL API key
  - `PORT`: The port for the server (default is 3000)
  - `NODE_ENV`: The environment (development/production)
  - `OPENAI_API_KEY`: Your OpenAI API key (for AI integrations)
  - *Other variables* as needed (e.g., for Supabase integration)

## Installation & Setup
1. Clone the repository.
2. Run `npm install` to install all dependencies.
3. Copy `.env.example` to `.env` and fill in the required values.
4. Start the server:
   - `npm start` for production mode
   - `npm run dev` for development mode (with hot-reloading via nodemon)
5. Run tests with:
   - `npm test`
   - For coverage reports: `npm run test:coverage`

## Current Issues & Next Steps
### Issues
- **AI Assistant Error**:
  - Error: `TypeError: Configuration is not a constructor` in [src/ai/aiAssistant.js](src/ai/aiAssistant.js).
  - *Action Needed*: Update the AI Assistant to use the correct OpenAI client usage. For example:
    ```javascript
    const { Configuration, OpenAIApi } = require('openai');
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    ```

- **Supabase Integration**:
  - Verify that [src/api/supabaseIntegration.js](src/api/supabaseIntegration.js) is correctly configured and that the necessary environment variables and dependencies are set.

### Next Steps
- Update the AI Assistant module to align with the latest OpenAI client usage.
- Verify and test the Supabase integration module.
- Enhance the chatbot UI and further map its commands to API endpoints as needed.
- Continue integrating AI-driven features for workflow optimization.
- Update documentation as new features and fixes are implemented.

## Roadmap Reference
Refer to [GHL_Integration_Roadmap.md](GHL_Integration_Roadmap.md) for a detailed list of completed tasks and upcoming enhancements.

## Contributing
Contributions are welcome! Please suggest improvements, report issues, or submit pull requests for further development.

## License
[Specify license here, if applicable] 