import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import iconF from "../../pages/EdithAcoutn/iconF.png";
import iconM from "../../pages/EdithAcoutn/iconM.png";
import { pedirVerificacion } from "../../store/action";
import "./Acount.scss";

function Acount({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const solicitud = async () => {
    const token = localStorage.getItem("tokenUser");
    await dispatch(pedirVerificacion(token));
    alert("Verifique su correo");
  };

  return (
    <div className="MiAcount">
      {!data.verify ? (
        <p className="AlertaVerify">
          <b>Debes verificar tu cuenta</b>{" "}
          <button onClick={solicitud}>Varificar</button>
        </p>
      ) : null}
      {data.profileIMG ? (
        <img width="300" height="300" src={iconF} alt={data.username} />
      ) : (
        <img width="300" height="300" src={iconM} alt={data.username} />
      )}
      <div className="infoUser">
        <label>Username</label>
        <p>{data.username}</p>
        <label>Nombre y apellido</label>
        <p>{data.first_name}</p>
        <p>{data.last_name}</p>
        <label>Email de la cuenta</label>
        <p>{data.email}</p>
        <button onClick={() => navigate(data._id)}>Editar cuenta</button>
      </div>
    </div>
  );
}

export default Acount;
