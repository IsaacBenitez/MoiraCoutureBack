const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    tipo: {
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
    }

});

module.exports = mongoose.model('Product', productSchema);