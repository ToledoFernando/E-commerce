import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../components/PaymentOne/Pay.scss";
import PayForm from "../../components/PayForm/PayForm";

function Payments() {
  const carrito = useSelector((state) => state.carrito);
  let total = 0;
  const ids = carrito.map((p) => {
    {
      p.oferta ? (total = total + p.oferta) : (total = total + p.price);
    }
    return p.id;
  });

  return (
    <div>
      <h1>Productos</h1>
      <PayForm amount={total} idProduct={ids} />
    </div>
  );
}

export default Payments;
