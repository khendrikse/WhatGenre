import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Notification from '../Notification';

function SearchGenres({ setArtistData, artist }) {
  const [notification, setNotification] = useState({});

  const onFormSubmit = async e => {
    e.preventDefault();
    const formArtist = new FormData(e.target).get('artist');

    setArtistData(formArtist, setNotification);
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
  setArtistData: PropTypes.func
};

export default SearchGenres;
