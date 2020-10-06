'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app= express();
 app.use(cors());

var usuarioRoutes = require('./routes/usuariosRoute');
var categoriasRoutes = require('./routes/categoriaRoute');
var productosRoutes = require('./routes/productosRoute');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api',usuarioRoutes);
app.use('/api',categoriasRoutes);
app.use('/api',productosRoutes);

module.exports = app;