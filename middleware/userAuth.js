/**  
 * User authentication.
 * verify the token inside the req cookies || bearer token
 */
const JWT = require("jsonwebtoken");
const {SECRET} = process.env;

module.exports = (req, res, next)=>{
    let {token} = req.cookies;
    if(!token){
        // check for the token in the headers
        token = req.header("Authorization");
        console.log("token in header", token)
        if(token){
            token = token.replace("Bearer ","")
        }
    }
    if(!token){
        res.status(401).json({
            error: "Not authorized to access"
        });
        return
    }
    try {
        // decode the token
        console.log("token got ", token);
        const decoded = JWT.verify(token, SECRET);
        req.user = decoded;
    } catch (error) {
        res.status(403).json({
            error: "Token not varified",
            "info": error
        });
        return
    }
    return next();
}