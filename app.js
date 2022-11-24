/**
 *   
 */
// 
require("dotenv").config();
require("./config/db").connect();
// const model = require("./model/user");
const express = require("express");
const registerUser = require("./controller/registerUser")
const loginUser = require("./controller/loginUser");
const auth = require("./middleware/userAuth");
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json());
// using url encoded middleware
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.status(200).json({
        'status': "success."
    });
});

app.post("/register", registerUser);
app.post("/login", loginUser);




module.exports = app;