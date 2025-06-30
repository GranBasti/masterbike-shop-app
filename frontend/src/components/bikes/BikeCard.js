import React, { useState } from 'react';
import { FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';

function BikeCard({ bike, addToCart }) {
  // Datos consolidados con valores por defecto
  const bikeData = {
    id: bike.id || Date.now(),
    name: bike.name || "Bicicleta",
    type: bike.type || "general",
    age_group: bike.age_group || "adulto",
    rating: bike.rating || 0,
    description: bike.description || "Descripción no disponible",
    price: bike.price || 0,
    discount: bike.discount || 0,
    images: bike.images || ["default-bike.jpg"]
  };

  // Estados del componente
  const [mainImage, setMainImage] = useState(bikeData.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (typeof addToCart === 'function') {
      addToCart({
        id: bikeData.id,
        name: bikeData.name,
        type: bikeData.type,
        price: bikeData.price,
        discount: bikeData.discount,
        quantity: quantity,
        image: mainImage
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      console.error('addToCart no es una función');
    }
  };

  return (
    <div className="bike-card">
      <div className="bike-image">
        <img src={mainImage} alt={bikeData.name} />
        <div className="thumbnail-images">
          {bikeData.images.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Vista ${index + 1}`} 
              onClick={() => setMainImage(img)}
              className={mainImage === img ? 'active' : ''}
            />
          ))}
        </div>
      </div>
      <div className="bike-info">
        <h3>{bikeData.name}</h3>
        <div className="bike-meta">
          <span className={`type-badge ${bikeData.type}`}>{bikeData.type}</span>
          <span className={`age-badge ${bikeData.age_group}`}>{bikeData.age_group}</span>
        </div>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            i < bikeData.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          ))}
        </div>
        <p className="description">{bikeData.description}</p>
        <div className="price-section">
          <span className="price">${bikeData.price.toLocaleString()}</span>
          {bikeData.discount > 0 && (
            <span className="discount">-{bikeData.discount}%</span>
          )}
        </div>
        <div className="cart-controls">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <FaShoppingCart /> {addedToCart ? '✓ Añadido' : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BikeCard;