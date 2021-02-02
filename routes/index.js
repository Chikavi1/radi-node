const express = require('express');
const router = express.Router();

// controladores
const HomeController = require('../controllers/HomeController');
const PetsController = require('../controllers/PetsController');
const DonationsController = require('../controllers/DonationsController');
const AuthController = require('../controllers/AuthController');
const Donations = require('../models/Donations');




module.exports = function(){
    router.get('/',HomeController.landingPage);
    router.get('/about',HomeController.about);

    // AUTH ROUTES NODEJS
    router.get('/login',AuthController.login);
    router.post('/login',AuthController.auth);

    router.get('/register',AuthController.register);
    router.post('/register',AuthController.createUser);

    router.get('/auth/google',AuthController.googleauth);
    router.get('/auth/google/callback',AuthController.googleCallback);

    router.get('/forgot',AuthController.forgot)

    // AUTH ROUTES APi

    router.post('/api/login',AuthController.loginApi);
    router.post('/api/register',AuthController.registerApi);

    // PETS ROUTES
    router.get('/adopta',PetsController.adopta);

    router.get('/pets',PetsController.index);
    router.get('/pets/create',PetsController.create);


    router.post('/pets/store',PetsController.store);
    router.get('/pets/update',PetsController.update);

    router.get('/donations',DonationsController.get);
    router.post('/donations',DonationsController.create);

    router.get('/donaciones',DonationsController.donacion);


    router.get('/auth/google',AuthController.googleauth);
    router.get('/auth/google/callback',AuthController.googleCallback);

    return router;
}