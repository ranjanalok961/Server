const JWT = require('jsonwebtoken')
const { hashPassword, comparePassword } = require("../helper/authHelper");
const userModel = require("../models/userModel");

const registerController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body

        if (!name) {
            return res.status(400).send({
                success: false,
                message: "name is required",
            });
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "email is required",
            });
        }
        if (!phone) {
            return res.status(400).send({
                success: false,
                message: "phone number is required",
            });
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: "password is required and 6 character long",
            });
        }
        //exisiting user
        const exisitingUser = await userModel.findOne({ email })
        if (exisitingUser) {
            return res.status(500).send({
                success: false,
                message: "User Already Register With This EMail",
            });
        }
        //hash Password
        const hashpassword = await hashPassword(password);

        //save user
        const user = await userModel({ name, email, password: hashpassword }).save()

        return res.status(201).send({
            success: true,
            message: "Registeration Successfull please login",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};

const loginCOntroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email Or Password",
            });
        }
        // find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found",
            });
        }
        //matchpassowrd
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                sucess: false,
                message: "Invalid username or Password"
            })
        }
        //Tocken JWT
        //TOKEN JWT
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        //undefined password 
        user.password = undefined
        res.status(200).send({
            success: true,
            message: "login successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
}

module.exports = { registerController, loginCOntroller };