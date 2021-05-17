//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes } = require('sequelize');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Reservations = require('../models/reservations');

module.exports.getReservations = async (req, res) => { /// FALTA CREAR VETS

    let week = [];
    let [result, meta] = await DB.query('select p.name, r.note, r.time, r.id_pet from reservations r inner join pets p on p.id=r.id_pet where r.id_vet='+req.params.idVet);
    console.log(result.length);

    result.forEach((item) => {

        if (week[moment(item.time).day()]) {
            week[moment(item.time).day()].push(item);
        } else {
            week[moment(item.time).day()] = [item];
        }

    })

    res.json(week);

    /*await Reservations(DB, DataTypes).findAll({
        attributes: ['note', 'time', 'id_pet'],
        where: {
            id_vet: req.params.idVet
        }
    }).then(async (reservations) => {

        let counter = 0, week = [];

        reservations = reservations.map((value) => {
            return value.dataValues;
        })

        reservations.forEach(async (value) => {

            // Get specific pet
            let pet = await Pets(DB, DataTypes).findOne({
                attributes: ['name'],
                where: { id: parseInt(value.id_pet) }
            });
            pet = pet.dataValues;

            // Mixing pet name with reservation info
            if (week[moment(value.time).day()]) {
                week[moment(value.time).day()].push({
                    value,
                    pet_name: pet.name
                });
            } else {
                week[moment(value.time).day()] = [{
                    time: value.time,
                    id_pet: value.id_pet,
                    note: value.note,
                    pet_name: pet.name
                }];
            }
            counter++;
            if (counter === reservations.length) {
                res.json(week);
            }
        });

    }).catch((err) => {
        res.json({error: 'Valio cabeza'});
    });*/

}