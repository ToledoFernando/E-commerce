import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/action";
import ProductsCard from "../../components/cardProducts/ProductsCard";
import Filtros from "../../components/filtros/Filtros";
import Paginado from "../../components/paginadoUsers/Paginado";
import Marcas from "../../components/filtros/Marcas";
import "./products.scss";

function Products() {
  const dispatch = useDispatch();
  const productosTotal = useSelector((state) => state.products);

  const [pagActual, setPagActual] = useState(1);
  const [cantidad] = useState(30);
  const final = cantidad * pagActual;
  const inicio = final - cantidad;
  const productos = productosTotal.slice(inicio, final);

  useEffect(() => {
    if (!productos.length) dispatch(getProducts());
  }, []);

  return (
    <div className="prductos">
      <Filtros />
      <div className="pr">
        <div className="br">
          <input className="buscarProducto" type="text" placeholder="Buscar" />
          <button>Buscar</button>
        </div>
        <div className="divProductos">
          <Marcas />
          <div className="productosCards">
            {!productos.length ? (
              <h1>Cargando</h1>
            ) : (
              <>
                {productos.map((producto) => (
                  <ProductsCard key={producto.id} producto={producto} />
                ))}
              </>
            )}
            <Paginado
              value={productosTotal.length}
              cantidad={cantidad}
              set={setPagActual}
              pagAct={pagActual}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
