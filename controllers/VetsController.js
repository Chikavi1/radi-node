//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Vets = require('../models/Vets');
const Services = require('../models/Services');
const validateBody = require('../public/validateBody');

module.exports.getVet = async (req, res) => {

    await Vets(DB, DataTypes).findOne({ where: { id: req.params.idVet, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.getVets = async (req, res) => {

    await Vets(DB, DataTypes).findAll({
        where: { "status": { [Op.ne]: 0 } },
        offset: parseInt(req.params.offset) || 1, limit: parseInt(req.params.limit) || 1
    }).then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.send(err);
    })

}

exports.searchVets = async (req, res) => {

    let result = await Vets(DB, DataTypes).findAll({
        where: {
            "name": { [Op.like]: '%' + req.params.vet_name + '%' },
            "status": { [Op.ne]: 0 }
        }
    })

    if (result.length) {
        res.status(200);
        res.json(result);
    } else {
        res.status(503);
        res.json({ msg: 'nada' });
    }


}

exports.searchVetsServices = async (req, res) => {

    let result = await Services(DB, DataTypes).findAll({
        where: {
            "id_vet": req.params.idVet,
            "title": { [Op.like]: '%' + req.params.service + '%' },
            "status": { [Op.ne]: 0 }
        }
    })

    if (result.length) {
        res.status(200);
        res.json(result);
    } else {
        res.status(503);
        res.json({ msg: 'nada' });
    }


}

module.exports.nearVets = async (req, res) => {

    try {

        let [result, meta] = await DB.query(`
            SELECT *, ((ACOS(SIN(${req.params.lat} * PI() / 180) * 
            SIN(latitude * PI() / 180) + COS(${req.params.lat} * PI() / 180) * 
            COS(latitude * PI() / 180) * COS((${req.params.long} - longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344) 
            as distance FROM Vets WHERE status!=0 HAVING distance <= 5 ORDER BY distance ASC;
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
        { where: { "id": req.body.id, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.send(err);
        })

}

module.exports.createVet = async (req, res) => {

    const { name, profile, phone, description, services, latitude, longitude, schedule, weekend, status } = req.body;

    if (!validateBody(name, profile, phone, description, services, latitude, longitude, schedule, weekend, status)) {
        res.status(503);
        res.json({msg: 'Datos incompletos'});
        return;
    }

    await Vets(DB, DataTypes).create({
        name,
        description,
        phone,
        services,
        latitude,
        longitude,
        profile,
        weekend,
        schedule,
        status: (status || 1)
    }).then(() => {
        res.status(200);
        res.send('OK');
    }).catch((err) => {
        res.status(503);
        res.send(err);
    });

}