const jwt = require("jsonwebtoken");
require("dotenv").config();


const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if (token) {
            var decoded = jwt.verify(token, process.env.KEY);
            if(decoded){
                next()
            }else{
                res.send("you have to login again")
            }
        }else{
            res.send("there is no token")
        }
    } catch (error) {
        res.send("you have to login again")

    }
}
module.exports = {
    auth
}