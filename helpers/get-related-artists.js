import axios from 'axios';

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
    setRelatedArtists(response.data.artists.items);
    window.sessionStorage.setItem(
      'relatedArtists',
      JSON.stringify(response.data.artists.items)
    );
  }
};

export default getRelatedArtists;
