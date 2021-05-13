import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import getHashFragments from '../../helpers/get-hash-fragments';

const callback = () => {
  const router = useRouter();
  const { error, state: errorState } = router.query;

  useEffect(() => {
    // make sure to use state to check
    if (error) {
      return Router.push({
        pathname: '/',
        query: { error, state: errorState }
      });
    }

    const { access_token: accessToken, state } = getHashFragments();

    return Router.push({ pathname: '/', query: { accessToken, state } });
  });

  return null;
};

export default callback;
