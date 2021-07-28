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

store : async (req,res,next) => {
    try {
      var params = req.body;
      const user = await Task.findOne({correo: req.body.correo})
      // console.log(user);
      if (user) {
        res.status(409).send({
          message: "Sorry the email is already use" + req.body.correo+
          " and there is a "  
                })}
      else{
          if (req.body.contraseña1 !== req.body.contraseña2){
            res.status(409).send({
              message: "Las contraseñas no coinciden"  
                    })
          }
          else{
                // const user = await task.save(req.body);
                let task = await new Task({
                  name: req.body.name,
                  correo: req.body.correo,
                  contraseña1 : req.body.contraseña1,
                  // contraseña2 : req.body.contraseña2,
                  pais : req.body.pais
              })
              
              task.save()
          
              .then(response => {
                  res.json({
                      message: 'Added Succesfully'
                  })
          
              })

            }
          }
          // task.save()
      // }
    } catch (error) {
      res.status(500).send({
        message: "Error --> " 
    })
    next(error);
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