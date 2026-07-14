import { useState, useMemo, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import {REGISTROS_POR_PAGINA } from './data/constantes';
import RutaForm from './components/RutaForm';
import BuscadorRutas from './components/BuscadorRutas';
import TablaRutas from './components/TablaRutas';
import Paginacion from './components/Paginacion';

export default function App() {
  const [rutas, setRutas] = useLocalStorage('rutas', []); 
  const [rutaEnEdicion, setRutaEnEdicion] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  function guardarRuta(ruta) {
    setRutas((prev) => {
      const existe = prev.some((item) => item.id === ruta.id);
      if (existe) {
        return prev.map((item) => (item.id === ruta.id ? ruta : item));
      }
      return [...prev, ruta];
    });
    setRutaEnEdicion(null);
  }

  function eliminarRuta(id) {
    setRutas((prev) => prev.filter((ruta) => ruta.id !== id));
    if (rutaEnEdicion?.id === id) {
      setRutaEnEdicion(null);
    }
  }

  function iniciarEdicion(ruta) {
    setRutaEnEdicion(ruta);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const rutasFiltradas = useMemo(() => {
    const termino = terminoBusqueda.trim().toLowerCase();
    if (!termino) return rutas;
    return rutas.filter(
      (ruta) =>
        ruta.nombre.toLowerCase().includes(termino) ||
        ruta.tipo.toLowerCase().includes(termino)
    );
  }, [rutas, terminoBusqueda]);

  useEffect(() => {
    setPaginaActual(1);
  }, [terminoBusqueda]);

  const totalPaginas = Math.max(1, Math.ceil(rutasFiltradas.length / REGISTROS_POR_PAGINA));

  const rutasPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * REGISTROS_POR_PAGINA;
    return rutasFiltradas.slice(inicio, inicio + REGISTROS_POR_PAGINA);
  }, [rutasFiltradas, paginaActual]);

  const totalActivas = rutas.filter((ruta) => ruta.estado === 'Activa').length;
  const totalFinalizadas = rutas.filter((ruta) => ruta.estado === 'Finalizada').length;

  return (
    <div className="min-vh-100 bg-light">
      <header className="bg-success text-white py-4 mb-4">
        <div className="container text-center">
          <h1 className="h3 mb-1 ">EcoMove — Plataforma de Registro de Rutas</h1>
          <p className="mb-0 text-muted-50">
            Movilidad sustentable: bicicleta, caminata y carpooling
          </p>
        </div>
      </header>

      <main className="container pb-5">
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <i class="bi bi-person-walking display-6"></i>
                <p className="text-muted mb-1 small">Rutas registradas</p>
                <p className="h4 mb-0">{rutas.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <i class="bi bi-clipboard2-check display-6"></i>
                <p className="text-muted mb-1 small">Activas</p>
                <p className="h4 mb-0 text-success">{totalActivas}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <i class="bi bi-clipboard2-x display-6"></i>
                <p className="text-muted mb-1 small">Finalizadas</p>
                <p className="h4 mb-0 text-danger">{totalFinalizadas}</p>
              </div>
            </div>
          </div>
        </div>

        <RutaForm
          rutaEnEdicion={rutaEnEdicion}
          rutas={rutas}
          onGuardar={guardarRuta}
          onCancelarEdicion={() => setRutaEnEdicion(null)}
        />

        <div className="card shadow-sm">
          <div className="card-body">
            <BuscadorRutas termino={terminoBusqueda} onCambiarTermino={setTerminoBusqueda} />
            <TablaRutas rutas={rutasPagina} onEditar={iniciarEdicion} onEliminar={eliminarRuta} />
            <Paginacion
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
