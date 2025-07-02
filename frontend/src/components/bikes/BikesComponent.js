import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BikeCard from './BikeCard';

// Configura axios globalmente o crea una instancia
const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Asegúrate que coincida con tu backend
  timeout: 5000
});

const BikesComponent = ({ addToCart }) => {
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


  if (loading) return <div className="loading"><div className="spinner"></div><p>Cargando inventario...</p></div>;
  if (error) return <div className="error"><h2>Error</h2><p>{error}</p><button onClick={fetchBikes}>Reintentar conexión</button></div>;

  return (
    <div className="bike-shop-container">
      <h1>Tienda de Bicicletas </h1>
      
      <div className="bike-grid">
        {bikes.map(bike => (
          <BikeCard 
            key={bike.id}
            bike={{
              id: bike.id,
              name: bike.model,
              type: bike.bike_type,
              age_group: bike.age_group || "adulto",
              rating: bike.rating || 0,
              description: bike.description || "Descripción no disponible",
              price: bike.price,
              discount: bike.discount || 0,
              images: [bike.image_url || 'default-bike.jpg']
            }}
            addToCart={addToCart}
/>
        ))}
      </div>
    </div>
  );
};

export default BikesComponent;