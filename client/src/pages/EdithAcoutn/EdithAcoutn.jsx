import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateAcout } from "../../store/action";
import iconM from "./iconM.png";
import iconF from "./iconF.png";
import sweet from "sweetalert";
import "./EdithAcoutn.scss";

const initial = {
  first_name: "",
  last_name: "",
  profileIMG: "",
  username: "",
};

function EdithAcoutn() {
  const misDatos = useSelector((state) => state.myAcount);
  const [form, setForm] = useState(initial);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    username: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validarDatos(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenUser");
      await dispatch(updateAcout(form, token));
      sweet({
        title: "Actualizado",
        text: "Usuario actualizado con exito ",
        icon: "success",
        dangerMode: true,
      });
      navigate(-1);
    } catch (error) {
      alert(error.response.data.Error);
    }
  };

  const validarDatos = (e) => {
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
  };

  useEffect(() => {
    setForm({
      id: misDatos.id,
      first_name: misDatos.first_name,
      last_name: misDatos.last_name,
      profileIMG: misDatos.profileIMG,
      username: misDatos.username,
    });
  }, []);

  return (
    <div className="edith">
      <span className="back"></span>
      <span className="back2"></span>
      <form onSubmit={handleSubmit} className="form">
        <div className="imgInfo">
          {form.profileIMG ? (
            <img src={iconF} alt={form.username} />
          ) : (
            <img src={iconM} alt={form.username} />
          )}
          <div>
            <button
              type="button"
              onClick={() => setForm({ ...form, profileIMG: 0 })}
            >
              Masculino
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, profileIMG: 1 })}
            >
              Femenino
            </button>
          </div>
        </div>
        <label>
          <b>Nombre</b>
        </label>
        <input
          onBlur={validarDatos}
          onChange={handleChange}
          type="text"
          value={form.first_name}
          name="first_name"
        />
        <br />
        <label>
          <b>Apellido</b>
        </label>
        <input
          onBlur={validarDatos}
          onChange={handleChange}
          type="text"
          value={form.last_name}
          name="last_name"
        />
        <br />
        <label>
          <b>Username</b>
        </label>
        <input
          onBlur={validarDatos}
          onChange={handleChange}
          name="username"
          type="text"
          value={form.username}
        />
        <button
          disabled={error.first_name || error.last_name || error.username}
          className="actualizar"
          type="submit"
        >
          Actualizar datos
        </button>
        <button className="cancelar" type="button" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EdithAcoutn;
