const express = require("express");
const { registerUser, authUser, allUser } = require('../controllers/user');

const { protect } = require('../middleware/auth');
const router = express.Router();


// Register for new User
router.route('/').post(registerUser).get( protect, allUser);

// User Login
router.post('/login', authUser);

module.exports = router;