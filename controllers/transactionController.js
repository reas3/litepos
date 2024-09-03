const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

// Add a new transaction (sale)
exports.addTransaction = async (req, res) => {
  const { products, totalAmount, paymentMethod, customerInfo } = req.body;

  try {
    // Create the transaction record
    let transaction = new Transaction({
      products,
      totalAmount,
      paymentMethod,
      customerInfo,
      user: req.user.id
    });

    await transaction.save();

    // Update inventory levels
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i].productId);
      const variation = product.variations.find(v => v._id.toString() === products[i].variationId);
      if (variation) {
        variation.stock -= products[i].quantity;
      }
      await product.save();
    }

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', ['name']);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('user', ['name']);
    if (!transaction) {
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
