/* SWRV dictionary — Hebrew/Greek gap-fill for existing entries.
 * Patches the `originals` field onto dictionary words that already had a
 * plain-English definition but no Hebrew/Greek data yet. Loaded after all
 * other dictionary-*.js files so window.ENGLISH_BIBLE_DICT is fully built. */
window.SWRV_ORIGINALS_FILL = {
  "aaron": [
    {lang: "Hebrew", word: "אַהֲרֹן", translit: "aharon", strongs: "H175", note: "Aaron; Moses's brother, Israel's first high priest"}
  ],
  "abel": [
    {lang: "Hebrew", word: "הֶבֶל", translit: "hevel", strongs: "H1893", note: "Abel; Adam and Eve's second son, slain by Cain"},
    {lang: "Greek", word: "Ἅβελ", translit: "habel", strongs: "G6", note: "Abel; NT references to the Genesis figure"}
  ],
  "abomination": [
    {lang: "Hebrew", word: "תּוֹעֵבָה", translit: "to'evah", strongs: "H8441", note: "abomination; something detestable, ritually abhorrent"},
    {lang: "Greek", word: "βδέλυγμα", translit: "bdelygma", strongs: "G946", note: "abomination; detestable thing, especially idolatry"}
  ],
  "abraham": [
    {lang: "Hebrew", word: "אַבְרָהָם", translit: "avraham", strongs: "H85", note: "Abraham; father of the Hebrew nation, father of faith"},
    {lang: "Greek", word: "Ἀβραάμ", translit: "abraam", strongs: "G11", note: "Abraham; NT form of the patriarch's name"}
  ],
  "admonition": [
    {lang: "Greek", word: "νουθεσία", translit: "nouthesia", strongs: "G3559", note: "admonition; warning instruction, putting in mind"}
  ],
  "adoration": [
    {lang: "Hebrew", word: "הִשְׁתַּחֲוָה", translit: "hishtachavah", strongs: "H7812", note: "adoration; to bow down, prostrate in worship"},
    {lang: "Greek", word: "προσκυνέω", translit: "proskyneo", strongs: "G4352", note: "adoration; to worship, do homage by prostrating"}
  ],
  "advocate": [
    {lang: "Greek", word: "παράκλητος", translit: "parakletos", strongs: "G3875", note: "advocate; one who pleads another's case, intercessor"}
  ],
  "affliction": [
    {lang: "Hebrew", word: "עֳנִי", translit: "oni", strongs: "H6040", note: "affliction; misery, poverty, distress"},
    {lang: "Greek", word: "θλῖψις", translit: "thlipsis", strongs: "G2347", note: "affliction; pressure, tribulation, distress"}
  ],
  "amalekite": [
    {lang: "Hebrew", word: "עֲמָלֵקִי", translit: "amaleqi", strongs: "H6003", note: "Amalekite; member of the nomadic tribe descended from Amalek"}
  ],
  "anoint": [
    {lang: "Hebrew", word: "מָשַׁח", translit: "mashach", strongs: "H4886", note: "anoint; to smear with oil, consecrate"},
    {lang: "Greek", word: "χρίω", translit: "chrio", strongs: "G5548", note: "anoint; to consecrate to an office or service"}
  ],
  "antichrist": [
    {lang: "Greek", word: "ἀντίχριστος", translit: "antichristos", strongs: "G500", note: "antichrist; one who opposes or counterfeits Christ"}
  ],
  "apocalypse": [
    {lang: "Greek", word: "ἀποκάλυψις", translit: "apokalypsis", strongs: "G602", note: "apocalypse; unveiling, revelation"}
  ],
  "apostasy": [
    {lang: "Greek", word: "ἀποστασία", translit: "apostasia", strongs: "G646", note: "apostasy; a falling away, defection from the faith"}
  ],
  "ark": [
    {lang: "Hebrew", word: "אֲרוֹן", translit: "aron", strongs: "H727", note: "ark; chest, box, as in the Ark of the Covenant (Noah's ark uses a different word, tevah)"},
    {lang: "Greek", word: "κιβωτός", translit: "kibotos", strongs: "G2787", note: "ark; wooden chest or box, used for both Noah's ark and the covenant ark"}
  ],
  "armageddon": [
    {lang: "Greek", word: "Ἁρμαγεδών", translit: "harmagedon", strongs: "G717", note: "Armageddon; site of the final end-times battle"}
  ],
  "arrogance": [
    {lang: "Hebrew", word: "גָּאוֹן", translit: "ga'on", strongs: "H1347", note: "arrogance; pride, majesty, exaltation"},
    {lang: "Greek", word: "ὑπερηφανία", translit: "hyperephania", strongs: "G5243", note: "arrogance; pride, haughtiness"}
  ],
  "art": [
    {lang: "Hebrew", word: "הָיָה", translit: "hayah", strongs: "H1961", note: "archaic 'thou art' = you are; root verb 'to be'"},
    {lang: "Greek", word: "εἰμί", translit: "eimi", strongs: "G1510", note: "archaic 'thou art' = you are; root verb 'to be'"}
  ],
  "ascension": [
    {lang: "Greek", word: "ἀνάλημψις", translit: "analempsis", strongs: "G354", note: "ascension; being taken up, referring to Christ's return to heaven"}
  ],
  "ash": [
    {lang: "Hebrew", word: "אֵפֶר", translit: "epher", strongs: "H665", note: "ash; ashes, dust, symbol of mourning or humility"}
  ],
  "assurance": [
    {lang: "Hebrew", word: "בֶּטַח", translit: "betach", strongs: "H983", note: "assurance; safety, security, confidence"},
    {lang: "Greek", word: "πληροφορία", translit: "plerophoria", strongs: "G4136", note: "assurance; full conviction, complete confidence"}
  ],
  "assyria": [
    {lang: "Hebrew", word: "אַשּׁוּר", translit: "ashshur", strongs: "H804", note: "Assyria; ancient Mesopotamian empire"}
  ],
  "assyrian": [
    {lang: "Hebrew", word: "אַשּׁוּר", translit: "ashshur", strongs: "H804", note: "Assyrian; used adjectivally/gentilically of Assyria's people"}
  ],
  "atonement": [
    {lang: "Hebrew", word: "כַּפָּרָה", translit: "kapparah", strongs: "H3722", note: "atonement; covering, reconciliation"},
    {lang: "Greek", word: "ἱλασμός", translit: "hilasmos", strongs: "G2434", note: "atonement; propitiation, expiation"}
  ],
  "atoning sacrifice": [
    {lang: "Hebrew", word: "כַּפֹּרֶת", translit: "kapporet", strongs: "H3727", note: "atoning sacrifice; the mercy seat, atonement cover on the ark"},
    {lang: "Greek", word: "ἱλαστήριον", translit: "hilasterion", strongs: "G2435", note: "atoning sacrifice; propitiatory offering, mercy seat"}
  ],
  "aught": [
    {lang: "Hebrew", word: "מְאוּמָה", translit: "me'umah", strongs: "H3972", note: "aught; anything, something"},
    {lang: "Greek", word: "τὶ", translit: "ti", strongs: "G5100", note: "aught; anything, some indefinite thing"}
  ],
  "awe": [
    {lang: "Hebrew", word: "רָגַז", translit: "ragaz", strongs: "H7264", note: "awe; to tremble, quake, stand in awe"}
  ],
  "babylon": [
    {lang: "Hebrew", word: "בָּבֶל", translit: "bavel", strongs: "H894", note: "Babylon; ancient Mesopotamian city and empire"},
    {lang: "Greek", word: "Βαβυλών", translit: "babylon", strongs: "G897", note: "Babylon; used literally and symbolically in the NT"}
  ],
  "babylonian": [
    {lang: "Hebrew", word: "כַּשְׂדִּי", translit: "kasdi", strongs: "H3778", note: "Babylonian; Chaldean, person from Babylonia"}
  ],
  "baptism": [
    {lang: "Greek", word: "βάπτισμα", translit: "baptisma", strongs: "G908", note: "baptism; the rite of immersion"}
  ],
  "baptized": [
    {lang: "Greek", word: "βαπτίζω", translit: "baptizo", strongs: "G907", note: "baptized; to immerse, same root as baptism"}
  ],
  "beareth": [
    {lang: "Hebrew", word: "יָלַד", translit: "yalad", strongs: "H3205", note: "beareth; archaic 'bears', to bear/bring forth (root: bear)"},
    {lang: "Greek", word: "φέρω", translit: "phero", strongs: "G5342", note: "beareth; archaic 'bears', to carry or bring forth fruit (root: bear)"}
  ],
  "behold": [
    {lang: "Hebrew", word: "הִנֵּה", translit: "hinneh", strongs: "H2009", note: "behold; look, see, attention-getting interjection"},
    {lang: "Greek", word: "ἰδού", translit: "idou", strongs: "G2400", note: "behold; look, see, attention-getting interjection"}
  ],
  "believe": [
    {lang: "Hebrew", word: "אָמַן", translit: "aman", strongs: "H539", note: "believe; to trust, confirm, be faithful (root of 'amen')"},
    {lang: "Greek", word: "πιστεύω", translit: "pisteuo", strongs: "G4100", note: "believe; to have faith in, trust"}
  ],
  "believeth": [
    {lang: "Hebrew", word: "אָמַן", translit: "aman", strongs: "H539", note: "believeth; archaic 'believes' (root: believe)"},
    {lang: "Greek", word: "πιστεύω", translit: "pisteuo", strongs: "G4100", note: "believeth; archaic 'believes' (root: believe)"}
  ],
  "benevolence": [
    {lang: "Greek", word: "εὔνοια", translit: "eunoia", strongs: "G2133", note: "benevolence; goodwill, kindness owed in marriage"}
  ],
  "benjamin": [
    {lang: "Hebrew", word: "בִּנְיָמִין", translit: "binyamin", strongs: "H1144", note: "Benjamin; Jacob's youngest son, tribal ancestor"},
    {lang: "Greek", word: "Βενιαμίν", translit: "beniamin", strongs: "G958", note: "Benjamin; NT reference to the patriarch/tribe"}
  ],
  "bethlehem": [
    {lang: "Hebrew", word: "בֵּית לֶחֶם", translit: "beit lechem", strongs: "H1035", note: "Bethlehem; town of David's and Jesus's birth, 'house of bread'"},
    {lang: "Greek", word: "Βηθλεέμ", translit: "bethleem", strongs: "G965", note: "Bethlehem; NT form of the town's name"}
  ],
  "betwixt": [
    {lang: "Hebrew", word: "בֵּין", translit: "bein", strongs: "H996", note: "betwixt; archaic 'between'"},
    {lang: "Greek", word: "μεταξύ", translit: "metaxy", strongs: "G3342", note: "betwixt; archaic 'between'"}
  ],
  "bindeth": [
    {lang: "Hebrew", word: "אָסַר", translit: "asar", strongs: "H631", note: "bindeth; archaic 'binds', to tie or bind (root: bind)"},
    {lang: "Greek", word: "δέω", translit: "deo", strongs: "G1210", note: "bindeth; archaic 'binds' (root: bind)"}
  ],
  "blasphemy": [
    {lang: "Hebrew", word: "נְאָצָה", translit: "ne'atsah", strongs: "H5007", note: "blasphemy; contempt, reviling"},
    {lang: "Greek", word: "βλασφημία", translit: "blasphemia", strongs: "G988", note: "blasphemy; slander, irreverent speech against God"}
  ],
  "bless": [
    {lang: "Hebrew", word: "בָּרַךְ", translit: "barak", strongs: "H1288", note: "bless; to kneel, praise, invoke favor upon"},
    {lang: "Greek", word: "εὐλογέω", translit: "eulogeo", strongs: "G2127", note: "bless; to speak well of, invoke blessing"}
  ],
  "blood": [
    {lang: "Hebrew", word: "דָּם", translit: "dam", strongs: "H1818", note: "blood; life-blood, bloodshed"},
    {lang: "Greek", word: "αἷμα", translit: "haima", strongs: "G129", note: "blood; literal blood, also of Christ's sacrifice"}
  ],
  "bone": [
    {lang: "Hebrew", word: "עֶצֶם", translit: "etsem", strongs: "H6106", note: "bone; skeletal bone, also 'substance, self'"},
    {lang: "Greek", word: "ὀστέον", translit: "osteon", strongs: "G3747", note: "bone; skeletal bone"}
  ],
  "born again": [
    {lang: "Greek", word: "γεννάω ἄνωθεν", translit: "gennao anothen", strongs: "G1080", note: "born again; begotten from above/anew (John 3:3)"}
  ],
  "bread": [
    {lang: "Hebrew", word: "לֶחֶם", translit: "lechem", strongs: "H3899", note: "bread; food, loaf, staple grain food"},
    {lang: "Greek", word: "ἄρτος", translit: "artos", strongs: "G740", note: "bread; loaf, also symbolic of Christ"}
  ],
  "breaketh": [
    {lang: "Hebrew", word: "שָׁבַר", translit: "shavar", strongs: "H7665", note: "breaketh; archaic 'breaks', to break in pieces (root: break)"},
    {lang: "Greek", word: "κλάω", translit: "klao", strongs: "G2806", note: "breaketh; archaic 'breaks', used of breaking bread (root: break)"}
  ],
  "cain": [
    {lang: "Hebrew", word: "קַיִן", translit: "qayin", strongs: "H7014", note: "Cain; Adam and Eve's firstborn, killer of Abel"},
    {lang: "Greek", word: "Κάϊν", translit: "kain", strongs: "G2535", note: "Cain; NT references to the Genesis figure"}
  ],
  "calleth": [
    {lang: "Hebrew", word: "קָרָא", translit: "qara", strongs: "H7121", note: "calleth; archaic 'calls', to call out, summon, name (root: call)"},
    {lang: "Greek", word: "καλέω", translit: "kaleo", strongs: "G2564", note: "calleth; archaic 'calls' (root: call)"}
  ],
  "canaan": [
    {lang: "Hebrew", word: "כְּנַעַן", translit: "kena'an", strongs: "H3667", note: "Canaan; the promised land, also Noah's grandson"},
    {lang: "Greek", word: "Χαναάν", translit: "chanaan", strongs: "G5477", note: "Canaan; NT form of the land's name"}
  ],
  "canaanite": [
    {lang: "Hebrew", word: "כְּנַעֲנִי", translit: "kena'ani", strongs: "H3669", note: "Canaanite; native inhabitant of Canaan"},
    {lang: "Greek", word: "Χαναναῖος", translit: "chananaios", strongs: "G5478", note: "Canaanite; NT gentilic form"}
  ],
  "casteth": [
    {lang: "Hebrew", word: "שָׁלַךְ", translit: "shalak", strongs: "H7993", note: "casteth; archaic 'casts', to throw, fling (root: cast)"},
    {lang: "Greek", word: "βάλλω", translit: "ballo", strongs: "G906", note: "casteth; archaic 'casts' (root: cast)"}
  ],
  "centurion": [
    {lang: "Greek", word: "ἑκατοντάρχης", translit: "hekatontarches", strongs: "G1543", note: "centurion; Roman officer commanding about 100 soldiers"}
  ],
  "charity": [
    {lang: "Greek", word: "ἀγάπη", translit: "agape", strongs: "G26", note: "charity; selfless love, KJV rendering of agape love"}
  ],
  "chastisement": [
    {lang: "Hebrew", word: "מוּסָר", translit: "musar", strongs: "H4148", note: "chastisement; discipline, correction, instruction"},
    {lang: "Greek", word: "παιδεία", translit: "paideia", strongs: "G3809", note: "chastisement; child-training, discipline"}
  ],
  "christ": [
    {lang: "Hebrew", word: "מָשִׁיחַ", translit: "mashiach", strongs: "H4899", note: "Christ; Hebrew equivalent 'Messiah', anointed one"},
    {lang: "Greek", word: "Χριστός", translit: "christos", strongs: "G5547", note: "Christ; the Anointed One, title of Jesus"}
  ],
  "circumciser": [
    {lang: "Hebrew", word: "מוּל", translit: "mul", strongs: "H4135", note: "circumciser; one who circumcises (root verb: circumcise)"},
    {lang: "Greek", word: "περιτέμνω", translit: "peritemno", strongs: "G4059", note: "circumciser; one who circumcises (root verb: circumcise)"}
  ],
  "circumcision": [
    {lang: "Hebrew", word: "מוּל", translit: "mul", strongs: "H4135", note: "circumcision; the covenant rite of cutting the foreskin"},
    {lang: "Greek", word: "περιτομή", translit: "peritome", strongs: "G4061", note: "circumcision; the rite, also used of Jewish believers"}
  ],
  "clean": [
    {lang: "Hebrew", word: "טָהוֹר", translit: "tahor", strongs: "H2889", note: "clean; ritually pure, undefiled"},
    {lang: "Greek", word: "καθαρός", translit: "katharos", strongs: "G2513", note: "clean; pure, unstained"}
  ],
  "cleansing": [
    {lang: "Hebrew", word: "טָהֳרָה", translit: "toharah", strongs: "H2893", note: "cleansing; ritual purification"},
    {lang: "Greek", word: "καθαρισμός", translit: "katharismos", strongs: "G2512", note: "cleansing; purification"}
  ],
  "cometh": [
    {lang: "Hebrew", word: "בּוֹא", translit: "bo", strongs: "H935", note: "cometh; archaic 'comes', to come, go, enter (root: come)"},
    {lang: "Greek", word: "ἔρχομαι", translit: "erchomai", strongs: "G2064", note: "cometh; archaic 'comes' (root: come)"}
  ],
  "comfort": [
    {lang: "Hebrew", word: "נָחַם", translit: "nacham", strongs: "H5162", note: "comfort; to console, be sorry, be relieved"},
    {lang: "Greek", word: "παράκλησις", translit: "paraklesis", strongs: "G3874", note: "comfort; consolation, encouragement"}
  ],
  "comforter": [
    {lang: "Hebrew", word: "מְנַחֵם", translit: "menachem", strongs: "H5162", note: "comforter; one who consoles (same root as comfort)"},
    {lang: "Greek", word: "παράκλητος", translit: "parakletos", strongs: "G3875", note: "Comforter; title of the Holy Spirit, one who comes alongside"}
  ],
  "compassion": [
    {lang: "Hebrew", word: "רַחֲמִים", translit: "rachamim", strongs: "H7356", note: "compassion; tender mercies, deep love"},
    {lang: "Greek", word: "σπλαγχνίζομαι", translit: "splanchnizomai", strongs: "G4697", note: "compassion; to be moved in one's inmost being"}
  ],
  "confess": [
    {lang: "Hebrew", word: "יָדָה", translit: "yadah", strongs: "H3034", note: "confess; to acknowledge, give thanks, praise"},
    {lang: "Greek", word: "ὁμολογέω", translit: "homologeo", strongs: "G3670", note: "confess; to acknowledge, agree, declare openly"}
  ],
  "confusion": [
    {lang: "Hebrew", word: "כְּלִמָּה", translit: "kelimmah", strongs: "H3639", note: "confusion; shame, disgrace, humiliation"},
    {lang: "Greek", word: "ἀκαταστασία", translit: "akatastasia", strongs: "G181", note: "confusion; disorder, instability, tumult"}
  ],
  "consecrate": [
    {lang: "Hebrew", word: "קָדַשׁ", translit: "qadash", strongs: "H6942", note: "consecrate; to set apart as holy, sanctify"},
    {lang: "Greek", word: "τελειόω", translit: "teleioo", strongs: "G5048", note: "consecrate; to make perfect, complete, ordain"}
  ],
  "consolation": [
    {lang: "Hebrew", word: "תַּנְחוּמִים", translit: "tanchumim", strongs: "H8575", note: "consolation; comforts, condolences"},
    {lang: "Greek", word: "παράκλησις", translit: "paraklesis", strongs: "G3874", note: "consolation; comfort, encouragement"}
  ],
  "contempt": [
    {lang: "Hebrew", word: "דְּרָאוֹן", translit: "dera'on", strongs: "H1860", note: "contempt; abhorrence, disgrace"}
  ],
  "contentment": [
    {lang: "Greek", word: "αὐτάρκεια", translit: "autarkeia", strongs: "G841", note: "contentment; self-sufficiency, satisfaction with what one has"}
  ],
  "conviction": [
    {lang: "Hebrew", word: "יָכַח", translit: "yakach", strongs: "H3198", note: "conviction; to reprove, decide, convince"},
    {lang: "Greek", word: "ἐλέγχω", translit: "elegcho", strongs: "G1651", note: "conviction; to reprove, expose, convict of wrong"}
  ],
  "corruption": [
    {lang: "Hebrew", word: "שַׁחַת", translit: "shachat", strongs: "H7845", note: "corruption; pit, ruin, decay"},
    {lang: "Greek", word: "φθορά", translit: "phthora", strongs: "G5356", note: "corruption; decay, moral or physical ruin"}
  ],
  "couldst": [
    {lang: "Hebrew", word: "יָכֹל", translit: "yakol", strongs: "H3201", note: "couldst; archaic 'could', to be able (root: could/can)"},
    {lang: "Greek", word: "δύναμαι", translit: "dynamai", strongs: "G1410", note: "couldst; archaic 'could', to be able (root: could/can)"}
  ],
  "counsel": [
    {lang: "Hebrew", word: "עֵצָה", translit: "etsah", strongs: "H6098", note: "counsel; advice, plan, purpose"},
    {lang: "Greek", word: "βουλή", translit: "boule", strongs: "G1012", note: "counsel; will, purpose, plan"}
  ],
  "counselor": [
    {lang: "Hebrew", word: "יוֹעֵץ", translit: "yo'ets", strongs: "H3289", note: "counselor; adviser, one who gives counsel"},
    {lang: "Greek", word: "σύμβουλος", translit: "symboulos", strongs: "G4825", note: "counselor; adviser"}
  ],
  "covetousness": [
    {lang: "Hebrew", word: "בֶּצַע", translit: "betsa", strongs: "H1215", note: "covetousness; unjust gain, greed"},
    {lang: "Greek", word: "πλεονεξία", translit: "pleonexia", strongs: "G4124", note: "covetousness; greed, desire for more"}
  ],
  "cross": [
    {lang: "Greek", word: "σταυρός", translit: "stauros", strongs: "G4716", note: "cross; upright stake or cross for execution"}
  ],
  "crown": [
    {lang: "Hebrew", word: "עֲטָרָה", translit: "atarah", strongs: "H5850", note: "crown; wreath, royal or honorary headpiece"},
    {lang: "Greek", word: "στέφανος", translit: "stephanos", strongs: "G4735", note: "crown; victor's wreath, symbol of honor or reward"}
  ],
  "crucible": [
    {lang: "Hebrew", word: "מַצְרֵף", translit: "matsref", strongs: "H4715", note: "crucible; refining pot for testing metals"}
  ],
  "crucified": [
    {lang: "Greek", word: "σταυρόω", translit: "stauroo", strongs: "G4717", note: "crucified; put to death on a cross (root: crucify)"}
  ],
  "crucifixion": [
    {lang: "Greek", word: "σταυρόω", translit: "stauroo", strongs: "G4717", note: "crucifixion; the act of crucifying (root: crucify)"}
  ],
  "crucify": [
    {lang: "Greek", word: "σταυρόω", translit: "stauroo", strongs: "G4717", note: "crucify; to put to death by nailing to a cross"}
  ],
  "curse": [
    {lang: "Hebrew", word: "קְלָלָה", translit: "qelalah", strongs: "H7045", note: "a curse; invoked harm or judgment, opposite of blessing"},
    {lang: "Greek", word: "κατάρα", translit: "katara", strongs: "G2671", note: "a curse; condemnation or invoked judgment"}
  ],
  "daniel": [
    {lang: "Hebrew", word: "דָּנִיֵּאל", translit: "daniyyel", strongs: "H1840", note: "Daniel; prophet during Babylonian captivity, known for interpreting dreams"},
    {lang: "Greek", word: "Δανιήλ", translit: "Daniel", strongs: "G1158", note: "Daniel; referenced by Jesus in the Olivet Discourse"}
  ],
  "darkness": [
    {lang: "Hebrew", word: "חֹשֶׁךְ", translit: "choshek", strongs: "H2822", note: "darkness; physical absence of light, also moral/spiritual darkness"},
    {lang: "Greek", word: "σκότος", translit: "skotos", strongs: "G4655", note: "darkness; used literally and as a symbol of sin or ignorance"}
  ],
  "david": [
    {lang: "Hebrew", word: "דָּוִד", translit: "david", strongs: "H1732", note: "David; Israel's second king, ancestor of the Messiah"},
    {lang: "Greek", word: "Δαυίδ", translit: "David", strongs: "G1138", note: "David; named repeatedly in Jesus' genealogy and messianic titles"}
  ],
  "day of judgment": [
    {lang: "Greek", word: "ἡμέρα κρίσεως", translit: "hemera kriseos", strongs: "G2250 G2920", note: "the day of judgment; future day of divine reckoning"}
  ],
  "dead sea": [
    {lang: "Hebrew", word: "יָם הַמֶּלַח", translit: "yam hammelach", strongs: "H3220 H4417", note: "the Salt Sea; the OT name for the Dead Sea"}
  ],
  "deceit": [
    {lang: "Hebrew", word: "מִרְמָה", translit: "mirmah", strongs: "H4820", note: "deceit; treachery or fraudulent dealing"},
    {lang: "Greek", word: "δόλος", translit: "dolos", strongs: "G1388", note: "deceit; guile or cunning trickery"}
  ],
  "deception": [
    {lang: "Hebrew", word: "כַּחַשׁ", translit: "kachash", strongs: "H3585", note: "deception; lying or feigned dealing"},
    {lang: "Greek", word: "πλάνη", translit: "plane", strongs: "G4106", note: "deception; a leading astray from truth"}
  ],
  "decree": [
    {lang: "Hebrew", word: "חֹק", translit: "choq", strongs: "H2706", note: "a decree or statute; something prescribed by authority"},
    {lang: "Greek", word: "δόγμα", translit: "dogma", strongs: "G1378", note: "a decree; official ordinance, as of a ruler"}
  ],
  "defilement": [
    {lang: "Hebrew", word: "טֻמְאָה", translit: "tumah", strongs: "H2932", note: "defilement; ritual or moral uncleanness"},
    {lang: "Greek", word: "μιασμός", translit: "miasmos", strongs: "G3394", note: "defilement; moral pollution or corruption"}
  ],
  "delusion": [
    {lang: "Greek", word: "πλάνη", translit: "plane", strongs: "G4106", note: "delusion; a deluding influence that leads astray"}
  ],
  "departeth": [
    {lang: "Hebrew", word: "סוּר", translit: "sur", strongs: "H5493", note: "to turn aside or depart; base root behind the archaic form 'departeth'"},
    {lang: "Greek", word: "ἀναχωρέω", translit: "anachoreo", strongs: "G402", note: "to withdraw or depart; base root behind the archaic form 'departeth'"}
  ],
  "depravity": [
    {lang: "Hebrew", word: "שָׁחַת", translit: "shachat", strongs: "H7843", note: "to corrupt or spoil; root behind moral depravity"},
    {lang: "Greek", word: "ἀδόκιμος", translit: "adokimos", strongs: "G96", note: "depraved or disqualified; a mind rejected as unfit"}
  ],
  "desecrate": [
    {lang: "Hebrew", word: "חָלַל", translit: "chalal", strongs: "H2490", note: "to profane or desecrate; treat as common what is holy"},
    {lang: "Greek", word: "βεβηλόω", translit: "bebeloo", strongs: "G953", note: "to profane; violate the sanctity of something sacred"}
  ],
  "desert": [
    {lang: "Hebrew", word: "מִדְבָּר", translit: "midbar", strongs: "H4057", note: "wilderness or desert; uninhabited pastureland"},
    {lang: "Greek", word: "ἔρημος", translit: "eremos", strongs: "G2048", note: "desert or wilderness; a deserted place"}
  ],
  "devotion": [
    {lang: "Greek", word: "προσκαρτερέω", translit: "proskartereo", strongs: "G4342", note: "to devote oneself steadfastly, as the early church did to teaching and prayer"}
  ],
  "didst": [
    {lang: "Hebrew", word: "עָשָׂה", translit: "asah", strongs: "H6213", note: "to do or make; base root behind the archaic form 'didst'"},
    {lang: "Greek", word: "ποιέω", translit: "poieo", strongs: "G4160", note: "to do or make; base root behind the archaic form 'didst'"}
  ],
  "discernment": [
    {lang: "Hebrew", word: "בִּינָה", translit: "binah", strongs: "H998", note: "understanding or discernment; insight into truth"},
    {lang: "Greek", word: "διάκρισις", translit: "diakrisis", strongs: "G1253", note: "discernment; the ability to distinguish good from evil"}
  ],
  "disciple": [
    {lang: "Hebrew", word: "תַּלְמִיד", translit: "talmid", strongs: "H8527", note: "a pupil or disciple; one taught by a master"},
    {lang: "Greek", word: "μαθητής", translit: "mathetes", strongs: "G3101", note: "a disciple; a learner or follower of a teacher"}
  ],
  "discipline": [
    {lang: "Hebrew", word: "מוּסָר", translit: "musar", strongs: "H4148", note: "discipline or instruction; corrective training"},
    {lang: "Greek", word: "παιδεία", translit: "paideia", strongs: "G3809", note: "discipline; training and correction, often through hardship"}
  ],
  "disgrace": [
    {lang: "Hebrew", word: "חֶרְפָּה", translit: "cherpah", strongs: "H2781", note: "reproach or disgrace; public shame"},
    {lang: "Greek", word: "αἰσχύνη", translit: "aischyne", strongs: "G152", note: "shame or disgrace; dishonor"}
  ],
  "dost": [
    {lang: "Hebrew", word: "עָשָׂה", translit: "asah", strongs: "H6213", note: "to do or make; base root behind the archaic form 'dost'"},
    {lang: "Greek", word: "ποιέω", translit: "poieo", strongs: "G4160", note: "to do or make; base root behind the archaic form 'dost'"}
  ],
  "doth": [
    {lang: "Hebrew", word: "עָשָׂה", translit: "asah", strongs: "H6213", note: "to do or make; base root behind the archaic form 'doth'"},
    {lang: "Greek", word: "ποιέω", translit: "poieo", strongs: "G4160", note: "to do or make; base root behind the archaic form 'doth'"}
  ],
  "dove": [
    {lang: "Hebrew", word: "יוֹנָה", translit: "yonah", strongs: "H3123", note: "dove; bird used in sacrifice and as a symbol of peace"},
    {lang: "Greek", word: "περιστερά", translit: "peristera", strongs: "G4058", note: "dove; the form the Spirit took descending on Jesus"}
  ],
  "dust": [
    {lang: "Hebrew", word: "עָפָר", translit: "aphar", strongs: "H6083", note: "dust or dry earth; material of human origin and mortality"},
    {lang: "Greek", word: "χοῦς", translit: "chous", strongs: "G5522", note: "dust; loose earth, as shaken off the feet"}
  ],
  "dwelleth": [
    {lang: "Hebrew", word: "יָשַׁב", translit: "yashab", strongs: "H3427", note: "to sit or dwell; base root behind the archaic form 'dwelleth'"},
    {lang: "Greek", word: "κατοικέω", translit: "katoikeo", strongs: "G2730", note: "to dwell or inhabit; base root behind the archaic form 'dwelleth'"}
  ],
  "eagle": [
    {lang: "Hebrew", word: "נֶשֶׁר", translit: "nesher", strongs: "H5404", note: "eagle; symbol of strength and swiftness"},
    {lang: "Greek", word: "ἀετός", translit: "aetos", strongs: "G105", note: "eagle; associated with judgment imagery in Revelation"}
  ],
  "edomite": [
    {lang: "Hebrew", word: "אֱדוֹמִי", translit: "edomi", strongs: "H130", note: "an Edomite; descendant of Esau"}
  ],
  "egypt": [
    {lang: "Hebrew", word: "מִצְרַיִם", translit: "mitsrayim", strongs: "H4714", note: "Egypt; nation of Israel's bondage and exodus"},
    {lang: "Greek", word: "Αἴγυπτος", translit: "Aigyptos", strongs: "G125", note: "Egypt; land where the holy family took refuge"}
  ],
  "egyptian": [
    {lang: "Hebrew", word: "מִצְרִי", translit: "mitsri", strongs: "H4713", note: "an Egyptian; native of Egypt"},
    {lang: "Greek", word: "Αἰγύπτιος", translit: "Aigyptios", strongs: "G124", note: "an Egyptian; native of Egypt"}
  ],
  "elder": [
    {lang: "Hebrew", word: "זָקֵן", translit: "zaqen", strongs: "H2205", note: "elder; older man or tribal/community leader"},
    {lang: "Greek", word: "πρεσβύτερος", translit: "presbyteros", strongs: "G4245", note: "elder; church or community leader"}
  ],
  "elijah": [
    {lang: "Hebrew", word: "אֵלִיָּהוּ", translit: "eliyyahu", strongs: "H452", note: "Elijah; prophet who confronted Baal worship"},
    {lang: "Greek", word: "Ἠλίας", translit: "Elias", strongs: "G2243", note: "Elijah; appears with Moses at the Transfiguration"}
  ],
  "elisha": [
    {lang: "Hebrew", word: "אֱלִישָׁע", translit: "elisha", strongs: "H477", note: "Elisha; prophet and successor of Elijah"},
    {lang: "Greek", word: "Ἐλισαῖος", translit: "Elisaios", strongs: "G1666", note: "Elisha; referenced by Jesus in Luke's Gospel"}
  ],
  "encouragement": [
    {lang: "Hebrew", word: "חָזַק", translit: "chazaq", strongs: "H2388", note: "to strengthen or encourage; root behind acts of encouragement"},
    {lang: "Greek", word: "παράκλησις", translit: "paraklesis", strongs: "G3874", note: "encouragement or comfort; strengthening exhortation"}
  ],
  "endurance": [
    {lang: "Greek", word: "ὑπομονή", translit: "hypomone", strongs: "G5281", note: "endurance; steadfast patience under trial"}
  ],
  "endureth": [
    {lang: "Hebrew", word: "עָמַד", translit: "amad", strongs: "H5975", note: "to stand or endure; base root behind the archaic form 'endureth'"},
    {lang: "Greek", word: "ὑπομένω", translit: "hypomeno", strongs: "G5278", note: "to remain or endure; base root behind the archaic form 'endureth'"}
  ],
  "entereth": [
    {lang: "Hebrew", word: "בּוֹא", translit: "bo", strongs: "H935", note: "to come or enter; base root behind the archaic form 'entereth'"},
    {lang: "Greek", word: "εἰσέρχομαι", translit: "eiserchomai", strongs: "G1525", note: "to enter or come in; base root behind the archaic form 'entereth'"}
  ],
  "envy": [
    {lang: "Hebrew", word: "קִנְאָה", translit: "qinah", strongs: "H7068", note: "envy or jealousy; also used positively of zeal"},
    {lang: "Greek", word: "φθόνος", translit: "phthonos", strongs: "G5355", note: "envy; resentment at another's advantage"}
  ],
  "ere": [
    {lang: "Hebrew", word: "טֶרֶם", translit: "terem", strongs: "H2962", note: "before or not yet; base root behind the archaic word 'ere'"},
    {lang: "Greek", word: "πρίν", translit: "prin", strongs: "G4250", note: "before; base root behind the archaic word 'ere'"}
  ],
  "error": [
    {lang: "Hebrew", word: "שְׁגָגָה", translit: "shegagah", strongs: "H7684", note: "error; an unintentional wrong or mistake"},
    {lang: "Greek", word: "πλάνη", translit: "plane", strongs: "G4106", note: "error; a wandering from the truth"}
  ],
  "eternal death": [
    {lang: "Greek", word: "ὁ θάνατος ὁ δεύτερος", translit: "ho thanatos ho deuteros", strongs: "G2288 G1208", note: "the second death; final, eternal separation from God"}
  ],
  "eternal life": [
    {lang: "Hebrew", word: "חַיֵּי עוֹלָם", translit: "chayei olam", strongs: "H2416 H5769", note: "everlasting life; resurrection life promised to the righteous"},
    {lang: "Greek", word: "ζωὴ αἰώνιος", translit: "zoe aionios", strongs: "G2222 G166", note: "eternal life; everlasting existence in God's presence"}
  ],
  "evident": [
    {lang: "Greek", word: "φανερός", translit: "phaneros", strongs: "G5318", note: "evident or manifest; clearly visible"}
  ],
  "exhortation": [
    {lang: "Greek", word: "παράκλησις", translit: "paraklesis", strongs: "G3874", note: "exhortation; urging or encouraging appeal"}
  ],
  "ezekiel": [
    {lang: "Hebrew", word: "יְחֶזְקֵאל", translit: "yechezqel", strongs: "H3168", note: "Ezekiel; priest and prophet during the Babylonian exile"}
  ],
  "faithfulness": [
    {lang: "Hebrew", word: "אֱמוּנָה", translit: "emunah", strongs: "H530", note: "faithfulness; steadfast reliability, especially of God"},
    {lang: "Greek", word: "πίστις", translit: "pistis", strongs: "G4102", note: "faith or faithfulness; trust and fidelity"}
  ],
  "falleth": [
    {lang: "Hebrew", word: "נָפַל", translit: "naphal", strongs: "H5307", note: "to fall; base root behind the archaic form 'falleth'"},
    {lang: "Greek", word: "πίπτω", translit: "pipto", strongs: "G4098", note: "to fall; base root behind the archaic form 'falleth'"}
  ],
  "false prophet": [
    {lang: "Hebrew", word: "נָבִיא שֶׁקֶר", translit: "navi sheqer", strongs: "H5030 H8267", note: "a lying prophet; one who prophesies falsely"},
    {lang: "Greek", word: "ψευδοπροφήτης", translit: "pseudoprophetes", strongs: "G5578", note: "false prophet; one who claims false divine authority"}
  ],
  "false teaching": [
    {lang: "Greek", word: "ψευδοδιδάσκαλος", translit: "pseudodidaskalos", strongs: "G5572", note: "false teacher; one who spreads destructive heresies"}
  ],
  "falsehood": [
    {lang: "Hebrew", word: "שֶׁקֶר", translit: "sheqer", strongs: "H8267", note: "falsehood or lie; deceit contrary to truth"},
    {lang: "Greek", word: "ψεῦδος", translit: "pseudos", strongs: "G5579", note: "falsehood or lie; anything untrue"}
  ],
  "fear of god": [
    {lang: "Hebrew", word: "יִרְאַת אֱלֹהִים", translit: "yirat elohim", strongs: "H3374 H430", note: "fear of God; reverent awe toward the divine"},
    {lang: "Greek", word: "φόβος θεοῦ", translit: "phobos theou", strongs: "G5401 G2316", note: "fear of God; reverence lacking in the unrighteous"}
  ],
  "feast": [
    {lang: "Hebrew", word: "חַג", translit: "chag", strongs: "H2282", note: "feast or festival; a pilgrimage celebration"},
    {lang: "Greek", word: "ἑορτή", translit: "heorte", strongs: "G1859", note: "feast; a festival, especially Jewish holy days"}
  ],
  "fervor": [
    {lang: "Greek", word: "ζέω", translit: "zeo", strongs: "G2204", note: "to boil or be fervent; zealous spiritual passion"}
  ],
  "findeth": [
    {lang: "Hebrew", word: "מָצָא", translit: "matsa", strongs: "H4672", note: "to find; base root behind the archaic form 'findeth'"},
    {lang: "Greek", word: "εὑρίσκω", translit: "heurisko", strongs: "G2147", note: "to find; base root behind the archaic form 'findeth'"}
  ],
  "fire": [
    {lang: "Hebrew", word: "אֵשׁ", translit: "esh", strongs: "H784", note: "fire; literal fire and symbol of God's presence or judgment"},
    {lang: "Greek", word: "πῦρ", translit: "pyr", strongs: "G4442", note: "fire; literal fire and symbol of testing or judgment"}
  ],
  "flesh": [
    {lang: "Hebrew", word: "בָּשָׂר", translit: "basar", strongs: "H1320", note: "flesh; the human body, also kinship or frailty"},
    {lang: "Greek", word: "σάρξ", translit: "sarx", strongs: "G4561", note: "flesh; the human body, also sinful human nature"}
  ],
  "flock": [
    {lang: "Hebrew", word: "צֹאן", translit: "tson", strongs: "H6629", note: "flock; sheep and goats, often figurative of God's people"},
    {lang: "Greek", word: "ποίμνη", translit: "poimne", strongs: "G4167", note: "flock; figurative of a congregation under a shepherd"}
  ],
  "folly": [
    {lang: "Hebrew", word: "אִוֶּלֶת", translit: "ivvelet", strongs: "H200", note: "folly; moral foolishness, opposite of wisdom"},
    {lang: "Greek", word: "ἀφροσύνη", translit: "aphrosyne", strongs: "G877", note: "folly; lack of sense or moral judgment"}
  ],
  "foolishness": [
    {lang: "Hebrew", word: "סִכְלוּת", translit: "sikhluth", strongs: "H5531", note: "foolishness; especially as explored in Ecclesiastes"},
    {lang: "Greek", word: "μωρία", translit: "moria", strongs: "G3472", note: "foolishness; what appears absurd by worldly standards"}
  ],
  "forsaketh": [
    {lang: "Hebrew", word: "עָזַב", translit: "azab", strongs: "H5800", note: "to forsake or abandon; base root behind the archaic form 'forsaketh'"},
    {lang: "Greek", word: "ἐγκαταλείπω", translit: "enkataleipo", strongs: "G1459", note: "to forsake or abandon; base root behind the archaic form 'forsaketh'"}
  ],
  "galilee": [
    {lang: "Hebrew", word: "גָּלִיל", translit: "galil", strongs: "H1551", note: "Galilee; northern region, literally 'circuit' or 'district'"},
    {lang: "Greek", word: "Γαλιλαία", translit: "Galilaia", strongs: "G1056", note: "Galilee; region of Jesus' upbringing and ministry"}
  ],
  "garden of eden": [
    {lang: "Hebrew", word: "גַּן־עֵדֶן", translit: "gan-eden", strongs: "H1588 H5731", note: "Garden of Eden; the first humans' paradise home"}
  ],
  "garment": [
    {lang: "Hebrew", word: "בֶּגֶד", translit: "beged", strongs: "H899", note: "garment; clothing, also figurative of covering or treachery"},
    {lang: "Greek", word: "ἱμάτιον", translit: "himation", strongs: "G2440", note: "garment; outer robe or cloak"}
  ],
  "generation": [
    {lang: "Hebrew", word: "דּוֹר", translit: "dor", strongs: "H1755", note: "generation; an age or period of people"},
    {lang: "Greek", word: "γενεά", translit: "genea", strongs: "G1074", note: "generation; contemporaries of an age"}
  ],
  "gentile": [
    {lang: "Hebrew", word: "גּוֹי", translit: "goy", strongs: "H1471", note: "nation or gentile; a people outside Israel"},
    {lang: "Greek", word: "ἔθνος", translit: "ethnos", strongs: "G1484", note: "nation or gentile; non-Jewish peoples"}
  ],
  "gentleness": [
    {lang: "Hebrew", word: "עַנְוָה", translit: "anvah", strongs: "H6038", note: "gentleness or humility; a meek, lowly disposition"},
    {lang: "Greek", word: "πραΰτης", translit: "prautes", strongs: "G4240", note: "gentleness; meekness listed as fruit of the Spirit"}
  ],
  "giveth": [
    {lang: "Hebrew", word: "נָתַן", translit: "natan", strongs: "H5414", note: "to give; base root behind the archaic form 'giveth'"},
    {lang: "Greek", word: "δίδωμι", translit: "didomi", strongs: "G1325", note: "to give; base root behind the archaic form 'giveth'"}
  ],
  "gluttony": [
    {lang: "Hebrew", word: "זָלַל", translit: "zalal", strongs: "H2151", note: "to be a glutton; excessive eating, paired with drunkenness"},
    {lang: "Greek", word: "φάγος", translit: "phagos", strongs: "G5314", note: "glutton; one who eats to excess"}
  ],
  "goat": [
    {lang: "Hebrew", word: "עֵז", translit: "ez", strongs: "H5795", note: "goat; common livestock and sacrificial animal"},
    {lang: "Greek", word: "ἔριφος", translit: "eriphos", strongs: "G2056", note: "goat; symbol of the condemned in Jesus' judgment parable"}
  ],
  "goeth": [
    {lang: "Hebrew", word: "הָלַךְ", translit: "halak", strongs: "H1980", note: "to walk or go; base root behind the archaic form 'goeth'"},
    {lang: "Greek", word: "πορεύομαι", translit: "poreuomai", strongs: "G4198", note: "to go or journey; base root behind the archaic form 'goeth'"}
  ],
  "goliath": [
    {lang: "Hebrew", word: "גָּלְיָת", translit: "golyat", strongs: "H1555", note: "Goliath; the Philistine giant defeated by David"}
  ],
  "gomorrah": [
    {lang: "Hebrew", word: "עֲמֹרָה", translit: "amorah", strongs: "H6017", note: "Gomorrah; city destroyed alongside Sodom for wickedness"},
    {lang: "Greek", word: "Γόμορρα", translit: "Gomorra", strongs: "G1116", note: "Gomorrah; cited as a byword for judgment"}
  ],
  "gossip": [
    {lang: "Hebrew", word: "רָכִיל", translit: "rakhil", strongs: "H7400", note: "talebearing or gossip; slanderous talk"},
    {lang: "Greek", word: "ψιθυριστής", translit: "psithyristes", strongs: "G5588", note: "gossip or whisperer; one who spreads secret slander"}
  ],
  "governor": [
    {lang: "Hebrew", word: "פֶּחָה", translit: "pechah", strongs: "H6346", note: "governor; provincial ruler under a larger empire"},
    {lang: "Greek", word: "ἡγεμών", translit: "hegemon", strongs: "G2232", note: "governor; Roman provincial official, e.g. Pilate"}
  ],
  "greece": [
    {lang: "Hebrew", word: "יָוָן", translit: "yavan", strongs: "H3120", note: "Greece (Javan); named in Daniel's prophecies"},
    {lang: "Greek", word: "Ἑλλάς", translit: "Hellas", strongs: "G1671", note: "Greece; region visited by Paul"}
  ],
  "greed": [
    {lang: "Hebrew", word: "בֶּצַע", translit: "betsa", strongs: "H1215", note: "unjust gain or greed; profit gained dishonestly"},
    {lang: "Greek", word: "πλεονεξία", translit: "pleonexia", strongs: "G4124", note: "greed or covetousness; insatiable desire for more"}
  ],
  "greek": [
    {lang: "Hebrew", word: "יְוָנִי", translit: "yevani", strongs: "H3125", note: "a Grecian; a Greek person"},
    {lang: "Greek", word: "Ἕλλην", translit: "Hellen", strongs: "G1672", note: "a Greek; often paired with 'Jew' to mean all nations"}
  ],
  "grumbling": [
    {lang: "Hebrew", word: "תְּלוּנָה", translit: "telunah", strongs: "H8519", note: "murmuring or grumbling; complaint, as Israel's in the wilderness"},
    {lang: "Greek", word: "γογγυσμός", translit: "goggysmos", strongs: "G1112", note: "grumbling or murmuring; muttered complaint"}
  ],
  "hades": [
    {lang: "Hebrew", word: "שְׁאוֹל", translit: "sheol", strongs: "H7585", note: "Sheol; the realm of the dead, OT counterpart to Hades"},
    {lang: "Greek", word: "ᾅδης", translit: "hades", strongs: "G86", note: "Hades; the realm of the dead"}
  ],
  "hadst": [
    {lang: "Hebrew", word: "הָיָה", translit: "hayah", strongs: "H1961", note: "to be or become; nearest root behind the archaic possessive form 'hadst'"},
    {lang: "Greek", word: "ἔχω", translit: "echo", strongs: "G2192", note: "to have; base root behind the archaic form 'hadst'"}
  ],
  "harvest": [
    {lang: "Hebrew", word: "קָצִיר", translit: "qatsir", strongs: "H7105", note: "harvest; the reaping season, also figurative of judgment or ingathering"},
    {lang: "Greek", word: "θερισμός", translit: "therismos", strongs: "G2326", note: "harvest; literal reaping and figure for spiritual ingathering"}
  ],
  "hast": [
    {lang: "Hebrew", word: "יֵשׁ", translit: "yesh", strongs: "H3426", note: "root behind archaic 'hast/have'; existential 'there is' used to express possession"},
    {lang: "Greek", word: "ἔχω", translit: "echo", strongs: "G2192", note: "root behind archaic 'hast'; base verb 'to have'"}
  ],
  "hateth": [
    {lang: "Hebrew", word: "שָׂנֵא", translit: "sane", strongs: "H8130", note: "to hate; root of 'hateth'"},
    {lang: "Greek", word: "μισέω", translit: "miseo", strongs: "G3404", note: "to hate; root of 'hateth'"}
  ],
  "heareth": [
    {lang: "Hebrew", word: "שָׁמַע", translit: "shama", strongs: "H8085", note: "to hear, listen; root of 'heareth'"},
    {lang: "Greek", word: "ἀκούω", translit: "akouo", strongs: "G191", note: "to hear; root of 'heareth'"}
  ],
  "heaven": [
    {lang: "Hebrew", word: "שָׁמַיִם", translit: "shamayim", strongs: "H8064", note: "heaven, sky; the heavens"},
    {lang: "Greek", word: "οὐρανός", translit: "ouranos", strongs: "G3772", note: "heaven, sky"}
  ],
  "hebrew": [
    {lang: "Hebrew", word: "עִבְרִי", translit: "ivri", strongs: "H5680", note: "Hebrew; descendant of Eber"},
    {lang: "Greek", word: "Ἑβραῖος", translit: "Hebraios", strongs: "G1445", note: "a Hebrew person or the Hebrew language"}
  ],
  "hell": [
    {lang: "Hebrew", word: "שְׁאוֹל", translit: "sheol", strongs: "H7585", note: "the grave, realm of the dead"},
    {lang: "Greek", word: "γέεννα", translit: "geenna", strongs: "G1067", note: "Gehenna; place of final punishment"}
  ],
  "heresy": [
    {lang: "Greek", word: "αἵρεσις", translit: "hairesis", strongs: "G139", note: "a sect or faction; divisive false teaching"}
  ],
  "hidden": [
    {lang: "Hebrew", word: "סָתַר", translit: "sathar", strongs: "H5641", note: "to hide, conceal"},
    {lang: "Greek", word: "κρυπτός", translit: "kryptos", strongs: "G2927", note: "hidden, secret, concealed"}
  ],
  "high priest": [
    {lang: "Hebrew", word: "כֹּהֵן גָּדוֹל", translit: "kohen gadol", strongs: "H3548, H1419", note: "the chief priest of Israel"},
    {lang: "Greek", word: "ἀρχιερεύς", translit: "archiereus", strongs: "G749", note: "high priest, chief priest"}
  ],
  "hither": [
    {lang: "Hebrew", word: "הֵנָּה", translit: "hennah", strongs: "H2008", note: "here, hither, to this place"},
    {lang: "Greek", word: "ὧδε", translit: "hode", strongs: "G5602", note: "here, hither"}
  ],
  "humility": [
    {lang: "Hebrew", word: "עֲנָוָה", translit: "anavah", strongs: "H6038", note: "humility, meekness"},
    {lang: "Greek", word: "ταπεινοφροσύνη", translit: "tapeinophrosyne", strongs: "G5012", note: "lowliness of mind, humility"}
  ],
  "hymn": [
    {lang: "Greek", word: "ὕμνος", translit: "hymnos", strongs: "G5215", note: "a song of praise to God"}
  ],
  "hypocrisy": [
    {lang: "Greek", word: "ὑπόκρισις", translit: "hypokrisis", strongs: "G5272", note: "play-acting, pretense, insincerity"}
  ],
  "hypocrite": [
    {lang: "Greek", word: "ὑποκριτής", translit: "hypokrites", strongs: "G5273", note: "stage actor; one who pretends"}
  ],
  "idol": [
    {lang: "Hebrew", word: "אֱלִיל", translit: "elil", strongs: "H457", note: "a worthless idol, false god"},
    {lang: "Greek", word: "εἴδωλον", translit: "eidolon", strongs: "G1497", note: "an image or idol"}
  ],
  "idolatry": [
    {lang: "Greek", word: "εἰδωλολατρία", translit: "eidololatria", strongs: "G1495", note: "worship of idols"}
  ],
  "iniquity": [
    {lang: "Hebrew", word: "עָוֹן", translit: "avon", strongs: "H5771", note: "iniquity, guilt, perversity"},
    {lang: "Greek", word: "ἀδικία", translit: "adikia", strongs: "G93", note: "unrighteousness, wrongdoing"}
  ],
  "insight": [
    {lang: "Greek", word: "σύνεσις", translit: "synesis", strongs: "G4907", note: "understanding, discernment, insight"}
  ],
  "instruction": [
    {lang: "Hebrew", word: "מוּסָר", translit: "musar", strongs: "H4148", note: "discipline, instruction, correction"},
    {lang: "Greek", word: "παιδεία", translit: "paideia", strongs: "G3809", note: "training, instruction, discipline"}
  ],
  "intercessor": [
    {lang: "Hebrew", word: "פָּגַע", translit: "paga", strongs: "H6293", note: "to meet, entreat, intercede (verb root)"},
    {lang: "Greek", word: "ἐντυγχάνω", translit: "entygchano", strongs: "G1793", note: "to plead or intercede on another's behalf"}
  ],
  "isaac": [
    {lang: "Hebrew", word: "יִצְחָק", translit: "yitschaq", strongs: "H3327", note: "Isaac; son of Abraham, child of promise"},
    {lang: "Greek", word: "Ἰσαάκ", translit: "Isaak", strongs: "G2464", note: "Greek form of Isaac"}
  ],
  "isaiah": [
    {lang: "Hebrew", word: "יְשַׁעְיָהוּ", translit: "yeshayahu", strongs: "H3470", note: "Isaiah; 'the LORD is salvation'"},
    {lang: "Greek", word: "Ἠσαΐας", translit: "Esaias", strongs: "G2268", note: "Greek form of Isaiah"}
  ],
  "israel": [
    {lang: "Hebrew", word: "יִשְׂרָאֵל", translit: "yisrael", strongs: "H3478", note: "Israel; name given to Jacob and his nation"},
    {lang: "Greek", word: "Ἰσραήλ", translit: "Israel", strongs: "G2474", note: "Greek form of Israel"}
  ],
  "jacob": [
    {lang: "Hebrew", word: "יַעֲקֹב", translit: "yaaqov", strongs: "H3290", note: "Jacob; son of Isaac, renamed Israel"},
    {lang: "Greek", word: "Ἰακώβ", translit: "Iakob", strongs: "G2384", note: "Greek form of Jacob"}
  ],
  "jealousy": [
    {lang: "Hebrew", word: "קִנְאָה", translit: "qinah", strongs: "H7068", note: "jealousy, zeal, envy"},
    {lang: "Greek", word: "ζῆλος", translit: "zelos", strongs: "G2205", note: "zeal, jealousy"}
  ],
  "jeremiah": [
    {lang: "Hebrew", word: "יִרְמְיָהוּ", translit: "yirmeyahu", strongs: "H3414", note: "Jeremiah the prophet"},
    {lang: "Greek", word: "Ἱερεμίας", translit: "Hieremias", strongs: "G2408", note: "Greek form of Jeremiah"}
  ],
  "jericho": [
    {lang: "Hebrew", word: "יְרִיחוֹ", translit: "yericho", strongs: "H3405", note: "Jericho, city near the Jordan"},
    {lang: "Greek", word: "Ἱεριχώ", translit: "Hierico", strongs: "G2410", note: "Greek form of Jericho"}
  ],
  "jerusalem": [
    {lang: "Hebrew", word: "יְרוּשָׁלַיִם", translit: "yerushalayim", strongs: "H3389", note: "Jerusalem, the holy city"},
    {lang: "Greek", word: "Ἱερουσαλήμ", translit: "Hierousalem", strongs: "G2419", note: "Greek form of Jerusalem"}
  ],
  "jew": [
    {lang: "Hebrew", word: "יְהוּדִי", translit: "yehudi", strongs: "H3064", note: "Jew; member of the tribe/kingdom of Judah"},
    {lang: "Greek", word: "Ἰουδαῖος", translit: "Ioudaios", strongs: "G2453", note: "Jew, Jewish"}
  ],
  "jonah": [
    {lang: "Hebrew", word: "יוֹנָה", translit: "yonah", strongs: "H3124", note: "Jonah; 'dove'; prophet sent to Nineveh"},
    {lang: "Greek", word: "Ἰωνᾶς", translit: "Ionas", strongs: "G2495", note: "Greek form of Jonah"}
  ],
  "jordan river": [
    {lang: "Hebrew", word: "יַרְדֵּן", translit: "yarden", strongs: "H3383", note: "the Jordan River"},
    {lang: "Greek", word: "Ἰορδάνης", translit: "Iordanes", strongs: "G2446", note: "Greek form of the Jordan"}
  ],
  "joseph": [
    {lang: "Hebrew", word: "יוֹסֵף", translit: "yoseph", strongs: "H3130", note: "Joseph; son of Jacob"},
    {lang: "Greek", word: "Ἰωσήφ", translit: "Ioseph", strongs: "G2501", note: "Greek form of Joseph"}
  ],
  "joshua": [
    {lang: "Hebrew", word: "יְהוֹשֻׁעַ", translit: "yehoshua", strongs: "H3091", note: "Joshua; 'the LORD saves', successor to Moses"},
    {lang: "Greek", word: "Ἰησοῦς", translit: "Iesous", strongs: "G2424", note: "Greek form used for both Joshua and Jesus"}
  ],
  "jubilee": [
    {lang: "Hebrew", word: "יוֹבֵל", translit: "yobel", strongs: "H3104", note: "the year of release and restoration every 50 years"}
  ],
  "judah": [
    {lang: "Hebrew", word: "יְהוּדָה", translit: "yehudah", strongs: "H3063", note: "Judah; son of Jacob and his tribe/kingdom"},
    {lang: "Greek", word: "Ἰούδας", translit: "Ioudas", strongs: "G2455", note: "Greek form of Judah"}
  ],
  "judea": [
    {lang: "Greek", word: "Ἰουδαία", translit: "Ioudaia", strongs: "G2449", note: "Judea, the southern region of Israel"}
  ],
  "judge": [
    {lang: "Hebrew", word: "שָׁפַט", translit: "shaphat", strongs: "H8199", note: "to judge, govern; also a title for Israel's leaders"},
    {lang: "Greek", word: "κριτής", translit: "krites", strongs: "G2923", note: "a judge"}
  ],
  "justification": [
    {lang: "Greek", word: "δικαίωσις", translit: "dikaiosis", strongs: "G1347", note: "the act of being declared righteous"}
  ],
  "keepeth": [
    {lang: "Hebrew", word: "שָׁמַר", translit: "shamar", strongs: "H8104", note: "to keep, guard, observe; root of 'keepeth'"},
    {lang: "Greek", word: "τηρέω", translit: "tereo", strongs: "G5083", note: "to keep, guard, observe; root of 'keepeth'"}
  ],
  "kindness": [
    {lang: "Hebrew", word: "חֶסֶד", translit: "chesed", strongs: "H2617", note: "steadfast love, lovingkindness"},
    {lang: "Greek", word: "χρηστότης", translit: "chrestotes", strongs: "G5544", note: "kindness, goodness"}
  ],
  "kingdom of god": [
    {lang: "Greek", word: "βασιλεία τοῦ Θεοῦ", translit: "basileia tou Theou", strongs: "G932, G2316", note: "the reign/rule of God"}
  ],
  "kingdom of heaven": [
    {lang: "Greek", word: "βασιλεία τῶν οὐρανῶν", translit: "basileia ton ouranon", strongs: "G932, G3772", note: "Matthew's preferred phrase for God's reign"}
  ],
  "knoweth": [
    {lang: "Hebrew", word: "יָדַע", translit: "yada", strongs: "H3045", note: "to know; root of 'knoweth'"},
    {lang: "Greek", word: "γινώσκω", translit: "ginosko", strongs: "G1097", note: "to know; root of 'knoweth'"}
  ],
  "knowledge": [
    {lang: "Hebrew", word: "דַּעַת", translit: "daath", strongs: "H1847", note: "knowledge, perception"},
    {lang: "Greek", word: "γνῶσις", translit: "gnosis", strongs: "G1108", note: "knowledge"}
  ],
  "lamb": [
    {lang: "Hebrew", word: "שֶׂה", translit: "seh", strongs: "H7716", note: "a lamb or young sheep/goat"},
    {lang: "Greek", word: "ἀμνός", translit: "amnos", strongs: "G286", note: "a lamb"}
  ],
  "last judgment": [
    {lang: "Greek", word: "κρίσις", translit: "krisis", strongs: "G2920", note: "judgment; the final divine reckoning"}
  ],
  "lawlessness": [
    {lang: "Greek", word: "ἀνομία", translit: "anomia", strongs: "G458", note: "lawlessness, iniquity, disregard for law"}
  ],
  "leaven": [
    {lang: "Hebrew", word: "שְׂאֹר", translit: "seor", strongs: "H7603", note: "leaven, sourdough"},
    {lang: "Greek", word: "ζύμη", translit: "zyme", strongs: "G2219", note: "leaven, yeast"}
  ],
  "leaveth": [
    {lang: "Hebrew", word: "עָזַב", translit: "azab", strongs: "H5800", note: "to leave, forsake; root of 'leaveth'"},
    {lang: "Greek", word: "ἀφίημι", translit: "aphiemi", strongs: "G863", note: "to leave, let go, forgive; root of 'leaveth'"}
  ],
  "lest": [
    {lang: "Hebrew", word: "פֶּן", translit: "pen", strongs: "H6435", note: "lest, so that not"},
    {lang: "Greek", word: "μήποτε", translit: "mepote", strongs: "G3379", note: "lest, lest perhaps"}
  ],
  "levite": [
    {lang: "Hebrew", word: "לֵוִיִּי", translit: "leviyiy", strongs: "H3881", note: "a member of the tribe of Levi"},
    {lang: "Greek", word: "Λευίτης", translit: "Leuites", strongs: "G3019", note: "a Levite"}
  ],
  "libation": [
    {lang: "Hebrew", word: "נֵסֶךְ", translit: "nesek", strongs: "H5262", note: "drink offering poured out to God"},
    {lang: "Greek", word: "σπένδομαι", translit: "spendomai", strongs: "G4689", note: "to be poured out as a drink offering"}
  ],
  "lie": [
    {lang: "Hebrew", word: "כָּזָב", translit: "kazab", strongs: "H3577", note: "a lie, falsehood"},
    {lang: "Greek", word: "ψεῦδος", translit: "pseudos", strongs: "G5579", note: "a lie, falsehood"}
  ],
  "light": [
    {lang: "Hebrew", word: "אוֹר", translit: "or", strongs: "H216", note: "light"},
    {lang: "Greek", word: "φῶς", translit: "phos", strongs: "G5457", note: "light"}
  ],
  "lion": [
    {lang: "Hebrew", word: "אֲרִי", translit: "ari", strongs: "H738", note: "lion"},
    {lang: "Greek", word: "λέων", translit: "leon", strongs: "G3023", note: "lion"}
  ],
  "longsuffering": [
    {lang: "Hebrew", word: "אֶרֶךְ אַפַּיִם", translit: "erek appayim", strongs: "H750, H639", note: "lit. 'long of nostrils/anger'; patience"},
    {lang: "Greek", word: "μακροθυμία", translit: "makrothymia", strongs: "G3115", note: "patience, forbearance"}
  ],
  "looseth": [
    {lang: "Hebrew", word: "פָּתַח", translit: "pathach", strongs: "H6605", note: "to open, loose, untie; root of 'looseth'"},
    {lang: "Greek", word: "λύω", translit: "lyo", strongs: "G3089", note: "to loose, untie, release; root of 'looseth'"}
  ],
  "loveth": [
    {lang: "Hebrew", word: "אָהַב", translit: "ahab", strongs: "H157", note: "to love; root of 'loveth'"},
    {lang: "Greek", word: "ἀγαπάω", translit: "agapao", strongs: "G25", note: "to love; root of 'loveth'"}
  ],
  "loyalty": [
    {lang: "Hebrew", word: "אֱמוּנָה", translit: "emunah", strongs: "H530", note: "faithfulness, steadfastness, loyalty"},
    {lang: "Greek", word: "πίστις", translit: "pistis", strongs: "G4102", note: "faith, faithfulness, loyalty"}
  ],
  "lust": [
    {lang: "Hebrew", word: "תַּאֲוָה", translit: "taavah", strongs: "H8378", note: "desire, craving, lust"},
    {lang: "Greek", word: "ἐπιθυμία", translit: "epithymia", strongs: "G1939", note: "strong desire, lust"}
  ],
  "magistrate": [
    {lang: "Greek", word: "ἄρχων", translit: "archon", strongs: "G758", note: "ruler, magistrate, official"}
  ],
  "maketh": [
    {lang: "Hebrew", word: "עָשָׂה", translit: "asah", strongs: "H6213", note: "to make, do; root of 'maketh'"},
    {lang: "Greek", word: "ποιέω", translit: "poieo", strongs: "G4160", note: "to make, do; root of 'maketh'"}
  ],
  "manifest": [
    {lang: "Greek", word: "φανερόω", translit: "phaneroo", strongs: "G5319", note: "to make visible, reveal, manifest"}
  ],
  "martyr": [
    {lang: "Greek", word: "μάρτυς", translit: "martys", strongs: "G3144", note: "witness; one who testifies, later 'martyr'"}
  ],
  "martyrdom": [
    {lang: "Greek", word: "μαρτύριον", translit: "martyrion", strongs: "G3142", note: "testimony, witness; root of the concept of martyrdom"}
  ],
  "mayest": [
    {lang: "Greek", word: "δύναμαι", translit: "dynamai", strongs: "G1410", note: "to be able; underlies permissive 'mayest' constructions"}
  ],
  "mediator": [
    {lang: "Greek", word: "μεσίτης", translit: "mesites", strongs: "G3316", note: "one who mediates between two parties"}
  ],
  "meekness": [
    {lang: "Greek", word: "πραΰτης", translit: "prautes", strongs: "G4236", note: "gentleness, meekness"}
  ],
  "messiah": [
    {lang: "Hebrew", word: "מָשִׁיחַ", translit: "mashiach", strongs: "H4899", note: "anointed one, Messiah"},
    {lang: "Greek", word: "Μεσσίας", translit: "Messias", strongs: "G3323", note: "Messiah, transliterated Hebrew title"}
  ],
  "midianite": [
    {lang: "Hebrew", word: "מִדְיָנִי", translit: "midyani", strongs: "H4084", note: "a descendant of Midian, son of Abraham and Keturah"}
  ],
  "midst": [
    {lang: "Hebrew", word: "תָּוֶךְ", translit: "tavek", strongs: "H8432", note: "midst, middle, among"},
    {lang: "Greek", word: "μέσος", translit: "mesos", strongs: "G3319", note: "middle, midst, among"}
  ],
  "mind": [
    {lang: "Hebrew", word: "לֵב", translit: "lev", strongs: "H3820", note: "heart, mind, inner self"},
    {lang: "Greek", word: "νοῦς", translit: "nous", strongs: "G3563", note: "mind, understanding"}
  ],
  "miracle": [
    {lang: "Hebrew", word: "מוֹפֵת", translit: "mopheth", strongs: "H4159", note: "a wonder, sign, miracle"},
    {lang: "Greek", word: "δύναμις", translit: "dynamis", strongs: "G1411", note: "power, mighty work, miracle"}
  ],
  "moabite": [
    {lang: "Hebrew", word: "מוֹאָבִי", translit: "moavi", strongs: "H4125", note: "a descendant of Moab, son of Lot"}
  ],
  "mockery": [
    {lang: "Greek", word: "ἐμπαιγμός", translit: "empaigmos", strongs: "G1701", note: "mocking, cruel scorn"}
  ],
  "moses": [
    {lang: "Hebrew", word: "מֹשֶׁה", translit: "mosheh", strongs: "H4872", note: "Moses; deliverer and lawgiver of Israel"},
    {lang: "Greek", word: "Μωϋσῆς", translit: "Mouses", strongs: "G3475", note: "Greek form of Moses"}
  ],
  "mount sinai": [
    {lang: "Hebrew", word: "הַר סִינַי", translit: "har sinai", strongs: "H2022, H5514", note: "the mountain where the Law was given"},
    {lang: "Greek", word: "Σινᾶ", translit: "Sina", strongs: "G4614", note: "Sinai"}
  ],
  "mount zion": [
    {lang: "Hebrew", word: "הַר צִיּוֹן", translit: "har tsiyon", strongs: "H2022, H6726", note: "the hill of Jerusalem, symbol of God's dwelling"},
    {lang: "Greek", word: "Σιών", translit: "Sion", strongs: "G4622", note: "Zion"}
  ],
  "murmuring": [
    {lang: "Hebrew", word: "לוּן", translit: "lun", strongs: "H3885", note: "to murmur, grumble, complain"},
    {lang: "Greek", word: "γογγυσμός", translit: "gongysmos", strongs: "G1112", note: "murmuring, grumbling"}
  ],
  "mystery": [
    {lang: "Greek", word: "μυστήριον", translit: "mysterion", strongs: "G3466", note: "a hidden truth now revealed"}
  ],
  "nay": [
    {lang: "Hebrew", word: "לֹא", translit: "lo", strongs: "H3808", note: "no, not; negation"},
    {lang: "Greek", word: "οὐ", translit: "ou", strongs: "G3756", note: "no, not; negation"}
  ],
  "nazareth": [
    {lang: "Greek", word: "Ναζαρέτ", translit: "Nazaret", strongs: "G3478", note: "Nazareth; town in Galilee where Jesus grew up"}
  ],
  "new earth": [
    {lang: "Hebrew", word: "אֶרֶץ חֲדָשָׁה", translit: "erets chadashah", strongs: "H0776", note: "new earth; from Isaiah 65:17, paired with H2319 (new)"},
    {lang: "Greek", word: "γῆ καινή", translit: "ge kaine", strongs: "G1093", note: "new earth; from Revelation 21:1, paired with G2537 (new)"}
  ],
  "new heaven": [
    {lang: "Hebrew", word: "שָׁמַיִם חֲדָשִׁים", translit: "shamayim chadashim", strongs: "H8064", note: "new heaven(s); from Isaiah 65:17, paired with H2319 (new)"},
    {lang: "Greek", word: "οὐρανὸς καινός", translit: "ouranos kainos", strongs: "G3772", note: "new heaven; from Revelation 21:1, paired with G2537 (new)"}
  ],
  "new jerusalem": [
    {lang: "Greek", word: "Ἰερουσαλὴμ καινή", translit: "Ierousalem kaine", strongs: "G2419", note: "New Jerusalem; the heavenly city described in Revelation 21"}
  ],
  "noah": [
    {lang: "Hebrew", word: "נֹחַ", translit: "Noach", strongs: "H5146", note: "Noah; righteous man who built an ark to survive God's flood"},
    {lang: "Greek", word: "Νῶε", translit: "Noe", strongs: "G3575", note: "Noah; Greek form of the name in the New Testament"}
  ],
  "nought": [
    {lang: "Hebrew", word: "אַיִן", translit: "ayin", strongs: "H0369", note: "nought; nothing, non-existence"},
    {lang: "Greek", word: "οὐδέν", translit: "ouden", strongs: "G3762", note: "nought; nothing, no thing"}
  ],
  "obey": [
    {lang: "Hebrew", word: "שָׁמַע", translit: "shama", strongs: "H8085", note: "to hear and obey; heed, listen to"},
    {lang: "Greek", word: "ὑπακούω", translit: "hypakouo", strongs: "G5219", note: "to obey; listen and submit to"}
  ],
  "oft": [
    {lang: "Greek", word: "πολλάκις", translit: "pollakis", strongs: "G4178", note: "oft, often; many times"}
  ],
  "oil": [
    {lang: "Hebrew", word: "שֶׁמֶן", translit: "shemen", strongs: "H8081", note: "oil; usually olive oil, used for anointing and lamps"},
    {lang: "Greek", word: "ἔλαιον", translit: "elaion", strongs: "G1637", note: "olive oil; used for anointing, healing, and lamps"}
  ],
  "ordinance": [
    {lang: "Hebrew", word: "חֻקָּה", translit: "chuqqah", strongs: "H2708", note: "ordinance; statute, prescribed law"},
    {lang: "Greek", word: "δικαίωμα", translit: "dikaioma", strongs: "G1345", note: "ordinance; righteous regulation or requirement"}
  ],
  "palestine": [
    {lang: "Hebrew", word: "פְּלֶשֶׁת", translit: "Peleshet", strongs: "H6429", note: "Palestine; the land of the Philistines (Joel 3:4)"}
  ],
  "parable": [
    {lang: "Hebrew", word: "מָשָׁל", translit: "mashal", strongs: "H4912", note: "parable; proverb, illustrative saying"},
    {lang: "Greek", word: "παραβολή", translit: "parabole", strongs: "G3850", note: "parable; a comparison or illustrative story"}
  ],
  "paradise": [
    {lang: "Hebrew", word: "פַּרְדֵּס", translit: "pardes", strongs: "H6508", note: "orchard, park; Persian loanword behind the concept of paradise"},
    {lang: "Greek", word: "παράδεισος", translit: "paradeisos", strongs: "G3857", note: "paradise; the abode of the blessed dead"}
  ],
  "passeth": [
    {lang: "Hebrew", word: "עָבַר", translit: "avar", strongs: "H5674", note: "to pass over, pass through (root of 'pass')"},
    {lang: "Greek", word: "παρέρχομαι", translit: "parerchomai", strongs: "G3928", note: "to pass by or away (root of 'pass')"}
  ],
  "passover": [
    {lang: "Hebrew", word: "פֶּסַח", translit: "pesach", strongs: "H6453", note: "Passover; the feast commemorating the exodus from Egypt"},
    {lang: "Greek", word: "πάσχα", translit: "pascha", strongs: "G3957", note: "Passover; Greek transliteration of the Hebrew feast name"}
  ],
  "patience": [
    {lang: "Greek", word: "ὑπομονή", translit: "hypomone", strongs: "G5281", note: "patience; steadfast endurance"}
  ],
  "peace": [
    {lang: "Hebrew", word: "שָׁלוֹם", translit: "shalom", strongs: "H7965", note: "peace; wholeness, completeness, well-being"},
    {lang: "Greek", word: "εἰρήνη", translit: "eirene", strongs: "G1515", note: "peace; harmony, rest from strife"}
  ],
  "peacemaker": [
    {lang: "Greek", word: "εἰρηνοποιός", translit: "eirenopoios", strongs: "G1518", note: "peacemaker; one who makes peace (Matthew 5:9)"}
  ],
  "pentecost": [
    {lang: "Greek", word: "πεντηκοστή", translit: "pentekoste", strongs: "G4005", note: "Pentecost; 'fiftieth', the feast fifty days after Passover"}
  ],
  "perisheth": [
    {lang: "Hebrew", word: "אָבַד", translit: "avad", strongs: "H0006", note: "to perish, be destroyed (root of 'perish')"},
    {lang: "Greek", word: "ἀπόλλυμι", translit: "apollymi", strongs: "G0622", note: "to perish, be destroyed (root of 'perish')"}
  ],
  "persecution": [
    {lang: "Hebrew", word: "רָדַף", translit: "radaph", strongs: "H7291", note: "to pursue, persecute (verbal root behind persecution)"},
    {lang: "Greek", word: "διωγμός", translit: "diogmos", strongs: "G1375", note: "persecution; being chased or harassed for one's faith"}
  ],
  "perseverance": [
    {lang: "Greek", word: "προσκαρτέρησις", translit: "proskarteresis", strongs: "G4343", note: "perseverance; steadfast, persistent effort (Ephesians 6:18)"}
  ],
  "persia": [
    {lang: "Hebrew", word: "פָּרַס", translit: "Paras", strongs: "H6539", note: "Persia; the ancient empire east of Babylon"}
  ],
  "pharisee": [
    {lang: "Greek", word: "Φαρισαῖος", translit: "Pharisaios", strongs: "G5330", note: "Pharisee; member of a strict Jewish religious party"}
  ],
  "philistine": [
    {lang: "Hebrew", word: "פְּלִשְׁתִּי", translit: "Pelishti", strongs: "H6430", note: "Philistine; a member of the people of Philistia"}
  ],
  "pride": [
    {lang: "Hebrew", word: "גַּאֲוָה", translit: "ga'avah", strongs: "H1347", note: "pride; majesty, arrogance"},
    {lang: "Greek", word: "ὑπερηφανία", translit: "hyperephania", strongs: "G5243", note: "pride; arrogance, showing oneself above others"}
  ],
  "prince": [
    {lang: "Hebrew", word: "שַׂר", translit: "sar", strongs: "H8269", note: "prince; chief, ruler, official"},
    {lang: "Greek", word: "ἄρχων", translit: "archon", strongs: "G0758", note: "prince; ruler, leader"}
  ],
  "princess": [
    {lang: "Hebrew", word: "שָׂרָה", translit: "sarah", strongs: "H8282", note: "princess; noblewoman (same root as the name Sarah)"}
  ],
  "profane": [
    {lang: "Hebrew", word: "חָלַל", translit: "chalal", strongs: "H2490", note: "to profane, defile, treat as common"},
    {lang: "Greek", word: "βέβηλος", translit: "bebelos", strongs: "G0952", note: "profane; unholy, permitted to be trodden"}
  ],
  "promised land": [
    {lang: "Greek", word: "γῆ τῆς ἐπαγγελίας", translit: "ge tes epangelias", strongs: "G1093", note: "land of promise; phrase from Hebrews 11:9, paired with G1860 (promise)"}
  ],
  "prophetess": [
    {lang: "Hebrew", word: "נְבִיאָה", translit: "neviah", strongs: "H5031", note: "prophetess; a woman who speaks on behalf of God"},
    {lang: "Greek", word: "προφῆτις", translit: "prophetis", strongs: "G4398", note: "prophetess; a woman who speaks on behalf of God"}
  ],
  "prostitution": [
    {lang: "Hebrew", word: "זְנוּנִים", translit: "zenunim", strongs: "H2183", note: "whoredom, prostitution; often used figuratively of unfaithfulness"},
    {lang: "Greek", word: "πορνεία", translit: "porneia", strongs: "G4202", note: "sexual immorality, prostitution, fornication"}
  ],
  "prudence": [
    {lang: "Hebrew", word: "עָרְמָה", translit: "ormah", strongs: "H6195", note: "prudence; shrewdness, discretion (Proverbs 8:12)"},
    {lang: "Greek", word: "φρόνησις", translit: "phronesis", strongs: "G5428", note: "prudence; practical wisdom, insight"}
  ],
  "psalm": [
    {lang: "Hebrew", word: "מִזְמוֹר", translit: "mizmor", strongs: "H4210", note: "psalm; a song set to music"},
    {lang: "Greek", word: "ψαλμός", translit: "psalmos", strongs: "G5568", note: "psalm; a sacred song"}
  ],
  "publican": [
    {lang: "Greek", word: "τελώνης", translit: "telones", strongs: "G5057", note: "publican; a Roman tax collector"}
  ],
  "purification": [
    {lang: "Hebrew", word: "טׇהֳרָה", translit: "taharah", strongs: "H2893", note: "purification; ritual cleanness"},
    {lang: "Greek", word: "καθαρισμός", translit: "katharismos", strongs: "G2512", note: "purification; cleansing"}
  ],
  "queen": [
    {lang: "Hebrew", word: "מַלְכָּה", translit: "malkah", strongs: "H4436", note: "queen; female ruler or king's wife"},
    {lang: "Greek", word: "βασίλισσα", translit: "basilissa", strongs: "G0938", note: "queen; female ruler"}
  ],
  "rabbi": [
    {lang: "Hebrew", word: "רַב", translit: "rav", strongs: "H7227", note: "great one, master; the root underlying the title 'rabbi'"},
    {lang: "Greek", word: "ῥαββί", translit: "rhabbi", strongs: "G4461", note: "rabbi; 'my master/teacher', title for Jewish teachers"}
  ],
  "raiseth": [
    {lang: "Hebrew", word: "קוּם", translit: "qum", strongs: "H6965", note: "to rise, raise up (root of 'raise')"},
    {lang: "Greek", word: "ἐγείρω", translit: "egeiro", strongs: "G1453", note: "to raise, awaken (root of 'raise')"}
  ],
  "rapture": [
    {lang: "Greek", word: "ἁρπάζω", translit: "harpazo", strongs: "G0726", note: "to seize, catch away; underlies the doctrine of the rapture (1 Thess 4:17)"}
  ],
  "rebellion": [
    {lang: "Hebrew", word: "מְרִי", translit: "meri", strongs: "H4805", note: "rebellion; bitterness, defiance against authority"}
  ],
  "rebuke": [
    {lang: "Hebrew", word: "גָּעַר", translit: "ga'ar", strongs: "H1605", note: "to rebuke; sharply reprove"},
    {lang: "Greek", word: "ἐπιτιμάω", translit: "epitimao", strongs: "G2008", note: "to rebuke; charge, warn sternly"}
  ],
  "reconciliation": [
    {lang: "Hebrew", word: "כָּפַר", translit: "kaphar", strongs: "H3722", note: "to atone, make reconciliation; cover over sin"},
    {lang: "Greek", word: "καταλλαγή", translit: "katallage", strongs: "G2643", note: "reconciliation; restoration of relationship"}
  ],
  "redeemer": [
    {lang: "Hebrew", word: "גֹּאֵל", translit: "go'el", strongs: "H1350", note: "redeemer; kinsman who buys back or avenges"},
    {lang: "Greek", word: "λυτρωτής", translit: "lytrotes", strongs: "G3086", note: "redeemer; deliverer (Acts 7:35)"}
  ],
  "remnant": [
    {lang: "Hebrew", word: "שְׁאָר", translit: "she'ar", strongs: "H7611", note: "remnant; that which is left over"},
    {lang: "Greek", word: "λεῖμμα", translit: "leimma", strongs: "G3005", note: "remnant; a small surviving group (Romans 11:5)"}
  ],
  "repent": [
    {lang: "Hebrew", word: "נָחַם", translit: "nacham", strongs: "H5162", note: "to be sorry, relent, repent"},
    {lang: "Greek", word: "μετανοέω", translit: "metanoeo", strongs: "G3340", note: "to repent; change one's mind and direction"}
  ],
  "repentance": [
    {lang: "Hebrew", word: "נָחַם", translit: "nacham", strongs: "H5162", note: "relenting, repentance; same root as 'repent'"},
    {lang: "Greek", word: "μετάνοια", translit: "metanoia", strongs: "G3341", note: "repentance; a change of mind and heart"}
  ],
  "reproach": [
    {lang: "Hebrew", word: "חֶרְפָּה", translit: "cherpah", strongs: "H2781", note: "reproach; disgrace, scorn"},
    {lang: "Greek", word: "ὀνειδισμός", translit: "oneidismos", strongs: "G3680", note: "reproach; insult, disgrace"}
  ],
  "resurrection": [
    {lang: "Greek", word: "ἀνάστασις", translit: "anastasis", strongs: "G0386", note: "resurrection; rising, standing up again to life"}
  ],
  "returneth": [
    {lang: "Hebrew", word: "שׁוּב", translit: "shuv", strongs: "H7725", note: "to return, turn back (root of 'return')"},
    {lang: "Greek", word: "ὑποστρέφω", translit: "hypostrepho", strongs: "G5290", note: "to return, turn back (root of 'return')"}
  ],
  "revealed": [
    {lang: "Hebrew", word: "גָּלָה", translit: "galah", strongs: "H1540", note: "to uncover, reveal (root of 'reveal')"},
    {lang: "Greek", word: "ἀποκαλύπτω", translit: "apokalypto", strongs: "G0601", note: "to uncover, reveal (root of 'reveal')"}
  ],
  "revelation": [
    {lang: "Greek", word: "ἀποκάλυψις", translit: "apokalypsis", strongs: "G0602", note: "revelation; an uncovering, unveiling"}
  ],
  "reverence": [
    {lang: "Hebrew", word: "יָרֵא", translit: "yare", strongs: "H3372", note: "to fear, revere (Leviticus 19:30)"},
    {lang: "Greek", word: "εὐλάβεια", translit: "eulabeia", strongs: "G0127", note: "reverence; godly fear and caution (Hebrews 12:28)"}
  ],
  "riseth": [
    {lang: "Hebrew", word: "קוּם", translit: "qum", strongs: "H6965", note: "to rise, stand up (root of 'rise')"},
    {lang: "Greek", word: "ἀνίστημι", translit: "anistemi", strongs: "G0450", note: "to rise, stand up (root of 'rise')"}
  ],
  "robe": [
    {lang: "Hebrew", word: "מְעִיל", translit: "me'il", strongs: "H4598", note: "robe; mantle, outer garment"},
    {lang: "Greek", word: "στολή", translit: "stole", strongs: "G4749", note: "robe; long, flowing garment"}
  ],
  "roman": [
    {lang: "Greek", word: "Ῥωμαῖος", translit: "Rhomaios", strongs: "G4514", note: "Roman; a citizen of the Roman Empire"}
  ],
  "rome": [
    {lang: "Greek", word: "Ῥώμη", translit: "Rhome", strongs: "G4516", note: "Rome; capital of the Roman Empire"}
  ],
  "sabbath": [
    {lang: "Hebrew", word: "שַׁבָּת", translit: "shabbat", strongs: "H7676", note: "Sabbath; day of rest and cessation from work"},
    {lang: "Greek", word: "σάββατον", translit: "sabbaton", strongs: "G4521", note: "Sabbath; day of rest"}
  ],
  "sadducee": [
    {lang: "Greek", word: "Σαδδουκαῖος", translit: "Saddoukaios", strongs: "G4523", note: "Sadducee; member of a Jewish sect denying resurrection"}
  ],
  "saith": [
    {lang: "Hebrew", word: "אָמַר", translit: "amar", strongs: "H0559", note: "to say, speak (root of 'say')"},
    {lang: "Greek", word: "λέγω", translit: "lego", strongs: "G3004", note: "to say, speak (root of 'say')"}
  ],
  "salt": [
    {lang: "Hebrew", word: "מֶלַח", translit: "melach", strongs: "H4417", note: "salt; used for seasoning and covenant symbolism"},
    {lang: "Greek", word: "ἅλας", translit: "halas", strongs: "G0217", note: "salt; used for seasoning, symbol of preservation"}
  ],
  "samson": [
    {lang: "Hebrew", word: "שִׁמְשׁוֹן", translit: "Shimshon", strongs: "H8123", note: "Samson; judge of Israel known for great strength"},
    {lang: "Greek", word: "Σαμψών", translit: "Sampson", strongs: "G4546", note: "Samson; Greek form of the name (Hebrews 11:32)"}
  ],
  "sanctification": [
    {lang: "Hebrew", word: "קָדַשׁ", translit: "qadash", strongs: "H6942", note: "to sanctify, consecrate, set apart (root behind sanctification)"},
    {lang: "Greek", word: "ἁγιασμός", translit: "hagiasmos", strongs: "G0038", note: "sanctification; the process of being made holy"}
  ],
  "sarah": [
    {lang: "Hebrew", word: "שָׂרָה", translit: "Sarah", strongs: "H8283", note: "Sarah; wife of Abraham, mother of Isaac"},
    {lang: "Greek", word: "Σάρρα", translit: "Sarra", strongs: "G4564", note: "Sarah; Greek form of the name in the New Testament"}
  ],
  "savior": [
    {lang: "Hebrew", word: "מוֹשִׁיעַ", translit: "moshia", strongs: "H3467", note: "savior; deliverer, one who saves (from the root 'to save')"},
    {lang: "Greek", word: "σωτήρ", translit: "soter", strongs: "G4990", note: "savior; deliverer, preserver"}
  ],
  "scorn": [
    {lang: "Hebrew", word: "לָעַג", translit: "la'ag", strongs: "H3932", note: "to scorn, mock, deride"}
  ],
  "scribe": [
    {lang: "Hebrew", word: "סוֹפֵר", translit: "sofer", strongs: "H5608", note: "scribe; one who writes, records, or teaches the law"},
    {lang: "Greek", word: "γραμματεύς", translit: "grammateus", strongs: "G1122", note: "scribe; expert in the Jewish law"}
  ],
  "sea of galilee": [
    {lang: "Hebrew", word: "כִּנֶּרֶת", translit: "Kinneret", strongs: "H3672", note: "Chinnereth; Old Testament name of the same lake"},
    {lang: "Greek", word: "θάλασσα τῆς Γαλιλαίας", translit: "thalassa tes Galilaias", strongs: "G1056", note: "Sea of Galilee; freshwater lake in northern Israel"}
  ],
  "secret": [
    {lang: "Hebrew", word: "סוֹד", translit: "sod", strongs: "H5475", note: "secret; confidential counsel"},
    {lang: "Greek", word: "κρυπτός", translit: "kryptos", strongs: "G2927", note: "secret; hidden, concealed"}
  ],
  "seed": [
    {lang: "Hebrew", word: "זֶרַע", translit: "zera", strongs: "H2233", note: "seed; offspring, descendants"},
    {lang: "Greek", word: "σπέρμα", translit: "sperma", strongs: "G4690", note: "seed; offspring, descendants"}
  ],
  "seeketh": [
    {lang: "Hebrew", word: "בָּקַשׁ", translit: "baqash", strongs: "H1245", note: "to seek, search for (root of 'seek')"},
    {lang: "Greek", word: "ζητέω", translit: "zeteo", strongs: "G2212", note: "to seek, search for (root of 'seek')"}
  ],
  "seeth": [
    {lang: "Hebrew", word: "רָאָה", translit: "ra'ah", strongs: "H7200", note: "to see, perceive (root of 'see')"},
    {lang: "Greek", word: "βλέπω", translit: "blepo", strongs: "G0991", note: "to see, look (root of 'see')"}
  ],
  "sendeth": [
    {lang: "Hebrew", word: "שָׁלַח", translit: "shalach", strongs: "H7971", note: "to send, send away (root of 'send')"},
    {lang: "Greek", word: "πέμπω", translit: "pempo", strongs: "G3992", note: "to send (root of 'send')"}
  ],
  "serpent": [
    {lang: "Hebrew", word: "נָחָשׁ", translit: "nachash", strongs: "H5175", note: "serpent; snake, associated with the tempter in Eden"},
    {lang: "Greek", word: "ὄφις", translit: "ophis", strongs: "G3789", note: "serpent; snake"}
  ],
  "sexual immorality": [
    {lang: "Hebrew", word: "עֶרְוָה", translit: "ervah", strongs: "H6172", note: "nakedness, indecency; basis of Old Testament sexual-morality laws"},
    {lang: "Greek", word: "πορνεία", translit: "porneia", strongs: "G4202", note: "sexual immorality; any illicit sexual activity"}
  ],
  "shalt": [
    {lang: "Hebrew", word: "אָהַב", translit: "ahav", strongs: "H0157", note: "archaic modal 'shalt' embedded in verb tense, e.g. 'thou shalt love' (Deut 6:5), root 'to love'"},
    {lang: "Greek", word: "ἀγαπάω", translit: "agapao", strongs: "G0025", note: "future-as-command form behind 'thou shalt love' (Matt 22:37), root 'to love'"}
  ],
  "sheep": [
    {lang: "Hebrew", word: "צֹאן", translit: "tso'n", strongs: "H6629", note: "sheep, flock; sheep and goats collectively"},
    {lang: "Greek", word: "πρόβατον", translit: "probaton", strongs: "G4263", note: "sheep; a flock animal"}
  ],
  "sheol": [
    {lang: "Hebrew", word: "שְׁאוֹל", translit: "she'ol", strongs: "H7585", note: "Sheol; the realm of the dead"},
    {lang: "Greek", word: "ᾅδης", translit: "hades", strongs: "G0086", note: "Hades; New Testament counterpart to Sheol, realm of the dead"}
  ],
  "shepherd": [
    {lang: "Hebrew", word: "רֹעֶה", translit: "ro'eh", strongs: "H7462", note: "shepherd; one who tends flocks"},
    {lang: "Greek", word: "ποιμήν", translit: "poimen", strongs: "G4166", note: "shepherd; one who tends flocks, pastor"}
  ],
  "shouldst": [
    {lang: "Hebrew", word: "גָּדַל", translit: "gadal", strongs: "H1431", note: "archaic modal 'shouldst' embedded in verb tense, e.g. 'that thou shouldest magnify him' (Job 7:17), root 'to magnify'"},
    {lang: "Greek", word: "αἴρω", translit: "airo", strongs: "G0142", note: "form behind 'that thou shouldest take them' (John 17:15), root 'to take away'"}
  ],
  "sign": [
    {lang: "Hebrew", word: "אוֹת", translit: "ot", strongs: "H0226", note: "sign; mark, token, miracle"},
    {lang: "Greek", word: "σημεῖον", translit: "semeion", strongs: "G4592", note: "sign; miraculous token"}
  ],
  "sitteth": [
    {lang: "Hebrew", word: "יָשַׁב", translit: "yashab", strongs: "H3427", note: "sit, dwell, remain"},
    {lang: "Greek", word: "κάθημαι", translit: "kathemai", strongs: "G2521", note: "to sit, be seated"}
  ],
  "slander": [
    {lang: "Hebrew", word: "דִּבָּה", translit: "dibbah", strongs: "H1681", note: "slander; whispered report, defamation"},
    {lang: "Greek", word: "καταλαλιά", translit: "katalalia", strongs: "G2636", note: "slander; evil speaking against someone"}
  ],
  "sloth": [
    {lang: "Hebrew", word: "עַצְלָה", translit: "atslah", strongs: "H6103", note: "slothfulness; laziness"},
    {lang: "Greek", word: "ὀκνηρός", translit: "okneros", strongs: "G3636", note: "slothful; sluggish, backward"}
  ],
  "smote": [
    {lang: "Hebrew", word: "נָכָה", translit: "nakah", strongs: "H5221", note: "to smite, strike, kill"},
    {lang: "Greek", word: "πατάσσω", translit: "patasso", strongs: "G3960", note: "to smite, strike"}
  ],
  "sodom": [
    {lang: "Hebrew", word: "סְדֹם", translit: "Sedom", strongs: "H5467", note: "Sodom; city destroyed for wickedness"},
    {lang: "Greek", word: "Σόδομα", translit: "Sodoma", strongs: "G4670", note: "Sodom; used as byword for judgment"}
  ],
  "solomon": [
    {lang: "Hebrew", word: "שְׁלֹמֹה", translit: "shelomoh", strongs: "H8010", note: "Solomon; David's son, built the temple, known for wisdom"},
    {lang: "Greek", word: "Σολομών", translit: "Solomon", strongs: "G4672", note: "Solomon, in NT genealogies and sayings"}
  ],
  "spake": [
    {lang: "Hebrew", word: "דָּבַר", translit: "dabar", strongs: "H1696", note: "to speak, declare"},
    {lang: "Greek", word: "λαλέω", translit: "laleo", strongs: "G2980", note: "to speak, utter words"}
  ],
  "speaketh": [
    {lang: "Hebrew", word: "דָּבַר", translit: "dabar", strongs: "H1696", note: "to speak, declare"},
    {lang: "Greek", word: "λαλέω", translit: "laleo", strongs: "G2980", note: "to speak, utter words"}
  ],
  "standeth": [
    {lang: "Hebrew", word: "עָמַד", translit: "amad", strongs: "H5975", note: "to stand, remain, endure"},
    {lang: "Greek", word: "ἵστημι", translit: "histemi", strongs: "G2476", note: "to stand, set, establish"}
  ],
  "statute": [
    {lang: "Hebrew", word: "חֹק", translit: "choq", strongs: "H2706", note: "statute, prescribed limit, decree"}
  ],
  "steadfastness": [
    {lang: "Greek", word: "στηριγμός", translit: "stērigmos", strongs: "G4740", note: "steadfastness; firm, settled state"}
  ],
  "stone": [
    {lang: "Hebrew", word: "אֶבֶן", translit: "eben", strongs: "H68", note: "stone, rock"},
    {lang: "Greek", word: "λίθος", translit: "lithos", strongs: "G3037", note: "stone"}
  ],
  "stretcheth": [
    {lang: "Hebrew", word: "נָטָה", translit: "natah", strongs: "H5186", note: "to stretch out, extend, incline"},
    {lang: "Greek", word: "ἐκτείνω", translit: "ekteino", strongs: "G1614", note: "to stretch out, extend"}
  ],
  "suffering": [
    {lang: "Hebrew", word: "מַכְאוֹב", translit: "makob", strongs: "H4341", note: "pain, sorrow, suffering"},
    {lang: "Greek", word: "πάθημα", translit: "pathema", strongs: "G3804", note: "suffering, affliction"}
  ],
  "tabernacle": [
    {lang: "Hebrew", word: "מִשְׁכָּן", translit: "mishkan", strongs: "H4908", note: "tabernacle; dwelling place of God"},
    {lang: "Greek", word: "σκηνή", translit: "skene", strongs: "G4633", note: "tent, tabernacle"}
  ],
  "taketh": [
    {lang: "Hebrew", word: "לָקַח", translit: "laqach", strongs: "H3947", note: "to take, seize, receive"},
    {lang: "Greek", word: "λαμβάνω", translit: "lambano", strongs: "G2983", note: "to take, receive"}
  ],
  "tax collector": [
    {lang: "Greek", word: "τελώνης", translit: "telones", strongs: "G5057", note: "tax collector, publican"}
  ],
  "telleth": [
    {lang: "Hebrew", word: "נָגַד", translit: "nagad", strongs: "H5046", note: "to tell, declare, report"},
    {lang: "Greek", word: "ἀπαγγέλλω", translit: "apaggello", strongs: "G518", note: "to tell, report, announce"}
  ],
  "temper": [
    {lang: "Hebrew", word: "רָקַח", translit: "raqach", strongs: "H7543", note: "to compound, blend, temper (spices)"}
  ],
  "temple tax": [
    {lang: "Greek", word: "δίδραχμον", translit: "didrachmon", strongs: "G1323", note: "two-drachma temple tax coin"}
  ],
  "temptation": [
    {lang: "Hebrew", word: "מַסָּה", translit: "massah", strongs: "H4531", note: "trial, testing, temptation"},
    {lang: "Greek", word: "πειρασμός", translit: "peirasmos", strongs: "G3986", note: "temptation, trial, testing"}
  ],
  "testament": [
    {lang: "Hebrew", word: "בְּרִית", translit: "berit", strongs: "H1285", note: "covenant; the underlying concept behind 'testament'"},
    {lang: "Greek", word: "διαθήκη", translit: "diatheke", strongs: "G1242", note: "covenant, testament, will"}
  ],
  "testimony": [
    {lang: "Hebrew", word: "עֵדוּת", translit: "eduth", strongs: "H5715", note: "testimony, witness, decree"},
    {lang: "Greek", word: "μαρτυρία", translit: "martyria", strongs: "G3141", note: "testimony, witness"}
  ],
  "tetrarch": [
    {lang: "Greek", word: "τετράρχης", translit: "tetrarches", strongs: "G5076", note: "tetrarch; ruler of a quarter region"}
  ],
  "thanksgiving": [
    {lang: "Hebrew", word: "תּוֹדָה", translit: "todah", strongs: "H8426", note: "thanksgiving; thank offering, praise"},
    {lang: "Greek", word: "εὐχαριστία", translit: "eucharistia", strongs: "G2169", note: "thanksgiving, gratitude"}
  ],
  "thee": [
    {lang: "Hebrew", word: "אַתָּה", translit: "attah", strongs: "H859", note: "thou/thee; 2nd person singular pronoun root"},
    {lang: "Greek", word: "σέ", translit: "se", strongs: "G4571", note: "thee; accusative form of the 2nd person pronoun"}
  ],
  "thereby": [
    {lang: "Hebrew", word: "בּוֹ", translit: "bo", strongs: "H1931", note: "by/in it; preposition plus the pronoun 'he/it'"},
    {lang: "Greek", word: "αὐτός", translit: "autos", strongs: "G846", note: "he/it; underlying pronoun in prepositional phrases rendered 'thereby'"}
  ],
  "therein": [
    {lang: "Hebrew", word: "בָּהּ", translit: "bah", strongs: "H1931", note: "in it; preposition plus the pronoun 'he/it'"},
    {lang: "Greek", word: "αὐτός", translit: "autos", strongs: "G846", note: "he/it; underlying pronoun in prepositional phrases rendered 'therein'"}
  ],
  "thereof": [
    {lang: "Hebrew", word: "מִמֶּנּוּ", translit: "mimmennu", strongs: "H1931", note: "of/from it; preposition plus the pronoun 'he/it'"},
    {lang: "Greek", word: "αὐτός", translit: "autos", strongs: "G846", note: "he/it; underlying pronoun in prepositional phrases rendered 'thereof'"}
  ],
  "thereto": [
    {lang: "Hebrew", word: "אֵלָיו", translit: "elav", strongs: "H1931", note: "to it; preposition plus the pronoun 'he/it'"},
    {lang: "Greek", word: "αὐτός", translit: "autos", strongs: "G846", note: "he/it; underlying pronoun in prepositional phrases rendered 'thereto'"}
  ],
  "therewith": [
    {lang: "Hebrew", word: "עִמּוֹ", translit: "immo", strongs: "H1931", note: "with it; preposition plus the pronoun 'he/it'"},
    {lang: "Greek", word: "αὐτός", translit: "autos", strongs: "G846", note: "he/it; underlying pronoun in prepositional phrases rendered 'therewith'"}
  ],
  "thine": [
    {lang: "Hebrew", word: "אַתָּה", translit: "attah", strongs: "H859", note: "thine; possessive of the 2nd person singular pronoun root"},
    {lang: "Greek", word: "σός", translit: "sos", strongs: "G4674", note: "thine, thy; 2nd person possessive pronoun"}
  ],
  "thither": [
    {lang: "Hebrew", word: "שָׁמָּה", translit: "shammah", strongs: "H8033", note: "there, to there (directional form of 'there')"},
    {lang: "Greek", word: "ἐκεῖ", translit: "ekei", strongs: "G1563", note: "there, to that place"}
  ],
  "throne": [
    {lang: "Hebrew", word: "כִּסֵּא", translit: "kisse", strongs: "H3678", note: "throne, seat of authority"},
    {lang: "Greek", word: "θρόνος", translit: "thronos", strongs: "G2362", note: "throne"}
  ],
  "tithe": [
    {lang: "Hebrew", word: "מַעֲשֵׂר", translit: "ma'aser", strongs: "H4643", note: "tithe, tenth part"},
    {lang: "Greek", word: "δεκάτη", translit: "dekate", strongs: "G1181", note: "tithe, a tenth"}
  ],
  "toucheth": [
    {lang: "Hebrew", word: "נָגַע", translit: "naga", strongs: "H5060", note: "to touch, reach, strike"},
    {lang: "Greek", word: "ἅπτω", translit: "hapto", strongs: "G680", note: "to touch, take hold of"}
  ],
  "tower of babel": [
    {lang: "Hebrew", word: "מִגְדַּל בָּבֶל", translit: "migdal Bavel", strongs: "H4026, H894", note: "the tower built at Babel; migdal (tower) + Bavel (Babylon/confusion)"}
  ],
  "training": [
    {lang: "Hebrew", word: "חָנִיךְ", translit: "chanik", strongs: "H2593", note: "trained, tried (of servants)"},
    {lang: "Greek", word: "γυμνάζω", translit: "gymnazo", strongs: "G1128", note: "to train, exercise (spiritually)"}
  ],
  "transfiguration": [
    {lang: "Greek", word: "μεταμορφόω", translit: "metamorphoo", strongs: "G3339", note: "to transform, transfigure; Jesus' changed appearance"}
  ],
  "transgression": [
    {lang: "Hebrew", word: "פֶּשַׁע", translit: "pesha", strongs: "H6588", note: "transgression, rebellion, revolt"},
    {lang: "Greek", word: "παράβασις", translit: "parabasis", strongs: "G3847", note: "transgression, overstepping a boundary"}
  ],
  "trial": [
    {lang: "Hebrew", word: "בָּחַן", translit: "bachan", strongs: "H974", note: "to test, try, examine"},
    {lang: "Greek", word: "δοκίμιον", translit: "dokimion", strongs: "G1383", note: "trial, testing, proof of genuineness"}
  ],
  "tribe": [
    {lang: "Hebrew", word: "שֵׁבֶט", translit: "shevet", strongs: "H7626", note: "tribe, rod, staff"},
    {lang: "Greek", word: "φυλή", translit: "phyle", strongs: "G5443", note: "tribe, nation"}
  ],
  "tribulation": [
    {lang: "Hebrew", word: "צָרָה", translit: "tsarah", strongs: "H6869", note: "distress, trouble, tribulation"},
    {lang: "Greek", word: "θλῖψις", translit: "thlipsis", strongs: "G2347", note: "tribulation, affliction, pressure"}
  ],
  "tribute": [
    {lang: "Hebrew", word: "מַס", translit: "mas", strongs: "H4522", note: "tribute, forced labor, tax"},
    {lang: "Greek", word: "φόρος", translit: "phoros", strongs: "G5411", note: "tribute, tax paid to a ruler"}
  ],
  "trusteth": [
    {lang: "Hebrew", word: "בָּטַח", translit: "batach", strongs: "H982", note: "to trust, rely on, feel confident"},
    {lang: "Greek", word: "πείθω", translit: "peitho", strongs: "G3982", note: "to trust, have confidence in, be persuaded"}
  ],
  "truth": [
    {lang: "Hebrew", word: "אֱמֶת", translit: "emet", strongs: "H571", note: "truth; faithfulness, reliability"},
    {lang: "Greek", word: "ἀλήθεια", translit: "aletheia", strongs: "G225", note: "truth; reality, sincerity"}
  ],
  "twelve tribes": [
    {lang: "Greek", word: "δωδεκάφυλον", translit: "dodekaphylon", strongs: "G1429", note: "the twelve tribes (of Israel), as a collective whole"}
  ],
  "unclean": [
    {lang: "Hebrew", word: "טָמֵא", translit: "tame", strongs: "H2931", note: "unclean, defiled, impure"},
    {lang: "Greek", word: "ἀκάθαρτος", translit: "akathartos", strongs: "G169", note: "unclean, impure"}
  ],
  "understanding": [
    {lang: "Hebrew", word: "בִּינָה", translit: "binah", strongs: "H998", note: "understanding, discernment, insight"},
    {lang: "Greek", word: "σύνεσις", translit: "synesis", strongs: "G4907", note: "understanding, comprehension"}
  ],
  "verily": [
    {lang: "Hebrew", word: "אָמֵן", translit: "amen", strongs: "H543", note: "truly, verily, so be it"},
    {lang: "Greek", word: "ἀμήν", translit: "amen", strongs: "G281", note: "verily, truly, certainly"}
  ],
  "vice": [
    {lang: "Hebrew", word: "רֶשַׁע", translit: "resha", strongs: "H7562", note: "wickedness, moral corruption, vice"},
    {lang: "Greek", word: "κακία", translit: "kakia", strongs: "G2549", note: "vice, malice, moral evil"}
  ],
  "vineyard": [
    {lang: "Hebrew", word: "כֶּרֶם", translit: "kerem", strongs: "H3754", note: "vineyard"},
    {lang: "Greek", word: "ἀμπελών", translit: "ampelon", strongs: "G290", note: "vineyard"}
  ],
  "virtue": [
    {lang: "Hebrew", word: "חַיִל", translit: "chayil", strongs: "H2428", note: "strength, worth, virtue (as in 'virtuous woman')"},
    {lang: "Greek", word: "ἀρετή", translit: "arete", strongs: "G703", note: "virtue, moral excellence"}
  ],
  "walketh": [
    {lang: "Hebrew", word: "הָלַךְ", translit: "halak", strongs: "H1980", note: "to walk, go, live (figuratively)"},
    {lang: "Greek", word: "περιπατέω", translit: "peripateo", strongs: "G4043", note: "to walk, conduct one's life"}
  ],
  "wast": [
    {lang: "Hebrew", word: "הָיָה", translit: "hayah", strongs: "H1961", note: "to be, become; root of 'wast'"},
    {lang: "Greek", word: "εἰμί", translit: "eimi", strongs: "G1510", note: "to be; root of 'wast'"}
  ],
  "water": [
    {lang: "Hebrew", word: "מַיִם", translit: "mayim", strongs: "H4325", note: "water"},
    {lang: "Greek", word: "ὕδωρ", translit: "hydor", strongs: "G5204", note: "water"}
  ],
  "way": [
    {lang: "Hebrew", word: "דֶּרֶךְ", translit: "derek", strongs: "H1870", note: "way, road, path, manner of life"},
    {lang: "Greek", word: "ὁδός", translit: "hodos", strongs: "G3598", note: "way, road, journey"}
  ],
  "wept": [
    {lang: "Hebrew", word: "בָּכָה", translit: "bakah", strongs: "H1058", note: "to weep, cry"},
    {lang: "Greek", word: "κλαίω", translit: "klaio", strongs: "G2799", note: "to weep, cry aloud"}
  ],
  "wert": [
    {lang: "Hebrew", word: "הָיָה", translit: "hayah", strongs: "H1961", note: "to be, become; root of 'wert'"},
    {lang: "Greek", word: "εἰμί", translit: "eimi", strongs: "G1510", note: "to be; root of 'wert'"}
  ],
  "whatsoever": [
    {lang: "Hebrew", word: "אֲשֶׁר", translit: "asher", strongs: "H834", note: "which, that; relative particle underlying 'whatsoever'"},
    {lang: "Greek", word: "ὅστις", translit: "hostis", strongs: "G3748", note: "whoever, whatsoever; indefinite relative pronoun"}
  ],
  "wherein": [
    {lang: "Hebrew", word: "אֲשֶׁר", translit: "asher", strongs: "H834", note: "which, that; relative particle underlying 'wherein'"},
    {lang: "Greek", word: "ὅς", translit: "hos", strongs: "G3739", note: "who, which; relative pronoun underlying 'wherein'"}
  ],
  "wheresoever": [
    {lang: "Hebrew", word: "אֲשֶׁר", translit: "asher", strongs: "H834", note: "which, that; relative particle underlying 'wheresoever'"},
    {lang: "Greek", word: "ὅπου", translit: "hopou", strongs: "G3699", note: "where, wherever"}
  ],
  "whither": [
    {lang: "Hebrew", word: "אָן", translit: "an", strongs: "H575", note: "where, whither; interrogative of direction"},
    {lang: "Greek", word: "ὅπου", translit: "hopou", strongs: "G3699", note: "where, to where"}
  ],
  "whosoever": [
    {lang: "Hebrew", word: "אֲשֶׁר", translit: "asher", strongs: "H834", note: "which, that; relative particle underlying 'whosoever'"},
    {lang: "Greek", word: "ὅστις", translit: "hostis", strongs: "G3748", note: "whoever, whosoever; indefinite relative pronoun"}
  ],
  "wickedness": [
    {lang: "Hebrew", word: "רִשְׁעָה", translit: "rish'ah", strongs: "H7564", note: "wickedness, evil"},
    {lang: "Greek", word: "πονηρία", translit: "poneria", strongs: "G4189", note: "wickedness, evil intent"}
  ],
  "wilderness": [
    {lang: "Hebrew", word: "מִדְבָּר", translit: "midbar", strongs: "H4057", note: "wilderness, desert, uninhabited land"},
    {lang: "Greek", word: "ἔρημος", translit: "eremos", strongs: "G2048", note: "wilderness, desert, deserted place"}
  ],
  "will": [
    {lang: "Hebrew", word: "רָצוֹן", translit: "ratson", strongs: "H7522", note: "will, favor, desire, pleasure"},
    {lang: "Greek", word: "θέλημα", translit: "thelema", strongs: "G2307", note: "will, desire, purpose"}
  ],
  "wine": [
    {lang: "Hebrew", word: "יַיִן", translit: "yayin", strongs: "H3196", note: "wine"},
    {lang: "Greek", word: "οἶνος", translit: "oinos", strongs: "G3631", note: "wine"}
  ],
  "withal": [
    {lang: "Hebrew", word: "גַּם", translit: "gam", strongs: "H1571", note: "also, moreover, withal"},
    {lang: "Greek", word: "ἅμα", translit: "hama", strongs: "G260", note: "at the same time, withal, together with"}
  ],
  "wonder": [
    {lang: "Hebrew", word: "מוֹפֵת", translit: "mofet", strongs: "H4159", note: "wonder, sign, portent"},
    {lang: "Greek", word: "τέρας", translit: "teras", strongs: "G5059", note: "wonder, marvel, portent"}
  ],
  "wouldst": [
    {lang: "Hebrew", word: "אָבָה", translit: "avah", strongs: "H14", note: "to be willing, consent; root of 'wouldst'"},
    {lang: "Greek", word: "θέλω", translit: "thelo", strongs: "G2309", note: "to will, wish, desire; root of 'wouldst'"}
  ],
  "wrought": [
    {lang: "Hebrew", word: "עָשָׂה", translit: "asah", strongs: "H6213", note: "to do, make, work, accomplish"},
    {lang: "Greek", word: "ἐργάζομαι", translit: "ergazomai", strongs: "G2038", note: "to work, perform, accomplish"}
  ],
  "ye": [
    {lang: "Hebrew", word: "אַתֶּם", translit: "attem", strongs: "H859", note: "ye, you; plural form of the 2nd person pronoun root"},
    {lang: "Greek", word: "ὑμεῖς", translit: "hymeis", strongs: "G5210", note: "ye, you; 2nd person plural pronoun"}
  ],
  "yea": [
    {lang: "Hebrew", word: "אַף", translit: "aph", strongs: "H637", note: "yea, also, indeed, moreover"},
    {lang: "Greek", word: "ναί", translit: "nai", strongs: "G3483", note: "yea, yes, verily"}
  ],
  "your": [
    {lang: "Hebrew", word: "אַתֶּם", translit: "attem", strongs: "H859", note: "your; possessive of the 2nd person plural pronoun root"},
    {lang: "Greek", word: "ὑμῶν", translit: "hymon", strongs: "G5216", note: "of you, your; genitive plural pronoun"}
  ],
  "zeal": [
    {lang: "Hebrew", word: "קִנְאָה", translit: "qin'ah", strongs: "H7068", note: "zeal, jealousy, ardor"},
    {lang: "Greek", word: "ζῆλος", translit: "zelos", strongs: "G2205", note: "zeal, jealousy, fervor"}
  ],
  "zealot": [
    {lang: "Greek", word: "ζηλωτής", translit: "zelotes", strongs: "G2208", note: "zealot; title of Simon, one of the twelve disciples"}
  ]
};

if (typeof window.ENGLISH_BIBLE_DICT === "object") {
  Object.keys(window.SWRV_ORIGINALS_FILL).forEach(function(word) {
    var entry = window.ENGLISH_BIBLE_DICT[word];
    if (entry && (!entry.originals || !entry.originals.length)) {
      entry.originals = window.SWRV_ORIGINALS_FILL[word];
      entry.confidence = "direct-source";
    }
  });
}
