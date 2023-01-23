import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailApi, validarToken } from "../../store/action";
import mpLogo from "../../img/logoMercadoPago.png";

import load from "../../img/load.svg";
import "./Pay.scss";
import swal from "sweetalert";

let cardForm;

function Payments() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [cargando, setCargando] = useState(false);
  const user = useSelector((state) => state.myAcount);
  const product = useSelector((state) => state.detailPay);
  const mp = useSelector((state) => state.mp);
  const domicilio = useSelector((state) => state.domicilio);

  useEffect(() => {
    dispatch(validarToken(localStorage.getItem("tokenUser")));
    dispatch(getDetailApi(id));

    if (cardForm) cardForm.unmount();
    cardForm = mp.cardForm({
      amount: `${product.oferta ? product.oferta : product.price}`,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Numero de tarjeta",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Codigo de seguridad",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular de la Tarjeta",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Seleccionar Banco",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Pago/s",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "D.N.I",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Numero de documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "Email",
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error)
            return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: (event) => {
          event.preventDefault();
          setCargando(true);
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          fetch(`${import.meta.env.VITE_API_URL}/payment/preferensID`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: JSON.stringify({
                productID: product.id,
                userID: user.id,
                entrega: domicilio,
              }),
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setCargando(false);
              console.log(data);
              if (data.status == "approved")
                swal(
                  "Compra Realizada con Exito",
                  "Revisa tu correo para ver el comprobando de pago",
                  "success"
                );
            });
        },
      },
    });
  }, []);

  return !product ? (
    <div className="cargando">
      <img src={load} alt="" />
    </div>
  ) : (
    <div className="cho-container">
      <div className="pagar">
        <div className="info">
          <img src={product.productIMG} alt="img producto" />
          <div className="productoInfo">
            <h1>{product.name}</h1>
            <h2>{product.marca?.name}</h2>
            <textarea
              disabled
              defaultValue={product.description?.slice("\n")}
              cols="30"
              rows="10"
            ></textarea>
            <div className="precio">
              {!product.oferta ? (
                `$${product.price}`
              ) : (
                <div>
                  <p>
                    Precio: <del>${product.price}</del>
                  </p>
                  <p>Precio en oferta: ${product.oferta}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <form
          id="form-checkout"
          className="formC"
          onSubmit={() => console.clear()}
        >
          <input
            type="text"
            id="form-checkout__cardNumber"
            className="cardNumber"
            name="number"
          />
          <div className="dataCard">
            <input id="form-checkout__expirationDate" className="container" />
            <input
              id="form-checkout__securityCode"
              className="container"
              name="cvv"
            />
          </div>
          <input
            type="text"
            id="form-checkout__cardholderName"
            className="cardholderName"
            name="titular"
          />
          <div className="tipLogo">
            <div className="tipC">
              <select id="form-checkout__issuer"></select>
              <select id="form-checkout__installments"></select>
            </div>
            <img src={mpLogo} alt="mpLogo" />
          </div>
          <div className="ind">
            <select id="form-checkout__identificationType"></select>
            <input
              type="text"
              id="form-checkout__identificationNumber"
              name="numIdn"
            />
          </div>
          <input
            type="email"
            id="form-checkout__cardholderEmail"
            className="cardholderEmail"
            disabled
            defaultValue={user.email}
          />
          <div className="pagarDiv">
            <button type="submit" id="form-checkout__submit">
              Pagar{" "}
              {!product.oferta ? `$${product.price}` : `$${product.oferta}`}
            </button>
          </div>
          {cargando ? (
            <div className="cargando">
              <img src={load} alt="Cargando" />
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default Payments;
