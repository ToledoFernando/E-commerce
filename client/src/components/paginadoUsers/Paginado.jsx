import "./Paginado.scss";

function Paginado({ value, cantidad, set }) {
  const paginas = [];

  for (let i = 1; i <= Math.ceil(value / cantidad); i++) {
    paginas.push(i);
  }
  console.log(paginas);

  return (
    <div className="paginado3">
      <div className="paginas">
        {paginas.map((e) => (
          <button
            className="PaginaN"
            onClick={() => set(e)}
            key={e}
            type="button"
            value={e}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Paginado;
