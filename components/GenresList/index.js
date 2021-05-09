import React from 'react';
import PropTypes from 'prop-types';
import getRelatedArtists from '../../helpers/get-related-artists';

function GenresList({
  genres,
  setSelectedGenre,
  clientToken,
  setRelatedArtists
}) {
  if (!genres || !genres.length) return null;

  const onClick = genre => {
    setSelectedGenre(genre);
    window.sessionStorage.setItem('selectedGenre', JSON.stringify(genre));

    getRelatedArtists({
      genre,
      clientToken,
      setRelatedArtists
    });
  };

  return (
    <ul>
      {genres.map(genre => (
        <li>
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
  setRelatedArtists: PropTypes.object
};

export default GenresList;
