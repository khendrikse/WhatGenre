import React from 'react';
import PropTypes from 'prop-types';

function GenresList({ genres, onGenreClick, artist, colors }) {
  if (!genres || !artist || !genres.length) return null;
  const {
    id,
    name,
    images: { 0: image }
  } = artist;

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
          <h3>These are</h3>
          <h1>{`${name}'s genres`}</h1>
          <h2>Click on a genre to find other artists.</h2>
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
      <div
        className='color1'
        style={{
          backgroundImage: 'linear-gradient(#000,transparent)',
          backgroundColor: '#51FF00'
        }}
      >
        <div
          className='color2'
          style={{
            backgroundImage: 'linear-gradient(#000,transparent)',
            backgroundColor: '#7400BF'
          }}
        />
        <div
          className='image'
          style={{ backgroundImage: `url(${image.url})` }}
        />
      </div>
    </section>
  );
}

GenresList.propTypes = {
  genres: PropTypes.array,
  onGenreClick: PropTypes.func,
  artist: PropTypes.object,
  colors: PropTypes.array
};

export default GenresList;
