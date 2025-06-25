const BikeCard = ({ bike, addToCart }) => {
  return (
    <div className="bike-card">
      <img src={bike.imagen} alt={bike.nombre} />
      <h3>{bike.nombre}</h3>
      <p>{bike.descripcion}</p>
      <button onClick={() => addToCart(bike)}>
        Añadir al carrito (${bike.precio})
      </button>
    </div>
  );
};