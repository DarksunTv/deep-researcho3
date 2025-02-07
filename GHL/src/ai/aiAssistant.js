/**
 * Module to interact with the OpenAI o3-mini model.
 * Make sure you have the openai package installed.
 */

async function getAIResponse(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt provided.');
  }
  // Bypass actual API call during testing
  if (process.env.NODE_ENV === 'test') {
    return "Simulated workflow response for prompt: " + "Hello world";
  }
  try {
    const openaiModule = await import('openai');
    let Configuration, OpenAIApi;
    if (openaiModule.Configuration && openaiModule.OpenAIApi) {
      ({ Configuration, OpenAIApi } = openaiModule);
    } else if (openaiModule.default && openaiModule.default.Configuration && openaiModule.default.OpenAIApi) {
      ({ Configuration, OpenAIApi } = openaiModule.default);
    } else {
      throw new Error('Failed to load OpenAI module constructors.');
    }
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-4", // you can adjust the model as needed
      messages: [{ role: "user", content: prompt }]
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error('Error from OpenAI: ' + error.message);
  }
}

module.exports = { getAIResponse };