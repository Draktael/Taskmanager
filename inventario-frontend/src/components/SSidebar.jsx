import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={`togglebtn ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}>
         ☰
      </button>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <h2>Menú</h2>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/inventario">Inventario</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
