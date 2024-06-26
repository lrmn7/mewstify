import fetchEndPoint from './fetchEndPoint'

const relatedArtistEndPoint = 'https://api.spotify.com/v1/artists/';

const getRelatedArtistById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = relatedArtistEndPoint + id + '/related-artists'
        const related = await fetchEndPoint(access_token, endPoint);
        return formatArtists(related);
    } catch (error) {
        return null;
    }
};

const formatArtists = (related) => {
    if (!related) {
        return null;
    }

    const { artists } = related;

    const formattedArtists = artists.map((artist) => {
        const {id, name, images, external_urls} = artist;
        const image = images[1]?.url || images[0]?.url;
        const url = external_urls.spotify;

        return {
            id,
            name,
            image,
            url,
        };
    });

    return formattedArtists;
};

export default getRelatedArtistById;
