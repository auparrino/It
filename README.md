# La Via C1 · Rumo C1 — dos idiomas hasta C1 en un año

Una sola app para hispanohablantes rioplatenses con dos cursos completos:

| | Idioma | Estética | Detalle |
|---|---|---|---|
| 🇮🇹 **La Via C1** | Italiano, de cero a C1 (CILS / CELI / PLIDA) | Plazas, carteles de calle, Bodoni | [README-italiano.md](README-italiano.md) |
| 🇧🇷 **Rumo C1** | Portugués de Brasil, de cero a C1 (Celpe-Bras) | Carioca: el calçadão, el mar de Ipanema, el Pão de Açúcar | [README-portugues.md](README-portugues.md) |

Los dos comparten el mismo motor y la misma didáctica: 52 semanas en cuatro
estaciones con jefes, lecciones en pasos cortos con chequeos, repaso
espaciado con FSRS, diagnóstico de los errores típicos del hispanohablante
con pistas antes que respuestas, frases de conversación, lecturas graduadas,
pares mínimos, dictogloss, duelos, escritura libre y un examen final C1. Cada
palabra de la semana y cada frase traen **cómo se usa**: la construcción, el
régimen, el género, el contraste con el español.

Al abrir la app elegís el idioma, y lo cambiás cuando quieras desde el
perfil. Cada idioma guarda su propio progreso (quien ya estudiaba italiano
sigue donde estaba).

## En el celular

Es una app web instalable (PWA) que funciona sin internet y guarda todo en
el teléfono. Publicá `docs/` con GitHub Pages (*Settings → Pages → Deploy
from a branch*, carpeta `/docs`), abrí la URL una vez con internet y agregala
a la pantalla de inicio. `?lang=it` o `?lang=pt` en la URL abre directo un
idioma.

## Cómo está hecha

Un **núcleo** común (`docs/js/`) y un **paquete** por idioma
(`docs/lang/it/`, `docs/lang/pt/`) con su conjugador, su diagnóstico, su
contenido, su interfaz y su tema. Un arreglo en el núcleo vale para los dos
idiomas. Detalle en [ARQUITECTURA.md](ARQUITECTURA.md).

```sh
npm run build      # compila banco y curso de los dos idiomas (tools/it, tools/pt)
npm test           # la batería de tests de cada idioma contra el mismo núcleo
npm run sim        # un año simulado en cada idioma
npm start          # http://localhost:8000
```
