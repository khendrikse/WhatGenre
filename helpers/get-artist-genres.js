import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getArtistGenres = async ({
  formArtist,
  clientToken,
  setGenres,
  setNotification
}) =>
  axios
    .get(`https://api.spotify.com/v1/search?q=${formArtist}&type=artist`, {
      headers: {
        Authorization: `Bearer ${clientToken.current}`
      }
    })
    .then(res => {
      const { genres } = res.data.artists.items[0];
      setGenres(genres);
      return setSessionStorageItem('genres', genres);
    })
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Ssssomething went wrong, please refresh and try again'
      })
    );

export default getArtistGenres;
