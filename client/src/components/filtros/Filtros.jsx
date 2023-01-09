import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMarcas } from "../../store/action";
import { Link } from "react-router-dom";
import "./Filtros.scss";

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
          <p>Desde 300 a {precio}</p>
        </li>
        {marcas?.map((marca) => (
          <li key={marca.id}>
            <button>{marca.name}</button>
          </li>
        ))}
        <li>
          <button>Filtrar</button>
        </li>
        <li>
          <Link to="/products">Quitar Filtros</Link>
        </li>
      </ul>
    </div>
  );
}

export default Filtros;
