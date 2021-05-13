import React from 'react';
import PropTypes from 'prop-types';

function RelatedArtists({ artists, genre, children }) {
  if (!artists) return null;

  return (
    <section id='related' className='flex-container'>
      <div>
        <h3>These artists have the genre {genre}</h3>
        <br />

        {artists.map(artist => (
          <button type='button'>{artist.name}</button>
        ))}
      </div>
      <div>{children}</div>
    </section>
  );
}

RelatedArtists.propTypes = {
  artists: PropTypes.array,
  genre: PropTypes.string,
  children: PropTypes.node
};

export default RelatedArtists;
