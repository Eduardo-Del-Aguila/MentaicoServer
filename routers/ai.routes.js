const express = require('express');
const router = express.Router();
const foroController = require('../controllers/ai.controller');

router.post('/responder', foroController.responderForo);

module.exports = router;
