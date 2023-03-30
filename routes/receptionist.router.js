const express = require('express');

const receptionistController = require('./receptionist.controller');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/all-receptionist', isAuth, receptionistController.getAllreceptionist);
router.get('/add-receptionist', isAuth, receptionistController.getAddreceptionist);
router.get('/edit-receptionist/:receptionistsId', isAuth, receptionistController.getEditreceptionist);
router.get('/receptionist-profile/:receptionistsId', isAuth, receptionistController.getReceptionistprofile);

/* POST DOCTORS SECTION */
router.post('/edit-receptionist', isAuth, receptionistController.postEditreceptionist);
router.post('/add-receptionist', isAuth, receptionistController.postAddreceptionist);
router.post('/delete-receptionist', receptionistController.postDeleteReceptionist);


module.exports = router;