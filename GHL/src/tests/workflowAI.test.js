// YOLO Mode - WorkflowAI Test Implementation
const { expect } = require('chai');
const sinon = require('sinon');
const WorkflowAI = require('../ai/workflowAI');

describe('WorkflowAI', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('analyzeUserRequest', () => {
        it('should analyze user request and return AI suggestions', async () => {
            const mockResponse = {
                choices: [{
                    message: {
                        content: 'Suggested workflow: Create a lead capture workflow with email notification'
                    }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);

            const result = await WorkflowAI.analyzeUserRequest('I need a workflow for capturing leads');
            expect(result).to.equal('Suggested workflow: Create a lead capture workflow with email notification');
        });

        it('should handle errors during request analysis', async () => {
            const error = new Error('OpenAI API Error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);

            try {
                await WorkflowAI.analyzeUserRequest('Invalid request');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('OpenAI API Error');
            }
        });

        it('should validate request input', async () => {
            try {
                await WorkflowAI.analyzeUserRequest(null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid request format');
            }

            try {
                await WorkflowAI.analyzeUserRequest(123);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid request format');
            }
        });
    });

    describe('generateWorkflowSummary', () => {
        const sampleWorkflow = {
            id: 1,
            name: 'Lead Capture',
            steps: [
                { type: 'form_submission', config: { formId: 'lead-form' } },
                { type: 'email_notification', config: { template: 'new-lead' } }
            ]
        };

        it('should generate human-readable summary of workflow', async () => {
            const mockResponse = {
                choices: [{
                    message: {
                        content: 'This workflow captures leads through a form and sends email notifications'
                    }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);

            const result = await WorkflowAI.generateWorkflowSummary(sampleWorkflow);
            expect(result).to.equal('This workflow captures leads through a form and sends email notifications');
        });

        it('should validate workflow data', async () => {
            try {
                await WorkflowAI.generateWorkflowSummary(null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid workflow data');
            }

            try {
                await WorkflowAI.generateWorkflowSummary('not an object');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid workflow data');
            }
        });

        it('should handle API error during generateWorkflowSummary', async () => {
            const error = new Error('Generate summary error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.generateWorkflowSummary(sampleWorkflow);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Generate summary error');
            }
        });
    });

    describe('suggestOptimizations', () => {
        const sampleWorkflow = {
            id: 1,
            name: 'Email Campaign',
            steps: [
                { type: 'delay', config: { duration: '24h' } },
                { type: 'send_email', config: { template: 'follow-up' } }
            ]
        };

        it('should suggest workflow optimizations', async () => {
            const mockResponse = {
                choices: [{
                    message: {
                        content: 'Consider adding a condition to check email open rates before sending follow-up'
                    }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);

            const result = await WorkflowAI.suggestOptimizations(sampleWorkflow);
            expect(result).to.equal('Consider adding a condition to check email open rates before sending follow-up');
        });

        it('should validate workflow data', async () => {
            try {
                await WorkflowAI.suggestOptimizations(null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid workflow data');
            }

            try {
                await WorkflowAI.suggestOptimizations('not an object');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid workflow data');
            }
        });

        it('should handle API error during suggestOptimizations', async () => {
            const error = new Error('Optimization error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.suggestOptimizations(sampleWorkflow);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Optimization error');
            }
        });
    });

    describe('provideTroubleshootingSupport', () => {
        it('should provide relevant troubleshooting recommendations', async () => {
            const mockResponse = {
                choices: [{
                    message: {
                        content: 'Check if the email service is properly configured and API keys are valid'
                    }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);

            const result = await WorkflowAI.provideTroubleshootingSupport('Emails are not being sent in my workflow');
            expect(result).to.equal('Check if the email service is properly configured and API keys are valid');
        });

        it('should validate issue description', async () => {
            try {
                await WorkflowAI.provideTroubleshootingSupport(null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid issue description');
            }

            try {
                await WorkflowAI.provideTroubleshootingSupport(123);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid issue description');
            }
        });

        it('should handle API errors gracefully', async () => {
            const error = new Error('OpenAI API Error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);

            try {
                await WorkflowAI.provideTroubleshootingSupport('Test issue');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('OpenAI API Error');
            }
        });
    });

    describe('generateContactWorkflow', () => {
        it('should generate contact workflow from a valid request', async () => {
            const mockResponse = {
                choices: [{
                    message: { content: 'Contact workflow for segmentation and automation' }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);
            const result = await WorkflowAI.generateContactWorkflow('Segment contacts by region');
            expect(result).to.equal('Contact workflow for segmentation and automation');
        });

        it('should validate input for generateContactWorkflow', async () => {
            try {
                await WorkflowAI.generateContactWorkflow(null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid request format');
            }
            try {
                await WorkflowAI.generateContactWorkflow(456);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid request format');
            }
        });

        it('should handle API error during generateContactWorkflow', async () => {
            const error = new Error('Contact workflow error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.generateContactWorkflow('Segment contacts by region');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Contact workflow error');
            }
        });
    });

    describe('createMessageTemplate', () => {
        it('should create a message template with valid parameters', async () => {
            const mockResponse = {
                choices: [{
                    message: { content: 'Engaging invoice follow-up template' }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);
            const result = await WorkflowAI.createMessageTemplate('email', { invoiceId: 101, customer: 'John Doe' });
            expect(result).to.equal('Engaging invoice follow-up template');
        });

        it('should validate parameters for createMessageTemplate', async () => {
            try {
                await WorkflowAI.createMessageTemplate(null, { key: 'value' });
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid message template parameters');
            }
            try {
                await WorkflowAI.createMessageTemplate('sms', 'not an object');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid message template parameters');
            }
        });

        it('should handle API error during createMessageTemplate', async () => {
            const error = new Error('Message template error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.createMessageTemplate('email', { invoiceId: 101, customer: 'John Doe' });
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Message template error');
            }
        });
    });

    describe('generateDocumentWorkflow', () => {
        it('should generate a document workflow given valid parameters', async () => {
            const mockResponse = {
                choices: [{
                    message: { content: 'Document workflow for invoice generation' }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);
            const result = await WorkflowAI.generateDocumentWorkflow('invoice', { customer: 'Jane Doe', amount: 250 });
            expect(result).to.equal('Document workflow for invoice generation');
        });

        it('should validate input for generateDocumentWorkflow', async () => {
            try {
                await WorkflowAI.generateDocumentWorkflow(null, { key: 'value' });
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid document workflow parameters');
            }
            try {
                await WorkflowAI.generateDocumentWorkflow('estimate', 'not an object');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid document workflow parameters');
            }
        });

        it('should handle API error during generateDocumentWorkflow', async () => {
            const error = new Error('Document workflow error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.generateDocumentWorkflow('invoice', { customer: 'Jane Doe', amount: 250 });
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Document workflow error');
            }
        });
    });

    describe('suggestAutomationFlow', () => {
        it('should suggest an automation flow given valid trigger and action', async () => {
            const mockResponse = {
                choices: [{
                    message: { content: 'Automation flow from new lead to welcome email' }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);
            const result = await WorkflowAI.suggestAutomationFlow('new lead', 'send welcome email');
            expect(result).to.equal('Automation flow from new lead to welcome email');
        });

        it('should validate inputs for suggestAutomationFlow', async () => {
            try {
                await WorkflowAI.suggestAutomationFlow(null, 'action');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid automation parameters');
            }
            try {
                await WorkflowAI.suggestAutomationFlow('trigger', null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid automation parameters');
            }
        });

        it('should handle API error during suggestAutomationFlow', async () => {
            const error = new Error('Automation flow error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.suggestAutomationFlow('new lead', 'send welcome email');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Automation flow error');
            }
        });
    });

    describe('analyzeWorkflowPerformance', () => {
        it('should analyze workflow performance for valid workflow data', async () => {
            const mockResponse = {
                choices: [{
                    message: { content: 'Workflow is performing well with minor delays; consider optimizing trigger intervals.' }
                }]
            };
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').resolves(mockResponse);
            const workflowData = { id: 10, metrics: { duration: 120, successRate: 95 } };
            const result = await WorkflowAI.analyzeWorkflowPerformance(workflowData);
            expect(result).to.equal('Workflow is performing well with minor delays; consider optimizing trigger intervals.');
        });

        it('should validate input for analyzeWorkflowPerformance', async () => {
            try {
                await WorkflowAI.analyzeWorkflowPerformance(null);
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid workflow data');
            }
            try {
                await WorkflowAI.analyzeWorkflowPerformance('invalid');
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Invalid workflow data');
            }
        });

        it('should handle API error during analyzeWorkflowPerformance', async () => {
            const error = new Error('Performance analysis error');
            sandbox.stub(WorkflowAI.openai.chat.completions, 'create').rejects(error);
            try {
                await WorkflowAI.analyzeWorkflowPerformance({ id: 10, metrics: { duration: 120, successRate: 95 } });
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('Performance analysis error');
            }
        });
    });
}); 