//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes, where } = require('sequelize');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Reservations = require('../models/Reservations');

module.exports.getReservationsWeek = async (req, res) => {

    let week = [null, null, null, null, null, null, null];
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');

    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), {foreignKey: 'id_pet'});
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), {foreignKey: 'id'})

    let result = await Reservations(DB, DataTypes).findAll({where: {"id_vet": req.params.idVet}});
    
    //let [result, meta] = await DB.query('select p.name, r.note, r.time, r.id_pet from reservations r inner join pets p on p.id=r.id_pet where r.id_vet=' + req.params.idVet);

    result.forEach((item) => {

        item = item.dataValues;

        if (moment(item.time).isBetween(weekStart, weekEnd)) {
            if (week[moment(item.time).day()]) {
                week[moment(item.time).day()].push(item);
            }else {
                week[moment(item.time).day()] = [item];
            }
        }

    })


    res.json(week);

}

module.exports.insertReservation = async (req, res) => {

    let notAvailable = false;
    let payment_accepted = true;
    const { name, note, payment, price, id_vet, id_pet, time, duration } = req.body;

    // Validacion Horario
    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), {foreignKey: 'id_pet'});
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), {foreignKey: 'id'})
    let result = await Reservations(DB, DataTypes).findAll({where: {"id_vet": id_vet}});

    result.forEach(item => {

        item = item.dataValues;

        notAvailable = moment(time).isBetween(moment(item.time), moment(item.time).add(item.duration, 'm'));

    });

    // Codigo

    if (notAvailable) {
        res.status(503);
        res.send('Horario no disponible');
    } else if (!payment_accepted) { // Pago NO aceptado
        res.status(503);
        res.send('Pago no aceptado');
    } else {
        await Reservations(DB, DataTypes).create({
            name,
            note,
            payment,
            price,
            id_vet,
            id_pet,
            time,
            duration
        }).then(() => {
            res.status(200);
            res.send('OK');
        }).catch((err) => {
            res.status(503);
            res.send(err);
        });
    }

}