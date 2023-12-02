import userModel from "../Models/userModel.js";
import {comparePassword, hashPassword} from "../helpers/authHelper.js";
import jwt from "jsonwebtoken"; 

export const registerController = async(req, res) => {
   
    try {

        const {name, email, password, phone, address} = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.send({message: "kindly fill all the fields properly.",success:false})
        }

        // checking existing user
        const ExistingUser = await userModel.findOne({email: email, phone: phone});
        if (ExistingUser) {
            return res
                .status(200)
                .send({message: "Already registered.", success: false})
        }

        //register new user
        const hashedPassword = await hashPassword(password);
        const newUser = await new userModel({name, email, address, phone, password: hashedPassword}).save();
        return res
            .status(201)
            .send({message: "user registered succesfully.", success: true, newUser})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({message: "error in registration", success: false, e})
    }

}

export const loginController = async(req, res) => {
    try {

        const {email, password} = req.body;
        if (!password || !email) {
            return res.send({message: "invalid email or password.",success:false})
        }
        //checking for user
        const user = await userModel.findOne({email});
        if (!user) {
            return res
                .status(404)
                .send({success: false, message: "Email is not registered."})
        }
        const match = comparePassword(password, user.password);
        console.log(`user details  ${user}`);
        if (!match) {
            return res
                .status(200)
                .send({success: false, message: "Invalid password."})
        }

        //token
        const token = await jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "10d"});

       return   res
            .status(200)
            .send({success: true, message: "login succesfully", 
            user,
            token})

    } catch (error) {
        // console.log(error)
        return res
            .status(500)
            .send({message: "error in login", success: false, error})

    }

}


export const testController = (req,res)=>{
res.send("protected route")
}

//updateUserController 

export const updateUserController = async(req, res) => {
   
    try {

        const {name, email, password, phone, address} = req.body;
       

        // checking existing user
        const user = await userModel.findById(req.user._id);
        // if (ExistingUser) {
        //     return res
        //         .status(200)
        //         .send({message: "Already registered.", success: false})
        // }
        if(password && password.length < 6){
            return res.json({errror : "password iss required and 6 char long"})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updateUser = await  userModel.findByIdAndUpdate(req.user._id,{
                name : name || user.name,
                password : hashedPassword || user.password,
                phone : phone || user.phone,
                address : address || user.address
        }, {new : true})
 
        return res
            .status(200)
            .send({message: "user pupddated succesfully.", success: true, updateUser})
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .send({message: "error while updating", success: false, e})
    }

}