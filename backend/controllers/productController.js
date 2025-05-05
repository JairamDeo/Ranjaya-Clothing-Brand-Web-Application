const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
};

exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
};
