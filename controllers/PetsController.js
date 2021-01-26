const Pets = require('../models/Pets');
const pool = require('./../database');


// exports.index = (req,res,next) => {
//     res.send('index perros');
// }

exports.create = async (req,res,next) => {


    const { name,photo,age,city,color,description,vacumms_id,userId,verified,estatus } = req.body;

    const pets = await Pets.create({
       name,
       age: 10,
       photo,
       city,
       color,
       description,
       vacumms_id: 1,
       userId: 1,
       verified: 1,
       estatus: 2
    });

    if(!pets) return next();

    res.status(200).send('Perro Creado correctamente');
}

exports.update = (req,res,next) => {
    res.send('update')
}


exports.index = (req, res,next) => {
    const limit = 5
    const page = req.query.page? req.query.page : 2
    const offset = (page - 1) * limit
    
    
    const petsex = req.query.petSex;
    const petType = req.query.page? req.query.page : '';
    const large = req.query.large
    

    // query = " " + " limit " + limit + " OFFSET " + offset 
    // if (petType) query = 'select * from users where city = ? limit ? OFFSET ? ', [petType,limit,offset];
    
    let query = `select * from pets limit ` + limit + ` OFFSET ` + offset ;
   
    console.log(query,limit,offset);
    
    pool.getConnection(function(err, connection) {
      connection.query(query, function (error, results, fields) {
        connection.release();
             if (error) throw error;

        var jsonResult = {
          'products_page_count': results.length,
          'page_number': page,
          'products': results
        }

        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Products for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      })
    });

}