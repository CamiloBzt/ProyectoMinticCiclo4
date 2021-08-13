'use strict'

var express = require('express');
var TaskController = require('../controllers/task');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/users'});

// Rutas prueba
router.get('/test-de-controlador', TaskController.test);
router.post('/test-de-controlador', TaskController.test);
router.get('/users', TaskController.getUsers);
router.delete('/user/:id', TaskController.deleteUsers);
// Rutas
router.put('/saveTask/:id', TaskController.save);
router.get('/tasks/:id', TaskController.getTasks);
router.put('/edit/:id', TaskController.edit);
router.post('/store', TaskController.store)
router.post('/login', TaskController.login)
router.put('/delete/:id', TaskController.delete);
router.get('/search/:id/:search', TaskController.searchTask);
router.get('/calendar/:id/:date', TaskController.calendar);
router.post('/upload-image/:id', md_upload, TaskController.upload);
router.get('/get-image/:image', TaskController.getImage);

module.exports = router;