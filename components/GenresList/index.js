import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

function GenresList({ genres, onGenreClick }) {
  if (!genres || !genres.length) return null;

  return (
    <ul>
      {genres.map(genre => (
        <li key={nanoid()}>
          <button type='button' onClick={() => onGenreClick(genre)}>
            {genre}
          </button>
        </li>
      ))}
    </ul>
  );
}

GenresList.propTypes = {
  genres: PropTypes.array,
  onGenreClick: PropTypes.func
};

export default GenresList;
