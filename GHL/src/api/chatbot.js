// YOLO Mode - Quick Chatbot Integration
const axios = require('axios');

class ChatbotHandler {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/ghl'; // Adjust based on your API server
    }

    async handleCommand(command, params = {}) {
        try {
            switch (command.toLowerCase()) {
                case 'list workflows':
                    return await this.listWorkflows();
                case 'get workflow':
                    return await this.getWorkflow(params.id);
                case 'create workflow':
                    return await this.createWorkflow(params.data);
                case 'edit workflow':
                    return await this.updateWorkflow(params.id, params.data);
                case 'delete workflow':
                    return await this.deleteWorkflow(params.id);
                default:
                    return 'Unknown command. Available commands: list workflows, get workflow, create workflow, edit workflow, delete workflow';
            }
        } catch (error) {
            console.error('Chatbot command error:', error.message);
            return `Error executing command: ${error.message}`;
        }
    }

    // Implementation of workflow commands
    async listWorkflows() {
        const response = await axios.get(`${this.baseUrl}/workflows`);
        return this.formatWorkflowList(response.data);
    }

    async getWorkflow(id) {
        const response = await axios.get(`${this.baseUrl}/workflows/${id}`);
        return this.formatWorkflowDetails(response.data);
    }

    async createWorkflow(data) {
        const response = await axios.post(`${this.baseUrl}/workflows`, data);
        return `Workflow created successfully! ID: ${response.data.id}`;
    }

    async updateWorkflow(id, data) {
        await axios.put(`${this.baseUrl}/workflows/${id}`, data);
        return `Workflow ${id} updated successfully!`;
    }

    async deleteWorkflow(id) {
        await axios.delete(`${this.baseUrl}/workflows/${id}`);
        return `Workflow ${id} deleted successfully!`;
    }

    // Helper methods for formatting responses
    formatWorkflowList(workflows) {
        return workflows.map(w => `ID: ${w.id} - Name: ${w.name}`).join('\n');
    }

    formatWorkflowDetails(workflow) {
        return `
Workflow Details:
ID: ${workflow.id}
Name: ${workflow.name}
Status: ${workflow.status}
Created: ${workflow.created_at}
Last Modified: ${workflow.updated_at}
        `.trim();
    }
}

module.exports = new ChatbotHandler(); 