const User = require("../pkb/user/userSchema");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const token = jwt.sign(
            {id: newUser._id, name: newUser.name},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
        );

        res.status(201).json({
            status: "success",
            token,
                data: {
                    user: newUser,
                },
            });
    }
    catch(err){
        return res.status(500).send(err);
    }
}

exports.logIn = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).send("Please provide email and password!");
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("This user with this email doesn't exist!");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if(!isPasswordValid){
            return res.status(400).send("Invalid password.");
        }

        const token = jwt.sign(
            {id: user._id, name: user.name},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES});

        res.status(201).json({
            status: "success",
            token,
        });
    }
    catch(err){
        res.status(500).send("Internal server errror.");
    }
}