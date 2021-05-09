import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

function RelatedArtists({ artists }) {
  if (!artists) return null;
  return (
    <ul>
      {artists.map(artist => (
        <li key={nanoid()}>{artist.name}</li>
      ))}
    </ul>
  );
}

RelatedArtists.propTypes = {
  artists: PropTypes.array
};

export default RelatedArtists;
