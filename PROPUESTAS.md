# Propuestas: lo que falta según la bibliografía

La app ya cubre casi todo lo replicado sobre memoria y gramática: FSRS,
recuperación, reaprendizaje sucesivo, feedback correctivo, HVPT, dictogloss,
input estructurado, bloques léxicos, lectura con audio. Este documento no
repite eso. Revisé la investigación contra lo que el código hace hoy
(v43) y ordené lo que falta por **efecto esperado ÷ costo**.

El hueco grande es uno: **en todo el curso nunca hablás**. No hay micrófono
(ni `SpeechRecognition` ni `MediaRecorder` en `docs/js/`), el Esame C1
saca la parte oral y la escucha usa solo la voz sintética del teléfono. El
resto de las propuestas es más chico.

---

## 1. Decir la frase y que la app la escuche (alta prioridad)

**Qué.** En las escenas de *Frasi*, en el Lampo y en las palabras de la
semana, un modo nuevo: 🎙️ *Decila*. Aparece el castellano, mantenés
apretado el botón, decís la frase en italiano y la app la transcribe con el
reconocedor del teléfono (`webkitSpeechRecognition`, `lang = "it-IT"`).
La transcripción pasa por el mismo `diagnosi.js` que ya corrige lo escrito:
si falta una palabra o cambiaste el auxiliar, te lo dice igual. Si el
reconocedor no entiende una palabra dos veces, se marca como «revisá cómo
suena *pesce*» y se ofrece el par mínimo de Suoni que le corresponde.

**Por qué.**
- ASR con feedback de pronunciación: g = 0,69 en 15 estudios; con feedback
  explícito el efecto es grande, con dictado a secas es moderado, y hace
  falta una duración media o larga (Ngo, Chen & Lai 2024, *ReCALL*).
- Instrucción de pronunciación: d = 0,80–0,89 en 86 estudios, más con
  feedback y más con intervenciones largas (Lee, Jang & Plonsky 2015).
- Efecto de producción: decir en voz alta recuerda un 10–20 % más que leer
  en silencio (MacLeod et al. 2010; MacLeod & Bodner 2017), y vale también
  para colocaciones y frases hechas de L2, con efecto a la semana.
- Una app sin práctica oral no se traslada al habla: con 12 horas de
  Babbel todos mejoraron en vocabulario y gramática, pero solo el 59 %
  mejoró en la entrevista oral (Loewen, Isbell & Sporn 2020).

**Cómo, sin romper nada.**
- Solo *push-to-talk*: en iOS el modo continuo se corta solo y acumula
  texto; mantener apretado es lo estable.
- En Chrome Android el reconocimiento usa el servidor de Google: sin
  conexión, o en 🤫 *Modo oficina*, el modo no aparece. Avisarlo una vez,
  igual que con LanguageTool.
- Tolerancia: comparar sin puntuación ni mayúsculas, y aceptar los números
  escritos con cifras («3» = *tre*).
- Cuenta como **output** en las cuatro cuerdas y como repaso en FSRS, con la
  misma nota que escribir la frase.

**Costo.** Medio: un componente nuevo en `app.js`; el corrector ya existe.

## 2. Shadowing y grabarte (alta)

**Qué.** En *Leggi e ascolta* y en las frases: escuchás la frase, la
repetís encima de la voz (shadowing) y después la grabás sola
(`MediaRecorder`). La app pone tu grabación y el modelo uno después del
otro. El audio queda solo en el teléfono y no entra en la copia.

**Por qué.** La revisión sistemática de 44 estudios encuentra mejoras sobre
todo en prosodia, fluidez y comprensibilidad, menos en los sonidos
aislados (Whitworth 2025). Combinado con ASR mejora también la precisión
(*J. Computers in Education*, 2025). Completa lo que Suoni ya hace desde la
percepción.

**Costo.** Bajo: no necesita servidor ni corrector.

## 3. Hablar sin guion: 4/3/2 (media)

