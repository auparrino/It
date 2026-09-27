# Rumo C1 — portugués de Brasil hasta C1 en un año

Curso-juego para **hispanohablantes rioplatenses**: de cero a C1 (Celpe-Bras
Avançado Superior) en 52 semanas, desde el celular y sin internet. Es la
versión portuguesa de *La Via C1* (italiano, repo hermano `auparrino/It`):
el mismo motor y la misma didáctica, con el contenido escrito de nuevo para el
portugués y **estética carioca** (las ondas del calçadão de Copacabana, el mar
de Ipanema, el atardecer del Arpoador, el Pão de Açúcar en el ícono).

Variedad: **portugués de Brasil**, norma urbana culta, con lo coloquial (*a
gente, pra, tá, vi ele, me dá*) enseñado como tal. Portugal y la lusofonía
aparecen como variantes y, sobre todo, como cultura.

## En el celular

Es una app web instalable (PWA): se publica una vez, queda en la pantalla de
inicio, funciona sin conexión y guarda el progreso solo en el teléfono.

1. Publicá `docs/` con GitHub Pages (*Settings → Pages → Deploy from a branch*,
   carpeta `/docs`).
2. Abrí la URL una vez con internet. **iPhone**: *Compartir → Agregar a inicio*.
   **Android**: *Instalar app*.

Si se publica en el mismo dominio que La Via C1 (`usuario.github.io/It` y
`/pt`), no se pisan: todas las claves de guardado llevan el prefijo `rumoc1.` y
el service worker solo toca sus propias cachés.

## Cómo está armado el año

| Estación | Semanas | Nivel | Contenido |
|---|---|---|---|
| Primeiros Passos | 1–13 | A1 → A2 | Sonidos (vocales abiertas, nasales, lh/nh), ser/estar/ter, género y plurales (-ões, -ães, -ãos), **contracciones**, presente, ir + infinitivo, estar + gerúndio, posesivos (*seu / dele*), **pretérito perfeito**, imperativo |
| Pé na Estrada | 14–26 | A2 → B1 | **gostar de** y la regencia, imperfeito, pronombres objeto (norma y habla), futuro, condicional y cortesía, comparativos, **perfeito composto** (≠ «he hecho»), participios dobles y pasiva, **subjuntivo presente**, relativos |
| Mar Aberto | 27–39 | B1 → B2 | **Futuro do subjuntivo**, imperfeito do subjuntivo y condicionales, **infinitivo pessoal**, tiempos compuestos, discurso indirecto, pasiva con *se*, colocação pronominal, conectores, regencia, **crase**, portugués hablado |
| O Cume | 40–52 | B2 → C1 | Registro formal y nominalización, mais-que-perfeito simple y narrativa, oraciones reducidas, correspondencia formal, formación de palabras, falsos amigos, variación (Brasil, Portugal, África), argumentación, resumen, registro culto y coloquial, colocaciones, **Exame C1** |

El temario vive en `tools/pt/curriculo.py` (semanas, función comunicativa, tiempos
y la semana en que se enseña cada uno). El orden sigue los manuales para
hispanohablantes y los **«pontos críticos»** de la bibliografía de Português
para Falantes de Espanhol (Almeida Filho; Grannier; Akerberg; Ferreira; Durão):
lo que el español no tiene (futuro do subjuntivo, infinitivo pessoal, crase,
contracciones) y lo que se parece demasiado (*perfeito composto*, *gostar de*,
*muito*, los heterosemánticos) llegan con semana propia.

**Nada antes de su teoría**: cada ejercicio declara su semana, y
`tools/pt/sillabo.py` (con el léxico de formas del conjugador) avisa si una
respuesta usa un tiempo que todavía no se enseñó.

**Desde B1 la cultura manda**: lecturas, dictogloss, ejemplos, escenas y el
examen tratan historia, filosofía, sociología y literatura de Brasil y de
Portugal: la corte en 1808, la Abolición, Canudos, la Era Vargas, la
dictadura y la Constitución de 1988; Freyre, Sérgio Buarque, Darcy Ribeiro,
Florestan, Lélia Gonzalez, DaMatta, Schwarz, Paulo Freire; Machado, Clarice,
Guimarães Rosa, Carolina Maria de Jesus; Camões, Vieira, 1755 y Pombal, el
25 de Abril, Pessoa, Saramago, Eduardo Lourenço, Mia Couto. Las citas son
reales; las apócrifas se dicen apócrifas.

## Qué trae

