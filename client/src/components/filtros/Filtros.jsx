import { useEffect, useRef } from "react";
import cart from "../../img/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { filtroCategory, getCategory, getProductsCopy} from "../../store/action";
import "./Filtros.scss";
import swal from 'sweetalert'

function Filtros() {
  const categorias = useSelector((state) => state.categorys);
  const dispatch = useDispatch();
  const filtros = useRef();

  useEffect(() => {
    if (!categorias.length) dispatch(getCategory());
    window.addEventListener("scroll", (e) => {
      if (Math.round(e.target.scrollingElement.scrollTop) >= 20) {
        filtros.current.style.boxShadow = "0px 8px 10px #0000001e";
      } else {
        filtros.current.style.boxShadow = "none";
      }
    });
  }, []);

  const filtrar = (name) => {
    try {
      dispatch(filtroCategory(name));
    } catch (error) {
      swal('OPS!!',error.message, 'error')
    }
  }
  return (
    <div className="filtros" ref={filtros}>
      <ul>
        <li>
          <button className="Todos" onClick={()=>dispatch(getProductsCopy())}>Todos</button>
        </li>
        <div className="marcas">
          {categorias?.map((categoria) => (
            <li key={categoria.id}>
              <button onClick={()=>filtrar(categoria.name)}>{categoria.name}</button>
            </li>
          ))}
        </div>

        <li>
          <button className="cart">
            <img src={cart} alt="Icon-Cart" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Filtros;
