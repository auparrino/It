# Δρόμος C1 — temario del griego moderno

Griego moderno estándar (dimotikí, sistema monotónico) para hispanohablantes
rioplatenses.  Cuatro temporadas de 13 semanas; **por ahora está escrita la
primera** (del alfabeto a A2); las otras tres están planeadas semana por
semana más abajo, y el orden en que se escriben, en `auditorias/PLAN-griego.md`.
Cada semana está en `semanas/sNN.py` (un
`WEEK`); revisá con `python3 tools/el/check_semana.py` y compilá con
`python3 tools/el/build_course.py`.

## De dónde sale la progresión

El orden de los temas sigue el de los manuales de griego como lengua
extranjera más usados y el programa oficial de exámenes; el contenido
(explicaciones, ejemplos, ejercicios) está escrito para este curso, pensado
desde el castellano, y no copia ninguno:

- **Κέντρο Ελληνικής Γλώσσας**, *Πιστοποίηση Επάρκειας της Ελληνομάθειας:
  αναλυτικό εξεταστικό πρόγραμμα* (los niveles Α1-Γ2 del certificado
  oficial, alineados con el MCER): qué se espera poder hacer en cada nivel.
- *Ελληνικά Τώρα 1+1* (Δ. Δημητρά, Μ. Παπαχειμώνα): el orden nominativo →
  acusativo → plural, y los verbos por tipos (Α, Β1/Β2, -μαι).
- *Επικοινωνήστε Ελληνικά 1* (Κ. Αρβανιτάκης, Φ. Αρβανιτάκη): las situaciones
  (el café, la calle, la hora, la familia, el mercado) y la presentación de
  να / θα con el tema del aoristo.
- *Κλικ στα Ελληνικά Α1-Α2* (Κέντρο Ελληνικής Γλώσσας): el arranque por el
  alfabeto y las palabras internacionales.
- *Ελληνικά Α΄* (Γ. Σιμόπουλος y otras): el control de la gramática por
  unidad.
- Para la gramática: D. Holton, P. Mackridge, I. Philippaki-Warburton,
  *Greek: An Essential Grammar of the Modern Language*; y la *Γραμματική
  της Νέας Ελληνικής* de Μ. Τριανταφυλλίδης.

Lo propio de este curso es el punto de partida: lo que el castellano regala
(la δ de «nada», la γ de «lago», la θ de la z de Madrid, la tilde que marca
la sílaba fuerte, los cientos de palabras de origen griego: *πρόβλημα,
θέατρο, τηλέφωνο*) y lo que hace tropezar (el género que no coincide, los
casos, el artículo con los nombres propios, el aspecto verbal).

## Temporada 1 — Το λιμάνι, «el puerto» (A1 → A2)

