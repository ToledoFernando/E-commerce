import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import ProductsCard from "../../components/cardProducts/ProductsCard";
import Filtros from "../../components/filtros/Filtros";
import Paginado from "../../components/paginadoUsers/Paginado";
import "./products.scss";

function Products() {
  const dispatch = useDispatch();
  const productosTotal = useSelector((state) => state.products);
  const filtro = useSelector(state => state.filtro);
  const [precio, setPrecio] = useState(5000);
  const [pagActual, setPagActual] = useState(1);
  const [cantidad] = useState(21);
  const final = cantidad * pagActual;
  const inicio = final - cantidad;
  const productos = productosTotal.slice(inicio, final);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  const handleChange = (e) => {
    setPrecio(e.target.value);
  };

  return (
    <div className="prductos">
      <Filtros />
      <div className="divProductos">
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
        {!productos.length ? (
          <h1>Cargando</h1>
        ) : (
          productos.map((producto) => (
            <ProductsCard key={producto.id} producto={producto} />
          ))
        )}
        <Paginado
          value={productosTotal.length}
          cantidad={cantidad}
          set={setPagActual}
        />
      </div>
    </div>
  );
}

export default Products;
