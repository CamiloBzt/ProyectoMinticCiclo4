"use strict";

var validator = require("validator");
var Task = require("../models/task");

var controller = {
  test: (req, res) => {
    return res.status(200).send({ message: "Test Controller" });
  },
  save: (req, res) => {
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
      var task = new Task();

      // Asignar valores
      task.title = params.title;
      task.description = params.description;
      task.priority = null;

      // Guardar la tarea
      task.save((err, taskStored) => {

        if (err || !taskStored){
            return res.status(404).send({ status: 'error', message: 'Task Save' });
        }

      })

      // Devolver respuesta
      return res.status(200).send({ status: 'success', task });
    } else {
      return res.status(200).send({ status: "error", message: "Invalid Data" });
    }
  },

  getTasks: (req, res) => {
      // Find
      Task.find({}).sort('-_id').exec((err, tasks) => {
          if (err){
            return res.status(500).send({ status: "error", message: "Error" });
          }
          if (!tasks){
            return res.status(404).send({ status: "error", message: "No Data" });
          }
        return res.status(200).send({ status: "error", tasks });
      })
    
  }
};

module.exports = controller;
