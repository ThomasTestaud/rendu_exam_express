var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const tagsRouter = require('./routes/tags');
const tag_productRouter = require('./routes/tag_product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const adminRouter = require('./routes/admin');
const mailRouter = require('./routes/mail');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/tag', tagsRouter);
app.use('/tag_product', tag_productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
app.use('/mail', mailRouter);

  
module.exports = app;