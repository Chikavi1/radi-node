const faker = require('faker/locale/en');
const Donations = require('../models/Donations');


async function createDonations(){

    for(let i=0; i < 5;i++){

        const headline  = faker.name.findName();
        const amount    = faker.datatype.number({ 'min': 1,
        'max': 1000});
        const message    = faker.lorem.paragraph();
        
        await Donations.create({
            headline,
            amount,
            message
        });
    }
}

createDonations();


