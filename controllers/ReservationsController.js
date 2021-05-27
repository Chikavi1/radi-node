//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Reservations = require('../models/reservations');

module.exports.getReservationsWeek = async (req, res) => {

    let week = [];
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');
    
    let [result, meta] = await DB.query('select p.name, r.note, r.time, r.id_pet from reservations r inner join pets p on p.id=r.id_pet where r.id_vet=' + req.params.idVet);

    result.forEach((item) => {

        if (moment(item.time).isBetween(weekStart, weekEnd))
            if (week[moment(item.time).day()])
                week[moment(item.time).day()].push(item);
            else
                week[moment(item.time).day()] = [item];

    })

    res.json(week);

}

module.exports.insertReservation = async (req, res) => {

    const { name, note, payment, price, id_vet, id_pet, time } = req.body;

    await Reservations(DB, DataTypes).create({
        name: name,
        note: note,
        payment: payment,
        price: price,
        id_vet: id_vet,
        id_pet: id_pet,
        time: time
    }).then(() => {
        res.status(200);
        res.send('OK');
    }).catch((err) => {
        res.status(503);
        res.send(err);
    });

}