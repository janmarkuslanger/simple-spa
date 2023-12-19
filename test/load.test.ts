import load from '../src/load';

describe('load', () => {
  it('should fetch the URL and return the response', async () => {
    // Mock the fetch function
    const mockFetch = jest.fn().mockResolvedValue({
      text: jest.fn().mockResolvedValue('<div id="dynamic">Dynamic Content</div>'),
    });
    global.fetch = mockFetch;

    // Call the load function
    const url = 'https://example.com';
    const result = await load(url);

    // Assertions
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(result).toBe('<div id="dynamic">Dynamic Content</div>');
  });

  it('should throw an error if fetching the URL fails', async () => {
    // Mock the fetch function to throw an error
    const mockFetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    global.fetch = mockFetch;

    // Call the load function
    const url = 'https://example.com';
    await expect(load(url)).rejects.toThrowError('Failed to fetch https://example.com: Error: Failed to fetch');

    // Assertion
    expect(mockFetch).toHaveBeenCalledWith(url);
  });
});