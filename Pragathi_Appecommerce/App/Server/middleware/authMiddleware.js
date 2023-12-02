import Jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

// proteced routes token base

export const requireSignIn = async(req, res, next) => {

    try {
        const decode = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        return res
            .status(401)
            .send({success: false, message: "Error in token", error})
    }
}

//admin acceess
export const isAdmin = async(req, res, next) => {
    // console.log("hi");
    // console.log(req);
    try {
        const user = await userModel.findById(req.user._id); 
        if (user
            ?.role !== 1) {
            console.log("UnAuthorized Access");
            return res
                .status(401)
                .send({success: false, message: "UnAuthorized Access"});
        } else {
            next();
        }
    } catch (error) {

        console.log("Error in admin middelware");

        res
            .status(401)
            .send({success: false, error, message: "Error in admin middelware"});
    }
}