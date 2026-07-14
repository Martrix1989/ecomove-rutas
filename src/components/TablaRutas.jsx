import EstadoBadge from './Estadocolores';

export default function TablaRutas({ rutas, onEditar, onEliminar }) {
  if (rutas.length === 0) {
    // Estado vacío cuando la búsqueda o la paginación no devuelven resultados.
    return (
      <div className="card-body text-center text-muted">
        <i class="bi bi-calendar-x display-6"></i>
        <p className="text-muted mb-1 medium">No se encontraron rutas.</p>
      </div>
    );
  }


  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre de la ruta</th>
            <th scope="col">Tipo</th>
            <th scope="col" className="text-end">Distancia (km)</th>
            <th scope="col">Punto de encuentro</th>
            <th scope="col">Responsable</th>
            <th scope="col">Estado</th>
            <th scope="col" className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.id}>
              <td>{ruta.nombre}</td>
              <td>{ruta.tipo}</td>
              <td className="text-end">{ruta.distancia}</td>
              <td>{ruta.puntoEncuentro}</td>
              <td>{ruta.responsable}</td>
              <td>
                <EstadoBadge estado={ruta.estado} />
              </td>
              <td className="text-end">
                {/* Acciones directas sobre cada fila para editar o eliminar la ruta. */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => onEditar(ruta)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(ruta.id)}
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
