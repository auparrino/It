/* La Biblioteca en portugués: lo que docs/js/biblioteca.js necesita saber
   de la lengua.  Los libros están en lang/pt/biblioteca/ (los arma
   tools/lib/build_biblioteca.js; la ortografía la moderniza
   tools/pt/ortografia.js). */
(function (root) {
  "use strict";
  root.BIBLIO_DATA = {
    ui: {
      name: "Biblioteca",
      blurb: "Machado de Assis, Eça de Queirós, Lima Barreto, Aluísio Azevedo: cuentos y novelas de verdad, " +
             "de dominio público, con la ortografía de hoy. Tocás una palabra y te dice qué significa.",
      lead: "Libros enteros para leer mucho, a tu ritmo, en el teléfono. Primero cuentos cortos; después, novelas. " +
            "La ortografía está actualizada al Acuerdo de 1990 (las ediciones originales escribían pharmacia, elle, sahir)."
    },
    /* Cognados que un hispanohablante lee solo, por el sufijo: -ção
       (nação: nación), -dade (cidade: ciudad), -ismo, -ista, -ência,
       -ância, -ável, -ível, -ário, -ório, -ico acentuado, -mente.  Solo
       palabras largas: las cortas engañan más. */
    cognates: ["^[a-zà-ÿ]{3,}ções?$", "^[a-zà-ÿ]{3,}dades?$", "^[a-zà-ÿ]{3,}ismos?$", "^[a-zà-ÿ]{3,}istas?$",
      "^[a-zà-ÿ]{3,}ências?$", "^[a-zà-ÿ]{3,}âncias?$", "^[a-zà-ÿ]{3,}(ável|ível|áveis|íveis)$",
      "^[a-zà-ÿ]{4,}ári[oa]s?$", "^[a-zà-ÿ]{4,}óri[oa]s?$", "^[a-zà-ÿ]*[áéíóúâêô][a-zç]*ic[oa]s?$",
      "^[a-zà-ÿ]{4,}mente$"]
  };
})(typeof window !== "undefined" ? window : globalThis);
