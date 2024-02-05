const Order = require('../Models/orderModel.js');
const User = require('../Models/userModel.js');
const Product = require('../Models/productModel.js');

const orderController = {

  async createOrder(req, res) {
    try {
      const { userID, products } = req.body;

      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      for (const product of products) {
        const existingProduct = await Product.findById(product.product);
        if (!existingProduct) {
          return res.status(404).json({ message: `Product with ID ${product.product} not found` });
        }
      }

      const newOrder = new Order({
        user: userID,
        products: products,
        totalOrderPrice: this.calculateTotalOrderPrice(products) // Fixed reference to the method
      });

      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getOrdersByUser(req, res) {
    try {
      const userID = req.params.userID;

      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const orders = await Order.find({ user: userID }).populate('products.product', 'title description');

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  

  calculateTotalOrderPrice(products) {
    return products.reduce((total, product) => total + product.totalPrice, 0);
  },
};

module.exports = orderController;
