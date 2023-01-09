import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import ProductsCard from "../../components/cardProducts/ProductsCard";
import Filtros from "../../components/filtros/Filtros";
import "./products.scss";

function Products() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  return (
    <div className="prductos">
      <Filtros />
      <div className="divProductos">
        {!productos.length ? (
          <h1>Cargando</h1>
        ) : (
          productos.map((producto) => (
            <ProductsCard key={producto.id} producto={producto} />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
