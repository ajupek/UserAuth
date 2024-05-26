const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const {registerUser, loginUser, protectedData} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', authMiddleware, protectedData);

module.exports = router;