import { SPOTIFY } from '../constants/spotify.js';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const { REDIRECT_URI, AUTH_ENDPOINT, TOKEN_ENDPOINT, SCOPES } = SPOTIFY;

const CURRENT_TOKEN = {
    access_token: localStorage.getItem('access_token') || '',
    refresh_token: localStorage.getItem('refresh_token') || '',
    expires_in: localStorage.getItem('expires_in') || '',
    expires_at: localStorage.getItem('expires_at') || '',

    save: (token) => {
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('refresh_token', token.refresh_token);
        localStorage.setItem('expires_in', token.expires_in);
        localStorage.setItem('expires_at', Date.now() + token.expires_in * 1000);
    },
};

const generateRandomString = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(64));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

const base64encode = (input) => {
    return btoa(String.fromCharCode
        .apply(null, new Uint8Array(input)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Get a code challenge
const getCodeChallenge = async (codeVerifier) => {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    return codeChallenge;
}

// Generate a URL with query parameters
const generateUrl = (base, params) => {
    const url = new URL(base);
    url.search = new URLSearchParams(params).toString();
    return url.toString();
}

// Redirect the user
async function redirectToSpotifyAuthorize() {
    const codeVerifier = generateRandomString();
    const codeChallenge = await getCodeChallenge(codeVerifier);
    localStorage.setItem('code_verifier', codeVerifier);
    localStorage.setItem('code_challenge', codeChallenge);

    const params = {
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: REDIRECT_URI,
    }

    window.location.href = generateUrl(AUTH_ENDPOINT, params);
}

// Get the code from the URL
const getCodeFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
};

async function getToken(code) {
    const codeVerifier = localStorage.getItem('code_verifier');

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            code_verifier: codeVerifier,
        }),
    });

    return await response.json();
}

async function refreshToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'refresh_token',
            refresh_token: CURRENT_TOKEN.refresh_token
        }),
    });

    return await response.json();
}

async function getAccessToken() {
    const code = getCodeFromUrl();

    if (code) {
        const token = await getToken(code);
        CURRENT_TOKEN.save(token);

        window.location.href = '/home';
    }
}

getAccessToken();

export async function logIn() {
    await redirectToSpotifyAuthorize();
}

export async function logOut() {
    localStorage.clear();
    window.location.href = REDIRECT_URI;
}

export async function autoRefreshToken() {
    const expiresAt = localStorage.getItem('expires_at');

    if (Date.now() > expiresAt) {
        const token = await refreshToken();
        CURRENT_TOKEN.save(token);
    }
}
