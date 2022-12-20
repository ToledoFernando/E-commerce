import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { validarToken } from "../../store/action";
import md5 from "md5";

const initial = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

function Registro() {
  const [registro, setRegistro] = useState(initial);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      registro.password = md5(registro.password);
      const xd = await dispatch(register(registro));
      navigate("/about");
    } catch (error) {
      console.log("Ocurrio un error");
      console.log(error.response.data.Error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    dispatch(validarToken(token))
      .then(() => navigate("/about"))
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <br />
        <input
          onChange={handleChange}
          value={registro.first_name}
          name="first_name"
          type="text"
          placeholder="Nombre"
        />
        <br />
        <br />
        <label>Apellido</label>
        <br />
        <input
          onChange={handleChange}
          value={registro.last_name}
          name="last_name"
          type="text"
          placeholder="Apellido"
        />
        <br />
        <br />
        <label>Username</label>
        <br />
        <input
          onChange={handleChange}
          value={registro.username}
          name="username"
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <label>Email</label>
        <br />
        <input
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
          value={registro.password}
          name="password"
          type="password"
          placeholder="Contraseña"
        />
        <br />
        <br />
        <label>Repetir Contraseña</label>
        <br /> <input type="password" placeholder="Repetir Contraseña" />
        <br />
        <br />
        <button>Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
