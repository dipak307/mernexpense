const ExpenseSchema = require("../models/expenseModel");

module.exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: "All Fields are required" });
    }

   

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user: req.user.id,
    });

    try {
        await expense.save();
        res.status(200).json({ message: "Expense Added" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
