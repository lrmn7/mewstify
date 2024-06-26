import fetchEndPoint from './fetchEndPoint'

const getTrackByIdEndPoint = 'https://api.spotify.com/v1/tracks/';

const getTrackById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = getTrackByIdEndPoint + id;
        const track = await fetchEndPoint(access_token, endPoint);
        return formatTrack(track);
    } catch (error) {
        return null;
    }
};

const formatTrack = (track) => {
    if (!track) {
        return null;
    }
    
    const { id, name, album, artists, duration_ms, external_urls, popularity, explicit, preview_url } = track;
    const { album_type, release_date } = album;
    const { spotify } = external_urls;
    const { images } = album;
    const image = images[1]?.url || images[0]?.url;
    const albumType = album_type;
    const releaseDate = release_date;
    const duration = duration_ms;
    const url = spotify;
    const previewUrl = preview_url;

    return {
        id,
        name,
        image,
        artists: artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
        })),
        albumType,
        releaseDate,
        url,
        duration,
        popularity,
        explicit,
        previewUrl,
    }
};

export default getTrackById;
