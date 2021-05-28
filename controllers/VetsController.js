//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Vets = require('../models/Vets');

module.exports.getVet = async (req, res) => {
    
    let [result, meta] = await DB.query('select * from vets where id=' + req.params.idVet);

    res.json(result);

}

module.exports.createVet = async (req, res) => {

    const { name, location, description } = req.body;

    await Vets(DB, DataTypes).create({
        name,
        location,
        description
    }).then(() => {
        res.status(200);
        res.send('OK');
    }).catch((err) => {
        res.status(503);
        res.send(err);
    });

}