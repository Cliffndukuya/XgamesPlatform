

const express = require('express');
const register = require('../controllers/register')
const posts = require('../controllers/posts')





const router = express.Router()

router.post('/login',register.login);

router.post('/register',register.register);

router.post('/addPost',posts.addPost);






module.exports = router;
