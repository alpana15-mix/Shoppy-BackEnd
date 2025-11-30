const router = require('express').Router();
const ctrl = require('../controllers/productController');

router.get('/products', ctrl.getProducts);
router.get('/products/:id', ctrl.getProductById);

// optional: create product for testing
router.post('/products', ctrl.createProduct);

module.exports = router;