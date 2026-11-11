# Auditoría de noviembre 2026: aprendizaje, hábito y uso (v3.25)

Pedido del alumno: «audita todo bien y propone mejoras basadas en evidencia de
aprendizaje y adicción al aprendizaje». Descartó de entrada dos cosas: nada de
hablar en voz alta ni grabarse, y nada de medir o premiar la rapidez («no estoy
apurado»).

## Cómo se hizo y cuánto vale cada dato

Tres auditorías independientes, en paralelo, sobre el italiano:

- **Recorrido**: la app jugada en el navegador (celular 390 px y computadora
  1366 px) con guardados simulados del día 1, las semanas 2, 3, 12 y 30 y una
  vuelta después de 5 días, con capturas.
- **Pedagogía**: mediciones sobre los datos compilados y una simulación de un
  año con un alumno que **olvida** según el propio planificador (la simulación
  oficial, `npm run sim`, usa un alumno que acierta siempre igual).
- **Hábito**: inventario de cada mecanismo de motivación leyendo el código.

Cada hallazgo lleva una marca:

- **[código]** verificado leyendo el código (los tres primeros de la tabla de
  arreglos y los puntos A3 y B3 los revisó además la sesión principal).
- **[simulación]** sale de una simulación del auditor, no de uso real.
- **[capturas]** observado jugando.
- **[inferido]** razonamiento, sin medición.

**Lo que no hay: datos de uso real.** Ninguna auditoría vio una copia exportada
del alumno. Todo lo que se dice del repaso sale de simulación. Con una copia
(«💾 Guardar copia» en Io) se puede medir de verdad: cuántas fichas vencidas hay,
con qué recuerdo llegan los repasos y cuántos días por semana se juega.

Las citas son las que la sesión principal conoce bien; donde el auditor citó
algo que no se pudo confirmar, la cita no está.

## Lo que mostraron las copias reales del alumno (11 de noviembre)

El alumno pasó sus tres copias (italiano, portugués, alemán). Reemplazan a la
simulación en lo que sigue:

| | Italiano | Portugués | Alemán |
|---|---|---|---|
| Semana abierta | 7 | 7 | 5 |
| Días con estudio | 17 en 40 | 15 en 41 | 5 en 12 |
| Fichas | 837 | 617 | 212 |
| Vencidas | 733 (88 %) | 529 (86 %) | 191 (90 %) |
| Atraso de las vencidas (mediana) | 31 días | 28 días | 13 días |
| Repasos hechos con más de medio día de espera | 193 | 114 | 22 |
| De esos, recordados | 88 % | 92 % | 73 % |

- **A1 no es un problema de fin de año: ya pasó en la semana 7.** El repaso casi
  no se hace. No es falta de memoria (cuando repasa, recuerda cerca del 90 %): es
  que «Seguir» lleva siempre a lo nuevo y el repaso estaba dentro de «Más».
- Estudia unos **3 días por semana, en sesiones largas** (mediana de 570 xp por
  día activo en italiano), y **tres idiomas a la vez**: entre los tres hay 1.450
  fichas vencidas.
- Al momento de la copia llevaba **8 días sin abrir** ninguno de los tres.
- Dijo que el cofre, la racha y lo demás del juego le son indiferentes: B1, B3,
  B5 y B8 quedan fuera.

Lo que se hizo con esto (v3.26):

- **El repaso, primero**: con fichas vencidas, el botón principal de Oggi es el
  repaso del día (una tanda de 20; dos si hay más de 60 atrasadas) y la misión
  nueva queda al lado, nunca bloqueada. Con 684 atrasadas en italiano, a dos
  tandas por día de estudio son unos 18 días de estudio para ponerse al día.
- **La rapidez ya no decide cuándo vuelve una ficha** (A3).
- **Lo que se falla escribiendo vuelve para escribir**, con la primera letra de
  pista, 5 ítems después (A4).
- **«🧩 Qué es cada palabra»** (D): la clase de cada palabra con los datos del
  curso, en italiano y portugués, y la función de cada grupo con la IA, a pedido.
- El final de ronda dice en una línea lo que falta para abrir la semana (B4, en
  parte); «encontrá el error» se puede hacer con el teclado (C3, en parte).

## Qué lo desengancha y qué lo trae de vuelta (dicho por el alumno)

Preguntado directamente: deja de abrir la app porque **le aburre ejercitar**,
porque **las sesiones son largas** y porque **no siente avance**. Lo que le da
ganas de volver: **leer cosas reales** (empezó *Il nome della rosa* en lectura
guiada), **usarlo para algo** y **que sea un desafío**. Las rachas y los premios
le son indiferentes. Su copia lo confirma: casi todo su tiempo es «forma»
(gramática) y muy poco es leer.

