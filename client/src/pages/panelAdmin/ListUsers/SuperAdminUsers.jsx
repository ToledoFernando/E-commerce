import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, getUserCopy, searchUser } from "../../../store/action";
import lupa from "../../../img/lupa.png";
import UserCard from "../../../components/userCard/UserCard";
import cargando from "../../../img/load.svg";
import "./ListUserADM.scss";

function SuperAdminUsers() {
  const input = useRef();
  const cuentas = useSelector((state) => state.users);
  const dispatch = useDispatch();

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
      <label>Usuarios en Total: {cuentas.length}</label>
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
            <UserCard key={cuenta.id} cuenta={cuenta} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SuperAdminUsers;
