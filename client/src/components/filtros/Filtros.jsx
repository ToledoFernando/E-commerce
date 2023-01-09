import "./Filtros.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarcas } from "../../store/action";

function Filtros() {
  const [precio, setPrecio] = useState(5000);
  const marcas = useSelector((state) => state.marcas);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPrecio(e.target.value);
  };

  useEffect(() => {
    if (!marcas.length) dispatch(getMarcas());
  }, []);

  return (
    <div className="filtros">
      <ul>
        <li>
          <p>Rando de precio</p>
          <p>min-300 max-5000</p>
          <input
            type="range"
            min="300"
            max="5000"
            onChange={handleChange}
            value={precio}
          />{" "}
          <button>Filtrar</button>
          <p>{precio}</p>
        </li>
        {marcas?.map((marca) => (
          <li key={marca.id}>{marca.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Filtros;
