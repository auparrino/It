# Revisión por un hablante nativo

Las pruebas automáticas y una revisión completa hecha por un modelo no
encontraron italiano incorrecto, pero no reemplazan a una persona que habla
el idioma. Estas tres planillas son para esa persona.

| Archivo | Qué trae |
|---|---|
| `ejercicios.csv` | Cada ejercicio: consigna, enunciado, respuesta y variantes aceptadas |
| `banco.csv` | Las oraciones del banco: castellano, italiano y variantes |
| `teoria.csv` | Cada bloque de teoría: regla, advertencia, ejemplos y tabla |

Cómo revisar:

1. Abrir el CSV en Excel, Numbers o Google Sheets.
2. En «OK» poner *sí* o *no*. Si es *no*, escribir en «Corrección» cómo
   debería ser y, si hace falta, en «Comentario» por qué.
3. Marcar también lo que es correcto pero que nadie diría así, y las
   respuestas correctas que faltan en «También se acepta».
4. Empezar por las semanas 1 a 26: es donde llega la mayoría.

Para regenerar las planillas después de cambiar el curso:

```
python3 tools/hoja_nativo.py
```
