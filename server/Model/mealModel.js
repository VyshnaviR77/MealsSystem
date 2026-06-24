// models/Meal.js

const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    breakfast: {
        type: Number,
        default: 0
    },

    lunch: {
        type: Number,
        default: 0
    },

    dinner: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Meal", mealSchema);