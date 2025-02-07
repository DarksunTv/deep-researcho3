const { expect } = require('chai');
const { getAIResponse } = require('../ai/aiAssistant');

// Increase timeout for API response
describe('AI Assistant - getAIResponse', function() {
  this.timeout(15000);

  it('should create a workflow when prompted', async function() {
    const prompt = "Please create a workflow for automating data processing.";
    try {
      const response = await getAIResponse(prompt);
      console.log('AI Response:', response);
      expect(response).to.be.a('string');
      expect(response.length).to.be.greaterThan(0);
    } catch (err) {
      throw new Error('getAIResponse threw an error: ' + err.message);
    }
  });
}); 