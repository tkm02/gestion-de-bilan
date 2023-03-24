const http = require('http');
const app = require('./app');
const port = 5500;
const server = http.createServer(app);

server.on('listening', () => {
  console.log('Listening on ' + port);
});

server.listen(port);
