const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_database.js');


const Order = sequelizeInstance.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {});


module.exports = Order;
