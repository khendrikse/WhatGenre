import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import getHashFragments from '../../helpers/get-hash-fragments';

const callback = () => {
  const router = useRouter();
  const { error, state: errorState } = router.query;

  useEffect(() => {
    const sessionState = JSON.parse(sessionStorage.getItem('stateId'));

    if (error && errorState === sessionState) {
      return Router.push({
        pathname: '/',
        query: { error }
      });
    }

    const { access_token: accessToken, state } = getHashFragments();

    if (sessionState !== state) {
      return Router.push({
        pathname: '/',
        query: { error: 'something went wrong' }
      });
    }

    return Router.push({ pathname: '/', query: { accessToken, state } });
  });

  return null;
};

export default callback;
