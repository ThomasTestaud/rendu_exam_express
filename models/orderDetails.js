const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_database.js');


const Details = sequelizeInstance.define('Details', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    pricePerArticle: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {});


module.exports = Details;
