# EcoMove — Plataforma de Registro de Rutas

Proyecto React (Vite) para la Evaluación Sumativa 04 — TI3031 Programación Front End.
Tema 1: Plataforma de Registro de Rutas "EcoMove".

## Cómo ejecutar

```bash
npm install
npm run dev
```

## Requisitos cubiertos

- Formulario con `useState`: nombre de ruta, tipo de movilidad, distancia,
  punto de encuentro, responsable, estado.
- Validaciones: todos obligatorios; distancia > 0; nombre de ruta único;
  responsable con al menos 3 caracteres.
- CRUD completo (agregar, editar, eliminar, visualizar).
- Persistencia en LocalStorage (hook `useLocalStorage`).
- Búsqueda en tiempo real por nombre de ruta o tipo de movilidad.
- Paginación de 5 registros por página.
- Interfaz responsiva con Bootstrap 5.
- Estilo condicional dinámico: badge de color según el estado (Activa/Finalizada).
- Arquitectura basada en componentes.

## Notas

- No se incluye `node_modules` (se genera con `npm install`).
- Los identificadores únicos (`id`) se generan con el paquete [`uuid`](https://www.npmjs.com/package/uuid) (`uuidv4()`).
- Los identificadores únicos (`id`) se generan con el paquete [`uuid`](https://www.npmjs.com/package/uuid) (`uuidv4()`).
