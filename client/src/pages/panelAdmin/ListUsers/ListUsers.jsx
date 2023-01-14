import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, searchUser, updateAcout } from "../../../store/action";
import "../ListUsers/ListUserADM.scss";
import "../../../components/userCard/UserCard.scss";
import UserCard from "../../../components/userCard/UserCard";
import Paginado from "../../../components/paginado/Paginado";

function ListUsers() {
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

  const suspender = async (userID, estado) => {
    const update = {
      id: userID,
      status: estado,
    };
    const token = localStorage.getItem("tokenUser");
    await dispatch(updateAcout(update, token));
    dispatch(getAllUsers(token));
  };

  const onSearch = (e) => {
    if (!e.target.value.length) {
      const token = localStorage.getItem("tokenUser");
      dispatch(getAllUsers(token));
      return;
    }
    return dispatch(searchUser(e.target.value));
  };

  return (
    <div className="listUserADM">
      <input
        onChange={onSearch}
        placeholder='Buscar por "USERNAME"'
        type="search"
        name="buscar"
      />
      {!cuentas.length ? (
        <h1>Cargando</h1>
      ) : (
        <div className="cuentasList">
          {cuentas.map((cuenta) => (
            <UserCard key={cuenta.id} cuenta={cuenta} rol={"admin"} />
          ))}
        </div>
      )}
      <Paginado value={cuentasTotal.length} cantidad={9} set={setPagActual} />
    </div>
  );
}

export default ListUsers;
