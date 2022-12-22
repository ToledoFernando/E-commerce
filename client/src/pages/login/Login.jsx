import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, validarToken } from "../../store/action";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

const initial = {
  Email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      form.password = md5(form.password);
      await dispatch(login(form));
      navigate(-1);
    } catch (error) {
      setForm(initial);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    if (token) {
      dispatch(validarToken(token))
        .then(() => navigate(-1))
        .catch((error) => {
          localStorage.clear();
        });
    }
  }, []);

  return (
    <div>
      <h1>Inisiar Sesion</h1>
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
      </form>
    </div>
  );
}

export default Login;
