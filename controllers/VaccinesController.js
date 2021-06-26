const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Vaccines = require('../models/Vaccines');
const validateBody = require('../public/validateBody');

exports.createVaccine = async (req, res) => {

    const { id_pet,id_visit, name, type, status } = req.body;
    
    let validate = validateBody(await Vaccines(DB, DataTypes).describe(), req.body);

    if (validate !== true) {
        res.status(503);
        res.json({fields_empty: validate});
        return;
    }

    await Vaccines(DB, DataTypes).create({ id_pet,id_visit, name, type, status: (status || 1) })
    .then(() => {
        res.status(200);
        res.json('OK');
    }).catch((err) => {
        res.status(503);
        res.json(err);
    });

};

exports.getVaccines = async (req, res) => {

    await Vaccines(DB, DataTypes).findAll({where: {"id_pet": req.params.idPet, "status": {[Op.ne]: 0}}})
    .then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.json(err);
    })

};

exports.getVaccinesByVisit = async (req, res) => {
    await Vaccines(DB, DataTypes).findAll({where: {"id_visit": req.params.idVisit, "status": {[Op.ne]: 0}}})
    .then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.json(err);
    })
};


exports.updateVaccine = async (req, res) => {

    const updateVaccine = req.body;

    await Vaccines(DB, DataTypes).update(
        updateVaccine,
        { where: { "id": req.body.id, "status": {[Op.ne]: 0}} })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}

exports.deleteVaccine = async (req, res) => {

    await Vaccines(DB, DataTypes).update(
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