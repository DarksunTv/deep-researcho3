// YOLO Mode - Rapid GHL Client Implementation
const axios = require('axios');
const AUTH_CONFIG = require('../config/auth');

class GHLClient {
    constructor() {
        this.client = axios.create({
            baseURL: AUTH_CONFIG.baseUrl,
            headers: AUTH_CONFIG.headers
        });
    }

    // Quick implementation of core workflow methods
    async getWorkflows() {
        try {
            const response = await this.client.get('workflows');
            return response.data;
        } catch (error) {
            console.error('Error fetching workflows:', error.message);
            throw error;
        }
    }

    async getWorkflow(id) {
        try {
            const response = await this.client.get(`workflows/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching workflow ${id}:`, error.message);
            throw error;
        }
    }

    async createWorkflow(data) {
        try {
            const response = await this.client.post('workflows', data);
            return response.data;
        } catch (error) {
            console.error('Error creating workflow:', error.message);
            throw error;
        }
    }

    async updateWorkflow(id, data) {
        try {
            const response = await this.client.put(`workflows/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating workflow ${id}:`, error.message);
            throw error;
        }
    }

    async deleteWorkflow(id) {
        try {
            const response = await this.client.delete(`workflows/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting workflow ${id}:`, error.message);
            throw error;
        }
    }
}

module.exports = new GHLClient(); 