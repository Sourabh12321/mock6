const express = require("express");

const {bookingModel} = require("../models/bookingModel");
const {flightModel} = require("../models/flightModel");
const {userModel} = require("../models/userModel")
const bookingRouter = express.Router();


bookingRouter.post("/booking",async (req,res)=>{
    try {
        const data = req.body;
        const value = new bookingModel(data);
        await value.save();
        res.status(201).send("user book the flight successfully")

    } catch (error) {
        res.status(404).send(error.message);

    }
})

bookingRouter.get("/dashboard",async(req,res)=>{
    try {
        let data = await bookingModel.find();
        let arr =[];
        for(let i=0;i<data.length;i++){
            let obj = {};
            let user = await userModel.findOne({"_id":data[i].user});
            let flight = await flightModel.findOne({"_id":data[i].flight});
            console.log(user);
            obj._id = data[i]._id;
            obj.user = user;
            obj.flight = flight;
            
            arr.push(obj);
        }
        console.log(arr);
        res.status(200).send(arr);

    } catch (error) {
        res.status(404).send(error.message);
        
    }
})

module.exports = {
    bookingRouter
}