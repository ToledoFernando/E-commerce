import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, updateProduct } from "../../../store/action";

function ListProductAdmin() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const cambiarEstado = async (id, estado) => {
    const update = {
      id,
      status: estado,
    };
    const token = localStorage.getItem("tokenUser");
    await dispatch(updateProduct(update, token));
    dispatch(getProducts());
  };

  return (
    <div>
      {!products.length ? (
        <h1>Cargando...</h1>
      ) : (
        products.map((producto) => {
          return (
            <div key={producto._id} id={producto._id}>
              <p>{producto.name}</p>
              <p>{producto.description}</p>
              <button
                onClick={() => cambiarEstado(producto._id, !producto.status)}
              >
                {producto.status ? "Activado" : "Desactivado"}
              </button>
              <br />
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListProductAdmin;
