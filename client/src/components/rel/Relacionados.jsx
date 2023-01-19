import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductDetail } from "../../store/action";
import "./Rel.scss";

function Relacionados({ producto }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
          onClick={() => {
            dispatch(getProductDetail(producto.id));
            window.location.href = '#'
        }}
        >
          Ver Detalle
        </button>
      </div>
    </div>
  );
}

export default Relacionados;
