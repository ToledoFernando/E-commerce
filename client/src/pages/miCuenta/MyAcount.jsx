import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Acount from "../../components/acount/Acount";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { validarToken } from "../../store/action";

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
        <Acount data={usuario} />
      )}
    </div>
  );
}

export default MyAcount;
