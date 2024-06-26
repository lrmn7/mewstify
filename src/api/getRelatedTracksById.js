import fetchEndPoint from './fetchEndPoint'

const relatedTracksEndPoint = 'https://api.spotify.com/v1/recommendations?limit=10';

const getRelatedTracksById = async (artist, track) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = relatedTracksEndPoint + '&seed_artists=' + artist + '&seed_tracks=' + track;
        const related = await fetchEndPoint(access_token, endPoint);
        return formatTracks(related);
    } catch (error) {
        return null;
    }
};

const formatTracks = (related) => {
    if (!related) {
        return null;
    }

    const { tracks } = related;

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

export default getRelatedTracksById;
