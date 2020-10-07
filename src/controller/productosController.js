'use strict'
const conexion = require('../database');

var path = require('path');

function getProductos(req,res){

    const {idUsuario} = req.params;
      
    conexion.query('SELECT '+
                'p.id AS id, p.nombre AS nombre, c.nombre AS tipo, p.idCategoria AS idCategoria, '+
                'p.precio AS precio, p.cantidad AS cantidad '+
                'FROM productos p JOIN categorias c '+
                'WHERE p.idCategoria=c.id AND c.idUsuario=?;',[idUsuario], function (error, results, fields) {
        if (error){
            res.status(200).send({
                message:'Error al listar los productos de este usuario',
                data:results,
                result:false
        });    
        }
        
        res.status(200).send({
                message:'Listando productos para el usuario',
                data:results,
                result:true
        });    
    
    });   
}

function getProductosByCategoria(req,res){
    
    const {idCategoria} =req.params;

    conexion.query('SELECT p.id AS id, p.nombre AS nombre, c.nombre AS tipo, p.idCategoria AS idCategoria, p.precio AS precio, p.cantidad AS cantidad '+ 
                    'FROM productos p '+
                    'JOIN categorias c ' +
                    'WHERE idCategoria=c.id  AND idCategoria=?',[idCategoria], function (error, results, fields) {
        if (error){
            res.status(200).send({
                message:'Error al listar productos por categoria',
                data:results,
                result:false
            });
        }
       
        res.status(200).send({
                message:'Lista de productos por categoria',
                data:results,
                result:true
        });    
        
    });   
}

function getProductoById(req,res){
    
    const {idProducto} =req.params;
    console.log(idProducto);
    conexion.query('SELECT p.id AS id, p.nombre AS nombre, c.nombre AS tipo, p.idCategoria AS idCategoria, p.precio AS precio, p.cantidad AS cantidad '+ 
                    'FROM productos p '+
                    'JOIN categorias c ' +
                    'WHERE idCategoria=c.id  AND p.id=?',[idProducto], function (error, results, fields) {
        if (error){
            res.status(200).send({
                message:'Error al buscar el producto',
                data:results,
                result:false
            });
        }
               
        if(results.length === 0){
            res.status(200).send({
                message:'No se ha encontrado un producto con ese nombre',
                data:results,
                result:true
            });        
            
        }else{
            res.status(200).send({
                message:'Producto encontrado',
                data:results,
                result:true
            });        
        }

        
        
    });   
}

function guardarProducto(req, res) {

    let { nombre, idCategoria, precio, cantidad } = req.body;


    console.log('nombre; ', nombre);
    console.log('idCategoria: ', idCategoria);
    console.log('precio: ', precio);
    console.log('cantidad: ', cantidad);

    conexion.query('SELECT * FROM productos where idCategoria=? and nombre=?', [idCategoria, nombre], function (error, results, fields) {

        if (error) {
            res.status(500).send({
                mensaje: 'Error al comprobar el producto',
                result: false
            });
        } else {

            if (!results[0]) {

                conexion.query('INSERT INTO productos(nombre, idCategoria, precio, cantidad) VALUES(?, ?, ?, ?)',
                    [nombre, idCategoria, precio, cantidad], function (error, resultData, fieldData) {
                        if (error) {
                            res.status(500).send({
                                mensaje: 'Error al agregar el producto',
                                result: false
                            });
                        } else {
                            if (!resultData) {

                                res.status(404).send({
                                    mensage: 'No se logró registrar el producto',
                                    result: false
                                });
                            } else {
                                   /* res.status(200).send({
                                    mensaje: 'Se agregó el producto exitosamente',
                                    result: true
                                    
                                });*/
                                conexion.query('SELECT * FROM productos where id=?', [resultData.insertId], function (error, results, fields) {
                                    
                                    res.status(200).send({
                                        mensaje: 'Se agregó el producto exitosamente',
                                        result: true,
                                        data: results[0]
                                    });
                                });
                            }
                        }

                    });


            } else {
                res.status(200).send({ mensaje: 'Ya existe un producto con este nombre y para esta categoria' });
            }
        }
    });
}

function editarProducto(req,res){
    const {id,nombre,idCategoria,precio,cantidad} = req.body;

    console.log('id: ',id);
    console.log('nombre: ',nombre);
    console.log('categoria: ',idCategoria);
    console.log('precio:', precio);
    console.log('cantidad: ', cantidad);

    conexion.query('SELECT * FROM productos WHERE nombre=? AND idCategoria=? AND id !=?',
        [nombre, idCategoria, id], function (error, resultData, fieldData) {

            if (error) {
                console.log(error);
                res.status(500).send({
                    mensaje: 'Error al editar producto',
                    result: false
                });
            } else {
                
                if (resultData[0] === undefined) {

                    conexion.query('UPDATE productos SET nombre=?, idCategoria=?, precio=?,cantidad=? WHERE id=?',
                    [nombre, idCategoria, precio, cantidad, id], function (error, resultData, fieldData) {
                        if (error) {
                            res.status(500).send({
                                mensaje: 'Error al editar el producto',
                                result: false
                            });
                        } else {
                            if (!resultData) {

                                res.status(404).send({
                                    mensage: 'No se logró editar el producto',
                                    result: false
                                });
                            } else {
                                    res.status(200).send({
                                    mensaje: 'Se edito el producto exitosamente',
                                    result: true
                                });
                            }
                        }      
                    });
                }else {
                    res.status(200).send({
                        mensaje: 'Ya existe un producto con este nombre',
                        result: false
                    });
                }   
            }
        });           

}

function eliminarProducto(req, res){

    const {id} = req.params;

    conexion.query('DELETE FROM productos WHERE id = ?',[id],(error, resultData, fieldData)=>{
        if (error) {
            res.status(500).send({
                mensaje: 'Error al eliminar el producto',
                result: false
            });
        } else {
            if (!resultData) {

                res.status(404).send({
                    mensage: 'No se logró eliminar el producto',
                    result: false
                });
            } else {
                    res.status(200).send({
                    mensaje: 'Se elimino el producto exitosamente',
                    result: true
                });
            }
        }
    });

}

module.exports={
    getProductos,
    getProductosByCategoria,
    guardarProducto,
    editarProducto,
    eliminarProducto,
    getProductoById
    

};