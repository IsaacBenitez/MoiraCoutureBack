const express = require('express');
const userSchema = require('../Models/user');

const route = express.Router();

//create users
route.post("/users", (req,res) => {
    const user = userSchema(req.body);

    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    
     
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
        .catch((error) => res.json({ message: error }));


});

//update user
route.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
        .updateOne({_id:id},{$set:{name,age,email}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));


});

//delete user
route.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));


});

module.exports = route;