const IncomeSchema = require("../models/incomeModel");
const userData = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Add Income
module.exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        user: req.user.id,  // Ensure req.user is populated
    });

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

       

        await income.save();
        res.status(200).json({ message: "Income added" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
    console.log(income);
};

// Get Incomes
module.exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Income
module.exports.deleteIncomes = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: "Income deleted" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error" });
        });
};

// Register User
module.exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userData.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.log("Error occurred in register", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login User
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userData.findOne({ email });

        if (!user) {
            res.status(404).send("User not found. Please register first.");
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Create JWT Token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Set token in cookie
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).send("Invalid credentials.");
        }
    } catch (err) {
        console.log("Error occurred in login:", err);
        res.status(500).send("An error occurred while trying to log in.");
    }
};
