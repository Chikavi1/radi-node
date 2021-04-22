const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    // autorizacion por el header

    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('No autenticado,no hay jwt');
        error.statusCode = 401;
        throw error;
    }

// obtener token
    const token = authHeader.split(' ')[1];
    let revisarToken;

    try{
        revisarToken = jwt.verify(token,'LLAVESECRETA');
    }catch(error){
        error.statusCode = 500;
        throw error;
    }

    // si es token valido
    if(!revisarToken){
        const error = new Error('no autenticado');
        error.statusCode = 401;
        throw error; 
    }

    next();
}