const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controllers')

router.post('/postcontact',contactController.postcontact)
router.get('/getcontact',contactController.getcontact)


module.exports=router