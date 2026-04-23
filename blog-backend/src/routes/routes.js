const express = require('express');
const router = express.Router();
const contact=require('../controllers/contact.controllers')

router.post('/postcontact',contact.postcontact)
router.get('/getcontact',contact.getcontact)


module.exports=router