const express = require('express');
const {
  getInventory,
  updateStock,
  getLowStockAlerts
} = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getInventory);
router.put('/update-stock', authMiddleware, updateStock);
router.get('/low-stock-alerts', authMiddleware, getLowStockAlerts);

module.exports = router;
