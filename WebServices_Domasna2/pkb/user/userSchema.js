const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require ("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    email: {
        type: String,
        reqired: [true, "E-mail is required."],
        unique: true, 
        lowercase: true, 
        validate: [validator.isEmail, "Please provide a valid email."] 
    },
    role: {
        type: String,
        enum: ["user", "admin", "administaror"],
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [4, "Password must be at least 8 characters long"],
    }
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;