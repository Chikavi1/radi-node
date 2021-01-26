const express = require('express');
const router = express.Router();

// controladores
const HomeController = require('../controllers/HomeController');
const PetsController = require('../controllers/PetsController');
const DonationsController = require('../controllers/DonationsController');




module.exports = function(){
    router.get('/',HomeController.landingPage);


    // PETS ROUTES
    router.get('/pets',PetsController.index);
    router.post('/pets/create',PetsController.create);
    router.get('/pets/update',PetsController.update);

    router.get('/donations',DonationsController.get);
    router.post('/donations',DonationsController.create);

    return router;
}