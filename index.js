//const jwt = require('jsonwebtoken');
const express = require('express');
const morgan = require('morgan');
const server = express();
const apiRouter = require('./api');

server.use('/api', apiRouter);
server.use(morgan('dev'));


require('dotenv').config();

const {client} = require('./db');

server.use(express.json());
client.connect()

server.use('/', (req, res,next) => {
  console.log(req.body)
  next()
})

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
    Number(req.params.first) + Number(req.params.second)
   }</h1>`);
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
})

