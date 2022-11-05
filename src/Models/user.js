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
        index: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: "cliente",
        required:true
    },
    cedula: {
        type: String,
        required: false,
        default: null
    }
    
});

userSchema.set('toJSON', {
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
        delete returnObject.password
        delete returnObject.rol
    }
})

module.exports = mongoose.model('User', userSchema);