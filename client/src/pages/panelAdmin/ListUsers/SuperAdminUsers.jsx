import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getUserCopy, searchUser } from "../../../store/action";
import lupa from "../../../img/lupa.png";
import UserCard from "../../../components/userCard/UserCard";
import cargando from "../../../img/load.svg";
import "./ListUserADM.scss";
import Paginado from "../../../components/paginado/Paginado";

function SuperAdminUsers() {
  const input = useRef();
  const cuentasTotal = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //===============================
  const [pagActual, setPagActual] = useState(1);
  const [cantidad] = useState(9);
  const final = cantidad * pagActual;
  const inicio = final - cantidad;
  const cuentas = cuentasTotal.slice(inicio, final);
  //===============================

  useEffect(() => {
    const token = localStorage.getItem("tokenUser");
    dispatch(getAllUsers(token));
  }, []);

  const onSearch = () => {
    if (!input.current.value.length) {
      dispatch(getUserCopy());
      return;
    }
    return dispatch(searchUser(input.current.value));
  };

  return (
    <div className="listUserADM">
      <h1>
        Lista de <span className="res">Usuarios</span>
      </h1>
      <label>Usuarios en Total: {cuentasTotal.length}</label>
      <div className="buscar">
        <input
          autoComplete="off"
          ref={input}
          placeholder='Buscar por "USERNAME"'
          type="search"
          name="buscar"
        />
        <label id="aviso">
          *Click en la lupa para buscar (si el campo esta vacio devolvera todos
          los usuarios)*
        </label>
        <button onClick={onSearch}>
          <img src={lupa} alt="buscar" />
        </button>
      </div>
      {!cuentas.length ? (
        <div className="cargando">
          <img src={cargando} alt="" />
        </div>
      ) : (
        <div className="cuentasList">
          {cuentas.map((cuenta) => (
            <UserCard key={cuenta.id} cuenta={cuenta} rol={"superAdmin"} />
          ))}
        </div>
      )}
      <Paginado value={cuentasTotal.length} cantidad={9} set={setPagActual} />
    </div>
  );
}

export default SuperAdminUsers;
