'use strict'
var express = require('express');

var UserController = require('../controller/usuarioController');

const {validarJWT} = require('../services/validarJWT');

var api = express.Router();

api.get('/pruebas',  UserController.pruebas);

api.post('/login', UserController.login);

api.post('/register', UserController.guardarUsuario);

api.post('/token', UserController.genToken);

api.get('/reNewtoken', [validarJWT], UserController.reNewToken);
/*
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

api.post('/login', UserController.login);

api.post('/upload-image-user/:id', [md_upload, md_auth.ensureAuth], UserController.uploadImage);

api.get('/get-image-user/:imageFile', UserController.getImageFile);

api.get('/keepers', UserController.getKeepers);
*/
module.exports = api;