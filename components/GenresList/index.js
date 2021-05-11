import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

function GenresList({ genres, onGenreClick, artist, artistId }) {
  if (!genres || !genres.length) return null;

  return (
    <section id='genres' className='flex-container'>
      <div className='top flex-container'>
        <div className='flex-item genres-list'>
          <ul>
            {genres.map(genre => (
              <li key={nanoid()}>
                <button type='button' onClick={() => onGenreClick(genre)}>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex-item artist-info'>
          <h3>These are</h3>
          <h1>blaaaa's genres</h1>
          <h2>Click on a genre to find other artists.</h2>
          <iframe
            src={`https://open.spotify.com/embed?uri=spotify:artist:${artistId}&view=list`}
            width='250'
            height='100'
            frameBorder='0'
            allowtransparency='true'
          ></iframe>
          <iframe
            src={`https://open.spotify.com/follow/1/?uri=spotify:artist:${artistId}&size=basic&theme=dark`}
            width='250'
            height='56'
            scrolling='no'
            frameBorder='0'
            style={{ border: 'none', overflow: 'hidden' }}
            allowtransparency='true'
          ></iframe>
        </div>
      </div>
    </section>
  );
}

GenresList.propTypes = {
  genres: PropTypes.array,
  onGenreClick: PropTypes.func
};

export default GenresList;
