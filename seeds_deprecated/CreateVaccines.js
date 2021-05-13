const faker = require('faker/locale/en');
const Vaccines = require('../models/Vaccines');


async function createVaccine(){

    for(let i=0; i < 20;i++){

        const name    = faker.lorem.word();
        const type    = 1;
        const pet_id   = faker.datatype.number({ 'min': 1,
        'max': 20});
        const estatus = 1;
        
        await Vaccines.create({
            name,
            type,
            pet_id,
            estatus
        });
    }
}

createVaccine();


