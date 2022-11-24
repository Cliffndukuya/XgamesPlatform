

const express = require('express');
const register = require('../controllers/register')





const router = express.Router()

router.post('/login',register.login);

router.post('/register',register.register);








module.exports = router;
