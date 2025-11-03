import React, { useState } from 'react';
import axios from 'axios';

const DeleteProductModal = ({ product, onClose, onDeleteProduct }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [quantityToDelete, setQuantityToDelete] = useState(1);
  const [deleteAll, setDeleteAll] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteAll || quantityToDelete >= product.quantity) {
        // Eliminar producto completamente
        await axios.delete(`http://localhost:3000/api/products/${product._id}`);
        onDeleteProduct(product._id, 'complete'); // Notifica eliminación completa
      } else {
        // Actualizar cantidad del producto
        const newQuantity = product.quantity - quantityToDelete;
        await axios.put(`http://localhost:3000/api/products/${product._id}`, {
          ...product,
          quantity: newQuantity
        });
        onDeleteProduct(product._id, 'partial', quantityToDelete); // Notifica eliminación parcial
      }
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error eliminando producto:', error);
      alert('Error eliminando producto. Inténtalo de nuevo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantityToDelete(Math.min(Math.max(value, 1), product.quantity));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Eliminar Producto</h2>
        <div className="product-info">
          <p><strong>Producto:</strong> {product.name}</p>
          <p><strong>Cantidad disponible:</strong> {product.quantity}</p>
        </div>

        <div className="delete-options">
          <div className="option-group">
            <label>
              <input
                type="radio"
                name="deleteOption"
                checked={!deleteAll}
                onChange={() => setDeleteAll(false)}
              />
              Eliminar cantidad específica
            </label>
            {!deleteAll && (
              <div className="quantity-input">
                <label htmlFor="quantity">Cantidad a eliminar:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.quantity}
                  value={quantityToDelete}
                  onChange={handleQuantityChange}
                  disabled={deleteAll}
                />
                <span className="quantity-info">
                  Quedarán: {product.quantity - quantityToDelete} unidades
                </span>
              </div>
            )}
          </div>

          <div className="option-group">
            <label>
              <input
                type="radio"
                name="deleteOption"
                checked={deleteAll}
                onChange={() => setDeleteAll(true)}
              />
              Eliminar producto completamente
            </label>
          </div>
        </div>

        <div className="confirmation-text">
          {deleteAll ? (
            <p className="warning-text">
              ¿Estás seguro de que deseas eliminar completamente el producto "{product.name}"?
            </p>
          ) : (
            <p>
              ¿Estás seguro de que deseas eliminar {quantityToDelete} unidad(es) de "{product.name}"?
            </p>
          )}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="delete-btn" 
            onClick={handleDelete} 
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Confirmar Eliminación'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;