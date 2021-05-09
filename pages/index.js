import React, { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { authUrl } from '../const/auth';
import styles from '../styles/Home.module.css';
import getTopTracks from '../helpers/get-top-tracks';

const Home = () => {
  const router = useRouter();
  const clientToken = useRef(null);
  const [accessToken, setAccessToken] = useState(null);
  const [artist, setArtist] = useState(null);
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (router.query.accessToken) {
      setAccessToken(router.query.accessToken);
      Router.push({ pathname: '/' });
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      const { sessionStorage } = window;
      const sessionArtist = sessionStorage.getItem('artist');
      const sessionSelectedGenre = sessionStorage.getItem('selectedGenre');
      const sessionGenres = sessionStorage.getItem('genres');
      const sessionRelatedArtists = sessionStorage.getItem('relatedArtists');
      if (sessionSelectedGenre) {
        setSelectedGenre(JSON.parse(sessionSelectedGenre));
      }
      if (sessionArtist) {
        setArtist(JSON.parse(sessionArtist));
      }
      if (sessionGenres) {
        setGenres(JSON.parse(sessionGenres));
      }
      if (sessionRelatedArtists) {
        setRelatedArtists(JSON.parse(sessionRelatedArtists));
      }
    }
  }, [accessToken]);

  useEffect(async () => {
    if (accessToken && relatedArtists && selectedGenre) {
      axios
        .get('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(({ data }) => {
          const { id, country: market } = data;
          axios
            .post(
              `https://api.spotify.com/v1/users/${id}/playlists`,
              {
                name: `${selectedGenre
                  .split(' ')
                  .map(
                    string => string.charAt(0).toUpperCase() + string.slice(1)
                  )
                  .join(' ')} Artists Top Tracks`,
                description:
                  'This playlist was generated with the WhatGenre App. Check it out on: http://whatgenre.herokuapp.com'
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            .then(async ({ data: { id: playListId } }) => {
              const tracks = await getTopTracks(
                relatedArtists,
                accessToken,
                market
              );

              axios
                .post(
                  `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
                  { uris: tracks },
                  {
                    headers: { Authorization: `Bearer ${accessToken}` }
                  }
                )
                .then(() =>
                  setNotification({
                    type: 'success',
                    message: 'Playlist successfully created'
                  })
                )
                .catch(() =>
                  setNotification({
                    type: 'error',
                    message:
                      'Something went wrong, please refresh and try again'
                  })
                );
            });
        });
    }
  }, [accessToken, relatedArtists, selectedGenre]);

  const getGenres = async artist => {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${clientToken.current}`
        }
      }
    );

    if (response && response.status === 200) {
      setGenres(response.data.artists.items[0].genres);
      window.sessionStorage.setItem(
        'genres',
        JSON.stringify(response.data.artists.items[0].genres)
      );
    }
  };

  // set base url somewhere
  const getClientToken = () =>
    axios.get('http://localhost:3000/api/getClientToken').then(({ data }) => {
      clientToken.current = data.clientToken;
    });

  const getRelatedArtists = async genre => {
    setSelectedGenre(genre);
    window.sessionStorage.setItem('selectedGenre', JSON.stringify(genre));
    // CHECK IF WE HAVE A CLIENTTOKEN
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=genre:%22${genre}%22&type=artist`,
      headers: {
        Authorization: `Bearer ${clientToken.current}`
      }
    });

    if (response && response.status === 200) {
      setRelatedArtists(response.data.artists.items);
      window.sessionStorage.setItem(
        'relatedArtists',
        JSON.stringify(response.data.artists.items)
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sups</h1>
        <form
          onSubmit={async e => {
            e.preventDefault();

            const form = new FormData(e.target);
            const formArtist = form.get('artist');
            setArtist(formArtist);
            window.sessionStorage.setItem('artist', JSON.stringify(formArtist));
            if (!clientToken.current) {
              await getClientToken();
            }

            await getGenres(formArtist);
          }}
        >
          <input name='artist' type='text' defaultValue={artist} required />
          <button type='submit'>search</button>
        </form>
        <ul>
          {genres &&
            genres.length &&
            genres.map(genre => (
              <li>
                <button type='button' onClick={() => getRelatedArtists(genre)}>
                  {genre}
                </button>
              </li>
            ))}
        </ul>
        <ul>
          {relatedArtists &&
            relatedArtists.map(artist => <li>{artist.name}</li>)}
          <button
            type='button'
            onClick={() => {
              window.location.href = authUrl('123');
            }}
          >
            create playlist
          </button>
        </ul>
        {notification && (
          <p style={{ color: notification.type === 'error' ? 'red' : 'green' }}>
            {notification.message}
          </p>
        )}
      </main>

      <footer className={styles.footer}>
        <h2>Floop</h2>
      </footer>
    </div>
  );
};

export default Home;
