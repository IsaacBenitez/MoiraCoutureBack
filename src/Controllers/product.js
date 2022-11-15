const express = require('express');
const productSchema = require('../Models/product');
const autorization = require('../Middlewares/autorization');
const exists = require('../Middlewares/productExists');

const route = express.Router();

//create users
route.post("/products",autorization, (req,res) => {
    const product = productSchema(req.body);
    const { userRol } = req;
    
    if (userRol == 'admin') {
        product.save()
            .then((data) => res.json(data))
            .catch((error) => res.status(400).json({ message: error }));
    } else {
        res.status(401).json({
            error:{
                message:"You do not have the permissions to perform this action with the credentials provided."
            }
        })
    }

});

//get all products
route.get("/products", (req, res) => {
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});

//get a product
route.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    productSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error }));

});

//update product
route.put("/products/:id", exists, autorization, (req, res) => {
    const { id } = req.params;
    const { categoria, sexo, talla, color, precio, stock, descripcion, imagen, nombre } = req.body;
    const { userRol } = req;

    if (userRol == 'admin') {
        productSchema
            .updateOne({ _id: id }, { $set: { categoria, sexo, talla, color, precio, stock, descripcion, imagen, nombre } })
            .then((data) => res.json(data))
            .catch((error) => res.status(404).json({ message: error }));
    } else {
        res.status(401).json({ error:"You do not have the permissions to perform this action with the credentials provided."})
    }
    

});

//delete product
route.delete("/products/:id",exists, autorization, async (req, res) => {
    const { id } = req.params;
    const { userRol } = req;
    
    if (userRol == 'admin') {
        productSchema
            .deleteOne({ _id: id })
            .then((data) => res.json(data))
            .catch((error) => res.status(404).json({ message: error }));
    } else {
        res.status(401).json({ error: "You do not have the permissions to perform this action with the credentials provided." })
    }

});

module.exports = route;