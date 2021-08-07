'use strict'

var express = require('express');
var TaskController = require('../controllers/task');

var router = express.Router();
const auth = require('../middlewares/auth.js')

// Rutas prueba
router.get('/test-de-controlador', TaskController.test);
router.post('/test-de-controlador', TaskController.test);
router.get('/users', TaskController.getUsers);
// Rutas
router.put('/saveTask/:id', TaskController.save);
router.get('/tasks/:id', TaskController.getTasks);
router.put('/edit/:id',auth, TaskController.edit);
router.post('/store', TaskController.store)
router.post('/login', TaskController.login)
router.put('/delete/:id', TaskController.delete);
router.get('/search/:id/:search',auth, TaskController.searchTask);
router.get('/calendar/:id/:date',auth, TaskController.calendar);

module.exports = router;