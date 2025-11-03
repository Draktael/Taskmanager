// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/productList';
import AddProductModal from '../components/AddProductModal';
import DeleteProductModal from '../components/DeleteProductModal'; // AGREGAR ESTA LÍNEA
import '../Styles/modal.css';
import '../Styles/inventario.css';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Cargar los productos al iniciar la aplicación
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  // Agregar los productos
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', newProduct);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error agregando producto:', error);
    }
  };

  // Borrar los productos
  const handleDeleteProduct = (productId, deleteType, quantityDeleted) => {
    if (deleteType === 'complete') {
      setProducts(products.filter(product => product._id !== productId));
    } else if (deleteType === 'partial') {
      setProducts(products.map(product => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity - quantityDeleted };
        }
        return product;
      }));
    }
  };

  // AGREGAR ESTA FUNCIÓN
  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Actualizar los productos
  const handleProductUpdated = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="container">
      <h1 className='container-titulo'>Inventario</h1>
      <button className='' onClick={() => setIsAddModalOpen(true)}>Agregar Producto</button>
      <ProductList
        products={products}
        onProductDeleted={handleDeleteProduct} // CORREGIR ESTA LÍNEA
        onProductUpdated={handleProductUpdated}
        onOpenDeleteModal={handleOpenDeleteModal} // AGREGAR ESTA LÍNEA
      />
      
      {/* Modal para agregar producto */}
      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}
      
      {/* Modal para eliminar producto */}
      {showDeleteModal && (
        <DeleteProductModal
          product={productToDelete}
          onClose={() => setShowDeleteModal(false)}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default InventoryPage;