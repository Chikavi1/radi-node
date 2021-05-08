const faker = require('faker/locale/en');
const Pets = require('../models/Pets');


async function createPets(){

    for(let i=0; i < 10;i++){

        const name           = faker.name.findName();
        const photo          = faker.random.image();
        const age            = faker.datatype.number({ 'min': 1,
        'max': 15});
        const city           = faker.address.city();
        const color          = faker.commerce.color();
        const description    = faker.lorem.words(22);
        const size           = faker.random.arrayElement(["S","M","G"]);
        const race           = faker.animal.dog();
        const gender         = faker.datatype.number({ 'min': 0,
        'max': 1});
        const status         = faker.datatype.number({ 'min': 0,
        'max': 3});
        const userId         = faker.datatype.number({ 'min': 1,
        'max': 5});
        const verified       = faker.datatype.number({ 'min': 0,
        'max': 1});
        const specie         = faker.random.arrayElement(["dog","cat"]);
        const code           = faker.internet.password();
        const geolocation    = faker.address.latitude(20, 30)+','+faker.address.longitude(-101, -113);
        const organizationId = faker.datatype.number({ 'min': 0,
        'max': 1});


        await Pets.create({
            name,
            photo,
            age,
            city,
            color,
            description,
            size,
            race,
            gender,
            status,
            userId,
            verified,
            specie,
            code,
            geolocation,
            organizationId
        });
    }
}

createPets();



// console.log( faker.lorem.words(35));