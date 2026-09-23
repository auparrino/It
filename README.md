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

- **Meta diaria** (100, 200, 350 o 500 xp; una Pausa da entre 30 y 60) con anillo de progreso en la cabecera.
  El sábado y el domingo la meta baja a la mitad: el fin de semana es para algo
  liviano, no para cortar la racha.
- **Sfida del giorno**: seis preguntas de tu semana con doble xp, una vez por
  día. La primera ronda de cada día suma +25 xp.
- **Racha de 7 días: xp ×1,2** mientras dure. El cofre puede dar un 🎟️ de
  doble xp para la próxima ronda.
- **Misiones y semana perfecta**: cada misión que cerrás se anuncia con su
  cuenta (★ 4/7), y completar todas las de una semana da +100 xp, confeti y
  las medallas *Settimana perfetta* y *Dieci perfette*.
- **Tus cuatro cuerdas** (Nation): Oggi muestra cuánto de tu semana fue input,
  output, forma y fluidez, y qué te falta.
- **Cuaderno itañol** en *Io*: las interferencias del español que se fosilizan
  (a personal, dobles, è/e, essere/avere, ci/ne, artículos…), en verde cuando
  llevás catorce días sin ese error.
- **🎁 Cofre diario** al cumplir la meta: premio sorpresa (xp, premio gordo o un
  escudo).
- **🔥 Racha con 🛡️ escudos**: cada 7 días de racha ganás un escudo, y cada
  escudo salva la racha por un día que no pudiste jugar (máximo 3).
- **Rangos**, de *Turista* a *Madrelingua*, además del nivel.
- **Calendario** de tus últimas 4 semanas, combos, confeti, sonidos y vibración.
- **Repaso espaciado sin deuda**: lo que fallás, las frases y las palabras
  entran en la cola; lo que sale bien a la primera en el entrenamiento vuelve
  una sola vez a las dos semanas, y una ficha con cuatro aciertos seguidos se
  retira. La cola muestra «hoy: 20», nunca un total de miles.
- **Seguí donde estabas**: si cerrás la app a mitad de una ronda o de una
  lección, Oggi te ofrece retomarla en el mismo punto (queda en el teléfono
  dos días).
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
- Cada texto se abre en la semana cuya gramática usa (el episodio del
  imperfetto, en la 15; los de passato remoto, en la 37), así nunca leés
  antes de la teoría.
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
- **Lo que fallás vuelve una vez, más fácil:** una pregunta de opciones vuelve
  con dos opciones y la regla a la vista; una de escribir vuelve como
  reconocimiento; una frase vuelve con fichas. Nunca la misma pantalla dos
  veces, y la segunda vez paga la mitad de xp.
- **Errores de regla y de vocabulario:** los de regla (auxiliar, concordancia,
  artículo, tiempo) se corrigen con la regla; los de vocabulario, con el
  significado de la palabra que usaste ("*caldo* significa caliente"),
  siguiendo la distinción de Ferris entre errores tratables y no tratables.
- **Deslices:** un tipeo, una tilde o un pronombre sujeto de más se marcan sin
  hacerte repetir (Corder: *mistakes* y *errors*).
- **Un hueco se juzga en su oración:** en «___ casa» o «Sono le ___» el
  diagnóstico rellena el hueco y mira la frase entera, así el artículo ve el
  sustantivo que lo sigue y la hora ve el *sono* de antes.
- **Español dentro del italiano:** *los, que, muy, tengo* y también palabras
  que ningún diccionario trae pero suenan a castellano (*tienes, señor,
  televisión*) se reconocen como español, no como tipeo; si copiaste la
  consigna entera, te lo dice.
- **Lo que no es ninguna palabra** (*gle* por *gli*, *mangie* por *mangia*,
  *genti* por *gente*) se explica como lo que es: el artículo de ese
  sustantivo, la terminación del verbo, la ortografía de la palabra; nunca
  como «concordancia» a secas.
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

### El repaso según el error

No todos los errores pesan lo mismo en el ripasso. Un desliz (un tipeo, una
tilde) deja la tarjeta avanzando; un error de regla (auxiliar, concordancia,
modo) la vuelve a empezar; un error de vocabulario también, pero pierde menos
«facilidad» y vuelve antes. Y lo que respondiste bien tres veces seguidas,
en días distintos (1, 3 y 8 días), se retira del repaso. En la simulación
del año la cola de ripasso nunca pasa de unas 150 tarjetas.

