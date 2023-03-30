const express = require('express');

const doctorController = require('./doctors.controller');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/all-doctor', isAuth, doctorController.getAlldoctor);
router.get('/add-doctor', isAuth, doctorController.getAdddoctor);
router.get('/edit-doctor/:doctorsId', isAuth, doctorController.getEditdoctor);
router.get('/doctor-profile/:doctorsId', isAuth, doctorController.getDoctorprofile);

/* POST DOCTORS SECTION */
router.post('/edit-doctor', isAuth, doctorController.postEditdoctor);
router.post('/add-doctor', isAuth, doctorController.postAdddoctor);
router.post('/delete-doctor', doctorController.postDeleteDoctor);


module.exports = router;  