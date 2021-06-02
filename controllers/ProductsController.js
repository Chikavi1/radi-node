const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Products = require('../models/Products');

module.exports.getProducts = async (req, res) => {

    await Products(DB, DataTypes).findAll({where: {"id_vet": req.params.idVet}})
    .then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.send(err);
    })

}

module.exports.updateProduct = async (req, res) => {

    const updatedProduct = req.body;

    await Products(DB, DataTypes).update(
        updatedProduct,
        { where: { "id": req.body.id } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.createProduct = async (req, res) => {

    const { title, description, price, category, amount, available, img, id_vet } = req.body;

    await Products(DB, DataTypes).create({title, description, price, category, amount, available, img, id_vet })
    .then(() => {
        res.status(200);
        res.send('OK');
    }).catch((err) => {
        res.status(503);
        res.send(err);
    });

}