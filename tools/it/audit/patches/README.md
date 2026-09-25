# Parches del audit

- `dummies/chNN.json`: reescritura de los ejercicios de *Italian Grammar For Dummies*
  para que se entiendan en español (consigna, enunciado, respuestas). Los aplica
  `python3 tools/audit/apply_patches.py`.
- `sfide/chNN.json`: clave de respuestas de los desafíos del *Soluzioni* para que
  se jueguen corregidos automáticamente. Los lee `tools/build_course.py`.
