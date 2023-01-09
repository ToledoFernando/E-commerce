import { getProducts } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import ProductCardADM from "../../../components/cardProducts/ProductCardADM";

function ProductsList() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {!productos.length ? (
        <p>Cargando....</p>
      ) : (
        productos.map((producto) => (
          <ProductCardADM key={producto.id} producto={producto} />
        ))
      )}
    </div>
  );
}

export default ProductsList;
