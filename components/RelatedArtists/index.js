import React from 'react';
import PropTypes from 'prop-types';

function RelatedArtists({ artists, genre, children, setArtistData }) {
  if (!artists) return null;

  return (
    <section id='related' className='flex-container'>
      <div>
        <h2>These artists have the genre {genre}</h2>
        <br />

        {artists.map((artist, i) => (
          <button
            key={`${artist}-${i}`}
            type='button'
            onClick={() => setArtistData(artist.name)}
          >
            {artist.name}
          </button>
        ))}
      </div>
      <div>{children}</div>
    </section>
  );
}

RelatedArtists.propTypes = {
  artists: PropTypes.array,
  genre: PropTypes.string,
  children: PropTypes.node,
  setArtistData: PropTypes.func
};

export default RelatedArtists;
