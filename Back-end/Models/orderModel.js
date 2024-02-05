const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [productSchema],
  orderDate: { type: Date, default: Date.now },
  totalOrderPrice: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
