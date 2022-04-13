const mongoose = require("mongoose")
const laptopSchema = mongoose.Schema({
    laptop_brand: String,
    laptop_model: String,
    laptop_cost: Number
})
module.exports = mongoose.model("Laptop", laptopSchema)