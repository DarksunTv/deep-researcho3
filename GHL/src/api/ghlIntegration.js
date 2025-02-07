/*
 * Module to connect to GoHighLevel API and organize its data in Supabase.
 * This module uses axios for API calls to GoHighLevel and leverages supabaseIntegration.js
 * to store and retrieve data. The stored data can later be used by Cursor AI for contextual memory.
 */

const axios = require('axios');
const { fetchDataFromSupabase, insertDataToSupabase } = require('./supabaseIntegration');

// Environment variables for GoHighLevel API
const GHL_API_URL = process.env.GHL_API_URL; // Base URL for GoHighLevel API
const GHL_API_KEY = process.env.GHL_API_KEY; // API key for GoHighLevel

/**
 * Fetch information from GoHighLevel API using the given endpoint.
 * @param {string} endpoint - The API endpoint to retrieve data from.
 * @returns {Promise<Object>} The data returned from GoHighLevel.
 */
async function fetchGHLInfo(endpoint) {
  try {
    const response = await axios.get(`${GHL_API_URL}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${GHL_API_KEY}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch data from GHL: ${error.message}`);
  }
}

/**
 * Store the fetched GoHighLevel data in Supabase under the 'ghl_data' table.
 * @param {string} name - A unique name for this data record.
 * @param {Object} data - The data object to store.
 * @returns {Promise<Object>} The inserted record data.
 */
async function storeGHLData(name, data) {
  const record = { 
    name, 
    data: JSON.stringify(data),
    created_at: new Date().toISOString()
  };
  return await insertDataToSupabase('ghl_data', record);
}

/**
 * Retrieve data from Supabase if it exists and is fresh based on TTL; otherwise, fetch from GHL API,
 * store it in Supabase, and return the data.
 * @param {string} name - The unique identifier for the data record.
 * @param {string} endpoint - The API endpoint to fetch data from if no fresh data is cached.
 * @param {number} ttlMinutes - The time-to-live for cached data in minutes; default is 5 minutes.
 * @returns {Promise<Object>} The retrieved or fetched data.
 */
async function getOrFetchGHLData(name, endpoint, ttlMinutes = 5) {
  const records = await fetchDataFromSupabase('ghl_data');
  const existing = records.find(item => item.name === name);
  if (existing && existing.created_at) {
    const createdAt = new Date(existing.created_at);
    const now = new Date();
    const diffMinutes = (now - createdAt) / 60000;
    if (diffMinutes < ttlMinutes) {
      return JSON.parse(existing.data);
    }
  }
  const fetchedData = await fetchGHLInfo(endpoint);
  await storeGHLData(name, fetchedData);
  return fetchedData;
}

module.exports = {
  fetchGHLInfo,
  storeGHLData,
  getOrFetchGHLData
}; 