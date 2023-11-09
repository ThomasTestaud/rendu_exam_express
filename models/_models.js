const sequelizeInstance = require('./__sequelize.js');
const User = require('./user.js');

//Relations

//Sync
sequelizeInstance.sync(/*{alter: true}*/);

module.exports = {
    User,
};
