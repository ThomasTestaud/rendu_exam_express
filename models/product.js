const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_database.js');


const Product = sequelizeInstance.define('Product', {
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seenAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    boughtAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    
});


module.exports = Product;
