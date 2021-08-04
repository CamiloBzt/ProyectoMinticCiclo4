"use strict";

var validator = require("validator");
var Task = require("../models/task");

var controller = {
  test: (req, res) => {
    return res.status(200).send({ message: "Test Controller" });
  },
  save: async (req, res) => {
    // Recibir id del usuario
    var userId = req.params.id;
    var user = await Task.findOne({ _id: userId });
    // Parametros Post
    var params = req.body;

    // Validar datos (validator)
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_description = !validator.isEmpty(params.description);
    } catch (err) {
      return res
        .status(200)
        .send({ status: "error", message: "Incorrect Data" });
    }

    if (validate_title && validate_description) {
      // Crear tarea
      var task = {
        title: String,
        description: String,
        date: {
          type: Date,
          default: Date.now,
        },
        priority: Number,
      };

      // Asignar valores
      task.title = params.title;
      task.description = params.description;
      task.priority = params.priority || 1;
      task.date = params.taskDate;

      console.log(task);

      user.tareas.push(task);
      // Guardar la tarea
      Task.findOneAndUpdate(
        { _id: userId },
        user,
        { new: true },
        (err, taskUpdated) => {
          if (err) {
            return res
              .status(500)
              .send({ status: "error", message: "Update Error" });
          }
          if (!taskUpdated) {
            return res
              .status(404)
              .send({ status: "error", message: "No Data" });
          }
          return res.status(200).send({ status: "success", task: taskUpdated });
        }
      );
    } else {
      return res.status(200).send({ status: "error", message: "Invalid Data" });
    }
  },

  store: async (req, res, next) => {
    try {
      var params = req.body;
      const user = await Task.findOne({ correo: req.body.correo });
      // console.log(user);
      if (user) {
        res.status(409).send({
          message:
            "Sorry the email is already use" +
            req.body.correo +
            " and there is a ",
        });
      } else {
        if (req.body.contraseña1 !== req.body.contraseña2) {
          res.status(409).send({
            message: "Las contraseñas no coinciden",
          });
        } else {
          // const user = await task.save(req.body);
          let task = await new Task({
            name: req.body.name,
            correo: req.body.correo,
            contraseña1: req.body.contraseña1,
            // contraseña2 : req.body.contraseña2,
            pais: req.body.pais,
          });

          task
            .save()

            .then((response) => {
              res.json({
                message: "Added Succesfully",
              });
            });
        }
      }
      // task.save()
      // }
    } catch (error) {
      res.status(500).send({
        message: "Error --> ",
      });
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const user =  await Task.findOne({ correo: req.body.correo })
      if(user){
        // const passwordISvalid = compareSync(req.body.contraseña, user.contraseña1)
        if (req.body.contraseña1 === user.contraseña1) {
          res.status(200).send({
            auth: true,
            user: user
          })
      } else {
          res.status(401).json({

              error: 'Error en el usuario o contraseña'
          })
        }
  } else {
      res.status(404).json({

          error: 'User Not Found.'
      })
  }
}catch (error) {
  res.status(500).send({
      message: 'Error aqui->',

  })
  next(error);
}}, 
  getUsers: (req, res) => {
    // Find
    Task.find({})
      .sort('_id')
      .exec((err, users) => {
        if (err) {
          return res.status(500).send({ status: "error", message: "Error" });
        }
        if (!users) {
          return res.status(404).send({ status: "error", message: "No Data" });
        }
        return res.status(200).send({ status: "success", users });
      });
  },
  getTasks: (req, res) => {
    // Find
    Task.findOne({ _id: req.params.id }).exec((err, task) => {
      if (err) {
        return res.status(500).send({ status: "error", message: "Error" });
      }
      if (!task) {
        return res.status(404).send({ status: "error", message: "No Data" });
      }
      var tareas = task.tareas;
      return res.status(200).send({ status: "success", tareas });
    });
  },
  edit: async (req, res) => {
    // Obtener id de la tarea
    var userId = req.params.id;

    // Obtener los datos que llegan por PUT
    var params = req.body;

    // Validar datos
    try {
      var validate_title = !validator.isEmpty(params.title);
      var validate_description = !validator.isEmpty(params.description);
    } catch (err) {
      return res
        .status(200)
        .send({ status: "error", message: "Incorrect Data" });
    }

    if (validate_title && validate_description) {
      // Find and Update
      var user = await Task.findOne({ _id: userId });
      var index = params.indice;
      var tarea = user.tareas[index];
      tarea.title = params.title;
      tarea.description = params.description;
      tarea.priority = params.priority;
      tarea.date = params.taskDate;
      user.tareas[index] = tarea;
      Task.findOneAndUpdate(
        { _id: userId },
        user,
        { new: true },
        (err, taskUpdated) => {
          if (err) {
            return res
              .status(500)
              .send({ status: "error", message: "Update Error" });
          }
          if (!taskUpdated) {
            return res
              .status(404)
              .send({ status: "error", message: "No Data" });
          }
          return res.status(200).send({ status: "success", task: taskUpdated });
        }
      );
    } else {
      // Devolver respuesta
      return res
        .status(200)
        .send({ status: "error", message: "Incorrect Data" });
    }
  },

  delete: async (req, res) => {
    // Obtener id
    var userId = req.params.id;
    var params = req.body;
    var user = await Task.findOne({ _id: userId });
    var index = params.indice;
    console.log( index );
    user.tareas.splice(index, 1);
    // Find and delete
    Task.findOneAndUpdate(
      { _id: userId },
      user,
      { new: true },
      (err, taskUpdated) => {
        if (err) {
          return res
            .status(500)
            .send({ status: "error", message: "Update Error" });
        }
        if (!taskUpdated) {
          return res.status(404).send({ status: "error", message: "No Data" });
        }
        return res.status(200).send({ status: "success", task: taskUpdated });
      }
    );
  },

  calendar: async (req, res) => {
    
    var userId = req.params.id;

    var user = await Task.findOne({ _id: userId });
    // Fecha a buscar

    var searchDate = req.params.date;

    // Find task
    var tareasUsuario = user.tareas;
    var tareasCalendar = [];

    for (let i = 0; i < tareasUsuario.length; i++) {
      if(tareasUsuario[i].date === searchDate){
        tareasCalendar.push(tareasUsuario[i]);
      }
    }
    if(tareasCalendar){
      return res.status(200).send({ status: "success", tareasCalendar });
    }else{
      return res.status(404).send({ status: "error" });
    }
  },

  searchTask: async (req, res) => {

    var userId = req.params.id;

    var user = await Task.findOne({ _id: userId });
    // String a buscar

    var searchString = req.params.search;

    // Find task
    var tareasUsuario = user.tareas;
    var tareasBusqueda = [];

    for (let i = 0; i < tareasUsuario.length; i++) {
      if(validator.contains(tareasUsuario[i].title, searchString)){
        tareasBusqueda.push(tareasUsuario[i]);
      }
    }
    if(tareasBusqueda){
      return res.status(200).send({ status: "success", tareasBusqueda });
    }else{
      return res.status(404).send({ status: "error" });
    }
  },

}; // end controller

module.exports = controller;
