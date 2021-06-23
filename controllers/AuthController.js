const passport = require('passport');
const Usuarios = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Sequelize, DataTypes, where, Op } = require('sequelize');

const DB = require('../config/DB');
const validateBody = require('../public/validateBody');

const enviarEmail = require('../handlers/email');
const Users = require('../models/Users');


// exports.login = (req,res) => {
//     res.render('login',{
//         nombrePagina: 'Ingresa',
//     });
// }

// exports.auth = passport.authenticate('local',{
//     successRedirect: '/adopta',
//     failureRedirect: '/login',
//     failureFlash: true,
//     badRequestMessage: 'Ambos campos son obligatorios.'
// });

exports.usuarioAutenticado = (req, res, next) => {
    // si el usuario esta autenticado, adelante
    if (req.isAuthenticated()) {
        return next();
    }

    // si no esta autentificado, redirigir al formulario
    return res.redirect('/login');
}





exports.googleauth = passport.authenticate('google', {
    scope: ['profile', 'email'],
});

exports.googleCallback = passport.authenticate('google', {

    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true
});






exports.loginApi = async (req, res, next) => {


    const { email, password } = req.body;

    if (!validateBody(email, password)) {
        res.status(503);
        res.json({ msg: 'Datos incompletos' });
        return;
    }

    const usuario = await Usuarios(DB, Sequelize.DataTypes).findOne({ where: { email } });
    if (!usuario) {
        await res.status(401).json({ mensaje: 'Usuario no existe.' });
        next();
    } else {
        if (!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
            next();
        } else {
            const token = jwt.sign({
                name: usuario.name,
                email: usuario.email,
                id: usuario.id,
                customer: usuario.customer
            },
                'LLAVESECRETA',
                {
                    expiresIn: '1h'
                });
            await res.json({ token });

        }
    }


}

exports.registerApi = async (req, res, next) => {

    let { name, email, password } = req.body;
    const usuario = await Usuarios(DB, Sequelize.DataTypes).findOne({ where: { email } });
    if (usuario) {
        res.status(401).json({ mensaje: 'Ese usuario ya existe' });
        next();
    } else {
        try {
            let user = await Usuarios(DB, Sequelize.DataTypes).create({ name, email, password: bcrypt.hashSync(password, 8) });
            res.json({ mensaje: 'Usuario Creado', id:user.id });
        } catch (error) {
            console.log(error);
            res.json({ mensaje: 'Hubo un error' });
        }
    }

}


exports.enviarToken = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
        req.flash('error', 'no existe esa cuenta');
        res.redirect('/reestablecer');
    }

    // falta verificar que no sea de google papi eso es aqui

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiration = Date.now() + 3600000;

    await usuario.save();

    const resetUrl = `http://localhost:3000/reestablecer/${usuario.token}`;
    //    console.log(resetUrl);

    //envia el correo con el token
    await enviarEmail.enviar({
        usuario,
        subject: 'Reestablecer contraseña',
        resetUrl,
        archivo: 'reestablecer-password'
    });

    res.json({ mensaje: 'Se ha enviado el correo' });


}


exports.actualizarPassword = async (req, res) => {
    console.log(req.body.password);
    console.log('-------------------');
    console.log(req.params.token);
    console.log('******************');

    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token,

        }
    });

    if (!usuario) {
        res.json({ mensaje: 'error,token no valido' });

    }


    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token = null;
    usuario.expiracion = null;
    await usuario.save();
    res.json({ mensaje: 'Se ha actualizado la contraseña satisfactoriamente.' });
}


exports.validarToken = async (req, res) => {

    const usuario = await Usuarios.findOne({
        where: {
            token: req.params.token
        }
    });

    if (!usuario) {
        res.json({ mensaje: 'token no valido.', estatus: false });

    }
    res.json({ mensaje: 'token valido.', estatus: true });

}

exports.getUser = async (req,res) => {
    await Users(DB, DataTypes).findAll({ where: { "id": req.params.id } })
    .then((data) => {
        res.status(200);
        res.json(data);
    }).catch((err) => {
        res.status(503);
        res.json(err);
    });
}

exports.updateUser = async (req,res) => {

    const updateUser = req.body;

    await Users(DB, DataTypes).update(
        updateUser,
        { where: { "id": req.body.id} })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        });

}