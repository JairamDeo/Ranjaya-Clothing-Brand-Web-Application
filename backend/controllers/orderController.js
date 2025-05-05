const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
    const { products, amount } = req.body;
    const userId = req.user.id;

    const newOrder = new Order({ userId, products, amount });
    await newOrder.save();

    res.status(201).json(newOrder);
};

exports.getMyOrders = async (req, res) => {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.json(orders);
};

exports.getAllOrders = async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });
    const orders = await Order.find().populate('products.productId userId');
    res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
};
