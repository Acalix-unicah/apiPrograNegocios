'use strict'

const express = require('express');
const userController = require('../controllers/userController');
const apiRoutes = express.Router();

apiRoutes.post('/signUp', async (req, res) => await userController.signUp(req, res))
    .post('/login', async (req, res) => await userController.signIn(req, res));

module.exports = apiRoutes;