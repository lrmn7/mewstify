import fetchEndPoint from './fetchEndPoint'

const currentUserEndPoint = 'https://api.spotify.com/v1/me';

const getCurrentUser = async () => {
    try {
        const access_token = localStorage.getItem('access_token');
        const user = await fetchEndPoint(access_token, currentUserEndPoint);
        return formatCurrentUser(user);
    } catch (error) {
        return null;
    }
};

const formatCurrentUser = (user) => {
    if (!user) {
        return null;
    }

    const { display_name, email, images, external_urls, product } = user;
    const name = display_name;
    const image = images[0]?.url || null;
    const { spotify } = external_urls;
    const url = spotify;
    
    return {
        name,
        email,
        image,
        url,
        product,
    };
};

export default getCurrentUser;
