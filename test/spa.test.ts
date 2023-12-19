import Spa from '../src/spa';

describe('Spa', () => {

  afterEach(() => {
    // Clean up any changes made to the DOM
    document.body.innerHTML = '';
  });

  it('should load HTML and replace dynamic containers', async () => {
    const spa = new Spa();
    // Create a dynamic container element
    const dynamicContainer = document.createElement('div');
    dynamicContainer.setAttribute('data-simple-spa', 'container1');
    document.body.appendChild(dynamicContainer);

    // Mock the load function to return a sample HTML
    spa.getHtmlText = jest.fn().mockResolvedValue('<div data-simple-spa="container1">New Content</div>');

    // Call the load method
    await spa.load('https://example.com');

    // Verify that the dynamic container has been replaced with the new content
    const newElement = document.querySelector('[data-simple-spa="container1"]');
    expect(newElement?.textContent).toBe('New Content');
  });

  it('should load HTML and replace dynamic containers', async () => {
    const spa = new Spa();
    const dynamicContainer = document.createElement('div');
    dynamicContainer.setAttribute('data-simple-spa', 'container1');
    document.body.appendChild(dynamicContainer);

    const mockLoadFromNetwork = jest.spyOn(spa, 'loadFromNetwork');
    mockLoadFromNetwork.mockResolvedValue('<div data-simple-spa="container1">New Content</div>');

    await spa.load('https://example.com');

    expect(mockLoadFromNetwork).toHaveBeenCalledTimes(1);

    await spa.load('https://example.com');
    expect(mockLoadFromNetwork).toHaveBeenCalledTimes(2);

    const newElement = document.querySelector('[data-simple-spa="container1"]');
    expect(newElement?.textContent).toBe('New Content');
  });
});