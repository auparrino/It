# Plan: el resto del curso de griego (semanas 14 a 52)

*Δρόμος C1* tiene escrita la primera temporada (13 semanas, del alfabeto a
A2). Este plan ordena todo lo que falta para llegar a C1: las otras tres
temporadas (39 semanas), sus revisiones y los módulos que el griego todavía
no tiene. **Qué se enseña cada semana** está en `tools/el/TEMARIO.md`; acá va
**en qué orden se hace y cuándo un paso está terminado**.

## Cómo se usa

**Para el alumno.** Abrí una sesión nueva de Claude Code sobre este repo y
escribí:

> Seguí con el plan del griego.

Antes, elegí el modelo de la columna «Modelo» del paso que sigue
(`/model claude-opus-5-5` o `/model claude-sonnet-5-5`). Una sesión = un
paso. Si querés uno en particular: «Hacé el paso G4 del plan del griego».

**Para la sesión que lo ejecuta.**

1. Leé este archivo entero, `tools/el/TEMARIO.md`, `README-griego.md` y el
   «Procedimiento común» de `auditorias/PLAN.md` (sobre todo: `docs/` se
   regenera en un clon limpio, si no el CI falla).
2. Tomá el primer paso `pendiente` de la tabla (o el que te pidieron; si hay
   uno `en curso`, seguí ese). Si el modelo de la sesión no es el de la
   columna, avisale al alumno antes de empezar.
3. Rama nueva desde `main`, PR, CI en verde (todos los jobs) y merge: GitHub
   Pages publica `main/docs`, así llega a la app. El alumno ya autorizó
   mergear los pasos de este plan con el CI en verde.
4. En el mismo PR, actualizá la tabla (paso → `hecho`, fecha, PR) y anotá en
   la bitácora lo que quedó pendiente.
5. Al terminar, contale al alumno en pocas líneas qué va a notar en la app,
   qué se verificó y qué no.

**El ritmo.** Lo único que apura es que el curso escrito vaya **por delante
del alumno**: que siempre haya al menos una temporada lista antes de que
llegue. Si el alumno está a menos de 4 semanas del final de lo escrito,
los pasos de semanas van antes que cualquier módulo.

## Estado

| Paso | Qué | Modelo | Estado | PR / fecha |
|---|---|---|---|---|
| G0 | Preparar el terreno: cuatro temporadas, jefes y tests para 52 semanas | Sonnet | pendiente | |
| R1 | Revisión de la temporada 1 (semanas 1-13) | Opus | pendiente | |
| G1 | Semanas 14-17: pronombres débiles, genitivo, objeto indirecto, imperativo | Opus | pendiente | |
| G2 | Semanas 18-21: verbos en -ώ, imperfecto, imperfecto/aoristo, aspecto | Opus | pendiente | |
| G3 | Semanas 22-26: comparar, relativas, ότι/να/αν, aoristo de -μαι, indefinidos + jefe T2 | Opus | pendiente | |
| M1 | Frases de conversación y lecturas graduadas, semanas 1-26 | Opus | pendiente | |
| M2 | Diagnóstico de errores por categoría (lo que tropieza el hispanohablante) | Opus | pendiente | |
| R2 | Revisión de la temporada 2 (semanas 14-26) | Opus | pendiente | |
| M3 | Conjugador y gimnasio de verbos | Opus | pendiente | |
| G4 | Semanas 27-30: perfecto, pluscuamperfecto, aoristo pasivo, participio | Opus | pendiente | |
| G5 | Semanas 31-35: condicionales, cortesía, discurso indirecto, declinaciones, conectores | Opus | pendiente | |
| G6 | Semanas 36-39: formación de palabras, orden marcado, fiestas y -ούμαι + jefe T3 | Opus | pendiente | |
| M4 | Escritura libre, ruta de trabajo y role-play laboral | Opus | pendiente | |
| R3 | Revisión de la temporada 3 (semanas 27-39) | Opus | pendiente | |
| M5 | Sonidos (pares mínimos), dictogloss, radio y duelos | Opus | pendiente | |
| G7 | Semanas 40-44: katharévousa, participios cultos, argumentar, prensa, registro formal | Opus | pendiente | |
| G8 | Semanas 45-48: fraseología, partículas, hipótesis, literatura | Opus | pendiente | |
| G9 | Semanas 49-52: variedades, resumir y mediar, escritura C1 + examen final | Opus | pendiente | |
| M6 | Frases y lecturas 27-52, Biblioteca (textos de dominio público) y banco | Opus | pendiente | |
| R4 | Revisión de la temporada 4 (semanas 40-52) y del examen | Opus | pendiente | |
| C1 | Cierre: muestra aleatoria de 300 unidades con un auditor nuevo | Opus | pendiente | |

