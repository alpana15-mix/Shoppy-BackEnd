//Routes For Product Operations
const router = require('express').Router();
const ctrl = require('../controllers/productController');

// Get all products
router.get('/products', ctrl.getProducts);
// Get single product by ID
router.get('/products/:id', ctrl.getProductById);

// optional: create product for testing
router.post('/products', ctrl.createProduct);

module.exports = router;