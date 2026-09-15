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
python3 tools/serve.py
# abrir http://localhost:8000
```

Es un sitio estático sin dependencias: se puede publicar tal cual en GitHub Pages
apuntando a la carpeta `docs/` (o servirla con `python3 -m http.server`). El
progreso se guarda en `localStorage`; con `serve.py` además se copia a
`progress.json`, que es lo que leen los agentes de abajo.

## Il Maestro: los agentes con Ollama

El curso original es un gimnasio de gramática con tres huecos que son justo
donde uno se desengancha: los ejercicios abiertos no se corrigen, nunca se
produce italiano propio, y nadie te trae de vuelta cuando faltás. Los agentes
tapan eso con un modelo local de [Ollama](https://ollama.com). Nada sale de tu
PC y no hace falta ninguna clave.

```sh
ollama serve                 # si no corre ya como servicio
ollama pull qwen2.5:14b      # o gemma3:12b, llama3.1:8b… cualquiera que hable italiano
python3 tools/serve.py       # sirve docs/ y reenvía /ollama a tu Ollama
```

El juego detecta Ollama solo (vía el proxy de `serve.py` o directo en el
puerto 11434) y elige un modelo; en la pestaña **Maestro** se cambia.

| Agente | Dónde | Qué hace |
|---|---|---|
| **Il Maestro** | en el juego, *Sfide* | Corrige los 1.632 sub-ítems abiertos del *Soluzioni*: veredicto por ítem, versión correcta y la regla en español. Lo que dictamina alimenta el SRS igual que la autoevaluación. |
| **Scrittura** | en el juego, por semana | Consigna de escritura con la gramática de la semana; devuelve el texto corregido, los errores explicados y una cosa para practicar. |
| **Il Compagno** | en el juego, por semana | Charla en italiano al nivel de la semana. No interrumpe para corregir: al terminar te da tus errores más útiles. |
| **Il Custode** | `tools/custode.py`, una vez al día | Lee `progress.json` y arma el plan del día en la tarjeta *Oggi*. Cuanto más faltaste, **más chico** es el plan: volver cuesta 3 preguntas, no una hora. |
| **Il Redattore** | `tools/redattore.py`, de noche | Encuentra las semanas donde más tropezás y escribe ítems nuevos contra esos errores, validados y mezclados en las rondas de esa semana. |

Los tres primeros corren en el navegador con la teoría de la semana como
contexto (las *trampas* y *atajos* de la lección van en el prompt). Los dos
scripts se programan una vez:

```sh
# Linux / macOS: crontab -e
0 8 * * *  cd /ruta/al/repo && python3 tools/custode.py --notify
0 3 * * *  cd /ruta/al/repo && python3 tools/redattore.py
```

En Windows, dos tareas en el Programador de tareas con los mismos comandos. Sin
Ollama encendido el Custode igual escribe el plan (con un mensaje de plantilla)
y el Redattore simplemente no agrega nada.

**Advertencia:** un modelo local se equivoca. Los ítems del Redattore se marcan
como suyos y el juego siempre pide verificar con la teoría; las correcciones
del Maestro conviene contrastarlas con el capítulo cuando algo no cierra. Un
modelo de 12–14B es un buen piso; con 7–8B las correcciones son más flojas.

## Cómo está armado el año

52 semanas en cuatro estaciones, cada una cerrada por un **boss** que hay que
aprobar con 85% para desbloquear la siguiente:

| Estación | Semanas | Nivel | Contenido |
|---|---|---|---|
| Le Fondamenta | 1–13 | A1 → A2 | Sonidos, género, artículos, presente completo |
| Il Ponte | 14–26 | A2 → B1 | Pasados, futuro, condicional, comparativos |
| La Corrente | 27–39 | B1 → B2 | Congiuntivo, periodo hipotético, pasiva, *ne* y *ci* |
| La Vetta | 40–52 | B2 → C1 | Causativo, formas no finitas, discurso indirecto, registro |

Cada semana trae un *briefing* en español con los puntos clave y la referencia a
los capítulos de ambos libros, una **lección de teoría** completa, y cuatro modos
de juego:

- **Teoria** — la gramática de la semana explicada en español para
  hispanohablantes: tablas, ejemplos con audio, y en cada bloque *la trampa*
  (el error que induce el castellano) y *el atajo* (la regla que conviene
  memorizar). Leerla da XP y marca la semana.
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
| Lecciones de teoría (una por semana) | 52, con 221 bloques |
| Tablas gramaticales y ejemplos bilingües | 76 tablas / 349 ejemplos |
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
  js/tutor.js         il Maestro: cliente de Ollama y prompts
  js/sync.js          copia del progreso a progress.json
  js/app.js           interfaz
  data/course.json    curso completo compilado
tools/
  serve.py               servidor local: docs/ + proxy a Ollama + progress.json
  agente.py              lo común de los agentes de fondo
  custode.py             plan del día (docs/data/oggi.json)
  redattore.py           ítems nuevos contra tus errores (docs/data/bank_maestro.json)
  extract_dummies.py     EPUB -> banco auto-corregible
  extract_routledge.py   EPUB -> temario + desafíos
  build_course.py        arma docs/data/course.json
  authored/              banco de ítems propios (Python legible)
  lessons/               teoría de las 52 semanas (s1..s4, una por estación)
  test_conjugator.js     1.442 comprobaciones de formas verbales
  test_game.js           21.564 comprobaciones de datos y lógica
  test_tutor.js          tutor y sincronización, con fetch simulado
  test_agenti.py         agentes y servidor, con un Ollama falso
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
node tools/test_tutor.js        # il Maestro y la sincronización, sin red
python3 tools/test_agenti.py    # custode, redattore y serve.py contra un Ollama falso
```

`test_conjugator.js` valida las 14 conjugaciones contra formas verificadas
(incluidas las irregularidades del *passato remoto* en patrón 1-3-3 y las reglas
ortográficas de *-care/-gare/-ciare/-giare*). `test_game.js` comprueba, entre
otras cosas, que las 52 semanas sean superables y que la respuesta impresa en el
libro se acepte siempre como correcta. `build_course.py` valida además que las
52 semanas tengan lección, que ninguna tabla tenga filas desparejas y que no
queden bloques vacíos.

La teoría vive en `tools/lessons/*.py` como diccionarios legibles: cada bloque
admite título, párrafos, una tabla, ejemplos `[italiano, castellano]`, una
trampa y un atajo. Dentro del texto, `*forma*` marca una forma italiana y
`**texto**` una regla clave. Para editar una lección se toca ese archivo y se
vuelve a correr `python3 tools/build_course.py`.

## Dos advertencias honestas

**El *Soluzioni* no trae soluciones.** Su edición digital deja las respuestas en
el sitio del editor, así que sus 1.632 sub-ítems **no se corrigen solos**: el
juego los presenta como desafíos abiertos que resolvés por escrito, verificás
contra el capítulo y puntuás vos. Todo lo que el juego corrige automáticamente
sale del banco de *For Dummies*, del motor de conjugación y del banco propio.

**Esto es gramática, no un curso completo.** Un año de este juego te da el
sistema gramatical del C1 con solidez, pero el C1 real también exige volumen de
lectura, escucha y producción oral. *Scrittura* y *il Compagno* cubren la
producción escrita; la lectura, la escucha y el hablar los tenés que poner
aparte.

Los dos manuales son obra con derechos de autor y no se incluyen en el repo:
los scripts de extracción trabajan sobre las copias que tengas vos, y el material
generado es para estudio personal.
