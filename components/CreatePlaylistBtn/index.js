import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import setSessionStorageItem from '../../helpers/set-session-storage-item';
import { authUrl } from '../../const/auth';

function CreatePlaylistBtn({ relatedArtists, selectedGenre }) {
  if (relatedArtists && selectedGenre) {
    return (
      <button
        type='button'
        onClick={() => {
          const authState = nanoid();
          setSessionStorageItem('stateId', authState);
          window.location.href = authUrl(authState);
        }}
      >
        create playlist
      </button>
    );
  }

  return null;
}

CreatePlaylistBtn.propTypes = {
  relatedArtists: PropTypes.array,
  selectedGenre: PropTypes.string
};

export default CreatePlaylistBtn;
