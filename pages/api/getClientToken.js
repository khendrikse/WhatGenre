import axios from 'axios';
import { spotifyTokenUrl } from '../../const/auth';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const authorizationString = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64'
);

const getClientToken = (req, res) => {
  const options = {
    method: 'post',
    url: spotifyTokenUrl,
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      Authorization: `Basic ${authorizationString}`
    }
  };

  const fetchData = async () => {
    const response = await axios(options);

    if (response && response.status === 200) {
      const { access_token: clientToken } = response.data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ clientToken }));
    }
  };

  fetchData();
};

export default getClientToken;
