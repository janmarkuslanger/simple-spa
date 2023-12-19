import load from './load';
import { SpaOptions, Cache } from './types';

const defaultOptions: SpaOptions = {
    attributeIdentifier: 'data-simple-spa',
};

class Spa {
    private cache?: Cache;
    private attributeIdentifier: string;

    constructor(props: SpaOptions = {}) {
        const config = Object.assign({}, defaultOptions, props);
        this.cache = config.cache;
        this.attributeIdentifier = config.attributeIdentifier as string;
    }

    public async load(url: string): Promise<void> {
        const dynamicContainer = Array.from(document.querySelectorAll(`[${this.attributeIdentifier}]`));
        const htmlText: string = await this.getHtmlText(url);

        const newDocument = (new DOMParser).parseFromString(htmlText, 'text/html');
        const newElements = this.getNewElements(dynamicContainer, newDocument);

        if (this.cache && this.cache.get(url) === undefined) {
            this.cache.set(url, { htmlText, htmlElements: newElements });
        }

        this.replaceDynamicContainers(dynamicContainer, newDocument);
    }

    public loadFromCache(url: string): string|undefined {
        return this.cache?.get(url);
    }

    public async loadFromNetwork(url: string): Promise<string> {
        return await load(url);
    }   

    public async getHtmlText(url: string): Promise<string> {
        if (this.cache && this.cache.get(url) !== undefined) {
            this.loadFromCache(url);
        } 

        return await this.loadFromNetwork(url);
    }

    public getNewElements(dynamicContainer: Element[], newDocument: Document): (Element|null)[] {
        return dynamicContainer.map((container) => {
            const attribute = container.getAttribute(this.attributeIdentifier);
            return newDocument.querySelector(`[${this.attributeIdentifier}=${attribute}]`);
        });
    }

    public replaceDynamicContainers(dynamicContainer: Element[], newDocument: Document): void {
        dynamicContainer.forEach((container) => {
            const attribute = container.getAttribute(this.attributeIdentifier);
            const element = newDocument.querySelector(`[${this.attributeIdentifier}=${attribute}]`);

            if (element) {
                container.replaceWith(element);
            }
        });
    }
}

export default Spa;