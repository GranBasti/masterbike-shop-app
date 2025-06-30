import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartCard from './PartCard';

const PartsShop = ({ addToCart }) => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/parts');
      setParts(response.data);
    } catch (err) {
      console.error('Error fetching parts:', err);
      // Datos de ejemplo para desarrollo
      setParts([{
        id: 1,
        name: "Frenos de disco",
        category: "Frenos",
        price: 150000,
        description: "Frenos de alto rendimiento",
        image: "ruta/a/imagen-freno.jpg"
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchParts(); }, []);

  if (loading) return <div className="loading">Cargando partes...</div>;

  return (
    <div className="parts-shop">
      <h2>Partes de Bicicletas</h2>
      <div className="parts-grid">
        {parts.map(part => (
          <PartCard
            key={part.id}
            part={part}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default PartsShop;