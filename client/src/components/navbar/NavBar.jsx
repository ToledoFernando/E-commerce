import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/action";
import "./NavBar.scss";
import { useDispatch } from "react-redux";

function NavBar() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.isLogin);
  const userAcount = useSelector((state) => state.myAcount);
  const dispatch = useDispatch();

  const cerrarSession = async () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Ver Productos</Link>
      <ul>
        {userLogin ? (
          <>
            <li>
              <Link to="/myAcount">My cuenta</Link>
            </li>
            {userAcount.rol == "Admin" || userAcount.rol == "SuperAdmin" ? (
              <>
                <li>
                  <Link to="/dashboardAdmin">Panel Admin</Link>
                </li>
              </>
            ) : null}
            <li>
              <button onClick={cerrarSession}>Cerrar Session</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Iniciar Sesion</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
      <Link to="/about">about</Link>
    </nav>
  );
}

export default NavBar;
