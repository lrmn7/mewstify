import fetchEndPoint from './fetchEndPoint'

const topTracksEndPoint = 'https://api.spotify.com/v1/artists/';

const getTopTracksById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = topTracksEndPoint + id + '/top-tracks?market=ES'
        const topTracks = await fetchEndPoint(access_token, endPoint);
        return formatTopTracks(topTracks);
    } catch (error) {
        return null;
    }
};

const formatTopTracks = (topTracks) => {
    if (!topTracks) {
        return null;
    }

    const { tracks } = topTracks;

    const formattedTracks = tracks.map((track) => {
        const { id, name, artists, album, external_urls, preview_url } = track;
        const { images } = album;
        const image = images[1]?.url || images[0]?.url;
        const url = external_urls.spotify;
        const previewUrl = preview_url;

        return {
            id,
            name,
            artists: artists.map((artist) => artist.name).join(', '),
            image,
            url,
            previewUrl,
        };
    });

    return formattedTracks;
};

export default getTopTracksById;
