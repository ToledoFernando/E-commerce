import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormAddres() {
  const navigate = useNavigate();
  const [envio, setEnvio] = useState("");

  const initial = {
    local: false,
    calle: "",
    numero: "",
    localidad: "",
    ciudad: "",
    descripcion: "",
    envio: "",
  };

  const [form, setForm] = useState(initial);

  const enviarPor = (e) => {
    if (e.target.checked) {
      setEnvio(e.target.name);
      setForm({ ...form, envio: e.target.name });
    } else {
      setEnvio("");
      setForm({ ...form, envio: "" });
    }
  };

  const local = (e) => {
    if (e.target.checked) {
      setForm({ ...form, local: true });
    } else {
      setForm({ ...form, local: false });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("pay");
  };

  return (
    <div>
      <form>
        <div>
          <div>
            <p>
              Calle<span className="res">*</span>
            </p>
            <input
              disabled={form.local}
              name="calle"
              onChange={handleChange}
              value={form.calle}
              type="text"
              placeholder="Nombre de la calle"
            />
          </div>
          <div>
            <p>
              Numero<span className="res">*</span>
            </p>
            <input
              disabled={form.local}
              type="text"
              placeholder="N°"
              name="numero"
              onChange={handleChange}
              value={form.numero}
            />
          </div>
        </div>
        <p>
          Localidad<span className="res">*</span>
        </p>
        <input
          disabled={form.local}
          type="text"
          name="localidad"
          onChange={handleChange}
          value={form.localidad}
          placeholder="Localidad"
        />
        <p>
          Ciudad<span className="res">*</span>
        </p>
        <input
          type="text"
          disabled={form.local}
          name="ciudad"
          onChange={handleChange}
          value={form.ciudad}
          placeholder="Ciudad"
        />
        <p>Descipcion</p>
        <textarea
          name="descripcion"
          disabled={form.local}
          onChange={handleChange}
          value={form.descripcion}
          placeholder="ej: Casa amarilla con rejas negras"
          cols="30"
          rows="10"
        ></textarea>
        <div className="advertencia">
          <h4>Importante</h4>
          <p>Los envios se pagan en el destino y quedan acargo del comprador</p>
        </div>
        <input
          type="checkbox"
          disabled={form.local}
          name="andreani"
          onChange={enviarPor}
          checked={envio == "andreani"}
        />
        <label>Andreani</label>
        <input
          type="checkbox"
          disabled={form.local}
          name="viaCargo"
          onChange={enviarPor}
          checked={envio == "viaCargo"}
        />
        <label>Via Cargo</label>
        <input
          type="checkbox"
          name="correoArgentino"
          disabled={form.local}
          onChange={enviarPor}
          checked={envio == "correoArgentino"}
        />
        <label>Correo Argentino</label>
        <br />
        <br />
        <input type="checkbox" name="local" onChange={local} />
        <label>Retiro por el Local</label>
        <p>El producto se entregara a clientes con dni </p>
        <br />
        <button
          disabled={
            !form.local &&
            (form.calle.length < 3 ||
              form.numero.length < 1 ||
              form.ciudad.length < 3 ||
              form.localidad.length < 3 ||
              form.envio.length < 3)
          }
          onClick={handleSubmit}
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}

export default FormAddres;
