'use strict'

var mongoose = require('mongoose')
var app = require('./app');
var port = 4000


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_control_task', { useNewUrlParser: true })
        .then(() => {
            console.log('Conexión a la DB exitosa');

            // Crear servidor
            app.listen(port, () => {
                console.log('Servidor corriendo en http://localhost:'+port)
            })

        })
        .catch((err) => {
            console.log(err);
        });
