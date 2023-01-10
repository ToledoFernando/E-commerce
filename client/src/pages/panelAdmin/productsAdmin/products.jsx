import { useState } from "react";
import { upload, deleteImg } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  getMarcas,
  uploadProduct,
  validarToken,
} from "../../../store/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.scss";
import imgLoad from "../../../img/loadIMG.svg";

const initial = {
  name: "",
  description: "",
  price: 0,
  category: [],
  oferta: 0,
  marcaId: 0,
};

const initialIMG = { productIMG: "", imgid: "" };

function Products() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState(initial);
  const [img, setImg] = useState(initialIMG);
  const [cargando, setCargando] = useState(false);
  const marcas = useSelector((state) => state.marcas);
  const categorys = useSelector((state) => state.categorys);

  const handlechange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(uploadProduct(newProduct, token));
    } catch (error) {
      console.log("ocurrio un error");
      console.log(error);
    }
  };

  const setImage = async (e) => {
    setCargando(true);
    const imgUrl = await upload(e.target.files[0]);
    setImg({ productIMG: imgUrl.url, imgid: imgUrl.id });
    setNewProduct({ ...newProduct, productIMG: imgUrl.url, imgid: imgUrl.id });
    setCargando(false);
  };

  const cambiarIMG = async (id) => {
    await deleteImg(id);
    setImg(initialIMG);
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
    if (!marcas.length) dispatch(getMarcas());
    if (!categorys.length) dispatch(getCategory());
  }, []);

  return (
    <div>
      <h1>Agregar producto</h1>
      <form onSubmit={handleSubmit}>
        {cargando ? <img src={imgLoad} className="cargando" /> : null}
        {!img.productIMG.length ? null : (
          <>
            <img
              src={img.productIMG}
              alt="nuevoProducto"
              width="300"
              height="300"
            />
            <button type="button" onClick={() => cambiarIMG(img.imgid)}>
              Eliminar Imagen
            </button>
          </>
        )}
        <label>Seleccionar una imagen</label>
        <br />
        <input
          disabled={img.productIMG.length}
          accept="image/png,image/jpeg"
          type="file"
          name="productIMG"
          onChange={setImage}
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
        <p>Categorias</p>
        <select name="category" onChange={handleSelected}>
          {categorys?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <p>Marcas</p>
        <select name="marcaId" onChange={handlechange}>
          {marcas?.map((marca) => (
            <option key={marca.id} value={marca.id}>
              {marca.name}
            </option>
          ))}
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
