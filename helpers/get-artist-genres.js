import axios from 'axios';
import setSessionStorageItem from './set-session-storage-item';

const getArtistGenres = async ({ formArtist, clientToken, setGenres }) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${formArtist}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${clientToken.current}`
      }
    }
  );

  if (response && response.status === 200) {
    const { genres } = response.data.artists.items[0];
    setGenres(genres);
    setSessionStorageItem('genres', genres);
  }
};

export default getArtistGenres;
