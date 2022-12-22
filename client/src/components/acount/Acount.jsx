import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import iconF from "../../pages/EdithAcoutn/iconF.png";
import iconM from "../../pages/EdithAcoutn/iconM.png";
import { pedirVerificacion } from "../../store/action";

function Acount({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const solicitud = async () => {
    const token = localStorage.getItem("tokenUser");
    await dispatch(pedirVerificacion(token));
    alert("Verifique su correo");
  };

  return (
    <div>
      {!data.verify ? (
        <p>
          <b>Debes verificar tu cuenta</b>{" "}
          <button onClick={solicitud}>Varificar</button>
        </p>
      ) : null}
      {data.profileIMG ? (
        <img width="300" height="300" src={iconF} alt={data.username} />
      ) : (
        <img width="300" height="300" src={iconM} alt={data.username} />
      )}
      <p>{data.username}</p>
      <h1>{data.first_name}</h1>
      <h1>{data.last_name}</h1>
      <p>{data.email}</p>
      <button onClick={() => navigate(data._id)}>Editar cuenta</button>
    </div>
  );
}

export default Acount;
