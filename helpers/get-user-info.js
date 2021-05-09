import axios from 'axios';

const getUserInfo = accessToken =>
  axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(({ data }) => data);

export default getUserInfo;
