const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Medicines = require('../models/Medicines');
const validateBody = require('../public/validateBody');

exports.createMedicine = async (req, res) => {

    const { name, treatment, unit, id_user, id_pet, status } = req.body;

    if (!validateBody(name, treatment, unit, id_user, id_pet, status)) {
        res.status(503);
        res.json({msg: 'Datos incompletos'});
        return;
    }

    await Medicines(DB, DataTypes).create({ name, treatment, unit, id_user, id_pet, status: (status || 1) })
        .then(() => {
            res.status(200);
            res.json({msg: 'OK'});
        }).catch((err) => {
            res.status(503);
            res.json(err);
        });

};

module.exports.getMedicines = async (req, res) => {

    await Medicines(DB, DataTypes).findAll({ where: { "id_pet": req.params.idPet, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

};

module.exports.updateMedicine = async (req, res) => {

    const updateMedicine = req.body;

    await Medicines(DB, DataTypes).update(
        updateMedicine,
        { where: { "id": req.body.id, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}

module.exports.deleteMedicine = async (req, res) => {

    await Medicines(DB, DataTypes).update(
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