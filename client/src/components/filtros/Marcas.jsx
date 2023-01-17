import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarcas } from "../../store/action";
import "./Marcas.scss";

function Marcas() {
  const [precio, setPrecio] = useState(5000);
  const marcas = useSelector((state) => state.marcas);
  const dispatch = useDispatch();

  const upper = (text) => {
    const pri = text[0].toUpperCase();
    return pri + text.slice(1, text.length);
  };

  const handleChange = (e) => {
    setPrecio(e.target.value);
  };

  useEffect(() => {
    if (!marcas.length) dispatch(getMarcas());
  });

  return (
    <div className="marcasOP">
      {!marcas?.length ? (
        <p>Cargando...</p>
      ) : (
        marcas.map((marca) => (
          <div key={marca.id}>
            <button>{upper(marca.name)}</button>
            <br />
          </div>
        ))
      )}
      <br />
      <div className="rango">
        <p>Rando de precio</p>
        <p>min-300 max-5000</p>
        <input
          type="range"
          min="300"
          max="5000"
          onChange={handleChange}
          value={precio}
        />{" "}
        <p>Desde 300 a {precio}</p>
      </div>
    </div>
  );
}

export default Marcas;
