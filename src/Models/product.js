const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    categoria: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    imagenes: [{ type: String }]

});

productSchema.set('toJSON', {
    transform: (doc,returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Product', productSchema);