### Opciones que no regalan la respuesta

En una pregunta de opción múltiple las opciones se parecen: la misma frase
con un error típico (*La ragazze*, *Le ragaze*), las otras formas del mismo
verbo (*sono / sei / siamo*), los otros miembros de la misma clase de palabra
(*dove / quando / come*; *a / in / da*). Nunca otra frase que se descarta por
su significado. Vale para todos los tipos: en «Completá la tabla» las otras
celdas más parecidas a la respuesta (y nunca la única que repite palabras de
la fila), en «Completá la regla» formas de la misma clase, en «¿Qué
significa?» palabras del mismo campo (*fratello*: hermano / hija / tío) y del
mismo tipo, en las escuchas y en el Lampo las frases que más se parecen.
`test_game.js` lo controla en las lecciones y en las versiones de
reconocimiento.

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
| Le Fondamenta | 1–13 | A1 → A2 | Sonidos (vocales abiertas y cerradas, dobles), essere y avere, género, artículos, presente completo, pronombres, **passato prossimo**, reflexivos e imperativo |
| Il Ponte | 14–26 | A2 → B1 | Piacere, imperfetto, futuro, condicional, **ne y ci**, **pronombres combinados**, comparativos, **congiuntivo presente** |
| La Corrente | 27–39 | B1 → B2 | Congiuntivo pasado e imperfecto, concordancia, periodo hipotético, pasiva, relativos, **passato remoto**, **discurso indirecto** |
| La Vetta | 40–52 | B2 → C1 | Causativo, percepción, formas no finitas, construcciones especiales, orden de palabras, registro alto, léxico C1 |

El orden sigue la guía basada en evidencia del proyecto (y la secuencia de
adquisición del italiano L2 del Progetto di Pavia: presente → passato prossimo
→ imperfetto → futuro → condicional → congiuntivo): el passato prossimo llega
en el primer trimestre, y los clíticos *ne/ci*, los pronombres combinados y el
congiuntivo presente en el segundo. Desde la primera semana se atacan las
interferencias del castellano (dobles, vocales abiertas, *a* personal,
*essere/avere*).

El percorso es **el eje de la app**: la pantalla Oggi muestra la semana en
curso y su próximo paso, y cada semana lista **en orden** todo lo que trae:
la lección, las palabras de la semana, el entrenamiento, la escena de frases
que le corresponde (cada una de las 17 escenas tiene su semana: *Primi passi*
en la 1, *Al bar* en la 3, *Opinioni* con congiuntivo en la 27), la lectura
que se abre esa semana, el laboratorio (*Ponte* una regla por semana de la 2 a
la 10, *Falsi amici* en la 11, *Capire* cuando llega su forma) y la maestría.
Las pestañas *Allena* y *Leggi* siguen como atajos libres, y la Pausa caffè
mezcla lo de la semana en curso. Es un **camino** de 52 nodos. Cada semana
tiene **3 estrellas**, una por misión:

1. **Jugá la lección** — la teoría en pasos cortos (tablas, ejemplos con audio,
   *la trampa* que induce el castellano y *el atajo*), y después de cada bloque
   un **chequeo rápido** generado de su propio material: completar la tabla o
   elegir la frase bien escrita entre dos trampas con el error típico
   (auxiliar, concordancia, contracción, dobles). Leer y enseguida recuperar
   fija más que releer.
2. **Superá la semana** — 20 respuestas correctas con los ejercicios de la
   semana en el *Allenamento*: 12 preguntas con ejercicios del libro, banco
   propio y gimnasio de verbos, cinco vidas y combo de XP (el gimnasio y las
   palabras no cuentan para la estrella).
3. **Dominala** — **una sola sesión** de 30 preguntas de toda la semana, sin
   vidas, con lo no visto primero: con 85 % de acierto se gana. Cuenta la
   primera respuesta de cada pregunta (la segunda vuelta, más fácil, es para
   aprender); lo escrito se escribe, no se reconoce. Si no llega, el briefing
   muestra el mejor intento. El gimnasio y las palabras no cuentan para las
   estrellas.