| Módulo | Contenido |
|---|---|
| Lecciones (`tools/pt/lessons/`) | 52 lecciones, 369 bloques de teoría en sesiones cortas, con chequeos: marcadores del habla desde la 8, actos de habla, un *sotaque* cada cuatro semanas, los géneros desde la 28 |
| Ejercicios (`tools/pt/authored/`) | 2.563: elegir, completar, traducir, encontrar el error, *garden path*, *descubrí la regla*, combinar oraciones, escucha, colocaciones, pragmática, examen; la consigna, en portugués desde la 14 (las simples) y la 27 (todas) |
| Palabras de la semana (`tools/pt/vocab/`) | 1.008, cada una con significado, ejemplo y **cómo se usa** |
| Conjugador (`docs/lang/pt/conjugator.js`) | 419 verbos, 17 tiempos, participios dobles, infinitivo pessoal, imperativo, reflexivos; 8.187 controles |
| Frases (`docs/js/frasi.js`) | 32 escenas, 539 frases de conversación, todas con su nota de construcción |
| Laboratorio (`docs/js/lab.js`) | *Ponte* (16 reglas español → portugués, 196 cognados), 103 falsos amigos, *Entender* (input estructurado) |
| Duelos (`docs/js/duelli.js`) | ser/estar, por/para, seu/dele, perfeito/imperfeito, simple/composto, indicativo/subjuntivo, futuro do subjuntivo/infinitivo pessoal, a/à |
| Lecturas | *A semana* (52 textos), *Martín no Rio* (10 episodios), *Cultura* (23), *Enchentes* (12, input flood) |
| Tramo C1 (`tools/pt/tramo/`, `docs/js/tramo.js`) | Semanas 27-51: *Leituras longas* (350 → 900 palabras, preguntas en portugués), *Escutas longas* a dos voces (250 → 600 palabras) y una tarea integrada al estilo del Celpe-Bras (120 → 250 palabras), con revisión local y rúbrica con IA |
| Sons (`docs/lang/pt/ascolto_data.js`) | 181 pares mínimos, habla conectada, entonación, acento tónico; 47 dictogloss |
| Diagnóstico (`docs/lang/pt/diagnosi.js`) | ~33 categorías de error del hispanohablante, pista primero y explicación después |
| Escreva (`docs/lang/pt/scrivi.js`) | 48 tareas de escritura con destinatario y propósito (en portugués desde la 14), con su corrector |
| Banco (`tools/pt/bank/`) | 1.836 sustantivos, 674 verbos, 448 adjetivos, 463 palabras, 700 oraciones, 524 errores típicos, 1.095 interferencias del español, 148 falsos amigos |
| Frecuencia (`docs/lang/pt/data/frequenza.json`) | 16.232 lemas de OpenSubtitles 2018 pt-BR (hermitdave/FrequencyWords, CC BY-SA 4.0); niveles por banda de frecuencia |
| Exame C1 (`docs/lang/pt/esame_data.js`) | Compreensão oral, Leitura y Produção escrita con cuatro tarefas integradas y la rúbrica del Celpe-Bras; Estruturas y Léxico, opcionales; todo en portugués, tres versiones (ver abajo) |

La investigación detrás de cada ejercicio (recuperación, espaciado con FSRS,
pretest, intercalado, input estructurado, feedback correctivo…) es la misma
que la de La Via C1; está explicada en su README.

## Desarrollo

```sh
npm run build      # tools/pt/build_bank.py + tools/pt/build_course.py → docs/lang/pt/data/ (y el italiano, el tramo, la Biblioteca)
npm test           # los dos idiomas, lo común y los chequeos de contenido (npm run test:pt: solo el portugués)
npm start          # http://localhost:8000
npm run smoke      # recorrida en Chromium (tools/lib/smoke_browser.js, necesita Playwright)
node tools/pt/diag_review.js  # el diagnóstico a escala: errores del hispanohablante inyectados en las 52 semanas
```

Cómo se escribe el contenido: `CONTENIDO.md` (lo común) y `tools/pt/CONTENIDO.md` (lo del portugués). La frecuencia se regenera
con `python3 tools/pt/build_frequenza.py` (necesita red y, para lematizar bien,
`pip install spylls`).

Material de apoyo que se usó: *Noções básicas de gramática portuguesa (PLE)*
(José Carlos Silva), *Gramática portuguesa* (Espasa), *Vamos nessa? Vamos!*
(Ministerio de Educación de Corrientes), la guía de Philipe Brazuca y el
Documento-base del Celpe-Bras (INEP).

## Tramo C1: la tarea integrada del Celpe-Bras

El Celpe-Bras no pregunta gramática: da un texto o un audio y pide escribir
otro, de un género, para alguien y con un propósito. Desde la semana 27, cada
semana trae tres misiones obligatorias que entrenan exactamente eso:

- 📰 **Leitura longa**: reportaje, columna de opinión, crónica, cuento,
  informe o guía, de 350 palabras en la semana 27 a 900 en la 51, con
  preguntas y *verdadeiro / falso / não se diz* en portugués.
- 🎧 **Escuta longa**: un programa de radio, un podcast, un debate o una
  llamada, a dos voces, de 250 a 600 palabras. Se escucha dos veces con las
  preguntas a la vista y la transcripción aparece al final.
