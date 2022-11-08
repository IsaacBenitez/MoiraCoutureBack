const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    estado: {
        type: String,
        required: true
    },
    fechaOrden: {
        type: Date,
        required: true
    },
    fechaEnvio: {
        type: Date,
        required: false
    },
    subtotal: {
        type: Number,
        Required: true
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Order', orderSchema);