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
                        letture, duelli, suoni, voci, frequenza, porque, app
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


**Hoy, el primer arranque y el progreso.** Oggi / Hoje arma el día por minutos.
- **Plan del día**: `js/plan.js` (`Plan.today(course, state, minutos, ctx)`, sin DOM): 5, 15 o
  30 minutos con lo vencido del repaso (nunca más de la mitad), el paso siguiente de la semana, un
  bloque de input y uno de producción si la cuerda de output viene baja. Los minutos salen de los
  segundos por tipo de la simulación, calibrados con los tiempos del registro de repasos. Después
  del examen de la semana 52 (`state.phase = "mantenimiento"`), repaso a meses, lectura extensiva,
  escuchas largas, una tarea al azar del tramo y un simulacro cada tres meses.
- **La pantalla**: `js/inicio.js` (la tarjeta «Hoy» con «Empezar», una tarjeta de hábito por día,
  las tres pantallas del primer arranque, el cierre del año). Guarda en `state.hoy`, `state.onboard`.
- **Progreso**: `js/progreso.js` (la meta en minutos `state.ritmo`, el reloj de estudio
  `state.tiempo`, un punto por semana en `state.history`, la fecha de cada jefe, la pantalla
  «Tu progreso»).
- **Test**: `tools/lib/test_plan.js`. El atajo `./#hoy` del manifiesto abre el plan.
