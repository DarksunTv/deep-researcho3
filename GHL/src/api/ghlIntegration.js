/**
 * Module to interact with the GoHighLevel (GHL) API.
 * Replace URL endpoints and API key handling as needed.
 */

const axios = require('axios');

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_BASE_URL = process.env.GHL_BASE_URL || 'https://api.gohighlevel.com';

async function fetchGHLData() {
  try {
    const response = await axios.get(`${GHL_BASE_URL}/v1/data`, {
      headers: { Authorization: `Bearer ${GHL_API_KEY}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(`GHL fetch error: ${error.message}`);
  }
}

async function pushDataToGHL(data) {
  try {
    const response = await axios.post(`${GHL_BASE_URL}/v1/update`, data, {
      headers: { Authorization: `Bearer ${GHL_API_KEY}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(`GHL push error: ${error.message}`);
  }
}

module.exports = {
  fetchGHLData,
  pushDataToGHL
}; 