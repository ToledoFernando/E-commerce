import "./Paginado.scss";

function Paginado({ value, cantidad, set, pagAct }) {
  const paginas = [];

  for (let i = 1; i <= Math.ceil(value / cantidad); i++) {
    paginas.push(i);
  }

  return (
    <div className="paginado3">
      <div className="paginas">
        {paginas.map((e) => (
          <button
            className={pagAct == e ? "PaginaN actual" : "PaginaN"}
            onClick={() => {
              window.location.href = `#`;
              set(e);
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
