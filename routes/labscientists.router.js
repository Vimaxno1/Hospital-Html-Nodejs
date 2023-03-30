const express = require('express');

const labscientistController = require('./labscientists.controller');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/all-labscientist', isAuth, labscientistController.getAlllabscientist);
router.get('/add-labscientist', isAuth, labscientistController.getAddlabscientist);
router.get('/edit-labscientist/:labscientistsId', isAuth, labscientistController.getEditlabscientist);
router.get('/labscientist-profile/:labscientistsId', isAuth, labscientistController.getLabscientistprofile);

/* POST DOCTORS SECTION */
router.post('/edit-labscientist', isAuth, labscientistController.postEditlabscientist);
router.post('/add-labscientist', isAuth, labscientistController.postAddlabscientist);
router.post('/delete-labscientist', labscientistController.postDeleteLabscientist);


module.exports = router;