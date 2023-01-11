import "./AddCM.scss";

function AddCM() {
  return (
    <div>
      <div className="addCategory">
        <form>
          <label>Nombre de la Categoria</label>
          <input type="text" placeholder="Nombre" />
          <button>Agregar</button>
        </form>
      </div>
      <div className="addMarca">
        <form>
          <label>Nombre de la marca</label>
          <input type="text" placeholder="Nombre" />
          <button>Agregar Marca</button>
        </form>
      </div>
    </div>
  );
}

export default AddCM;
