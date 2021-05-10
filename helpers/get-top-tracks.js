import axios from 'axios';

const getTopTracks = async ({
  relatedArtists,
  accessToken,
  market,
  setNotification
}) => {
  const promises = relatedArtists.map(artist =>
    axios
      .get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { market }
      })
      .then(({ data }) => data.tracks[0].uri)
      .catch(() =>
        setNotification({
          type: 'error',
          message: 'Something went wrong, please refresh and try again'
        })
      )
  );

  return Promise.all(promises).then(responses => responses);
};

export default getTopTracks;
