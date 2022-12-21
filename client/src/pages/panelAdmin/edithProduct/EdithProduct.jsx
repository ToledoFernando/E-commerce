import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { updateProduct } from "../../../store/action";
import { deleteImg } from "../config/firebase";

function EdithProduct() {
  const { id } = useParams();

  const initial = {
    id: id,
    imgid: "",
    productIMG: "",
    name: "",
    description: "",
    price: 0,
    oferta: 0,
    status: true,
  };

  const img = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(initial);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/detail/${id}`)
      .then((result) =>
        setData({
          ...data,
          imgid: result.data.imgid,
          productIMG: result.data.productIMG,
          name: result.data.name,
          description: result.data.description,
          price: result.data.price,
          oferta: result.data.oferta,
          status: result.data.status,
        })
      );
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const checkedChange = (e) => {
    setData({ ...data, status: e.target.checked });
  };

  const cancelar = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenUser");
      await dispatch(updateProduct(data, token));
      alert("Producto modificado con exito");
      navigate(-1);
    } catch (error) {
      console.log("ERROR");
      console.log(error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      if (confirm("Seguro de eliminar el producto?")) {
        const token = localStorage.getItem("tokenUser");
        deleteImg(img.current.id);
        const result = await axios.delete(
          `${import.meta.env.VITE_API_URL}/products/deleteProduct/${id}`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        alert("Producto eliminado con exito");
        navigate(-1);
      }
    } catch (error) {
      console.log("Error");
      console.log(error.message);
    }
  };

  return (
    <div>
      {!data.name ? (
        <p>Cargando...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <img
              src={data.productIMG}
              id={data.imgid}
              ref={img}
              width="300"
              height="300"
            />
            <button type="button" onClick={deleteProduct}>
              Eliminar
            </button>
            <br />
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={data.name}
            />
            <br />
            <textarea
              onChange={handleChange}
              cols="30"
              name="description"
              rows="10"
              value={data.description}
            ></textarea>
            <br />
            <label>Precio:</label>
            <input
              onChange={handleChange}
              type="number"
              name="price"
              value={data.price}
            />
            <br />
            <label>oferta: </label>
            <input
              onChange={handleChange}
              type="number"
              name="oferta"
              value={data.oferta}
            />
            <label>Dejar en 0 para que no tenga oferta</label>
            <br />
            <label>Estado: {data.status ? "Activado" : "Desactivado"}</label>
            <input
              onChange={checkedChange}
              type="checkbox"
              name="status"
              checked={data.status}
            />
            <br />
            <button type="button" onClick={cancelar}>
              Cancelar
            </button>
            <button type="submit">Guardar</button>
          </form>
        </>
      )}
    </div>
  );
}

export default EdithProduct;
