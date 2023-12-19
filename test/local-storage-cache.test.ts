import LocalStorageCache, { MAX_CACHE_AGE } from '../src/local-storage-cache';

describe('LocalStorageCache', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should return undefined for non-existent key', () => {
    const cache = new LocalStorageCache();
    const result = cache.get('nonexistent-key');
    expect(result).toBeUndefined();
  });

  it('should return undefined for expired cache item', () => {
    const cache = new LocalStorageCache();
    const key = 'expired-key';

    const element = document.createElement('div');
    element.appendChild(document.createTextNode('Valid Content'));

    const item = {
      htmlText: '<div>Expired Content</div>',
      htmlElements: [element],
    };

    // Set an expired cache item
    cache.set(key, item);
    jest.spyOn(Date, 'now').mockReturnValue(Date.now() + MAX_CACHE_AGE + 100);

    const result = cache.get(key);
    expect(result).toBeUndefined();
  });

  it('should return the cached content for valid key', () => {
    const cache = new LocalStorageCache();
    const key = 'valid-key';

    const element = document.createElement('div');
    element.appendChild(document.createTextNode('Valid Content'));

    const item = {
      htmlText: '<div>Valid Content</div>',
      htmlElements: [element],
    };

    // Set a valid cache item
    cache.set(key, item);

    const result = cache.get(key);
    expect(result).toBe(item.htmlText);
  });

  it('should overwrite existing cache item for the same key', () => {
    const cache = new LocalStorageCache();
    const key = 'existing-key';

    const element = document.createElement('div');
    element.appendChild(document.createTextNode('Initial Content'));

    const initialItem = {
      htmlText: '<div>Initial Content</div>',
      htmlElements: [element],
    };

    const element2 = document.createElement('div');
    element2.appendChild(document.createTextNode('Updated Content'));

    const updatedItem = {
      htmlText: '<div>Updated Content</div>',
      htmlElements: [element2],
    };

    // Set an initial cache item
    cache.set(key, initialItem);

    // Update the cache item
    cache.set(key, updatedItem);

    const result = cache.get(key);
    expect(result).toBe(updatedItem.htmlText);
  });
});