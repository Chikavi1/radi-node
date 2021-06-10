const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Reviews = require('../models/Reviews');

exports.createReview = async (req, res) => {

    const { id_vet, id_user, score, comment, date, status } = req.body;

    await Reviews(DB, DataTypes).create({ id_vet, id_user, score, comment, date, status: (status || 1) })
    .then(() => {
        res.status(200);
        res.json('OK');
    }).catch((err) => {
        res.status(503);
        res.json(err);
    });

};

exports.getReviews = async (req, res) => {

    await Reviews(DB, DataTypes).findAll({where: {"id_vet": req.params.idVet, "status": {[Op.ne]: 0}}})
    .then(data => {
        res.status(200);
        res.json(data);
    }).catch(err => {
        res.status(503);
        res.json(err);
    })

};

exports.getAvgReviewsByVet= async (req, res) => {

    let [result, meta] = await DB.query('SELECT AVG(score) AS avg FROM Reviews WHERE id_vet='+req.params.idVet);
    
    if (result) {
        res.status(200);
        res.json(result);
    } else {
        res.status(503);
        res.json({'msg': 'Nada'});
    }

};

exports.updateReview = async (req, res) => {

    const updateReview = req.body;

    await Reviews(DB, DataTypes).update(
        updateReview,
        { where: { "id": req.body.id, "status": {[Op.ne]: 0}} })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}

exports.deleteReview = async (req, res) => {

    await Reviews(DB, DataTypes).update(
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