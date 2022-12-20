import React from "react";
import { Link } from "react-router-dom";
function NavBarAdmin() {
  return (
    <div>
      <Link to="AddProducts">Agregar Producto</Link>
      <Link to="products">Ver Productos</Link>
      <Link to="users">Usuarios</Link>
      <Link to="other">otros</Link>
    </div>
  );
}

export default NavBarAdmin;
