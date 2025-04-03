'use strict'

const express = require('express');
const categoriasController = require('../controllers/categoriasController');
const apiRoutes = express.Router();

apiRoutes.get('/getAllCategories', async (req, res) => await categoriasController.getCategorias(req, res))
    .post('/insertCategory', async (req, res) => await categoriasController.insertCategories(req, res));

module.exports = apiRoutes;