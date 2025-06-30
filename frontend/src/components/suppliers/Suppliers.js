import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './Suppliers.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    contact_email: '',
    phone: '',
    component_specialty: ''
  });


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


///Parte 3
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSupplier) {
        // Actualizar proveedor existente
        await axios.put(`http://localhost:5001/api/suppliers/${currentSupplier.id}`, formData);
      } else {
        // Crear nuevo proveedor
        await axios.post('http://localhost:5001/api/suppliers', formData);
      }
      fetchSuppliers();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("Error al guardar proveedor:", err);
      setError(`Error al guardar: ${err.message}`);
    }
  };

  const handleEdit = (supplier) => {
    setCurrentSupplier(supplier);
    setFormData({
      name: supplier.name,
      contact_email: supplier.contact_email,
      phone: supplier.phone,
      component_specialty: supplier.component_specialty
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este proveedor?")) {
      try {
        await axios.delete(`http://localhost:5001/api/suppliers/${id}`);
        fetchSuppliers();
      } catch (err) {
        console.error("Error al eliminar proveedor:", err);
        setError(`Error al eliminar: ${err.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contact_email: '',
      phone: '',
      component_specialty: ''
    });
    setCurrentSupplier(null);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.component_specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );


//Parte 3

  if (loading) return <div className="loading">Cargando proveedores...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="suppliers-container">
      <div className="suppliers-header">
        <h2>Gestión de Proveedores</h2>
        <div className="suppliers-actions">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Buscar proveedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="add-button"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
          >
            <FaPlus /> Nuevo Proveedor
          </button>
        </div>
      </div>
      
      <table className="suppliers-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact_email}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.component_specialty}</td>
              <td className="actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(supplier)}
                >
                  <FaEdit />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(supplier.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar proveedor */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h3>{currentSupplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email de Contacto</label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Especialidad</label>
                <select
                  name="component_specialty"
                  value={formData.component_specialty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  <option value="Cuadros">Cuadros</option>
                  <option value="Ruedas">Ruedas</option>
                  <option value="Transmisión">Transmisión</option>
                  <option value="Frenos">Frenos</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit">
                  {currentSupplier ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;