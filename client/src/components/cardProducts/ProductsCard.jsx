import "./products.scss";

function ProductsCard({ producto }) {
  const upper = (text) => {
    const pri = text[0].toUpperCase();
    return pri + text.slice(1, text.length);
  };

  return (
    <div className="producto">
      <img src={producto.productIMG} id={producto.imgid} />
      <p>{upper(producto.name)}</p>
      <p className="marca">{upper(producto.marca.name)}</p>
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
          onClick={() => navigate(`detailP/${producto.id}`)}
        >
          Ver Detalle
        </button>
      </div>
    </div>
  );
}

export default ProductsCard;
