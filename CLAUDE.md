# Para Claude

- El alumno (dueño del repo) trabaja en español rioplatense: contestá igual, corto y sin tecnicismos de más.
- Si te pide «seguí con el plan», «ejecutá el paso N» o algo parecido, el plan está en `auditorias/PLAN.md`: leelo entero y seguí su sección «Cómo se usa».
- Antes de tocar contenido, leé el «Procedimiento común» de ese plan (sobre todo: `docs/` se regenera en un clon limpio, si no el CI falla).
- GitHub Pages publica `main/docs`: lo que se mergea a `main` llega a la app.
- Si cambiás contenido (`tools/` o `docs/lang/`), después de regenerar `docs/` corré `node tools/audit/inventario.js --sync` y commiteá `auditorias/registro/`; si no, falla `tools/lib/test_registro.js`.
- **Norma: nada se pide antes de explicarse.** Ningún ejercicio (ni repaso, ni misión) puede pedir algo que la lección de su semana o de una anterior todavía no explicó, ni siquiera «como fórmula» si la lección no la enseña. Los builds lo hacen cumplir: `tools/it/sillabo.py`, `tools/pt/sillabo.py` y `tools/de/sillabo.py` detectan el tiempo o la estructura y el ejercicio pasa solo a la semana de su teoría. Si agregás una fórmula que la lección sí explica antes, anotala en el `FIXED` del `sillabo.py` de ese idioma.
- **Norma: nada de memoria de un texto.** Ningún ejercicio pide recordar una palabra o un trozo exacto de una lectura, un audio o un texto modelo que no está en pantalla: o se muestra el texto, o la respuesta se puede deducir de lo que se ve.
