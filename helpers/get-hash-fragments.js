const getHashFragments = () =>
  window.location.hash
    .slice(1)
    .split('&')
    .reduce((acc, curr) => {
      const [key, value] = curr.split('=');

      return { ...acc, [key]: value };
    }, {});

export default getHashFragments;
