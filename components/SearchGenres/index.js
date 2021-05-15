import React, { useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Notification from '../Notification';
import getClientToken from '../../helpers/get-client-token';
import getArtistInfo from '../../helpers/get-artist-info';

function SearchGenres({ clientToken, setArtist, artist }) {
  const [notification, setNotification] = useState({});

  const onFormSubmit = async e => {
    e.preventDefault();
    const formArtist = new FormData(e.target).get('artist');

    if (!clientToken.current) {
      await getClientToken(clientToken);
    }

    await getArtistInfo({
      formArtist,
      clientToken,
      setNotification,
      setArtist
    });

    Router.push('/#genres', undefined, { shallow: true });
  };

  return (
    <section id='first-section' className='flex-container'>
      <div className='flex-item welcome-message'>
        <h2>Check your music taste. </h2>
        <h3 id='search-title'>What's your favourite artist's genre?</h3>
      </div>
      <div className='flex-item search-block'>
        <form onSubmit={onFormSubmit}>
          <input
            placeholder='Artist'
            name='artist'
            type='text'
            aria-labelledby='search-title'
            defaultValue={artist && artist.name}
            required
          />
          <button type='submit'>search</button>
        </form>
      </div>
      <Notification notification={notification} />
    </section>
  );
}

SearchGenres.propTypes = {
  artist: PropTypes.object,
  clientToken: PropTypes.object,
  setArtist: PropTypes.func
};

export default SearchGenres;
