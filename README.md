# Banco de Actividades en React - Sofactia SAS 

Este proyecto es un repositorio de actividades interactivas diseñadas en React, desarrollado para Sofactia SAS. Incluye diversas actividades y componentes reutilizables, organizados y estructurados para facilitar el aprendizaje interactivo.

---

## 🛠️ Desarrollador
**Brayan Orozco**

---

## 📂 Estructura del Proyecto

El proyecto está organizado en varias carpetas principales para mantener una estructura clara y escalable:

- **`node_modules`**: Dependencias del proyecto gestionadas por `npm`.
- **`public`**: Archivos estáticos, incluyendo:
  - Actividades interactivas (`public/Actividades`).
  - Recursos de código fuente para actividades (`public/code`).
- **`src`**: Código fuente principal:
  - **`components`**: Componentes reutilizables de la aplicación.
  - **`lib`**: Utilidades y configuraciones relacionadas con las actividades.
  - **`assets`**: Archivos de medios como imágenes o íconos.

---

## 🚀 Características

1. **Actividades Interactivas**: Diseñadas para promover el aprendizaje a través de herramientas dinámicas como drag-and-drop, listas desplegables, preguntas y más.
2. **Componentes Reutilizables**: Basados en React y organizados en la carpeta `src/components`.
3. **Estilo Centralizado**: Integración con Tailwind CSS para un diseño responsivo.
4. **Soporte Multidispositivo**: Actividades específicas para versiones web y móviles.

---

## 📦 Instalación

Sigue los pasos a continuación para configurar el proyecto en tu máquina local:

### Prerrequisitos
1. **Node.js** (v16 o superior) y **npm** instalados.
2. Un editor de código como **VS Code**.

---

### Instrucciones
1. Clona el repositorio:
   git clone <URL_DEL_REPOSITORIO>
2. Accede al directorio del proyecto:
    cd banco-de-actividades-react
3. Instala las dependencias:
    npm install
4. Inicia el servidor de desarrollo:
    npm run dev

---

### Uso
1. Una vez iniciado el servidor de desarrollo, abre tu navegador y navega a http://localhost:5173.
2. Explora las actividades disponibles en el banco de actividades.
3. Modifica o agrega nuevas actividades personalizadas en las carpetas public/Actividades y src/components.

---

## 🧰 Herramientas y Tecnologías

- **React.js**: Framework principal para la construcción de interfaces.
- **Vite**: Empaquetador ligero y rápido para desarrollo moderno.
- **Tailwind CSS**: Framework para estilos responsivos y personalizables.
- **JavaScript**: Lenguaje de programación principal.
- **Popper.js**: Manejo de tooltips y modales interactivos.

---

## ➿ Ruta de actividades

Tener en cuenta que los archivos del index.html deben estar asi antes de subirlos al servidor: ./assets

### Local

iframeWeb: "./actividades/actividaddraganddropmanos1/index.html"

### Servidor

iframeWeb: "../../demos/banco-actividades-react/assets/actividades/actividaddraganddropmanos1/index.html"
