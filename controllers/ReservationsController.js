//const { DataTypes } = require('sequelize/types');
const { date } = require('faker');
const Moment = require('moment');
const MomentRange = require('moment-range');
const { Sequelize, DataTypes, where, Op } = require('sequelize');
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_yA1c9PFKtvAHmekF9apQQYlm00tWTyzmTI ');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const Vets = require('../models/Vets');
const Users = require('../models/Users');
const Reservations = require('../models/Reservations');
const validateBody = require('../public/validateBody');

const moment = MomentRange.extendMoment(Moment);

module.exports.getReservationsWeek = async (req, res) => {

    let week = new Array(7);
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('isoweek');
    let weekEnd = currentDate.clone().endOf('isoweek');

    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), { foreignKey: 'id_pet' });
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), { foreignKey: 'id' })

    let result = await Reservations(DB, DataTypes).findAll({ where: { "id_vet": req.params.idVet} });

    //let [result, meta] = await DB.query('select p.name, r.note, r.time, r.id_pet from reservations r inner join pets p on p.id=r.id_pet where r.id_vet=' + req.params.idVet);

    result.forEach((item) => {

        item = item.dataValues;

        if (moment(item.time).isBetween(weekStart, weekEnd)) {
            if (week[moment(item.time).isoWeekday()-1]) {
                week[moment(item.time).isoWeekday()-1].push(item);
            } else {
                week[moment(item.time).isoWeekday()-1] = [item];
            }
        }

    })

    res.json(week);

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

exports.preReservation = async (req, res) => {
    
    let schedule, dayStart, dayEnd;
    let day = req.body.day;
    
    await Vets(DB, DataTypes).findOne({where: {id: req.body.idVet}, attributes: ['schedule']})
    .then(async (data) => {
        
        schedule = JSON.parse(data.schedule);
        
        let result = await Reservations(DB, DataTypes).findAll({
            attributes: ['time'],
            where: {
                "id_vet":  req.body.idVet,
                "status" : 1,
            }
        });
        
        dayStart = moment.utc(day).startOf('day').hour( schedule[moment(day).day()].start );
        dayEnd = moment.utc(day).startOf('day').hour( schedule[moment(day).day()].end );
        
        const slots = moment.range(dayStart, dayEnd);
        let time_slots = Array.from(slots.by('hours', {step: 1}))
        time_slots = time_slots.map(m => moment(m).format('YYYY-MM-DD HH:mm:ss'));

        if (result.length) {
            
            let flag = true;
            time_slots = time_slots.filter(m => {
                for (let i = 0; i < result.length; i++) {
                    flag = m !== moment.utc(result[i].dataValues.time).format('YYYY-MM-DD HH:mm:ss');
                    if (!flag) break;
                }
                return flag;
            });
        }

        res.status(200);
        res.json(time_slots);
    })
    .catch(err => {
        res.status(503);
        res.json(err);
    });

}

module.exports.insertReservation = async (req, res) => {

    let notAvailable = false;
    let payment_accepted = true;
    const { payment_id, amount, name, note, payment, price, id_vet, id_user, id_pet, time, duration, status } = req.body;

    if (!validateBody(payment_id, amount, name, note, payment, price, id_vet, id_user, id_pet, time, duration, status)) {
        res.status(503);
        res.json({msg: 'Datos incompletos'});
        return;
    }

    // Validacion Horario
    Pets(DB, DataTypes).hasMany(Reservations(DB, DataTypes), { foreignKey: 'id_pet' });
    Reservations(DB, DataTypes).belongsTo(Pets(DB, DataTypes), { foreignKey: 'id' })
    let result = await Reservations(DB, DataTypes).findAll({
        where: {
            "id_vet": id_vet,
            "time" : {[Op.between] : [moment.utc(time) , moment.utc(time).add(duration || 60, 'm')]}
        }
    });

    notAvailable = result.length;

    if (notAvailable) {
        res.status(503);
        res.json('Horario no disponible');
        return;
    }

    /* Codigo
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
    }*/
    // Codigo


    console.log(moment.utc(time).format('YYYY-MM-DD HH:mm:ss'))
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
            id_user,
            time: moment.utc(time),
            duration: duration || 60,
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