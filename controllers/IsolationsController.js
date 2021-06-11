const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Isolations = require('../models/Isolations');

exports.createIsolation = async (req, res) => {

    const { time_end, time_start, id_vet, weekend, status } = req.body;

    await Isolations(DB, DataTypes).create({ time_end, time_start, id_vet, weekend, status: (status || 1) })
    .then(() => {
        res.status(200);
        res.json('OK');
    }).catch((err) => {
        res.status(503);
        res.json(err);
    });

};

module.exports.getIsolations = async (req, res) => {

    await Isolations(DB, DataTypes).findAll({where: {"id_vet": req.params.idVet, "status": {[Op.ne]: 0}}})
    .then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.json(err);
    })

};

module.exports.updateIsolation = async (req, res) => {

    const updateIsolation = req.body;

    await Isolations(DB, DataTypes).update(
        updateIsolation,
        { where: { "id": req.body.id, "status": {[Op.ne]: 0}} })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}

module.exports.deleteIsolation = async (req, res) => {

    await Isolations(DB, DataTypes).update(
        {status: 0},
        { where: { "id": req.body.id } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}