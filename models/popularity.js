const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_database.js');


const Popularity = sequelizeInstance.define('Popularity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    boughtAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    seenAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {});


module.exports = Popularity;
