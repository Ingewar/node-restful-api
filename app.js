const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

//morgan used for logging 
app.use(morgan('dev'));

//body parser get access to easy body parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested_With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
        return res.status(200).json({});
    }
    next();
});

//Routes that handle the requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

//Handling 404 error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//Handling 500 error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: error.message
    })
})

module.exports = app;