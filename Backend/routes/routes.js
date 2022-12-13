

const express = require('express');
const register = require('../controllers/register')
const posts = require('../controllers/posts')





const router = express.Router()

router.post('/login',register.login);

router.post('/register',register.register);

router.post('/addPost',posts.addPost);

router.get('/getPosts',posts.getPosts);

router.get('/getOnePost',posts.getOnePost);




module.exports = router;
