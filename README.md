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

## En el celular (lo principal)

Es una **app web instalable** (PWA): se publica una vez y queda en tu pantalla de
inicio como cualquier app, **funciona sin internet** y guarda tu progreso **solo en
tu teléfono**. No usa cuentas, servidores, micrófono ni IA externa.

1. Publicá la carpeta `docs/` con GitHub Pages: *Settings → Pages → Deploy from a
   branch →* la rama que tenga estos cambios, carpeta `/docs`.
2. Abrí la URL en el celular una vez con internet.
3. **iPhone** (Safari): *Compartir → Agregar a inicio*. **Android** (Chrome):
   el botón *Instalar app* de la pantalla Oggi, o *menú ⋮ → Instalar app*.
4. Desde ahí abre sin conexión. Al publicar una versión nueva, se actualiza sola
   la próxima vez que la abras con internet.

### Pensada para el trabajo aburrido

- **☕ Pausa caffè**: 3 minutos. Mezcla un poco de repaso, dos frases nuevas,
  frases que ya viste, una pregunta del laboratorio y un par de preguntas de
  gramática de tu semana.
- **⚡ Lampo 60″**: contrarreloj de un minuto, del castellano al italiano, con
  frases que ya viste (se abre con 12). Cada error resta 3 segundos. Guarda tu
  récord.
- **🗣️ Frasi**: 17 escenas y 294 frases de conversación de alta frecuencia (bar,
  oficina, charla, reacciones, conectores, opiniones con congiuntivo, falsos
  amigos). Cada escena te presenta frases nuevas y después te las pide de cinco
  maneras: armarla con fichas, escucharla, tarjeta rápida y, sobre todo,
  **escribirla de memoria**, que es lo que te hace rápido para hablar. Al
  escribir no cuentan los acentos ni la puntuación, pero sí el orden de las palabras.
- **🤫 Modo oficina** (botón arriba a la derecha): no suena nada solo y no
  aparecen ejercicios de escucha. El 🔊 sigue andando si lo tocás con auriculares.

### Lo que te mantiene enganchado

- **Meta diaria** (100, 200, 350 o 500 xp; una Pausa da unos 100) con anillo de progreso en la cabecera.
- **🎁 Cofre diario** al cumplir la meta: premio sorpresa (xp, premio gordo o un
  escudo).
- **🔥 Racha con 🛡️ escudos**: cada 7 días de racha ganás un escudo, y cada
  escudo salva la racha por un día que no pudiste jugar (máximo 3).
- **Rangos**, de *Turista* a *Madrelingua*, además del nivel.
- **Calendario** de tus últimas 4 semanas, combos, confeti, sonidos y vibración.
- **Repaso espaciado** que mezcla gramática y frases: cada frase vuelve cuando
  estás por olvidarla, y cada vez con otro tipo de ejercicio.
- **Recordatorio diario**: en *Io* elegís una hora y se agrega a tu calendario
  un evento que se repite todos los días. Anda sin servidor ni notificaciones push.

### 📖 Leggi: lectura graduada

- **Martín a Bologna**: una historia en 10 episodios, de A1 a B2. Cada episodio
  usa la gramática del momento (presente, passato prossimo, imperfetto,
  futuro, pronombres, condizionale, congiuntivo, periodo hipotético) y abre el
  siguiente.
- **Cultura** (opcional, para cuando tengas ganas): 10 textos de historia,
  filosofía, sociología y literatura italianas: Dante, Maquiavelo, Galileo,
  Garibaldi, Gramsci, Primo Levi, el *boom* económico, Calvino, Beccaria y
  Natalia Ginzburg. Donde una frase famosa es apócrifa, el texto lo dice.
- Cada lectura tiene glosario (tocás la palabra subrayada), preguntas de
  comprensión y una **caza de formas**: marcar en el texto los verbos en
  passato remoto, los congiuntivi, etc.

### 🩺 Cómo te corrige

La app no se limita a decir "incorrecto, era X". Un motor de diagnóstico
(`docs/js/diagnosi.js`) compara tu respuesta con la correcta palabra por palabra
y reconoce *qué tipo* de error cometiste. Tiene unas 30 categorías pensadas para
hispanohablantes: auxiliar *essere/avere*, concordancia del participio, «a»
personal, preposiciones y contracciones (*a il → al*), artículo (*il zaino →
lo zaino*), artículo con posesivos (*la mia madre*), género distinto del
español (*la latte*), concordancia, plurales irregulares, persona y tiempo del
verbo, congiuntivo tras *penso che*, periodo hipotético (*se avrei*), verbos
irregulares regularizados (*ando, prenduto*), *-isc-*, *-care/-gare*, dobles
consonantes, tildes (*è/e*), palabras y grafías del español (*muy, ñ, ll*),
falsos amigos, lugar del pronombre, *ci/ne*, palabras que faltan o sobran, y
tipeos.

