const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose"); 

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null }, // Make password optional for Google users
    firstName: { type: String, default: null},
    lastName: { type: String, default: null},
    phnumber: { type: Number, default: null},
    profilepic: { type: String, default: null},
    about: { type: String, default: null},
});

module.exports = mongoose.model("Users", usersSchema);
