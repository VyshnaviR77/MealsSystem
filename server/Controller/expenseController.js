
const Expense = require("../Model/expenseModel");

exports.addExpense = async (req, res) => {
    console.log("inside AddExpense");

    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    console.log("inside getExpenses");

    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.monthlyExpenseSummary = async (req, res) => {
    console.log("inside monthlyExpenseSummary");
    try {

        const { month, year } = req.params;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const expenses = await Expense.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalExpense = expenses.reduce(
            (sum, exp) => sum + exp.amount, 0);

        res.json({ totalExpense });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};