**Qué.** Una vez por semana, junto a *Scrivi*: el mismo tema dicho tres
veces, en 90, 60 y 45 segundos, grabado. Con el reconocedor la app cuenta
las palabras por minuto y las pausas largas, y guarda la curva de las 52
semanas: «semana 5: 38 palabras/min; semana 30: 71».

**Por qué.** Repetir la tarea con menos tiempo sube la velocidad y baja
las pausas por proceduralización (Nation 1989; De Jong & Perfetti 2011).
Una réplica de 2025 (*System*) confirma el efecto: depende de la aptitud,
no de cómo se reparten las sesiones, así que una vez por semana alcanza.

**Costo.** Medio. Para el Esame C1 permite agregar una **prova orale**
(monólogo y respuesta), que hoy falta.

## 4. Medir la velocidad, no solo el acierto (media)

**Qué.** Registrar el tiempo desde que aparece la pregunta hasta la
primera tecla y hasta la respuesta. Tres usos:
1. **FSRS**: correcto pero lento (más del doble de tu mediana para ese tipo
   de ítem) cuenta como *Hard*; rápido y correcto, como *Easy*. Hoy toda
   respuesta correcta vale lo mismo.
2. **Progreso visible**: «el passato prossimo te sale un 40 % más rápido que
   en la semana 12». Es el tipo de récord personal que la app ya usa.
3. **Dominala** y los jefes premian conocimiento automatizado, no solo
   declarativo.

**Por qué.** La automatización se mide con el tiempo de reacción y su
variabilidad (coeficiente de variación). Saber la regla y usarla rápido son
dos conocimientos distintos (DeKeyser & Suzuki 2025; Suzuki, Maie & Hui
2025, *Language Teaching*).

**Costo.** Bajo: un `performance.now()` en el render del ítem y en
`answer()`, y un campo más en el registro de repasos.

## 5. Input fuera de la app, contado (media)

**Qué.** Una misión opcional por semana: 📺 *Fuori dalla app*. La app
sugiere qué ver o escuchar según el nivel (A2: series con subtítulos en
italiano; B1: podcasts para estudiantes; B2+: RaiPlay, radio) y vos anotás
los minutos con un toque. Los minutos entran en la cuerda *input* y en la
meta semanal. Links solo a fuentes públicas; nada se incrusta.

**Por qué.**
- Subtítulos en L2 con video: efecto medio sobre vocabulario, g = 0,56 en
  49 estudios (Kurokawa, Hein & Uchihara 2025), y grande sobre la
  comprensión auditiva (Montero Perez et al. 2013).
- Lectura extensiva: d = 0,57 contra grupo control, mayor en adultos y con
  textos en línea (Jeon & Day 2016).
- El volumen es lo que falta: el curso trae unos 30 textos. El FSI estima
  unas 600–750 horas de clase para llevar el italiano a nivel profesional,
  y el año de la app no llega a eso con sesiones de minutos. Contar el
  input de afuera hace visible esa parte del camino.

**Costo.** Bajo.

## 6. Prueba de ubicación (media)

**Qué.** Al empezar, una opción *«Ya sé algo de italiano»*: una prueba
adaptativa de 15 a 25 preguntas con los ítems del curso, calibrados por
semana (la etiqueta `wk` ya existe). Si respondés bien, las preguntas
suben de semana; si fallás, bajan (búsqueda binaria sobre las 52 semanas y
después un ajuste de ±2). Abre el curso hasta la semana estimada y manda a
la cola de repaso lo fallado de las semanas saltadas.

**Por qué.** Los tests adaptativos estiman el nivel con muchas menos
preguntas que uno fijo. Hoy un B1 tiene que hacer 25 semanas de misiones
para llegar a lo suyo, y así se va.

**Costo.** Medio; se puede probar entero con `tools/sim_carriera.js`.

## 7. Medir con lo que no practicaste (media)

**Qué.** En cada jefe, un 20 % de preguntas **nuevas**, que nunca
aparecieron en las rondas, sobre la misma gramática. Se informan aparte:
«con lo practicado: 88 %; con frases nuevas: 71 %». No cuentan para
aprobar.

