import MenuAcount from "../../components/menuAcoutn/MenuAcount";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

function Cart() {
  const carro = useSelector((state) => state.carrito);
  const navigate = useNavigate();
  const token = localStorage.getItem("tokenUser");

  const total = (productos) => {
    let totalPagar = 0;
    productos.map((p) => {
      if (p.oferta) return (totalPagar = totalPagar + p.oferta);
      return (totalPagar = totalPagar + p.price);
    });
    return totalPagar;
  };

  return (
    <div className="cart">
      <MenuAcount />
      <div className="info">
        <h1>
          Aqui podras ver los productos guardados en tu{" "}
          <span className="res">session actual</span>
        </h1>
        <div className="productos">
          {!carro?.length ? (
            <>
              <h1>Sin productos agregados</h1>
              <div className="buscarP">
                <button onClick={() => navigate("/products")}>
                  Buscar Productos
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>Lista de Productos Agregados</h1>
              <div className="productoInfo">
                <p>
                  <b>Producto</b>
                </p>
                <p>
                  <b>Marca</b>
                </p>
                <p className="precioP">
                  <b>Precio</b>
                </p>
              </div>
              {carro?.map((product) => {
                return (
                  <div key={Math.random().toString()} className="productoInfo">
                    <p>{product.name}</p>
                    <p>{product.marca.name}</p>
                    <p className="precioP">
                      {!product.oferta
                        ? `$${product.price}`
                        : `$${product.oferta}`}
                    </p>
                  </div>
                );
              })}
              <p className="total">Total: ${total(carro)} </p>
              <div className="bPagar">
                <button
                  className="pagarB"
                  onClick={() => navigate(`/payment/${token}/ar`)}
                >
                  Pagar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
