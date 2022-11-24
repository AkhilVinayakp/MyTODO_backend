/**
 * Database connection.
 * Date: 14/11/2022
 * ODM: Mongoose
 * Configs: .env
 */
const mongoose = require("mongoose");
const username = process.env.USERNAMEMONGO;
const password = process.env.PASSWORD;

exports.connect = () => {
    const connection = `mongodb+srv://${username}:${password}@cluster0.vmfngi2.mongodb.net/myTODO`;
    console.log("connection string ", connection)
    mongoose.connect(connection,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(()=>{
        console.log("connection to the DB established...");
    }).catch((err)=>{
        console.log("Can not connect to the database ? => ", err);
        process.exit(1);
        // TODO setting up the local database if the connection failed with 
    })
}
