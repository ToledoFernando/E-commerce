import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filtroCategory,
  getCategory,
  getProductsCopy,
} from "../../store/action";
import "./Filtros.scss";
import swal from "sweetalert";

function Filtros() {
  const categorias = useSelector((state) => state.categorys);
  const dispatch = useDispatch();
  const filtros = useRef();

  useEffect(() => {
    if (!categorias.length) dispatch(getCategory());
    window.addEventListener("scroll", (e) => {
      try {
        if (Math.round(e.target.scrollingElement.scrollTop) >= 20) {
          filtros.current.style.boxShadow = "0px 8px 10px #0000001e";
        } else {
          filtros.current.style.boxShadow = "none";
        }
      } catch (error) {} // esto es solo para mantener la consola limpia
      //al estar en otra componente el nav lanza advertencias molestas por lo que no se estaba renderizando
    });
  }, []);

  const filtrar = (name) => {
    try {
      dispatch(filtroCategory(name));
    } catch (error) {
      swal("OPS!!", error.message, "error");
    }
  };
  return (
    <div className="filtros" ref={filtros}>
      <ul>
        <li>
          <button className="Todos" onClick={() => dispatch(getProductsCopy())}>
            Todos
          </button>
        </li>
        <div className="marcas">
          {categorias?.map((categoria) => (
            <li key={categoria.id}>
              <button onClick={() => filtrar(categoria.name)}>
                {categoria.name}
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default Filtros;
