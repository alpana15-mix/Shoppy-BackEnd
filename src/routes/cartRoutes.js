const router = require('express').Router();
const ctrl = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.get('/cart', auth, ctrl.getCart);
router.post('/cart', auth, ctrl.addToCart);
router.put('/cart/:id', auth, ctrl.updateCart);
router.delete('/cart/:id', auth, ctrl.removeFromCart);

module.exports = router;