Lo que se hizo con esto (v3.27): **la lectura del día**. El libro que está
leyendo aparece en la pantalla de hoy; la meta son 10 oraciones (un rato corto
con cierre); «Listo por hoy» muestra lo leído, el avance en el libro y dónde se
sigue mañana; y el desafío sale de lo leído, sin sumar fichas al repaso.

Las cuatro que quedaban en esta línea se hicieron en la v3.29: la gramática de
la semana con oraciones del libro, «Te llegó un mensaje» (leer y contestar un
mensaje real, con la IA del otro lado), los cortes al terminar una lección o una
ronda después de trece pantallas, y los otros idiomas en la pantalla de hoy.
Antes (v3.28) se rehízo la pantalla de lectura guiada: directo al texto, la
explicación debajo de la oración o al costado, botones con nombre.

Sin verificar con datos reales: si con esto abre la app más días por semana.
Se mide con la próxima copia (días con estudio, repasos hechos, oraciones
leídas, mensajes contestados).

## Lo que ya se hizo en esta tanda (v3.24 y v3.25)

| Qué | Dónde |
|---|---|
| Sincronización sola con el celular; si se avanzó en los dos lados, las copias se juntan | `docs/js/nube.js` (`plan`, `mezclar`) |
| Token al celular por QR, con confirmación | `docs/js/qr.js` |
| Computadora: pestañas arriba, corrección al costado, Hoy en dos columnas | `docs/css/app.css` |
| Teclado: 1-9, Enter, Espacio, Backspace, Alt + número para los acentos | `docs/js/app.js` |
| La misión que mejor le queda al dispositivo, al lado de «Seguir» | `docs/js/app.js` (`deviceMission`) |
| Lampo escrito, 90 segundos, sin castigo por errar | `docs/js/app.js` |
| Arreglo: «[object Object]» en «Lectura de apoyo» (51 de 52 semanas) | `docs/js/app.js` |
| Arreglo: Enter al final de la lección; «Seguir el percorso» aterriza en la misión que sigue | `docs/js/app.js` |

## A. Aprendizaje

### A1. El repaso acumula una deuda que la app no muestra [simulación]

Con un alumno que olvida y 20 repasos por día (el tope del plan), al día 364
hay unas 2.400 fichas vencidas de 3.900, y la app muestra unas 950 porque la
lista se recorta. Los repasos llegan con un recuerdo medio de 67 %, cuando el
objetivo es 90 %: unas siete veces más tarde de lo programado. Cumplir el 90 %
pediría unos 55 repasos por día.

Por qué importa: el espaciado rinde cuando el repaso llega cerca de la fecha
(Cepeda et al. 2006). Repasar con 67 % de recuerdo es, en buena parte, volver a
aprender.

Propuesta (código, costo chico):

1. **Freno de material nuevo**: si lo vencido (fuera de mantenimiento) pasa de
   unas 60 fichas, el plan del día no ofrece misión nueva hasta bajarlo.
2. No crear ficha para lo que ya se practica en otro lado (unas 260 fichas de
   Capire, Ponte y falsos amigos).
3. Mostrar el número real de vencidas en Io (no en Oggi: ver «Qué no agregar»).

Antes de tocar nada conviene confirmarlo con una copia real del alumno: si hoy
tiene pocas vencidas, el problema todavía no llegó y alcanza con el freno.

### A2. La simulación oficial no puede ver A1 [simulación]

El jugador de `tools/lib/sim_carriera.js` acierta 90 % u 80 % pase el tiempo que
pase. Con eso, el ajuste de velocidad de olvido sube al tope, duplica los
intervalos y la cola parece sana. Además, un acierto por azar entre opciones
cuenta como recuerdo.

Propuesta (código, costo chico): un jugador con olvido en la simulación, y que
las respuestas con opciones no entren en el ajuste de velocidad.

### A3. La rapidez ya decide los intervalos, y el alumno no la quiere [código]

Una respuesta correcta y rápida se califica como «fácil» y una lenta como
«difícil» (`docs/js/app.js`, donde arma `fast` y `slow`; `docs/js/engine.js`,
`ratingFor`). En un mensaje anterior la sesión principal dijo que la app no medía
el tiempo: estaba mal, lo dijo mirando una versión vieja.

Es una decisión del alumno, que ya dijo que no quiere que la rapidez cuente.
Sacarlo es un cambio chico: lo correcto vale «bien», sin mirar el reloj. El
Lampo 60″ y su medalla son otra cosa (un juego optativo) y pueden quedar.

