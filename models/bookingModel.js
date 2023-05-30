const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    user : { type: "string", ref: 'user' },
    flight : { type: "string", ref: 'flight' }
})


const bookingModel = mongoose.model("booking", bookingSchema);



module.exports = {
    bookingModel
}