'use strict'

var mongoose = require('mongoose')
var app = require('./app');
var port = 4000


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodxb+srv://mongo:mongo@cluster0.tvfqe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true,
useUnifiedTopology: true
})
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
