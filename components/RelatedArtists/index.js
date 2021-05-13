import React from 'react';
import PropTypes from 'prop-types';
import CreatePlaylistBtn from '../CreatePlaylistBtn';

function RelatedArtists({ artists, genre, colors, relatedArtists }) {
  if (!artists) return null;
  return (
    <section
      id='related'
      className='flex-container'
      style={{
        backgroundImage: `linear-gradient(transparent, #000), linear-gradient(90deg,${colors[0]}, ${colors[1]})`
      }}
    >
      <div>
        <h3>These artists have the genre {genre}</h3>
        <br />

        {artists.map(artist => (
          <button type='button' style={{ backgroundColor: '#000' }}>
            {artist.name}
          </button>
        ))}
      </div>
      <CreatePlaylistBtn
        relatedArtists={relatedArtists}
        selectedGenre={genre}
        colors={colors}
      />
    </section>
  );
}

RelatedArtists.propTypes = {
  artists: PropTypes.array
};

export default RelatedArtists;
