// models/Product.js
const mongoose = require('mongoose');

const VariationSchema = new mongoose.Schema({
  color: String,
  size: String,
  stock: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  variations: [VariationSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
