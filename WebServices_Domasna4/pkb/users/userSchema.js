const mongoose = require("mongoose");
const validator = require("validator"); //proveruva dali email-ot e postoecki
const bcrypt = require("bcryptjs"); //sluzi za enkripcija na passwordot

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Imeto e zadolzitelno."],
    },
    email: {
        type: String,
        required: [true, "E-mail-ot e zadolzitelen."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Vnesete validen e-mail"],
    },
    role: {
        type: String,
        enum: ["user", "admin"], 
        default: "user",
    },
    password: {
        type: String,
        required: [true, "Password e zadolzitelen."],
        minlength: [8, "Passwordot mora da ima najmalku 8 karakteri."],
    }
});

//* Middlemare most pomegju delot koga gi dobivame podatocite i koga gi stavame vo databazata
//(hasira lozinka pred da se zacuva vo bazata na podatoci so cel bezbedno zacuvuvanje na korisnickite podatoci)
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;