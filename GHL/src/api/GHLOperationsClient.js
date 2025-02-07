// YOLO Mode - GHL Operations Client
const axios = require('axios');
const AUTH_CONFIG = require('../config/auth');
const { logger } = require('../utils/logger');

class GHLOperationsClient {
    constructor() {
        this.client = axios.create({
            baseURL: AUTH_CONFIG.baseUrl,
            headers: AUTH_CONFIG.headers
        });
    }

    // Contact Operations
    async getContacts(filters = {}) {
        try {
            const response = await this.client.get('contacts/search', { params: filters });
            return response.data;
        } catch (error) {
            logger.error('Error fetching contacts:', error);
            throw error;
        }
    }

    async createContact(contactData) {
        try {
            const response = await this.client.post('contacts', contactData);
            return response.data;
        } catch (error) {
            logger.error('Error creating contact:', error);
            throw error;
        }
    }

    async updateContact(contactId, contactData) {
        try {
            const response = await this.client.put(`contacts/${contactId}`, contactData);
            return response.data;
        } catch (error) {
            logger.error('Error updating contact:', error);
            throw error;
        }
    }

    // New Contact Operations
    async getContactById(contactId) {
        try {
            const response = await this.client.get(`contacts/${contactId}`);
            return response.data;
        } catch (error) {
            logger.error('Error fetching contact by ID:', error);
            throw error;
        }
    }

    async deleteContact(contactId) {
        try {
            const response = await this.client.delete(`contacts/${contactId}`);
            return response.data;
        } catch (error) {
            logger.error('Error deleting contact:', error);
            throw error;
        }
    }

    // Messaging Operations
    async sendEmail(emailData) {
        try {
            const response = await this.client.post('emails/send', emailData);
            return response.data;
        } catch (error) {
            logger.error('Error sending email:', error);
            throw error;
        }
    }

    async sendSMS(smsData) {
        try {
            const response = await this.client.post('sms/send', smsData);
            return response.data;
        } catch (error) {
            logger.error('Error sending SMS:', error);
            throw error;
        }
    }

    // New Messaging Operation: Send Voice Message
    async sendVoiceMessage(voiceData) {
        try {
            const response = await this.client.post('voice/send', voiceData);
            return response.data;
        } catch (error) {
            logger.error('Error sending voice message:', error);
            throw error;
        }
    }

    // Document Operations
    async createEstimate(estimateData) {
        try {
            const response = await this.client.post('estimates', estimateData);
            return response.data;
        } catch (error) {
            logger.error('Error creating estimate:', error);
            throw error;
        }
    }

    async createInvoice(invoiceData) {
        try {
            const response = await this.client.post('invoices', invoiceData);
            return response.data;
        } catch (error) {
            logger.error('Error creating invoice:', error);
            throw error;
        }
    }

    // New Document Operations: Update Estimate and Invoice
    async updateEstimate(estimateId, estimateData) {
        try {
            const response = await this.client.put(`estimates/${estimateId}`, estimateData);
            return response.data;
        } catch (error) {
            logger.error('Error updating estimate:', error);
            throw error;
        }
    }

    async updateInvoice(invoiceId, invoiceData) {
        try {
            const response = await this.client.put(`invoices/${invoiceId}`, invoiceData);
            return response.data;
        } catch (error) {
            logger.error('Error updating invoice:', error);
            throw error;
        }
    }

    async getDocument(type, documentId) {
        try {
            const response = await this.client.get(`${type}/${documentId}`);
            return response.data;
        } catch (error) {
            logger.error(`Error fetching ${type}:`, error);
            throw error;
        }
    }

    // Automation Operations
    async createAutomation(automationData) {
        try {
            const response = await this.client.post('automations', automationData);
            return response.data;
        } catch (error) {
            logger.error('Error creating automation:', error);
            throw error;
        }
    }

    async triggerAutomation(automationId, triggerData) {
        try {
            const response = await this.client.post(`automations/${automationId}/trigger`, triggerData);
            return response.data;
        } catch (error) {
            logger.error('Error triggering automation:', error);
            throw error;
        }
    }

    // New Automation Operation: Schedule Automation
    async scheduleAutomation(automationId, scheduleData) {
        try {
            const response = await this.client.post(`automations/${automationId}/schedule`, scheduleData);
            return response.data;
        } catch (error) {
            logger.error('Error scheduling automation:', error);
            throw error;
        }
    }

    // Analytics Operations
    async getWorkflowAnalytics(workflowId, dateRange) {
        try {
            const response = await this.client.get(`workflows/${workflowId}/analytics`, {
                params: dateRange
            });
            return response.data;
        } catch (error) {
            logger.error('Error fetching workflow analytics:', error);
            throw error;
        }
    }
}

module.exports = new GHLOperationsClient(); 