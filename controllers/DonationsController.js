const Donations = require('../models/Donations');
const sequelize = require('sequelize');

exports.donacion = async (req,res) => {

    const donaciones = await Donations.findAll({
        
        order: [
            ['id', 'DESC'],
        ],
        limit:5,
        where: {"status": {[Op.ne]: 0}}
        
    });

    const total_amount = await Donations.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
            
          ], raw: true
    });

    console.log(total_amount[0].total_amount);
    // const donaciones = await Donations.findAll({})


    res.render('donaciones',{
        nombrePagina: 'Donaciones',
        donaciones: donaciones,
        total_amount: total_amount[0].total_amount
    });

}
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
        headline,amount,message,status: (status || 1)
    });

    if(!donation) return next();

    res.send('creado chaval jaja');
}