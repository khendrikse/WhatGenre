/* eslint-disable max-len */
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const authUrl = state =>
  `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${baseUrl}/callback&scope=user-read-private%20playlist-modify-private%20playlist-modify-public&response_type=token&state=${state}`;

export default authUrl;
