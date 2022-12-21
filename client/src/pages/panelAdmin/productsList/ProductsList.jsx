import { getProducts } from "../../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
        productos.map((producto) => {
          return (
            <div key={producto._id} id={producto._id}>
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
                <Link to={`edit/${producto._id}`}>Editar</Link>
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProductsList;