### A4. Lo que se falla vuelve en formato fácil [código + simulación]

El reintento de un ejercicio escrito llega 3 ítems después y **con opciones**.
De 4.625 ítems de escribir, en la simulación solo el 59 % se escribió alguna
vez: 976 quedaron solo reconocidos.

Por qué importa: recordar enseña más que reconocer (Roediger & Karpicke 2006;
Kang, McDermott & Roediger 2007), y volver a intentar hasta recordar bien es lo
que más rinde (Rawson & Dunlosky 2011).

Propuesta (código, costo chico): el reintento también escrito, 5 o 6 ítems
después, con la primera letra como ayuda.

### A5. Casi no hay lectura ni escucha extensa hasta la semana 26 [medido]

Dentro de la app, por semana: 143 palabras de lectura en las semanas 1-13, 193
en las 14-26 y 770 a 1.000 desde la 27. En el año: unas 27.000 palabras leídas
(unas 3 horas) y unas 17.500 escuchadas (unas 2 horas). La Biblioteca son libros
de 1878 a 1921, con 72-83 % de palabras conocidas al empezar.

Por qué importa: la lectura extensiva tiene un efecto medio y repetido en
muchos estudios (Jeon & Day 2016), y para leer con comodidad hace falta conocer
alrededor del 98 % de las palabras (Hu & Nation 2000).

Propuesta (contenido, costo grande): tres textos graduados más por semana en
las semanas 1-26, escritos con el vocabulario ya enseñado, y que releer y
reescuchar cuenten como input. Va después de auditar el contenido existente.

### A6. Las palabras nuevas casi no vuelven a aparecer [medido]

Son 938 palabras al año (18 por semana). La mediana de apariciones posteriores
en todo el curso es 3; el 32 % no vuelve nunca. El aprendizaje por encuentro
pide del orden de diez (Webb 2007; Uchihara, Webb & Yanagisawa 2019).

Propuesta (control + contenido, costo medio): que el build avise las palabras
con menos de 5 apariciones posteriores, para sembrarlas en ítems y lecturas
nuevos.

### A7. Las lecturas largas, por debajo del 98 % [medido]

Las lecturas semanales tienen 99 % de cobertura; las 24 largas (más de la mitad
del volumen de lectura), 94 % en las semanas 27-39 y 90 % en las 40-51. El número
exagera: muchas «desconocidas» son cognados transparentes para un hispanohablante.

Propuesta (código + glosas, costo chico): contar los cognados como conocidos y
glosar solo lo que quede. Es la pendiente 6.5 del plan, y es la que más pesa.

### A8. Los chequeos de la lección son todos de opción [medido]

702 chequeos en 429 bloques, bien repartidos, pero todos con opciones y 420
salen de la tabla recién mostrada. La pendiente 6.1 del plan (40 % de producción)
ya se cumple en los datos y se puede cerrar.

Propuesta (código, costo medio): uno de cada tres chequeos, escrito.

### Lo que ya está bien

El 27 % de cada ronda viene de semanas anteriores y va mezclado (el intercalado
funciona: Brunmair & Richter 2019); tras un error hay una pista y un segundo
intento antes de mostrar la respuesta; el error vuelve al día siguiente como una
oración nueva de la misma regla; escribir paga más que reconocer.

## B. Hábito y ganas de volver

### B1. La racha diaria castiga el plan que la propia app propone [código + simulación]

El arranque ofrece estudiar 3 a 7 días («los otros, descanso sin culpa») y el
recordatorio sale de lunes a viernes, pero la racha pide 6 de 7 días. Con un plan
de lunes a viernes se corta el día 28; con 3 o 4 días, en la segunda semana.

Por qué importa: fallar un día suelto no frena la formación de un hábito (Lally
et al. 2010); lo que frena es sentir que se perdió todo.

Propuesta (código, costo chico): en la cabecera y en Oggi, «esta semana: 3 de 5
días» y una racha de **semanas cumplidas**. La racha diaria queda como récord.
La racha de semanas ya se calcula; hoy solo se ve en el perfil.

### B2. Falta atar el estudio a una rutina, y el aviso no entra directo [código]

Hoy se pide solo una hora. Las intenciones del tipo «después de X, hago Y»
tienen un efecto medio a alto sobre cumplir lo propuesto (Gollwitzer & Sheeran
2006).

Propuesta (código, costo chico a medio):

