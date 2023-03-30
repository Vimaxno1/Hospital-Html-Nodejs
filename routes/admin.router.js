const express = require('express');

const adminController = require('./admin.controller');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**************************/
/* MAIN SECTION */
/**************************/
router.get('/', isAuth, adminController.getIndex);

module.exports = router;
