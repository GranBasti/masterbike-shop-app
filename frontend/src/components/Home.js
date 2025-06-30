import React from 'react';
import { Link } from 'react-router-dom';
import { FaBicycle, FaTools, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Bienvenido a BikeShop</h1>
        <p>Tu destino para todo en ciclismo</p>
      </header>

      <div className="menu-grid">
        <Link to="/bikes" className="menu-card">
          <FaBicycle className="menu-icon" />
          <h2>Bicicletas</h2>
          <p>Descubre nuestra colección</p>
        </Link>

        <Link to="/parts" className="menu-card">
          <FaTools className="menu-icon" />
          <h2>Partes</h2>
          <p>Componentes y accesorios</p>
        </Link>

        <Link to="/services" className="menu-card">
          <FaCalendarAlt className="menu-icon" />
          <h2>Servicios</h2>
          <p>Mantenimiento y reparación</p>
        </Link>

        <Link to="/suppliers" className="menu-card">
          <FaUsers className="menu-icon" />
          <h2>Proveedores</h2>
          <p>Nuestros partners</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;