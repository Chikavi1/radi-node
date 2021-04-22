const Vaccines = require('../models/Vaccines');

exports.show = async (req,res) => {
    const vaccines = await Vaccines.findAll({
        where: {
            petId: req.params.petId
        }
    });
    res.json(vaccines);
}

exports.add = async (req,res) => {    
    const { name,type,petId,estatus } = req.body;
    const vaccines = await Vaccines.create({
        name,
        type,
        petId,
        estatus
    })

    if(!vaccines) return next();
    res.status(200).send('Se ha creado correctamente.');
}

exports.delete = (req,res) => {
    res.json('se elimino vacuna');
}

exports.update = (req,res) => {
    res.json('se actualizo vacuna');
}

