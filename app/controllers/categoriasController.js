
const db = require('../config/db');
const Categories = db.categories;

function insertCategories(req, res) {
    console.log(req.body)
    Categories.create({
        idCategoria: req.body['categoryId'],
        nombreCategoria: req.body['nombre'],
        createdAt: new Date(),
        updatedAt: new Date()
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

async function getCategorias(req, res) {
    Categories.findAll()
        .then(data => {
            if (!data) { res.status(404).send({ message: 'No se encontraron categorias' }) }
            else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sucedio un error al obtener los registros del usuario"
            })
        })
}

module.exports = { getCategorias, insertCategories }