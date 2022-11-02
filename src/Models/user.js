const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true  
    },
    birthDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: [String],
        require:true
    },
    cedula: {
        type: String,
        require: true,
        unique: true
    }
    
});

module.exports = mongoose.model('User', userSchema);