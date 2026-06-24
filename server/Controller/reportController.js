
const User = require("../Model/userModel");
const Meal = require("../Model/mealModel");
const Expense = require("../Model/expenseModel");

exports.monthlyReport = async (req, res) => {

    try {

        const { month, year } = req.params;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const users = await User.find();

        const expenses = await Expense.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalExpense = expenses.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        let grandTotalMeals = 0;

        const residentReport = [];

        for (const user of users) {

            const meals = await Meal.find({
                userId: user._id,
                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            let totalMeals = 0;

            meals.forEach(meal => {
                totalMeals +=
                    meal.breakfast +
                    meal.lunch +
                    meal.dinner;
            });

            grandTotalMeals += totalMeals;

            residentReport.push({
                resident: user.name,
                totalMeals
            });
        }

        const costPerMeal =
            grandTotalMeals > 0
                ? totalExpense / grandTotalMeals
                : 0;

        res.json({
            month,
            year,
            totalExpense,
            grandTotalMeals,
            costPerMeal,
            residentReport
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};