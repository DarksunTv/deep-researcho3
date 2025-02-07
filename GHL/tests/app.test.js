const request = require('supertest');
const GHLIntegration = require('../ghlIntegration');

// Mock GHLIntegration module
jest.mock('../ghlIntegration');

const app = require('../app');

describe('API Endpoint Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test health check endpoint
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  // Test contacts endpoints
  describe('Contacts API', () => {
    it('GET /api/contacts should return contacts list', async () => {
      const mockContacts = [
        { id: 1, email: 'test1@example.com' },
        { id: 2, email: 'test2@example.com' }
      ];

      GHLIntegration.getContacts.mockResolvedValueOnce(mockContacts);

      const response = await request(app)
        .get('/api/contacts')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toEqual(mockContacts);
      expect(GHLIntegration.getContacts).toHaveBeenCalledTimes(1);
    });

    it('POST /api/contacts should create a new contact', async () => {
      const contactData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '+1234567890'
      };

      const mockResponse = { ...contactData, id: 123 };
      GHLIntegration.createContact.mockResolvedValueOnce(mockResponse);

      const response = await request(app)
        .post('/api/contacts')
        .send(contactData)
        .expect(201);

      expect(response.body).toEqual(mockResponse);
      expect(GHLIntegration.createContact).toHaveBeenCalledWith(contactData);
    });

    it('POST /api/contacts should handle invalid data', async () => {
      const invalidData = {};
      GHLIntegration.createContact.mockRejectedValueOnce(new Error('Invalid data'));

      await request(app)
        .post('/api/contacts')
        .send(invalidData)
        .expect(500);
    });
  });
}); 