/**
 * connnecting to local db for testing
 *   
 */
const mongoose = require("mongoose");
exports.localConnect = () => {
    const connection = `mongodb://localhost:27017/myTODO`;
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