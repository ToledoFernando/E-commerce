import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/action";
import { useNavigate, Link } from "react-router-dom";
import { validarToken } from "../../store/action";
import soportexd from "../../img/contacto.png";
import load from "../../img/load.svg";
import correoEnviado from "../../img/correoEnviar.svg";
import sweet from "sweetalert";
import "./Registro.scss";
import { useRef } from "react";

const initial = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

function Registro() {
  const [cargando, setCargando] = useState(false);
  const [registro, setRegistro] = useState(initial);
  const [error, setError] = useState({
    first_name: true,
    last_name: true,
    username: true,
    email: true,
    password: true,
    password2: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alerta = useRef();

  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
    validateData(e);
  };

  const handleSubmit = async (e) => {
    try {
      setCargando(!cargando);
      e.preventDefault();
      await dispatch(register(registro));
      setCargando(!cargando);
      sweet(
        "Revisa tu correo",
        "Se envio un correo de validacion (revisa seccion SPAN)",
        correoEnviado
      ).then(() => navigate("/#"));
    } catch (error) {
      console.log(error);
      sweet({
        title: "Cambiar Usuario",
        text: error.response.data.Error,
        icon: "warning",
        button: {
          text: "Cerrar",
          closeModal: true,
        },
        dangerMode: true,
      });
      setCargando(!cargando);
      setRegistro(initial);
    }
  };

  //=================================//

  const validateData = (e) => {
    if (e.target.name == "first_name") {
      if (e.target.value.length < 3) {
        setError({ ...error, [e.target.name]: true });
        return (e.target.className = "invalid");
      } else {
        setError({ ...error, [e.target.name]: false });
        return e.target.classList.remove("invalid");
      }
    }

    if (e.target.name == "last_name") {
      if (e.target.value.length < 3) {
        setError({ ...error, [e.target.name]: true });
        return (e.target.className = "invalid");
      } else {
        setError({ ...error, [e.target.name]: false });
        return e.target.classList.remove("invalid");
      }
    }

    if (e.target.name == "username") {
      if (e.target.value.length < 3) {
        setError({ ...error, [e.target.name]: true });
        return (e.target.className = "invalid");
      } else {
        setError({ ...error, [e.target.name]: false });
        return e.target.classList.remove("invalid");
      }
    }

    if (e.target.name == "email") {
      const copy = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (!copy.test(e.target.value)) {
        setError({ ...error, [e.target.name]: true });
        return (e.target.className = "invalid");
      } else {
        setError({ ...error, [e.target.name]: false });
        return e.target.classList.remove("invalid");
      }
    }

    if (e.target.name == "password") {
      if (e.target.value.length < 6) {
        setError({ ...error, [e.target.name]: true });
        return (e.target.className = "invalid");
      } else {
        setError({ ...error, [e.target.name]: false });
        return e.target.classList.remove("invalid");
      }
    }

    if (e.target.name == "password2") {
      if (e.target.value !== registro.password) {
        setError({ ...error, [e.target.name]: true });
        return (e.target.className = "invalid");
      } else {
        setError({ ...error, [e.target.name]: false });
        return e.target.classList.remove("invalid");
      }
    }
  };

  //=================================//

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      dispatch(validarToken(token))
        .then(() => navigate("/"))
        .catch((error) => console.log(error.response.data));
    }
  }, []);

  return (
    <div className="Registro">
      <form onSubmit={handleSubmit}>
        <h1>Registrarse</h1>
        <label>Nombre</label>
        <br />
        <input
          onBlur={validateData}
          onChange={handleChange}
          value={registro.first_name}
          name="first_name"
          type="text"
          placeholder="Nombre (min 3 caracteres)"
        />
        <br />
        <br />
        <label>Apellido</label>
        <br />
        <input
          onBlur={validateData}
          onChange={handleChange}
          value={registro.last_name}
          name="last_name"
          type="text"
          placeholder="Apellido (min 3 caracteres)"
        />
        <br />
        <br />
        <label>Username</label>
        <br />
        <input
          onBlur={validateData}
          onChange={handleChange}
          value={registro.username}
          name="username"
          type="text"
          placeholder="Username (min 3 caracteres)"
        />
        <br />
        <br />
        <label>Email</label>
        <br />
        <input
          onBlur={validateData}
          onChange={handleChange}
          value={registro.email}
          name="email"
          type="text"
          placeholder="Email - Correo electronico"
        />
        <br />
        <br />
        <label>Contraseña</label>
        <br />
        <input
          onChange={handleChange}
          onBlur={validateData}
          value={registro.password}
          name="password"
          type="password"
          placeholder="Contraseña (min 6 caracteres)"
        />
        <br />
        <br />
        <label>Repetir Contraseña</label>
        <br />{" "}
        <input
          onChange={handleChange}
          onBlur={validateData}
          // onChange={handlePassword}
          name="password2"
          type="password"
          placeholder="Repetir Contraseña"
        />
        <br />
        <br />
        <button
          disabled={
            error.first_name ||
            error.last_name ||
            error.username ||
            error.email ||
            error.password ||
            error.password2
          }
        >
          {cargando ? <img src={load} alt="Cargando" /> : "Registrarse"}
        </button>
        <p className="yacuenta">
          Ya tienes una cuente? <Link to="/login">Inicia Session</Link>
        </p>
      </form>
      <div className="logoIMG">
        <img src={soportexd} alt="Icono Soporte" />
        <div>
          <p>
            Coloca un correo que estes usando ya que se pedira que lo{" "}
            <span className="resaltar">VERIFIQUES</span>
          </p>
          <p>
            Usa una contraseña de al menos{" "}
            <span className="resaltar">6 digitos</span>
          </p>
          <p>
            Elige un <span className="resaltar">nombre de usuario unico</span>{" "}
            ya que no se pueden repetir (Puedes cambiarlo despues)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
