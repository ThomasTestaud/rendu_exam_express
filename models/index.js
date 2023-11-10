const sequelizeInstance = require('./_database.js');
const User = require('./user.js');
const Product = require('./product.js');
const Tags = require('./tags.js');
const Cart = require('./cart.js');
const Order = require('./order.js');
const Details = require('./orderDetails.js');

//Relations
Product.belongsToMany(Tags, {through: 'ProductTags'});
Tags.belongsToMany(Product, {through: 'ProductTags'});

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.belongsTo(Product);
Product.hasOne(Cart);

Order.belongsTo(User);
Order.hasMany(Details);

Details.belongsTo(Order);
Details.belongsTo(Product);

//Sync
sequelizeInstance.sync({alter: true});

module.exports = {
    User,
    Product,
    Tags,
    Cart,
    Order,
    Details,
};
