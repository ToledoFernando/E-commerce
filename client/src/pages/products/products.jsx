import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import { useNavigate } from "react-router-dom";
import "./products.scss";
import ProductsCard from "../../components/cardProducts/ProductsCard";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  return (
    <div className="prductos">
      {!productos.length ? (
        <h1>Cargando</h1>
      ) : (
        productos.map((producto) => (
          <ProductsCard key={producto._id} producto={producto} />
        ))
      )}
    </div>
  );
}

export default Products;
