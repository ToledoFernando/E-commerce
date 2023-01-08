import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import ProductsCard from "../../components/cardProducts/ProductsCard";
import Filtros from "../../components/filtros/Filtros";
import "./products.scss";

function Products() {
  const filtrosMenu = useRef();
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);
  const [fill, setFill] = useState(false);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  const verFiltros = (b) => {
    console.log(b);
    setFill(b);
  };

  return (
    <div className="prductos">
      <button className="verFiltros" onClick={() => verFiltros(!fill)}>
        X
      </button>
      <div
        className={fill ? "divFiltros view" : "divFiltros"}
        ref={filtrosMenu}
      >
        <Filtros />
      </div>
      <div className="divProductos">
        <span
          onClick={() => setFill(false)}
          className={fill ? "viewF t" : "viewF"}
        ></span>
        {!productos.length ? (
          <h1>Cargando</h1>
        ) : (
          productos.map((producto) => (
            <ProductsCard key={producto._id} producto={producto} />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
