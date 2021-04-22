const Sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const Usuarios = db.define('Users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(60),
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
    address: Sequelize.STRING,
    city: Sequelize.STRING(100),
    cellphone: Sequelize.INTEGER(11),
    invoice_id: Sequelize.INTEGER,
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no puede ir vacio'
            }
        }
    },
    active:{
        type: Sequelize.INTEGER,
        defaulValue: 0 
    },
    token: Sequelize.STRING,
    expiration: Sequelize.DATE,
    identification: Sequelize.INTEGER,
    share_location: Sequelize.INTEGER(1),
    googleId:{
        type: Sequelize.STRING(60),
        allowNull: true
    },
    points: Sequelize.INTEGER
    
    
    
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