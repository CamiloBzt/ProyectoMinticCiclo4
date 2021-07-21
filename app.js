'use strict'

// Cargar modulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');


// Ejecutar express (http)
var app = express();


// Cargar ficheros rutas
var article_routes = require('./routes/task');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// Cargar rutas
app.use('/api', article_routes);   

// Exportar modulo (fichero actual)
module.exports = app;