| Sem. | Título | Nivel | Gramática | Para qué / léxico |
|---|---|---|---|---|
| 1 | Γεια σου! | A1 | Las 24 letras, mayúsculas y minúsculas, las «falsas amigas» (ρ, ν, η, χ, β, υ, ω), el acento escrito, ου / αι / ει / οι, la sigma final | Leer en voz alta, saludar, agradecer |
| 2 | Πώς σε λένε; | A1 | μπ, ντ, γκ, τσ, τζ, αυ / ευ, las cinco «i»; pronombres, *είμαι*, *δεν*; *με λένε…*; el signo «;»; εσύ / εσείς | Presentarte, decir de dónde sos |
| 3 | Ο, η, το | A1 | Los tres géneros, artículo definido e indefinido (nominativo singular), terminaciones típicas, el artículo con los nombres propios, *αυτός / αυτή / αυτό*, adjetivo en -ος, -η, -ο | La casa, objetos, describir |
| 4 | Μένω στην Αθήνα | A1 | Presente de los verbos en -ω (tipo A), *έχω*, negación y preguntas, *στην / στο / στον* como fórmula con μένω y δουλεύω, *και / αλλά* | Dónde vivís, qué hacés, qué idiomas sabés |
| 5 | Έναν καφέ, παρακαλώ | A1 | Acusativo singular (τον, την, το; έναν, μία, ένα; -ος → -ο, -ας → -α, -ης → -η), números 0-10, *πόσο κάνει;*, *τρώω* y *πίνω* | Pedir en el café y en la taberna, pagar |
| 6 | Πού είναι; | A1 | *σε* + artículo (στον, στην, στο), adverbios de lugar, *πάω* (irregular), *με* + transporte, *υπάρχει* | La ciudad, pedir y dar indicaciones |
| 7 | Τι ώρα είναι; | A1 | Números 11-100, la hora, *στις* + hora, los días (*τη Δευτέρα*), verbos en -άω (tipo B): μιλάω, ξυπνάω… | La hora, la semana, citas |
| 8 | Η οικογένειά μου | A1 | Posesivos (μου, σου, του, της, μας, σας, τους) y el segundo acento, plural nominativo (οι, οι, τα), la edad | La familia, describir personas |
| 9 | Στην αγορά | A1 | Acusativo plural (τους, τις, τα), *μου αρέσει / μου αρέσουν*, colores y concordancia, cantidades, *πόσο κάνουν;* | El mercado, comida, gustos |
| 10 | Κάθε μέρα | A2 | Verbos en -μαι (-ομαι y -άμαι), adverbios de frecuencia, *ποτέ* + *δεν*, *πριν / μετά* | La rutina diaria |
| 11 | Θέλω να πάω | A2 | *να* + subjuntivo con el tema del aoristo (-σω, -ψω, -ξω, -ήσω; irregulares: πάω, φάω, πιω, δω, πω, έρθω, πάρω), *θέλω / μπορώ / πρέπει να*, *να μην* | Querer, poder, tener que; invitar |
| 12 | Θα πάμε στο νησί | A2 | Futuro: *θα* + el mismo tema; meses y estaciones; el clima | Planes, viajes, vacaciones |
| 13 | Τι έκανες χθες; | A2 | Aoristo: regulares (el acento sube a la antepenúltima, el aumento έ-) e irregulares (πήγα, έφαγα, ήπια, είδα, είπα, ήρθα, πήρα), *ήμουν*, *είχα* | Contar lo que hiciste; repaso de la temporada |

### Las palabras de cada semana (lo que se puede pedir por escrito)

Una palabra que el alumno tiene que **escribir** tiene que estar en esta
lista o en la lección, en su semana o en una anterior; si no, va con glosa
en la consigna.  (Los nombres de persona y de lugar de `curso.NOMBRES` se
pueden usar siempre.)

