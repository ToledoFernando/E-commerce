import { getProducts } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import cargando from "../../../img/load.svg";
import ProductCardADM from "../../../components/cardProducts/ProductCardADM";
import "./ProductsLists.scss";
import ProductsCard from "../../../components/cardProducts/ProductsCard";

function ProductsList() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="productsList">
      <h1>
        Lista de <span className="res">Productos</span>
      </h1>
      {!productos.length ? (
        <div className="cargando">
          <img src={cargando} alt="" />
        </div>
      ) : (
        <div className="productosLista">
          {productos.map((producto) => (
            <ProductCardADM key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsList;
