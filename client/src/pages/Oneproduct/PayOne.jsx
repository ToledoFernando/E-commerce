import Payments from "../../components/PaymentOne/Payments";
import "./PAY.scss";

function PayOne() {
  return (
    <div className="paymentOne">
      <div className="pay">
        <h1>
          Pagar con Tarjeta de <span className="res">credito</span>/
          <span className="res">debito</span>
        </h1>
        <Payments />
      </div>
    </div>
  );
}

export default PayOne;
