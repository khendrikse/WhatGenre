import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const authorizationString = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
);

const getClientToken = async (req, res) => {
  const options = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      Authorization: `Basic ${authorizationString}`
    }
  };

  const fetchData = () =>
    axios(options).then(response => {
      const { access_token: clientToken } = response.data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ clientToken }));
    });

  await fetchData();
};

export default getClientToken;
