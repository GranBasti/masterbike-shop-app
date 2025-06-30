import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
//Parte 3
import { FaBicycle, FaShoppingCart, FaTools, FaCalendarAlt, FaUserCog } from 'react-icons/fa';
//PArte 3
import axios from 'axios';
import './App.css';

//Componentes Parte 3
// Componentes
import BikesComponent from './components/bikes/BikesComponent';
import PartsShop from './components/parts/PartsShop';
import Services from './components/services/Services';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Suppliers from './components/suppliers/Suppliers';
import Home from './components/Home';

// Configuración global de Axios
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  timeout: 10000,
});


// Aplicación funcionando 
// Problema de carpeta frontend solucionado (contenia un .git que funcionaba como submódulo)
// Componente de Bicicletas (extraído de tu código original)

// commit ejecutando
// Realizando cambios
// Problema solucionado 


 function Navigation({ cart, setCartVisible }) {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          <FaBicycle /> Inicio
        </Link>
        <Link to="/bikes" className={location.pathname === '/bikes' ? 'active' : ''}>
          <FaBicycle /> Bicicletas
        </Link>
        <Link to="/parts" className={location.pathname === '/parts' ? 'active' : ''}>
          <FaTools /> Partes
        </Link>
        <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
          <FaCalendarAlt /> Servicios
        </Link>
        <Link to="/suppliers" className={location.pathname === '/suppliers' ? 'active' : ''}>
          <FaUserCog /> Proveedores
        </Link>
      </div>
      <button className="cart-button" onClick={() => setCartVisible(true)}>
        <FaShoppingCart />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </button>
    </nav>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // Función mejorada para añadir al carrito
  const addToCart = (item) => {
    setCart(prevCart => {
      // Verificar si el item ya está en el carrito
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Si existe, actualizar la cantidad
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Si no existe, agregarlo al carrito
        return [...prevCart, item];
      }
    });
  };

    const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>BikeShop Premium</h1>
          <Navigation cart={cart} setCartVisible={setCartVisible} />
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Página de inicio */}
            <Route path="/bikes" element={<BikesComponent addToCart={addToCart}/>} />
            <Route path="/parts" element={<PartsShop addToCart={addToCart} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/suppliers" element={<Suppliers />} />
          </Routes>
        </main>

        {/* Carrito lateral */}
        {cartVisible && (
          <div className="cart-sidebar">
            <Cart 
              items={cart} 
              onRemove={removeFromCart}
              onClose={() => setCartVisible(false)}
            />
          </div>
        )}

        <footer>
          <p>© {new Date().getFullYear()} BikeShop - Todos los derechos reservados</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;