import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  agregarAcarrito,
  getProductDetail,
  getProducts,
} from "../../store/action";
import Relacionados from "../../components/rel/Relacionados";
import swal from "sweetalert";
import "./ProductDetail.scss";

function ProductDetail() {
  const productDetail = useSelector((state) => state.productDetail);
  const mismaMarca = useSelector((state) => state.mismaMarca);
  const mismaCategory = useSelector((state) => state.mismaCategory);
  const products = useSelector((state) => state.products);
  const isLogin = useSelector((state) => state.isLogin);
  const [Marcas, setMarcas] = useState(1);
  const [Categorias, setCategoria] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const img = useRef();

  const sliderMarcas = (num, b) => {
    if (b) {
      const result = Marcas + num;
      if (result < 0) setMarcas(result);
      else return setMarcas(0);
    } else {
      const result = Marcas - num;

      if (result > -920) setMarcas(result);
      else {
        setMarcas(-920);
      }
    }
  };
  const sliderCategorias = (num, b) => {
    if (b) {
      const result = Categorias + num;
      if (result < 0) setCategoria(result);
      else return setCategoria(0);
    } else {
      const result = Categorias - num;

      if (result > -400) setCategoria(result);
      else {
        setCategoria(-400);
      }
    }
  };

  const comprar = (producto) => {
    if (!isLogin) {
      return swal(
        "Debes Logearte",
        "Para realizar una compra debes de estar Logeado",
        "warning",
        {
          buttons: [true, "Iniciar Sesion"],
        }
      ).then((e) => {
        if (e) window.location.href = "/login";
      });
    }

    const token = localStorage.getItem("tokenUser");
    navigate(`/paymentOne/${token}/${producto.id}/add`);
  };

  let x = 0;
  let y = 0;

  const lupa = (e) => {
    x = x + e.movementX;
    y = y + e.movementY;

    img.current.style.transform = `scale(1.5) translate(${-(x * 0.18)}px, ${-(
      y * 0.18
    )}px)`;
  };
  const quitarLupa = (e) => {
    x = 0;
    y = 0;
    img.current.style.transform = `scale(1) translate(0px, 0px)`;
  };

  const addCart = (product) => {
    try {
      if (!isLogin) throw Error("Debes Iniciar sesion primero");
      dispatch(agregarAcarrito(product));
      swal(
        "Agregado",
        'Producto agregado con exito, revisa tu carro de compras en la seccion de "My cuenta"',
        "success"
      );
    } catch (error) {
      swal(
        "Debes Logearte",
        "Para utilizar el carro de compras debes estar Logeado",
        "warning",
        {
          buttons: [true, "Iniciar Sesion"],
        }
      ).then((e) => {
        if (e) window.location.href = "/login";
      });
    }
  };

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts()).then(() => {
        dispatch(getProductDetail(id));
      });
    } else {
      dispatch(getProductDetail(id));
    }
    window.scrollTo(0, 0);
  }, []);

  return !productDetail ? (
    <h1>Cargando...</h1>
  ) : (
    <div className="detalles">
      <div className="infoProducto">
        <button className="volver" onClick={() => navigate(-1)}>
          Volver
        </button>
        <div className="infoCompleta">
          <div className="img">
            <img
              onMouseMove={lupa}
              onMouseOut={quitarLupa}
              ref={img}
              src={productDetail.productIMG}
              alt={productDetail.name}
            />
          </div>
          <div className="masInfo">
            <div className="nm">
              <h1>{productDetail.name}</h1>
              <p>{productDetail.marca?.name}</p>
            </div>
            <div className="dc">
              <textarea
                cols="30"
                rows="10"
                value={productDetail.description?.slice("\n")}
                disabled
              ></textarea>
              <div className="cat">
                Categoria/s:{" "}
                {productDetail.categories?.map((c) => (
                  <p key={c.name}>{c.name}</p>
                ))}
              </div>
            </div>
            <div className="precio">
              Precio:
              {productDetail.oferta ? (
                <label>
                  <del>${productDetail.price}</del>${productDetail.oferta}
                </label>
              ) : (
                <label>{productDetail.price}</label>
              )}
            </div>
            <div className="comprar">
              <button
                disabled={!productDetail.status}
                onClick={() => comprar(productDetail)}
              >
                {productDetail.status ? "Comprar" : "No disponible"}
              </button>
              <button
                disabled={!productDetail.status}
                onClick={() => addCart(productDetail)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="relacionados">
        Productos <span className="res">Relacionados</span>
      </p>
      <div className="mmMarca">
        <h1>con la misma Marca </h1>
        <div className="cmp" style={{ transform: `translateX(${Marcas}px)` }}>
          {mismaMarca.map((product) => (
            <Relacionados key={product.id} producto={product} />
          ))}
        </div>
        <button className="menos" onClick={() => sliderMarcas(200, true)}>
          {"<"}
        </button>
        <button className="mas" onClick={() => sliderMarcas(200, false)}>
          {">"}
        </button>
      </div>
      <div className="mmCategory">
        <h1>En la misma categoria</h1>
        <div
          className="cmp"
          style={{ transform: `translateX(${Categorias}px)` }}
        >
          {mismaCategory.map((product) => (
            <Relacionados key={product.id} producto={product} />
          ))}
        </div>
        <button className="menos" onClick={() => sliderCategorias(200, true)}>
          {"<"}
        </button>
        <button className="mas" onClick={() => sliderCategorias(200, false)}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
