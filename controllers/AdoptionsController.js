// const Adoptions = require('../models/Adoptions');
const Adoptions = require('../models/Requestsadoptions');
const ResponseAdoptions  = require('../models/Responseadoptions');
const validateBody = require('../public/validateBody');
const { Sequelize, DataTypes, Op } = require('sequelize');
const DB = require('../config/db');
const Users = require('../models/Users');
const Pets = require('../models/Pets');
const { adoptionsAvailable } = require('./PetsController');

// exports.add = async (req,res) => {
//     // const {  
        
//     //     name,
//     //     email,
//     //     identification,
//     //     cellphone,
//     //     address,
//     //     exterior_number,
//     //     interior_number,
//     //     zip,
//     //     neighborhood,
//     //     city,
//     //     state,
//     //     userId,
//     //     petId,
//     //     status
//     // } = req.body;

//     // let validate = validateBody(await Adoptions.describe(), req.body);

//     // if (validate !== true) {
//     //     res.status(503);
//     //     res.json({fields_empty: validate});
//     //     return;
//     // }

// //     const adoptions = Adoptions.create({
// //       name,
// //       email,
// //       identification,
// //       cellphone,
// //       address,
// //       exterior_number,
// //       interior_number,
// //       zip,
// //       neighborhood,
// //       city,
// //       state,
// //       userId,
// //       petId,
// //       estatus,
// //       status: (status || 1)
// //     })

// //     if(!adoptions) return next();

// //     res.status(200).send('Se ha creado correctamente la adopcion.');
// // }




exports.getAdoptionsOrganization = async (req,res) => {
    const adoptions = await Adoptions(DB, DataTypes).findAll({
        where: {
            id_organization: req.params.organizationId,
            "status": {[Op.ne]: 0}
        }
    });
   
    
    res.json(await mapAdoptions(adoptions));
}

exports.getAdoptionsUser = async (req,res) => {
    const adoptions = await Adoptions(DB, DataTypes).findAll({
        where: {
            id_user: req.params.userId,
            "status": {[Op.ne]: 0}
        }
    });
    res.json(await mapAdoptions(adoptions));
}


exports.getAdoptionId = async (req,res) => {
    const adoptions = await Adoptions(DB, DataTypes).findAll({
        where: {
            id: req.params.id,
            "status": {[Op.ne]: 0}
        }
    });
    res.json(await mapAdoptions(adoptions));
}

exports.updateAdoption = async (req,res) => {
    const updateAdoption = req.body;

    await Adoptions(DB, DataTypes).update(
        updateAdoption,
        { where: { "id": req.body.id, "status": { [Op.ne]: 0 } } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })

}

exports.deleteAdoption = async (req,res) => {
    await Adoptions(DB, DataTypes).update(
        { status: 0 },
        { where: { "id": req.body.id } })
        .then(data => {
            res.status(200);
            res.json(data);
        }).catch(err => {
            res.status(503);
            res.json(err);
        })
}


exports.getResponseAdoption = async (req,res) => {
    const adoptions = await ResponseAdoptions(DB,DataTypes).findAll({
        where: {
            id_request: req.params.id
           }
        });
    res.json(await mapAdoptionsResponse(adoptions));
}

/////////////////////////////////////////

async function mapAdoptions (adoptions) {

    let final = [];

    for (let item of adoptions) {

        final.push(await getInfo(item.id_user, item.id_pet));

    }

    return final;

}

async function mapAdoptionsResponse (adoptions) {

    let final = [];

    for (let item of adoptions) {

        await Adoptions(DB, DataTypes).findAll({
            where: {
                id: item.id_request,
                "status": {[Op.ne]: 0}
            },
            attributes: ['id', 'id_user', 'id_pet', 'id_organization', 'status', 'date']
        }).then(async ([adopt]) => {

            let info = await getInfo(adopt.dataValues.id_user, adopt.dataValues.id_pet);
            final.push({
                ...info,
                ...adopt.dataValues
            });


        })
        .catch((err) => final = err);


    }

    return final;

}

async function getInfo (id_user, id_pet) {

    let [result, meta] = await DB.query(`
        SELECT U.name, U.email, U.cellphone, U.identification, U.address, P.name, P.breed FROM Users U INNER JOIN Pets P ON
        U.id = P.id_user WHERE
        U.id = ${id_user} AND P.id=${id_pet};
    `);

    return result[0];

}