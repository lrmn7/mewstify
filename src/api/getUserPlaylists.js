import fetchEndPoint from './fetchEndPoint'

const playlistsEndPoint = 'https://api.spotify.com/v1/me/playlists';

const getPlaylists = async () => {
    try {
        const access_token = localStorage.getItem('access_token');
        const playlists = await fetchEndPoint(access_token, playlistsEndPoint);
        return formatPlaylists(playlists);
    } catch (error) {
        return null;
    }
};

const formatPlaylists = (playlists) => {
    if (!playlists) {
        return null;
    }

    const { items } = playlists;

    const formattedPlaylists = items.map((playlist) => {
        const { id, name, images } = playlist;
        const title = name;
        const image = images[1]?.url || images[0]?.url;
        const isPublic = playlist.public;

        return {
            id,
            title,
            image,
            isPublic,
        };
    });

    return formattedPlaylists;
};

export default getPlaylists;
