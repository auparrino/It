# La Via C1 — italiano hasta C1 en un año

Curso-juego construido a partir de dos manuales de gramática italiana:

- **Italian Grammar For Dummies** (Beth Bartolini-Salimbeni) — aporta el banco de
  ejercicios auto-corregibles, porque su edición digital trae la clave de
  respuestas de cada capítulo.
- **Soluzioni: A Practical Grammar of Contemporary Italian** (Routledge) — aporta
  el temario de nivel alto: sus 29 capítulos son la columna vertebral del año, y
  sus *Esercizi* entran al juego como desafíos abiertos.

El curso está escrito **en español para hispanohablantes**: casi todo el material
propio ataca los puntos donde el español y el italiano se parecen lo suficiente
como para hacerte tropezar.

## Jugar

```sh
cd docs && python3 -m http.server 8000
# abrir http://localhost:8000
```

Es un sitio estático sin dependencias: se puede publicar tal cual en GitHub Pages
apuntando a la carpeta `docs/`. El progreso se guarda en `localStorage`, así que
vive en el navegador que uses.

## Cómo está armado el año

52 semanas en cuatro estaciones, cada una cerrada por un **boss** que hay que
aprobar con 85% para desbloquear la siguiente:

| Estación | Semanas | Nivel | Contenido |
|---|---|---|---|
| Le Fondamenta | 1–13 | A1 → A2 | Sonidos, género, artículos, presente completo |
| Il Ponte | 14–26 | A2 → B1 | Pasados, futuro, condicional, comparativos |
| La Corrente | 27–39 | B1 → B2 | Congiuntivo, periodo hipotético, pasiva, *ne* y *ci* |
| La Vetta | 40–52 | B2 → C1 | Causativo, formas no finitas, discurso indirecto, registro |

Cada semana trae un *briefing* en español con los puntos clave, la referencia a
los capítulos de ambos libros, y cuatro modos de juego:

- **Allenamento** — 12 preguntas mezclando ejercicios del libro, banco propio y
  gimnasio de verbos. Cinco vidas, combo multiplicador de XP.
- **Gimnasio de verbos** — conjugación generada al vuelo, sin repetirse nunca.
- **Sfide del Maestro** — ejercicios abiertos del *Soluzioni*, autoevaluados.
- **Boss** — examen acumulativo de la estación, tres vidas, 85% para pasar.

Además hay una cola de **ripasso** con repetición espaciada (SM-2 simplificado)
sobre todo lo ya jugado, racha diaria y once medallas.

## Contenido

| Fuente | Cantidad |
|---|---|
| Ejercicios auto-corregibles de *For Dummies* | 871 |
| Ítems propios de nivel B2/C1 en español | 144 |
| Desafíos abiertos del *Soluzioni* | 338 grupos / 1.632 sub-ítems |
| Verbos en el motor de conjugación | 96 |
| Tiempos y modos generables | 14 |

El gimnasio de verbos genera preguntas en vez de almacenarlas: 96 verbos × 14
tiempos × 6 personas dan más de 8.000 formas distintas, con distractores tomados
de otras personas y otros tiempos del mismo verbo — es decir, los errores que un
estudiante comete de verdad.

## Estructura del repo

```
docs/                 el juego (sitio estático, listo para GitHub Pages)
  index.html
  css/app.css
  js/conjugator.js    motor de conjugación italiano
  js/engine.js        corrección, SRS, XP, guardado
  js/drills.js        generación de rondas, bosses y repaso
  js/app.js           interfaz
  data/course.json    curso completo compilado
tools/
  extract_dummies.py     EPUB -> banco auto-corregible
  extract_routledge.py   EPUB -> temario + desafíos
  build_course.py        arma docs/data/course.json
  authored/              banco de ítems propios (Python legible)
  test_conjugator.js     1.442 comprobaciones de formas verbales
  test_game.js           21.564 comprobaciones de datos y lógica
```

## Reconstruir los datos

Los `.epub` no están en el repo. Con tus propias copias:

```sh
python3 tools/extract_dummies.py   ruta/al/dummies.epub   docs/data/bank_dummies.json
python3 tools/extract_routledge.py ruta/al/soluzioni.epub docs/data/bank_routledge.json
python3 tools/build_course.py
```

## Tests

```sh
node tools/test_conjugator.js   # formas verbales contra las tablas de los libros
node tools/test_game.js         # integridad del curso, corrección, SRS, progresión
```

`test_conjugator.js` valida las 14 conjugaciones contra formas verificadas
(incluidas las irregularidades del *passato remoto* en patrón 1-3-3 y las reglas
ortográficas de *-care/-gare/-ciare/-giare*). `test_game.js` comprueba, entre
otras cosas, que las 52 semanas sean superables y que la respuesta impresa en el
libro se acepte siempre como correcta.

## Dos advertencias honestas

**El *Soluzioni* no trae soluciones.** Su edición digital deja las respuestas en
el sitio del editor, así que sus 1.632 sub-ítems **no se corrigen solos**: el
juego los presenta como desafíos abiertos que resolvés por escrito, verificás
contra el capítulo y puntuás vos. Todo lo que el juego corrige automáticamente
sale del banco de *For Dummies*, del motor de conjugación y del banco propio.

**Esto es gramática, no un curso completo.** Un año de este juego te da el
sistema gramatical del C1 con solidez, pero el C1 real también exige volumen de
lectura, escucha y producción oral. El curso es el andamio; la exposición al
idioma la tenés que poner aparte.

Los dos manuales son obra con derechos de autor y no se incluyen en el repo:
los scripts de extracción trabajan sobre las copias que tengas vos, y el material
generado es para estudio personal.
