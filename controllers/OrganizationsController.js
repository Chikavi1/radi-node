const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Organizations = require('../models/Organizations');
const validateBody = require('../public/validateBody');

exports.createOrganization = async (req, res) => {

  const {
    name,
    address,
    social_media,
    cellphone,
    cover,
    photo,
    description,
    id_user,
    status
  } = req.body;

  if (!validateBody(
    name,
    address,
    social_media,
    cellphone,
    cover,
    photo,
    description,
    id_user,
    status
  )) {
    res.status(503);
    res.json({ msg: 'Datos incompletos' });
    return;
  }

  await Organizations(DB, DataTypes).create({
    name,
    address,
    social_media,
    cellphone,
    cover,
    photo,
    description,
    id_user,
    status: (status || 1)
  })
    .then(() => {
      res.status(200);
      res.json('OK');
    }).catch((err) => {
      res.status(503);
      res.json(err);
    });

};

module.exports.getAllOrganizations = async (req, res) => {

  await Organizations(DB, DataTypes).findAll({ where: { "status": { [Op.ne]: 0 } } })
    .then(data => {
      res.status(200);
      res.json(data);
    }).catch(err => {
      res.status(503);
      res.json(err);
    })

};

module.exports.getOrganization = async (req, res) => {

  await Organizations(DB, DataTypes).findAll({ where: { "id": req.params.idOrg, "status": { [Op.ne]: 0 } } })
    .then(data => {
      res.status(200);
      res.json(data);
    }).catch(err => {
      res.status(503);
      res.json(err);
    })

};

module.exports.nearOrganizations = async (req, res) => {

  try {

    let [result, meta] = await DB.query(`
        SELECT *, ((ACOS(SIN(${req.params.lat} * PI() / 180) * 
        SIN(latitude * PI() / 180) + COS(${req.params.lat} * PI() / 180) * 
        COS(latitude * PI() / 180) * COS((${req.params.long} - longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344) 
        as distance FROM Organizations WHERE status!=0 HAVING distance <= 5 ORDER BY distance ASC;
        `);

    res.status(200);
    res.json(result);

  } catch (err) {
    res.status(503);
    res.send(err);
  }

};


module.exports.updateOrganization = async (req, res) => {

  const updateOrganization = req.body;

  await Organizations(DB, DataTypes).update(
    updateOrganization,
    { where: { "id": req.body.id, "status": { [Op.ne]: 0 } } })
    .then(data => {
      res.status(200);
      res.json(data);
    }).catch(err => {
      res.status(503);
      res.json(err);
    })

}

module.exports.deleteOrganization = async (req, res) => {

  await Organizations(DB, DataTypes).update(
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