import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import iconF from "../../pages/EdithAcoutn/iconF.png";
import iconM from "../../pages/EdithAcoutn/iconM.png";
import load from "../../img/load.svg";
import { pedirVerificacion } from "../../store/action";
import sweet from "sweetalert";
import "./Acount.scss";

function Acount({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cargando, setCargando] = React.useState(false);

  const solicitud = async () => {
    const token = localStorage.getItem("tokenUser");
    setCargando(!cargando);
    dispatch(pedirVerificacion(token)).then(() => {
      sweet({
        title: "Correo enviado",
        text: `Se envio un correo de verificacion a ${data.email}.`,
        icon: "warning",
        button: {
          text: "Cerrar",
          closeModal: true,
        },
        dangerMode: true,
      }).then(() => {
        setCargando(false);
      });
    });
  };

  return (
    <div className="MiAcount">
      {!data.verify ? (
        <p className="AlertaVerify">
          <b>Debes verificar tu cuenta</b>{" "}
          <button onClick={solicitud}>
            {cargando ? <img src={load} alt="Cargando" /> : "Varificar"}
          </button>
        </p>
      ) : null}
      {data.profileIMG ? (
        <img width="300" height="300" src={iconF} alt={data.username} />
      ) : (
        <img width="300" height="300" src={iconM} alt={data.username} />
      )}
      <div className="infoUser">
        <div className="name_lastName">
          <div>
            <label>
              <b>Nombre</b>
            </label>
            <p>{data.first_name}</p>
          </div>
          <div className="appl">
            <label>
              <b>Apellido</b>
            </label>
            <p>{data.last_name}</p>
          </div>
        </div>
        <div className="infocontact">
          <div>
            <label>
              <b>Username</b>
            </label>
            <p>{data.username}</p>
          </div>
          <div className="email">
            <label>
              <b>Email de la cuenta</b>
            </label>
            <p>{data.email}</p>
          </div>
        </div>
        <div className="optCuenta">
          <button className="editar" onClick={() => navigate(data._id)}>
            Editar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Acount;
