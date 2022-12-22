import { useState } from "react";
import { upload } from "../config/firebase";
import { useDispatch } from "react-redux";
import { uploadProduct, validarToken } from "../../../store/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initial = {
  name: "",
  description: "",
  price: 0,
  category: [],
  oferta: 0,
};

function Products() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState(initial);
  const [img, setImg] = useState();
  const [imgPreviw, setImgPreview] = useState("");

  const handlechange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const imgUrl = await upload(img);
      await dispatch(uploadProduct(newProduct, token, imgUrl));
    } catch (error) {
      console.log("ocurrio un error");
      console.log(error);
    }
  };

  const handleSelected = (e) => {
    setNewProduct({
      ...newProduct,
      category: [...newProduct.category, e.target.value],
    });
  };

  useEffect(() => {
    const userToken = localStorage.getItem("tokenUser");
    if (!userToken) navigate("/");
    dispatch(validarToken(userToken));
    setToken(userToken);
  }, []);

  return (
    <div>
      <h1>Agregar producto</h1>
      <form onSubmit={handleSubmit}>
        <label>Seleccionar una imagen</label>
        <br />
        <input
          type="file"
          name="productIMG"
          onChange={() => setImg(e.target.files[0])}
        />
        <br />
        <label>Nombre del producto</label>
        <input
          onChange={handlechange}
          value={newProduct.name}
          type="text"
          placeholder="name"
          name="name"
        />
        <br />
        <label>description</label>
        <textarea
          onChange={handlechange}
          value={newProduct.description}
          name="description"
          placeholder="description"
          cols="30"
          rows="10"
        ></textarea>
        <br />
        <label>Precio</label>
        <input
          onChange={handlechange}
          value={newProduct.price}
          type="number"
          name="price"
          placeholder="Precio"
        />
        <br />
        <select name="category" onChange={handleSelected}>
          <option value="algo1">algo1</option>
          <option value="algo2">algo2</option>
          <option value="algo3">algo3</option>
        </select>
        <label>Oferta</label>
        <input
          onChange={handlechange}
          value={newProduct.oferta}
          type="number"
          placeholder="Si no tiene oferta dejar vacio"
          name="oferta"
        />
        <br />
        <br />
        <button>Subir Producto</button>
      </form>
    </div>
  );
}
export default Products;
