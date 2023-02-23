import ProductModel from '../models/Product.js';

export const create = async (req, res) => {
    try {
        const doc = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });

        const product = await doc.save();

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create a product"
        })
    }
}