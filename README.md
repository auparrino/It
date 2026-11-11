# La Via C1 · Rumo C1 · Weg C1 — idiomas hasta C1 en un año

Una sola app para hispanohablantes rioplatenses con dos cursos completos y uno que arranca:

| | Idioma | Estética | Detalle |
|---|---|---|---|
| 🇮🇹 **La Via C1** | Italiano, de cero a C1 (CILS / CELI / PLIDA) | La Costiera Amalfitana: mayólicas, limones, Playfair Display | [README-italiano.md](README-italiano.md) |
| 🇧🇷 **Rumo C1** | Portugués de Brasil, de cero a C1 (Celpe-Bras) | Carioca: el calçadão, el mar de Ipanema, el Pão de Açúcar | [README-portugues.md](README-portugues.md) |
| 🇩🇪 **Weg C1** | Alemán desde cero hasta C1 en 52 semanas (los niveles del Goethe-Zertifikat, A1 a C1) | Berlín: el rojo, el negro y el oro, el azul del Spree | [README-aleman.md](README-aleman.md) |

Los tres comparten el mismo motor y la misma didáctica (el alemán, por ahora, con lo esencial): 52 semanas en cuatro
estaciones con jefes, lecciones en pasos cortos con chequeos, repaso
espaciado con FSRS, diagnóstico de los errores típicos del hispanohablante
con pistas antes que respuestas, frases de conversación, lecturas graduadas,
pares mínimos, dictogloss, duelos, escritura libre y un examen final C1. Cada
palabra de la semana y cada frase traen **cómo se usa**: la construcción, el
régimen, el género, el contraste con el español.

Al abrir la app elegís el idioma, y lo cambiás cuando quieras desde el
perfil. Cada idioma guarda su propio progreso (quien ya estudiaba italiano
sigue donde estaba).

## Las respuestas, con el teclado de la app

En el celular, las respuestas en la lengua del curso se escriben con un
**teclado propio** que aparece en pantalla, con la distribución del idioma
(QWERTY con *à è ì ò ù*, con *ã ç õ*, o con *ä ö ü ß*) y sin el
autocorrector en castellano. Una página web no puede poner el teclado del
teléfono en otro idioma (Chrome en Android no se lo pide al teclado; Safari
tampoco), así que este es el camino. Con ⌨️ volvés al teclado del teléfono
cuando quieras, y la app lo recuerda (también se elige en el perfil).

## La IA, con Claude Haiku

La corrección con IA, las pistas, el role-play y las historias usan
**Claude Haiku** (`claude-haiku-5-5`, de Anthropic) con una clave tuya
(*console.anthropic.com → API keys*). La clave queda en el teléfono; la API
se paga por uso, y con Haiku son centavos. Si Anthropic contesta que la clave
«is not scoped to a workspace», en el perfil va también el ID del workspace
(`wrkspc_…`, en *Settings → Workspaces*): la app lo manda en el encabezado
`anthropic-workspace-id`.

## En el celular

Es una app web instalable (PWA) que funciona sin internet y guarda todo en
el teléfono. Publicá `docs/` con GitHub Pages (*Settings → Pages → Deploy
from a branch*, carpeta `/docs`), abrí la URL una vez con internet y agregala
a la pantalla de inicio. `?lang=it`, `?lang=pt` o `?lang=de` en la URL abre
directo un idioma.

## Qué es cada palabra

En la corrección de cada ejercicio, «🧩 Qué es cada palabra» muestra la oración
con la **clase** de cada palabra debajo (artículo, sustantivo, verbo,
preposición…). Sale de los datos del curso, sin internet, en italiano y
portugués (`docs/js/rol.js`): lo que puede ser dos cosas se dice («verbo o
sustantivo») y lo que no está en el banco queda sin rótulo, nunca se adivina.
La **función** de cada parte (sujeto, objeto directo, objeto indirecto,
complemento…) se pide a la IA con tu clave y va rotulada como generada: con
reglas simples falla donde más importa (en *Mi piace il caffè* el sujeto es *il
caffè*).

## Leer es el centro: la lectura del día

