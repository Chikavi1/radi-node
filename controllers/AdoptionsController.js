const Adoptions = require('../models/adoptions');


exports.add = (req,res) => {
    const {  
        
        name,
        email,
        identification,
        cellphone,
        address,
        exterior_number,
        interior_number,
        zip,
        neighborhood,
        city,
        state,
        userId,
        petId,
        estatus
    } = req.body;


    const adoptions = Adoptions.create({
      name,
      email,
      identification,
      cellphone,
      address,
      exterior_number,
      interior_number,
      zip,
      neighborhood,
      city,
      state,
      userId,
      petId,
      estatus,
    })

    if(!adoptions) return next();

    res.status(200).send('Se ha creado correctamente la adopcion.');
}

exports.delete = (req,res) => {
    res.json('se elimino adopcion');
}

exports.update = (req,res) => {
    res.json('se actualizo adopcion');
}



exports.show = async (req,res) => {
    const adoptions = await Adoptions.findAll({
        where: {
            userId: req.params.userId
        }
    });
    res.json(adoptions);
    // res.json('se mostraron las adopcion');
}