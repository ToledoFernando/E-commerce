import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { validarToken, verifiAcoutnBT } from "../../store/action";
import sweetalert from "sweetalert";
import cargando from "../../img/load.svg";
import "./Verify.scss";

function VerifyAcount() {
  const { token, email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenUser = localStorage.getItem("tokenUser");

  useEffect(() => {
    dispatch(verifiAcoutnBT(token)).then(() => {
      dispatch(validarToken(tokenUser)).then(() => {
        sweetalert({
          title: "Usuario Verificado",
          text: `La cuenta ${email} a sido verificado/a`,
          icon: "success",
          button: {
            text: "Cerrar",
            closeModal: true,
          },
          dangerMode: true,
        });
        navigate("/");
      });
    });
  }, []);

  return (
    <div className="bod">
      <img src={cargando} alt="Cargando" />
      <h1>Verificando Cuenta...</h1>
    </div>
  );
}

export default VerifyAcount;
