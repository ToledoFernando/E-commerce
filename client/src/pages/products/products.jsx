import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import { Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
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
              <p>Precio: {producto.price}</p>
              {producto.oferta ? <p>Oferta: {producto.oferta}</p> : null}
              <p>Estado: {producto.status ? "Activado" : "Desactivado"}</p>
              <p>Producto creado {producto.createAt.slice(0, 10)}</p>
              <ul>
                {producto.category.map((cat) => (
                  <li key={cat}>{cat}</li>
                ))}
              </ul>
              <button>
                <Link to={`detailP/${producto._id}`}>Ver Detalle</Link>
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Products;