**Por qué este orden.** G0 primero porque sin él el build no acepta más de
13 semanas. R1 antes que la temporada 2 porque el alumno está usando la 1
ahora y la 2 se apoya en ella: un error de la 1 se copiaría. La temporada 2
entera antes de los módulos, para ir por delante del alumno. Los módulos
van cuando ya hay contenido que los alimente: frases y lecturas con 26
semanas escritas, el conjugador cuando ya están todos los tiempos
simples (presente, aoristo, imperfecto, imperativo, -μαι), el diagnóstico
cuando se sabe qué falla. Cada temporada se revisa entera antes de pasar a
la siguiente.

## Bitácora

(Cada sesión agrega una línea: fecha, paso, qué quedó pendiente.)

- 2026-11-24 · plan creado, con el temario semana por semana de las
  temporadas 2 a 4 en `tools/el/TEMARIO.md`. Temporada 1 publicada en la
  v3.32 (13 semanas, 728 ejercicios, sin revisión independiente todavía).

---

## Los pasos

### G0 · Preparar el terreno (Sonnet)

- `tools/el/curso.py`: las cuatro temporadas en `SEASONS` (nombres, niveles,
  semanas y `blurb` del temario); lo que hoy da por hecho una sola temporada
  (`SEASON = SEASONS[0]`, textos de `docs/lang/el/lang.js`, README-griego)
  pasa a leer la temporada de cada semana.
- **Jefes**: ver cómo marcan italiano y portugués la semana de jefe
  (`"boss"` en `tools/it/build_course.py`) y hacer que el griego lo tenga en
  las semanas 13, 26, 39 y 52. La 13 ya está escrita: G0 deja el mecanismo
  listo y los ejercicios del jefe de la temporada 1 los escribe R1 (con Opus).
- `tools/el/test_curso.js` y los tests comunes adaptados al curso de 13
  semanas: que pasen con 13 y con más (probar con una semana 14 de prueba que
  después se borra).
- Que `sim_carriera.js el` simule el curso que haya, sea del largo que sea.
- Sin contenido nuevo en griego. Versión de la app si cambia JS/CSS.

### R1-R4 · Revisión de una temporada (Opus)

