// YOLO Mode - Enhanced GHL WorkflowAI Integration
const { OpenAI } = require('openai');
const { logger } = require('../utils/logger');

class WorkflowAI {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: process.env.NODE_ENV === 'test' ? true : false
        });
        this.model = "gpt-4-turbo"; // Using GPT 4 Turbo as per GHL docs
    }

    async analyzeUserRequest(request) {
        if (!request || typeof request !== 'string') {
            throw new Error('Invalid request format');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "o3-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a workflow optimization expert. Analyze the user's request and suggest optimal workflow actions."
                    },
                    {
                        role: "user",
                        content: request
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error analyzing user request:', error);
            throw error;
        }
    }

    async generateWorkflowSummary(workflow) {
        if (!workflow || typeof workflow !== 'object') {
            throw new Error('Invalid workflow data');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "o3-mini",
                messages: [
                    {
                        role: "system",
                        content: "Generate a clear, human-readable summary of this workflow's steps and purpose."
                    },
                    {
                        role: "user",
                        content: JSON.stringify(workflow)
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error generating workflow summary:', error);
            throw error;
        }
    }

    async suggestOptimizations(workflow) {
        if (!workflow || typeof workflow !== 'object') {
            throw new Error('Invalid workflow data');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "o3-mini",
                messages: [
                    {
                        role: "system",
                        content: "Analyze this workflow and suggest potential optimizations or improvements."
                    },
                    {
                        role: "user",
                        content: JSON.stringify(workflow)
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error suggesting optimizations:', error);
            throw error;
        }
    }

    async provideTroubleshootingSupport(issue) {
        if (!issue || typeof issue !== 'string') {
            throw new Error('Invalid issue description');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: "o3-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a workflow troubleshooting expert. Provide specific recommendations to resolve the reported issue."
                    },
                    {
                        role: "user",
                        content: issue
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error providing troubleshooting support:', error);
            throw error;
        }
    }

    async generateContactWorkflow(request) {
        if (!request || typeof request !== 'string') {
            throw new Error('Invalid request format');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: "You are a GHL workflow expert specializing in contact management. Create workflows that handle contact information, segmentation, and automation."
                    },
                    {
                        role: "user",
                        content: request
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error generating contact workflow:', error);
            throw error;
        }
    }

    async createMessageTemplate(type, context) {
        if (!type || !context || typeof context !== 'object') {
            throw new Error('Invalid message template parameters');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: `You are a GHL messaging expert. Create a ${type} template that is engaging and conversion-focused.`
                    },
                    {
                        role: "user",
                        content: JSON.stringify(context)
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error creating message template:', error);
            throw error;
        }
    }

    async generateDocumentWorkflow(type, details) {
        if (!type || !details || typeof details !== 'object') {
            throw new Error('Invalid document workflow parameters');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: `You are a GHL document automation expert. Create a workflow for generating and managing ${type}s.`
                    },
                    {
                        role: "user",
                        content: JSON.stringify(details)
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error generating document workflow:', error);
            throw error;
        }
    }

    async suggestAutomationFlow(trigger, action) {
        if (!trigger || !action) {
            throw new Error('Invalid automation parameters');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: "You are a GHL automation expert. Suggest optimal workflow steps between triggers and actions."
                    },
                    {
                        role: "user",
                        content: `Create an automation flow from trigger "${trigger}" to action "${action}"`
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error suggesting automation flow:', error);
            throw error;
        }
    }

    async analyzeWorkflowPerformance(workflowData) {
        if (!workflowData || typeof workflowData !== 'object') {
            throw new Error('Invalid workflow data');
        }

        try {
            const response = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    {
                        role: "system",
                        content: "You are a GHL analytics expert. Analyze workflow performance and suggest optimizations."
                    },
                    {
                        role: "user",
                        content: JSON.stringify(workflowData)
                    }
                ]
            });

            return response.choices[0].message.content;
        } catch (error) {
            logger.error('Error analyzing workflow performance:', error);
            throw error;
        }
    }
}

module.exports = new WorkflowAI(); 