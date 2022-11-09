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
    adrress: {
        departamento: {
            type: String,
            default: null
        },
        ciudad: {
            type: String,
            default: null
        },
        barrio: {
            type: String,
            default: null
        },
        direccion: {
            type: String,
            default: null
        },
        referencia: {
            type: String,
            default: null
        }
    },
    cellphone: {
        type: String,
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