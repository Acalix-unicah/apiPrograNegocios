const express = require('express');
const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: false }));

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoriaRoutes');

App.use('/api/categorias', categoryRoutes);
App.use('/api/users', userRoutes);

module.exports = App;