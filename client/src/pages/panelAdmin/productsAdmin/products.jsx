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
import imgLoad from "../../../img/loadIMG.svg";
import "./AddProduct.scss";

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
  const [cargando, setCargando] = useState(true);
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
    <div className="addProduct">
      <h1>
        Agregar <span className="resaltar">producto</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="formAdd">
          <label>
            Seleccionar una imagen<span className="res">*</span>
          </label>
          <br />
          <div className="upload">
            <label htmlFor="img">Subir Imagen</label>
            <input
              disabled={img.productIMG.length}
              accept="image/png,image/jpeg"
              type="file"
              id="img"
              name="productIMG"
              onChange={setImage}
            />
          </div>
          <br />
          <label>
            Nombre del producto<span className="res">*</span>
          </label>
          <input
            onChange={handlechange}
            value={newProduct.name}
            type="text"
            placeholder="Nombre del Producto"
            name="name"
          />
          <br />
          <label>
            Description<span className="res">*</span>
          </label>
          <textarea
            className="desc"
            onChange={handlechange}
            value={newProduct.description}
            name="description"
            placeholder="Description"
            cols="30"
            rows="10"
          ></textarea>
          <br />
          <label>
            Precio<span className="res">*</span>
          </label>
          <input
            onChange={handlechange}
            value={newProduct.price}
            type="number"
            name="price"
            placeholder="Precio"
          />
          <br />
          <p>
            Categorias<span className="res">*</span>
          </p>
          <select name="category" onChange={handleSelected}>
            {categorys?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p>
            Marcas<span className="res">*</span>
          </p>
          <select name="marcaId" onChange={handlechange}>
            {marcas?.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.name}
              </option>
            ))}
          </select>
          <label>
            Oferta<span className="res">*</span>
          </label>
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
        </div>
        <div className="loadIMG">
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
        </div>
      </form>
    </div>
  );
}
export default Products;
