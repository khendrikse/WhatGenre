/* eslint-disable no-console */
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = dev ? '5000' : process.env.PORT;
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use((req, res, _next) => {
      if (req.headers['x-forwarded-proto'] === 'http') {
        res.redirect(301, `https://whatgenre.herokuapp.com${req.url}`);
        return;
      }

      res.setHeader(
        'strict-transport-security',
        'max-age=31536000; includeSubDomains; preload'
      );
      _next();
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, error => {
      if (error) throw error;
      console.error(`Listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
