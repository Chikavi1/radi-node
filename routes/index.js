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
const IsolationsController = require('../controllers/IsolationsController');
const ReviewsController = require('../controllers/ReviewsController');
const PublicController = require('../controllers/PublicControllers');

const auth = require('../middleware/Auth');

module.exports = function(){
    router.get('/',HomeController.landingPage);
    router.get('/about',HomeController.about);

    router.get('/search_things/:query', PublicController.searchThings);

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
    router.get('/pets',PetsController.index);

    router.get('/pets/show/:id',PetsController.show);
    router.post('/pets/search',PetsController.searchPets);

    router.post('/upload_img', PetsController.subirArchivo);

    router.post('/pets/store', PetsController.store);
    router.put('/pets/update', PetsController.updatePet);
    router.post('/pets/delete', PetsController.deletePet);
    router.get('/near_pets/:lat/:long/:status', PetsController.nearPets);
    router.get('/pets/user/:id_user',PetsController.getPetsByUser);
    router.get('/pets/adoptions_available',PetsController.adoptionsAvailable);

    //router.get('/donations',DonationsController.get);
    //router.post('/donations',DonationsController.create);

    //router.get('/donaciones',DonationsController.donacion);

    router.post('/send_email',EmailController.sendEmail);

    router.get('/auth/google',AuthController.googleauth);
    router.get('/auth/google/callback',AuthController.googleCallback);

    // Organizations
    router.get('/get_organization/:idOrg',OrganizationsController.getOrganization);
    router.post('/create_organization',OrganizationsController.createOrganization);
    router.put('/update_organization',OrganizationsController.updateOrganization);
    router.post('/delete_organization',OrganizationsController.deleteOrganization);

    // Reservations
    router.get('/reservations_week/:idVet', ReservationsController.getReservationsWeek);
    router.post('/create_reservation', ReservationsController.insertReservation);
    router.get('/get_reservations_user/:idUser', ReservationsController.getReservationsByUser);
    router.get('/retrieve_payments', ReservationsController.retrievePayment);

    // Vets
    router.get('/get_vet/:idVet', VetsController.getVet);
    router.get('/get_vets/:offset/:limit', VetsController.getVets);
    router.get('/near_vets/:lat/:long', VetsController.nearVets);
    router.get('/search_vets/:vet_name', VetsController.searchVets);
    router.put('/update_vet', VetsController.updateVet);
    router.post('/create_vet', VetsController.createVet);

    // Isolations
    router.post('/create_isolation', IsolationsController.createIsolation);
    router.get('/get_isolations/:idVet', IsolationsController.getIsolations);
    router.put('/update_isolation', IsolationsController.updateIsolation);
    router.post('/delete_isolation', IsolationsController.deleteIsolation);
    
    // Products
    router.get('/get_products/:idVet', ProductsController.getProducts);
    router.put('/update_product', ProductsController.updateProduct);
    router.post('/create_product', ProductsController.createProduct);

    // Services
    router.get('/get_services/:idVet', ServicesController.getServices);
    router.put('/update_service', ServicesController.updateService);
    router.post('/create_service', ServicesController.createService);
    
    // Reviews
    router.post('/create_review', ReviewsController.createReview);
    router.get('/get_reviews/:idVet', ReviewsController.getReviews);
    router.get('/get_reviews/avg/:idVet', ReviewsController.getAvgReviewsByVet);
    router.put('/update_review', ReviewsController.updateReview);
    router.post('/delete_review', ReviewsController.deleteReview);

    // Vaccines
    router.post('/create_vaccine', VaccinesController.createVaccine);
    router.get('/get_vaccines/:idPet', VaccinesController.getVaccines);
    router.put('/update_vaccine', VaccinesController.updateVaccine);
    router.post('/delete_vaccine', VaccinesController.deleteVaccine);

    // adoptions
    router.post('/adoptions', AdoptionsController.add);
    router.get('/adoptions_user/:userId',AdoptionsController.show);
    // router.get('/adoptions_pet/:userId')


    return router;
}