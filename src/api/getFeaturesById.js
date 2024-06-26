import fetchEndPoint from './fetchEndPoint'

const getFeaturesByIdEndPoint = 'https://api.spotify.com/v1/audio-features/';

const getFeaturesById = async (id) => {
    try {
        const access_token = localStorage.getItem('access_token');
        const endPoint = getFeaturesByIdEndPoint + id;
        const features = await fetchEndPoint(access_token, endPoint);
        return formatFeatures(features);
    } catch (error) {
        return null;
    }
};

const formatFeatures = (features) => {
    if (!features) {
        return null;
    }

    const { danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, key, mode, time_signature, tempo } = features;
    const time = time_signature;

    return {
        danceability,
        energy,
        loudness,
        speechiness,
        acousticness,
        instrumentalness,
        liveness,
        valence,
        key,
        mode,
        time,
        tempo
    }
};

export default getFeaturesById;
