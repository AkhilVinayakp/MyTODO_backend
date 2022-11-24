/**  
 * schema for user model
 */

const mongoose = require("mongoose");
const validateEmail = require("../config/validate")

const userSchema = new mongoose.Schema({
    /**
     * email and password  role
     * 
     */

    email:{
        type: String,
        unique: true,
        required: [true, "email is not provided"],
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid phone number!`
          }
    },
    password:{
        type: String,
        minLength: 7,
    },
    name: {
        type: String,
        minLength: [3, "name should have  atleast 3 letters"],
        maxLength: [25, "Try to give a shorter user name"],
        required: [true, 'Name required'],
    },
    role: {
        type: String,
        default: "user",
    },
    
})
module.exports = mongoose.model("user", userSchema)