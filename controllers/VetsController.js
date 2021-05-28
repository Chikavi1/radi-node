//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Vets = require('../models/Vets');

module.exports.getVet = async (req, res) => {

    await Vets(DB, DataTypes).findOne({where: {id: req.params.idVet}})
    .then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.send(err);
    })

}

module.exports.createVet = async (req, res) => {

    const { name, profile, phone, description, services, latitude, longitude } = req.body;

    await Vets(DB, DataTypes).create({
        name,
        description,
        phone,
        services,
        latitude,
        longitude,
        profile
    }).then(() => {
        res.status(200);
        res.send('OK');
    }).catch((err) => {
        res.status(503);
        res.send(err);
    });

}