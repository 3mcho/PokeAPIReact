# Pokédex Nacional - Prueba Técnica React

### Candidato: Lucio Emanuel Sandoval Interian

Este proyecto es una aplicación de búsqueda y visualización de Pokémon utilizando la PokéAPI, desarrollada como parte de una evaluación técnica para el rol de Desarrollador Junior.

---

## Tecnologías y Herramientas

- **React 18** (Vite): Framework principal para la interfaz de usuario.
- **Redux Toolkit**: Gestión del estado global para la lista de Pokémon, paginación y estados de carga.
- **Tailwind CSS v4**: Framework de estilos de última generación para un diseño responsivo y temático.
- **PokéAPI**: Fuente de datos para la información de los Pokémon.

---

## Características Principales

### Paginación Optimizada

- Se implementó una lógica de carga de **6 Pokémon por página** para cumplir con el layout solicitado.
- Uso de `offset` dinámico vinculado al estado global de Redux para navegar entre páginas.

### Buscador Global Inteligente

- El buscador permite encontrar Pokémon por nombre o similitud entre más de **1000 registros**.
- Se implementó una estrategia híbrida: descarga de lista de nombres para búsqueda instantánea y carga perezosa (_lazy loading_) para los detalles e imágenes.

### UI/UX Temática

- Interfaz inspirada en la Pokédex clásica con un diseño responsivo que se adapta a dispositivos móviles y escritorio.
- Feedback visual durante los estados de carga mediante el estado `loading` de Redux.

---

## Instalación y Ejecución

Para correr este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/3mcho/PokeAPIReact.git](https://github.com/3mcho/PokeAPIReact.git)
   ```
2. **Instalar dependencias:**
   ```bash
    npm install
   ```
3. **Iniciar servidor de desarrollo :**
   ```bash
   npm run dev
   ```