**La semana siguiente se abre al completar todas las misiones de la semana
menos *Dominala***: la lección, las palabras, las 20 correctas, la escena de
frases, la lectura, el laboratorio y el banco que le tocan. El briefing dice
qué falta. Cada sesión de escena trae seis frases nuevas y las de laboratorio
dan primero lo no visto, así el contador avanza en cada sesión.

Los **boss** cierran cada estación: examen acumulativo (la mitad de la estación
que cierra, un cuarto de la anterior, el resto libre; el gimnasio pesa un
20 %), 85% para pasar, con el resultado por *abilità* (ascolto, lettura,
strutture, produzione), como el CILS.
Las **vidas** son un indicador, no un castigo: cada error vacía un corazón para que
veas dónde te equivocaste, pero la ronda se juega siempre hasta el final.
Aparte están el **gimnasio de verbos** (conjugación generada al vuelo) y las
**Sfide del Maestro**: los desafíos del *Soluzioni* con clave de respuestas,
cada uno una ronda corregida (elegir, completar varios blancos, traducir del
español) con la regla explicada al responder; 80% o más gana su estrella.

Cada semana trae además **📚 Palabras de la semana** (9 a 15 palabras nuevas,
no transparentes, sacadas de sus propios ejercicios, con audio y una frase de
ejemplo): primero elegís qué significan, después las escribís; quedan en el
ripasso con repetición espaciada. En *Oggi* ves cuántas palabras practicaste
contra la meta del trimestre (2.000 en el primero).

**Reconocer antes de producir**: la primera vez que aparece un ejercicio de
escribir (conjugar, completar, traducir) llega como opción múltiple; la
próxima vez, ya lo escribís. Cada palabra de la semana se presenta primero
(tarjeta con significado, audio y ejemplo) y recién después se pregunta.
El banco se abre con su gramática: *Forme* en la semana 3 (artículos),
*Traduci* y *Coniuga in contesto* en la 5 (presente), *Trova l'errore* en la 5. La semana 1 incluye **escucha sin texto**
(*nonno* o *nono*, *casa* o *cassa*, *cena* o *scena*) y *Trova l'errore* se
abre en la semana 5, cuando ya podés leer la oración.

Además hay una cola de **ripasso** con repetición espaciada (SM-2 simplificado)
sobre todo lo ya jugado, racha diaria y once medallas.

### Nada antes de su teoría

Cada semana toma ejercicios de los dos libros, y un capítulo de sustantivos
puede traer frases en imperfetto (*il popolo danese era contro…*) o un
superlativo en passato prossimo (*le vittime più tragiche sono state…*).
`tools/sillabo.py` lee cada ejercicio, reconoce los tiempos verbales que usa
(con un léxico de formas generado por el conjugador: `tools/forms_lexicon.js`)
y otras construcciones (pronombres combinados, *ne*, *cui*, gerundio,
comparativos, y también la elisión *un'amica / dov'è / un po'*, los plurales
en *-chi/-ghi*, los números escritos, los posesivos y el *Lei* de cortesía,
que no usan ningún tiempo nuevo pero sí una regla de una semana concreta), y
calcula **la primera semana cuya teoría lo cubre todo**:

- En el enunciado, que solo se lee, el presente vale desde el principio.
- En la respuesta, lo que escribís o elegís, el presente cuenta desde la
  semana 5; *essere* y *avere* se enseñan en la semana 1.
- Lo que una semana todavía no puede pedir pasa, como repaso, a la semana
  donde ya se enseñó; ahí cada ronda mezcla unos pocos (la cuarta parte como
  máximo).
- Los ejercicios de *For Dummies* se reparten por tema, bloque por bloque, y
  no por capítulo: el capítulo 3 mezcla sustantivos (semana 2), artículos
  (semana 3) y sufijos (semana 46). Lo mismo con las secciones de cada capítulo del
  *Soluzioni*: cada una va a la semana de su tema, y cada ejercicio aparece una sola
  vez fuera de los exámenes y repasos.