Como la revisión del alemán (PR #84) y las listas de chequeo de
`auditorias/PLAN.md` (fases 2-5):

- **Dos revisores independientes** por semana (agentes con Opus que no ven el
  trabajo del otro), con la lista de chequeo de abajo. Lo que marca uno solo
  lo decide un tercero. Si lo que no se vio estimado (*a·b/c − (a+b−c)*)
  pasa del 1 % de los ejercicios, tercera pasada.
- **Lista de chequeo del griego**: griego monotónico correcto y natural (no
  calcado del castellano); cada acento en su sílaba; `answer` correcta y
  `accept` con todas las variantes que daría un griego (orden libre, sujeto
  omitido, *μία / μια*, *επτά / εφτά*, *χθες / χτες*) y ninguna incorrecta;
  los distractores se descartan por la regla de la semana; nada antes de su
  teoría ni palabras sin enseñar; la nota explica el porqué desde el
  castellano; «cómo suena» bien transcripto (semanas 1-4).
- Contra fuentes, no contra la intuición: la gramática de Holton, Mackridge y
  Philippaki-Warburton, la de Τριανταφυλλίδης y el diccionario
  *Λεξικό της Κοινής Νεοελληνικής* (Ινστιτούτο Νεοελληνικών Σπουδών, en
  línea en el portal del Κέντρο Ελληνικής Γλώσσας) para acentos, géneros y
  plurales.
- **Cada clase de error que aparezca 3 veces se vuelve un control** en
  `tools/el/check_semana.py` o un test, para que no vuelva.
- Registro: las unidades revisadas quedan `revisada-2`
  (`node tools/audit/inventario.js --marcar el lote.json`, si el inventario
  ya cubre el griego; si no, agregarlo en R1).
- Informe en `auditorias/AAAA-MM-griego-tN.md`: cuántos hallazgos, de qué
  tipo, qué controles nuevos.
- **R4** revisa además el examen final entero y los textos literarios
  (que la edición citada sea la de dominio público).

### G1-G9 · Escribir semanas (Opus)

Cada paso escribe las semanas que dice la tabla, **una por archivo**
(`tools/el/semanas/sNN.py`), con el mismo esquema y la misma vara que la
temporada 1:

- La gramática y el léxico del temario de esa semana; si al escribir
  conviene mover algo, se cambia primero el temario (y se dice en la
  bitácora).
- **Las palabras**: antes de escribir, fijar la lista de la semana (18-25
  palabras, más en B2-C1) en «Las palabras de cada semana» del temario. Lo
  que el alumno escribe sale de esa lista, de la lección o de una semana
  anterior; si no, glosa en la consigna.
- **El sílabo**: cada estructura nueva tiene su regla en `tools/el/sillabo.py`
  (con su semana), así ningún ejercicio anterior la pide. Lo que la lección
  explica antes como fórmula va en `FIXED`. Ojo con las ambigüedades del
  griego (ver «Riesgos»).
- 45-55 ejercicios por semana, de reconocer a producir; desde la temporada 2,
  al menos el 40 % de producción (`cz`, `tr`, `ty`, `di`), y al menos un `tr`
  o `ty` que use la semana para lo que dice «Para qué».
- 3-4 objetivos «Ya puedo…» (`can`), un «¿Qué notás?» cuando la regla se
  puede descubrir mirando ejemplos.
- **La semana de jefe** (26, 39, 52): repaso de la temporada con ejercicios
  nuevos (no copiados de semanas anteriores) y el jefe.
- **Cómo se trabaja**: un agente con Opus por semana, en paralelo (archivos
  disjuntos: cada uno solo su `sNN.py`; las listas de palabras del temario las
  junta la sesión). Ninguno corre el build ni hace git. Después, dos revisores
  independientes por semana con la lista de chequeo de R, y un tercero que
  decide; la sesión aplica las correcciones.
- **Antes de subir**: `python3 tools/el/check_semana.py`, build en un clon
  limpio hasta que dos corridas no cambien nada, audios con
  `tools/audio/grabar.py el`, `npm test`, `npm run sim` (sin duplicados, nada
  movido de semana sin querer), `node tools/audit/inventario.js --sync`.
- Actualizar `README-griego.md` (qué temporadas están) y las líneas de
  `tools/el/curso.py`.

### M1-M6 · Los módulos que faltan (Opus)

Hoy el paquete los declara en `missing` (`docs/js/boot.js`) y el núcleo anda
sin ellos. Cada módulo que se agrega sale de `missing`, sigue el formato del
`*_data.js` del italiano o del alemán y respeta las dos normas (nada antes
de explicarse; nada de memoria de un texto). Ver qué módulo es qué en
`ARQUITECTURA.md`.

- **M1 · Frases y lecturas (1-26).** `frasi_data.js`: 10-15 frases de
  conversación por semana con su construcción, con la gramática y las
  palabras de su semana. `letture_settimana.js` / `letture_data.js`: una
  lectura graduada por semana desde la 3 (cobertura de palabras conocidas
  ≥ 98 %, el resto con glosa), con preguntas de una sola respuesta.
- **M2 · Diagnóstico** (`diagnosi.js`, `porque_data.js`): las categorías
  del error del hispanohablante en griego: el acento (que falta / en otra
  sílaba), la sigma final, el género que no coincide (*η θάλασσα* sí, *ο
  πρόβλημα* no), el artículo que falta (*η Μαρία*), el caso (nominativo
  donde va acusativo, *σε* sin artículo), el pronombre débil fuera de lugar,
  el aspecto (*θα γράφω* / *θα γράψω*), el aumento (*έγραψα* / *γράψαμε*),
  *ποτέ* sin *δεν*. Con pistas antes que respuestas, como en el italiano.
- **M3 · Conjugador y gimnasio** (`conjugator.js`): tipos A, B1, B2, -ομαι,
  -άμαι, -ούμαι, -ιέμαι; presente, imperfecto, aoristo (activo y pasivo),
  subjuntivo, futuros, imperativo, perfecto; los irregulares de la lista del
  curso. Cada forma generada se controla contra una tabla escrita a mano de
  ~60 verbos (test). El gimnasio pide solo los tiempos ya enseñados en la
  semana del alumno.
- **M4 · Escribir y trabajar.** `scrivi.js` con consignas de escritura libre
  por semana; `trabajo_data.js` con escenas laborales desde la semana 14
  (presentarse, mail formal, teléfono, reunión, reclamo), como la ruta del
  italiano (paso 1.4 de `auditorias/PLAN.md`), y su role-play con la IA.
- **M5 · Oído.** Pares mínimos reales del griego para el hispanohablante
  (*πότε / ποτέ*, *θ / τ*, *δ / ντ*, *γ / γκ*, *ζ / σ*, *χ / κ*), verificados
  contra el diccionario, no contra la intuición; dictogloss, radio y duelos
  con textos ya vistos. Todo grabado con Piper.
- **M6 · Frases y lecturas 27-52, Biblioteca y banco.** La Biblioteca solo
  con textos de **dominio público** (autores muertos hace más de 70 años:
  Καβάφης, Σολωμός, Παπαδιαμάντης, Βιζυηνός, Καρκαβίτσας, Ψυχάρης; **no**
  Καζαντζάκης hasta 2028, ni Σεφέρης, Ελύτης o Ρίτσος), con glosas.

### C1 · Cierre (Opus)

Un auditor nuevo revisa 300 unidades al azar del registro del griego. Menos
de 3 errores reales → terminado. Si no, se vuelve a la revisión de la
temporada donde aparecieron.

---

## Riesgos que ya se ven

- **Artículo o pronombre.** *τον, την, το, τα, τους, τις* son artículo
  (*τον φίλο*) y pronombre débil (*τον ξέρω*); *του, της* son genitivo del
  artículo y pronombre (*του δίνω*). Las reglas del sílabo de las semanas
  14-16 tienen que mirar la palabra que sigue (un verbo conjugado → pronombre)
  y ante la duda no marcar, como pide `sillabo.py`.
- **El aspecto no siempre es una sola respuesta.** En *θα γράφω / θα
  γράψω*, imperfecto / aoristo, presente / aoristo del imperativo, muchas
  frases admiten las dos: el contexto de la consigna tiene que forzar una
  («todos los días», «una vez», «de golpe»), o se aceptan las dos.
- **El perfecto se usa poco.** No traducir «he comprado» con *έχω αγοράσει*
  por reflejo: en la mayoría de los casos el griego dice aoristo. Las
  respuestas de la semana 27 aceptan el aoristo donde un griego lo diría.
- **Reconocer no es producir.** *ο οποίος* (23), la pasiva de carteles (25),
  la katharévousa (40), el politónico (48) y las variedades (49) son para
  **leer**: no se pide escribirlos, salvo donde el temario lo dice (*ο
  οποίος* se produce desde la 41).
- **La voz.** Piper tiene una sola voz griega: los diálogos de varias
  personas suenan con la misma. Si aparece otra voz libre, se cambia en un
  paso aparte.
- **Sin hablante nativo.** Todo lo escribe y lo revisa una IA contra
  fuentes. Lo ideal sigue siendo que un griego lea al menos los ejercicios de
  producción; el informe de cada revisión lista lo dudoso para eso.
