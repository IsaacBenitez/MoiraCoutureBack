const express = require('express');
const productSchema = require('../Models/product');
const autorization = require('../Middlewares/autorization');

const route = express.Router();

//create users
route.post("/products", (req,res) => {
    const product = productSchema(req.body);
    product.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//get all products
route.get("/products", (req, res) => {
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//get a product
route.get("/products/:id", (req, res) => {
    const { id } = req.params;
    productSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//update product
route.put("/products/:id", autorization, (req, res) => {
    const { id } = req.params;
    const { tipo, sexo, talla, color, precio, stock, descripcion } = req.body;
    const { userRol } = req;

    if (userRol == 'admin') {
        productSchema
            .updateOne({ _id: id }, { $set: { tipo, sexo, talla, color, precio, stock, descripcion } })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    } else {
        res.status(401).json({ error:"You do not have the permissions to perform this action with the credentials provided."})
    }
    

});

//delete product
route.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    productSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

module.exports = route;