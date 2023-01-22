function Address({ address, addressId }) {
  return (
    <div>
      {/* {!address.calle &&
      !address.cuil &&
      !address.localidad &&
      !address.postal &&
      !address.provincia &&
      !address.telefono ? (
        <div>
          <h1>Sin Datos de Domicilio</h1>
          <button>Agregar datos</button>
        </div>
      ) : (
        <div>
          <h1>Hello world</h1>
        </div>
      )} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(addressId);
        }}
      >
        <p>Calle</p>
        <input
          type="text"
          defaultValue={address.calle}
          placeholder="Nombre de la calle"
        />
        <p>Localidad</p>
        <input type="text" defaultValue={address.localidad} />
        <p>Provincia</p>
        <input type="text" defaultValue={address.provincia} />
        <div className="contact">
          <div className="telf">
            <p>Telefono</p>
            <input type="text" defaultValue={address.telefono} />
          </div>
          <div className="cuil">
            <p>Cuil</p>
            <input type="text" defaultValue={address.cuil} />
          </div>
        </div>
        <button>Actualizar datos</button>
      </form>
    </div>
  );
}

export default Address;
