# Una app, dos idiomas

*La Via C1* (italiano) y *Rumo C1* (portugués de Brasil) son una sola app:
un **núcleo** común y un **paquete** por idioma. Un arreglo en el núcleo vale
para los dos idiomas; cada idioma conserva su contenido, sus reglas, su
estética y su progreso.

```
docs/
  index.html            el caparazón: carga js/boot.js
  js/boot.js            elige el idioma y carga paquete + núcleo en ORDER
  js/*.js               el núcleo: engine, drills, lezione, banca, frasi, lab,
                        letture, duelli, suoni, voci, frequenza, porque, capas,
                        app (y los módulos de «Las capas y los módulos»)
  css/app.css           la estructura (usa los tokens del tema)
  fonts/, icons/        lo común (Atkinson Hyperlegible, el ícono de la app)
  sw.js                 un service worker para todo: el núcleo siempre,
                        el paquete del idioma en uso (el otro, a demanda)
  lang/it/, lang/pt/    un paquete por idioma:
    lang.js             window.LANG: código, marca, TTS, prefijo de guardado,
                        textos de la interfaz (pestañas, secciones, rangos…)
    rules.js            LANG.rules: las reglas del idioma que usan el motor,
                        los ejercicios, las lecciones y el banco
                        (normalización, trampas, distractores, artículos…)
    theme.css           la estética: tokens de color, tipografía, ornamentos
    conjugator.js       el conjugador (window.Conj, misma API)
    diagnosi.js         el diagnóstico de errores (window.Diagnosi)
    scrivi.js           la escritura libre (window.Scrivi)
    *_data.js           el contenido de frases, laboratorio, lecturas,
                        duelos, sonidos, dictogloss, examen
    freq_data.js        la capa de frecuencia: letras, palabras vacías,
                        lemas, pseudopalabras
    data/*.json         curso, banco, glosario, frecuencia (los compila tools/)
    audio/, fonts/
  lang/tres_lenguas_data.js   lo de los dos idiomas juntos (modo «Tres lenguas»,
                        js/tres_lenguas.js): contrastes it ↔ pt ↔ es, el duelo
                        y las palabras que delatan la otra lengua
tools/
  lib/pack.js           carga un idioma completo en node, en el orden de boot.js
  lib/smoke_browser.js  recorre los dos idiomas en Chromium (selector, cambio
                        de idioma, pantallas, service worker)
  it/, pt/              las herramientas y los tests de cada idioma
```

**Qué va dónde.** Si algo depende de la lengua (una palabra, una regla de
ortografía, una lista de errores típicos, un texto de la interfaz en
italiano o en portugués), va en el paquete. Si es la mecánica del juego (el
repaso, las rondas, las misiones, las pantallas), va en el núcleo y lee del
paquete lo que necesita (`LANG`, `LANG.rules`, `Conj`, `Diagnosi`, los
`*_DATA`). El núcleo no nombra un idioma nunca.

**Guardado.** Cada idioma guarda con su prefijo (`laviac1.` para italiano,
`rumoc1.` para portugués), así el progreso de uno no toca el del otro y
quien ya estudiaba italiano no pierde nada. El idioma elegido queda en
`c1.lang`.

**Tests.** `npm test` corre la batería de cada idioma (`tools/it/test_*.js`,
`tools/pt/test_*.js`) contra el mismo núcleo, cargado con `tools/lib/pack.js`.

**Biblioteca.** Libros enteros de dominio público (Project Gutenberg,
espejado en GitHub por GITenberg) para la lectura extensiva, en la pestaña
Leggi / Ler: `js/biblioteca.js` (el lector, la cobertura, el input del
perfil, las tarjetas `lib:` del repaso), `lang/<código>/biblioteca_data.js`
(los cognados, los lemas y los textos de la sección) y
`lang/<código>/biblioteca/` (`index.json` con las fichas y la cobertura por
semana; un `<id>.json` por libro, que se baja cuando se abre y no se
precachea).  Los arma `tools/lib/build_biblioteca.js` con la lista de
`tools/lib/biblioteca_fuentes.js`; el portugués pasa por
`tools/pt/ortografia.js`, que moderniza la ortografía al Acuerdo de 1990
(qué hace y cómo está documentado en su encabezado).  Test:
`tools/lib/test_biblioteca.js`.

