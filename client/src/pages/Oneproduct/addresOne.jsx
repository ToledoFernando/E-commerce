import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailApi, validarToken } from "../../store/action";
import swal from "sweetalert";
import FormAddres from "../../components/formAddres/FormAddres";

function AddresOne() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.myAcount);
  const dispatch = useDispatch();
  const { tokenuser, id } = useParams();

  useEffect(() => {
    dispatch(validarToken(tokenuser));
    dispatch(getDetailApi(id));
    if (!user.verify)
      swal(
        "Debes verificar tu cuenta",
        'Solicita la verificacion desde el apartado "Mi cuenta"',
        "warning",
        {
          buttons: [true, "Mi cuenta"],
        }
      ).then((e) => {
        if (e) navigate("/myAcount");
        else navigate("/products");
      });
  }, []);

  return (
    <div className="oneProduct">
      <div className="addres">
        <h1>
          Formulario de <span className="res">Envio</span>/
          <span className="res">Retiro</span>
        </h1>
        <FormAddres />
      </div>
    </div>
  );
}

export default AddresOne;
