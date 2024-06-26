const fetchEndPoint = async (accessToken, endPoint) => {
    const response = await fetch(endPoint, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    });

    if (response.status === 204 || response.status > 400) {
        return null;
    }

    const data = response.json();
    return data;
};

export default fetchEndPoint;
