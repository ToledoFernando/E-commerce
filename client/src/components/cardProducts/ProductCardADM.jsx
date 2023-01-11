import { useNavigate } from "react-router-dom";
import "./ProductsADM.scss";

function ProductCardADM({ producto }) {
  const navigate = useNavigate();
  const upper = (text) => {
    const pri = text[0].toUpperCase();
    return pri + text.slice(1, text.length);
  };

  return (
    <div id={producto.id} className="detalle">
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
          <span className="data">{producto.createdAt.slice(0, 10)}</span>
        </p>
        <ul>
          <p>Categorias del producto:</p>
          {producto.categories.map((cat) => (
            <li key={cat.rel.categoryId}>{cat.name}</li>
          ))}
        </ul>
      </div>
      <div className="editar">
        <button onClick={() => navigate(`edit/${producto.id}`)}>Editar</button>
      </div>
    </div>
  );
}

export default ProductCardADM;
