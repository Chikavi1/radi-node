const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Vets = require('../models/Vets');
const Organizations = require('../models/Organizations');

exports.searchThings = async (req, res) => {

    let result = {};

    result.pets = await Pets(DB, DataTypes).findAll({
        where: {
            "name": { [Op.like]: '%' + req.params.query + '%' }
        },
        attributes: ['name', 'photo'],
        limit: 5
    }).catch(err => {
        res.status(503);
        res.json({ msg: err });
        return;
    });

    result.vets = await Vets(DB, DataTypes).findAll({
        where: {
            "name": { [Op.like]: '%' + req.params.query + '%' }
        },
        limit: 5
    }).catch(err => {
        res.status(503);
        res.json({ msg: err });
        return;
    });

    result.organizations = await Organizations(DB, DataTypes).findAll({
        where: {
            "name": { [Op.like]: '%' + req.params.query + '%' }
        },
        limit: 5
    }).catch(err => {
        res.status(503);
        res.json({ msg: err });
        return;
    });

    
    if (result) {
        res.status(200);
        res.json(result);
    }


}