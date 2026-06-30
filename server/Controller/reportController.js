const User = require("../Model/userModel");
const Meal = require("../Model/mealModel");
const Expense = require("../Model/expenseModel");
const Payment = require("../Model/paymentModel");

// -------------------- Monthly Report --------------------

exports.monthlyReport = async (req, res) => {

    try {

        const { month, year } = req.params;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        generateReport(startDate, endDate, month, year, res);

    }
     catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


//yearly

exports.yearlyReport = async (req, res) => {
    try {

        const { year } = req.params;
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        generateReport(startDate, endDate, "Year", year, res);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// report

async function generateReport(startDate, endDate, month, year, res) {

    try {

        const users = await User.find();

        const expenses = await Expense.find({
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalExpense = expenses.reduce((sum, item) => sum + item.amount,0);
        let grandTotalMeals = 0;

        const mealData = [];

        // -------- First Pass --------

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
            mealData.push({user,totalMeals});

        }

        const costPerMeal =grandTotalMeals > 0? totalExpense / grandTotalMeals: 0;


        const residentReport = [];
// second pass
        for (const item of mealData) {

            const payments = await Payment.find({

                userId: item.user._id,

                date: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            const paidAmount = payments.reduce((sum, p) => sum + p.amount,0);

            const amountToPay =item.totalMeals * costPerMeal;

            const balance =amountToPay - paidAmount;

            residentReport.push({resident: item.user.name,totalMeals: item.totalMeals,amountToPay,paidAmount,balance});
        }

        res.json({month,year,totalExpense,grandTotalMeals,costPerMeal,residentReport});

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}