import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { login, validarToken, verifiAcoutnBT } from "../../store/action";
import sweetalert from "sweetalert";

function VerifyAcount() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cuentaVerificada = useSelector((state) => state.myAcount);

  useEffect(() => {
    dispatch(verifiAcoutnBT(token)).then(() => {
      const tokenUser = localStorage.getItem("tokenUser");
      dispatch(validarToken(tokenUser));
      // sweetalert({
      //   title: "Usuario Verificado",
      //   text: "Tu cuenta esta verificada",
      //   icon: "success",
      //   button: {
      //     text: "Cerrar",
      //     closeModal: true,
      //   },
      //   dangerMode: true,
      // });
      // navigate("/");
    });
  }, []);

  return <div>{token}</div>;
}

export default VerifyAcount;