1. γεια, καλημέρα, καλησπέρα, καληνύχτα, ναι, όχι, ευχαριστώ, παρακαλώ, συγγνώμη, καλά, πολύ, και, ο καφές, το νερό, η Ελλάδα. En la lección: γεια σου / γεια σας, τι κάνεις; / τι κάνετε;, εσύ;, αντίο, τα λέμε; palabras internacionales para leer (το δράμα, το θέατρο, η μουσική, το τηλέφωνο, η ιδέα, το πρόβλημα, η φωτογραφία, το ταξί, το μετρό, η πίτσα).
2. εγώ, εσύ, αυτός, αυτή, εμείς, εσείς, αυτοί, από, πού, πώς, εδώ, το όνομα, ο φίλος, η φίλη, η Αργεντινή, η Ισπανία, ο μπαμπάς, η μαμά. En la lección: είμαι, είσαι, είναι, είμαστε, είστε, είναι; δεν; με λένε, σε λένε, τον / την λένε; χαίρω πολύ; από πού είσαι;; η Ουρουγουάη, το Μεξικό, η Χιλή, η Ιταλία; ο κύριος, η κυρία.
3. το σπίτι, η πόρτα, το παράθυρο, το τραπέζι, η καρέκλα, το βιβλίο, το κλειδί, το κινητό, ο δρόμος, η θάλασσα, ο ήλιος, το νησί, μεγάλος, μικρός, ωραίος, καλός, τι, ή. En la lección: ο, η, το; ένας, μία, ένα; αυτό; ο άντρας, η γυναίκα, το παιδί (para los géneros); ο χάρτης, ο ταμίας, το μάθημα.
4. μένω, δουλεύω, μαθαίνω, καταλαβαίνω, ξέρω, θέλω, έχω, κάνω, διαβάζω, γράφω, τα ελληνικά, τα ισπανικά, τα αγγλικά, η δουλειά, το γραφείο, η πόλη, το χωριό, αλλά, λίγο, τώρα. En la lección: las seis personas del presente; στην Αθήνα, στο Μπουένος Άιρες, στον Πειραιά (fórmula).
5. ο χυμός, η μπίρα, το κρασί, το τσάι, το γάλα, η ζάχαρη, το ψωμί, το τυρί, η σαλάτα, το γλυκό, ο λογαριασμός, το ευρώ, πίνω, τρώω, ορίστε, πόσο, με, χωρίς. En la lección: los números μηδέν, ένα, δύο, τρία, τέσσερα, πέντε, έξι, επτά, οκτώ, εννέα, δέκα; τον, την, έναν; πόσο κάνει;; ο σερβιτόρος.
6. το ξενοδοχείο, η τράπεζα, το φαρμακείο, το σούπερ μάρκετ, η παραλία, το λιμάνι, το αεροδρόμιο, ο σταθμός, το λεωφορείο, το πλοίο, το αυτοκίνητο, η πλατεία, η ταβέρνα, πάω, εκεί, κοντά, μακριά, δεξιά, αριστερά. En la lección: στον, στην, στο; πάω, πας, πάει, πάμε, πάτε, πάνε; δίπλα σε, απέναντι από, ευθεία; υπάρχει; με τα πόδια.
7. η ώρα, το πρωί, το μεσημέρι, το απόγευμα, το βράδυ, η μέρα, η εβδομάδα, σήμερα, αύριο, πότε, μιλάω, ξυπνάω, ρωτάω, περπατάω, αγαπάω, πεινάω, διψάω, νωρίς, αργά. En la lección: los números hasta 100; και μισή, και τέταρτο, παρά τέταρτο, ακριβώς; στις; los siete días (η Δευτέρα … η Κυριακή); το ραντεβού.
8. η οικογένεια, ο πατέρας, η μητέρα, ο αδελφός, η αδελφή, ο γιος, η κόρη, ο παππούς, η γιαγιά, ο σκύλος, η γάτα, νέος, ψηλός, παντρεμένος, ο χρόνος, πόσα. En la lección: μου, σου, του, της, μας, σας, τους; οι, τα; los plurales; πόσων χρονών είσαι;, είμαι … χρονών; τα παιδιά, οι γονείς.
9. η αγορά, η ντομάτα, η πατάτα, το μήλο, το πορτοκάλι, η ελιά, το λάδι, το ψάρι, το κρέας, το φρούτο, το λαχανικό, το κιλό, αγοράζω, πληρώνω, φρέσκος, ακριβός, φτηνός, κόκκινος, πράσινος, άσπρος, μαύρος. En la lección: τους, τις, τα; μου αρέσει, μου αρέσουν; μισό κιλό, ένα μπουκάλι; πόσο κάνουν;; μπλε, κίτρινος; θα ήθελα (fórmula).
10. σηκώνομαι, πλένομαι, ντύνομαι, έρχομαι, κάθομαι, κοιμάμαι, θυμάμαι, φοβάμαι, χρειάζομαι, πάντα, συχνά, ποτέ, σπάνια, κάθε, μετά, πριν, το πρωινό, το μπάνιο, το κρεβάτι, κουρασμένος. En la lección: las seis personas de -ομαι y de -άμαι; μερικές φορές; συνήθως; λέγομαι.
11. μπορώ, πρέπει, βλέπω, λέω, παίρνω, παίζω, ανοίγω, κλείνω, βοηθάω, περιμένω, το εισιτήριο, το δωμάτιο, η ταινία, μαζί, γιατί, κάτι, τίποτα. En la lección: να; los temas (αγοράσω, διαβάσω, πληρώσω, γράψω, δουλέψω, παίξω, ανοίξω, μιλήσω, μείνω, φάω, πιω, δω, πω, έρθω, πάρω); να μην; θέλεις να…;
12. το ταξίδι, οι διακοπές, το καλοκαίρι, ο χειμώνας, η άνοιξη, το φθινόπωρο, ο μήνας, ο καιρός, η ζέστη, το κρύο, βρέχει, ταξιδεύω, κολυμπάω, μεθαύριο, η βαλίτσα, το διαβατήριο, φεύγω, γυρίζω, έτοιμος. En la lección: θα; los doce meses; κάνει ζέστη / κρύο, έχει ήλιο; του χρόνου, την άλλη εβδομάδα.
13. χθες, προχθές, πέρσι, η βόλτα, το πάρτι, το Σαββατοκύριακο, το μουσείο, το εστιατόριο, η εκδρομή, ακούω, αρχίζω, τελειώνω, χάνω, βρίσκω, φτάνω, ήδη, ακόμα, ξαφνικά, τέλεια. En la lección: el aoristo regular e irregular; ήμουν, ήσουν, ήταν…; είχα; πριν από δύο μέρες; την περασμένη εβδομάδα.

