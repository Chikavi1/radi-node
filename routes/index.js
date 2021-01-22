const express = require('express');
const router = express.Router();

// controladores
const HomeController = require('../controllers/HomeController');

module.exports = function(){
    router.get('/',HomeController.landingPage);

    return router;
}