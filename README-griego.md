# Δρόμος C1 — griego moderno desde el alfabeto

El cuarto idioma de la app, para hispanohablantes rioplatenses. Se elige en
el selector del primer arranque o desde el perfil (*Εγώ*: «Cambiar a…»), y
guarda su propio progreso, racha, meta y repaso (`dromosc1.save.v1`): cambiar
de idioma no toca los otros. *Δρόμος* («drómos») es «camino».

**Por ahora está la primera temporada: 13 semanas, del alfabeto al nivel
A2.** El camino completo hasta C1 está planeado (cuatro temporadas de 13) en
`tools/el/TEMARIO.md`.

| Temporada | Semanas | Nivel | Qué se ve |
|---|---|---|---|
| **Το λιμάνι** («el puerto») | 1-13 | A1 → A2 | El alfabeto y el acento, saludar, *είμαι*, los tres géneros y sus artículos, el presente, el acusativo, la ciudad, la hora, la familia y los posesivos, el plural, *μου αρέσει*, los verbos en *-μαι*, *να* y *θα*, el pasado (aoristo) |
| Το πέλαγος («mar abierto») | 14-26 | A2 → B1 | *planeada*: genitivo, pronombres débiles, imperativo, imperfecto, comparar, relativas |
| Τα νησιά («las islas») | 27-39 | B1 → B2 | *planeada*: la pasiva, el perfecto, condicionales, participios, discurso indirecto |
| Η κορυφή («la cumbre») | 40-52 | B2 → C1 | *planeada*: registro culto, expresiones fijas, argumentar, la prensa, el examen |

## De dónde sale

La progresión sigue la de los manuales de griego como lengua extranjera más
usados (*Ελληνικά Τώρα 1+1*, *Επικοινωνήστε Ελληνικά 1*, *Κλικ στα
Ελληνικά*, *Ελληνικά Α΄*) y el programa del certificado oficial del Centro
de la Lengua Griega (*Πιστοποίηση Ελληνομάθειας*, niveles A1-C2 del MCER);
las fuentes están citadas en `tools/el/TEMARIO.md`. El contenido
(explicaciones, ejemplos, ejercicios) está escrito para este curso, desde el
castellano: no copia ningún manual.

## Lo propio del griego

- **El alfabeto primero.** Las semanas 1 y 2 enseñan a leer: las letras que
  ya conocés, las «falsas amigas» (*ρ* es r, *ν* es n, *η* es i, *χ* es j),
  las nuevas, los pares que suenan como una sola (*ου, αι, ει, οι, μπ, ντ*)
  y el acento. Mucho de reconocer, leer palabras que el castellano tomó del
  griego (*πρόβλημα, θέατρο, τηλέφωνο*) y copiar con el teclado.
- **Lo que el castellano regala.** *δ* es la d de «nada», *γ* la g de «lago»,
  *θ* la z de Madrid; el acento escrito marca la sílaba fuerte igual que
  nuestra tilde, y se escribe siempre.
- **Ayuda de lectura.** Las primeras cuatro semanas, debajo de cada palabra
  de la semana, en la tarjeta de palabra nueva y en la corrección, la app
  muestra cómo suena con las letras del castellano: *καλημέρα* «kaliméra».
  Después se apaga sola; se prende o se apaga en el perfil (*Εγώ* →
  Ajustes → «Ayuda de lectura»). La calcula `LANG.rules.sound` (en
  `docs/lang/el/rules.js`) con las reglas de la lección 1.
- **Teclado griego.** En el celular y también en la computadora, las
  respuestas se escriben con el teclado griego de la app, con las vocales
  acentuadas (*ά έ ή ί ό ύ ώ*) en la fila de arriba y el signo de pregunta
  griego (*;*). Con teclado físico no hace falta instalar nada: cada tecla
  escribe la letra griega de ese lugar (a → α, s → σ, w → ς) y el acento se
  pone con *;* o con la tecla de la tilde antes de la vocal.
