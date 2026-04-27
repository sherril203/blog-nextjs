const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controllers')
const postController=require('../controllers/post.controllers')
const upload = require('../utils/fileStorage');

router.post('/postcontact',contactController.postcontact)
router.get('/getcontact',contactController.getcontact)
router.post('/post', upload.single('image'), postController.post);
router.get('/getall',postController.getAllPosts)
router.get('/post/:id', postController.getPostById);


module.exports=router