import { Cache, PageItem } from './types.d';

const IDENTIFIER = 'simple-spa';
export const MAX_CACHE_AGE = 1000 * 60 * 60 * 24; // 1 day

type CacheItem = {
    content: string;
    timestamp: number;
}

type LocalStorageCacheItem = {
    [key: string]: CacheItem;
}

class LocalStorageCache implements Cache {
    get(key: string) {
        const cacheString = localStorage.getItem(IDENTIFIER);

        if (cacheString === null) {
            return undefined;
        }

        const cache = JSON.parse(cacheString) as LocalStorageCacheItem;
        const cacheItem = cache[key];

        if (!cacheItem) {
            return undefined;
        }

        const isExpired = Date.now() - cacheItem.timestamp > MAX_CACHE_AGE;

        if (isExpired) {
            return undefined;
        }

        return cacheItem.content;
    }
    
    set(key: string, item: PageItem) {
        const cacheString = localStorage.getItem(IDENTIFIER);
        const cache: LocalStorageCacheItem = cacheString ? JSON.parse(cacheString) : {};

        cache[key] = {
            content: item.htmlText,
            timestamp: Date.now(),
        };

        localStorage.setItem(IDENTIFIER, JSON.stringify(cache));
    }

    clear() {
        localStorage.removeItem(IDENTIFIER);
    }

    remove(key: string) {
        const cacheString = localStorage.getItem(IDENTIFIER);

        if (cacheString === null) {
            return;
        }

        const cache = JSON.parse(cacheString) as LocalStorageCacheItem;
        delete cache[key];
        localStorage.setItem(IDENTIFIER, JSON.stringify(cache));
    }
}

export default LocalStorageCache;