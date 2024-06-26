import fetchEndPoint from './fetchEndPoint'

const recentlyPlayedEndPoint = 'https://api.spotify.com/v1/me/player/recently-played';

const getRecentlyPlayed = async (limit = '1') => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = recentlyPlayedEndPoint + '?limit=' + limit;
        const tracks = await fetchEndPoint(access_token, endPoint);
        return formatRecentlyPlayed(tracks);
    } catch (error) {
        return null;
    }
};

const formatRecentlyPlayed = (tracks) => {
    if (!tracks) {
        return null;
    }

    const { items } = tracks;

    const formattedTracks = items.map((item) => {
        const { id, name, artists, album, duration_ms, external_urls, preview_url } = item.track;
        const { url } = external_urls;
        const { images } = album;
        const image = images[1]?.url || images[0]?.url;
        const durationMs = duration_ms;
        const previewUrl = preview_url;
        const playedAt = item.played_at;

        return {
            id,
            name,
            artists: artists.map((artist) => artist.name).join(', '),
            image,
            durationMs,
            url,
            previewUrl,
            playedAt,
        };
    });

    return formattedTracks;
};

export default getRecentlyPlayed;
