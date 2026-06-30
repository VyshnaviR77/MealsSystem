const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Payment", paymentSchema);