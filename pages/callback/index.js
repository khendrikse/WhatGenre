import { useEffect } from 'react';
import Router from 'next/router';

const callback = () => {
  useEffect(() => {
    // can halso have 'error'. In that case show a notification.
    // make sure to use state
    const query = window.location.hash.slice(1).split('&');
    console.log({ query });
    const accessToken = query
      .find(element => element.includes('access_token'))
      .split('=')[1];

    Router.push({ pathname: '/', query: { accessToken } });
  });

  return null;
};

export default callback;
