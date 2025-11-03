const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Obtener todos los productos
router.get("/", productController.getProducts);

// Crear un nuevo producto
router.post("/", productController.createProduct);

//actualizar un producto
router.put("/:id", productController.updateProduct);

//eliminar un producto
router.delete("/:id", productController.deleteProduct);

//buscar un producto
router.get("/:name", productController.searchProduct);

module.exports = router;
