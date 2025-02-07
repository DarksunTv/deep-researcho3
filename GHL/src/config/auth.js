// YOLO Mode - Quick Authentication Setup
require('dotenv').config();

const AUTH_CONFIG = {
    apiKey: process.env.GHL_API_KEY,
    baseUrl: 'https://rest.gohighlevel.com/v1/',
    headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json'
    }
};

module.exports = AUTH_CONFIG; 