/* La Biblioteca en italiano: lo que docs/js/biblioteca.js necesita saber
   de la lengua.  Los libros están en lang/it/biblioteca/ (los arma
   tools/lib/build_biblioteca.js). */
(function (root) {
  "use strict";
  root.BIBLIO_DATA = {
    ui: {
      name: "Biblioteca",
      blurb: "Collodi, Pirandello, De Amicis, Capuana, Salgari, Deledda: cuentos y novelas de verdad, " +
             "de dominio público. Tocás una palabra y te dice qué significa.",
      lead: "Libros enteros para leer mucho, a tu ritmo, en el teléfono. Primero cuentos cortos; después, novelas. " +
            "Son textos de hace más de cien años: vas a ver algunas formas antiguas (egli, codesto, dimandare)."
    },
    /* Cognados que un hispanohablante lee solo, por el sufijo: -zione
       (nazione: nación), -ità (città, università: -idad), -ismo, -ista,
       -enza, -anza, -abile, -ibile, -mente, -ario, -orio.  Solo palabras
       largas. */
    cognates: ["^[a-zà-ÿ]{3,}zion[ei]$", "^[a-zà-ÿ]{3,}ità$", "^[a-zà-ÿ]{3,}ism[oi]$", "^[a-zà-ÿ]{3,}ist[aie]$",
      "^[a-zà-ÿ]{3,}enz[ae]$", "^[a-zà-ÿ]{3,}anz[ae]$", "^[a-zà-ÿ]{3,}(abile|ibile|abili|ibili)$",
      "^[a-zà-ÿ]{4,}mente$", "^[a-zà-ÿ]{4,}ari[oa]$", "^[a-zà-ÿ]{4,}ori[oa]$"]
  };
})(typeof window !== "undefined" ? window : globalThis);
