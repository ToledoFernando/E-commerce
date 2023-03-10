import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, validarToken } from "../../store/action";
import { useNavigate, Link } from "react-router-dom";
import md5 from "md5";
import swal from "sweetalert";
import "./Login.scss";

const initial = {
  Email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.password = md5(form.password);
    await dispatch(login(form));
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      dispatch(validarToken(token))
        .then(() => navigate("/"))
        .catch((error) => {
          swal(
            error.message,
            "Su cuenta fue suspendida, contacte con soporte",
            "warning"
          );
          localStorage.clear();
        });
    }
  }, []);

  return (
    <div className="iniciasSesion">
      <div>
        <form onSubmit={handleSubmit}>
          <label>Correo Electronico</label>
          <br />
          <input
            onChange={handleChange}
            value={form.Email}
            type="text"
            name="Email"
            placeholder="E-mail"
          />
          <br />
          <br />
          <label>Contraseña</label>
          <br />
          <input
            onChange={handleChange}
            value={form.password}
            type="password"
            name="password"
            placeholder="Password"
          />
          <br />
          <br />
          <button>Iniciar Sesion</button>
          <label className="cRegistro">
            No tiene Cuenta? <Link to="/register">Registrate</Link>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Login;
