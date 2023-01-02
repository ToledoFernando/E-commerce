import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import { useNavigate } from "react-router-dom";
import "./products.scss";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  const upper = (text) => {
    const pri = text[0].toUpperCase();
    // console.log();
    return pri + text.slice(1, text.length);
  };

  return (
    <div className="prductos">
      {!productos.length ? (
        <h1>Cargando</h1>
      ) : (
        productos.map((producto) => {
          return (
            <div key={producto._id} className="producto">
              <img src={producto.productIMG} id={producto.imgid} />
              <p className="marca">{producto.marca}</p>
              <p>{upper(producto.name)}</p>
              {producto.oferta ? (
                <p>
                  Precio: <b>{producto.oferta}</b>
                </p>
              ) : (
                <p>Precio: {producto.price}</p>
              )}
              <div className="detalle">
                <button
                  className="verDetalle"
                  onClick={() => navigate(`detailP/${producto._id}`)}
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Products;
