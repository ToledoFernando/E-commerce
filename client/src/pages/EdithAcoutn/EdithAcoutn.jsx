import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateAcout } from "../../store/action";
import iconM from "./iconM.png";
import iconF from "./iconF.png";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenUser");
      await dispatch(updateAcout(form, token));
      alert("usuario actualizado");
      navigate(-1);
    } catch (error) {
      alert(error.response.data.Error);
    }
  };

  useEffect(() => {
    setForm({
      _id: misDatos._id,
      first_name: misDatos.first_name,
      last_name: misDatos.last_name,
      profileIMG: misDatos.profileIMG,
      username: misDatos.username,
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {form.profileIMG ? (
          <img width="300" height="300" src={iconF} alt={form.username} />
        ) : (
          <img width="300" height="300" src={iconM} alt={form.username} />
        )}
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
        <label>Nombre</label>
        <input
          onChange={handleChange}
          type="text"
          value={form.first_name}
          name="first_name"
        />
        <br />
        <label>Toledo</label>
        <input
          onChange={handleChange}
          type="text"
          value={form.last_name}
          name="last_name"
        />
        <br />
        <label>Username</label>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          value={form.username}
        />
        <button type="button" onClick={() => navigate(-1)}>
          Cancelar
        </button>
        <button type="submit">Actualizar datos</button>
      </form>
    </div>
  );
}

export default EdithAcoutn;