- 🖋️ **Tarefa**: el enunciado sigue el formato del examen («Você é… Após
  ler/ouvir…, escreva um(a)… para…  Não se esqueça de…»). Los géneros son
  carta formal, e-mail, carta do leitor, artigo, resenha, texto de opinião,
  resumo, relato, carta aberta, post de blog, texto instrucional y proposta,
  de 120 a 250 palabras. Antes de la primera tarea de cada género, su
  ficha (para qué sirve, estructura, fórmulas, modelo anotado).
  - **Revisión local obligatoria**: extensión, variedad léxica, no copiar de
    la fuente y los puntos del enunciado (hechos de la fuente).
  - **Adequação**: tratamiento coherente (*você* / *o senhor*), propósito
    del género, uso de la fuente y registro.
  - **Sugerencias**: vocativo y despedida, título, párrafos, conectores y
    los errores típicos.
  - **Con IA**: además, la grilla de la producción escrita.

Detalle del funcionamiento en el README del italiano.

## Exame C1: la prova

La semana 52 es un examen al estilo del Celpe-Bras (Avançado Superior),
sin la parte oral y todo en portugués. Aprobar pide el 55 % en cada prueba
que cuenta y el 60 % de promedio.

- **Compreensão oral**: una entrevista a dos voces, dos escuchas, ocho
  preguntas con opciones de largo parejo y cuatro huecos.
- **Leitura**: un texto largo con título por párrafo y
  *verdadeiro / falso*.
- **Produção escrita**: cuatro tarefas integradas, como en la prova. Cada
  una trae su insumo antes del enunciado:
  - la 1, la entrevista de la versión (se escucha dos veces, leída a dos
    voces);
  - la 2, la lectura de la versión (se despliega);
  - la 3, un audio corto (un recado, un podcast, la radio del barrio);
  - la 4, un texto corto (un aviso, una nota, la respuesta de una tienda).

  El enunciado no dice extensión ni registro: se deducen del género, del
  interlocutor y del propósito. Sin clave, cada tarefa pasa por la revisión
  de la tarea C1 (`Tramo.evaluate`), con la *adequação* del tramo:
  tratamiento, propósito del género, uso del insumo y registro. Con clave,
  la IA la califica con las tres *adequações* (contexto, discursiva,
  lingüística, léxico) y recibe el insumo para juzgar cómo se usó.
- **Estruturas** y **Léxico**: opcionales, como en los exámenes europeos. El
  Celpe-Bras no las tiene, así que no cuentan para aprobar.

**Tres versiones**, cada una con su entrevista, su lectura y sus cuatro
tarefas. La primera vez toca la 1; si no aprobás, el intento siguiente usa
la que todavía no hiciste. La pantalla dice qué versión estás haciendo y cómo
te fue en las otras. Después de aprobar, el plan de mantenimiento propone un
simulacro cada tres meses con la versión siguiente. Se guarda en
`state.esame`: la versión en curso y, por versión, las pruebas del intento y
la mejor nota.

### Palabras B2-C1 y corrector (v2.7)

- **Palabras**: de la semana 27 a la 51, veinte palabras por semana. A las
  15 de siempre se suman cinco del léxico B2-C1 de la leitura o la escuta
  longa de esa semana (`tools/pt/vocab/s5_tramo.py`).
- **Corrector**: en el texto nativo del tramo marcaba 83 falsas alarmas y
  ahora marca 20.
  - No marca lo que está citado.
  - Acepta *a serviço de*, *a fim de*, *o caixa*, *muito presentes* y los
    sustantivos en *-ista*.
  - Un «que» separado por coma ya no dispara el subjuntivo.
  - Solo cuenta como futuro la perífrasis *vai* + infinitivo.
  - Pasan a sugerencia *se o ator fala…* (una condición real con presente)
    y el relativo sin preposición del habla (*o jeito que*).

## Las capas: Input, Práctica, Referencia

Cada pestaña es una capa. **Ler** es el input: arriba lo de esta semana (la
lectura y la escucha pendientes, el capítulo recomendado de la Biblioteca y
los minutos leídos y escuchados en 7 días), después Historias, La semana,
Lecturas largas, Escuchas y Biblioteca, plegadas por estación con la actual
abierta, y la velocidad de lectura: cada lectura se cronometra sola y cuenta
si después entendiste el 70 % o más, con la curva del año y los textos para
releer contra el reloj. **Treino** es la práctica, con el mismo patrón.
**Consultar** es la referencia: un diccionario del curso (glosa, semana,
nivel y frecuencia, la forma verbal, combinaciones y usos reales ya leídos),
Mi gramática (también lo que todavía no llegó, con aviso), Palabra por
palabra, los mapas de preposiciones, las fórmulas fijas y los contrastes de
Tres lenguas. En el percorso aparecen, opcionales, «Leé un capítulo» de la
Biblioteca y «Tres vueltas». Qué hace cada módulo (Escritura guiada,
Variaciones, C-test, Ordená, Tres vueltas, Reformulación, Mapas, Ubicación,
Mi gramática, Desglose, Tres lenguas, Frecuencia): `ARQUITECTURA.md`, «Las
capas y los módulos».
