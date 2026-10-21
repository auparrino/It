# Weg C1 — alemán desde cero hasta C1

El tercer idioma de la app, para hispanohablantes rioplatenses. Se elige en
el selector del primer arranque o desde el perfil (*Ich*: «Cambiar a…»), y
guarda su propio progreso, racha, meta y repaso (`wegc1.save.v1`): cambiar
de idioma no toca el italiano ni el portugués.

Por ahoraSon **52 semanas en cuatro temporadas de 13**, de A1 a C1, con contenido
escrito para el curso (no sale de un manual), siguiendo el MCER y los niveles
del *Goethe-Zertifikat*. Cada semana trae su lección en pasos (6 a 8 bloques
con chequeos), entre 45 y 50 ejercicios y 15 palabras nuevas. El temario
completo, semana por semana, está en `tools/de/TEMARIO.md`.

| Temporada | Semanas | Nivel | Qué se ve |
|---|---|---|---|
| **Die Grundlagen** | 1-13 | A1 → A2 | Pronunciación, *sein / haben*, géneros, acusativo, números, verbos modales y separables, imperativo, la casa, el Perfekt, el dativo |
| **Die Brücke** | 14-26 | A2 → B1 | *wo / wohin*, declinación del adjetivo, comparativo, reflexivos, *weil / dass / wenn*, preposiciones, Präteritum, verbos con preposición, futuro y *zu*, relativas, Konjunktiv II, genitivo |
| **Der Strom** | 27-39 | B1 → B2 | Voz pasiva, Plusquamperfekt, conectores dobles, Konjunktiv II pasado, Nomen-Verb-Verbindungen, participios, discurso indirecto, modales subjetivos, nominalización, formación de palabras |
| **Der Gipfel** | 40-52 | B2 → C1 | Alternativas a la pasiva, preposiciones con genitivo, argumentar, *als ob*, modismos, registro formal, partículas modales, orden de la oración, régimen, lengua académica, cohesión, Austria y Suiza, el examen final |

ene y qué no

**Tiene**: el camino (*Weg*) con lecciones en pasos cortos y sus chequeos, el
entrenamiento y la *Dominala* de cada semana, las palabras de la semana, la
pausa (*Kaffeepause*), el desafío del día, el repaso con FSRS y la palabra del
día. La voz es la del teléfono en alemán (`de-DE`). Los ejercicios escritos
usan el teclado de la app en QWERTZ, con *ä ö ü ß* (o el del teléfono, con una
fila de *ä ö ü ß*). La corrección no mira mayúsculas, y marca como *casi* lo
que solo pierde la diéresis o escribe *ss* en vez de *ß*; pero si sin la
diéresis queda otra palabra (*schon/schön*, *fahrt/fährt*, *Bruder/Brüder*), o
lo que cambia es un artículo, un pronombre o una terminación (*ein/einen*,
*wohnst/wohnt*), es un error, no un tipeo.

**Todavía no tiene** (el paquete los declara en `missing`, en `docs/js/boot.js`,
y el núcleo anda sin ellos): conjugador y gimnasio de verbos, diagnóstico de
errores por categoría, escritura libre (*Scrivi*) y la IA, frases de
conversación, lecturas, radio, sonidos, dictogloss, duelos, banco, Biblioteca,
el tramo C1, el examen y los jefes de fin de temporada.

**En los tres idiomas**: el 🤫 modo silencioso (nada suena y los ejercicios
de escuchar pasan a ser escritos) y el botón 🤔 *No lo entiendo* en cada
corrección, que con tu clave de IA te explica lo mismo de otra forma.

## Dónde está

| Qué | Dónde |
|---|---|
| El temario | `tools/de/TEMARIO.md` |
| El contenido (lecciones, ejercicios, palabras) | `tools/de/curso.py` (semanas 1-6) y `tools/de/semanas/sNN.py` (7-52), en Python legible; `tools/de/check_semana.py` las revisa antes de compilar |
| El curso compilado | `docs/lang/de/data/course.json` (lo arma `tools/de/build_course.py`) |
| La configuración, la interfaz y las reglas | `docs/lang/de/lang.js`, `docs/lang/de/rules.js` |
| El tema (Baviera: las Rauten, los Alpes, el cartel de madera; títulos en Grenze Gotisch) | `docs/lang/de/theme.css`, `docs/lang/de/fonts/` |
| Los tests | `tools/de/test_curso.js` (en `npm test`), `tools/lib/smoke_aleman.js` (en el navegador), `npm run sim` |

Lo ideal es que un hablante nativo revise el contenido. Los puntos dudosos
que dejó anotados quien lo escribió:
- **Las letras y su sonido:** cómo se nombran algunas letras (*Ypsilon*, *Eszett*) y cómo se aproxima su pronunciación con letras del castellano.
- **La *s* delante de vocal:** se presenta como sonora, como en el norte (en el sur y en Austria suena sorda).
- **Los saludos según la hora:** desde qué hora se dice *Guten Abend*.
- **Frases hechas antes de su gramática:** algunas aparecen antes de que se enseñe la regla (*aus der Schweiz*, *im Café*, *nach Hause*).
- **Respuestas aceptadas:** algunas que se dan por buenas en traducciones, como *Ich habe keine Brüder* para «no tengo hermanos».
