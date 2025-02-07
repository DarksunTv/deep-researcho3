// Set dummy Supabase environment variables before any module is loaded
process.env.SUPABASE_URL = 'https://dummy.supabase.co';
process.env.SUPABASE_KEY = 'dummy-key';

const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');

// Import GHL integration module
const { fetchGHLInfo, getOrFetchGHLData } = require('../api/ghlIntegration');

describe('GHL Integration Module', function() {
  describe('fetchGHLInfo', function() {
    let axiosGetStub;
    const endpoint = '/test-endpoint';
    const fakeResponse = { data: { success: true, value: 'test' } };

    before(function(){
      process.env.GHL_API_URL = 'https://api.fake.com';
      process.env.GHL_API_KEY = 'testKey';
    });

    beforeEach(function(){
      axiosGetStub = sinon.stub(axios, 'get').resolves(fakeResponse);
    });

    afterEach(function(){
      axiosGetStub.restore();
    });

    it('should return data when axios call succeeds', async function() {
      const data = await fetchGHLInfo(endpoint);
      expect(data).to.deep.equal(fakeResponse.data);
      expect(axiosGetStub.calledOnce).to.be.true;
    });

    it('should throw error when axios call fails', async function() {
      axiosGetStub.rejects(new Error('Network error'));
      try {
        await fetchGHLInfo(endpoint);
      } catch (error) {
        expect(error.message).to.include('Failed to fetch data from GHL:');
      }
    });
  });

  describe('getOrFetchGHLData', function() {
    let axiosGetStub;
    const endpoint = '/test-endpoint';
    const fakeData = { success: true, value: 'fromGHL' };

    before(function(){
      process.env.GHL_API_URL = 'https://api.fake.com';
      process.env.GHL_API_KEY = 'testKey';
    });

    beforeEach(function(){
      axiosGetStub = sinon.stub(axios, 'get').resolves({ data: fakeData });
    });

    afterEach(function(){
      axiosGetStub.restore();
    });

    it('should fetch new data when no cached record exists', async function() {
      // This test assumes that no cached record exists in Supabase.
      // In a real test, you might stub the Supabase functions using proxyquire or rewire.
      const result = await getOrFetchGHLData('testRecord', endpoint);
      expect(result).to.deep.equal(fakeData);
      expect(axiosGetStub.calledOnce).to.be.true;
    });
  });
}); 