- pedir la frase «Después de ___ abro La Via» y ponerla en el título del evento;
- que el evento abra directo la ronda de 2 minutos (hoy abre Oggi);
- unificar el texto (el aviso dice «3 minutos», la app «2 minutos»);
- volver a ofrecer el recordatorio cuando, al volver de una pausa, el motivo
  elegido es «me olvidé» (hoy el motivo se guarda y nadie lo usa);
- en la computadora: instalada desde Edge o Chrome se puede activar que se abra
  al entrar a Windows. No se probó.

### B3. El cofre no se puede abrir durante el curso [código]

El botón del cofre solo existe en la tarjeta del modo mantenimiento
(`docs/js/inicio.js`, `chestLine`), que se dibuja después de aprobar el examen.
Durante las 52 semanas Oggi dice «el cofre está arriba» y no hay botón.

Es un error. O se arregla o, mejor, se reemplaza por B6.

### B4. No hay cierre del día ni gancho para mañana [código + capturas]

El final de ronda ofrece «Otra ronda» y, si falta xp, «te faltan N». Al
terminar una lección aparece «Para abrir la semana 4:» seguido de hasta 20
misiones pendientes, que tapa lo logrado. Se termina en deuda.

Por qué importa: de una experiencia se recuerda sobre todo el momento más
intenso y el final (Kahneman et al. 1993).

Propuesta (código, costo medio): en el primer cierre del día, una pantalla
«Listo por hoy» con dos o tres cosas que hoy salieron y ayer no, y «Mañana:
[la misión que sigue], unos 4 minutos». La lista de pendientes se reduce a una
línea: «te faltan 4 misiones para abrir la semana 4».

### B5. El anillo de la meta se llena sin aprender [código]

La meta diaria es en xp, y el xp se infla con «Otra ronda» de reconocimiento,
el Lampo, y los multiplicadores ×1,2 (racha de 7) y ×2 (desafío, boleto).

Propuesta (código, costo medio): que el anillo mida «misión del día + repaso
hechos» o minutos, y sacar el ×1,2, que solo agrega miedo a perder la racha.

### B6. Sorpresa sí, botín no [inferido]

Los premios materiales que se esperan bajan las ganas propias de hacer la tarea
(Deci, Koestner & Ryan 1999). La sorpresa sana es la que informa.

Propuesta (contenido, costo medio): al cumplir el día, una pieza distinta cada
vez: un modismo, una mini escena de oficina, un titular real que ya se entiende.
Ocupa el lugar del cofre.

### B7. La meta real (el trabajo) casi no toca el día [código]

El motivo elegido al empezar solo aparece en la tarjeta de regreso y en el
perfil; la ruta de trabajo es una misión opcional.

Propuesta (código, costo chico): si el motivo es trabajo, la frase del día y uno
o dos ítems de la ronda de 2 minutos salen de las escenas laborales, y una línea
por semana: «esta semana ya podés contestar un mail formal».

### B8. El hito largo no está a la vista [código]

«Faltan 2 misiones para abrir la semana N» ya está. Falta el siguiente: «faltan
5 semanas para el examen de B1». Cuanto más cerca se ve una meta, más se
esfuerza uno por llegar (Kivetz, Urminsky & Zheng 2006).

Propuesta (código, costo chico): esa línea en la tarjeta de la semana.

### Lo que ya está bien

Un toque para empezar («2 minutos»); la vuelta después de una pausa es amable y
lleva directo a una ronda corta; el día 1 muestra una sola tarjeta.

## C. Uso y jugabilidad [capturas]

- **C1. Una sesión de «Seguir» son 35 a 69 pantallas.** Lo más largo es encadenar
  dos lecciones sin práctica en el medio: 25 a 30 pantallas de solo leer.
  Propuesta: una pausa natural cada 12-15 pantallas, con salida y progreso
  guardado.
- **C2. Variedad despareja.** «Superá la semana», en una semana recién abierta,
  es opción múltiple en 80 a 94 de cada 96 ítems. El repaso de la semana 30 son
  huecos, opciones y traducciones, y nada más (en la 12 tenía diez tipos). Es el
  mismo problema que A4, visto desde el juego.
- **C3. Ejercicios que no se pueden hacer con el teclado.** «Trova l'errore»
  (hasta el 20 % del repaso), ordenar el texto, pasar a las preguntas de una
  lectura, el dictogloss y la radio. Propuesta: que las palabras y los botones de
  esas pantallas reciban foco y respondan a Enter y a las flechas.
- **C4. Pantallas que siguen siendo un teléfono estirado.** Lecturas, dictogloss
  y radio con renglones de 100 a 140 caracteres; la página de la semana y el
  perfil, una sola columna de 5.000 píxeles. Propuesta: el mismo ancho de lectura
  que ya tienen las rondas, y la página de la semana en dos columnas.
