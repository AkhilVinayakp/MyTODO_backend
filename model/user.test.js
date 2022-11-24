const mongoose = require("mongoose");
const model = require("./user");
// const model = mongoose.model("user", schema);
const user = new model();

beforeAll(()=>{
    user.email = "test@123",
    user.password = '1453w';
})

describe("Testing the model validations",()=>{
    // test 1
    test("testing without database connection", ()=>{
        let error = user.validateSync();
        console.log(error)
    })
})