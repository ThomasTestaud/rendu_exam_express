const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_database.js');


const Cart = sequelizeInstance.define('Cart', {
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
}, {});


module.exports = Cart;
