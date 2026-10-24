# Prompt para la próxima sesión

La Tanda 4 y las voces por género salieron en la v3.17.0. Queda pendiente la
voz menos robótica (punto 3). Copiá desde acá:

---

Repo auparrino/It. Leé CLAUDE.md y el «Procedimiento común» de `auditorias/PLAN.md` antes de tocar nada.

## Voz menos robótica: audios pregenerados

Pregenerar con TTS neuronal los audios de radio, tramo y diálogos del examen
(y, si entra en el tamaño, las frases de escucha) como MP3/OGG estáticos en
`docs/`, con el TTS del teléfono como respaldo. Cada hablante con la voz de
su género (`sexes` en los datos, `docs/js/voces.js`).

Lo que ya se probó con Piper (gratis, corre local; `pip install piper-tts`,
voces en huggingface.co/rhasspy/piper-voices):
- italiano: mujer `paola-medium` y `serena-medium/high`; hombre solo
  `riccardo-x_low` (calidad baja);
- alemán: hombre `thorsten-medium/high`; mujer `kerstin-low`, `ramona-low`,
  `eva_k-x_low`;
- portugués de Brasil: solo voces de hombre (`faber`, `cadu`, `jeff`,
  `edresson`): no hay voz de mujer, y Nanda, Sofía, Bia… son mujeres.
- Tamaño: unos 6 KB por segundo en MP3 de 48 kbps mono; la radio y el
  tramo de dos idiomas serían unos 30 MB. No van al precache del service
  worker: se guardan al escucharlos.

Decidir antes de seguir: Piper con voz de hombre para todo el portugués, o
una API paga (Google Cloud TTS, Azure, ElevenLabs, OpenAI) con la clave como
secreto del entorno.
