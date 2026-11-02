# Lectura guiada: cómo se arma un libro

La app (docs/js/libro.js) no trae ningún libro: el alumno carga en su
teléfono un paquete `.json` con el texto y las explicaciones. Acá están las
herramientas para armarlo desde un ePub propio. **Ni el texto ni los
paquetes se commitean**: son del alumno.

1. Extraer el ePub (`unzip libro.epub -d x`) y partirlo en oraciones
   numeradas: `segmentar_doblin.py x WORK` (Berlin Alexanderplatz) o
   `segmentar_eco_machado.py rosa|bras SCRATCH` (Il nome della rosa,
   Memórias póstumas de Brás Cubas). Escriben `WORK/book.json`. Otro libro
   necesita su propio segmentador (cada ePub marca distinto los capítulos).
2. `tramos.py SCRATCH`: corta el libro en tramos de ≈1500 palabras
   (`WORK/chunks/cNNN.txt` y `WORK/chunks.json`).
3. Un agente por tramo (Sonnet alcanza) sigue `INSTRUCCIONES.md` y escribe
   `WORK/out/cNNN.json`: resumen, contexto, vocabulario, gramática,
   preguntas y, para cada oración, traducción, glosas, nota, alemán
   estándar (si es berlinés) y palabra por palabra. `check.py` controla
   que el JSON sea válido y que no falte ninguna oración.
4. `paquete.py WORK META.json libro.json`: el paquete para el teléfono.
   En la app: Ich / Io / Eu → 📕 Lectura guiada → Cargar un libro.
