import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import mpLogo from "../../img/logoMercadoPago.png";

let cardForm;

function PayForm({ amount, idProduct }) {
  const domicilio = useSelector((state) => state.domicilio);
  const user = useSelector((state) => state.myAcount);
  const [cargando, setCargando] = useState(false);
  const mp = useSelector((state) => state.mp);

  useEffect(() => {
    const userToken = localStorage.getItem("tokenUser");
    if (cardForm) cardForm.unmount();
    cardForm = mp.cardForm({
      amount: `${amount}`,
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
              authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: JSON.stringify({
                productID: idProduct,
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

  return (
    <div className="cho-container">
      <h1>Productos</h1>

      <div className="pagar">
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
              Pagar
            </button>
          </div>
          {/* {cargando ? (
        <div className="cargando">
          <img src={load} alt="Cargando" />
        </div>
      ) : null} */}
        </form>
      </div>
    </div>
  );
}

export default PayForm;
