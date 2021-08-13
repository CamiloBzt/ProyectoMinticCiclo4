'use strict'

var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name:{
        type:String
    },
    correo:{
        type:String
    }, contraseña1:{
        type:String
    },contraseña2:{
        type:String
    },
    pais:{
        type:String
    },
    tareas:[],
    
    image: String
    
});

module.exports = mongoose.model('Task', TaskSchema);
