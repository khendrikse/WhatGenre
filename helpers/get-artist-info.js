import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getArtistInfo = async ({
  formArtist,
  clientToken,
  setGenres,
  setNotification,
  setArtistId
}) =>
  axios
    .get(`https://api.spotify.com/v1/search?q=${formArtist}&type=artist`, {
      headers: {
        Authorization: `Bearer ${clientToken.current}`
      }
    })
    .then(res => {
      const { genres, id } = res.data.artists.items[0];
      setGenres(genres);
      setArtistId(id);
      setSessionStorageItem('artistId', id);
      return setSessionStorageItem('genres', genres);
    })
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Ssssomething went wrong, please refresh and try again'
      })
    );

export default getArtistInfo;
