const Meal=require('../Model/mealModel')

exports.addMeal = async (req, res) => {
    try {
        const meal = await Meal.create(req.body);
        res.status(201).json(meal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMeals = async (req, res) => {
    try {
        const meals = await Meal.find().populate("userId");
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMonthlyMeals = async (req, res) => {
    try {

        const { userId, month, year } = req.params;

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const meals = await Meal.find({
            userId,
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

        res.json({
            totalMeals
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};