const { Sequelize, DataTypes, Op } = require('sequelize');
const pdf = require('html-pdf');

const DB = require('../config/db');
const Pets = require('../models/Pets');
const validateBody = require('../public/validateBody');

const shortid = require('shortid');
const multer = require('multer');

const configuracionMulter = {
  limits: { fileSize: 5000000 },
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '/../uploads')
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })
}

const upload = multer(configuracionMulter).single('photo');

exports.subirArchivo = (req, res, next) => {

  upload(req, res, async (error) => {
    if (error) {
      res.json({ mensaje: error })
    }
    return res.json(req.file.filename);
  });
}

exports.index = async (req, res) => {

  let specie = req.query.specie;
  let gender = req.query.gender;
  let size = req.query.size;
  let race = req.query.race;


  var options = { where: {} };
  options.where.status = { [Op.not]: 0 }

  if (specie) {
    options.where.specie = { [Op.eq]: specie }
  }
  if (gender) {
    options.where.gender = { [Op.eq]: gender }
  }
  if (size) {
    options.where.size = { [Op.eq]: size }
  }

  if (race) {
    options.where.race = { [Op.eq]: race }
  }


  const pets = await Pets.findAll(options);
  res.json(pets);
}

exports.updatePet = async (req, res) => {

  const updatedPet = req.body;

  await Pets(DB, DataTypes).update(
    updatedPet,
    { where: { "id": req.body.id, "status": { [Op.ne]: 0 } } })
    .then(data => {
      res.status(200);
      res.json({ msg: data });
    }).catch(err => {
      res.status(503);
      res.send(err);
    })

}

exports.adoptionsAvailable = async (req, res) => {

  await Pets(DB, DataTypes).findAll({ where: { "status": 2, "status": { [Op.ne]: 0 } } })
    .then(data => {
      res.status(200);
      res.json(data);
    }).catch(err => {
      res.status(503);
      res.send(err);
    })

}

module.exports.nearPets = async (req, res) => {

  try {

    let [result, meta] = await DB.query(`
          SELECT *, ((ACOS(SIN(${req.params.lat} * PI() / 180) * 
          SIN(latitude * PI() / 180) + COS(${req.params.lat} * PI() / 180) * 
          COS(latitude * PI() / 180) * COS((${req.params.long} - longitude) * PI() / 180)) * 180 / PI()) * 60 * 1.1515 * 1.609344) 
          as distance FROM Pets WHERE status!=0 HAVING distance <= 5 ORDER BY distance ASC;
          `);

    res.status(200);
    res.json(result);

  } catch (err) {
    res.status(503);
    res.send(err);
  }

}

exports.getPetsByUser = async (req, res) => {

  await Pets(DB, DataTypes).findAll({ where: { "id_user": req.params.id_user, "status": { [Op.ne]: 0 } } })
    .then(data => {
      res.status(200);
      res.json(data);
    }).catch(err => {
      res.status(503);
      res.send(err);
    })

}

exports.searchPets = async (req, res) => {

  let result = await Pets(DB, DataTypes).findAll({
    where: {
      "name": { [Op.like]: '%' + req.body.pet_name + '%' },
      "status": { [Op.ne]: 0 }
    }
  })

  if (result.length) {
    res.status(200);
    res.json(result);
  } else {
    res.status(503);
    res.json({ msg: 'nada' });
  }


}

exports.store = async (req, res, next) => {

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
    id_user,
    specie,
    geolocation,
  } = req.body;

  // let validate = validateBody(await Pets(DB, DataTypes).describe(), req.body);

  // if (validate !== true) {
  //     res.status(503);
  //     res.json({fields_empty: validate});
  //     return;
  // }

  try {

    // if(req.file.filename){
    //   imagen  = req.file.filename;
    // }else{
    // }

    imagen = 'chales no jalo jaja';

    // res.json({ archivo: req.file.filename })
    await Pets(DB, DataTypes).create({
      name: name,
      photo,
      age,
      city,
      color,
      description,
      size,
      breed,
      gender,
      status: 1,
      vacumms_id: 1,
      id_user,
      verified: 0,
      specie,
      code: 'aasdasdasahusada2',
      geolocation,
      status: (status || 1)
    }).then(() => {
      res.status(200);
      res.send('OK');
    }).catch((err) => {
      res.status(503);
      res.send(err);
    });

    // if(!pets) return next();

    // res.status(200).send('Perro Creado correctamente');
  } catch (error) {
    console.log(error);
    next();
  }



}

exports.deletePet = async (req, res) => {

  await Pets(DB, DataTypes).update(
    { status: 0 },
    { where: { "id": req.body.id } })
    .then(data => {
      res.status(200);
      res.json({ msg: data });
    }).catch(err => {
      res.status(503);
      res.send(err);
    })

}

exports.show = async (req, res) => {
  const { id } = req.params;

  const pets = await Pets(DB, DataTypes).findOne({
    where: { id, "status": { [Op.ne]: 0 } }
  });

  console.log(pets)

  res.json(pets);
}


exports.adopcionPdf = async (req, res) => {
  const content = `
  <h1>Título en el PDF creado con el paquete html-pdf</h1>
  <p>Generando un PDF con un HTML sencillo</p>
  `;
  
  pdf.create(content).toFile('./html-pdf.pdf', function(err, res) {
      if (err){
          console.log(err);
      } else {
          console.log(res);
      }
  });

  return pdf;
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