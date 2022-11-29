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
const todoRouters = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();
// adding swagger
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/docs/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(cors());
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
app.use("/api", todoRouters)




module.exports = app;