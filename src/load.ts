const load = async (url: string): Promise<string> => {
    let response: undefined | Response;

    try {
        response = await fetch(url);
    } catch (error) {
        throw new Error(`Failed to fetch ${url}: ${error}`);
    }

    return response.text();
};

export default load;