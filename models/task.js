'use strict'

var mongoose = require('mongoose') ;
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    title: String,
    description: String,
    date: {
        type: Date, default: Date.now
    },
    priority: Number
});

module.exports = mongoose.model('Task', TaskSchema);
