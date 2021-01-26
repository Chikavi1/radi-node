const Donations = require('../models/Donations');
const sequelize = require('sequelize');

exports.get = async (req,res,next) => {
    const donations = await Donations.findAll({
        order: [
            ['id', 'DESC'],
        ],
        limit:5
        
    });

    const total_amount = await Donations.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
            
          ], raw: true
    });


    res.json({donations,total_amount});
    // res.json(donations);
}

exports.create = async (req,res,next) => {

    const { headline,amount,message } = req.body;

    console.log(headline,amount,message);

    const donation =  await Donations.create({
        headline,amount,message
    });

    if(!donation) return next();

    res.send('creado chaval jaja');
}