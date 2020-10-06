'use strict'
var express = require('express');

var categoriaController = require('../controller/categoriaController');

var api = express.Router();

api.get('/categorias/:idUsuario',  categoriaController.getCategoriasByUsuario);

api.get('/categorias',  categoriaController.getCategorias);

api.post('/addCategoria',categoriaController.guardarCategoria);

api.post('/editCategoria',categoriaController.editarCategoria);

api.delete('/eliminarCategoria/:id',categoriaController.eliminarCategoria);

module.exports = api;