**Tramo C1.** Las semanas 27-51 suman una lectura larga, una escucha larga
y una tarea integrada.
- **Datos**: `tools/<código>/tramo/wNN.json` y `generi.json`. Los junta
  `tools/lib/build_tramo.js` (en `npm run build`) en
  `lang/<código>/tramo_data.js` (`window.TRAMO_DATA`), que se carga antes de
  `letture.js`.
- **Lectura**: `letture.js` agrega las lecturas como la serie `lunga`, que
  usa el lector de siempre.
- **Escucha y tarea**: `js/tramo.js` tiene la escucha (pantalla
  `tramo-asc`), la tarea (`tramo-scr`) con su revisión local
  (`Tramo.evaluate`), las misiones de la semana y la lista de escuchas en
  Leggi / Ler. Guarda en `state.tramo`.
- **Test**: `tools/lib/test_tramo.js`.


## Las capas y los módulos

Los módulos se ordenan por lo que hacen, no por dónde cupieron. Cada
pestaña es una capa; arriba de cada una va lo de la semana en curso y el
resto queda plegado por sección y, dentro, por estación (la actual abierta).
El plegado, las misiones que llevan módulos al percorso y la pantalla
«Consultar» están en `js/capas.js` (test: `tools/lib/test_capas.js`).

| Capa | Dónde | Qué junta |
|---|---|---|
| **Input** | Leggi / Ler | lo de esta semana (la lectura y la escucha pendientes, el capítulo recomendado de la Biblioteca, los minutos de input en 7 días); después Historias (Martín, Cultura, Inundaciones, cuentos con tus palabras), La settimana / A semana, Lecturas largas, Escuchas largas y Ascolto facile, Biblioteca y la velocidad de lectura |
| **Práctica** | Allena / Treino | lo de esta semana (escenas, el oído, el duelo que se abre, la Clínica, Variaciones); después Laboratorio, Escritura guiada, Duelos, Banco, Escenas por estación y Tres lenguas |
| **Producción** | Scrivi / Escreva (misión) | el texto de la semana, Tres vueltas y Reformulación, la tarea del tramo, la Scrittura del examen |
| **Referencia** | «Consultar» (pantalla `consultar`: se entra desde Allena, Leggi e Io) | el diccionario del curso, Mi gramática, Palabra por palabra, los mapas de preposiciones, las fórmulas fijas y los contrastes de Tres lenguas |
| **Evaluación** | Percorso | ubicación, jefes, examen C1 |

**Al percorso.** `Capas.missions(w, state)` (una línea en `weekPlan`, como
la del tramo) suma dos misiones opcionales (`opt`, no bloquean la semana):
«Leé un capítulo» desde la semana en que abre el primer libro
(`Biblioteca.openWeek`: la primera semana en que un texto del libro llega al
95 % de cobertura), con el capítulo que elige `Biblioteca.recommend`, y «Tres
vueltas» las semanas que tienen consigna de Scrivi. Desde otra pantalla,
`Capas.open(palabra?)` abre «Consultar».

**Los doce módulos que no tenían documentación:**

- **Escritura guiada** (`js/escritos.js`): el pegamento de tres prácticas
  escritas con lo ya visto, como misiones opcionales de la semana, en Allena
  y, la mitad de las veces, un ítem en la Pausa. Guarda en `state.escritos`.
  Las fuentes son las lecturas hechas, los dictogloss y, desde la 27, la
  lectura larga del tramo y la transcripción de la escucha larga ya hecha;
  un texto largo se trabaja por pasajes, y el largo del pasaje, los huecos y
  las piezas crecen con la semana.
- **Variaciones** (`js/variaciones.js`, `lang/<código>/variaciones_data.js`):
  una frase ya aprendida, reescrita cambiando una pieza (persona, negación,
  cosa, pasado, plural). Va por la ronda de siempre, con Diagnosi.
- **C-test y cloze racional** (`js/ctest.js`): la mitad de cada segunda
  palabra (Klein-Braley) o los conectores y preposiciones (Bachman) de un
  texto que ya leíste. `CTest.level(semana)`: al principio menos huecos y
  palabras de tres letras o más.