- El gimnasio de verbos solo usa como distractores tiempos ya vistos; el
  banco (*Traduci*, *Completa*, *Trova l'errore*, la Clínica y la Pausa)
  y los juegos de *Capire* filtran por la semana a la que llegaste.

- **Vocabulario**: `tools/lessico.py` sabe desde qué semana se conoce cada
  palabra (el nivel del banco, lo que ya mostró la teoría, o cognado
  transparente para un hispanohablante, que se comprueba contra el diccionario
  de castellano con las reglas del Ponte). Lo que escribís tiene que ser
  vocabulario ya visto; en lo que leés se toleran hasta dos palabras nuevas.
  Las palabras que no están en el banco tienen significado y nivel en
  `tools/bank/glossario.py`.
- **Toque en la palabra**: en cualquier ejercicio (salvo los que preguntan el
  significado) tocás una palabra italiana y ves qué significa; las que todavía
  no viste en el curso aparecen subrayadas (`docs/data/glossario.json`).

### Lecciones en partes

Una semana cargada no se estudia de una sentada. Las semanas 1, 2, 3, 5, 6,
7, 8, 9, 10, 11, 12, 15, 17, 18, 19, 21, 23, 24, 28, 30, 33, 34, 40, 42, 44,
50 y 51 tienen la lección dividida en **partes** (dos a cuatro), cada una con sus propios bloques de teoría y sus propios ejercicios:
en la semana 3, por ejemplo, *Determinados*, *Indeterminados*, *Preposiciones
articuladas* y *Partitivo y usos del artículo*. En el percorso cada parte es
una misión («Lección 2/4: Indeterminados»), y «A entrenar esta parte» arma
una ronda solo con los ejercicios de esa parte (más el repaso que toque). La
semana siguiente se abre cuando están todas las partes.

Las partes se declaran en `tools/lessons/` (`"parts"`: título, bloques y una
expresión regular que reparte los ejercicios por su consigna);
`tools/build_course.py` comprueba que cubran todos los bloques una sola vez y
manda lo que no encaja en ninguna a la última parte.

### Antes del jefe

Las semanas de jefe (13, 26, 39 y 52) traen la teoría de la estación en
repasos por tema («Repaso: pronombres, passato prossimo, reflexivos»), cada
uno con sus ejercicios, y la misión **🩹 Tus puntos débiles**: una ronda con
lo que fallaste de la estación y lo que casi no viste. Son opcionales: la
semana siguiente la abre el jefe. El jefe pregunta más de las semanas donde
acertaste menos (hasta tres turnos por semana en vez de uno) y, dentro de
cada semana, primero lo que fallaste.

### ✍️ Scrivi: tu texto de la semana

Cada semana, menos las de jefe, pide un texto corto con la función de la
semana: presentarte (semana 1), contar el fin de semana (11), pedir una
habitación con cortesía (20), opinar con congiuntivo (25), contar la vida de
Garibaldi en passato remoto (37), un texto argumentativo formal (49). La
consigna pide un mínimo de palabras (15 en A1, 60 en C1) y las estructuras de
la semana («4 verbos en passato prossimo»), y la lista se va tildando
mientras escribís. **Revisar** marca en el texto los errores que el
hispanohablante comete de verdad, con la explicación: español metido
(*cansado*), artículo que no va con el sustantivo (*una amica*, *la
problema*), *ho andato*, *mi ho lavato*, «a» personal, *il mio padre*, *mio
libro*, *a il*, *se avrei*, *penso che è* (desde el congiuntivo), *molto
pasta*, *c'è due*, *lui e alto*, *sono trenta anni*, dobles y tildes, y
además familias enteras: castellano escrito a la italiana (*perfectamente*,
*manejare*, *casita*, *andarò*), calcos (*ho che studiare*, *lo che*, *di
accordo*), preposiciones con ciudades, países, lugares y personas (*in Roma*,
*a Toscana*, *al medico*, *alla banca*) y con infinitivos (*comincio
studiare*, *voglio di*), artículos por sonido (*i snack*, *la aranciata*),
pronombres combinados (*mi la*, *gli la*), relativos (*in che*),
concordancias (*questo foto*, *i miei chiavi*, *vino rossi*), persona con
sujeto (*io aiutava*, *la gente sono*, *mi piace i*), auxiliares y
participios en todos los tiempos (*avrei andato*, *siamo tornato*, *li ho
visto*, *vivuto*), congiuntivo después de *penso che*, *benché*, *pensavo
che*, *come se*, y falsos amigos en contexto (*salgo di casa*, *un vaso
d'acqua*, *toccare la chitarra*). Las reglas se miden con un corpus de 96
textos de estudiantes con 502 errores anotados (`tools/scrivi_corpus.json`):
el corrector propio marca el 61 % sin marcar nada en las versiones
corregidas ni en las frases del curso, y `tools/test_scrivi.js` fija esos
pisos por familia. Lo que se escapa (pronombres por referente, tiempos
según el contexto, léxico) lo agarran la IA y LanguageTool. Después
podés ver un texto modelo. Lo que entregás cuenta como **output** en las
cuatro cuerdas, suma xp y los errores van al perfil de la clínica. La misión
es obligatoria para abrir la semana siguiente: es el único lugar del curso
donde escribís sin respuesta cerrada.

**Segunda opinión de LanguageTool.** Al revisar, la app también manda el
texto a la API pública y gratuita de LanguageTool (sin clave; unas 20
consultas por minuto, de sobra para una persona). Lo que encuentra se suma a
la lista, con su mensaje en italiano y la corrección propuesta («Gramática
(LanguageTool): … → *piena*»); lo que el corrector propio ya marcó, con su
explicación en castellano, no se repite. La revisión local aparece al
instante y la de LanguageTool cuando llega; sin conexión o sin cupo, queda
solo la local. Se puede apagar con la casilla de la pantalla, porque el
texto se envía a sus servidores.

**Corrector con IA (opcional).** LanguageTool casi no controla la
concordancia ni la persona del verbo en italiano. Para una corrección
completa, la app usa **Groq** con una clave gratuita del usuario
(*console.groq.com/keys → Create API Key*, empieza con `gsk_`) y, de
respaldo, **Gemini** (*aistudio.google.com/apikey*, empieza con `AIza`):
si Groq falla, no responde a tiempo o no hay clave de Groq, pregunta a
Gemini. La IA marca cada error del texto con su explicación en castellano y
agrega la versión corregida y una devolución. A cada servicio la app le pide
la lista de modelos de esa clave y usa el mejor disponible (en Groq Kimi K2,
gpt-oss-120b, Llama 3.3 70B…; en Gemini 2.5 Flash, 2.0 Flash, Flash-Lite…),
así no depende de nombres que cambian; descarta los de audio, imagen,
embeddings y los inactivos. Si un modelo tarda más de 20 segundos, está
saturado, pide plan pago o no acepta el modo JSON, prueba el siguiente, y
recuerda el que anduvo. Las claves quedan solo en el teléfono (no entran en
las copias de seguridad) y el texto se envía a Groq o a Google. Lo que la IA marca reemplaza lo que el corrector
propio o LanguageTool dijeron sobre las mismas palabras.

**«🤖 Explicame» en cualquier ejercicio.** Con la clave guardada (en Scrivi o
en *Io → Corrector con IA*), después de un error aparece el botón: la IA
explica qué está mal y la regla, y dice si la respuesta en realidad también
valía o si la corrección de la app confunde. Esos casos quedan en *Io →
Correcciones para revisar*, con un botón para copiarlos todos juntos.

El corrector propio también sabe **quién habla**: en un texto en primera
persona («Mi chiamo…», «io», «mio»), un verbo sin sujeto en otra persona se
marca (*Mi chiami → mi chiamo*, *Hanno 32 anni → ho*), igual que un adjetivo
en otro número (*sono felici → felice*, *siamo contento → contenti*) y el
singular después de un número (*32 anno*, *due fratello*).

El corrector (`docs/js/scrivi.js`) usa como diccionario todo el italiano del
curso (respuestas, frases, lecturas, banco y glosario): una palabra que no
conoce no se marca como error, porque en un texto libre es más probable que
sea rara que mal escrita. `tools/test_scrivi.js` comprueba que los 48 textos
modelo cumplan su consigna sin marcas y que los errores típicos se detecten.

`test_game.js` verifica que ninguna semana pida nada antes de su teoría, y
`python3 tools/sillabo.py` lista qué ejercicio esperó a qué semana y por qué.
Si se reordena el programa, las semanas de cada tiempo se ajustan en
`TENSE_WEEK`, dentro de `tools/sillabo.py`.

## Contenido

| Fuente | Cantidad |
|---|---|
| Ejercicios auto-corregibles de *For Dummies* | 871 |
| Ítems propios de nivel B2/C1 en español | 144 |
| Desafíos del *Soluzioni*, con clave de respuestas | 339 grupos / 1.637 sub-ítems |
| Lecciones de teoría (una por semana) | 52, con 221 bloques |
| Tablas gramaticales y ejemplos bilingües | 76 tablas / 349 ejemplos |
| Verbos en el motor de conjugación | 96 |
| Tiempos y modos generables | 14 |

**Revisión lingüística.** Todo el contenido pasó por una revisión de italiano
nativo: banco de frases y errores, palabras, lecciones, ítems propios, lecturas
y los dos bancos extraídos de libros (este último con ~125 respuestas corregidas
en *Dummies* y errores de extracción limpiados en *Soluzioni*). Las reglas que
el corrector enuncia en español también se revisaron una por una.

**Diseño.** «La Via» es una calle: el logo y el título de cada semana son
**placas de calle romanas** en travertino, con la semana en números romanos
(*Settimana XVII*). Las tarjetas grandes llevan un patrón de **maiólica** de
Vietri sobre verde botella, limón de Amalfi, terracota y azul cobalto, y la
Pausa caffè tiene el **toldo a rayas** de un bar. Tipografías: *Bodoni Moda*
(Bodoni era de Parma) solo para los títulos grandes, y *Atkinson Hyperlegible
Next*, diseñada para leer fácil, para todo lo demás, servidas desde
`docs/fonts/` (licencia SIL OFL, incluida) para que funcionen sin red. Con
modo oscuro.

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
  sillabo.py             desde qué semana se puede pedir cada ejercicio
  lessico.py             desde qué semana se conoce cada palabra; glosario
  check_lessons.py       formato y sillabo de la teoría
  forms_lexicon.js       léxico de formas verbales para el sillabo
  authored/              banco de ítems propios (Python legible)
  lessons/               teoría de las 52 semanas (s1..s4, una por estación)
  test_conjugator.js     1.442 comprobaciones de formas verbales
  test_game.js           ~21.500 comprobaciones de datos y lógica
  test_frasi.js          ~24.000 comprobaciones de frases, laboratorio, lecturas, pausa, racha y cofre
  test_diagnosi.js       mete ~1.600 errores típicos en las oraciones del banco y verifica el diagnóstico
  build_bank.py          valida y compila el banco
  bank/                  el banco en Python legible
```

## Cómo se acomoda a los cursos oficiales

Las instituciones (Dante Alighieri, Istituto Italiano di Cultura, Università
per Stranieri, con el *Profilo della lingua italiana* y manuales como *Nuovo
Espresso* o *Nuovo Contatto*) organizan el italiano en **unidades
comunicativas**: cada una dice qué se aprende a hacer, con qué gramática y en
qué campo léxico, y ocupa unas tres clases. El curso toma esa estructura sin
romper su orden gramatical:

- Cada semana lleva, además del tema de gramática, **lo que vas a poder hacer
  al final** y su campo léxico (en el briefing: «🎯 Al final de la semana:
  pedir algo en el bar y decir qué hay · Café y bar italiano»). La tabla está
  en `SAI_FARE`, dentro de `tools/build_course.py`, semana por semana.
- Una unidad son varias clases: por eso las semanas cargadas tienen la lección
  en partes (ver «Lecciones en partes»).
- Las cuatro estaciones siguen las bandas del MCER como esos programas: A1 en
  las semanas 1–6, A2 en 7–18, B1 en 19–28, B2 en 29–39 y C1 en 40–52, con un
  examen al cerrar cada banda. En horas, el año (~105 h con las siete sesiones
  semanales de la simulación) queda dentro del rango que esas escuelas dan a
  cada nivel sumado a lo que se practica en la app fuera de clase.

## Qué toma de la guía «Aprender italiano hasta C1 en un año»

| La guía dice | En la app |
|---|---|
| Retención sin backlog: 20-30 fichas nuevas por día, cola al día | Fichas ligeras para lo que sale bien, retiro a los cuatro aciertos, «hoy: 20» |
| Recuperación y espaciado son las únicas técnicas de alta utilidad | Todo es recuperación: ronda, ripasso, escribir de memoria, sfida del giorno |
| Cuatro destrezas de Nation en partes iguales | Medidor «Tus cuatro cuerdas» con el consejo de lo que falta |
| Cuaderno de errores itañol | Cuaderno itañol en *Io*, Clínica de errores, diagnóstico por categoría |
| Fin de semana liviano, sin parar del todo | Meta a la mitad sábado y domingo |
| Simulacros CILS por *abilità* al cierre de cada fase | Los jefes ponderan la estación y muestran el resultado por abilità |
| Vocabulario escalonado y medible | Meta de palabras por trimestre alcanzable (800 / 1.800 / 2.800 / 3.800) y *Parole* a un toque en Oggi |
| Registro formal y colocaciones en C1 | Escenas C1: la mail formal, discutir, el aneddoto, la burocracia; Martín 11-13 |
| Pronunciación explícita temprana | Escucha sin texto en la semana 1, audio en las tablas de sonidos |

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
node tools/test_scrivi.js       # los textos modelo de Scrivi cumplen; el corrector marca los errores típicos
node tools/sim_carriera.js      # una carrera entera: carga por semana, ripasso, cobertura, jefes
```

Si cambiás algún archivo de `docs/`, subí `VERSION` en `docs/sw.js` y `APP_VERSION` en
`docs/js/app.js` (la versión que se ve abajo de Oggi e Io; `test_game.js` controla que
coincidan) para que los
teléfonos descarguen la versión nueva.

`test_conjugator.js` valida las 14 conjugaciones contra formas verificadas
(incluidas las irregularidades del *passato remoto* en patrón 1-3-3 y las reglas
ortográficas de *-care/-gare/-ciare/-giare*). `test_game.js` comprueba, entre
otras cosas, que las 52 semanas sean superables y que la respuesta impresa en el
libro se acepte siempre como correcta. `build_course.py` valida además que las
52 semanas tengan lección, que ninguna tabla tenga filas desparejas y que no
queden bloques vacíos.

La teoría vive en `tools/lessons/*.py` como diccionarios legibles, en formato
corto para leer en el teléfono: cada bloque es una idea, con título, **la regla
en ≤ 30 palabras** (`r`), una tabla y/o hasta 5 ejemplos `[italiano,
castellano]`, una trampa y un atajo (≤ 30 palabras cada uno), y el detalle
opcional (`more`) plegado bajo «¿Por qué? Más detalle». En la lección jugada,
un bloque con tabla y ejemplos se muestra en dos pantallas.
`python3 tools/check_lessons.py` controla el formato, los límites y que los
ejemplos no usen tiempos de semanas posteriores (salvo bloques «Adelanto»). Dentro del texto, `*forma*` marca una forma italiana y
`**texto**` una regla clave. Para editar una lección se toca ese archivo y se
vuelve a correr `python3 tools/build_course.py`.

## Dos advertencias honestas

**El *Soluzioni* no trae soluciones.** Su edición digital deja las respuestas en
el sitio del editor, así que sus 1.632 sub-ítems **no se corrigen solos**: el
juego los presenta como desafíos abiertos que resolvés por escrito, verificás
contra el capítulo y puntuás vos. Todo lo que el juego corrige automáticamente
sale del banco de *For Dummies*, del motor de conjugación y del banco propio.

**Los desafíos del *Soluzioni* se corrigen.** (Aviso viejo, ya resuelto: 338
de los 339 grupos se juegan con corrección automática; quedan repartidos a lo
sumo 12 por semana.)

**Esto es gramática, no un curso completo.** Un año de este juego te da el
sistema gramatical del C1 con solidez, pero el C1 real también exige volumen de
lectura, escucha y producción oral. El curso es el andamio; la exposición al
idioma la tenés que poner aparte.

Los dos manuales son obra con derechos de autor y no se incluyen en el repo:
los scripts de extracción trabajan sobre las copias que tengas vos, y el material
generado es para estudio personal.
