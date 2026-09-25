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
                        letture, duelli, suoni, voci, frequenza, app
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
