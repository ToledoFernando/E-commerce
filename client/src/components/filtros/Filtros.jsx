import { useEffect, useRef } from "react";
import cart from "../../img/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { getCategory} from "../../store/action";
import "./Filtros.scss";

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
  return (
    <div className="filtros" ref={filtros}>
      <ul>
        <li>
          <button className="Todos">Todos</button>
        </li>
        <div className="marcas">
          {categorias?.map((categoria) => (
            <li key={categoria.id}>
              <button onClick={()=>console.log(categoria.name)}>{categoria.name}</button>
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
