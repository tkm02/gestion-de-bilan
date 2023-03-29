const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5010;
const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  // console.log('Listening on ' + port);
});

