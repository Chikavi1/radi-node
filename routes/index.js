const express = require('express');
const router = express.Router();

// controladores
const HomeController = require('../controllers/HomeController');
const PetsController = require('../controllers/PetsController');
//const DonationsController = require('../controllers/DonationsController');
const AuthController = require('../controllers/AuthController');
const EmailController = require('../controllers/EmailController');
const OrganizationsController = require('../controllers/OrganizationsController');
const VaccinesController  = require('../controllers/VaccinesController');
const AdoptionsController = require('../controllers/AdoptionsController');
const ReservationsController = require('../controllers/ReservationsController');
const VetsController = require('../controllers/VetsController');
const ProductsController = require('../controllers/ProductsController');
const ServicesController = require('../controllers/ServicesController');

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

    //router.get('/donations',DonationsController.get);
    //router.post('/donations',DonationsController.create);

    //router.get('/donaciones',DonationsController.donacion);

    router.post('/send_email',EmailController.sendEmail);

    router.get('/auth/google',AuthController.googleauth);
    router.get('/auth/google/callback',AuthController.googleCallback);

    // Organizations
    router.get('/organizaciones',OrganizationsController.index);
    router.post('/organizaciones',OrganizationsController.store);

    // Reservations
    router.get('/reservations_week/:idVet', ReservationsController.getReservationsWeek);
    router.post('/create_reservation', ReservationsController.insertReservation);

    // Vets
    router.get('/get_vet/:idVet', VetsController.getVet);
    router.get('/get_vets/:offset/:limit', VetsController.getVets);
    router.get('/near_vets/', VetsController.nearVets);
    router.put('/update_vet', VetsController.updateVet);
    router.post('/create_vet', VetsController.createVet);

    // Products
    router.get('/get_products/:idVet', ProductsController.getProducts);
    router.put('/update_product', ProductsController.updateProduct);
    router.post('/create_product', ProductsController.createProduct);

    // Services
    router.get('/get_services/:idVet', ServicesController.getServices);
    router.put('/update_service', ServicesController.updateService);
    router.post('/create_service', ServicesController.createService);
    
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