# Tablero — IPO 2026/27 (Equipo Argentina)

Juego de fichas hecho con HTML, CSS y JavaScript nativos, sin bibliotecas ni frameworks.

## Ejecución

Abrir la carpeta con VS Code y usar Live Server sobre `index.html`, o iniciar un servidor HTTP local:

```bash
python3 -m http.server 8000
```

Visitar `http://localhost:8000`.

## Cómo jugar

Arrastrar una ficha sobre otra para intercambiarlas. Alternativamente, seleccionar dos fichas con clic o teclado (Tab + Enter/Espacio). Se gana cuando todas las casillas de cada fila tienen el mismo tipo. El botón «Nueva partida» reinicia el tablero. Aplicar una configuración inicia una partida nueva.

## Estructura MVC

- `js/Model.js`: estado del tablero, generación aleatoria, intercambio y condición de victoria.
- `js/View.js`: creación del DOM, Grid, interacción nativa Drag & Drop y ayuda.
- `js/Controller.js`: comunicación entre modelo y vista.
- `js/app.js`: inicialización con módulos ES.
- `css/styles.css`: diseño visual con Flexbox para la disposición principal, Grid para el tablero y `position: relative` para la ayuda.

## Decisiones de diseño

La interfaz emplea una gama azul neutra para los controles y tres colores diferenciados para las fichas. Las formas también distinguen los tipos sin depender solo del color. Se utiliza una fuente de sistema, con jerarquía de tamaños y pesos. La proximidad agrupa controles relacionados y el tablero se presenta en un panel independiente. Hay mensajes de estado, instrucciones accesibles, foco visible y una alternativa al arrastre para teclado.

La generación inicial crea exactamente N fichas por cada fila objetivo (tipos repetidos por fila); después las mezcla con Fisher–Yates. Como los intercambios pueden realizarse entre cualesquiera dos casillas, siempre existe una solución.

## Pruebas sugeridas

1. Nueva partida y verificación de distribución aleatoria.
2. Cambiar N a 3, 4, 5 y 12 y comprobar el número de casillas.
3. Cambiar tamaños, colores y formas y comprobar que se crea una nueva partida.
4. Intercambiar mediante arrastre y mediante teclado/clic.
5. Conseguir filas homogéneas y comprobar el mensaje de victoria.
6. Introducir dimensiones inválidas y comprobar que no se aplican.
