'use strict'

const db = require('../config/db');
const User = db.users;
const bcrypt = require('bcrypt');
const service = require('../services/services');
const { Op } = require('sequelize');

async function signUp(req, res) {
    let newPass = undefined;

    await bcrypt.genSalt(10)
        .then(async salts => {
            await bcrypt.hash(req.body['password'], salts)
                .then(hash => newPass = hash)
                .catch(error => console.error(error))
        })
        .catch(error => console.error(error));

    User.create({
        userId: req.body['usuario'],
        pass: newPass,
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedio un error inesperado'
            });
        });
}

async function signIn(req, res) {
    const userId = req.body['usuario'];
    var condition = userId ? { userId: { [Op.eq]: `${userId}` } } : null;
    User.findOne({ where: condition })
        .then(data => {
            if (!data) { res.status(404).send({ message: 'Usuario no encontrado' }) }
            else {
                const result = bcrypt.compareSync(req.body['password'], data['pass'], function (err, result) {
                    if (err) console.error(err)
                    return result
                });
                if (result) {
                    res.status(200).send({
                        message: 'Logged in',
                        userId: data['userId'],
                        token: service.createToken(data['userId']),
                    });
                } else {
                    res.status(500).send({
                        message: 'Sucedio un error inesperado',
                    });
                }
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sucedio un error al obtener los registros del usuario"
            })
        })
}

module.exports = { signUp, signIn }