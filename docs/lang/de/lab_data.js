/*
 * El laboratorio de Weg C1: los datos.  La lógica (sesiones, opciones,
 * intercalado) está en el núcleo, docs/js/lab.js, que lee window.LAB_DATA.
 *
 * El alemán no tiene Ponte ni falsos amigos (RULES y FALSI vacíos): solo
 * Capire — input estructurado (VanPatten & Cadierno 1993; VanPatten 2004):
 * antes de producir una forma, aprender a interpretarla.  Cada ítem se
 * resuelve solo mirando la forma (el caso del artículo, el auxiliar, el
 * Konjunktiv), no el orden ni el contexto.  Cada set trae `week`: la semana
 * del temario (tools/de/TEMARIO.md) en la que se enseña la forma.
 */
(function (root) {
  "use strict";

  var RULES = [];
  var FALSI = [];
  var FALSI_WEEK = 0;

  /* ------------------------------------------------------------ capire */

  // Cada set: una regla breve (la Explicit Information de VanPatten) e ítems
  // [oración, respuesta, semana?].  Un tercer elemento es la semana desde la
  // que se muestra el ítem (si usa algo que llega después que el set).
  var HM = ["el hombre", "el perro"];
  var LS = ["el profesor", "la alumna"];
  var T = ["ya pasó", "pasa ahora / siempre", "va a pasar"];
  var K = ["pasó de verdad", "es imaginado, deseado o posible"];
  var W = ["pasiva: algo se hace", "se vuelve, llega a ser", "futuro: va a pasar"];
  var S = ["de él", "de ella", "de ellos", "de usted"];
  var D = ["el diario lo afirma", "el diario cuenta lo que dice otro"];

  var CAPIRE = [
    { id: "objeto", week: 4, h: "¿Quién hace qué?",
      body: "En alemán el orden no dice quién hace la acción: lo dice el **artículo**. ***der*** (masculino) es el sujeto; ***den*** es el objeto, vaya donde vaya. *Den Hund kennt der Mann* = el hombre conoce al perro, aunque el perro esté adelante.",
      q: "¿Quién hace la acción?",
      opts: HM,
      items: [["Den Hund kennt der Mann.", HM[0]], ["Der Hund kennt den Mann.", HM[1]],
              ["Den Mann kennt der Hund.", HM[1]], ["Der Mann kennt den Hund.", HM[0]],
              ["Den Hund liebt der Mann.", HM[0]], ["Den Mann liebt der Hund.", HM[1]],
              ["Einen Hund braucht der Mann.", HM[0]], ["Einen Mann braucht der Hund.", HM[1]],
              ["Den Mann kennt der Hund nicht.", HM[1]], ["Den Hund kennt der Mann nicht.", HM[0]],
              ["Ihn liebt der Hund.", HM[1]], ["Ihn liebt der Mann.", HM[0]],
              ["Den Hund sieht der Mann.", HM[0], 6], ["Der Hund sieht den Mann.", HM[1], 6],
              ["Den Mann sieht der Hund nicht.", HM[1], 6]] },

    { id: "sein-ihr", week: 10, h: "¿De quién es?",
      body: "El posesivo mira al **dueño**, no a la cosa: ***sein*** = de él; ***ihr*** = de ella o de ellos; ***Ihr*** (con mayúscula) = de usted. La terminación sí copia la cosa: *Anna und ihr Balkon* es de ella aunque *Balkon* sea masculino.",
      q: "¿De quién es?",
      opts: S,
      items: [["Anna und ihr Bruder.", S[1]], ["Paul und seine Schwester.", S[0]],
              ["Die Kinder und ihre Katze.", S[2]], ["Herr Weber, ist das Ihr Auto?", S[3]],
              ["Paul sucht seine Brille.", S[0]], ["Lisa sucht ihre Brille.", S[1]],
              ["Die Nachbarn verkaufen ihre Wohnung.", S[2]], ["Frau Klein, ist das Ihre Tasche?", S[3]],
              ["Maria ruft ihren Vater an.", S[1]], ["Peter ruft seinen Vater an.", S[0]],
              ["Meine Eltern lieben ihren Garten.", S[2]], ["Anna und ihr Balkon.", S[1]],
              ["Paul und seine Küche.", S[0]], ["Die Frau sucht ihren Hund.", S[1]],
              ["Der Mann sucht seinen Hund.", S[0]]] },

    { id: "dativo", week: 13, h: "¿Quién recibe?",
      body: "El que recibe va en **dativo**: ***dem*** para el masculino (*dem Lehrer*) y ***der*** para el femenino (*der Schülerin*). Ojo: *der* también es sujeto masculino. *Der Schülerin gibt der Lehrer das Heft*: el profesor da, la alumna recibe.",
      q: "¿Quién recibe?",
      opts: LS,
      items: [["Dem Lehrer gibt die Schülerin das Heft.", LS[0]], ["Die Schülerin gibt dem Lehrer das Heft.", LS[0]],
              ["Der Lehrer gibt der Schülerin das Heft.", LS[1]], ["Der Schülerin gibt der Lehrer das Heft.", LS[1]],
              ["Dem Lehrer zeigt die Schülerin ihr Foto.", LS[0]], ["Der Schülerin zeigt der Lehrer sein Foto.", LS[1]],
              ["Der Lehrer schenkt der Schülerin ein Buch.", LS[1]], ["Die Schülerin schenkt dem Lehrer ein Buch.", LS[0]],
              ["Der Schülerin bringt der Lehrer einen Stift.", LS[1]], ["Dem Lehrer bringt die Schülerin einen Kaffee.", LS[0]],
              ["Die Schülerin gibt ihm das Heft.", LS[0]], ["Der Lehrer gibt ihr das Heft.", LS[1]],
              ["Ein Buch schenkt der Lehrer der Schülerin.", LS[1]], ["Einen Kaffee bringt die Schülerin dem Lehrer.", LS[0]]] },

    { id: "tiempo", week: 23, h: "¿Cuándo pasa?",
      body: "Mirá el verbo conjugado: *haben* o *sein* **+ participio** (*hat gegessen, ist gefahren*) = ya pasó; ***war, hatte*** también. *werden* **+ infinitivo** al final (*wird essen*) = va a pasar. El verbo solo, en presente, = ahora o siempre.",
      q: "¿Cuándo pasa?",
      opts: T,
      items: [["Ich habe Pizza gegessen.", T[0]], ["Ich esse Pizza.", T[1]],
              ["Ich werde Pizza essen.", T[2]], ["Er ist nach Berlin gefahren.", T[0]],
              ["Er fährt jeden Tag nach Berlin.", T[1]], ["Er wird nach Berlin fahren.", T[2]],
              ["Wir sind müde.", T[1]], ["Wir sind spät gekommen.", T[0]],
              ["Wir werden spät kommen.", T[2]], ["Sie hat ein Auto.", T[1]],
              ["Sie hat ein Auto gekauft.", T[0]], ["Sie wird ein Auto kaufen.", T[2]],
              ["Ich hatte keine Zeit.", T[0]], ["Ihr werdet das schaffen.", T[2]],
              ["Du arbeitest zu viel.", T[1]], ["Du hast zu viel gearbeitet.", T[0]]] },

    { id: "relativo", week: 24, h: "¿Quién lo hizo?",
      body: "El pronombre relativo lleva el caso: ***der*** = el antecedente hace la acción; ***den*** = la recibe (objeto); ***dem*** = también la recibe, en dativo (*folgen, helfen*). *Der Mann, den der Hund gebissen hat*: el perro mordió al hombre.",
      q: "En la relativa, ¿quién hace la acción?",
      opts: HM,
      items: [["Der Mann, den der Hund gebissen hat, ist im Krankenhaus.", HM[1]],
              ["Der Mann, der den Hund gebissen hat, ist verrückt.", HM[0]],
              ["Der Hund, den der Mann gebissen hat, hat Angst.", HM[0]],
              ["Der Hund, der den Mann gebissen hat, ist weg.", HM[1]],
              ["Der Mann, dem der Hund folgt, wohnt hier.", HM[1]],
              ["Der Hund, dem der Mann hilft, ist alt.", HM[0]],
              ["Der Mann, dem der Hund geholfen hat, ist sehr dankbar.", HM[1]],
              ["Der Hund, der dem Mann folgt, heißt Max.", HM[1]],
              ["Der Mann, der dem Hund hilft, ist Tierarzt.", HM[0]],
              ["Wo ist der Hund, den der Mann sucht?", HM[0]],
              ["Wo ist der Mann, den der Hund sucht?", HM[1]],
              ["Das ist der Hund, den der Mann jeden Tag füttert.", HM[0]],
              ["Das ist der Mann, den der Hund jeden Morgen weckt.", HM[1]],
              ["Das ist der Mann, der den Hund jeden Tag füttert.", HM[0]]] },

    { id: "konj2", week: 25, h: "¿Pasó o es imaginado?",
      body: "La diéresis cambia todo: ***war, hatte, konnte*** = pasó de verdad; ***wäre, hätte, könnte*** (Konjunktiv II) = imaginado, deseado o posible. *würde* + infinitivo, también. *Ich war in Rom* = estuve; *Ich wäre gern in Rom* = me gustaría estar.",
      q: "¿Pasó de verdad o es imaginado?",
      opts: K,
      items: [["Gestern hatte ich keine Zeit.", K[0]], ["Wenn ich Zeit hätte, würde ich mitkommen.", K[1]],
              ["Er konnte gut schwimmen.", K[0]], ["Er könnte gut schwimmen, wenn er mehr trainieren würde.", K[1]],
              ["Wir waren in Rom.", K[0]], ["Wir wären gern in Rom.", K[1]],
              ["Sie hatte ein Auto.", K[0]], ["Sie hätte gern ein Auto.", K[1]],
              ["Das Wetter war schön.", K[0]], ["Das wäre schön!", K[1]],
              ["Wir konnten nicht kommen.", K[0]], ["Wir könnten morgen kommen.", K[1]],
              ["Ich wäre jetzt lieber am Strand.", K[1]], ["Als Kind war ich oft krank.", K[0]],
              ["Ich hatte das nicht gewusst.", K[0], 30], ["Hätte ich das nur gewusst!", K[1], 30]] },

    { id: "werden", week: 27, h: "¿Es pasiva?",
      body: "*werden* tiene tres trabajos y lo que va al final decide: **+ participio** (*wird gemacht*) = pasiva; **+ sustantivo o adjetivo** (*wird Arzt, wird kalt*) = se vuelve, llega a ser; **+ infinitivo** (*wird kommen*) = futuro.",
      q: "¿Qué hace *werden* acá?",
      opts: W,
      items: [["Das Haus wird gebaut.", W[0]], ["Er wird Arzt.", W[1]],
              ["Er wird morgen kommen.", W[2]], ["Es wird kalt.", W[1]],
              ["Die Briefe wurden gestern geschickt.", W[0]], ["Sie wurde Lehrerin.", W[1]],
              ["Wir werden das Auto verkaufen.", W[2]], ["Das Auto wird verkauft.", W[0]],
              ["Der Müll wird getrennt.", W[0]], ["Die Tage werden kürzer.", W[1]],
              ["Ich werde dich anrufen.", W[2]], ["Das Glas wird recycelt.", W[0]],
              ["Mein Bruder wird bald 30.", W[1]], ["Es wird morgen regnen.", W[2]],
              ["Die Fabrik wurde 1990 gebaut.", W[0]]] },

    { id: "konj1", week: 35, h: "¿Lo dice él o lo dice el diario?",
      body: "En las noticias, el **Konjunktiv I** (*er sei, er habe, er komme*: sin *-t*) marca que el diario reproduce lo que dijo otro, sin hacerse cargo. El indicativo (*ist, hat, kommt*) lo afirma el diario. *soll* + infinitivo = «dicen que».",
      q: "Lo leés en el diario. ¿Quién lo afirma?",
      opts: D,
      items: [["Der Minister ist krank.", D[0]], ["Der Minister sei krank.", D[1]],
              ["Die Firma hat keine Schulden.", D[0]], ["Die Firma habe keine Schulden.", D[1]],
              ["Der Zug kommt später.", D[0]], ["Der Zug komme später.", D[1]],
              ["Die Polizei weiß noch nichts.", D[0]], ["Die Polizei wisse noch nichts.", D[1]],
              ["Das Museum wird im Mai öffnen.", D[0]], ["Das Museum werde im Mai öffnen.", D[1]],
              ["Die Stadt kann das nicht bezahlen.", D[0]], ["Die Stadt könne das nicht bezahlen.", D[1]],
              ["Der Minister soll krank sein.", D[1], 37], ["Der Sänger soll viel Geld verloren haben.", D[1], 37],
              ["Der Sänger hat viel Geld verloren.", D[0], 37]] }
  ];

  root.LAB_DATA = {
    RULES: RULES,
    FALSI: FALSI,
    FALSI_WEEK: FALSI_WEEK,
    CAPIRE: CAPIRE,
    ui: {}
  };
})(typeof window !== "undefined" ? window : globalThis);
