const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Orders were fetched!'
    });
})

router.post('/', (req, res) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity 
    }
    res.status(201).json({
        message: 'Order was created!',
        createdOrder: order
    });
})

router.get('/:orderId', (req, res) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Order details',
        orderID: id
    });
})

router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Order deleted',
        orderID: id
    });
})

module.exports = router;