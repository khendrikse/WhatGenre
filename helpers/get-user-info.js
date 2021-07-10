import axios from 'axios';

const getUserInfo = ({ accessToken, setNotification }) =>
  axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then(({ data }) => data)
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Something went wrong, please refresh and try again'
      })
    );

export default getUserInfo;
