const express = require("express");
const {connection} = require("./config/db")
const app = express();
require("dotenv").config();
const {userRouter} = require("./routes/userRouter")
const {bookingRouter} = require("./routes/bookingRouter")
const {flightRouter} = require("./routes/flightRouter")
const {auth} = require("./middleware/auth");

app.get("/",(req,res)=>{
    res.send("home")
})
app.use(express.json());
app.use("/user",userRouter);
app.use(auth);
app.use("/flight",flightRouter);
app.use("/booking",bookingRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("started");
    } catch (error) {
        console.log(error.message);
        
    }
   
})