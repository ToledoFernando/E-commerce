import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailApi, validarToken } from "../../store/action";
import mpLogo from "../../img/logoMercadoPago.png";

import load from "../../img/load.svg";
import "./Pay.scss";
import swal from "sweetalert";
import PayForm from "../PayForm/PayForm";

let cardForm;

function Payments() {
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const [cargando, setCargando] = useState(false);
  // const user = useSelector((state) => state.myAcount);
  const product = useSelector((state) => state.detailPay);
  // const mp = useSelector((state) => state.mp);
  // const domicilio = useSelector((state) => state.domicilio);

  return (
    <div>
      <h1>Form Payment</h1>
      <PayForm
        amount={product.oferta ? product.oferta : product.price}
        idProduct={product.id}
      />
    </div>
  );
}

export default Payments;
