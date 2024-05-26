const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();
const jwtSecret = process.env.JWT_SECRET; // Use a secure, unique secret and store it in environment variables
const jwtExpire = '1h'; // Token expiry time

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide both username and password' });
    }
    if (password.length < 8) {
        return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ username, password: hashedPassword });
        await user.save();

        return res.status(201).json({msg: 'User registrated'});
    } catch (err) {
        // Handle errors
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please provide both username and password' });
    }

    try {
        let user = await User.findOne({username});
        console.log(user);
        if (!user) return res.status(400).json({msg: "User with this username doesn't exist"});
        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Generate JWT
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });

        // Send token to client
        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
}

exports.protectedData = async (req, res) => {
    const user = req.user;
    return res.status(200).json({msg: 'Gratz, you are in!', user});
}
