const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const user = require("./endpoints/user");

const app = express();
const port = process.env.port || 9000;

//middleware
app.use(express.json());
app.use('/api', user);

//endpoint
app.get("/", (req, res) => {
   res.send("Welcome to my API") 
});

//DB connection
mongoose.connect(process.env.ConnectionString)
    .then(() => console.log("Connectect to MongoDB Atlas"))
    .catch((error) => console.error(error));
//

app.listen(port, () => console.log('server listening on port ', port));