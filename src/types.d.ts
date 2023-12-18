export interface PageResult {
    [key: string]: string;
}

export interface Cache {
    get(key: string): string | undefined;
    set(key: string, content: string): void;
    clear?(): void;
    remove?(key: string): void;
};

export type SpaOptions = {
    cache?: Cache;
    attributeIdentifier?: string;
}