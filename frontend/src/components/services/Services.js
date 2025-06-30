import React, { useState } from 'react';
import { FaTools, FaCalendarAlt, FaBiking } from 'react-icons/fa';
import ServiceCard from './ServiceCard';
import ServiceForm from './ServiceForm';

function Services() {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [selectedService, setSelectedService] = useState(null);

  const services = {
    maintenance: [
      {
        id: 1,
        name: 'Mantención Básica',
        description: 'Limpieza, lubricación y ajuste general de componentes.',
        price: 25000,
        duration: '2 horas',
        icon: <FaTools />
      },
      {
        id: 2,
        name: 'Mantención Completa',
        description: 'Incluye todo lo de la básica más ajuste de frenos y cambios.',
        price: 45000,
        duration: '4 horas',
        icon: <FaTools />
      }
    ],
    rental: [
      {
        id: 3,
        name: 'Arriendo por Hora',
        description: 'Arriendo de bicicleta para paseos cortos.',
        price: 5000,
        duration: '1 hora',
        icon: <FaBiking />
      },
      {
        id: 4,
        name: 'Arriendo Diario',
        description: 'Arriendo de bicicleta para todo el día.',
        price: 20000,
        duration: '24 horas',
        icon: <FaBiking />
      }
    ]
  };

  return (
    <div className="services-page">
      <h2>Nuestros Servicios</h2>
      
      <div className="service-tabs">
        <button 
          className={activeTab === 'maintenance' ? 'active' : ''}
          onClick={() => setActiveTab('maintenance')}
        >
          <FaTools /> Mantención
        </button>
        <button 
          className={activeTab === 'rental' ? 'active' : ''}
          onClick={() => setActiveTab('rental')}
        >
          <FaCalendarAlt /> Arriendo
        </button>
      </div>

      {!selectedService ? (
        <div className="services-grid">
          {services[activeTab].map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelect={setSelectedService}
            />
          ))}
        </div>
      ) : (
        <ServiceForm 
          service={selectedService} 
          onBack={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

export default Services;