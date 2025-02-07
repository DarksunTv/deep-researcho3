// YOLO Mode - Quick Test Implementation
const { expect } = require('chai');
const sinon = require('sinon');
const GHLClient = require('../api/GHLClient');

describe('GHLClient', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getWorkflows', () => {
        it('should fetch all workflows successfully', async () => {
            const mockResponse = {
                data: [
                    { id: 1, name: 'Test Workflow 1' },
                    { id: 2, name: 'Test Workflow 2' }
                ]
            };
            sandbox.stub(GHLClient.client, 'get').resolves(mockResponse);

            const result = await GHLClient.getWorkflows();
            expect(result).to.deep.equal(mockResponse.data);
        });

        it('should handle errors when fetching workflows', async () => {
            const error = new Error('API Error');
            sandbox.stub(GHLClient.client, 'get').rejects(error);

            try {
                await GHLClient.getWorkflows();
                expect.fail('Should have thrown an error');
            } catch (err) {
                expect(err.message).to.equal('API Error');
            }
        });
    });

    describe('createWorkflow', () => {
        it('should create a workflow successfully', async () => {
            const workflowData = { name: 'New Workflow', triggers: [] };
            const mockResponse = {
                data: { id: 1, ...workflowData }
            };
            sandbox.stub(GHLClient.client, 'post').resolves(mockResponse);

            const result = await GHLClient.createWorkflow(workflowData);
            expect(result).to.deep.equal(mockResponse.data);
        });
    });

    describe('updateWorkflow', () => {
        it('should update a workflow successfully', async () => {
            const workflowId = 1;
            const updateData = { name: 'Updated Workflow' };
            const mockResponse = {
                data: { id: workflowId, ...updateData }
            };
            sandbox.stub(GHLClient.client, 'put').resolves(mockResponse);

            const result = await GHLClient.updateWorkflow(workflowId, updateData);
            expect(result).to.deep.equal(mockResponse.data);
        });
    });

    describe('deleteWorkflow', () => {
        it('should delete a workflow successfully', async () => {
            const workflowId = 1;
            const mockResponse = { data: { success: true } };
            sandbox.stub(GHLClient.client, 'delete').resolves(mockResponse);

            const result = await GHLClient.deleteWorkflow(workflowId);
            expect(result).to.deep.equal(mockResponse.data);
        });
    });
}); 