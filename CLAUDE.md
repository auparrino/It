# Para Claude

- El alumno (dueño del repo) trabaja en español rioplatense: contestá igual, corto y sin tecnicismos de más.
- Si te pide «seguí con el plan», o nombra un paso ("hacé el paso 1.1", "el paso 0", "ejecutá el 2.3", "el siguiente"), siempre se refiere a la tabla de estado de `auditorias/PLAN.md`: no preguntes de qué plan habla. Leelo entero y seguí su sección «Cómo se usa». Un número de fase solo («paso 0») son todos los pasos de esa fase (0.1 y 0.2).
- Antes de tocar contenido, leé el «Procedimiento común» de ese plan (sobre todo: `docs/` se regenera en un clon limpio, si no el CI falla).
- GitHub Pages publica `main/docs`: lo que se mergea a `main` llega a la app.
- Si cambiás contenido (`tools/` o `docs/lang/`), después de regenerar `docs/` corré `node tools/audit/inventario.js --sync` y commiteá `auditorias/registro/`; si no, falla `tools/lib/test_registro.js`.
