const router = require('express').Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
// Create a session store to store OTP values
const sessions = {};

// Middleware to validate email using regex
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Middleware to validate password using regex
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
};

// Generate a random 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "amanraj06042001@gmail.com",
        pass: "plpj avul lilh iufn",
    },
});

// Endpoint to send OTP
router.post("/sendOTP", async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!validateEmail(email)) {
        return res.status(400).json("Invalid email format");
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in session
    sessions[email] = otp;

    // Compose email options
    const mailOptions = {
        from: 'amanraj06042001@gmail.com',
        to: email,
        subject: 'Verification Code for Registration',
        text: `Your verification code is: ${otp}`,
    };

    // Send OTP via email
    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            // console.error(error);
            res.status(500).json('Error sending verification code');
        } else {
            // console.log('Verification code sent to your E-mail ');
            res.status(200).json("OTP sent successfully.");
        }
    });
});

// Endpoint to register user
router.post("/register", async (req, res) => {
    const { username, email, password, OTP } = req.body;
    const numericOTP = parseInt(OTP);
    // Validate email, password, and OTP
    if (!validateEmail(email)) {
        return res.status(400).json("Invalid email format");
    }

    if (!validatePassword(password)) {
        return res.status(400).json("Invalid password format. Password must contain at least one special character, one capital letter, and at least one numeric digit");
    }

    // Check if OTP is valid
    if (numericOTP !== sessions[email]) {
        return res.status(400).json("Invalid OTP");
    }

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

    // Save user to database
    const newUser = new User({
        username: username,
        email: email,
        password: encryptedPassword,
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json("User registered successfully.");
    } catch (err) {
        res.status(500).json(err);
    }
});
//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // Check if user exists
        if (!user) {
            return res.status(401).json("Invalid user");
        }

        // Decrypt the password and compare with the provided password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Invalid password");
        }

        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,

        },process.env.JWT_SEC,
        {expiresIn:"1d"}
        );
        // Password is correct, return user data
        const{password,...others}=user._doc;
        res.status(200).json({...others,accessToken});
    } catch (err) {
        res.status(500).json("Invalid user and password");
    }
});

module.exports = router;
