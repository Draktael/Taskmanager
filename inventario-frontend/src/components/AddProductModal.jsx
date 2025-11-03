import React, { useState } from 'react';

const AddProductModal = ({ onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category,setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      category,
    };
    onAddProduct(newProduct); // Llama a la función para agregar el producto
    onClose(); // Cierra el modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Categoria:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;