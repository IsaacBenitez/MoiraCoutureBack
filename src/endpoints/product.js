const express = require('express');
const productSchema = require('../Models/product');

const route = express.Router();

//create users
route.post("/products", (req,res) => {
    const product = productSchema(req.body);
    product.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//get all users
route.get("/products", (req, res) => {
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//get a user
route.get("/products/:id", (req, res) => {
    const { id } = req.params;
    productSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//update user
route.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { tipo, sexo, talla, color, precio, stock, descripcion } = req.body;
    productSchema
        .updateOne({_id:id},{$set:{tipo, sexo, talla, color, precio, stock, descripcion}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//delete user
route.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    productSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

module.exports = route;