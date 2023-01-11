import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { updateProduct } from "../../../store/action";
import { deleteImg } from "../config/firebase";
import swal from "sweetalert";
import "./EdithProduct.scss";

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
    swal({
      title: "Seguro de Salir",
      text: "Los datos cambiados no se van a actualizar",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate(-1);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenUser");
      await dispatch(updateProduct(data, token));
      swal({
        title: "Actualizado",
        text: "Los datos se actualizaron con exito",
        icon: "success",
      });
      navigate(-1);
    } catch (error) {
      console.log("ERROR");
      console.log(error.message);
    }
  };

  const deleteProduct = async () => {
    try {
      swal({
        title: "Seguro de Eliminar",
        text: "El producto se eliminara de la base de datos (incluye la imagen alojada en FireStore)",
        icon: "warning",
        dangerMode: true,
      }).then(async (input) => {
        if (input) {
          const token = localStorage.getItem("tokenUser");
          deleteImg(img.current.id);
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/products/deleteProduct/${id}`,
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          swal({
            title: "Eliminado",
            text: "Producto eliminado con exito",
            icon: "success",
          });
          navigate(-1);
        }
      });
    } catch (error) {
      console.log("Error");
      console.log(error.message);
    }
  };

  return (
    <div className="editarProducto">
      {!data.name ? (
        <p>Cargando...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <img
                src={data.productIMG}
                id={data.imgid}
                ref={img}
                width="300"
                height="300"
              />
              <div className="option">
                <button type="button" onClick={cancelar}>
                  Cancelar
                </button>
                <button type="submit">Guardar</button>
                <button type="button" onClick={deleteProduct}>
                  Eliminar
                </button>
              </div>
            </div>
            <div className="datos">
              <div>
                <p>Titulo</p>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  value={data.name}
                />
              </div>

              <div>
                <p>Descripcion</p>
                <textarea
                  onChange={handleChange}
                  cols="30"
                  name="description"
                  rows="10"
                  value={data.description}
                ></textarea>
              </div>

              <div>
                <label>Precio:</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="price"
                  value={data.price}
                />
              </div>

              <div>
                <label>oferta: </label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="oferta"
                  value={data.oferta}
                />
                <p className="info">Dejar en 0 para que no tenga oferta</p>
              </div>

              <div className="check">
                <label>
                  Estado:{" "}
                  {data.status ? (
                    <span className="atc">Activado</span>
                  ) : (
                    <span className="des">Desactivado</span>
                  )}
                </label>
                <div className="checkbox">
                  <input
                    onChange={checkedChange}
                    type="checkbox"
                    name="status"
                    checked={data.status}
                    id="checkbox"
                  />
                  <label htmlFor="checkbox"></label>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default EdithProduct;
