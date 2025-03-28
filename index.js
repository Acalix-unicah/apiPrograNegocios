'use strict'

require('dotenv').config();
const db = require('./app/config/db');
const App = require('./app/app');

const PORT = process.env.PORT || process.env.APP_PORT;

db.sequelizeInstance.sync()
    .then(() => {
        console.info(`DB Synced`)
        App.listen(parseInt(PORT), function (error) {
            if (error) return console.log(error);
            console.info(`el servidor se está ejecutando en el puerto ${PORT}`)
        })
    })
    .catch(error => {
        console.error("Fallo la sincronizacion", error);
    });