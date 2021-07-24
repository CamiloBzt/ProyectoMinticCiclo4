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
        return res.status(200).send({ status: "success", tasks });
      })
    
  },
  edit: (req, res) => {
    // Obtener id de la tarea
    var taskId = req.params.id;

    // Obtener los datos que llegan por PUT
    var params = req.body;

    // Validar datos
    try{
      var validate_title = !validator.isEmpty(params.title);
      var validate_description = !validator.isEmpty(params.description);
    }catch(err){
      return res.status(200).send({ status: "error", message: "Incorrect Data" });  
    }

    if (validate_title && validate_description){
      // Find and Update
      Task.findOneAndUpdate({_id: taskId}, params, {new:true}, (err, taskUpdated) => {
        if(err){
          return res.status(500).send({ status: "error", message: "Update Error" });  
        }
        if (!taskUpdated){
          return res.status(404).send({ status: "error", message: "No Data" });  
        }
        return res.status(200).send({ status: "success", task: taskUpdated });  
      })
    }else{
      // Devolver respuesta
      return res.status(200).send({ status: "error", message: "Incorrect Data" });  
    }
  },

  delete: (req, res) => {
    // Obtener id
    var taskId = req.params.id;

    // Find and delete
    Task.findOneAndDelete({_id: taskId}, (err, taskRemoved) => {
      if (err){
        return res.status(500).send({ status: "error", message: "Remove Error" });  
      }
      if (!taskRemoved){
        return res.status(404).send({ status: "error", message: "No Data" });
      }
      return res.status(200).send({ status: "success", task: taskRemoved});
    });
  }

}; // end controller

module.exports = controller;