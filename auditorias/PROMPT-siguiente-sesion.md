# Prompt para la próxima sesión

Copiá desde acá:

---

Repo auparrino/It, rama `ccr-e941f050-pctf0y`. Leé CLAUDE.md y el «Procedimiento común» de `auditorias/PLAN.md` antes de tocar nada.

## 1. Terminar la Tanda 4 (está a medias en la rama)

En la rama hay un commit «WIP Tanda 4» (fe53a2d) encima de `main`, todavía SIN build y SIN control nativo. El plan está en `auditorias/PLAN-2026-10-propuestas.md`, sección «Tanda 4».

- Italiano: están hechas las 4 temporadas (`tools/it/authored/t4_it*.py`, `tools/it/lessons/t4_c1.py`, `tools/it/reglas_absolutas.py`) y la parte transversal (duelos, Capire y evidencia negativa en `tools/it/bank/errori_banca.py`). La parte transversal ya pasó por el profesor nativo; las 4 temporadas no.
- Portugués: están hechos lo transversal (duelos y Capire) y las semanas 1-39 (`tools/pt/authored/t4_pt1/14/27.py`, `tools/pt/check_reglas.py`). La parte de las semanas 40-52 se cortó por el límite de uso: `tools/pt/authored/t4_pt40.py` existe, pero puede estar incompleto. Revisalo contra el plan y completalo.
- Falta el control de profesor nativo, escéptico, de: it semanas 1-13, 14-26, 27-39 y 40-52, y pt transversal, 1-13, 14-26, 27-39 y 40-52. Hay que revisar que la lengua sea natural, que haya una sola respuesta correcta o un accept completo, que los distractores estén mal sin discusión y que la gramática ya esté explicada en esa semana. Se puede hacer con agentes por bloque si me parece bien gastar uso; si no, a mano.
- Después: regenerar `docs/` en un clon limpio (`npm run build` repetido hasta que no cambie nada), correr `node tools/audit/inventario.js --sync`, `npm test`, `npm run sim` y los smokes de `tools/lib/smoke_*.js` (playwright en /opt/node-tools/node_modules; los 429 de Wikimedia son ruido local). Subir la versión en package.json, `docs/js/app.js` (APP_VERSION) y `docs/sw.js` (VERSION). Aplastar todo en un commit sobre `origin/main`, abrir el PR y mergearlo cuando estén verdes los 4 chequeos.

## 2. Audio en alemán y voces de diálogo

- **En alemán no suena el audio.** Hay que averiguar por qué (el TTS está en `docs/js/app.js`: `speak()` cerca de la línea 226, `pickVoice()` cerca de la 368, con `LG.voiceRe` y `LG.voicePrefer` de `docs/lang/de/lang.js`, y también los audios reales `realVoiceSkip`/Common Voice) y arreglarlo. Si la causa es que el teléfono no tiene voz alemana instalada, que la app lo avise con instrucciones (Ajustes → Texto a voz → instalar alemán), igual que ya hace cuando el navegador no tiene voces.
- **Voces según quién habla.** En la radio, los diálogos (`docs/js/app.js` ~7233: hoy A/B solo cambia `vi` 0/1 y `pitch`) y cualquier texto con dos personas: si una es hombre y otra mujer, que cada una tenga una voz de su género; si son del mismo género, dos voces distintas. Para eso:
  - En los datos (tools/<l>/radio/*.json, diálogos, role-play): marcar el género de cada hablante (inferirlo del nombre o del texto; agregar el campo en las fuentes y en el build).
  - En la app: clasificar las voces disponibles por género con una lista de nombres conocidos (Google, Microsoft, Apple: «Elsa», «Diego», «Katja», «Conrad», «Francisca», «Antonio», etc.), elegir una distinta por hablante y, si solo hay una voz, diferenciar con pitch.
  - Preferir voces de mejor calidad en `pickVoice()`: los nombres con «Natural», «Neural», «Online», «Enhanced», «Premium» o «Google» primero.
  - Test en tools/lib y smoke.

## 3. (Para decidir) Voz menos robótica

Propuesta: pregenerar con TTS neuronal los audios de radio y diálogos (y, si entra en el tamaño, las frases de escucha), como MP3/OGG estáticos en `docs/`. Primero preguntame qué opción prefiero:
- Piper (gratis, corre local, tiene voces de/it/pt-BR de hombre y mujer).
- Una API paga (Google Cloud TTS, Azure, ElevenLabs, OpenAI) con clave.

---
