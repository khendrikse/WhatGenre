import axios from 'axios';

const getTopTracks = async ({ relatedArtists, accessToken, market }) => {
  const promises = relatedArtists.map(artist =>
    axios
      .get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { market }
      })
      .then(({ data }) => data.tracks[0].uri)
  );

  return Promise.all(promises).then(responses => responses);
};

export default getTopTracks;
