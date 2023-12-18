export type PageItem = {
    htmlElements: (Element|null)[];
    htmlText: string;
};

export interface Cache {
    get(key: string): string | undefined;
    set(key: string, item: PageItem): void;
    clear?(): void;
    remove?(key: string): void;
};

export type SpaOptions = {
    cache?: Cache;
    attributeIdentifier?: string;
}