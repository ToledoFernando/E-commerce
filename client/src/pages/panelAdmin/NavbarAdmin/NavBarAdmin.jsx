import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { validarToken } from "../../../store/action";
import "./NavBarAdmin.scss";

function NavBarAdmin() {
  const myRol = localStorage.getItem("rol");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    dispatch(validarToken(token))
      .then(() => {
        if (localStorage.getItem("rol") == "user") navigate("/");
      })
      .catch(() => {
        localStorage.clear();
        navigate("/");
      });
  }, []);

  return (
    <div className="navBarAdmin">
      {myRol == "SuperAdmin" ? (
        <ul>
          <li>
            <Link to="AddProducts">Agregar Producto</Link>
          </li>
          <li>
            <Link to="products">Ver Productos</Link>
          </li>
          <li>
            <Link to="users">Usuarios</Link>
          </li>
          <li>
            <Link to="addcm">Agregar Otros</Link>
          </li>
        </ul>
      ) : null}
      {myRol == "Admin" ? (
        <ul>
          <li>
            <Link to="modProducts">ver Producto</Link>
          </li>
          <li>
            <Link to="userClients">ver Usuarios</Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default NavBarAdmin;
