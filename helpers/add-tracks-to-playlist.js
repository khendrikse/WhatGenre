import axios from 'axios';

const addTracksToPlaylist = ({
  playListId,
  tracks,
  accessToken,
  setNotification
}) =>
  axios
    .post(
      `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
      { uris: tracks },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    .then(() =>
      setNotification({
        type: 'success',
        message: 'Playlist successfully created'
      })
    )
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Something went wrong, please refresh and try again'
      })
    );

export default addTracksToPlaylist;
