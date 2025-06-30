import React from 'react';
import PropTypes from 'prop-types';

const PartCard = ({ part, addToCart }) => {
  return (
    <div className="part-card">
      <img src={part.image} alt={part.name} />
      <h3>{part.name}</h3>
      <p>{part.category}</p>
      <p>${part.price.toLocaleString()}</p>
      <button onClick={() => addToCart(part)}>
        Añadir al carrito
      </button>
    </div>
  );
};

PartCard.propTypes = {
  part: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default PartCard; // ¡Exportación por defecto!