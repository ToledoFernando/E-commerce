import { useState } from "react";
import { useSelector } from "react-redux";

function Payment() {
  const carrito = useSelector((state) => state.carrito);
  let total = 0;

  for (let a = 0; a < carrito.length; a++) {
    if (carrito[a].oferta > 0) total = total + carrito[a].oferta;
    else total = total + carrito[a].price;
  }

  return (
    <div>
      <h1>Productos</h1>
      {carrito?.map((producto) => (
        <div key={producto.id}>
          <p>{producto.name}</p>
          <p>{producto.marca?.name}</p>
          <button>Eliminar</button>
          <br />
          <br />
        </div>
      ))}

      <p>Total: {total}</p>
    </div>
  );
}

export default Payment;
