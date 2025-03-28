'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        idCategoria: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombreCategoria: {
            type: DataTypes.STRING(45)
        },
    };
    const options = {};
    return sequelize.define('categoria', attributes, options);
};