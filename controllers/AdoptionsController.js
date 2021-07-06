const Adoptions = require('../models/Adoptions');
const validateBody = require('../public/validateBody');

exports.add = async (req,res) => {
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
        status
    } = req.body;

    let validate = validateBody(await Adoptions.describe(), req.body);

    if (validate !== true) {
        res.status(503);
        res.json({fields_empty: validate});
        return;
    }

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
      status: (status || 1)
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
            userId: req.params.userId,
            "status": {[Op.ne]: 0}
        }
    });
    res.json(adoptions);
    // res.json('se mostraron las adopcion');
}