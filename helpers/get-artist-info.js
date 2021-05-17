import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getArtistInfo = async ({
  formArtist,
  clientToken,
  setNotification,
  setArtist,
  onSuccess
}) =>
  axios
    .get(`https://api.spotify.com/v1/search?q=${formArtist}&type=artist`, {
      headers: {
        Authorization: `Bearer ${clientToken.current}`
      }
    })
    .then(res => {
      const { 0: artist } = res.data.artists.items;

      setArtist(artist);
      setSessionStorageItem('artist', artist);
      onSuccess();
    })
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Something went wrong, please refresh and try again'
      })
    );

export default getArtistInfo;
