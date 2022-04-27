const mongoose = require("mongoose")
const laptopSchema = mongoose.Schema({
    laptop_brand: { 
        type: String,
        minLength: 3,
        maxLength: 20, 
        required: true,
        trim: true
    },
    laptop_model: { 
        type: String, 
        required: true
    },
    laptop_cost:{ 
        type: Number, 
        min:[100, 'Minimum of 100$ but, got {VALUE}'], 
        max:20000
    }
})
module.exports = mongoose.model("Laptop", laptopSchema)