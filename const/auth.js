export const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
export const userInfo = 'https://api.spotify.com/v1/me';
export const callBackUrl =
  process.env === 'production'
    ? 'http://whatgenre.herokuapp.com/callback'
    : 'http://localhost:3000/callback';

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export const authUrl = state =>
  `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${callBackUrl}&scope=user-read-private%20playlist-modify-private%20playlist-modify-public&response_type=token&state=${state}`;
