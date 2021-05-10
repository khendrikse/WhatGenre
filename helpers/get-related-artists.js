import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getRelatedArtists = ({
  genre,
  clientToken,
  setRelatedArtists,
  setNotification
}) =>
  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=genre:%22${genre}%22&type=artist`,
    headers: {
      Authorization: `Bearer ${clientToken.current}`
    }
  })
    .then(res => {
      const artists = res.data.artists.items;
      setRelatedArtists(artists);
      setSessionStorageItem('relatedArtists', artists);
    })
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Something went wrong, please refresh and try again'
      })
    );

export default getRelatedArtists;
