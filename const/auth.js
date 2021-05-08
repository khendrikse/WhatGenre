export const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
export const callBackUrl =
  process.env === 'production'
    ? 'http://whatgenre.herokuapp.com/callback'
    : 'http://localhost:3000/callback';

export const authUrl = state =>
  `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${callBackUrl}&response_type=code&state=${state}`;
