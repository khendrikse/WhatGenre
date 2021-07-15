const express = require('express');
const next = require('next');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = dev ? '5000' : process.env.PORT;
const handle = app.getRequestHandler();
console.log({ hostname: process.env });
app
  .prepare()
  .then(() => {
    const server = express();
    server.use((req, res, next) => {
      const { host } = parse(process.env.HOSTNAME);

      if (
        req.headers['x-forwarded-proto'] === 'http' ||
        req.hostname === host
      ) {
        res.redirect(301, `https://${host}${req.url}`);
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
      console.error(`Listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