**Por qué.** Los ítems practicados miden memoria del ítem; los nuevos
miden si la regla generaliza. Es la diferencia entre los resultados de
las apps y los de las pruebas externas (Loewen et al. 2019, 2020).

**Costo.** Bajo si se toman del banco (`Banca.translateItem`, `gapSession`)
filtrados por la semana.

## 8. Pragmática explícita (baja)

**Qué.** Seis a ocho microlecciones a lo largo del año sobre actos de
habla, con la regla dicha: pedir, rechazar, quejarse, disculparse, tú o
*Lei* por contexto, suavizadores (*magari, un attimo, volevo chiedere*).
Cada una con dos o tres situaciones de elegir la opción adecuada y una en
Parla.

**Por qué.** La pragmática se puede enseñar, y la instrucción explícita
supera a la implícita (Taguchi 2015; Plonsky & Zhuang 2019; Ren, Li & Lu
2023). Hoy la cortesía aparece en frases sueltas (*Frasi*, sportello) pero
nunca como regla.

**Costo.** Bajo en código; el trabajo está en escribir el contenido.

## 9. IA: primero vos (baja)

**Qué.** En *Explicame* y en Scrivi, antes de mostrar la corrección de la
IA, pedir una línea: «¿qué creés que está mal?». Se contrasta con lo que
marcó la IA.

**Por qué.** Con IA generativa aparece la «pereza metacognitiva»: la tarea
sale mejor, pero el que aprende monitorea menos y no aprende más (Fan et
al. 2024). Las pistas graduadas ya apuntan a esto; esto cierra el caso de
Scrivi.

**Costo.** Bajo.

## 10. Voces reales para Suoni (baja)

**Qué.** Un conjunto chico (100 a 200 palabras de los pares mínimos) con
grabaciones humanas CC0 de Mozilla Common Voice, varios hablantes, en
`docs/audio/`. Pesa unos pocos MB y funciona sin conexión.

**Por qué.** El HVPT funciona por la variabilidad de hablantes reales. La
voz sintética a tres velocidades la simula, pero con un solo timbre, y en
algunos teléfonos las dobles se distinguen mal.

**Costo.** Medio: elegir y recortar audios (se puede automatizar con los
metadatos de Common Voice) y sumarlos a la caché del service worker.

---

## Orden sugerido

| # | Propuesta | Efecto esperado | Costo |
|---|---|---|---|
| 1 | 🎙️ Decila (ASR + diagnóstico) | Alto: abre la habilidad que falta | Medio |
| 4 | Tiempo de respuesta → FSRS y récords | Medio | Bajo |
| 2 | Shadowing y grabación | Medio | Bajo |
| 5 | Input fuera de la app | Medio (volumen) | Bajo |
| 7 | Ítems nuevos en el jefe | Medio (medir bien) | Bajo |
| 3 | 4/3/2 y prova orale | Medio | Medio |
| 6 | Prueba de ubicación | Alto para quien no empieza de cero | Medio |
| 8 | Pragmática | Bajo-medio | Bajo |
| 9 | IA: primero vos | Bajo | Bajo |
| 10 | Voces reales | Bajo-medio | Medio |

## Bibliografía

