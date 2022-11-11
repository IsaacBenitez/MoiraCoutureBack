const product = require('../Models/product');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    const exists = await product.findById(id);

    if (!exists) {
        res.status(404).json({ message: "product not found" })
    } else {
        next()
    }
};