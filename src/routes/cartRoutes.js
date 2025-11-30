//ROUTES FOR CART OPERATIONS
const router = require('express').Router();
const ctrl = require('../controllers/cartController');
const auth = require('../middlewares/auth');
//Get cart items of user
router.get('/cart', auth, ctrl.getCart);
// Add item to cart
router.post('/cart', auth, ctrl.addToCart);
//Update cart item
router.put('/cart/:id', auth, ctrl.updateCart);
//Remove cart item
router.delete('/cart/:id', auth, ctrl.removeFromCart);

module.exports = router;