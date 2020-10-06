const {response} = require('express');
const jwt = require('jsonwebtoken');
const { reNewToken } = require('../controller/usuarioController');
const secretKey = '3st4_3S_Un@_Ll4v3';

const validarJWT = (req, res = response, next)=>{
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            result:false,
            mensaje:'No hay token en la petición'
        });
    }
    try {
        
        const { id,nombre,correo } = jwt.verify(
            token,
            secretKey,

        )

        req.id = id;
        req.nombre = nombre;
        req.correo = correo;

    } catch (error) {
        return res.status(401).json({
            result:false,
            mensaje:'Token no valido'
        });
    }
       
    next();

}

module.exports = {
    validarJWT
}