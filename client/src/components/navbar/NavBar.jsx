import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategory, getMarcas, logout } from "../../store/action";
import { useRef } from "react";
import { useEffect } from "react";
import flecha from "../../img/arrow.svg";
import "./NavBar.scss";

function NavBar() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.isLogin);
  const userAcount = useSelector((state) => state.myAcount);
  const dispatch = useDispatch();
  const navbar = useRef();
  const subirHref = useRef();
  const subirSvg = useRef();
  const marcas = useSelector((state) => state.marcas);
  const categorys = useSelector((state) => state.categorys);

  const cerrarSession = async () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!marcas.length) dispatch(getMarcas());
    if (!categorys.length) dispatch(getCategory());
    window.addEventListener("scroll", (e) => {
      if (Math.round(e.target.scrollingElement.scrollTop) >= 20) {
        navbar.current.style.boxShadow = "0px 0px 10px #00000068";
        subirHref.current.style.display = "block";
        subirSvg.current.style.transform = "scale(1)";
      } else {
        subirHref.current.style.display = "none";
        subirSvg.current.style.transform = "scale(0)";
        navbar.current.style.boxShadow = "none";
      }
    });
  }, []);

  return (
    <nav ref={navbar}>
      <button className="subir">
        <a ref={subirHref} href="#">
          <img ref={subirSvg} src={flecha} alt="" />
        </a>
      </button>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Ver Productos</Link>
      </div>
      <div>
        {userLogin ? (
          <>
            <Link to="/myAcount">My cuenta</Link>
            {userAcount.rol.name == "Admin" ||
            userAcount.rol.name == "SuperAdmin" ? (
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
