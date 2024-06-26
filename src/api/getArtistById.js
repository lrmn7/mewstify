import fetchEndPoint from './fetchEndPoint'

const getArtistByIdEndPoint = 'https://api.spotify.com/v1/artists/';

const getArtistById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = getArtistByIdEndPoint + id;
        const artist = await fetchEndPoint(access_token, endPoint);
        return formatArtist(artist);
    } catch (error) {
        return null;
    }
};

const formatArtist = (artist) => {
    if (!artist) {
        return null;
    }
    
    const { id, name, images, genres, type, popularity, followers, external_urls } = artist;
    const { total } = followers;
    const image = images[1].url || images[0].url;
    const url = external_urls.spotify;

    return {
        id,
        name,
        image,
        genres,
        type,
        popularity,
        followers: total,
        url,
    }
};

export default getArtistById;
