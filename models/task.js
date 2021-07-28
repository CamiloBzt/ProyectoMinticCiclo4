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
    tarea:{

        title: String,
        description: String,
        date: {
            type: Date, default: Date.now
        },
        priority: Number
    }
});

module.exports = mongoose.model('Task', TaskSchema);
