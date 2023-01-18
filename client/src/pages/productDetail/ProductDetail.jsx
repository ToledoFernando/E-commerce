import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail, getProducts } from "../../store/action";
import Relacionados from "../../components/rel/Relacionados";
import swal from "sweetalert";
import "./ProductDetail.scss";

function ProductDetail() {
  const productDetail = useSelector((state) => state.productDetail);
  console.log(productDetail);
  const mismaMarca = useSelector((state) => state.mismaMarca);
  const mismaCategory = useSelector((state) => state.mismaCategory);
  const products = useSelector((state) => state.products);
  const isLogin = useSelector((state) => state.isLogin);

  const [Marcas, setMarcas] = useState(1);
  const [Categorias, setCategoria] = useState(1);

  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts()).then(() => {
        dispatch(getProductDetail(id));
      });
    } else {
      dispatch(getProductDetail(id));
    }
  }, []);

  const sliderMarcas = (num, b) => {
    if (b) {
      const result = Marcas + num;
      if (result < 0) setMarcas(result);
      else return setMarcas(0);
    } else {
      const result = Marcas - num;

      if (result > -1290) setMarcas(result);
      else {
        setMarcas(-1290);
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

      if (result > -800) setCategoria(result);
      else {
        setCategoria(-800);
      }
    }
  };

  const comprar = () => {
    if (!isLogin)
      swal(
        "Debes Logearte",
        "Para realizar una compra debes de estar Logeado",
        "warning"
      ).then(() => (window.location.href = "/login"));
  };

  return !productDetail ? (
    <h1>Cargando...</h1>
  ) : (
    <div className="detalles">
      <div className="infoProducto">
        <button onClick={() => navigate(-1)}>Volver</button>
        <div className="infoCompleta">
          <img src={productDetail.productIMG} alt={productDetail.name} />
          <div className="masInfo">
            <h1>{productDetail.name}</h1>
            <p>Marca: {productDetail.marca?.name}</p>
            <div>
              Categoria/s:{" "}
              {productDetail.categories?.map((c) => (
                <p key={c.name}>{c.name}</p>
              ))}
            </div>
            <p>{productDetail.description}</p>
            <p>
              {productDetail.category?.map((e) => (
                <label key={e}>{e}</label>
              ))}
            </p>
            <p>
              {productDetail.oferta ? (
                <label>
                  <del>{productDetail.price}</del>
                  {productDetail.oferta}
                </label>
              ) : (
                <label>{productDetail.price}</label>
              )}
            </p>
            <p>{`${productDetail.createdAt}`.slice(0, 10)}</p>
            <div className="comprar">
              <button disabled={!productDetail.status} onClick={comprar}>
                {productDetail.status ? "Comprar" : "No disponible"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Productos Relacionados</h1>
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
