const jwt = require('jsonwebtoken');

const secretKey = '3st4_3S_Un@_Ll4v3';

const generarJWT = (id, nombre, correo) =>{
    return new Promise((resolve,reject) =>{
        const payload = {id, nombre, correo};
        
        jwt.sign( payload,secretKey,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se logró obtener el token');
            }
            resolve(token);
        })
    });
}

module.exports = generarJWT;