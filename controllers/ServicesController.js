const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Services = require('../models/Services');

module.exports.getServices = async (req, res) => {

    await Services(DB, DataTypes).findAll({ where: { "id_vet": req.params.idVet, "status": {[Op.ne]: 0}} })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.updateService = async (req, res) => {

    const updatedService = req.body;

    await Services(DB, DataTypes).update(
        updatedService,
        { where: { "id": req.body.id, "status": {[Op.ne]: 0}} })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.createService = async (req, res) => {

    const { title, description, price, available, img, id_vet } = req.body;

    await Services(DB, DataTypes).create({ title, description, price, available, img, id_vet, status: (status || 1) })
        .then(() => {
            res.status(200);
            res.send('OK');
        }).catch((err) => {
            res.status(503);
            res.send(err);
        });

}