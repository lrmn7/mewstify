import fetchEndPoint from './fetchEndPoint'

const playlistsByIdEndPoint = 'https://api.spotify.com/v1/playlists/';

const getPlaylistById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = playlistsByIdEndPoint + id;
        const playlist = await fetchEndPoint(access_token, endPoint);
        return formatPlaylist(playlist);
    } catch (error) {
        return null;
    }
};

const formatPlaylist = (playlist) => {
    if (!playlist) {
        return null;
    }

    const { id, name, description, type, images, collaborative, tracks, external_urls } = playlist;
    const { items } = tracks;
    const { spotify } = external_urls;
    const image = images[1]?.url || images[0]?.url;
    const isPublic = playlist.public;
    const totalTracks = tracks.total;
    const url = spotify;

    return {
        id,
        name,
        description,
        type,
        image,
        collaborative,
        isPublic,
        totalTracks,
        tracks: items.map((item) => {
            const { id, name, artists, album, external_urls } = item.track;
            const { spotify } = external_urls;
            const { images } = album;
            const image = images[1]?.url || images[0]?.url;
            const url = spotify;

            return {
                id,
                name,
                artists: artists.map((artist) => artist.name).join(', '),
                image,
                url,
            };
        }),
        url,
    };
};

export default getPlaylistById;
