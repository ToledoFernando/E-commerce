import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/action";
import "./NavBar.scss";
import { useRef } from "react";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.isLogin);
  const userAcount = useSelector((state) => state.myAcount);
  const dispatch = useDispatch();
  const navbar = useRef();

  const cerrarSession = async () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (Math.round(e.target.scrollingElement.scrollTop) >= 20) {
        navbar.current.style.boxShadow = "0px 0px 10px #00000068";
      } else {
        navbar.current.style.boxShadow = "none";
      }
    });
  }, []);

  return (
    <nav ref={navbar}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Ver Productos</Link>
      </div>
      <div>
        {userLogin ? (
          <>
            <Link to="/myAcount">My cuenta</Link>
            {userAcount.rol == "Admin" || userAcount.rol == "SuperAdmin" ? (
              <Link to="/dashboardAdmin">Panel Admin</Link>
            ) : null}
            <button onClick={cerrarSession} className="cerrarSession">
              Cerrar Session
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesion</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
