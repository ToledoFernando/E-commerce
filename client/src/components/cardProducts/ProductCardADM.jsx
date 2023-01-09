import { Link } from "react-router-dom";

function ProductCardADM({ producto }) {
  console.log(producto);
  return (
    <div id={producto.id}>
      <img
        src={producto.productIMG}
        id={producto.imgid}
        width="300"
        height="300"
      />
      <p>{producto.name}</p>
      <p>{producto.marca.name}</p>
      <p>{producto.description}</p>
      <p>Precio: {producto.price}</p>
      {producto.oferta ? <p>Oferta: {producto.oferta}</p> : null}
      <p>Estado: {producto.status ? "Activado" : "Desactivado"}</p>
      <p>Producto creado {producto.createdAt.slice(0, 10)}</p>
      <ul>
        <p>Categorias del producto:</p>
        {producto.categories.map((cat) => (
          <li key={cat.rel.categoryId}>{cat.name}</li>
        ))}
      </ul>
      <button>
        <Link to={`edit/${producto.id}`}>Editar</Link>
      </button>
    </div>
  );
}

export default ProductCardADM;
