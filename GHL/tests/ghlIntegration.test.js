const GHLIntegration = require('../ghlIntegration');

// Mock fetch
jest.mock('node-fetch');
const fetch = require('node-fetch');

describe('GHL Integration Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test getContacts
  describe('getContacts', () => {
    it('should successfully retrieve contacts', async () => {
      const mockContacts = [
        { id: 1, email: 'test1@example.com' },
        { id: 2, email: 'test2@example.com' }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockContacts
      });

      const contacts = await GHLIntegration.getContacts();
      expect(contacts).toEqual(mockContacts);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      });

      await expect(GHLIntegration.getContacts()).rejects.toThrow('Error: Not Found');
    });
  });

  // Test createContact
  describe('createContact', () => {
    it('should successfully create a new contact', async () => {
      const contactData = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '+1234567890'
      };

      const mockResponse = { ...contactData, id: 123 };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const newContact = await GHLIntegration.createContact(contactData);
      expect(newContact).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(contactData)
        })
      );
    });

    it('should handle invalid contact data', async () => {
      const invalidData = {};

      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request'
      });

      await expect(GHLIntegration.createContact(invalidData))
        .rejects
        .toThrow('Error: Bad Request');
    });
  });
}); 