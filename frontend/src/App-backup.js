import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';



// Configuración global de Axios
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Asegúrate que coincide con tu backend
  timeout: 10000,
});

function App() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificamos primero la conexión con el backend
      await api.get('/test');
      
      // Obtenemos los datos de bicicletas
      const response = await api.get('/bikes');
      console.log('Datos recibidos:', response.data);
      
      // Transformamos los datos para manejar mejor los booleanos
      const formattedBikes = response.data.map(bike => ({
        ...bike,
        is_available: bike.is_available === 1, // Convertir 1/0 a true/false
        price: parseFloat(bike.price), // Asegurar que es número
        rental_price: parseFloat(bike.rental_price) // Asegurar que es número
      }));
      
      setBikes(formattedBikes);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError(err.message || 'Error al conectar con el servidor');
      
      // Datos de ejemplo para desarrollo
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

  useEffect(() => {
    fetchBikes();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando inventario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchBikes}>Reintentar conexión</button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Tienda de Bicicletas Premium</h1>
      
      <div className="inventory-summary">
        <p>Total de modelos: <strong>{bikes.length}</strong></p>
        <p>Total en stock: <strong>
          {bikes.reduce((sum, bike) => sum + bike.stock, 0)}
        </strong></p>
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

export default App;