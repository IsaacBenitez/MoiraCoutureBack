const express = require('express');
const userSchema = require('../Models/user');
const bcrypt = require('bcrypt');
const exists = require('../Middlewares/emailExists');


const route = express.Router();

//create users
route.post("/users", exists, async (req,res) => {
    const { email, password, name, lastname, birthDate, cellphone, address } = req.body;
    let passwordHash = password;

    if (password != '') {
        const saltRounds = 10;
        passwordHash = await bcrypt.hash(password, saltRounds);
    }
    
    const user = userSchema({
        email,
        password: passwordHash,
        name,
        lastname,
        birthDate,
        cellphone,
        address
    });

    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error }));
    
     
});

//get all users
route.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));


});

//get a user
route.get("/users/:id", (req, res) => {
    const { id } = req.params
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error }));


});

//update user
route.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, lastname, birthDate, email, password, phonenumber, address } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: { name, lastname, birthDate, email, password, phonenumber, address }})
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error }));


});

//delete user
route.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(404).json({ message: error }));


});

module.exports = route;


