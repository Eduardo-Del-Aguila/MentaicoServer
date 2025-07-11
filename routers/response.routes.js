const express = require('express');
const router = express.Router();
const responseController = require('../controllers/reponse.controller');

router.post('/save', responseController.saveResponse);

module.exports = router;
