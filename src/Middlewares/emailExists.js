const user = require('../Models/user');

module.exports = async (req, res, next) => {
    const { email,password } = req.body;

    const exists = await user.findOne({ email })
    
    if (exists) {
        res.status(400).json({
            error: "email already exists"
        })
    }else { 
        next()
    }

}