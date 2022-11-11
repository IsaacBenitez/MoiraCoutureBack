const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const user = require("./Controllers/user");
const product = require("./Controllers/product");
const login = require("./Controllers/login");

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', user);
app.use('/api', product);
app.use("/api", login);

//endpoint
app.get("/", (req, res) => {
   res.send("Welcome to my API") 
});


//DB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error));
//

app.listen(port, () => console.log('Server listening on port ', port));