import React, { useState, useEffect, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import getTopTracks from '../helpers/get-top-tracks';
import getUserInfo from '../helpers/get-user-info';
import createPlayList from '../helpers/create-playlist';
import addTracksToPlaylist from '../helpers/add-tracks-to-playlist';
import RelatedArtists from '../components/RelatedArtists';
import GenresList from '../components/GenresList';
import Notification from '../components/Notification';
import SearchGenres from '../components/SearchGenres';
import CreatePlaylistBtn from '../components/CreatePlaylistBtn';
import NavBar from '../components/NavBar';

const Home = () => {
  const router = useRouter();
  const clientToken = useRef(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [artist, setArtist] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [relatedArtists, setRelatedArtists] = useState(null);
  const [notification, setNotification] = useState(null);
  const scrollToRelated = () =>
    Router.push('/#related', undefined, { shallow: true });

  useEffect(() => {
    if (router.query.accessToken) {
      setAccessToken(router.query.accessToken);
      scrollToRelated();
    } else if (router.query.error) {
      setError(router.query.error);
      scrollToRelated();
      setNotification({
        type: 'error',
        message: 'Something went wrong, please refresh and try again'
      });
    }
  }, []);

  useEffect(() => {
    if (accessToken || error) {
      const { sessionStorage } = window;
      const sessionArtist = sessionStorage.getItem('artist');
      const sessionSelectedGenre = sessionStorage.getItem('selectedGenre');
      const sessionRelatedArtists = sessionStorage.getItem('relatedArtists');
      if (sessionSelectedGenre) {
        setSelectedGenre(JSON.parse(sessionSelectedGenre));
      }
      if (sessionArtist) {
        setArtist(JSON.parse(sessionArtist));
      }
      if (sessionRelatedArtists) {
        setRelatedArtists(JSON.parse(sessionRelatedArtists));
      }
    }
  }, [accessToken, error]);

  useEffect(async () => {
    if (accessToken && relatedArtists && selectedGenre) {
      getUserInfo({ accessToken, setNotification }).then(
        ({ id, country: market }) =>
          createPlayList({
            id,
            selectedGenre,
            accessToken,
            setNotification
          }).then(async ({ data: { id: playListId } }) => {
            const tracks = await getTopTracks({
              relatedArtists,
              accessToken,
              market,
              setNotification
            });
            addTracksToPlaylist({
              playListId,
              tracks,
              accessToken,
              setNotification
            });
          })
      );
    }
  }, [accessToken, relatedArtists, selectedGenre]);

  return (
    <div>
      <Head>
        <title>WhatGenre</title>
        <meta
          name='description'
          content={"Find your favorite artist's genre"}
        />
        <link
          href='https://fonts.googleapis.com/css?family=Rubik:300,400,500'
          rel='stylesheet'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />
      <main>
        <SearchGenres
          setArtist={setArtist}
          clientToken={clientToken}
          artist={artist}
        />
        <GenresList
          setSelectedGenre={setSelectedGenre}
          setRelatedArtists={setRelatedArtists}
          clientToken={clientToken}
          artist={artist}
        />
        <RelatedArtists
          genre={selectedGenre}
          artists={relatedArtists}
          relatedArtists={relatedArtists}
        >
          <CreatePlaylistBtn
            relatedArtists={relatedArtists}
            selectedGenre={selectedGenre}
          />
          <Notification notification={notification} />
        </RelatedArtists>
      </main>
    </div>
  );
};

export default Home;
