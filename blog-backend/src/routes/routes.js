const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controllers')
const postController=require('../controllers/post.controllers')
const userController=require('../controllers/user.controllers')
const adminController=require('../controllers/admin.controllers')
const upload = require('../utils/fileStorage');

router.post('/postcontact',contactController.postcontact)
router.get('/getcontact',contactController.getcontact)
router.post('/post', upload.single('image'), postController.post);
router.get('/getall',postController.getAllPosts)
router.get('/getpost/:id', postController.getPostById);
router.put('/updatepost/:id',upload.single('image'),postController.updateposts)
router.delete('/deletepost/:id',postController.deletePosts)
router.post('/userRegister',userController.UserRegister)
router.post('/userlogin',userController.UserLogin)
router.post('/adminRegister',adminController.adminRegister)
router.post('/adminlogin',adminController.AdminLogin)

module.exports=router