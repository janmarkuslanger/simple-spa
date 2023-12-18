import { Cache } from './types.d';

class LocalStorageCache implements Cache {
    private cache: { [key: string]: string };

    constructor() {
        this.cache = {};
    }

    get(key: string) {
        return this.cache[key];
    }
    
    set(key: string, value: string) {
        this.cache[key] = value;
    }
}

export default LocalStorageCache;