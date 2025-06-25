import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Suppliers from './components/suppliers/Suppliers'; // Asegúrate que la ruta sea correcta

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

function BikesComponent() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.get('/test');
      const response = await api.get('/bikes');
      const formattedBikes = response.data.map(bike => ({
        ...bike,
        is_available: bike.is_available === 1,
        price: parseFloat(bike.price),
        rental_price: parseFloat(bike.rental_price)
      }));
      setBikes(formattedBikes);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError(err.message || 'Error al conectar con el servidor');
      if (process.env.NODE_ENV === 'development') {
        setBikes([{
          id: 1,
          model: "Ejemplo King",
          bike_type: "pistera",
          price: 8000000,
          rental_price: 800000,
          stock: 1,
          is_available: true
        }]);
        setError('⚠ Usando datos de ejemplo (problema de conexión)');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBikes(); }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  if (loading) return <div className="loading"><div className="spinner"></div><p>Cargando inventario...</p></div>;
  if (error) return <div className="error"><h2>Error</h2><p>{error}</p><button onClick={fetchBikes}>Reintentar conexión</button></div>;

  return (
    <div>
      <h1>Tienda de Bicicletas Premium</h1>
      <div className="inventory-summary">
        <p>Total de modelos: <strong>{bikes.length}</strong></p>
        <p>Total en stock: <strong>{bikes.reduce((sum, bike) => sum + bike.stock, 0)}</strong></p>
      </div>
      
      <table className="bike-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Precio de Venta</th>
            <th>Precio de Arriendo/día</th>
            <th>Stock</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map(bike => (
            <tr key={bike.id} className={bike.stock === 0 ? 'out-of-stock' : ''}>
              <td>{bike.model}</td>
              <td>{bike.bike_type}</td>
              <td>{formatCurrency(bike.price)}</td>
              <td>{formatCurrency(bike.rental_price)}</td>
              <td>{bike.stock}</td>
              <td>{bike.is_available ? '✅ Sí' : '❌ No'}</td>
              <td>
                <button 
                  disabled={!bike.is_available || bike.stock === 0}
                  onClick={() => alert(`Vendiendo ${bike.model}`)}
                >
                  Vender
                </button>
                <button
                  disabled={!bike.is_available}
                  onClick={() => alert(`Arrendando ${bike.model}`)}
                >
                  Arrendar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Componente de Navegación
function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      <Link 
        to="/" 
        className={location.pathname === '/' ? 'active' : ''}
      >
        Bicicletas
      </Link>
      <Link 
        to="/suppliers" 
        className={location.pathname === '/suppliers' ? 'active' : ''}
      >
        Proveedores
      </Link>
    </nav>
  );
}

// Componente principal App
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<BikesComponent />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;