'use strict'

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const attributes = {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        pass: {
            type: DataTypes.STRING(45)
        },
    };
    const options = {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        tableName: 'usuario',
        timestamps: 'false'
    };
    return sequelize.define('users', attributes, options);
};