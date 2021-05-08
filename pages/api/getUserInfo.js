import axios from 'axios';
import { callBackUrl, userInfo } from '../../const/auth';

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const getUserInfo = (req, res) => {
  const { code } = req.body;

  const options = {
    method: 'post',
    url: userInfo,
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: callBackUrl
    },
    headers: {
      Authorization:
        'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    }
  };

  const fetchData = () =>
    new Promise((resolve, reject) => {
      const response = axios(options);
      console.log('------------------------------');
      if (response && response.status === 200) {
        const { access_token: accessToken } = response.data;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ accessToken }));
        resolve();
      }
    });

  fetchData();
};

export default getUserInfo;
