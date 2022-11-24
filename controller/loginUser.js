/**
 *      validate the given fields
 *      find the user corresponding to the email in the database
 *      Compare the password
 *      if succeeded create token and cookie and send 200
 */

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../model/user");
const {SECRET, LIFESPAN} = process.env;

module.exports = async(req, res)=>{
    try {
            // 
        const {email, password} = req.body;
        if(!(email && password)){
            res.status(400).send("required fields are missing ");
        }
        // getting the user with the same email
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                "error":"user not found."
            });

        }
        if(user && await bcrypt.compare(password, user.password)){
            // user validated
            // create token and cookie
            const token = JWT.sign({
                id: user._id,
                email
            }, SECRET, {expiresIn: LIFESPAN});
            user.token = token;
            user.password = undefined;
            const cookieOptions = {
                httpOnly:true,
                expires: new Date(Date.now()+  3 * 24 * 60 * 60 * 1000)
            }
            res.status(201).cookie("token", token, cookieOptions).json({
                user,
                token
            })
        }
    } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).json({
            "error": "internal server error",
            "info": error
        })
    }

}