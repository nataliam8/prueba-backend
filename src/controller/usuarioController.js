'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

const conexion = require('../database');

//const conexion2 = require('../database2');

const generarToken =  require('../services/jwt');

var path = require('path');

function pruebas(req,res){
    
        console.log('Conectado con el identificador ' + conexion.threadId);
        conexion.query('SELECT * FROM usuarios', function (error, results, fields) {
            if (error){
                throw error;
            }
                
                    res.status(200).send({
                    message:'probando el controlador de user',
                    data:results

                    
            })    
            results.forEach(result => {
                console.log(result);
            });
        });   
}

function login(req,res){
      
    const {correo, password} =req.body;
       
    conexion.query('SELECT * FROM usuarios where correo=?',[correo], function (error, results, fields) {
        if (error){
            throw error;
        }
            
        if(results[0] === undefined){
            res.status(200).send({
                message:'Correo o contraseña incorrecta',
                result:false,  
                
        })}
        else{
            let data = results[0];
            bcrypt.compare(password, data.password , (err, check) =>{ //primero la pasdword que llega
                if(check){
                    let data = results[0];
                    
                    res.status(200).send({
                        message:'Bienvenido',
                        result:true,
                        data:results[0],
                    
                    });
                    
                }else{
                    res.status(200).send({
                        message:'correo o contraseña incorrecta',
                        result:false               
                    });
                }              
            });

           
        }
               
    });    
}

const genToken = async (req, res = response)=>{

    const {id,nombre,correo} = req.body;
    const token = await generarToken(id, nombre, correo);
    console.log(id);
    console.log(nombre);
    console.log(correo);
    res.status(200).send({
        
        result:true,
        id,
        nombre,
        correo,
        data:token
                     
    });


}

const reNewToken = async (req, res = response)=>{

    //const {id,nombre,correo} = req.body;
    const id = req.id;
    const nombre = req.nombre;
    const correo = req.correo;
    const token = await generarToken(id, nombre, correo);

    res.status(200).send({
        
        result:true,
        id,
        nombre,
        correo,
        data:token
                     
    });


}

function guardarUsuario(req,res){
   
    let {nombre,correo,password} = req.body;
     
    conexion.query('SELECT * FROM usuarios where correo=?',[correo], function (error, results, fields) {

        if(error){
            res.status(500).send({mensaje: 'error al comprobar el usuario'});
        }else{
            
            if(!results[0]){
                    bcrypt.hash(password,null,null, function(err, hash){
                        password = hash;
                        console.log('nombre: ', nombre);
                        console.log('correo: ', correo);
                        console.log('password: ', password);

                       conexion.query('INSERT INTO usuarios(nombre, correo, password) VALUES(?, ?, ?)',
                        [nombre, correo, password], function (error, results, fields) {
                        if(error){
                            res.status(500).send({
                                mensaje: 'Error al agregar el usuario',
                                result:false    
                            });
                        }else{
                            if(!results){
                                
                                res.status(404).send({
                                    mensage: 'No se logró registrar el usuario',
                                    result:false
                                });    
                            }else{
                                
                                res.status(200).send({
                                    mensaje:'Se agregó el usuario exitosamente',
                                    result:true
                            });
                            }
                        }
                    
                        });   
                      
                    });
                }else{  
                    res.status(200).send({mensaje:'Ya existe un usuario con este correo'});
                }
            }
        });   
}


module.exports={
    pruebas,
    login,
    guardarUsuario,
    genToken,
    reNewToken

};