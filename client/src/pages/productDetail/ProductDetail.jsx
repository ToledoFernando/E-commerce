import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductDetail, getProducts } from "../../store/action";

function ProductDetail() {
  const productDetail = useSelector((state) => state.productDetail);
  const products = useSelector((state) => state.products);
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

  return !productDetail ? (
    <h1>Cargando...</h1>
  ) : (
    <div>
      <button onClick={() => navigate(-1)}>Volver</button>
      <h1>{productDetail.name}</h1>
      <img
        src={productDetail.productIMG}
        alt={productDetail.name}
        width="300"
        height="300"
      />
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
      <p>{`${productDetail.createAt}`.slice(0, 10)}</p>
      <button disabled={!productDetail.status}>
        {productDetail.status ? "Comprar" : "No disponible"}
      </button>
    </div>
  );
}

export default ProductDetail;
