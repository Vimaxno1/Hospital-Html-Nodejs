const express = require('express');

const nurseController = require('./nurses.controller');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/all-nurse', isAuth, nurseController.getAllnurse);
router.get('/add-nurse', isAuth, nurseController.getAddnurse);
router.get('/edit-nurse/:nursesId', isAuth, nurseController.getEditnurse);
router.get('/nurse-profile/:nursesId', isAuth, nurseController.getNurseprofile);

/* POST DOCTORS SECTION */
router.post('/edit-nurse', isAuth, nurseController.postEditnurse);
router.post('/add-nurse', isAuth, nurseController.postAddnurse);
router.post('/delete-nurse', nurseController.postDeleteNurse);


module.exports = router;