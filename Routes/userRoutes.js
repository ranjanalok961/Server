const express = require('express');
const {registerController  , loginCOntroller }= require('../Contoller/userController');
//rputer object

const router  = express.Router();

router.post('/register', registerController)
router.post('/login', loginCOntroller)

module.exports = router