const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req,res) => {
    res.render('login',{
        nombrePagina: 'Ingresa',
    });
}

exports.auth = passport.authenticate('local',{
    successRedirect: '/adopta',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios.'
});

exports.usuarioAutenticado = (req,res,next) => {
    // si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }

    // si no esta autentificado, redirigir al formulario
    return res.redirect('/login');
}

exports.register = (req,res)=>{
    res.render('register',{
        nombrePagina: 'Registrate',
    });
}

exports.createUser = async (req,res) => {
    const {email,password,name} = req.body;

    console.log(req.body);

    try{
        await Usuarios.create({
            email,
            password,
            name
        });

        res.redirect('/login');
    }catch(error){
        req.flash('error', error.errors.map(error => error.message) );
        res.render('login',
        {
            nombrePagina: 'ingresa con tu correo'
        });
    }
}


exports.forgot = (req,res)=>{
    res.render('login',{
        nombrePagina: 'Ingresa',
    });
}

exports.cerrarSesion = (req,res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    })
}




exports.googleauth = passport.authenticate('google',{
    scope: ['profile', 'email'],
   
});

exports.googleCallback = passport.authenticate('google', {

    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true
});






exports.loginApi = async(req,res,next) => {


  const  { email,password } = req.body;
  console.log(email,password);
  const usuario = await Usuarios.findOne({ where: { email  }});
  if(!usuario){
    await res.status(401).json({ mensaje : 'Ese usuario no existe' });
    next();
  }else{
    if(!bcrypt.compareSync(password, usuario.password )){
        await res.status(401).json({ mensaje : 'Contraseña es incorrecta' });
        next();
    }else{
        const token = jwt.sign({
            email: usuario.email,
            id: usuario.id,

        },
        'LLAVESECRETA',
        {
            expiresIn: '1h'
        });
        await res.json({token});

    }
  }


}

exports.registerApi = async(req,res) => {
    let { email,password } = req.body;
    try{
         await Usuarios.create({email,password});
        res.json({mensaje:'Usuario Creado'});
    }catch(error){
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}