## Temporadas 2 a 4 (planeadas, sin escribir)

Semana por semana, con el mismo criterio que la primera: **un tema
gramatical fuerte por semana, nunca dos**, y cada uno apoyado en lo que ya
se vio (el genitivo antes que los pronombres de objeto indirecto, el
imperfecto antes que el contraste con el aoristo, el aoristo pasivo antes
que el participio). La última semana de cada temporada repasa y cierra con
el jefe. Las palabras exactas de cada semana se fijan al escribirla (paso
del `auditorias/PLAN-griego.md`) y se agregan a la lista de «Las palabras de
cada semana»; acá va el campo de léxico.

### Temporada 2 — Το πέλαγος, «mar abierto» (A2 → B1)

| Sem. | Título | Nivel | Gramática | Para qué / léxico |
|---|---|---|---|---|
| 14 | Τον ξέρεις; | A2 | Pronombres débiles de objeto directo (με, σε, τον, την, το, μας, σας, τους, τις, τα), antes del verbo, con *δεν*, *να* y *θα*; *εμένα / εσένα* para resaltar (solo reconocer) | Buscar, encontrar, perder cosas; conocer gente; el celular y los mensajes |
| 15 | Το σπίτι της Μαρίας | A2 | El genitivo singular y plural de los sustantivos regulares y del artículo (του, της, των); la posesión; las fechas (*στις 25 Μαρτίου*), los ordinales 1.º-10.º; *πάνω σε, κάτω από, μέσα σε, πίσω από, μπροστά σε* | La casa por dentro, alquilar y mudarse, la fecha y los cumpleaños |
| 16 | Μου το έδωσε | A2 | El objeto indirecto: genitivo débil (*μου δίνει*) y *σε* + acusativo (*δίνω στη Μαρία*); los dos pronombres juntos (*μου το, σου τα, του το*); números hasta 1000 y los años | Regalos, fiestas, el santo (*η γιορτή*), prestar y devolver |
| 17 | Έλα! Πάρε! | A2 | El imperativo: presente (*γράφε*) y aoristo (*γράψε*), *εσύ* y *εσείς*; los irregulares (*έλα, πάρε, φέρε, πες, δες, φάε, πιες, κάτσε*); el pronombre detrás (*δώσ' το, πες μου*); la prohibición con *μην* + subjuntivo | Recetas y cocina, instrucciones, consejos |
| 18 | Τι σου πονάει; | A2 | Los verbos en -ώ (tipo B2: *μπορώ, οδηγώ, ζω, θεωρώ, τηλεφωνώ*) en presente y aoristo; *πονάει* con genitivo (*με πονάει το κεφάλι*); *πρέπει να* y *καλύτερα να* para aconsejar | El cuerpo, la salud, el médico, la farmacia |
| 19 | Όταν ήμουν παιδί | B1 | El imperfecto: tipo A (*έγραφα*, con el mismo acento corrido del aoristo) y tipo B (*μιλούσα*); *είχα, ήμουν* ya vistos; lo que se hacía seguido; *όταν* | La infancia, la escuela, los recuerdos, el barrio de antes |
| 20 | Έγραφα ή έγραψα; | B1 | Imperfecto contra aoristo: lo que duraba y lo que pasó (*διάβαζα όταν χτύπησε το τηλέφωνο*); *ενώ, καθώς, ξαφνικά, για δύο ώρες / όλη μέρα*; el imperfecto de los -μαι (*ερχόμουν, θυμόμουν*) | Contar una anécdota, un viaje que salió mal, un accidente |
| 21 | Θα γράφω ή θα γράψω; | B1 | El aspecto en el futuro y en *να*: lo que se repite o dura (*θα γράφω κάθε μέρα*) y lo que se hace una vez (*θα σου γράψω αύριο*); el mismo contraste en el imperativo (*γράφε / γράψε*) | Propósitos, estudiar, el gimnasio, organizar la semana |
| 22 | Πιο μεγάλο, το καλύτερο | B1 | Comparativo (*πιο* + adjetivo, -τερος) con *από* + acusativo; superlativo (*ο πιο, ο …-τερος*); irregulares (*καλύτερος, χειρότερος, μεγαλύτερος*); *τόσο … όσο*; adverbios en -α (*καλά, γρήγορα*); *πολύς, πολλή, πολύ* | Comparar ciudades, departamentos, precios y productos; el clima |
| 23 | Ο φίλος που σου είπα | B1 | Las relativas con *που* (sujeto y objeto, con pronombre de retorno: *ο φίλος που τον ξέρεις*); *ό,τι, όποιος, όπου, όταν*; *ο οποίος* (solo reconocer) | Describir personas: el carácter, el aspecto; buscar a alguien |
| 24 | Νομίζω ότι… | B1 | Las completivas: *ότι / πως* (lo que se sabe o se dice), *να* (lo que se quiere), *αν* (la pregunta indirecta), *μήπως*; *επειδή, γιατί, γι' αυτό*; *ελπίζω, πιστεύω, φοβάμαι ότι / να / μήπως* | Opinar, estar de acuerdo, las noticias, la tecnología |
| 25 | Σηκώθηκα αργά | B1 | El aoristo de los verbos en -μαι (*σηκώθηκα, ντύθηκα, κοιμήθηκα, θυμήθηκα, κάθισα, έγινα, χάρηκα*) y su tema con *να / θα* (*να σηκωθώ, θα θυμηθείς*); la pasiva en presente de los carteles (*πωλείται, ενοικιάζεται*: reconocer) | La rutina contada, trámites, anuncios, el servicio técnico |
| 26 | Κάποιος, κανένας, όλοι | B1 | Indefinidos: *κάποιος, κανένας, κάτι, τίποτα, κάπου, πουθενά, όλος, άλλος, ο ίδιος, καθένας*; la doble negación (*δεν ήρθε κανείς*). Repaso de la temporada y **jefe** | Repaso: una semana en Grecia contada de punta a punta |

### Temporada 3 — Τα νησιά, «las islas» (B1 → B2)

| Sem. | Título | Nivel | Gramática | Para qué / léxico |
|---|---|---|---|---|
| 27 | Έχεις πάει ποτέ; | B1 | El perfecto (*έχω* + forma en -ει: *έχω γράψει*) y cuándo se usa (mucho menos que el «he hecho» de España: con *ποτέ, ήδη, ακόμα δεν, μέχρι τώρα*); contraste con el aoristo | Experiencias, viajes, el currículum |
| 28 | Είχα ήδη φύγει | B1 | El pluscuamperfecto (*είχα γράψει*) y el futuro perfecto (*θα έχω τελειώσει*); *αφού, μόλις, πριν (να), μέχρι να*; la secuencia de hechos | Plazos, el trabajo, organizar un viaje |
| 29 | Χτίστηκε το 1834 | B2 | El aoristo pasivo regular (-θηκα, -τηκα, -στηκα, -φτηκα) e irregulares frecuentes (*βρέθηκα, στάλθηκε, δόθηκε*); la pasiva con *από*; el futuro y el *να* pasivos (*θα σταλεί*) | Historia, monumentos, una ciudad por dentro, noticias simples |
| 30 | Κλειστό, χαλασμένο | B2 | El participio en -μένος (*γραμμένος, κλεισμένος, χαλασμένος*) como adjetivo y con *είμαι / έχω*; el gerundio en -οντας / -ώντας (*περπατώντας*) | Averías, reclamos, la casa que se arregla; describir el estado de las cosas |
| 31 | Αν βρέξει… | B2 | Los condicionales: real (*αν* + presente / aoristo de subjuntivo, *θα*), potencial (*αν* + imperfecto, *θα* + imperfecto: *αν είχα χρόνο, θα ερχόμουν*) e irreal del pasado (*αν είχα ξέρει, θα είχα έρθει*) | Decisiones, dinero, planes que dependen de otros |
| 32 | Θα ήθελα να σας ρωτήσω | B2 | *θα* + imperfecto para la cortesía, el deseo y la suposición (*θα ήταν εκεί*); *μακάρι να*, *ας* (*ας πάμε, ας το αφήσουμε*); el registro formal con *εσείς* | El mail formal, pedir algo con cortesía, quejarse sin pelear |
| 33 | Μου είπε ότι θα έρθει | B2 | El discurso indirecto: personas, tiempos y lugares que cambian; preguntas indirectas (*με ρώτησε αν / πού*); órdenes y pedidos con *να* (*μου είπε να περιμένω*) | Pasar mensajes, contar una conversación, el teléfono |
| 34 | Το πρόβλημα του κράτους | B2 | Los sustantivos que se declinan distinto: neutros en -μα (*του προβλήματος*), en -ος (*του μέρους*), femeninos en -η / -εις (*η λύση, οι λύσεις*), masculinos en -ής / -έας (*ο συγγραφέας*); adjetivos en -ής / -ές (*ακριβής*) y -ύς (*βαθύς*) | Sociedad y Estado, la salud pública, temas abstractos |
| 35 | Παρόλο που… | B2 | Conectores de concesión, condición y finalidad: *αν και, παρόλο που, ενώ, εκτός αν, εφόσον, με την προϋπόθεση ότι, για να, ώστε (να), όσο … τόσο* | El medio ambiente, el turismo en las islas, dar argumentos a favor y en contra |
| 36 | Ξανα-, συν-, -τητα | B2 | Formación de palabras: prefijos (*ξανα-, ξε-, συν-, προ-, υπερ-, αντι-*), sufijos (*-τής / -τρια, -ση, -μός, -τητα, -ικός, -σιμος*), diminutivos (*-άκι, -ούλα, -ίτσα*), compuestos (*μακρυμάλλης*) | El trabajo y las profesiones, internet; deducir palabras nuevas |
| 37 | Τη Μαρία την ξέρω | B2 | El orden marcado: el objeto adelante con su pronombre (*το βιβλίο το διάβασα*); *ο εαυτός μου*; *ο ένας τον άλλο*; los pronombres fuertes (*εμένα μου αρέσει*) | Emociones, relaciones, discutir y reconciliarse |
| 38 | Χρόνια πολλά! | B2 | *να* para desear y exclamar (*να 'σαι καλά, να ζήσετε*); los verbos en -ούμαι / -ιέμαι (*θεωρούμαι, εξαρτάται, στενοχωριέμαι*); la elisión de la lengua hablada (*να 'ρθεις, μου 'πε*) | Las fiestas y costumbres (Pascua, el santo, el *πανηγύρι*), las fórmulas de cada ocasión |
| 39 | Ο απολογισμός | B2 | Repaso de la temporada y **jefe**; práctica con el formato B1-B2 del certificado (comprensión de un texto, un mail, un audio) | Repaso: organizar un viaje por las islas, con imprevistos |

### Temporada 4 — Η κορυφή, «la cumbre» (B2 → C1)

| Sem. | Título | Nivel | Gramática | Para qué / léxico |
|---|---|---|---|---|
| 40 | Εν πάση περιπτώσει | B2 | Lo que queda de la *katharévousa*: expresiones fijas (*εν τω μεταξύ, εν πάση περιπτώσει, κατά τη γνώμη μου, εκ των υστέρων, εν λόγω*), el genitivo culto (*της πόλεως, της λέξεως*), las preposiciones cultas (*κατά, διά, υπέρ, προς* + genitivo) | Leer textos formales, entender carteles y documentos |
| 41 | Ο ενδιαφερόμενος | C1 | *ο οποίος / του οποίου* para producir; los participios cultos: activo (*ο υπάρχων, τα ισχύοντα*) y pasivo en -όμενος / -ούμενος (*ο ενδιαφερόμενος*) | La administración, los formularios, la ley explicada |
| 42 | Αφενός… αφετέρου | C1 | Argumentar: *επιπλέον, ωστόσο, εντούτοις, συνεπώς, κατά συνέπεια, αφενός … αφετέρου, όχι μόνο … αλλά και*; la modalidad (*ενδέχεται, είναι πιθανό να, φαίνεται ότι*) | Ensayo de opinión, debate, educación y trabajo |
| 43 | Σύμφωνα με πληροφορίες | C1 | La lengua de la prensa: titulares, nominalización (*η αύξηση των τιμών*), la pasiva impersonal (*λέγεται ότι, φέρεται να, αναμένεται*), las citas | Leer y resumir noticias, economía y política |
| 44 | Αξιότιμε κύριε | C1 | El registro administrativo y profesional: fórmulas de carta y mail, *αίτηση, βεβαίωση, υπεύθυνη δήλωση*, verbos cultos (*παρακαλείσθε, απαιτείται, παρέχεται*) | Trámites, el trabajo formal, reclamos por escrito |
| 45 | Τα έκανα θάλασσα | C1 | Fraseología: expresiones idiomáticas de todos los días (*τα κάνω θάλασσα, βάζω τα δυνατά μου, κόβω κίνηση, μου τη δίνει*), los verbos con *τα / τη* fijo, refranes | Hablar como se habla; reconocer el registro de cada expresión |
| 46 | Μα, δα, άραγε | C1 | Partículas del discurso y modales: *μα, δα, άραγε, μήπως, κιόλας, πια, λοιπόν, βέβαια, που λες, ρε*; la entonación de la pregunta y de la ironía | La conversación espontánea, el humor, la actitud |
| 47 | Ακόμα κι αν… | C1 | Hipótesis y concesión avanzadas (*ακόμα κι αν, έστω κι αν, όπως και να 'χει, οποιοσδήποτε, ό,τι κι αν*); la modalidad sobre el pasado (*θα πρέπει να έφυγε, μπορεί να το είχε ξεχάσει*) | Especular, suponer, matizar una opinión |
| 48 | Ιθάκη | C1 | La lengua literaria: leer a Καβάφης, Σολωμός, Παπαδιαμάντης, Βιζυηνός (todos de dominio público); el politónico para reconocerlo en ediciones viejas | Literatura y cultura; leer un cuento entero con ayuda |
| 49 | Ίντα κάμνεις; | C1 | Las variedades: el griego de Chipre (*έν, ίντα, τζ*), el de Creta, el del norte; el registro juvenil y el *Greeklish* | Entender a quien no habla el griego de Atenas |
| 50 | Με δυο λόγια | C1 | Resumir y mediar: la *περίληψη*, pasar a griego lo que dice un texto en castellano, estilo nominal contra verbal; presentar en público | Exposición oral, informe, reunión de trabajo |
| 51 | Η έκθεση | C1 | La escritura C1: ensayo, carta al director, reseña; cohesión y párrafo (*καταρχάς, εν κατακλείδι*); ortografía avanzada (-ει / -ι en los verbos, -ώ / -ο, dobles consonantes, -ειο / -ιο) | Escribir textos largos, corregirse |
| 52 | Το τελικό διαγώνισμα | C1 | Repaso de todo y **examen final** al estilo del *Πιστοποιητικό Ελληνομάθειας* nivel Γ1: comprensión escrita, producción escrita, comprensión oral, expresión oral | El examen |

## Cómo se escribe una semana (para quien aporta)

- **Todo lo que no es griego va en castellano rioplatense con voseo**:
  «Elegí», «Completá», «Traducí», «Fijate».
- **Griego monotónico correcto**: cada palabra de dos sílabas o más con su
  acento (καλημέρα), sigma final ς, la pregunta con «;», y nunca una letra
  latina dentro de una palabra griega.  `check_semana.py` lo controla.
- **Cómo suena**, entre comillas angulares y con las letras del castellano,
  con la tilde donde va el acento: *καλημέρα* «kaliméra».  Convenciones: γ =
  «g» (suave, la de «lago») o «y» delante de e, i; δ = «d» (suave, la de
  «nada»); θ = «th» (la z de Madrid); χ = «j»; ζ = «z» (con zumbido); β =
  «v»; ου = «u»; αι = «e»; ει, οι, η, υ = «i»; μπ = «b», ντ = «d», γκ = «g»
  al principio («mb», «nd», «ng» adentro).  La pronunciación va escrita en
  las lecciones y notas de las semanas 1 a 4; después, solo para una palabra
  rara.  (La app la muestra sola debajo de las palabras de la semana hasta
  la semana 4: `LANG.rules.sound`.)
- **Nada antes de su teoría**: gramática de esta semana o de una anterior
  (`sillabo.py` mueve el ejercicio si no) y, en lo que el alumno escribe,
  palabras de la lista de arriba o de la lección.  Lo que se lee puede traer
  una palabra nueva con glosa.
- **Nada de memoria**: lo que se pide se deduce de lo que está en pantalla o
  de la lección.
- **Contrastivo**: las notas y los distractores atacan el error del
  hispanohablante (el género del castellano, el artículo que falta delante
  del nombre, el nominativo donde va el acusativo, la tilde olvidada).
- **Tipos de ejercicio** (`base.py`): `ch` opción múltiple, `li` escuchar y
  elegir, `cz` hueco escrito, `tr` traducir al griego, `ty` escribir, `fx`
  encontrá el error, `di` dictado.  Entre 45 y 55 por semana, repartidos en
  las partes de la lección, de reconocer a producir; en las semanas 1 y 2
  pesa más reconocer y copiar con el teclado griego.
- **«Ya puedo…»**: `WEEK["can"] = [(objetivo, [números de ejercicio])]`,
  tres o cuatro por semana.
