import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MenuAcount.scss";

function MenuAcount() {
  return (
    <div className="menuAcount">
      <h1>Menu</h1>
      <ul>
        <li>
          <Link to="/myAcount">Mi Perfil</Link>
        </li>
        <li>
          <Link to="/myAcount/cartShopping">Mi carrito de compras</Link>
        </li>
        <li>
          <Link to="/myAcount/historiShop">Historial de compras</Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuAcount;
