const express = require('express');
const authController = require('./auth.controller');
const router = express.Router();

/* SIGN-IN SECTION */
router.get('/sign-in', authController.getSignin);
router.post('/sign-in', authController.postSignin);

/* SIGN-UP SECTION */
router.get('/sign-up', authController.getSignup);
router.post('/sign-up', authController.postSignup);

router.get('/sign-out', authController.getLogout);

module.exports = router;
