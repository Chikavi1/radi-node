const express = require('express');
const router = express.Router();

// controladores
const HomeController = require('../controllers/HomeController');
const PetsController = require('../controllers/PetsControllerController');
const DonationsController = require('../controllers/DonationsController');
const AuthController = require('../controllers/AuthController');
const EmailController = require('../controllers/EmailController');
const OrganizationsController = require('../controllers/OrganizationsController');
const VaccinesController  = require('../controllers/VaccinesController');
const AdoptionsController = require('../controllers/AdoptionsController');




const auth = require('../middleware/Auth');

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

    router.post('/forgot',AuthController.enviarToken);
    router.get('/reestablecer/:token',AuthController.validarToken);
    
    router.post('/reestablecer/:token',AuthController.actualizarPassword);

    // AUTH ROUTES APi

    router.post('/api/login',AuthController.loginApi);
    router.post('/api/register',AuthController.registerApi);

    // PETS ROUTES
    router.get('/adopta',PetsController.adopta);

    router.get('/pets',PetsController.index);
    router.get('/pets/create',PetsController.create);

    router.get('/pets/:id',PetsController.show);

    router.post('/pets/store',
    PetsController.subirArchivo,
    PetsController.store);
    router.get('/pets/update',PetsController.update);

    router.get('/donations',DonationsController.get);
    router.post('/donations',DonationsController.create);

    router.get('/donaciones',DonationsController.donacion);

    router.post('/send_email',EmailController.sendEmail);

    router.get('/auth/google',AuthController.googleauth);
    router.get('/auth/google/callback',AuthController.googleCallback);

    // Organizations
    router.get('/organizaciones',OrganizationsController.index);
    router.post('/organizaciones',OrganizationsController.store);
    
    // Vaccines
    router.get('/vaccines/:petId', VaccinesController.show);
    router.post('/vaccines', VaccinesController.add);
    router.put('/vaccines/:id',VaccinesController.update);

// adoptions
    router.post('/adoptions', AdoptionsController.add);
    router.get('/adoptions_user/:userId',AdoptionsController.show);
    // router.get('/adoptions_pet/:userId')


    return router;
}