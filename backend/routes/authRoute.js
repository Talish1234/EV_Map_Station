const { signup, login, logout } = require('../controllers/authcontroller');
const authMiddleware = require('../middleware/authmiddleware');

const router = require('express').Router();

router.post('/signup',signup);
router.post('/login', login); 
router.post('/logout', authMiddleware, logout);

module.exports = router;