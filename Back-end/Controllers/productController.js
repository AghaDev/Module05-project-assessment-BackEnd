const Product = require('../Models/productModel.js')

// Controller for handling product-related operations
const productController = {
  async getAllProducts(req, res){
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getProductById(req, res){
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async createProduct(req, res){
    const { imageURLs, title, price, description } = req.body;

    try {
      const newProduct = await Product.create({
        imageURLs,
        title,
        price,
        description,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateProduct(req, res){
    const productId = req.params.id;
    const { imageURLs, title, price, description } = req.body;

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          imageURLs,
          title,
          price,
          description,
          'timestamps.updated_at': Date.now(),
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

 async deleteProduct(req, res){
    const productId = req.params.id;

    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);

      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = productController;
