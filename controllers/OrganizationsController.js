const Organizations = require('../models/Organizations');



exports.index = async (req,res) => {

    const organizations = await Organizations.findAll();
    res.json(organizations);
}



exports.store = async (req,res,next) => {


    const { name,address,social_media,cellphone,cover,photo,description,user_id } = req.body;

    console.log(req.body);

    const organizaciones = await Organizations.create({
      name,
      address,
      social_media,
      cellphone,
      cover,
      photo,
      description,
      user_id: 1,
      status: (status || 1)
    });

    if(!organizaciones) return next();

    res.status(200).send('Se ha Creado correctamente.');
}