Según lo que dice la investigación:

- **Primer intento con error de regla:** la app no te da la respuesta. Te
  marca la palabra y te da una pista ("Revisá el auxiliar de *andare*: ¿essere
  o avere?"), y vos lo corregís. Las pistas que te hacen autocorregirte
  funcionan mejor que darte la forma correcta (Lyster y Ranta 1997; metaanálisis
  de Lyster y Saito 2010).
- **Segundo intento:** ves tu respuesta al lado de la correcta, con la
  diferencia marcada, y la regla explicada. La retroalimentación específica a
  *tu* respuesta supera a la simple verificación (Shute 2008).
- **Errores de regla y de vocabulario:** los de regla (auxiliar, concordancia,
  artículo, tiempo) se corrigen con la regla; los de vocabulario, con el
  significado de la palabra que usaste ("*caldo* significa caliente"),
  siguiendo la distinción de Ferris entre errores tratables y no tratables.
- **Deslices:** un tipeo, una tilde o un pronombre sujeto de más se marcan sin
  hacerte repetir (Corder: *mistakes* y *errors*).
- **Opción múltiple:** si elegiste mal, te explica por qué *esa* opción está
  mal ("*vai* es la forma de *tu*; el sujeto es *noi*").
- **Tu perfil de errores:** cada error se anota por tipo. La **Clínica** arma
  sesiones con lo que más te cuesta, y los errores que corregís vos solo cuentan
  como avance (Metcalfe 2017: equivocarse y analizar el error enseña).

### 🏦 El banco

`tools/bank/` tiene el contenido en Python legible y `tools/build_bank.py` lo
valida (formato, duplicados, errores bien construidos, verbos que el conjugador
generaría mal) y lo compila a `docs/data/bank.json`:

| Contenido | Para qué |
|---|---|
| 1.827 sustantivos con género, plural, nivel y nota contrastiva | *Parole*, artículos, plurales, preposiciones con artículo, concordancia |
| 636 verbos con auxiliar, *-isc-* e irregularidad | Vocabulario; los regulares se suman al gimnasio de conjugación |
| 423 adjetivos con sus cuatro formas | Concordancia |
| 354 adverbios, conectores, preposiciones y pronombres | Vocabulario |
| 864 oraciones español → italiano (A1–C1), con variantes aceptadas | *Traduci* y *Coniuga in contesto* |
| 584 errores típicos de hispanohablantes con explicación | *Trova l'errore* |
| 1.137 interferencias del español, 97 falsos amigos y 48 grafías | Reconocer el español dentro de tu italiano |

### 🔬 En qué investigación se basa cada ejercicio

No es "toda la bibliografía", porque nadie la puede leer entera. Son los
hallazgos más replicados de la investigación en adquisición de segundas
lenguas y en psicología de la memoria:

| Principio | Dónde está en la app | Referencia |
|---|---|---|
| Práctica de recuperación: acordarse fija más que releer | Escribir de memoria, cloze, tarjetas, ronda | Roediger & Karpicke 2006 |
| Repetición espaciada | Ripasso (SM-2), la Pausa mezcla repaso | Cepeda et al. 2006 |
| Reaprendizaje sucesivo: lo que errás vuelve hasta que sale | Toda sesión salvo el boss | Rawson & Dunlosky 2011 |
| Efecto del pretest: adivinar antes de aprender | «Adiviná» antes de cada frase nueva | Kornell, Hays & Bjork 2009 |
| Espaciado dentro de la sesión | La frase nueva se pregunta después de otras | Cepeda et al. 2006 |
| Intercalado | Pausa y repaso mezclan tipos y temas | Rohrer & Taylor 2007 |
| Dificultad deseable | Primero reconocer (fichas), después producir (escribir) | Bjork 1994 |
| Bloques léxicos y frases hechas | 17 escenas, 294 frases | Wray 2002; Boers & Lindstromberg 2012 |
| Input comprensible con 98% de cobertura | Lecturas graduadas con glosario | Krashen 1985; Hu & Nation 2000 |
| Noticing: notar la forma en el texto | Caza de formas | Schmidt 1990 |
| Input estructurado: interpretar la forma antes de producirla | Laboratorio *Capire* | VanPatten & Cadierno 1993 |
| Transferencia desde la lengua materna | Laboratorio *Ponte* (9 reglas, 121 cognados) y *Falsi amici* | Ringbom 2007 |
| Fluidez con material conocido y bajo presión de tiempo | Lampo 60″ | Nation 2007 (four strands) |
| Interés y elección sostienen la motivación | Lecturas de cultura de libre elección | Hidi & Renninger 2006; Deci & Ryan 2000 |
| Pistas para autocorregirse (*prompts*) antes que la respuesta | Primer intento con error de regla | Lyster & Ranta 1997; Lyster & Saito 2010 |
| Retroalimentación específica a la respuesta dada | Diagnóstico de errores y de opciones elegidas | Shute 2008 |
| Errores tratables (regla) y no tratables (léxico) | La explicación cambia según el tipo | Ferris 1999; Ellis 2009 |
| Aprender del error propio, con análisis | Perfil de errores y Clínica | Metcalfe 2017 |
| Interferencias típicas del hispanohablante (preposiciones, auxiliar, «a» personal) | Categorías del diagnóstico y *Trova l'errore* | Calvi; Schmid; corpus VALICO |

### Tu memoria

Todo queda en el `localStorage` del teléfono. La app le pide al navegador
almacenamiento persistente, y al instalarla en la pantalla de inicio es mucho menos
probable que se borre. Igual, en *Io → Guardar copia* bajás (o compartís a Drive o
WhatsApp) un `.json` con todo tu progreso, y con *Restaurar copia* lo recuperás
en otro teléfono.

## Jugar en la computadora

```sh
cd docs && python3 -m http.server 8000
# abrir http://localhost:8000
```

Es un sitio estático sin dependencias.

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
| Desafíos abiertos del *Soluzioni* | 339 grupos / 1.637 sub-ítems |
| Lecciones de teoría (una por semana) | 52, con 221 bloques |
| Tablas gramaticales y ejemplos bilingües | 76 tablas / 349 ejemplos |
| Verbos en el motor de conjugación | 96 |
| Tiempos y modos generables | 14 |

**Revisión lingüística.** Todo el contenido pasó por una revisión de italiano
nativo: banco de frases y errores, palabras, lecciones, ítems propios, lecturas
y los dos bancos extraídos de libros (este último con ~125 respuestas corregidas
en *Dummies* y errores de extracción limpiados en *Soluzioni*). Las reglas que
el corrector enuncia en español también se revisaron una por una.

**Diseño.** Paleta de café italiano (papel, basílico, terracota, azafrán) con
modo oscuro; *Fraunces* para el italiano y *Nunito* para la interfaz, servidas
desde `docs/fonts/` (licencia SIL OFL, incluida) para que funcionen sin red.

El gimnasio de verbos genera preguntas en vez de almacenarlas: 96 verbos × 14
tiempos × 6 personas dan más de 8.000 formas distintas, con distractores tomados
de otras personas y otros tiempos del mismo verbo — es decir, los errores que un
estudiante comete de verdad.

## Estructura del repo

```
docs/                 el juego (sitio estático, listo para GitHub Pages)
  index.html
  css/app.css
  manifest.webmanifest, sw.js, icons/   app instalable y sin conexión
  js/conjugator.js    motor de conjugación italiano
  js/engine.js        corrección, SRS, XP, meta diaria, racha y escudos, cofre, guardado
  js/frasi.js         banco de frases de conversación y sus ejercicios
  js/lab.js           laboratorio: cognados (Ponte), falsos amigos, input estructurado (Capire)
  js/letture.js       lecturas graduadas: Martín a Bologna y Cultura
  js/diagnosi.js      diagnóstico de errores: categoría, pista y explicación
  js/banca.js         ejercicios generados desde el banco, y la Clínica
  data/bank.json      banco compilado (palabras, oraciones, errores, interferencias)
  js/drills.js        generación de rondas, bosses, repaso, pausa y lampo
  js/app.js           interfaz
  data/course.json    curso completo compilado
tools/
  extract_dummies.py     EPUB -> banco auto-corregible
  extract_routledge.py   EPUB -> temario + desafíos
  build_course.py        arma docs/data/course.json
  authored/              banco de ítems propios (Python legible)
  lessons/               teoría de las 52 semanas (s1..s4, una por estación)
  test_conjugator.js     1.442 comprobaciones de formas verbales
  test_game.js           ~21.500 comprobaciones de datos y lógica
  test_frasi.js          ~24.000 comprobaciones de frases, laboratorio, lecturas, pausa, racha y cofre
  test_diagnosi.js       mete ~1.600 errores típicos en las oraciones del banco y verifica el diagnóstico
  build_bank.py          valida y compila el banco
  bank/                  el banco en Python legible
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
node tools/test_frasi.js        # frases, ejercicios, pausa, lampo, racha, escudos, cofre
python3 tools/build_bank.py     # valida y compila el banco
node tools/test_diagnosi.js     # el diagnóstico reconoce los errores típicos
```

Si cambiás algún archivo de `docs/`, subí `VERSION` en `docs/sw.js` para que los
teléfonos descarguen la versión nueva.

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
lectura, escucha y producción oral. El curso es el andamio; la exposición al
idioma la tenés que poner aparte.

Los dos manuales son obra con derechos de autor y no se incluyen en el repo:
los scripts de extracción trabajan sobre las copias que tengas vos, y el material
generado es para estudio personal.
