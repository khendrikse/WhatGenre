import React from 'react';
import PropTypes from 'prop-types';

function RelatedArtists({ artists }) {
  if (!artists) return null;
  return (
    <ul>
      {artists.map(artist => (
        <li>{artist.name}</li>
      ))}
    </ul>
  );
}

RelatedArtists.propTypes = {
  artists: PropTypes.array
};

export default RelatedArtists;
