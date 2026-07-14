export default function BuscadorRutas({ termino, onCambiarTermino }) {
  return (
    <div className="mb-3">
      <label htmlFor="busqueda" className="form-label">
        Buscar por nombre de ruta o tipo de movilidad
      </label>
      <div className="input-group">
        <span className="input-group-text bg-success text-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          id="busqueda"
          className="form-control"
          placeholder="Escriba aqui tipo de movilidad o nombre de ruta"
          value={termino}
          onChange={(evento) => onCambiarTermino(evento.target.value)}
        />
      </div>
    </div>
  );
}

