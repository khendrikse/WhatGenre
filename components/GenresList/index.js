import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import getRelatedArtists from '../../helpers/get-related-artists';
import setSessionStorageItem from '../../helpers/set-session-storage-item';

function GenresList({
  genres,
  setSelectedGenre,
  clientToken,
  setRelatedArtists
}) {
  if (!genres || !genres.length) return null;

  const onClick = genre => {
    setSelectedGenre(genre);
    setSessionStorageItem('selectedGenre', genre);

    getRelatedArtists({
      genre,
      clientToken,
      setRelatedArtists
    });
  };

  return (
    <ul>
      {genres.map(genre => (
        <li key={nanoid()}>
          <button type='button' onClick={() => onClick(genre)}>
            {genre}
          </button>
        </li>
      ))}
    </ul>
  );
}

GenresList.propTypes = {
  genres: PropTypes.array,
  setSelectedGenre: PropTypes.func,
  clientToken: PropTypes.object,
  setRelatedArtists: PropTypes.func
};

export default GenresList;
