import "./Filtros.scss";
import { useState } from "react";

function Filtros() {
  const [precio, setPrecio] = useState(5000);

  const handleChange = (e) => {
    setPrecio(e.target.value);
  };

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
        <li>
          <button>marca 1</button>
        </li>
        <li>
          <button>marca 2</button>
        </li>
        <li>
          <button>marca 3</button>
        </li>
        <li>
          <button>marca 4</button>
        </li>
        <li>
          <button>marca 5</button>
        </li>
        <li>
          <button>marca 6</button>
        </li>
        <li>
          <button>marca 7</button>
        </li>
        <li>
          <button>marca 8</button>
        </li>
        <li>
          <button>marca 9</button>
        </li>
        <li>
          <button>marca 10</button>
        </li>
        <li>
          <button>marca 11</button>
        </li>
        <li>
          <button>marca 12</button>
        </li>
        <li>
          <button>marca 13</button>
        </li>
        <li>
          <button>marca 14</button>
        </li>
      </ul>
    </div>
  );
}

export default Filtros;
