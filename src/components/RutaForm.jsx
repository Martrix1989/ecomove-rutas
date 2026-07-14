import { useState, useEffect } from 'react';
import { TIPOS_MOVILIDAD, ESTADOS } from '../data/constantes';
import { v4 as uuidv4 } from 'uuid';

const FORM_VACIO = {
  nombre: '',
  tipo: '',
  distancia: '',
  puntoEncuentro: '',
  responsable: '',
  estado: '',
}; 

/* Formulario para crear y editar rutas */
export default function RutaForm({ rutaEnEdicion, rutas, onGuardar, onCancelarEdicion }) {
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (rutaEnEdicion) {
      setForm({
        nombre: rutaEnEdicion.nombre,
        tipo: rutaEnEdicion.tipo,
        distancia: String(rutaEnEdicion.distancia),
        puntoEncuentro: rutaEnEdicion.puntoEncuentro,
        responsable: rutaEnEdicion.responsable,
        estado: rutaEnEdicion.estado,
      });
      setErrores({});
    } else {
      setForm(FORM_VACIO);
    }
  }, [rutaEnEdicion]);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    const nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre de la ruta es obligatorio.';
    }
    if (!form.tipo) {
      nuevosErrores.tipo = 'Selecciona un tipo de movilidad.';
    }
    if (form.distancia === '' || Number.isNaN(Number(form.distancia))) {
      nuevosErrores.distancia = 'Ingresa una distancia válida.';
    } else if (Number(form.distancia) <= 0) {
      nuevosErrores.distancia = 'La distancia debe ser mayor que 0.';
    }
    if (!form.puntoEncuentro.trim()) {
      nuevosErrores.puntoEncuentro = 'El punto de encuentro es obligatorio.'
      } else if (form.puntoEncuentro.trim().length < 5) {
        nuevosErrores.puntoEncuentro = 'El punto de encuentro debe tener al menos 5 caracteres.';
      }
    }
    if (!form.responsable.trim()) {
      nuevosErrores.responsable = 'El responsable es obligatorio.';
    } else if (form.responsable.trim().length < 3) {
      nuevosErrores.responsable = 'El responsable debe tener al menos 3 caracteres.';
    }
    if (!form.estado) {
      nuevosErrores.estado = 'Selecciona un estado.';
    }

    // Regla de negocio: el nombre de la ruta no puede repetirse.
    const nombreNormalizado = form.nombre.trim().toLowerCase();
    const yaExiste = rutas.some((ruta) => {
      const esElMismoRegistro = rutaEnEdicion && ruta.id === rutaEnEdicion.id;
      return !esElMismoRegistro && ruta.nombre.trim().toLowerCase() === nombreNormalizado;
    });
    if (!nuevosErrores.nombre && yaExiste) {
      nuevosErrores.nombre = 'Ya existe una ruta con este nombre.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function handleSubmit(evento) {
    evento.preventDefault();
    if (!validar()) return;

    onGuardar({
      id: rutaEnEdicion ? rutaEnEdicion.id : uuidv4(),
      nombre: form.nombre.trim(),
      tipo: form.tipo,
      distancia: Number(form.distancia),
      puntoEncuentro: form.puntoEncuentro.trim(),
      responsable: form.responsable.trim(),
      estado: form.estado,
    });

    setForm(FORM_VACIO);
    setErrores({});
  }

  function handleCancelar() {
    setForm(FORM_VACIO);
    setErrores({});
    onCancelarEdicion();
  }

  return (
    <form className="card shadow-sm mb-4" onSubmit={handleSubmit} noValidate>
      <div className="card-body">
        <h2 className="h5 card-title mb-3">
          {rutaEnEdicion ? 'Editar ruta' : 'Registrar nueva ruta'}
        </h2>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">
              Nombre de la ruta
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Carrera Municipal Talca 2026"
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="tipo" className="form-label">
              Tipo de movilidad
            </label>
            <select
              id="tipo"
              name="tipo"
              className={`form-select ${errores.tipo ? 'is-invalid' : ''}`}
              value={form.tipo}
              onChange={handleChange}
            >
              <option value="">Selecciona un tipo</option>
              {TIPOS_MOVILIDAD.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            {errores.tipo && <div className="invalid-feedback">{errores.tipo}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="distancia" className="form-label">
              Distancia estimada (km)
            </label>
            <input
              type="number"
              id="distancia"
              name="distancia"
              step="0.1"
              className={`form-control ${errores.distancia ? 'is-invalid' : ''}`}
              value={form.distancia}
              onChange={handleChange}
              placeholder="0"
            />
            {errores.distancia && <div className="invalid-feedback">{errores.distancia}</div>}
          </div>

          <div className="col-md-4">
            <label htmlFor="puntoEncuentro" className="form-label">
              Punto de encuentro
            </label>
            <input
              type="text"
              id="puntoEncuentro"
              name="puntoEncuentro"
              className={`form-control ${errores.puntoEncuentro ? 'is-invalid' : ''}`}
              value={form.puntoEncuentro}
              onChange={handleChange}
              placeholder="Ej: Plaza de Armas De Talca"
            />
            {errores.puntoEncuentro && (
              <div className="invalid-feedback">{errores.puntoEncuentro}</div>
            )}
          </div>

          <div className="col-md-4">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              className={`form-select ${errores.estado ? 'is-invalid' : ''}`}
              value={form.estado}
              onChange={handleChange}
            >
              <option value="">Selecciona un estado</option>
              {ESTADOS.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </select>
            {errores.estado && <div className="invalid-feedback">{errores.estado}</div>}
          </div>

          <div className="col-md-8">
            <label htmlFor="responsable" className="form-label">
              Responsable de la actividad
            </label>
            <input
              type="text"
              id="responsable"
              name="responsable"
              className={`form-control ${errores.responsable ? 'is-invalid' : ''}`}
              value={form.responsable}
              onChange={handleChange}
              placeholder="Ej: Martin Arias"
            />
            {errores.responsable && <div className="invalid-feedback">{errores.responsable}</div>}
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button type="submit" className="btn btn-success">
            {rutaEnEdicion ? 'Guardar cambios' : 'Agregar ruta'}
          </button>
          {rutaEnEdicion && (
            <button type="button" className="btn btn-outline-secondary" onClick={handleCancelar}>
              Cancelar edición
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
