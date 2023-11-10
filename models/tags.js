const { DataTypes } = require('sequelize');
const sequelizeInstance = require('./_database.js');


const Tags = sequelizeInstance.define('Tags', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});


module.exports = Tags;
