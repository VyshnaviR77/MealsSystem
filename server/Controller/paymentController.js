const Payment = require("../Model/paymentModel");


exports.addPayment = async (req, res) => {

    console.log("inside addPayment");

    try {

        const payment = await Payment.create(req.body);

        res.status(201).json(payment);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// Get All Payments

exports.getPayments = async (req, res) => {

    console.log("inside getPayments");

    try {

        const payments = await Payment.find().populate("userId");

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};