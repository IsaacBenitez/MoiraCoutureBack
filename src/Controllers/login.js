const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

const route = express.Router();

route.post("/login", async (req, res)=> {
    const { body } = req;
    const { email, password } = body;

    const user = await User.findOne({ email: email });

    console.log(user);

    const passwordCorrect = user == null
        ? false
        : await bcrypt.compare(password, user.password);
    //

    if (!(user && passwordCorrect)) {
        res.status(401).json({
            error: 'Invalid email or password'
        })
    }

    const userInfoForToken = {
        id: user._id,
        name: user.name,
        rol: user.rol
    }

    const token = jwt.sign(
        userInfoForToken,
        process.env.SECRET,
        {
            expiresIn: 60/*s*/ * 60/*min*/ * 3/*h*/
        }
    );

    res.send({
        email: user.email,
        user: user.name,
        token
    });

});

module.exports = route;