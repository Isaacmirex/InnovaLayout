# Análisis de Diseño y Referencias: Ronin Academy

Este documento contiene el análisis del diseño, la estructura y las funcionalidades de la página de [Ronin Consultations](https://ronin-project.com/en/consultations), basándonos en las capturas de referencia obtenidas durante la exploración. Este análisis servirá como base para construir la nueva página web.

## 1. Estructura y Layout (Disposición)
La página utiliza un diseño de **panel de control (dashboard)** o aplicación web moderna:
- **Barra lateral izquierda (Sidebar):** Permite la navegación principal entre las secciones del sitio, como "Basic Knowledge", "Courses", etc. Tiene un tema oscuro/azulado con íconos blancos y claros para destacar las opciones.
- **Área principal de contenido (Main Content):** Ocupa la mayor parte de la pantalla a la derecha. Tiene un fondo claro (blanco o gris muy claro) para mejorar la legibilidad del contenido.
- **Navegación por tarjetas (Cards):** Los cursos o artículos se presentan en un formato de grilla utilizando tarjetas. Cada tarjeta suele incluir un título, una breve descripción y botones de acción (como "More").

## 2. Paleta de Colores y Tipografía
- **Colores Principales:**
  - **Fondo de la barra lateral:** Azul muy oscuro / casi negro (Navy / Dark Slate).
  - **Fondo del contenido principal:** Blanco o grises muy suaves, creando un fuerte contraste con la barra lateral.
  - **Acentos (Accents):** Uso de azules vibrantes u otros colores llamativos para botones (ej. "Accept all" cookies) o enlaces activos.
- **Tipografía:**
  - Fuente moderna de tipo *sans-serif* (similar a Inter, Roboto o Montserrat).
  - Jerarquía clara: Títulos grandes y en negrita; texto de cuerpo de tamaño medio y color gris oscuro para facilitar la lectura sin cansar la vista.

## 3. Elementos Interactivos y UX
- **Modal de Cookies:** Un diseño limpio que aparece centrado o en la parte inferior, con botones claros para aceptar o configurar.
- **Efectos Hover (Interacción):** Es muy probable que los enlaces en la barra lateral y los botones de las tarjetas ("More") tengan cambios de color o sutiles animaciones (micro-interacciones) al pasar el cursor sobre ellos.
- **Categorización:** Uso de etiquetas (tags) o subtítulos (como "White belt") para indicar el nivel o la categoría del contenido, lo cual ayuda mucho a la organización visual.

---

## Galería de Referencias (Capturas)

Aquí se encuentran las capturas de pantalla tomadas durante la exploración de la página, guardadas en esta misma carpeta `modelo`:

### 1. Interacción con Cookies
![Cookies Accept 1](file:///Users/isaacromero/Documents/InobaLayaut/innova-layout-s-a-s-redesign/modelo/ref1_cookies.png)
![Cookies Accept 2](file:///Users/isaacromero/Documents/InobaLayaut/innova-layout-s-a-s-redesign/modelo/ref2_cookies.png)

### 2. Navegación en la Barra Lateral (Basic Knowledge)
![Menú Basic Knowledge](file:///Users/isaacromero/Documents/InobaLayaut/innova-layout-s-a-s-redesign/modelo/ref3_basic_knowledge.png)

### 3. Visualización de Artículos
![Artículos y Categorías](file:///Users/isaacromero/Documents/InobaLayaut/innova-layout-s-a-s-redesign/modelo/ref4_article.png)

### 4. Navegación a la Sección de Cursos
![Menú Courses](file:///Users/isaacromero/Documents/InobaLayaut/innova-layout-s-a-s-redesign/modelo/ref5_courses.png)

### 5. Detalles de Cursos y Tarjetas
![Tarjetas de Cursos](file:///Users/isaacromero/Documents/InobaLayaut/innova-layout-s-a-s-redesign/modelo/ref6_course_details.png)

---

## Siguientes Pasos
Con esta estructura y estilo definidos, podemos comenzar a crear:
1. La estructura base en HTML/React/Next.js con un sidebar y un contenedor principal.
2. Los estilos CSS/Tailwind (definiendo la paleta de colores oscuros para el menú y claros para el contenido).
3. Los componentes reutilizables como las **Tarjetas de Cursos (Cards)** y los botones con animaciones sutiles.
