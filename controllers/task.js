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
      task.priority = params.priority;
      task.date = params.date;

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
      tarea.date = params.date;
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
}; // end controller

module.exports = controller;
