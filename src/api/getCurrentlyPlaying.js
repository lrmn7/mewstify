import fetchEndPoint from './fetchEndPoint'

const currentlyPlayingEndPoint = 'https://api.spotify.com/v1/me/player/currently-playing';

const getCurrentlyPlaying = async () => {
    try {
        const access_token = localStorage.getItem('access_token');
        const song = await fetchEndPoint(access_token, currentlyPlayingEndPoint);
        return formatCurrentlyPlaying(song);
    } catch (error) {
        return null;
    }
};

const formatCurrentlyPlaying = (song) => {
    if (!song) {
        return null;
    }
    
    const track = song.item;
    const { id, name, artists, album, duration_ms } = track;
    const { images } = album;
    const image = images[1]?.url || images[0]?.url;
    const durationMs = duration_ms;
    const progressMs = song.progress_ms;
    const isPlaying = song.is_playing;

    return {
        id,
        name,
        artists: artists.map((artist) => artist.name).join(', '),
        image,
        durationMs,
        progressMs,
        isPlaying,
    };
};

export default getCurrentlyPlaying;
