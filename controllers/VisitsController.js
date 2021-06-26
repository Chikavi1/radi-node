const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Visits = require('../models/Visits');
const validateBody = require('../public/validateBody');

exports.createVisit = async (req, res) => {

    const { weight, height, pressure, note, id_reservation, id_pet, status } = req.body;

    let validate = validateBody(await Visits(DB, DataTypes).describe(), req.body);

    if (validate !== true) {
        res.status(503);
        res.json({fields_empty: validate});
        return;
    }

    await Visits(DB, DataTypes).create({ weight, height, pressure, note, id_reservation, id_pet, status: (status || 1) })
        .then(() => {
            res.status(200);
            res.json({msg: 'OK'});
        }).catch((err) => {
            res.status(503);
            res.json(err);
        });

};

module.exports.getVisits = async (req, res) => {

    await Visits(DB, DataTypes).findAll({ where: { "id_vet": req.params.idVet, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

};

module.exports.updateVisit = async (req, res) => {

    const updateVisit = req.body;

    await Visits(DB, DataTypes).update(
        updateVisit,
        { where: { "id": req.body.id, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}

module.exports.deleteVisit = async (req, res) => {

    await Visits(DB, DataTypes).update(
        { status: 0 },
        { where: { "id": req.body.id } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}