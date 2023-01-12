import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  deleteMarca,
  getCategory,
  getMarcas,
  postCategory,
  postMarca,
} from "../../../store/action";
import swal from "sweetalert";
import "./AddCM.scss";

function AddCM() {
  const [category, setCategory] = useState({ category: "" });
  const [marca, setMarca] = useState({ marca: "" });
  const dispatch = useDispatch();
  const marcas = useSelector((state) => state.marcas);
  const categorys = useSelector((state) => state.categorys);

  const handleChange = (e, b) => {
    if (b) {
      setCategory({ ...category, [e.target.name]: e.target.value });
    } else {
      setMarca({ ...marca, [e.target.name]: e.target.value });
    }
  };

  const deleteCM = async (n, b) => {
    try {
      const tokenUser = localStorage.getItem("tokenUser");
      if (b) {
        await dispatch(deleteCategory(n, tokenUser));
        await dispatch(getCategory());
        swal("Eliminado", `La categoria ${n} se elimino`, "success");
      } else {
        await dispatch(deleteMarca(n, tokenUser));
        await dispatch(getMarcas());
        swal("Eliminado", `La marca ${n} se elimino`, "success");
      }
    } catch (error) {
      swal("Ocurrio un error", `${error.message}`, "error");
    }
  };

  const handleSubmit = async (e, b) => {
    e.preventDefault();
    const token = localStorage.getItem("tokenUser");
    try {
      if (b) {
        await dispatch(postCategory(category, token));
        await dispatch(getCategory());
        swal(
          "Categoria agregada",
          `Se agrego la nueva categoria ${category.category}`,
          "success"
        );
        setCategory({ category: "" });
      } else {
        await dispatch(postMarca(marca, token));
        await dispatch(getMarcas());
        swal(
          "Marca agregada",
          `Se agrego la nueva Marca ${marca.marca}`,
          "success"
        );
        setMarca({ marca: "" });
      }
    } catch (error) {
      swal("Ocurrio un error", `${error.message}`, "error");
    }
  };

  useEffect(() => {
    if (!marcas.length) dispatch(getMarcas());
    if (!categorys.length) dispatch(getCategory());
  }, []);
  return (
    <div className="CM">
      <h1 className="tituloAddMC">
        Agregar <span className="res">Marca</span> o{" "}
        <span className="res">Categoria</span>
      </h1>
      <div className="addCM">
        <div className="addCategory">
          <p>Nombre de la Categoria</p>
          <form onSubmit={(e) => handleSubmit(e, true)}>
            <input
              type="text"
              name="category"
              onChange={(e) => handleChange(e, true)}
              placeholder="Nombre"
              value={category.category}
            />
            <button>Agregar</button>
          </form>
          <div className="misCategory">
            {categorys.map((ca) => (
              <div key={ca.id} className="category">
                <label>{ca.name}</label>
                <button onClick={() => deleteCM(ca.name, true)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="addMarca">
          <p>Nombre de la marca</p>
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <input
              type="text"
              name="marca"
              onChange={(e) => handleChange(e, false)}
              placeholder="Nombre"
              value={marca.marca}
            />
            <button>Agregar</button>
          </form>
          <div className="misMarcas">
            {marcas.map((ca) => (
              <div key={ca.id} className="marcas">
                <label>{ca.name}</label>
                <button onClick={() => deleteCM(ca.name, false)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCM;
