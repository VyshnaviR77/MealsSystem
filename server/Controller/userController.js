const User = require('../Model/userModel')


// get al  users
exports.getUsers = async (req, res) => {
    console.log("inside getallusers");

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// add new user

exports.addUser = async (req, res) => {
    console.log("inside adduser");

    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getidUser = async (req, res) => {
    console.log("inside getidUser");


    try {
        const { id } = req.params;

        const user = await User.findById(id);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    console.log("inside updateuser");

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    console.log("inside deleteuser");

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
