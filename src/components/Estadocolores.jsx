const ESTILOS_POR_ESTADO = {
  Activa: 'text-bg-success',
  Finalizada: 'text-bg-danger',
};

/*Estilo condicional dinámico: el color del badge cambia según el estado de la ruta.*/
export default function EstadoBadge({ estado }) {
  const clase = ESTILOS_POR_ESTADO[estado] ?? 'text-bg-light';
  return <span className={`badge rounded-pill ${clase}`}>{estado}</span>;
}
