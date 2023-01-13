import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProduct } from "../../../store/action";
import swal from "sweetalert";
import "../../../components/cardProducts/ProductsADM.scss";

function ListProductAdmin() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const upper = (text) => {
    const pri = text[0].toUpperCase();
    return pri + text.slice(1, text.length);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const cambiarEstado = async (id, estado) => {
    try {
      const update = {
        id,
        status: estado,
      };
      const token = localStorage.getItem("tokenUser");
      await dispatch(updateProduct(update, token));
      dispatch(getProducts());
    } catch (error) {
      swal("Error", error.response.data.Error, "error");
    }
  };

  return (
    <div className="productAdminList">
      {!products.length ? (
        <h1>Cargando...</h1>
      ) : (
        products.map((producto) => {
          return (
            <div className="detalle" key={producto.id} id={producto.id}>
              <img
                src={producto.productIMG}
                id={producto.imgid}
                width="300"
                height="300"
              />
              <p className="titulo">{upper(producto.name)}</p>
              <p className="marca">{upper(producto.marca.name)}</p>
              <div className="description">
                <div>
                  <p>Descripcion:</p>
                  <p>{upper(producto.description)}</p>
                </div>
                <p className="precio">Precio: {producto.price}</p>
                {producto.oferta ? <p>Oferta: {producto.oferta}</p> : null}
                <p>
                  Estado:{" "}
                  {producto.status ? (
                    <span className="act">Activado</span>
                  ) : (
                    <span className="des">Desactivado</span>
                  )}
                </p>
                <p className="fecha">
                  Producto creado:{" "}
                  <span className="data">
                    {producto.createdAt.slice(0, 10)}
                  </span>
                </p>
                <ul>
                  <p>Categorias del producto:</p>
                  {producto.categories.map((cat) => (
                    <li key={cat.rel.categoryId}>{cat.name}</li>
                  ))}
                </ul>
              </div>
              <div className="button">
                <button
                  className={producto.status ? "productAct" : "productDes"}
                  onClick={() => cambiarEstado(producto.id, !producto.status)}
                >
                  {producto.status ? "Activado" : "Desactivado"}
                </button>
              </div>
              <br />
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListProductAdmin;
