/* GHL Integration Module */
const fetch = require('node-fetch');

// Base API URL and API Key configuration. Replace with your actual URL and API key or set via environment variables.
const BASE_URL = process.env.GHL_BASE_URL || 'https://api.gohighlevel.com/v1';
const API_KEY = process.env.GHL_API_KEY || 'YOUR_GHL_API_KEY';

class GHLIntegration {
  /**
   * Retrieve contacts from GoHighLevel.
   * @returns {Promise<Object>} API response data.
   */
  static async getContacts() {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
         throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  /**
   * Create a new contact in GoHighLevel.
   * @param {Object} contactData - The contact data payload.
   * @returns {Promise<Object>} API response data.
   */
  static async createContact(contactData) {
    try {
      const response = await fetch(`${BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      if (!response.ok) {
         throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }
}

module.exports = GHLIntegration; 