'use strict'
var express = require('express');

var productosController = require('../controller/productosController');

var api = express.Router();

api.get('/productos/:idCategoria',  productosController.getProductosByCategoria);

api.get('/productosUsuario/:idUsuario',  productosController.getProductos);

api.get('/producto/:idProducto',  productosController.getProductoById);

api.post('/addProducto',productosController.guardarProducto);

api.post('/editProducto',productosController.editarProducto);

api.delete('/eliminarProducto/:id',productosController.eliminarProducto);

module.exports = api;