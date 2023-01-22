import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailApi, validarToken } from "../../store/action";
import swal from "sweetalert";

function Payments() {
  const dispatch = useDispatch();
  const { tokenuser, id } = useParams();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const user = useSelector((state) => state.myAcount);
  const product = useSelector((state) => state.detailPay);
  const xd = useRef();
  const mp = new MercadoPago(import.meta.env.VITE_MPTOKEN);

  useEffect(() => {
    console.log(product);
    console.log(mp.cardForm);
    if (product) {
      mp.cardForm({
        amount: `${product.price}`,
        autoMount: true,
        iframe: false,
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

            const {
              amount,
              cardholderEmail: email,
              identificationNumber,
              identificationType,
              installments,
              issuerId: issuer_id,
              paymentMethodId: payment_method_id,
              token,
            } = cardForm.getCardFormData();
            console.log(cardForm.getCardFormData());

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
                  userID: user.id,
                  name: product.name,
                  marca: product.marca.name,
                  total: amount,
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
                console.log(data);
                setCargando(false);
                alert("Estado de tu compra " + data.status);
              })
              .catch((error) => {
                setCargando(false);
                console.log(error);
              });
          },
        },
      });
    }
    dispatch(getDetailApi(id));
  }, []);

  return !product ? (
    <h1>Cargando</h1>
  ) : (
    <div>
      <div className="pagar">
        <h1>Pagar</h1>
        <form
          id="form-checkout"
          className="formC"
          onSubmit={() => setCargando(true)}
        >
          <input type="text" id="form-checkout__cardNumber" />
          <div className="dataCard">
            <input id="form-checkout__expirationDate" className="container" />
            <input id="form-checkout__securityCode" className="container" />
          </div>
          <input type="text" id="form-checkout__cardholderName" />
          <div className="tipC">
            <select id="form-checkout__issuer"></select>
            <select id="form-checkout__installments"></select>
          </div>
          <div className="ind">
            <select id="form-checkout__identificationType"></select>
            <input type="text" id="form-checkout__identificationNumber" />
          </div>
          <input
            type="email"
            id="form-checkout__cardholderEmail"
            disabled
            defaultValue={user.email}
          />
          <button type="submit" id="form-checkout__submit" className="Pagar">
            Pagar
          </button>
          {cargando ? (
            <div className="cargando">
              <img src={load} alt="" />
            </div>
          ) : null}
        </form>

        <div className="productoInfo titulos">
          <p>Nombre</p>
          <p>Marca</p>
          <p className="precioP">Precio</p>
        </div>
        <div className="productoInfo">
          <p>{product.name}</p>
          <p>{product.marca?.name}</p>
          <p className="precioP">
            {!product.oferta ? `$${product.price}` : `$${product.oferta}`}
          </p>
        </div>
      </div>
      <h1>Pagar</h1>
    </div>
  );
}

export default Payments;