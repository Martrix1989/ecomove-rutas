export default function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) {
    return null;
  }

  const paginas = Array.from({ length: totalPaginas }, (_, indice) => indice + 1);

  return (
    <nav aria-label="Paginación de rutas">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onCambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            Anterior
          </button>
        </li>

        {paginas.map((pagina) => (
          <li key={pagina} className={`page-item ${pagina === paginaActual ? 'active' : ''}`}>
            <button type="button" className="page-link" onClick={() => onCambiarPagina(pagina)}>
              {pagina}
            </button>
          </li>
        ))}

        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onCambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}
