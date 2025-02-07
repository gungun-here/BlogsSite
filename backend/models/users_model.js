const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null }, // Make password optional for Google users
    displayName: { type: String, default: null }, // Store display name for Google users
    firtName: { type: String, default: null},
    lastName: { type: String, default: null},
    phnumber: { type: Number, default: null}
});

module.exports = mongoose.model("Users", usersSchema);
