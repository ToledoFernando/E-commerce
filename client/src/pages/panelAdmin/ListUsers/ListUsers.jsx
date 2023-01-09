import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, searchUser, updateAcout } from "../../../store/action";

function ListUsers() {
  const cuentas = useSelector((state) => state.users);
  const dispatch = useDispatch();

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
    <div>
      <input
        onChange={onSearch}
        placeholder='Buscar por "USERNAME"'
        type="search"
        name="buscar"
      />
      {!cuentas.length ? (
        <h1>Cargando</h1>
      ) : (
        cuentas.map((cuenta) => {
          return (
            <div key={cuenta._id}>
              <p>{cuenta.first_name}</p>
              <p>
                Username:<b>{cuenta.username}</b>
              </p>
              <p>Genero: {cuenta.profileIMG ? "Femenino" : "Masculino"}</p>
              <p>Email: {cuenta.email}</p>
              <p>
                Cuenta Verificada:{" "}
                {cuenta.verify ? "Verificada" : "NO verificada"}
              </p>
              <button onClick={() => suspender(cuenta.id, !cuenta.status)}>
                {cuenta.status ? "Suspender Cuenta" : "Activar Cuenta"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ListUsers;
