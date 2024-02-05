const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController.js');

router.post('/orders', orderController.createOrder);

router.get('/orders/:userID', orderController.getOrdersByUser);

// router.put('/orders/:orderID', orderController.updateOrder);

// router.delete('/orders/:orderID', orderController.deleteOrder);

module.exports = router;
