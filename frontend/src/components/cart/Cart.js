import React from 'react';


const Cart = ({ items, onRemove, onClose }) => {
  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      <button onClick={onClose}>Cerrar</button>
      
      {items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => onRemove(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;