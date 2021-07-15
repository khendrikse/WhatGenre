const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = process.env.PORT;
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use((req, res, next) => {
      const hostname = process.env.HOSTNAME;
      if (
        req.headers['x-forwarded-proto'] === 'http' ||
        req.hostname === process.env.HOSTNAME
      ) {
        res.redirect(301, `https://${hostname}${req.url}`);
        return;
      }

      res.setHeader(
        'strict-transport-security',
        'max-age=31536000; includeSubDomains; preload'
      );
      next();
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, error => {
      if (error) throw error;
      console.error(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
