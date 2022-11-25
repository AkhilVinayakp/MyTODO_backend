/**
 * TODO:
 * unit testing for TODO controllers  
 * Connection to local DB for testing.
 */
const { todoes } = require("./todoControllers");
const loginUser = require("./loginUser");
require("../config/localDB").localConnect();

// * Test error.

// it("LoginUser_success", async()=>{
//     const req = {
//         body:{
//             email: "delta1@mc.ai",
//             password: "dager1"
//         }
//     }
//     const resp = {
//         status: jest.fn((x)=>({
//             send: jest.fn((x)=>x)
//         }))
//     }
//     const out = await loginUser(req, resp);
// })