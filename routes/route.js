const express = require('express');
// const { inscriptionView,connexionView,connectionUser,inscriptionUser} = require('../controllers/loginController');
const {bilanView,comgalView,ajoutBilan} = require('../controllers/controlle');
// const { protectRoute } = require ( "../auth/protect" ); 
const router = express.Router();

//afficher les page :GET
router.get('/bilan',bilanView);
router.get('/comgallette',comgalView);

//inscription-connection :POST
router.post('/comgallette',ajoutBilan);

module.exports=router;