Con un libro cargado en la lectura guiada (`docs/js/libro.js`), la pantalla de
hoy lo muestra con un toque para seguir donde quedaste. La meta del día son
10 oraciones (unos 10 minutos). Al llegar, «Listo por hoy» dice cuánto leíste,
qué porcentaje del libro llevás y con qué oración seguís mañana, y ofrece un
**desafío** de hasta cinco preguntas armadas con lo que leíste: la oración con
una palabra sacada, su traducción a la vista y cuatro opciones de esas mismas
páginas. El desafío no crea fichas de repaso.

La pantalla de lectura abre directo en el texto, con una cabecera de un
renglón (tramo, oración, lo de hoy y una barra). La explicación de una oración
aparece debajo de ella en el celular y al costado del texto en la computadora,
sin taparlo; los botones dicen qué hacen («Escuchar», «Tapar ayuda») y las
flechas ← → pasan de oración. El contexto, la gramática y las preguntas del
tramo quedan en «Más de este tramo».

## El repaso, primero

Si hay fichas vencidas, el botón principal de la pantalla de hoy es el repaso
del día (una tanda de 20; dos si hay más de 60 atrasadas) y la misión nueva
queda al lado. Lo que se falla escribiendo vuelve en la misma ronda para
escribir, con una pista. El tiempo que tardás en contestar no cambia cuándo
vuelve una ficha.

## En la computadora

La misma app se instala en Windows como aplicación de escritorio (ventana
propia, ícono en Inicio y en la barra de tareas, sin internet): abrí la URL en
**Edge** (*⋯ → Aplicaciones → Instalar este sitio como una aplicación*) o en
**Chrome** (el ícono de instalar de la barra de direcciones).

- **Pantalla ancha:** las pestañas van arriba, en la cabecera, y la corrección
  sale al costado de la pregunta en vez de taparla.
- **Teclado:** `1`-`9` eligen la opción, la ficha o la nota de la tarjeta;
  `Enter` o `Espacio` siguen; `Backspace` saca la última ficha. En una caja de
  texto `Enter` manda la respuesta y, ya corregida, sigue.
- **Acentos:** `Alt` + número escribe la letra de la fila de acentos de la
  caja (`Alt`+`1` = la primera).
- **Hoy en dos columnas:** el plan a la izquierda; xp, atajos, frase del día y
  calendario a la derecha, abiertos.
- **Según el dispositivo:** con las lecciones de la semana hechas, al lado de
  «Seguir» la app ofrece la misión que mejor le queda a ese dispositivo: en la
  computadora, la de escribir largo (el texto de la semana, el dictogloss,
  traducir); en el celular, una corta si la que sigue es de escribir largo. No
  cambia el orden del percorso.
- **Lampo escrito:** 90 segundos tipeando entera una frase que ya viste, sin
  castigo por errar (la correcta queda un momento a la vista).
- **Sincronizada con el celular:** en *Io → Tu copia → Sincronizar con tu
  GitHub Gist* se pega el mismo token en los dos; «📱 Pasar al celular» lo
  muestra como un código QR para no tipearlo (el celular pregunta antes de
  guardarlo). Con «Sincronizar sola», la app trae lo del otro dispositivo al
  abrirla y sube lo de este al terminar cada ronda. Si avanzaste en los dos sin
  conexión, junta las dos copias: cada ficha con su repaso más reciente, y los
  días, lecciones y medallas de los dos lados (`docs/js/nube.js`: `plan`,
  `mezclar`).

`npm run smoke:pc` lo prueba en el navegador (teclado, pantalla ancha y la
sincronización entre dos dispositivos con un GitHub simulado).

## Cómo está hecha

Un **núcleo** común (`docs/js/`) y un **paquete** por idioma
(`docs/lang/it/`, `docs/lang/pt/`, `docs/lang/de/`) con su conjugador, su
diagnóstico, su contenido, su interfaz y su tema. Un arreglo en el núcleo vale
para todos los idiomas. Detalle en [ARQUITECTURA.md](ARQUITECTURA.md); para aportar
contenido, [CONTENIDO.md](CONTENIDO.md); las auditorías, en
[auditorias/](auditorias/README.md).

```sh
npm run build      # compila banco, curso, tramo C1 y Biblioteca de los dos idiomas
npm test           # los tests de cada idioma, los comunes y los chequeos de contenido
npm run lint       # eslint sobre docs/
npm run sim        # un año simulado en cada idioma (falla si algo no se puede jugar)
npm run smoke      # la app entera en Chromium (necesita Playwright)
npm start          # http://localhost:8000
```
