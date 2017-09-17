const ENDPOINT = '';

export const getData = async () => {
    const url = `${ENDPOINT}/data.json`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error(`DataService getData failed, HTTP status ${response.status}`);
    }
    let data = await response.json();

    return data;
};