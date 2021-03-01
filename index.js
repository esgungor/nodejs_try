const http = require('http');


const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Kae System Hello world now its v2');
  
});

server.listen(port,  () => {
  console.log("We are working on LocalServer for first tries.")
  console.log("http://127.0.0.1:4000 reach me from here ")
});