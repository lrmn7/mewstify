import fetchEndPoint from './fetchEndPoint'

const topTracksEndPoint = 'https://api.spotify.com/v1/me/top/tracks';

const getTopTracks = async (time_range = 'long_term', limit = '5') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = topTracksEndPoint + '?time_range=' + time_range + '&limit=' + limit;
        const tracks = await fetchEndPoint(access_token, endPoint);
        return formatTopTracks(tracks);
    } catch (error) {
        return null;
    }
};

const formatTopTracks = (tracks) => {
    if (!tracks) {
        return null;
    }

    const { items } = tracks;

    const formattedTracks = items.map((track) => {
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

export default getTopTracks;
