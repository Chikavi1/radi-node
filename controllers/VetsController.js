//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Vets = require('../models/Vets');

module.exports.getVet = async (req, res) => {

    await Vets(DB, DataTypes).findOne({ where: { id: req.params.idVet } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.getVets = async (req, res) => {

    await Vets(DB, DataTypes).findAll({ offset: parseInt(req.params.offset) || 1, limit: parseInt(req.params.limit) || 1 })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.nearVets = async (req, res) => {

    const {longitude, latitude} = req.body;

    try {

        let [result, meta] = await DB.query(`
            SELECT *, ((ACOS(SIN(${latitude} * PI() / 180) * 
            SIN(latitude * PI() / 180) + COS(${latitude} * PI() / 180) * 
            COS(latitude * PI() / 180) * COS((${longitude} - longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344) 
            as distance FROM Vets HAVING distance <= 5 ORDER BY distance ASC;
            `);

        res.status(200);
        res.json(result);

    } catch (err) {
        res.status(503);
        res.send(err);
    }

}

module.exports.updateVet = async (req, res) => {

    const updatedVet = req.body;

    await Vets(DB, DataTypes).update(
        updatedVet,
        { where: { "id": req.body.id } })
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