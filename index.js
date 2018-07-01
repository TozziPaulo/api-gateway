//index.js
var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const cidadesServiceProxy = httpProxy('https://apicidades.herokuapp.com/cidades');
const categoriasServiceProxy = httpProxy('https://apicategorias.herokuapp.com/categorias');
const estabelecimentosServiceProxy = httpProxy('https://apiestabelecimentos.herokuapp.com/estabelecimentos');

// Proxy request
app.get('/cidades', (req, res, next) => {
  cidadesServiceProxy(req, res, next);
})

app.get('/categorias', (req, res, next) => {
  categoriasServiceProxy(req, res, next);
})

app.get('/estabelecimentos', (req, res, next) => {
  estabelecimentosServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var server = http.createServer(app);
server.listen(3000);