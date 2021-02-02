const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const Usuarios = db.define('Users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                msg: 'El e-mail no puede ir vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario ya registrado'
        }
    },
    googleId:{
        type: Sequelize.STRING(60),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    },
    name: Sequelize.STRING(60),
    activo:{
        type: Sequelize.INTEGER,
        defaulValue: 0 
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
},{
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
        }
    }
});

// metodos personalizados

Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}


module.exports = Usuarios;