- **Ordená el texto** (`js/ordenar.js`): los párrafos, las oraciones o los
  turnos de una escucha, desordenados; los conectores y lo que remite a algo
  ya dicho se marcan como pista.
- **Tres vueltas** (`js/escritura_plus.js`): la consigna de Scrivi escrita
  tres veces en 5, 4 y 3 minutos (el 4/3/2 de Nation), con el corrector
  entre vueltas y la comparación al final. Misión opcional de las semanas de
  Scrivi.
- **Reformulación** (`js/escritura_plus.js`): tu texto reescrito como lo
  diría un nativo (IA con clave; sin clave, el corrector aplicado y el
  modelo), sin marcar errores; las diferencias que tocás van al repaso como
  tarjetas `ep:`.
- **Mapas** (`js/mapas.js`, `lang/<código>/mapas_data.js`): dibujos SVG de
  las preposiciones de lugar (la forma del lugar y el movimiento), dentro de
  la lección de su semana y en «Consultar».
- **Ubicación** (`js/ubicacion.js`): test adaptativo de hasta 25 preguntas
  con los ejercicios del curso; propone la semana de arranque y abre las
  anteriores.
- **Mi gramática** (`js/referencia.js`): todos los bloques de las lecciones,
  buscables, con la regla, la tabla, los usos en lo ya leído y el estado
  (vista, practicada, dominada). Lo que todavía no llegó se consulta con el
  aviso «esto llega en la semana N». Se llega desde «Consultar», desde cada
  bloque de la lección y de la hoja «¿Por qué?» de la corrección (usos
  reales y estado), y desde el cierre de la lección.
- **Desglose** (`js/desglose.js`, reglas en `LANG.rules.desglose`):
  «Palabra por palabra»: clíticos, tiempos compuestos, elisión, locuciones.
  Aparece en la corrección, en el lector de la Biblioteca y en «Consultar»,
  donde se le puede pegar cualquier frase.
- **Tres lenguas** (`js/tres_lenguas.js`, `lang/tres_lenguas_data.js`):
  contrastes italiano ↔ portugués ↔ español (siempre abiertos), el duelo
  «¿de qué lengua es?» (con progreso en los dos idiomas o activado a mano) y
  la categoría de error `otra_lengua`. Guarda en `state.tres` (dentro del
  guardado del idioma y de la copia; el viejo `c1.tres.v1` se copia una
  vez), y lo que se falla en el duelo vuelve al repaso como ficha `tres:<n>`.
- **Frecuencia** (`js/frequenza.js`, `lang/<código>/data/frequenza.json`):
  lemas con nivel y frecuencia; la cobertura por nivel en Io, «Parola o
  no?», los distractores por banda, el modelo de cobertura de la Biblioteca
  y el nivel de cada palabra en el diccionario de «Consultar».

**El diccionario de «Consultar»** (`Referencia.lookup` y `suggest`): una
palabra (o su significado en castellano) con la glosa del glosario, la
semana en que se enseña, el nivel y la frecuencia, la forma verbal
(Desglose), la ficha del banco (género, plural, auxiliar, nota), las
combinaciones que enseñan las notas del curso (en italiano, las
colocaciones con verbo soporte de `tools/it/authored/lessico2.py`, que
quedan en `course.json` con `topic: "collocazioni"`; en portugués, además,
el régimen de los verbos del banco) y de 3 a 5 usos reales ya leídos.

**La velocidad de lectura** (`Letture.speedNote` / `speedCommit` /
`speedCurve`): el lector cronometra desde que se abre el texto hasta
«Terminé» (sin el tiempo con la pantalla oculta y sin medir si se usó el
karaoke), y la vuelta cuenta solo si las preguntas dan 70 % o más. Guarda en
`state.lectura`; en Leggi, la curva del año y los textos para releer contra
el reloj.

**Pruebas en el navegador.** `tools/lib/smoke_modulos.js` (lo llama
`smoke_browser.js` en cada idioma) abre todo esto con `app.js`: Leggi y
Allena con un tope de alto, la lectura cronometrada, «Consultar», la
Biblioteca, la escritura guiada sobre la lectura larga y la escucha, un
duelo, Tres lenguas y Tres vueltas.
