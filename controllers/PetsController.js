const Pets = require('../models/Pets');
// const pool = require('../database');
const { Op, json } = require("sequelize");


const { Sequelize, DataTypes, where } = require('sequelize');

const DB = require('../config/db');


const shortid = require('shortid');
const multer = require('multer');

const configuracionMulter = {
  limits: {  fileSize : 5000000 },
  storage: fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
      cb(null,__dirname+'/../uploads')
    },
    filename: (req,file,cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null,`${shortid.generate()}.${extension}`);
    }
  })
}

const upload =  multer(configuracionMulter).single('photo');

exports.subirArchivo = (req,res,next) => {

  upload(req,res,async(error) => {
    if(error){
      res.json({mensaje: error})
    }
    return res.json(req.file.filename);
  });
}




exports.index = async (req,res) => {

  let specie = req.query.specie;
  let gender = req.query.gender;
  let size   = req.query.size;
  let race = req.query.race;


  var options = {where: {} };
  options.where.status ={ [Op.not]: 0 }

  if(specie){
    options.where.specie ={ [Op.eq]: specie }
  }
  if(gender){
    options.where.gender ={ [Op.eq]: gender }
  }
  if(size){
    options.where.size ={ [Op.eq]: size }
  }

  if(race){
    options.where.race ={ [Op.eq]: race }
  }


    const pets = await Pets.findAll(options);
    res.json(pets);
}

exports.create = (req,res) => {
  res.render('crearPerro',{
    nombrePagina: 'Adopta un amigo, ya!',
});
}



exports.store = async (req,res,next) => {
  
  console.log(req.body);
      
  const { 
    
    name,
    photo,
    age,
    city,
    color,
    description,
    size,
    breed,
    gender,
    status,
    vacumms_id,
    id_user,
    verified,
    specie,
    code,
    geolocation } = req.body;

  try{

    // if(req.file.filename){
    //   imagen  = req.file.filename;
    // }else{
      // }
      
        imagen = 'chales no jalo jaja';

    // res.json({ archivo: req.file.filename })
     await Pets(DB, DataTypes).create({
      name : name,
      photo: imagen,
      age,
      city,
      color,
      description,
      size,
      breed,
      gender,
      status:1,
      vacumms_id:1,
      id_user,
      verified: 0,
      specie,
      code: 'aasdasdasahusada2',
      geolocation
    }).then(() => {
      res.status(200);
      res.send('OK');
  }).catch((err) => {
      res.status(503);
      res.send(err);
  });
    
    // if(!pets) return next();
    
    // res.status(200).send('Perro Creado correctamente');
  }catch(error){
    console.log(error);
    next();
  }

 
  
}

exports.show = async (req,res) => {
  const { id } = req.params;

  const pets = await await Pets(DB, DataTypes).findOne({
    where: { id }
  });

  pets.photo = "http://localhost:8080/"+pets.photo;
  console.log(pets)

  res.json(pets);
}

exports.update = (req,res,next) => {
    res.send('update')
}


// exports.index = (req, res,next) => {
//     const limit = 8
//     const page = req.query.page? req.query.page : 2
//     const offset = (page - 1) * limit
    
    
//     const petsex = req.query.petSex;
//     const petType = req.query.page? req.query.page : '';
//     const large = req.query.large
    

//     // query = " " + " limit " + limit + " OFFSET " + offset 
//     // if (petType) query = 'select * from users where city = ? limit ? OFFSET ? ', [petType,limit,offset];
    
//     let query = `select * from pets limit ` + limit + ` OFFSET ` + offset ;
   
//     console.log(query,limit,offset);
    
//     pool.getConnection(function(err, connection) {
//       connection.query(query, function (error, results, fields) {
//         connection.release();
//              if (error) throw error;

//         var jsonResult = {
//           'products_page_count': results.length,
//           'page_number': page,
//           'products': results
//         }

//         var myJsonString = JSON.parse(JSON.stringify(jsonResult));
//         res.statusMessage = "Products for page "+page;
//         res.statusCode = 200;
//         res.json(myJsonString);
//         res.end();
//       })
//     });

// }

// exports.uploadImage = (req, res,next) => {
//   console.log(req.name);

//   if (!req.files) {
//       return res.status(500).send({ msg: "Archivo no encontrado" })
//   }
//   const myFile = req.files.file;
    
//   myFile.mv( path.join(__dirname, '../'+'public/images/'+ Date.now() + myFile.name ) , function (err) {
//       if (err) {
//           console.log(err)
//           return res.status(500).send({ msg: "Error" });
//       }
//       return res.send({name: myFile.name, path: `/${myFile.name}`});
//   });
// }


exports.adopta = async (req,res) => {
 const pets = await Pets.findAll();

 console.log(pets);
 
  res.render('adopta',{
    nombrePagina: 'Adopta un amigo, ya!',
    pets
});
}