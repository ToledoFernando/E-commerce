import "./products.scss";

function ProductsCard({ producto }) {
  const upper = (text) => {
    const pri = text[0].toUpperCase();
    return pri + text.slice(1, text.length);
  };

  return (
    <div className="producto">
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
}

export default ProductsCard;
