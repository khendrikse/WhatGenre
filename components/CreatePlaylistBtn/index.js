import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import setSessionStorageItem from '../../helpers/set-session-storage-item';
import authUrl from '../../const/authUrl';

function CreatePlaylistBtn({ relatedArtists, selectedGenre, colors }) {
  if (relatedArtists && selectedGenre) {
    return (
      <button
        className='playlist'
        style={{
          backgroundColor: colors[0],
          minHeight: '60px',
          fontWeight: '500'
        }}
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
