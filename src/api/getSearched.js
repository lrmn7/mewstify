import fetchEndPoint from './fetchEndPoint'

const searchEndPoint = 'https://api.spotify.com/v1/search';

const getSearched = async (query, type) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = searchEndPoint + '?q=' + query + '&type=' + (type !== 'all' ? type : 'album%2Ctrack%2Cartist%2Cplaylist');
        const search = await fetchEndPoint(access_token, endPoint);

        if (!search) {
            return null;
        }

        switch (type) {
            case 'track':
                return { tracks: formatTracks(search) };
            case 'album':
                return { albums: formatAlbums(search) };
            case 'artist':
                return { artists: formatArtists(search) };
            case 'playlist':
                return { playlists: formatPlaylists(search) };
            case 'all':
                return formatAll(search);
            default:
                return null;
        }

    } catch (error) {
        return null;
    }
};

const formatTracks = (search) => {
    const { tracks } = search;

    return tracks.items.map((track) => {
        return {
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(', '),
            image: track.album.images[1].url,
            url: track.external_urls.spotify,
        };
    });
}

const formatAlbums = (search) => {
    const { albums } = search;

    return albums.items.map((album) => {
        return {
            id: album.id,
            name: album.name,
            artists: album.artists.map((artist) => artist.name).join(', '),
            image: album.images[1].url,
        };
    });
}

const formatArtists = (search) => {
    const { artists } = search;

    return artists.items.map((artist) => {
        return {
            id: artist.id,
            name: artist.name,
            image: artist.images[1]?.url || artist.images[0]?.url || null,
        };
    });
}

const formatPlaylists = (search) => {
    const { playlists } = search;

    return playlists.items.map((playlist) => {
        return {
            id: playlist.id,
            title: playlist.name,
            image: playlist.images[1]?.url || playlist.images[0].url,
        };
    });
}

const formatAll = (search) => {
    return {
        tracks: formatTracks(search),
        albums: formatAlbums(search),
        artists: formatArtists(search),
        playlists: formatPlaylists(search),
    };
}

export default getSearched;