- **Corrección a medida.** El acento que falta es «casi» (y te lo marca);
  el acento en otra sílaba es otra palabra (*πότε* / *ποτέ*) y es un error.
  La sigma final (*ς*) y la otra (*σ*) valen igual, lo mismo que *;* y *?*.
  Las mayúsculas no cuentan.
- **La voz.** Todo lo que el curso lee en voz alta está grabado (Piper, voz
  *Rapunzelina*, la única griega que tiene: suena sintética pero clara), en
  `docs/lang/el/audio/piper/`; lo que no esté grabado usa la voz griega del
  teléfono (`el-GR`), si la tiene. Lo que se lee es solo lo griego: de
  «νερό (agua)» se dice *νερό*.
- **El tema**: las islas del Egeo — el blanco de cal, el azul de las
  cúpulas, la greca, la buganvilla; títulos en GFS Didot, la Didot griega.

## Qué tiene y qué no

**Tiene**: el camino (*Δρόμος*) con lecciones en pasos cortos y sus
chequeos, el «¿Qué notás?» antes de algunas reglas, el entrenamiento y la
*Dominala* de cada semana, las palabras de la semana, los objetivos «Ya
puedo…», la Estación de repaso cada tres semanas, la tarjeta de lo esencial,
la pausa (*διάλειμμα*), el desafío del día, el repaso con FSRS, la
estrategia de la semana y el role-play con la IA (con tu clave).

**Todavía no tiene** (el paquete los declara en `missing`, en
`docs/js/boot.js`, y el núcleo anda sin ellos): las temporadas 2 a 4,
conjugador y gimnasio de verbos, diagnóstico de errores por categoría,
escritura libre, frases de conversación, lecturas, radio, sonidos,
dictogloss, duelos, banco, Biblioteca, el examen y los jefes de fin de
temporada. Tampoco el color por género de los artículos que tiene el alemán.

## Dónde está

| Qué | Dónde |
|---|---|
| El temario y sus fuentes | `tools/el/TEMARIO.md` |
| El contenido (lecciones, ejercicios, palabras, objetivos) | `tools/el/semanas/sNN.py`, en Python legible; `tools/el/check_semana.py` las revisa antes de compilar (acentos, sigma final, letras latinas coladas) |
| Nada antes de su teoría | `tools/el/sillabo.py` (gramática) y `tools/lib/vocab_norma.py` (palabras) |
| El curso compilado | `docs/lang/el/data/course.json` (lo arma `tools/el/build_course.py`) |
| La configuración, la interfaz y las reglas | `docs/lang/el/lang.js`, `docs/lang/el/rules.js` |
| El tema y las tipografías (GFS Didot, Noto Sans Greek) | `docs/lang/el/theme.css`, `docs/lang/el/fonts/` |
| Los audios | `docs/lang/el/audio/piper/` (los graba `tools/audio/grabar.py el`) |
| Los tests | `tools/el/test_curso.js` (en `npm test`), `tools/lib/smoke_griego.js` (en el navegador), `npm run sim` |

## Para revisar

El contenido lo escribió y lo revisó una IA: pasa los controles automáticos
(ortografía griega, acentos, respuestas, simulación), pero **no lo leyó un
hablante nativo**. Lo ideal es que alguien que sepa griego lo revise. Los
puntos más delicados:

- **La pronunciación escrita** («kaliméra»): es una aproximación con letras
  del castellano. La *γ* y la *χ* delante de e, i suenan más suaves de lo que
  la transcripción deja ver, y *μπ, ντ, γκ* dentro de palabra van con o sin
  nasal según quién hable.
- **Las respuestas aceptadas** en las traducciones: el griego permite más de
  un orden y omitir el sujeto; puede faltar alguna variante válida (en ese
  caso, «🙋 Mi respuesta es válida» la acepta).
- **Fórmulas antes de su gramática**: *από την Αργεντινή*, *στην Αθήνα*,
  *πόσων χρονών είσαι;* aparecen como frases hechas antes de su regla.
