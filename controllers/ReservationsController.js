//const { DataTypes } = require('sequelize/types');
const { date } = require('faker');
const moment = require('moment');
const { Sequelize, DataTypes, where, Op } = require('sequelize');
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_yA1c9PFKtvAHmekF9apQQYlm00tWTyzmTI ');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Reservations = require('../models/Reservations');
const Users = require('../models/Users');
const enviarEmail = require('../handlers/email');
const axios = require('axios');

module.exports.getReservationsWeek = async (req, res) => {

    let week = [null, null, null, null, null, null, null];
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('week');
    let weekEnd = currentDate.clone().endOf('week');

    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), { foreignKey: 'id_pet' });
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), { foreignKey: 'id' })

    let result = await Reservations(DB, DataTypes).findAll({ where: { "id_vet": req.params.idVet} });

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

module.exports.retrievePayment = async (req, res) =>{
    const generate = await stripe.paymentIntents.retrieve('pi_1J0UIbCLbb37u5arL0TBQfuF');
    return res.json(generate);


}

exports.getReservationsByUser = async (req, res) => {
    
    await Reservations(DB, DataTypes).findAll({ where: { "id_user": req.params.idUser } })
    .then((data) => {
        res.status(200);
        res.json(data);
    }).catch((err) => {
        res.status(503);
        res.json(err);
    });

}

module.exports.insertReservation = async (req, res) => {

    let notAvailable = false;
    let payment_accepted = true;
    const { payment_id, amount, name, note, payment, price, id_vet, id_user, id_pet, time, duration, status } = req.body;

    // Validacion Horario
    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), { foreignKey: 'id_pet' });
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), { foreignKey: 'id' })
    let result = await Reservations(DB, DataTypes).findAll({
        where: {
            "id_vet": id_vet,
            "time" : {[Op.between] : [moment(time) , moment(time).add(duration, 'm')]}
        }
    });

    notAvailable = result.length;

    if (notAvailable) {
        res.status(503);
        res.json('Horario no disponible');
        return;
    }

    // Codigo
    try {

        const generate = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: 4242424242424242,
                cvc: 424,
                exp_month: 04,
                exp_year: 2024,   
            }
        });


        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "COP",
            description: 'Compra en Radi',
            payment_method: generate.id,
            confirm: true,
            
            // application_fee_amount: 1000,
            // transfer_data: {
            //     destination: 'acct_1IiBSHJl56kWzuPa',
            // }

        });

        console.log(payment.status);

        if(payment.status === 'succeeded'){


            // envia notificacion a veterinario

            axios.post('https://onesignal.com/api/v1/notifications', {
                app_id: 'e15689c2-569b-482f-9364-a8fca5641826',
                data: { "userId" : "Postman-1234" },
                contents: { en: "English message from Postman", es: "Reservación para el viernes 30 de abril de 2021 de 8:00 am a 9:00 am" },
                headings: { en: "English Title", es: "Reservacion en Radi🐶" },
                include_player_ids: ["75f57802-eebf-49ec-a9b6-911a07f1edb2"]
            })
            .then(function (response) {
                console.log('jejejej');
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            const resetUrl = `http://localhost:3000/reestablecer/112asdasddas`;
            const usuario  = 'chikavi';
    
            await enviarEmail.enviar({
                usuario,
                subject: 'Reestablecer contraseña',
                resetUrl,
                archivo: 'reservacion'
            });
        
            res.json({ mensaje:'Se ha enviado el correo' });
        
        }

    } catch (error) {
        console.log(error);
        payment_accepted = false;
        // return res.json({ message: error })
    }
    // Codigo


    if (!payment_accepted) 
    { 
        // Pago NO aceptado
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
            id_user,
            time,
            duration,
            status: (status || 1)
            }).then(() => {
                res.status(200);
                res.json('OK');
            }).catch((err) => {
                res.status(503);
                res.json(err);
            });
    }

}