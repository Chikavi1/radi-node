const faker = require('faker/locale/en');
const Organizations = require('../models/Organizations');


async function createOrganizations(){

    for(let i=0; i < 20;i++){

        const name         = faker.name.findName();
        const address      = faker.address.direction();
        const social_media = faker.internet.url();
        const cellphone    = faker.phone.phoneNumber();
        const cover        = faker.image.imageUrl();
        const photo        = faker.random.image();
        const description  = faker.lorem.paragraphs();
        const user_id      = faker.datatype.number({ 'min': 1,
        'max': 10});
        
        await Organizations.create({
            name,
            address,
            social_media,
            cellphone,
            cover,
            photo,
            description,
            user_id
        });
    }
}

createOrganizations();


