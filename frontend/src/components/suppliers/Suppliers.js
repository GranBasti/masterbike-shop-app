import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      // Usa la URL completa con el puerto correcto
      const response = await axios.get('http://localhost:5001/api/suppliers', {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000 // 5 segundos de espera
      });
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Formato de datos inválido");
      }
      
      setSuppliers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar proveedores:", err);
      setError(`Error de conexión: ${err.message}`);
      
      // Datos de ejemplo para desarrollo
      setSuppliers([{
        id: 1,
        name: "Proveedor Ejemplo",
        contact_email: "contacto@ejemplo.com",
        phone: "3001234567",
        component_specialty: "Cuadros"
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  if (loading) return <div className="loading">Cargando proveedores...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="suppliers-container">
      <h2>Gestión de Proveedores</h2>
      
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact_email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.component_specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;