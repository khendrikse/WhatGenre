import axios from 'axios';

const createPlayList = ({ id, selectedGenre, accessToken, setNotification }) =>
  axios
    .post(
      `https://api.spotify.com/v1/users/${id}/playlists`,
      {
        name: `${selectedGenre
          .split(' ')
          .map(string => string.charAt(0).toUpperCase() + string.slice(1))
          .join(' ')} Artists Top Tracks`,
        description:
          'This playlist was generated with the WhatGenre App. Check it out on: http://whatgenre.herokuapp.com'
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    .catch(() =>
      setNotification({
        type: 'error',
        message: 'Something went wrong, please refresh and try again'
      })
    );

export default createPlayList;
