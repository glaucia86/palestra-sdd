const path = require('path');
const liveServer = require('live-server');
const noCacheMiddleware = require('./no-cache-middleware');

const args = process.argv.slice(2);
const noBrowser = args.includes('--no-browser');

liveServer.start({
  port: 3000,
  host: '0.0.0.0',
  root: path.resolve(__dirname, '..'),
  open: noBrowser ? false : '/index.html',
  wait: 100,
  logLevel: 2,
  middleware: [noCacheMiddleware],
});
