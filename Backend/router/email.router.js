const { Router } = require('express');
const router = Router();
const emailController = require('../controllers/email.controllers.js');

router.post('/email', emailController.SendEmailToMe);

module.exports = router;