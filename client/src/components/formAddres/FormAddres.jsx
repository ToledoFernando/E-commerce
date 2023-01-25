import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setDomicilio } from "../../store/action";
import "./FormAddres.scss";

function FormAddres() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [envio, setEnvio] = useState("");
  const { id } = useParams();

  const initial = {
    local: false,
    calle: "",
    numero: "",
    localidad: "",
    ciudad: "",
    descripcion: "",
    envio: "",
    phone: "",
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
    const token = localStorage.getItem("tokenUser");
    dispatch(setDomicilio(form));
    if (id.length > 6) return navigate("pay");
    navigate(`/payment/${token}/ar`);
  };

  return (
    <div className="address">
      <form>
        <h1>
          Agregar <span className="res">Direccion</span>
        </h1>
        <p className="advdata">
          Datos con <span className="res">*</span> son Obligatorios
        </p>
        <div className="cllnum">
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
        <div className="local">
          <div>
            <p>
              Localidad<span className="res">*</span>
            </p>
            <input
              disabled={form.local}
              type="text"
              name="localidad"
              className="localidad"
              onChange={handleChange}
              value={form.localidad}
              placeholder="Localidad"
            />
          </div>
        </div>
        <div className="ciud">
          <div>
            <p>
              Ciudad<span className="res">*</span>
            </p>
            <input
              type="text"
              name="ciudad"
              disabled={form.local}
              onChange={handleChange}
              value={form.ciudad}
              placeholder="Ciudad"
            />
          </div>
        </div>
        <div className="telf">
          <div>
            <p>
              Telefono <span className="res">*</span>
            </p>
            <input
              type="text"
              name="phone"
              placeholder="Numero de Contacto"
              disabled={form.local}
              onChange={handleChange}
              value={form.phone}
            />
          </div>
        </div>
        <div className="desc">
          <div>
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
          </div>
        </div>
        <div className="advertencia">
          <h2>Importante</h2>
          <p>
            El envio de los productos se abonan en el destino y quedara a cargo
            del comprador. Para mas informacion sobre los envios a domicilio
            dejanos tu consulta por{" "}
            <a href="https://wa.me/+5493886471251" target="_blank">
              WhatsApp.
            </a>
          </p>
        </div>
        <div className="sucursal">
          <label>
            <input
              type="checkbox"
              disabled={form.local}
              name="andreani"
              onChange={enviarPor}
              checked={envio == "andreani"}
            />
            <span>Andreani</span>
          </label>
          <label>
            <input
              type="checkbox"
              disabled={form.local}
              name="viaCargo"
              onChange={enviarPor}
              checked={envio == "viaCargo"}
            />
            <span>Via Cargo</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="correoArgentino"
              disabled={form.local}
              onChange={enviarPor}
              checked={envio == "correoArgentino"}
            />
            <span>Correo Argentino</span>
          </label>
        </div>
        <br />
        <br />
        <div className="wrapper">
          <div className="switch_box box_1">
            <input
              type="checkbox"
              className="switch_1"
              name="local"
              onChange={local}
            />
            <label>Retiro por el Local</label>
          </div>
        </div>
        <p className="advRL">El producto se entregara a clientes con dni </p>
        <br />
        {form.local ? (
          <div className="mapa">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.0798107356636!2d-64.32501211771647!3d-23.137530460467108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x940ff5e57bf6c001%3A0xf5b8511d0a639c77!2sO&#39;Higgins%2054%2C%20A4530%20San%20Ramon%20de%20la%20Nueva%20Oran%2C%20Salta!5e0!3m2!1ses!2sar!4v1674447092586!5m2!1ses!2sar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div>
              <p>- San Ramon de la Nueva Oran - Salta</p>
              <p>- O'Higgins 54</p>
              <p>- Salon Genesis</p>
            </div>
          </div>
        ) : null}
        <br />
        <br />

        <div className="buton">
          <button
            className="siguiente"
            disabled={
              !form.local &&
              (form.calle.length < 3 ||
                form.numero.length < 1 ||
                form.ciudad.length < 3 ||
                form.localidad.length < 3 ||
                form.envio.length < 3 ||
                form.phone.length < 5)
            }
            onClick={handleSubmit}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAddres;
