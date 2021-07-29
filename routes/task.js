'use strict'

var express = require('express');
var TaskController = require('../controllers/task');

var router = express.Router();

// Rutas prueba
router.get('/test-de-controlador', TaskController.test);
router.post('/test-de-controlador', TaskController.test);
router.get('/users', TaskController.getUsers);
// Rutas
router.put('/saveTask/:id', TaskController.save);
router.get('/tasks/:id', TaskController.getTasks);
router.put('/edit/:id', TaskController.edit);
router.post('/store', TaskController.store)
router.put('/delete/:id', TaskController.delete);

module.exports = router;