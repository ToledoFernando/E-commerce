import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsCopy,
  searchProduct,
  updateProduct,
} from "../../../store/action";
import lupa from "../../../img/lupa.png";
import swal from "sweetalert";
import "../../../components/cardProducts/ProductsADM.scss";

function ListProductAdmin() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [product, setProduct] = useState("");

  const upper = (text) => {
    const pri = text[0].toUpperCase();
    return pri + text.slice(1, text.length);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleChange = (e) => {
    setProduct(e.target.value);
  };
  const search = () => {
    try {
      if (!product.length) return dispatch(getProductsCopy());
      dispatch(searchProduct(product, products));
      setProduct("");
    } catch (error) {
      swal("Error", error.message, "error").then(() =>
        dispatch(getProductsCopy())
      );
    }
  };

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
    <div className="listAdmin">
      <h1>
        Lista de <span className="res">Productos</span>
      </h1>
      <div className="buscarProducto">
        <input
          autoComplete="off"
          placeholder="Buscar Producto"
          type="search"
          name="buscarProduct"
          value={product}
          onChange={handleChange}
        />
        <label id="aviso">
          *Click en la lupa para buscar (si el campo esta vacio devolvera todos
          los usuarios)*
        </label>
        <button onClick={search}>
          <img src={lupa} alt="buscar" />
        </button>
      </div>
      {!products.length ? (
        <h1>Cargando...</h1>
      ) : (
        <div className="productAdminList">
          {products.map((producto) => {
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
          })}
        </div>
      )}
    </div>
  );
}

export default ListProductAdmin;
