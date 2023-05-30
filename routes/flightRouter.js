const express = require("express");
const {flightModel} = require("../models/flightModel")

const flightRouter = express.Router();



flightRouter.post("/flights",async (req,res)=>{
    try {
        const data = req.body;
        const value = new flightModel(data);
        await value.save();
        res.status(201).send("user added the flight successfully")

    } catch (error) {
        res.status(404).send(error.message);

    }
})

flightRouter.get("/flights",async(req,res)=>{
    try {
        const data = await flightModel.find();
        res.status(200).send(data)

    } catch (error) {
        res.status(404).send(error.message);

    }
})

flightRouter.get("/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await flightModel.find({"_id":id});
        res.status(200).send(data)

    } catch (error) {
        res.status(404).send(error.message);

    }
})

flightRouter.patch("/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await flightModel.findByIdAndUpdate({"_id":id},req.body);
        res.status(204).send({"msg":"flight updated successfully"})

    } catch (error) {
        res.status(404).send(error.message);

    }
})

flightRouter.delete("/flights/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await flightModel.findByIdAndDelete({"_id":id});
        res.status(202).send("flight deleted successfully")

    } catch (error) {
        res.status(404).send(error.message);

    }
})

module.exports = {
    flightRouter
}