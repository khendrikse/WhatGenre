import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getClientToken = clientToken =>
  axios.get(`${baseUrl}/api/getClientToken`).then(({ data }) => {
    // eslint-disable-next-line no-param-reassign
    clientToken.current = data.clientToken;
  });

export default getClientToken;
