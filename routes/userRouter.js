const express = require("express");
const { userModel } = require("../models/userModel")
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const data = await userModel.findOne({ "email": email });
        if (data) {
            res.status(404).send("user is already registered")
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (hash) {
                    const value = new userModel({name,email,password:hash});
                    await value.save();
                    res.status(201).send("user is register successfully")

                }else{
                    res.status(404).send(err.message);

                }

            })

        }

    } catch (error) {
        res.status(404).send(error.message);


    }
})


userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userModel.findOne({ "email": email });
        if (data) {
            let decode =await bcrypt.compare(password,data.password);
            if(decode){
                let token  = jwt.sign({email:data.email},process.env.KEY,{expiresIn:"1h"});
                res.status(201).send({msg:"login successfully",token});
            }else{
                res.status(404).send("wrong password");
            }
        } else {
            res.status(404).send("user is not registered")
        }

    } catch (error) {
        res.status(404).send(error.message);


    }
})


module.exports = {
    userRouter
}