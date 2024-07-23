const express = require('express');
const router = express.Router();
const authenticateToken = require("../middleware/middleware"); // Ensure correct middleware import
const { addIncome, getIncomes, deleteIncomes,login,register,getName } = require("../controllers/income");
const { addExpense, getExpense, deleteExpense } = require("../controllers/expense");


// Income routes
router.post('/add-income', authenticateToken, addIncome);
router.get('/get-incomes',authenticateToken,  getIncomes);
router.delete('/delete-income/:id',authenticateToken, deleteIncomes);

// Expense routes
router.post('/add-expense',authenticateToken, addExpense);
router.get('/get-expenses',authenticateToken,  getExpense);
router.delete('/delete-expense/:id',authenticateToken,  deleteExpense);
router.post("/login",login);
router.post("/register",register);

router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: "User profile",
        user: {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username
        }
    });
});


module.exports = router;





