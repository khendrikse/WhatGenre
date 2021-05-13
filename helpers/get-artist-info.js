import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getArtistInfo = async ({
  formArtist,
  clientToken,
  setGenres,
  setNotification,
  setArtist
}) =>
  axios
    .get(`https://api.spotify.com/v1/search?q=${formArtist}&type=artist`, {
      headers: {
        Authorization: `Bearer ${clientToken.current}`
      }
    })
    .then(res => {
      const { 0: artist } = res.data.artists.items;

      setGenres(artist.genres);
      setArtist(artist);
      setSessionStorageItem('artist', artist);
      return setSessionStorageItem('genres', artist.genres);
    })
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Ssssomething went wrong, please refresh and try again'
      })
    );

export default getArtistInfo;
