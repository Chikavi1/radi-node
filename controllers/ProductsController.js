const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Products = require('../models/Products');
const validateBody = require('../public/validateBody');

module.exports.getProducts = async (req, res) => {

    await Products(DB, DataTypes).findAll({where: {"id_vet": req.params.idVet, "status": {[Op.ne]: 0}}})
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
        { where: { "id": req.body.id, "status": {[Op.ne]: 0}} })
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

    // let validate = validateBody(await Products(DB, DataTypes).describe(), req.body);

    // if (validate !== true) {
    //     res.status(503);
    //     res.json({fields_empty: validate});
    //     return;
    // }

    await Products(DB, DataTypes).create({title, description, price, category, amount, available, img, id_vet, status: 1 })
    .then(() => {
        res.status(200);
        res.send('OK');
    }).catch((err) => {
        res.status(503);
        res.send(err);
    });

}