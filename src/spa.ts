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

    public async load(url: string) {
        const dynamicContainer = Array.from(document.querySelectorAll(`[${this.attributeIdentifier}]`));

        let htmlText:string;

        if (this.cache && this.cache.get(url) !== undefined) {
            htmlText = this.cache.get(url) as string;
        } else {
            htmlText = await load(url);
        }

        if (this.cache && this.cache.get(url) === undefined) {
            this.cache.set(url, htmlText);
        }

        const newDocument = (new DOMParser).parseFromString(htmlText, 'text/html');

        dynamicContainer.forEach((container) => {
            const attribute =  container.getAttribute(this.attributeIdentifier);
            const element = newDocument.querySelector(`[${this.attributeIdentifier}=${attribute}]`);

            if (element) {
                container.replaceWith(element);
            }

        });
    }
}

export default Spa;