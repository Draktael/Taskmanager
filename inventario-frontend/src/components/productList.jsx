import React, { useState, useMemo } from 'react';
import EditProductModal from './EditProductModal';

const ProductList = ({ products, onProductDeleted, onProductUpdated, onOpenDeleteModal }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Función para ordenar productos
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Productos ordenados
  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  // Función para manejar la actualización
  const handleUpdate = (updatedProduct) => {
    onProductUpdated(updatedProduct);
    setEditingProduct(null);
  };

  return (
    <div>
      <h2>En stock</h2>
      <div className='inv-container'>
        <table className="product-table">
          <thead>  
            <tr>
              <th>
                <button className='nbtn' onClick={() => requestSort('name')}>
                  Nombre {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </button>
              </th>
              <th>
                <button className='pbtn' onClick={() => requestSort('price')}>
                  Precio {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </button>
              </th>
              <th>
                <button className='cbtn' onClick={() => requestSort('quantity')}>
                  Cantidad {sortConfig.key === 'quantity' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </button>
              </th>
              <th>
                <button className='catbtn' onClick={() => requestSort('category')}>
                  Categoria {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </button>
              </th>
              <th className='al'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <button className='actbt' onClick={() => setEditingProduct(product)}>
                    Actualizar
                  </button>
                  <button className='elimbt' onClick={() => onOpenDeleteModal(product)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductList;