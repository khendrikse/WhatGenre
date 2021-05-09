import axios from 'axios';

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
    setGenres(response.data.artists.items[0].genres);
    window.sessionStorage.setItem(
      'genres',
      JSON.stringify(response.data.artists.items[0].genres)
    );
  }
};

export default getArtistGenres;
