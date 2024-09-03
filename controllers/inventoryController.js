const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

// Get inventory for all products
exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product', ['name']);
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update stock levels
exports.updateStock = async (req, res) => {
  const { productId, variationId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    const variation = product.variations.find(v => v._id.toString() === variationId);
    if (variation) {
      variation.stock += quantity;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get low stock alerts
exports.getLowStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({
      variations: { $elemMatch: { stock: { $lte: 10 } } }
    });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
