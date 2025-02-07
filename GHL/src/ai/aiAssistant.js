/**
 * Module to interact with the OpenAI o3-mini model.
 * Make sure you have the openai package installed.
 */

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * getAIResponse - sends a prompt to the AI and returns the response.
 *
 * @param {string} prompt - The prompt or code assistance query.
 * @returns {Promise<Object>} The AI generated response.
 */
async function getAIResponse(prompt) {
  try {
    const response = await openai.createCompletion({
      model: 'o3-mini',
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });
    return response.data;
  } catch (error) {
    throw new Error(`OpenAI Error: ${error.message}`);
  }
}

module.exports = {
  getAIResponse,
}; 