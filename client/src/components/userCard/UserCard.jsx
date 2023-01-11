import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getAllUsers, updateAcout } from "../../store/action";
import iconM from "../../pages/EdithAcoutn/iconM.png";
import iconF from "../../pages/EdithAcoutn/iconF.png";
import swal from "sweetalert";
import "./UserCard.scss";

function UserCard({ cuenta }) {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const suspender = async (userID, estado) => {
    setLoad(true);
    const update = {
      id: userID,
      status: estado,
    };
    const token = localStorage.getItem("tokenUser");
    await dispatch(updateAcout(update, token));
    await dispatch(getAllUsers(token));
    setLoad(false);
    swal(
      "Se cambio el estado del usuario",
      `Id de usuario: ${userID} `,
      "success"
    );
  };

  const deleteUserAcoutn = async (id, username) => {
    swal({
      title: `Eliminar Usuario ${username}`,
      text: `Esta accion no se puede deshacerse`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const token = localStorage.getItem("tokenUser");
        await dispatch(deleteUser(id, token));
        await dispatch(getAllUsers(token));
        swal("Usuario eliminado con exito", {
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="userCard">
      <div className="iconProfile">
        <img src={cuenta.profileIMG ? iconF : iconM} alt="" />
      </div>
      <div>
        <p className="estado">
          {cuenta.status ? (
            <span className="act">Activo</span>
          ) : (
            <span className="des">Suspendido</span>
          )}
        </p>
        <div className="info">
          <p>
            {cuenta.first_name} {cuenta.last_name}{" "}
          </p>
          <p>
            Username: <b>{cuenta.username}</b>
          </p>
          <p>Genero: {cuenta.profileIMG ? "Femenino" : "Masculino"}</p>
          <p>
            <b>ROL: {cuenta.rol.name}</b>
          </p>
          <p className="verificada">
            Cuenta Verificada: {cuenta.verify ? "Verificada" : "NO verificada"}
          </p>
          <button
            disabled={load}
            className={cuenta.status ? "suspenderCuenta" : "activarCuenta"}
            onClick={() => suspender(cuenta.id, !cuenta.status)}
          >
            {cuenta.status ? "Suspender Cuenta" : "Activar Cuenta"}
          </button>
          <button
            disabled={load}
            className="eliminarCuenta"
            onClick={() => {
              deleteUserAcoutn(cuenta.id, cuenta.username);
            }}
          >
            Eliminar Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
