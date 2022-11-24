/**  
 * Handler function for user registration
 * -> Handles POST http method
 * -> Async
 * -> Password encryption.
 * -> Sending data to the database if all validation are ok
 * -> JWT token generation
 */

 const User = require("../model/user");
 const validateEmail = require("../config/validate");
 const bcrypt = require("bcryptjs");
 const JWT = require("jsonwebtoken");
 const {SECRET, LIFESPAN} = process.env;

module.exports = async(req, res)=>{
    try {
            // getting all the data
    const {name, email, password} = req.body;
    // only go further if all fields are present
    if(!(name, email, password)){
        return res.status(400).send("All fields are required");
    }
    // check the database for existence of the given email
    const isExist = await User.findOne({email});
    if(isExist){
        console.log("user already exists");
        res.status(409).json({'error':"User already exists"});
        return;
    }
    // validation on email field.
    if(!(validateEmail(email))){
        console.log("data validatin failed");
        res.status(400).json({
            "error": "Fields validation failed",
            'info': 'email not valid'
        });
        return;
    }
    // encrypt password async oparation
    const encPassword = await bcrypt.hash(password, 9);

    // adding the data to the collection
    const user = await User.create({
        name,
        email,
        password: encPassword
    });
    // now signing a token sending back.
    const token = JWT.sign({
        id: user._id,
        email
    }, SECRET,{expiresIn: LIFESPAN});
    // attaching the token with the user object
    user.token = token;
    user.password =  undefined;
    // sending the 201 res
    res.status(201).json(user);
    } catch (error) {
        console.log("Error in processing the data", error);
        // res.status(500).send("Something went wrong");
        // push the alert into message queue if required.
        res.status(500).json({
            'error': error,
        })
    }
}

 