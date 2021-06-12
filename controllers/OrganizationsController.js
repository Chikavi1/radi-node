const { Sequelize, DataTypes, Op } = require('sequelize');

const DB = require('../config/db');
const Organizations = require('../models/Organizations');

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

module.exports.getOrganization = async (req, res) => {

  await Organizations(DB, DataTypes).findAll({where: {"id": req.params.idOrg, "status": {[Op.ne]: 0}}})
  .then(data => {
      res.status(200);
      res.json(data);
  }).catch(err => {
      res.status(503);
      res.json(err);
  })

};

module.exports.updateOrganization = async (req, res) => {

  const updateOrganization = req.body;

  await Organizations(DB, DataTypes).update(
      updateOrganization,
      { where: { "id": req.body.id, "status": {[Op.ne]: 0}} })
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
      {status: 0},
      { where: { "id": req.body.id } })
      .then(data => {
          res.status(200);
          res.json(data);
      }).catch(err => {
          res.status(503);
          res.json(err);
      })

}