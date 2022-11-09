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
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        cantidad: {
            type: Number
        }
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});

orderSchema.set("toJSON", {
    transform:(doc,returnObject) => {
        returnObject.id = returnObject._id
        delete returnObject._id
        delete returnObject.__v
    }
})

module.exports = mongoose.model('Order', orderSchema);