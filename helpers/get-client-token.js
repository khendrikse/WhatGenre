import axios from 'axios';

const getClientToken = clientToken =>
  axios.get('http://localhost:3000/api/getClientToken').then(({ data }) => {
    // eslint-disable-next-line no-param-reassign
    clientToken.current = data.clientToken;
  });

export default getClientToken;
