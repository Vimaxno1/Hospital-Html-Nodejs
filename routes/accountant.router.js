const express = require('express');

const accountantController = require('./accountant.controller');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/all-accountant', isAuth, accountantController.getAllaccountant);
router.get('/add-accountant', isAuth, accountantController.getAddaccountant);
router.get('/edit-accountant/:accountantsId', isAuth, accountantController.getEditaccountant);
router.get('/accountant-profile/:accountantsId', isAuth, accountantController.getaccountantprofile);

/* POST DOCTORS SECTION */
router.post('/edit-accountant', isAuth, accountantController.postEditaccountant);
router.post('/add-accountant', isAuth, accountantController.postAddaccountant);
router.post('/delete-accountant', accountantController.postDeleteaccountant);


module.exports = router;