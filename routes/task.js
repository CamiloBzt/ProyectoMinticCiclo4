'use strict'

var express = require('express');
var TaskController = require('../controllers/task');

var router = express.Router();

// Rutas prueba
router.get('/test-de-controlador', TaskController.test);
router.post('/test-de-controlador', TaskController.test);

// Rutas
router.post('/save', TaskController.save);
router.get('/tasks', TaskController.getTasks);
router.put('/task/:id', TaskController.edit);
router.delete('/task/:id', TaskController.delete);

module.exports = router;