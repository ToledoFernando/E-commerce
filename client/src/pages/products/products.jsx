import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  return (
    <div>
      {!productos.length ? (
        <h1>Cargando</h1>
      ) : (
        productos.map((producto) => {
          return (
            <div key={producto._id}>
              <img
                src={producto.productIMG}
                id={producto.imgid}
                width="300"
                height="300"
              />
              <p>{producto.name}</p>
              <p>{producto.description}</p>
              {producto.oferta ? (
                <p>Precio: {producto.oferta}</p>
              ) : (
                <p>Precio: {producto.price}</p>
              )}
              <button onClick={() => navigate(`detailP/${producto._id}`)}>
                Ver Detalle
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Products;
