const Product = require("../models/Product");

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
        });

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        product.name = req.body.name;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.category = req.body.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        await product.deleteOne();
        res.json({ message: "Producto eliminado", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar un producto por nombre
exports.searchProduct = async (req, res) => {
    try {
        const productName = req.params.name;
        const products = await Product.find({ name: { $regex: productName, $options: 'i' } });

        if (products.length === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};