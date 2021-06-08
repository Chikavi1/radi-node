//const { DataTypes } = require('sequelize/types');
const moment = require('moment');
const { Sequelize, DataTypes, where } = require('sequelize');
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_yA1c9PFKtvAHmekF9apQQYlm00tWTyzmTI ');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Reservations = require('../models/Reservations');

module.exports.getReservationsWeek = async (req, res) => {

    let week = [null, null, null, null, null, null, null];
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');

    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), { foreignKey: 'id_pet' });
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), { foreignKey: 'id' })

    let result = await Reservations(DB, DataTypes).findAll({ where: { "id_vet": req.params.idVet } });

    //let [result, meta] = await DB.query('select p.name, r.note, r.time, r.id_pet from reservations r inner join pets p on p.id=r.id_pet where r.id_vet=' + req.params.idVet);

    result.forEach((item) => {

        item = item.dataValues;

        if (moment(item.time).isBetween(weekStart, weekEnd)) {
            if (week[moment(item.time).day()]) {
                week[moment(item.time).day()].push(item);
            } else {
                week[moment(item.time).day()] = [item];
            }
        }

    })


    res.json(week);

}

module.exports.insertReservation = async (req, res) => {

    let notAvailable = false;
    let payment_accepted = true;
    const { payment_id, amount, name, note, payment, price, id_vet, id_pet, time, duration } = req.body;

    // Validacion Horario
    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), { foreignKey: 'id_pet' });
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), { foreignKey: 'id' })
    let result = await Reservations(DB, DataTypes).findAll({ where: { "id_vet": id_vet } });

    result.forEach(item => {

        item = item.dataValues;

        notAvailable = moment(time).isBetween(moment(item.time), moment(item.time).add(item.duration, 'm'));

    });


    if (notAvailable) {
        res.status(503);
        res.json('Horario no disponible');
        return;
    }

    // Codigo
    try {

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "MXN",
            description: 'Donacion a radi',
            payment_method: payment_id,
            confirm: true,
            application_fee_amount: 1000,
            transfer_data: {
                destination: 'acct_1IiBSHJl56kWzuPa',
            }

        });

        console.log(payment);

    } catch (error) {
        console.log(error);
        payment_accepted = false;
        // return res.json({ message: error })
    }
    // Codigo



    if (!payment_accepted) { // Pago NO aceptado
        res.status(503);
        res.json('Pago no aceptado');
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
            res.json('OK');
        }).catch((err) => {
            res.status(503);
            res.json(err);
        });
    }

}