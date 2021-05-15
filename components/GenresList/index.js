import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import setSessionStorageItem from '../../helpers/set-session-storage-item';
import getClientToken from '../../helpers/get-client-token';
import getRelatedArtists from '../../helpers/get-related-artists';
import Notification from '../Notification';

function GenresList({
  artist,
  setSelectedGenre,
  setRelatedArtists,
  clientToken
}) {
  const [notification, setNotification] = useState({});

  if (!artist) return null;
  const {
    id,
    name,
    genres,
    images: { 0: image }
  } = artist;

  const onGenreClick = async genre => {
    setSelectedGenre(genre);
    setSessionStorageItem('selectedGenre', genre);

    if (!clientToken.current) {
      await getClientToken(clientToken);
    }

    await getRelatedArtists({
      genre,
      clientToken,
      setRelatedArtists,
      setNotification
    });

    Router.push('/#related', undefined, { shallow: true });
  };

  return (
    <section id='genres' className='flex-container'>
      <div className='top flex-container'>
        <div className='flex-item genres-list'>
          {genres.map(genre => (
            <button type='button' onClick={() => onGenreClick(genre)}>
              {genre}
            </button>
          ))}
        </div>
        <div className='flex-item artist-info'>
          <h2>{`${name}'s genres`}</h2>
          <h3>Click on a genre to find other artists.</h3>
          <br />
          <iframe
            src={`https://open.spotify.com/embed?uri=spotify:artist:${id}&view=list`}
            width='250'
            height='100'
            frameBorder='0'
            allowtransparency='true'
            title='embedPlayer'
          />
          <iframe
            src={`https://open.spotify.com/follow/1/?uri=spotify:artist:${id}&size=basic&theme=dark`}
            width='250'
            height='56'
            scrolling='no'
            frameBorder='0'
            style={{ border: 'none', overflow: 'hidden' }}
            allowtransparency='true'
            title='follow'
          />
        </div>
      </div>
      <div className='color1'>
        <div className='color2' />
        <div
          className='image'
          style={{ backgroundImage: `url(${image.url})` }}
        />
      </div>
      <Notification notification={notification} />
    </section>
  );
}

GenresList.propTypes = {
  setSelectedGenre: PropTypes.func,
  artist: PropTypes.object,
  clientToken: PropTypes.object,
  setRelatedArtists: PropTypes.func
};

export default GenresList;
