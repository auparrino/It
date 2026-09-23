# Auditoría 2: después de las correcciones

Segunda vuelta sobre el código ya mergeado (PR #7 y #8), con las mismas dos
lentes de la primera: un **principiante disperso** que entra de cero y una
**carrera completa** de 52 semanas. Cierra con lo que encontró el usuario
probando en el teléfono y con lo que quedó corregido en esta misma vuelta.

## Método

- **Carrera**: `node tools/sim_carriera.js --json`, siete días por semana con
  pausa y ripasso diarios, un estudiante que acierta el 90 % de las opciones
  y el 80 % de lo que escribe. Cuatro corridas (antes y después de cada
  corrección de esta vuelta); se informa la última.
- **Principiante**: `scratchpad/beginner2.js` (Playwright, celular 390×844,
  perfil persistente). Entra sin leer nada, adivina, escribe en español,
  cierra la app a mitad de la pausa y a mitad de la lección, vuelve, y hace
  las misiones de la semana 1 en orden. Todo lo que ve queda en un log y se
  marcan automáticamente textos rotos, opciones repetidas o vacías y
  diagnósticos sobre opciones en español.
- **Barridos**: integridad de los 2.960 ítems, tres corridas de los chequeos
  de las 52 lecciones, y ejemplos de las 467 palabras de la semana.

## La carrera en números (antes → ahora)

| | Auditoría 1 | Ahora |
|---|---|---|
| Semanas sin dominar | 4 (9, 30, 38, 50) | **0** |
| Ejercicios nunca vistos | 777 de 2.960 | **220** |
| Cola de ripasso: máximo · al final | 2.722 · 2.206 | **677 · 319** (Oggi muestra «hoy: 20») |
| Sfide en la semana 52 | 118 grupos (4 h) | **12** (tope en todas las semanas) |
| Misiones de la estación C1 fuera de la gramática | 1 escena, 0 lecturas | 5 escenas, 3 Martín, 3 Cultura |
| Rango al terminar | *Poeta* (nivel 40; *Madrelingua* pedía 1,26 M xp) | ***Madrelingua*** (nivel 44) |
| Jefe 13: preguntas de la semana 1 · gimnasio | 10 · 7 de 25 | 5 · 5 |
| Palabras de la semana sin ejemplo | 213 de 485 | **0** de 467 |
| Ítems rotos · duplicados · errores de ejecución | 0 · 0 · 0 | 0 · 0 · 0 |
| Horas en el año | 63 (3 sesiones/semana) | 105 (7 días/semana, ~17 min/día) |

Los cuatro jefes se pasan al primer intento (92, 100, 88, 95 %). Ninguna
semana pasa de 147 minutos ni baja de 90 (mediana 121, con la pausa y el
ripasso diarios adentro). La cola de ripasso crece hasta el día 150 y
después baja: ya no es una deuda.

## Lo que encontró el usuario en el teléfono (y quedó corregido)

1. **Distractores que delatan la respuesta.** «fantasma → ___» con opciones
   *cani / temi / baci / fantasmi*: se acierta por parecido, no por la regla.
   Ahora las opciones son formas erróneas de la misma palabra (*fantasme /
   fantasma / fantasmas*), los otros artículos del mismo número (*la / l' /
   il / lo*) o las otras formas de la preposición articulada (*allo / all' /
   agli*), y una respuesta corta solo se compara con respuestas del mismo
   largo (`recognitionOf`, `docs/js/drills.js`).
2. **Un chequeo sin sentido.** «¿Cómo se dice en italiano? *en -i*» con
   opciones *la crisi → le crisi / la città → le città; il caffè → i caffè /
   Le città italiane sono belle*: el generador tomaba una fila de tabla con
   su comentario como si fuera una frase con traducción. El filtro de
   traducción ya rechaza flechas, listas, notas de sufijo («-i»), ítems
   numerados y metalenguaje («3. Artículo con el posesivo»). Barrido: 699
   chequeos en tres corridas, ninguno con flecha en la respuesta.
3. **Misiones que repiten y no avanzan.** Ponte y Capire sacaban 8 y 10
   palabras al azar (por eso 11/16 después de dos sesiones) y la escena
   traía 4 frases nuevas por sesión. Ahora el laboratorio da primero lo no
   visto y la escena trae 6 frases nuevas: cada sesión mueve el contador.
4. **Misiones obligatorias para avanzar** (pedido del usuario). La semana
   siguiente se abre al completar todas las misiones de la semana menos
   *Dominala*: lección, palabras, 20 correctas, frases, lectura, laboratorio
   y banco. El briefing dice «🔒 La semana N se abre al completar estas X
   misiones», y al cerrar la última aparece «🔓 ¡Semana N abierta!». El
   gimnasio y las palabras no cuentan para las 20 correctas.
5. **«tener que» → dovere con ejemplo *Di dove sei?*.** Mi generador de
   formas tomaba *dove* como forma de *dovere* (y habría tomado *fine* por
   *finire*, *capo* por *capire*, *da* por *dare*). Las formas de un verbo
   salen ahora del conjugador (`sillabo.lexicon()["lemmas"]`); todos los
   ejemplos de verbos verificados.

## Principiante disperso: segunda partida

340 pantallas registradas, **0 anomalías** automáticas (ningún texto roto,
ninguna opción repetida o vacía, ningún diagnóstico sobre opciones en
español). Lo que vio, en orden:

- **Cierra la app a mitad de la pausa y a mitad de la lección**: al volver,
  Oggi ofrece «⏸️ Dejaste algo a medias · Pausa caffè 5/6 / Lección 7/14 ·
  Seguir donde estaba», y retoma en el mismo ítem. Funciona.
- **Lección**: 5 chequeos, ninguno binario; al errar aparece la regla del
  bloque. Al terminar: «★ Misión completada · 1/6» y «Para abrir la semana
  2: Palabras de la semana, Superá la semana, Frases: Primi passi, Lectura».
- **Entrenamiento** (adivinando): 12 preguntas que se vuelven 21 con una
  sola repetición por error, ya en otra forma («🔁 Segunda vez, más fácil»,
  dos opciones). Resultado con «Lo que aprendiste hoy» de una línea por
  ítem y «← Seguir el percorso».
- **Palabras de la semana**: tarjeta de palabra nueva antes de cada
  pregunta; 12/12 practicadas en una sesión.
- **Frases**: 6 nuevas por sesión (8/18 con las dos de la pausa).
- **Lectura**: al errar una pregunta se abre el texto; la misión se cierra
  al leer.
- **Sfida del giorno** con doble xp, primera ronda del día +25, meta
  cumplida y cofre; Ripasso «hoy: 17»; cuatro cuerdas «Input 28 % · Output
  0 % · Forma 62 % · Fluidez 9 %. Te falta output».
- **Lo que escribió en español** («gracias» en un hueco) recibió «*gracias*
  es español. ¿Cómo se dice en italiano?», después «💡 más pista: a_____»
  y recién después la respuesta.

Dos cosas que la partida sacó a la luz y quedaron corregidas en esta vuelta:

- Una ronda que arranca desde «A entrenar» al terminar la lección no
  ofrecía «← Seguir el percorso» (solo «Otra ronda / Inicio»). Ahora sí.
- La versión «más fácil» de un ejercicio de conjugar (*siamo*) inventaba
  formas con otra vocal (*siame*, *siami*) y el diagnóstico hablaba de
  «concordancia, en singular». Las variantes de la misma palabra quedan
  para sustantivos, adjetivos y artículos; un ítem de conjugar toma las
  otras personas del mismo verbo, y un ítem que nombra sus alternativas en
  la consigna («o» o «ho», «è» o «e») las usa como opciones. En las fichas
  no se diagnostican ya falsos amigos ni palabras del español (todas las
  fichas son italianas), y la lista «También:» no repite categorías.

Observación sin cambio: con 19 aciertos en 116 respuestas la meta diaria
(200 xp) se cumplió igual, por los bonos (primera ronda, sfida con doble
xp, lección, lectura, adivinanzas). La meta mide constancia más que
acierto; está bien que un principiante que juega 25 minutos la alcance.

## Verificación final

Sobre el código de esta vuelta: `test_game`, `test_frasi`, `test_diagnosi`,
`test_conjugator` y `check_lessons` pasan; la simulación de la carrera da
los números de la tabla de arriba; la partida del principiante, 0
anomalías. Service worker en v22.

## Lo que queda

- **Bloques de lección sin chequeo**: semanas 1 (2 de 7), 10 (3 de 4), 13
  (2 de 8), 32 (3 de 4), 51 (2 de 5) y 52 (4 de 5). Son bloques de texto
  suelto sin formas italianas suficientes para «Completá la regla»; la
  única salida es escribirles un chequeo a mano en `tools/lessons/`.
- **Diagnóstico de una palabra sola**: en «tener que → ___» escribir *dove
  que* devuelve «*que* es español y acá sobra», que es cierto pero no
  ayuda; para las palabras de la semana convendría un mensaje directo
  («*dove* = dónde; tener que = *dovere*»).
- **Semanas 50 y 51** (pools de 180 y 554 ítems de repaso): la cobertura
  exige 40 vistos y el resto queda para el ripasso; es lo esperable en
  semanas de repaso, pero nadie ve el 80 % de ese material.
- **Medallas que la simulación no alcanza** porque no juega Lampo ni escribe
  frases de memoria ni cierra misiones: *Fulmine*, *Prima penna*,
  *Scrittore*, *Settimana perfetta*, *Dieci perfette*, *Quattro corde*,
  *Sfidante del giorno*, *Cinquecento parole* (el percorso solo trae 467:
  hacen falta las *Parole* del banco). Son alcanzables jugando.
- **La guardia contra el doble toque** (300 ms después de cada pantalla)
  también se traga un toque rápido legítimo; un dedo ansioso lo nota.
