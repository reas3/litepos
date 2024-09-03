// models/Inventory.js
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variation: {
    color: String,
    size: String,
  },
  stock: { type: Number, default: 0 },
  reorderPoint: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);