- De Jong, N. & Perfetti, C. (2011). Fluency training in the ESL classroom. *Language Learning*, 61(2).
- DeKeyser, R. & Suzuki, Y. (2025). Skill acquisition theory. En VanPatten, Keating & Wulff (eds.), *Theories in SLA* (4.ª ed.). Routledge.
- Fan, Y. et al. (2025). Beware of metacognitive laziness: Effects of generative AI on learning motivation, processes, and performance. *British Journal of Educational Technology*. arXiv:2412.09315.
- Jeon, E.-Y. & Day, R. (2016). The effectiveness of ER on reading proficiency: A meta-analysis. *Reading in a Foreign Language*, 28(2).
- Kurokawa, S., Hein, A. & Uchihara, T. (2025). Incidental vocabulary acquisition through captioned viewing: A meta-analysis. *Language Learning*, 75(4), 939–987.
- Lee, J., Jang, J. & Plonsky, L. (2015). The effectiveness of second language pronunciation instruction: A meta-analysis. *Applied Linguistics*, 36(3), 345–366.
- Loewen, S. et al. (2019). Mobile-assisted language learning: A Duolingo case study. *ReCALL*, 31(3).
- Loewen, S., Isbell, D. & Sporn, Z. (2020). The effectiveness of app-based language instruction for developing receptive linguistic knowledge and oral communicative ability. *Foreign Language Annals*, 53(2), 209–233.
- MacLeod, C. et al. (2010). The production effect: Delineation of a phenomenon. *JEP: Learning, Memory, and Cognition*, 36(3).
- MacLeod, C. & Bodner, G. (2017). The production effect in memory. *Current Directions in Psychological Science*, 26(4).
- Montero Perez, M., Van Den Noortgate, W. & Desmet, P. (2013). Captioned video for L2 listening and vocabulary learning: A meta-analysis. *System*, 41(3).
- Nation, P. (1989). Improving speaking fluency. *System*, 17(3).
- Ngo, T., Chen, H. & Lai, K. (2024). The effectiveness of automatic speech recognition in ESL/EFL pronunciation: A meta-analysis. *ReCALL*.
- Plonsky, L. & Zhuang, J. (2019). A meta-analysis of L2 pragmatics instruction. En Taguchi (ed.), *Routledge Handbook of SLA and Pragmatics*.
- Ren, W., Li, S. & Lu, X. (2023). A meta-analysis of the effectiveness of second language pragmatics instruction. *Applied Linguistics*.
- Saito, K. & Plonsky, L. (2019). Effects of second language pronunciation teaching revisited. *Language Learning*, 69(3).
- Suzuki, Y., Maie, R. & Hui, B. (2025). Research timeline: Automatization in second language learning. *Language Teaching*.
- Taguchi, N. (2015). Instructed pragmatics at a glance. *Language Teaching*, 48(1).
- Whitworth, B. N. (2025). A systematic review of research on the use of shadowing for second language pronunciation teaching. Taylor & Francis.

Fuentes consultadas: [Ngo et al. 2024](https://www.cambridge.org/core/journals/recall/article/effectiveness-of-automatic-speech-recognition-in-eslefl-pronunciation-a-metaanalysis/A915444CF252B61D14961D2FE733822D) ·
[Lee, Jang & Plonsky 2015](https://academic.oup.com/applij/article/36/3/345/2422438) ·
[Saito & Plonsky 2019](https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12345) ·
[MacLeod & Bodner 2017](https://journals.sagepub.com/doi/full/10.1177/0963721417691356) ·
[Shadowing, revisión sistemática](https://www.tandfonline.com/doi/full/10.1080/29984475.2025.2546827) ·
[Shadowing + ASR](https://link.springer.com/article/10.1007/s40692-025-00374-x) ·
[4/3/2 revisitado](https://www.sciencedirect.com/science/article/abs/pii/S0346251X2500346X) ·
[Jeon & Day 2016](https://files.eric.ed.gov/fulltext/EJ1117026.pdf) ·
[Kurokawa et al. 2025](https://onlinelibrary.wiley.com/doi/10.1111/lang.12697) ·
[Montero Perez et al. 2013](https://www.sciencedirect.com/science/article/abs/pii/S0346251X13001012) ·
[Suzuki, Maie & Hui 2025](https://www.academia.edu/130123550/) ·
[Loewen et al. 2019](https://www.cambridge.org/core/journals/recall/article/abs/mobileassisted-language-learning-a-duolingo-case-study/A4D7C8F71782A37D258C19F357DDBCBE) ·
[Taguchi 2015](https://www.researchgate.net/publication/270899654_Instructed_pragmatics_at_a_glance_Where_instructional_studies_were_are_and_should_be_going) ·
[Pragmática, metaanálisis](https://pmc.ncbi.nlm.nih.gov/articles/PMC9723127/) ·
[Fan et al. 2024](https://arxiv.org/pdf/2412.09315) ·
[Web Speech en iOS](https://lilting.ch/en/articles/ios-webspeech-api-tips)
