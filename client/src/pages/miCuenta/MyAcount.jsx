import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Acount from "../../components/acount/Acount";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { validarToken } from "../../store/action";
import MenuAcount from "../../components/menuAcoutn/MenuAcount";
import "./MyAcount.scss";

function MyAcount() {
  const usuario = useSelector((state) => state.myAcount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    dispatch(validarToken(token));
  }, []);

  return (
    <div>
      {!usuario.id ? (
        <div>
          <h1>Debes Logearte Primero</h1>{" "}
          <button onClick={() => navigate("/login")}>Iniciar Session</button>
        </div>
      ) : (
        <div className="myAcoutn">
          <MenuAcount />
          <Acount data={usuario} />
        </div>
      )}
    </div>
  );
}

export default MyAcount;
