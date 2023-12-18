const load = async (url: string): Promise<string> => {
    // let response: undefined | Response;

    // try {
    //     response = await fetch(url);
    // } catch (error) {
    //     throw new Error(`Failed to fetch ${url}: ${error}`);
    // }

    console.log('load', url)

    return '<h1 data-simple-spa="a">hello world</h1>';
};

export default load;