// YOLO Mode - Logger Test Implementation
const { expect } = require('chai');
const sinon = require('sinon');
const { logger, logAPIRequest, logAPIResponse, errorHandler } = require('../utils/logger');

describe('Logger Utility', () => {
    let sandbox;
    let req;
    let res;
    let next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            method: 'GET',
            path: '/test',
            params: { id: '123' },
            query: { filter: 'active' },
            body: { data: 'test' }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            send: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('logger', () => {
        it('should log info messages', () => {
            const infoSpy = sandbox.spy(logger, 'info');
            logger.info('Test info message');
            expect(infoSpy.calledOnce).to.be.true;
            expect(infoSpy.firstCall.args[0]).to.equal('Test info message');
        });

        it('should log error messages', () => {
            const errorSpy = sandbox.spy(logger, 'error');
            logger.error('Test error message');
            expect(errorSpy.calledOnce).to.be.true;
            expect(errorSpy.firstCall.args[0]).to.equal('Test error message');
        });

        it('should use console transport in non-production', () => {
            expect(logger.transports.find(t => t.name === 'console')).to.exist;
        });
    });

    describe('logAPIRequest', () => {
        it('should log API request details', () => {
            const infoSpy = sandbox.spy(logger, 'info');
            logAPIRequest(req, res, next);

            expect(infoSpy.calledOnce).to.be.true;
            expect(infoSpy.firstCall.args[0]).to.deep.include({
                type: 'API_REQUEST',
                method: 'GET',
                path: '/test',
                params: { id: '123' },
                query: { filter: 'active' },
                body: { data: 'test' }
            });
            expect(next.calledOnce).to.be.true;
        });

        it('should handle requests without optional properties', () => {
            const minimalReq = {
                method: 'GET',
                path: '/test'
            };
            const infoSpy = sandbox.spy(logger, 'info');
            
            logAPIRequest(minimalReq, res, next);
            expect(infoSpy.calledOnce).to.be.true;
            expect(next.calledOnce).to.be.true;
        });
    });

    describe('logAPIResponse', () => {
        it('should log API response details', () => {
            const infoSpy = sandbox.spy(logger, 'info');
            const responseData = { success: true };
            
            logAPIResponse(req, res, next);
            res.send(responseData);

            expect(infoSpy.calledOnce).to.be.true;
            expect(infoSpy.firstCall.args[0]).to.deep.include({
                type: 'API_RESPONSE',
                method: 'GET',
                path: '/test'
            });
            expect(next.calledOnce).to.be.true;
        });

        it('should preserve original send functionality', () => {
            const originalSend = res.send;
            logAPIResponse(req, res, next);
            
            const responseData = { success: true };
            res.send(responseData);
            
            expect(originalSend.calledOnce).to.be.true;
            expect(originalSend.firstCall.args[0]).to.deep.equal(responseData);
        });
    });

    describe('errorHandler', () => {
        it('should log and format error responses', () => {
            const errorSpy = sandbox.spy(logger, 'error');
            const error = new Error('Test error');
            error.status = 400;
            error.code = 'TEST_ERROR';

            errorHandler(error, req, res, next);

            expect(errorSpy.calledOnce).to.be.true;
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                error: {
                    message: 'Test error',
                    code: 'TEST_ERROR'
                }
            })).to.be.true;
        });

        it('should handle errors without status or code', () => {
            const error = new Error('Generic error');
            errorHandler(error, req, res, next);

            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                error: {
                    message: 'Generic error',
                    code: 'INTERNAL_SERVER_ERROR'
                }
            })).to.be.true;
        });

        it('should include error stack in log', () => {
            const errorSpy = sandbox.spy(logger, 'error');
            const error = new Error('Test error');
            
            errorHandler(error, req, res, next);
            
            expect(errorSpy.firstCall.args[0]).to.deep.include({
                type: 'ERROR',
                error: {
                    message: error.message,
                    stack: error.stack
                }
            });
        });
    });
}); 