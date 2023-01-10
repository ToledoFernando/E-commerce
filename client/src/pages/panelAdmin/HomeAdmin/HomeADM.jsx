import "./HomeADM.scss";

function HomeADM() {
  return (
    <div className="homeADM">
      <div className="titulo">
        <h1>Bienvenido al panel administrador </h1>
        <h2>
          de <span>Salon Genesis</span>
        </h2>
      </div>
      <div className="info">
        <p>Desde este panel podra controlar los datos de la paginas</p>
        <div className="listas">
          <ul>
            <li>Eliminar cuentas</li>
            <li>Suspender cuentas</li>
            <li>Asignar roles a Usuarios</li>
            <li>Agregar categorias y marcas</li>
          </ul>
          <ul>
            <li>Agregar productos</li>
            <li>Eliminar Productos</li>
            <li>Desactivar productos temporalmente</li>
            <li>Ver listados de compras por usuarios</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeADM;
