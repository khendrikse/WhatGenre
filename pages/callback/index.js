import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

const callback = () => {
  const router = useRouter();
  // can halso have 'error'. In that case show a notification.
  const { access_token: accessToken, state } = router.query;

  useEffect(() => {
    Router.push({ pathname: '/', query: { accessToken, state } });
  });

  return null;
};

export default callback;
