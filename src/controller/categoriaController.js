'use strict'
const conexion = require('../database');

var path = require('path');

function getCategorias(req, res) {

    conexion.query('SELECT * FROM categorias', function (error, results, fields) {
        if (error) {
            throw error;
        }

        res.status(200).send({
            message: 'probando el controlador de user',
            data: results
        });

    });
}

function getCategoriasByUsuario(req, res) {

    const { idUsuario } = req.params;

    conexion.query('SELECT * FROM categorias where idUsuario=?', [idUsuario], function (error, results, fields) {
        if (error) {
            res.status(500).send({
                result: false,
                mensage: 'Error al listar las categorias',
                data: results
            });
        }

        res.status(200).send({
            result: true,
            mensage: 'Se cargaron las categorias correctamente',
            data: results
        });
    });
}

function guardarCategoria(req, res) {

    let { nombre, descripcion, idUsuario } = req.body;

    conexion.query('SELECT * FROM categorias where idUsuario=? and nombre=?', [idUsuario, nombre], function (error, results, fields) {

        if (error) {
            res.status(500).send({
                mensaje: 'Error al comprobar la categoria',
                result: false
            });
        } else {

            if (!results[0]) {
                conexion.query('INSERT INTO categorias(nombre, descripcion, idUsuario) VALUES(?, ?, ?)',
                    [nombre, descripcion, idUsuario], function (error, resultData, fieldData) {
                        if (error) {
                            res.status(500).send({
                                mensaje: 'Error al agregar la categoria',
                                result: false
                            });
                        } else {
                            if (!resultData) {
                                res.status(404).send({
                                    mensage: 'No se logró registrar la categoria',
                                    result: false
                                });
                            } else {


                                conexion.query('SELECT * FROM categorias where id=?', [resultData.insertId], function (error, results, fields) {
                                    
                                    res.status(200).send({
                                        mensaje: 'Se agregó categoria exitosamente',
                                        result: true,
                                        data: results[0]
                                    });
                                });


                            }
                        }

                    });


            } else {
                res.status(200).send({
                    mensaje: 'Ya existe una categoria con este nombre y para este usuario ',
                    result: false
                });
            }
        }
    });
}

function editarCategoria(req, res) {
    const { id, nombre, descripcion, idUsuario } = req.body;

    conexion.query('SELECT * FROM categorias WHERE nombre=? AND idUsuario=? AND id !=?',
        [nombre, idUsuario, id], function (error, resultData, fieldData) {

            if (error) {
                console.log(error);
                res.status(500).send({
                    mensaje: 'Error al editar la categoria dsdd',
                    result: false
                });
            } else {
                
                if (resultData[0] === undefined) {

                    conexion.query('UPDATE categorias SET nombre=?, descripcion=? WHERE id=?',
                        [nombre, descripcion, id], function (error, resultData, fieldData) {
                            if (error) {
                                res.status(500).send({
                                    mensaje: 'Error al editar la categoria',
                                    result: false
                                });
                            } else {
                                if (!resultData) {
                                    res.status(404).send({
                                        mensage: 'No se logró editar la categoria',
                                        result: false
                                    });
                                } else {
                                    res.status(200).send({
                                        mensaje: 'Se edito la categoria exitosamente',
                                        result: true
                                    });
                                }
                            }
                        });

                } else {
                    res.status(200).send({
                        mensaje: 'Ya existe una categoria con este nombre',
                        result: false
                    });
                }

            }
        });

}

function eliminarCategoria(req, res) {

    //const { id } = req.body;
    const { id } = req.params;
    
    conexion.query('SELECT * FROM productos WHERE idCategoria = ?', [id], (error, resultData, fieldData) => {

        if (error) {
            res.status(500).send({
                mensaje: 'Error al verificar si la categoria posee productos',
                result: false
            });
        } else {
            if (resultData[0] === undefined) {

                conexion.query('DELETE FROM categorias WHERE id = ?', [id], (error, resultData, fieldData) => {
                    if (error) {
                        res.status(500).send({
                            mensaje: 'Error al eliminar la categoria',
                            result: false
                        });
                    } else {
                        if (!resultData) {

                            res.status(404).send({
                                mensage: 'No se logró eliminar la categoria',
                                result: false
                            });
                        } else {
                            res.status(200).send({
                                mensaje: 'Se elimino la categoria exitosamente',
                                result: true
                            });
                        }
                    }
                });


            } else {

                res.status(200).send({
                    mensaje: 'La categoria no se logró eliminar porque contiene productos',
                    result: false
                });
            }
        }
    });
}

module.exports = {
    getCategorias,
    getCategoriasByUsuario,
    guardarCategoria,
    editarCategoria,
    eliminarCategoria
};