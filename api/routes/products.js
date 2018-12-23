const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
})

router.post('/', (req, res, next) => {
    const product = new Product({
        //TODO figure out issue with an id
        _id: mongoose.Schema.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result);
    }).
    catch(error => {
        console.log(error);
    });
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    });
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Updated product',
        id: id
    });
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Deleted product',
        id: id
    });
})

module.exports = router;