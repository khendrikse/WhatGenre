import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getRelatedArtists = async ({ genre, clientToken, setRelatedArtists }) => {
  // CHECK IF WE HAVE A CLIENTTOKEN
  const response = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=genre:%22${genre}%22&type=artist`,
    headers: {
      Authorization: `Bearer ${clientToken.current}`
    }
  });

  if (response && response.status === 200) {
    const artists = response.data.artists.items;
    setRelatedArtists(artists);
    setSessionStorageItem('relatedArtists', artists);
  }
};

export default getRelatedArtists;
