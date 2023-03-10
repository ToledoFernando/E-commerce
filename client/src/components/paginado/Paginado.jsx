import "./Paginado.scss";

function Paginado({ value, cantidad, set }) {
  const paginas = [];

  for (let i = 1; i <= Math.ceil(value / cantidad); i++) {
    paginas.push(i);
  }

  return (
    <div className="paginado">
      <div className="paginas">
        {paginas.map((e) => (
          <button
            className="PaginaN"
            onClick={() => {
              return set(e);
            }}
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