- **C5. Oggi en el celular.** Desde la semana 3 hay dos entradas que compiten
  arriba («2 minutos» y «Seguir») y una tarjeta de cierre semanal con 9 opciones
  que ocupa más que la principal. El repaso queda escondido dentro de «Más».
- **C6. Detalles.** Con una racha de tres cifras la cabecera del celular se parte
  en dos renglones; el final de la misión «Palabras» no ofrece seguir el percorso.

## D. Pedido nuevo: el papel de cada palabra en la oración

El alumno pidió, mientras se hacía esta auditoría, «algo que indique qué rol
ocupa una palabra en la oración».

Lo que ya existe: «🔎 Palabra por palabra» (`docs/js/desglose.js`) explica las
palabras que no se ven solas (el pronombre átono y su función, el tiempo
compuesto, la contracción). No analiza la oración: no dice cuál es el sujeto.

El riesgo: adivinar la función con reglas se equivoca justo donde más importa.
En *Mi piace il caffè*, el sujeto es *il caffè*, y una regla simple diría que es
el objeto. Una etiqueta equivocada enseña mal, y este curso tiene por norma no
mostrar nada sin revisar.

Tres caminos:

1. **Anotado a mano en las fuentes** (recomendado para empezar): cada ejemplo de
   lección y cada frase de conversación lleva marcadas sus partes (sujeto,
   verbo, objeto directo, objeto indirecto, complemento). Exacto y sin internet,
   pero es contenido: unas 860 frases y los ejemplos de 429 bloques, con revisión.
   Se puede empezar por las semanas 1-13.
2. **Con la IA, a pedido**: un botón «🧩 ¿Qué hace cada palabra?» que le manda la
   oración al modelo con la clave del alumno. Sirve para cualquier oración,
   también las que él escribe; necesita internet y puede equivocarse, así que iría
   rotulado como generado.
3. **Los dos**: lo anotado donde existe, la IA para el resto.

Cómo se vería: la oración con cada grupo subrayado en un color y su nombre
debajo, y al tocar un grupo, una línea de por qué («concuerda con el verbo: es
el sujeto»). Los colores, los mismos en toda la app.

Falta que el alumno diga dos cosas: si por «rol» entiende la función (sujeto,
objeto) o la clase de palabra (sustantivo, verbo), y dónde lo quiere ver primero
(en la corrección, en las lecciones o en las lecturas).

## E. Qué no agregar, aunque enganche

- Una racha diaria más dura, o «reparar la racha» pagando: es miedo a perder.
- Más botín al azar (gemas, ruleta, cofres) o más multiplicadores.
- Vidas que bloquean o límites de tiempo.
- Avisos con culpa, o el contador de fichas vencidas en la pantalla de inicio:
  ver la pila es lo que más aleja después de una pausa.
- Ligas o rankings contra jugadores inventados: hay un solo alumno (Hanus & Fox
  2015 encontró que las tablas de posiciones bajaban la motivación con el tiempo).

## F. Orden sugerido

| Tanda | Qué | Costo | Toca contenido |
|---|---|---|---|
| 1 | B3 cofre, A3 rapidez (si el alumno confirma), A4 reintento escrito, B1 racha por semanas, B8 hito largo | chico | no |
| 2 | A1 freno de material nuevo, A2 simulación con olvido, B2 rutina y aviso directo, B4 «Listo por hoy» | chico a medio | no |
| 3 | C3 teclado en lo que falta, C4 lecturas y página de la semana en la computadora, B5 anillo | medio | no |
| 4 | D el papel de cada palabra (primero semanas 1-13) | medio | sí |
| 5 | A7 cognados y glosas, A6 palabras que no vuelven, A8 chequeos escritos | medio | sí |
| 6 | A5 lecturas graduadas, B6 sorpresas de contenido, B7 trabajo en el día | grande | sí |

La tanda 1 es la que más cambia por menos trabajo. Las tandas con contenido van
por el procedimiento del plan (dos revisores, registro).

## G. La auditoría de contenido

El alumno aprobó auditar el contenido. Es otra escala que esta auditoría: el
inventario del plan (`auditorias/PLAN.md`, fases 2 a 5) cuenta unas 14.000
unidades en italiano y 11.800 en portugués, todas pendientes, y el método que el
propio plan fija es de dos revisores independientes por lote de 40. Son cientos
de pasadas de revisor, repartidas en unos quince pasos, uno por sesión.

No se empezó en esta tanda porque falta saber por dónde conviene: en qué semana
está el alumno (para revisar primero lo que está por cursar) y si quiere solo
italiano o también portugués.
