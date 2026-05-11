// SWRV Kingdom Genesis — Genesis 1-4 enrichments layer
// Merges deep definitions into window.DEFINITIONS and defines
// renderGen14Enrichments() which app.js calls during verse render.
// MUST load AFTER data files and BEFORE app.js.

// Merge new deep definitions into existing
(function(){
  const NEW_DEFS = {"tohu wa-bohu": {"hebrew": "תֹהוּ וָבֹהוּ", "translit": "tohu wa-bohu", "strongs": "H8414 + H922", "root": "tohu = formlessness, chaos, waste; bohu = emptiness, void", "senses": ["Formless, unordered, chaotic — like a desert wasteland", "Empty, void — uninhabited, unfilled", "Used by prophets (Jer 4:23, Isa 34:11) to describe a city after divine judgment — i.e., a place that USED TO be ordered but is now reduced"], "visual": "Imagine the aftermath of a flood that destroyed everything — empty, water-covered, dark, no shape, no life. That is Genesis 1:2 before God speaks.", "ane": "ANE creation accounts (Enuma Elish) describe a primordial chaos that gods had to fight against. Genesis uses tohu wa-bohu as a literary echo but flips the meaning: there is no war, God simply speaks and order appears.", "theology": "Some commentators (including Tertullian and some Jewish targumists) link tohu wa-bohu to a prior judgment — the earth was MADE good and BECAME formless. This is the 'gap theory.' Most modern scholars read it as the original pre-creation state. Either way, God's response is the same: He brings light, order, and life into the chaos.", "kingdom": "The pattern of God's kingdom work: chaos becomes ordered creation. This is what God does in salvation too — He takes the formless wasteland of a broken life and brings light, order, and fruitfulness.", "cross": ["Gen 1:2", "Jer 4:23", "Isa 34:11", "2 Cor 4:6"]}, "ruach": {"hebrew": "רוּחַ", "translit": "ruach", "strongs": "H7307", "root": "Primary root meaning breath/wind/spirit. Used 378 times in OT.", "senses": ["Wind — the physical wind that blows (Gen 8:1)", "Breath — what gives life to a body (Gen 6:17)", "Spirit — the inner animating principle of a person or being", "The Spirit of God — God's personal active presence (Gen 1:2)", "Disposition or mindset — 'a spirit of jealousy' (Num 5:14), 'a broken spirit' (Ps 51:17)"], "visual": "Wind that you cannot see but you can feel and hear. Breath that brings a body to life. Genesis 1:2 — the Spirit of God moves over the waters like a wind on the sea, but with intention.", "ane": "Other ANE traditions had multiple spirit-gods. Genesis specifies: THE ruach of THE Elohim — the singular Spirit of the singular God. The pre-Genesis chaos is NOT pneumatic in the pagan sense; it is responsive to God's Spirit alone.", "theology": "The first appearance of the Holy Spirit in Scripture is Gen 1:2 — hovering over the waters before creation. The Spirit is present at every major Old Testament beginning (creation, prophets, anointing of kings). The Spirit's role in the New Covenant (Acts 2) is the same: bringing life, ordering chaos, empowering the people of God.", "kingdom": "The Spirit hovering precedes the spoken word. Pattern: God's Spirit always moves over the chaos BEFORE the word that orders it. In your life, God's Spirit is present in your formless seasons before the word that brings clarity.", "cross": ["Gen 1:2", "Gen 2:7", "Gen 6:3", "Ezek 37:9-14", "John 3:8", "Acts 2:2"]}, "raqia": {"hebrew": "רָקִיעַ", "translit": "raqia", "strongs": "H7549", "root": "From raqa — to spread out, hammer flat (like a metalsmith pounding sheet metal)", "senses": ["An expanse or stretched-out space", "The sky / heavens as a vast spread-out place", "Often translated 'firmament' (KJV) from the Latin firmamentum, which implies a solid dome — the Hebrew is more neutral"], "visual": "Imagine a goldsmith hammering a sheet of metal until it spreads out thin and wide. The sky is described as that kind of stretched expanse.", "ane": "Ancient cosmologies (Egyptian, Babylonian) pictured the sky as a solid dome holding back cosmic waters. Job 37:18 echoes this ('hard as a molten mirror'). Genesis uses the language of its hearers without endorsing pagan cosmology — the point is theological, not scientific.", "translation_loss": "KJV 'firmament' suggests a SOLID dome (Latin firmamentum). The Hebrew raqia is more flexible — an expanse, a stretched-out region. Modern translations vary: 'expanse' (ESV, NASB), 'vault' (NIV), 'dome' (NRSV). The text is describing the appearance of the sky as ancient observers saw it, not making a cosmological claim.", "theology": "God SEPARATES waters above from waters below — establishing order through boundary. The raqia is where the sun, moon, and stars are placed (day 4) — making it the sky as we experience it.", "cross": ["Gen 1:6-8", "Ps 19:1", "Ezek 1:22-26", "Dan 12:3"]}, "yom": {"hebrew": "יוֹם", "translit": "yom", "strongs": "H3117", "root": "Day, period of time, age", "senses": ["A 24-hour day (Gen 1:5 — 'evening and morning')", "Daylight as opposed to night (Gen 1:5)", "A period of time / epoch (Gen 2:4 — 'in the day that the LORD God made the earth and the heavens')", "A specific occasion or time (Gen 15:18 — 'in that day')"], "visual": "Both the period of light vs. darkness AND a span of time. Hebrew uses ONE word for both senses.", "ane": "Ancient near eastern languages all had multi-sense words for time. Hebrew yom is no exception. Whether Gen 1's 'days' are 24-hour periods or epochs is debated among Bible-believing scholars. The text uses 'evening and morning' (suggesting 24-hour cycles) AND uses yom in Gen 2:4 for 'the entire creation period.'", "translation_loss": "English 'day' usually means a 24-hour day. Hebrew yom is broader. This is one of the most heated debates in Old Testament interpretation — Young Earth (24-hour days) vs. Day-Age (epochs) vs. Framework (literary structure) — all have textual support depending on which sense of yom is in view.", "theology": "The point of the creation week is NOT to dictate scientific timing but to establish the Sabbath pattern. Six days of work, one day of rest. The structure teaches us how to live, not how old the earth is.", "cross": ["Gen 1:5", "Gen 2:4", "Ps 90:4", "2 Pet 3:8"]}, "tselem": {"hebrew": "צֶלֶם", "translit": "tselem", "strongs": "H6754", "root": "Image, likeness, representation. Same root used elsewhere for IDOLS — physical representations of a god.", "senses": ["An image, statue, or physical representation (Num 33:52 — pagan idols)", "A representation that carries the authority of what it represents", "In Gen 1:26-27 — humanity as God's representative image-bearer"], "visual": "Ancient kings would set up STATUES of themselves in distant parts of their empire to remind people: this land is mine, I rule here. Tselem is that kind of image. The statue carried the king's authority.", "ane": "In ANE thought, gods made statues (tselem) and PLACED them in temples to represent the god's presence and authority in that place. The Genesis claim that HUMANS are God's tselem placed in the earth-as-temple is RADICAL. It says: humans are God's living statues. Every human is a walking representation of God's authority on earth.", "theology": "Every human bears God's image. This is the foundation of all human dignity. It is the reason murder is forbidden (Gen 9:6 — 'whoever sheds the blood of man, by man shall his blood be shed, for in the image of God He made man'). The image is not earned; it is inherent.", "kingdom": "You are God's tselem in your sphere of influence. Your job is the same as a royal statue's — to represent the King wherever He has placed you.", "cross": ["Gen 1:26-27", "Gen 5:1-3", "Gen 9:6", "Col 1:15 (Christ is THE image)", "Rom 8:29 (we are being conformed to the image)"]}, "demut": {"hebrew": "דְּמוּת", "translit": "demut", "strongs": "H1823", "root": "Likeness, similarity, pattern", "senses": ["Resemblance, likeness", "A model or pattern (the bronze altar in 2 Kings 16:10 was made after a 'pattern')", "Functional similarity, not just appearance"], "visual": "If tselem is 'image' (representation), demut is 'likeness' (similarity in nature/function). Together: humans are made AS God's representatives AND made to FUNCTION like Him.", "theology": "Tselem + demut together: humans are made not just as God's pictures but as God's FAMILY — Gen 5:1-3 echoes this exactly when Adam fathers Seth 'in his own likeness, after his image.' The parent-child resemblance language tells us the image-bearing is RELATIONAL, not just functional.", "cross": ["Gen 1:26", "Gen 5:1-3", "Ezek 1:5", "Rom 8:29"]}, "nachash": {"hebrew": "נָחָשׁ", "translit": "nachash", "strongs": "H5172 (verb) / H5175 (noun)", "root": "Triple root: serpent, shining one, enchanter/diviner", "senses": ["Snake — the literal slithering creature (most basic meaning)", "Shining/bright one — from the same root as 'nechoshet' (burnished bronze); ANE serpents were often depicted as gleaming supernatural beings", "Enchanter / diviner — the verb form means to practice divination, whisper a spell, observe omens (Gen 44:5, Num 23:23)", "Title for the Adversary — Revelation 12:9 identifies 'that ancient serpent' as Satan"], "visual": "Not a Disney snake. ANE iconography depicts serpents as gleaming, often winged, supernatural beings called seraphs (a word meaning 'burning ones' — see Isa 6:2-3 of the seraphim around God's throne). The Edenic nachash is likely a fallen one of these shining serpentine beings.", "ane": "Serpent symbolism in ANE: associated with wisdom (medical caduceus), with divine power (uraeus on Pharaoh's crown), with eternal life (snake shedding skin), AND with deception and chaos (Apophis the chaos-serpent in Egypt; Leviathan/Tiamat in Babylon). Genesis uses ALL these resonances and inverts them: the serpent who claims to offer wisdom and divine knowledge is in fact the chaos-deceiver.", "theology": "The nachash is not a random animal. He is identified throughout the rest of Scripture as a high-ranking spiritual being in rebellion against God — the same entity called Satan, the Devil, the Dragon, Lucifer. Revelation 12:9 makes this explicit: 'the great dragon, that ancient serpent, who is called the devil and Satan.'", "wordplay": "Gen 2:25 ends with humans being arummim (naked). Gen 3:1 opens with the nachash being arum (crafty). Same Hebrew root. The wordplay is intentional and devastating: humans were naked-vulnerable, the serpent was naked-crafty.", "translation_loss": "English 'serpent' captures only the snake meaning. The 'shining one' and 'enchanter' layers are invisible in translation. A young reader picturing a regular snake misses what the Hebrew text is showing.", "cross": ["Gen 3:1", "Num 21:8-9 (bronze serpent)", "Isa 14:12-15", "Ezek 28:11-19", "2 Cor 11:14", "Rev 12:9", "Rev 20:2"]}, "eivah": {"hebrew": "אֵיבָה", "translit": "eivah", "strongs": "H342", "root": "Enmity, hostility, hatred — the state of being enemies", "senses": ["Active hostility — the opposite of peace", "An entrenched, generational hatred", "Cosmic-scale opposition between two parties"], "visual": "Not just dislike — eivah is the kind of opposition that becomes a defining identity. The two parties cannot coexist; one must defeat the other.", "theology": "God Himself PLACES the eivah between the serpent's seed and the woman's seed. This is divinely instituted opposition. The cosmic war that started in heaven (pre-Genesis) is now established on earth between two lineages: those aligned with the deceiver and those aligned with the promised Deliverer. This eivah persists through the whole Bible.", "kingdom": "If you follow Christ, expect opposition. The eivah of Genesis 3:15 is the source of all spiritual warfare. The hostility is not personal — it is cosmic.", "cross": ["Gen 3:15", "Num 35:21-22", "Ezek 25:15", "Ezek 35:5", "Rom 8:7 ('the carnal mind is enmity against God')"]}, "zera": {"hebrew": "זֶרַע", "translit": "zera", "strongs": "H2233", "root": "Seed, offspring, descendants, semen", "senses": ["Agricultural seed — what is sown in the ground (Gen 1:11)", "Human/animal offspring — descendants, a child (Gen 4:25)", "A specific singular descendant — the messianic Seed (Gen 3:15, Gal 3:16)", "A collective lineage — all descendants of a person (Gen 12:7)"], "visual": "Both literal seed (grain, fruit pit, semen) and metaphorical 'seed' (offspring, lineage). Same word in Hebrew.", "theology": "Gen 3:15's 'seed of the woman' is one of the most freighted phrases in Scripture. Paul in Galatians 3:16 makes the case: God promised SEED (singular) — meaning Christ, specifically. The whole Bible from Gen 3:15 forward traces this Seed: through Seth, through Noah, through Abraham, through Isaac, through Jacob, through Judah, through David — and finally to Jesus.", "kingdom": "The Seed-line is the heart of the Bible's plot. Every major Old Testament narrative is asking: who is the seed? Who carries the promise? Genesis itself is structured around it — Cain or Seth? Ishmael or Isaac? Esau or Jacob? Joseph or Judah? The line narrows toward One.", "cross": ["Gen 3:15", "Gen 12:7", "Gen 22:18", "2 Sam 7:12", "Gal 3:16", "Rev 12:17"]}, "shuf": {"hebrew": "שׁוּף", "translit": "shuf", "strongs": "H7779", "root": "To bruise, crush, strike at", "senses": ["Crushing strike — what one foot does to a snake's head", "Striking at — what a snake does to a heel", "Used in three places: Gen 3:15 (both directions), Job 9:17 ('He bruises me with a tempest'), and Ps 139:11 ('the darkness shall bruise me')"], "visual": "The same Hebrew verb describes both the head-crush and the heel-strike, but the consequences are radically different. A heel-strike from a snake is painful but survivable. A head-crush ends the snake.", "theology": "The asymmetry is the gospel. Christ's heel is struck (the crucifixion). Satan's head is crushed (death and the grave defeated). Both happen at the same moment — the Cross. Romans 16:20 echoes: 'the God of peace will soon crush Satan under your feet.'", "cross": ["Gen 3:15", "Job 9:17", "Ps 139:11", "Rom 16:20", "Heb 2:14"]}, "qayin": {"hebrew": "קַיִן", "translit": "Qayin (Cain)", "strongs": "H7014", "root": "From qanah — to acquire, get, possess", "senses": ["His name means 'acquired one' or 'gotten one'", "Eve's wordplay: 'qaniti ish et YHWH' — 'I have acquired a man with/from YHWH'", "Some ancient translations (Targum Pseudo-Jonathan) read Eve as claiming she had birthed YHWH Himself — the promised Seed of 3:15. She was wrong, but the hope is there."], "theology": "Cain's name carries Eve's misplaced hope that he was the promised Deliverer. He turns out to be the opposite — the first murderer. This is the pattern of human striving to produce the Promised One by our own effort, which Genesis will continue to dismantle until the true Seed finally comes.", "cross": ["Gen 4:1", "Gen 4:25 (Eve names Seth as the REPLACEMENT seed)", "Heb 11:4", "1 John 3:12 ('Cain who was of the wicked one')"]}, "hevel": {"hebrew": "הֶבֶל", "translit": "Hevel (Abel)", "strongs": "H1893", "root": "Breath, vapor, vanity — that which is fleeting", "senses": ["Breath that you exhale and is gone", "Vapor / mist that quickly disappears", "Vanity / emptiness / futility — the most common metaphorical use", "The same Hebrew word translated 'vanity' 38 times in Ecclesiastes ('hevel havalim, hakol hevel' — 'vanity of vanities, all is vanity')"], "theology": "Abel's name foreshadows his fate. He is a breath that vanishes. His life is short. But the writer of Hebrews 11:4 says of him: 'through it he being dead still speaks.' The shortest life on record up to that point still speaks — because it was offered in faith.", "kingdom": "Length of life is not the measure of significance. Abel's life was a breath. But it still speaks. So might yours.", "cross": ["Gen 4:2", "Heb 11:4", "Heb 12:24 ('the blood of Abel')", "Ecclesiastes (whole book uses this word)"]}, "mincha": {"hebrew": "מִנְחָה", "translit": "mincha", "strongs": "H4503", "root": "Gift, present, offering, tribute", "senses": ["A gift presented to someone (Gen 32:13 — Jacob's gift to Esau)", "Tribute paid to a king (1 Sam 10:27, 2 Sam 8:6)", "A grain offering specifically in Levitical law (Lev 2:1-16)", "Any offering presented to God in Gen 4:3-5 (general sense)"], "theology": "Cain's offering is called mincha. Abel's offering is also called mincha (Gen 4:4). The category is the same; the contents and the heart differ. Mincha at root means GIFT. Both brothers brought a gift. One was acceptable, one was not — not because gifts are bad, but because of what was given and what was in the giver.", "cross": ["Gen 4:3-5", "Lev 2", "Mal 1:11", "Mal 3:8"]}, "bekorot": {"hebrew": "בְּכֹרוֹת", "translit": "bekorot (firstborn / firstlings)", "strongs": "H1062", "root": "From bekor — firstborn, the first to break the womb", "senses": ["Firstborn male of livestock — belongs to YHWH (Ex 13:2, 13:12)", "Firstborn human son — receives the double portion of inheritance (Deut 21:17)", "By extension, anything FIRST given — the best, the choicest"], "theology": "Abel gave the FIRSTBORN of his flock. The firstborn belongs to God in Levitical law before that law is even written. Abel is acting in accord with a principle that hasn't been codified yet — he knew, in faith, that the FIRST goes to God. Cain did not bring firstfruits.", "kingdom": "God always asks for the FIRST, not the leftovers. First of your time, first of your income, first of your day. The firstborn principle is one of the oldest patterns in Scripture and runs all the way to Christ as 'the firstborn of all creation' (Col 1:15) and 'the firstborn from the dead' (Col 1:18).", "cross": ["Gen 4:4", "Ex 13:2", "Lev 22:27", "Deut 12:17", "Col 1:15-18", "Heb 12:23"]}, "chelev": {"hebrew": "חֵלֶב", "translit": "chelev (fat)", "strongs": "H2459", "root": "Fat, the choicest portion", "senses": ["The fat of an animal — specifically the suet/fat around the kidneys and organs", "Metaphorically, the BEST part of anything (Num 18:12 — 'the best of the oil and the best of the wine')", "In Levitical law, the chelev belongs specifically to YHWH and is forbidden for human consumption (Lev 3:16-17, 7:23)"], "theology": "Abel brought the FIRSTBORN and the CHELEV — the parts that, under later Levitical law, would specifically belong to God. He was offering God what was God's by right. This is not casual giving. This is the BEST.", "kingdom": "What God claims as His own is non-negotiable. Your time, your firstfruits, your worship — these belong to Him. Give them generously and they multiply. Withhold them and you starve yourself.", "cross": ["Gen 4:4", "Lev 3:16-17", "Num 18:12", "Mal 3:8-10"]}, "chattat": {"hebrew": "חַטָּאת", "translit": "chattat", "strongs": "H2403", "root": "Sin, the missing of a mark, an offense, a sin-offering", "senses": ["Sin as an act — missing God's mark (the root chata means literally 'to miss the target')", "Sin as a condition — a chronic state of error", "A sin-offering — the sacrifice given to atone for sin (Lev 4)", "In Gen 4:7 — sin personified as a crouching beast"], "visual": "Imagine an archer shooting an arrow. Chata means 'missing the mark.' Sin is not just bad behavior — it is falling short of what we were designed for.", "theology": "Gen 4:7 is the FIRST use of chattat in the Bible. God personifies sin as a wild beast crouching at Cain's door. Sin is not abstract — it is alive, hungry, and waiting to consume. The same word means BOTH the act of sin AND the sacrifice that atones for it — the answer is built into the problem.", "cross": ["Gen 4:7", "Lev 4:3", "Lev 16:21", "Rom 6:23", "John 1:29 ('the Lamb of God who takes away the sin of the world')"]}, "rovetz": {"hebrew": "רֹבֵץ", "translit": "rovetz", "strongs": "H7257", "root": "Crouching, lying in wait, couching (especially of animals)", "senses": ["An animal lying down to rest (Gen 49:14, Ex 23:5)", "A predator crouched in ambush (Gen 4:7)", "A pack animal at rest (Gen 49:9, 14)"], "visual": "A lion or wolf or wild dog low to the ground, muscles coiled, eyes locked on the prey, ready to spring. This is how sin is described approaching Cain.", "theology": "Sin is not passive. It is HUNTING you. It crouches at your door. It waits for the moment you let your guard down. God's word to Cain is: do not let it through. Master it (mashal — rule it). You CAN do this. He has not stacked the deck against you.", "cross": ["Gen 4:7", "Gen 49:9", "Eph 6:11", "1 Pet 5:8 ('your adversary the devil walks about like a roaring lion seeking whom he may devour')"]}, "teshuqah": {"hebrew": "תְּשׁוּקָה", "translit": "teshuqah", "strongs": "H8669", "root": "Strong desire, longing, urge to possess or control", "senses": ["Strong desire / longing (Song of Songs 7:10)", "Urge to control or dominate (Gen 3:16 of the curse on the marriage relationship; Gen 4:7 of sin's desire toward Cain)"], "theology": "The word appears only THREE times in the Bible: twice in Genesis (3:16 and 4:7) and once in Song of Songs 7:10. In Song of Songs it is romantic longing. In Genesis it is the desire to CONTROL — and in BOTH Genesis uses it appears in a curse/warning context. Eve's teshuqah will be for her husband, and he will rule (mashal) her. Sin's teshuqah is for Cain, and he must rule (mashal) it. The exact same word pair.", "kingdom": "The teshuqah of broken relationships — wanting to control the other — is a curse pattern. The teshuqah of redeemed love (Song of Songs) is a delighting longing. The same urge can be cursed or redeemed depending on direction.", "cross": ["Gen 3:16", "Gen 4:7", "Song 7:10"]}, "kuttonet or": {"hebrew": "כָּתְנוֹת עוֹר", "translit": "kuttonet or", "strongs": "H3801 + H5785", "root": "kuttonet = tunic, garment; or = skin (animal hide)", "senses": ["Tunics made of animal skin", "First clothing in the Bible — provided by God Himself", "Marks the first death recorded in Scripture — an animal had to die for the covering"], "theology": "Adam and Eve tried to cover their shame with FIG LEAVES (Gen 3:7 — Hebrew: chagor, a temporary loincloth, woven of leaves). It didn't work. So God, with His own hands, replaces their leaves with garments of skin. Something had to DIE for them to be properly covered. This is the first sacrifice in the Bible. The pattern is set: human attempts to cover sin are insufficient; God provides a covering at the cost of death.", "kingdom": "The gospel pattern starts in Gen 3:21. You cannot cover your own shame. God Himself, at His own cost, provides the covering. The Cross is the same act on cosmic scale.", "cross": ["Gen 3:21", "Heb 9:22", "Rom 13:14 ('put on the Lord Jesus Christ')", "Gal 3:27"]}, "cherubim": {"hebrew": "כְּרוּבִים", "translit": "cherubim (plural of cherub)", "strongs": "H3742", "root": "Cherub — a class of heavenly being", "senses": ["Powerful angelic guardians", "First mentioned guarding the way to the tree of life (Gen 3:24)", "Carved on the ark of the covenant (Ex 25:18-20)", "Described in detail by Ezekiel (Ezek 1, 10) as four-faced multi-winged beings"], "visual": "Not the chubby baby angels of Renaissance art. The biblical cherubim are powerful guardians, often described with multiple faces (lion, ox, eagle, human) and multiple wings. They flank God's throne and guard sacred space.", "theology": "Cherubim first appear guarding the way BACK to the tree of life — closing access to fallen humanity until the way is reopened. In the tabernacle and temple, cherubim are carved over the ark of the covenant — exactly the same iconographic role, guardians of God's presence. The cherubim represent the inaccessibility of holiness without atonement. The way back, in Christ, is opened.", "cross": ["Gen 3:24", "Ex 25:18-20", "Ezek 1:5-14", "Ezek 28:14 (the king of Tyre / fallen cherub)", "Rev 4:6-8"]}, "ot": {"hebrew": "אוֹת", "translit": "ot (sign, mark)", "strongs": "H226", "root": "Sign, mark, token, miracle", "senses": ["A physical marker (the rainbow as the sign of the Noahic covenant, Gen 9:13)", "A miracle that confirms God's word (Ex 4:8)", "A protective marker (the mark of Cain, Gen 4:15)", "A covenantal symbol (Sabbath as a sign, Ex 31:13)"], "theology": "The 'mark of Cain' is an OT — the same word used for the rainbow and the Sabbath. It is a COVENANT-style protective sign. It says nothing about skin color, nothing about race, nothing about curse. It is God's GRACE keeping a murderer alive. The misuse of this verse to justify racism is one of the most disastrous misreadings in the history of biblical interpretation, and it has no basis in the text.", "cross": ["Gen 4:15", "Gen 9:13 (rainbow)", "Ex 4:8 (signs of Moses)", "Ex 31:13 (Sabbath)"]}, "kinnor": {"hebrew": "כִּנּוֹר", "translit": "kinnor", "strongs": "H3658", "root": "Stringed instrument — lyre or harp", "senses": ["A small lyre or harp held in the hands", "First instrument named in the Bible (Gen 4:21)", "King David's primary instrument (1 Sam 16:23)", "Used in praise and prophecy (1 Sam 10:5, Ps 33:2)"], "visual": "Not a large concert harp. A kinnor was a small portable lyre, played by hand or with a pick, usually with 8-10 strings. Light enough to carry. Loud enough to lead worship.", "ane": "The kinnor was the everyday string instrument of the ancient Near East. Israelite, Egyptian, and Mesopotamian art all depict similar instruments. Music was woven into work, war, worship, and celebration.", "kingdom": "The first musician in the Bible is Jubal (Gen 4:21), born into Cain's line. Music starts in a fallen lineage — but it doesn't stay there. David uses the kinnor to drive away evil spirits (1 Sam 16:23). The temple psalms are full of it. Music itself is sacred even when its origins were broken.", "cross": ["Gen 4:21", "1 Sam 16:23", "Ps 33:2", "Ps 150:3"]}, "ugab": {"hebrew": "עוּגָב", "translit": "ugab", "strongs": "H5748", "root": "Pipe / flute — a wind instrument", "senses": ["A wind instrument, possibly a flute or panpipe", "Mentioned only 4 times in OT (Gen 4:21, Job 21:12, Job 30:31, Ps 150:4)", "Paired with kinnor as the two original instruments"], "theology": "Jubal is father of all who play kinnor AND ugab — strings AND winds. The two basic instrumental families are both named in Gen 4:21. Music in its full breadth was born early in human history.", "cross": ["Gen 4:21", "Job 21:12", "Ps 150:4"]}, "enosh": {"hebrew": "אֱנוֹשׁ", "translit": "Enosh", "strongs": "H583 (proper name) / H582 (common word)", "root": "Mortal man, frail human — emphasizing weakness and mortality", "senses": ["As a proper name: Seth's son, Adam's grandson (Gen 4:26)", "As a common Hebrew word: weak/frail/mortal man (Ps 8:4, 'what is man (enosh) that you are mindful of him?')", "Contrasted with 'gever' (strong man) and 'ish' (man as individual)"], "theology": "Enosh literally means 'frail mortal.' His birth is followed by the line: 'At that time men began to call on the name of YHWH.' Public worship of YHWH starts with the FRAIL ones. Not the heroes. Not the kings. The frail mortals know they need Him. This is the heartbeat of biblical faith: blessed are those who recognize their need.", "kingdom": "If you feel weak today, you are in the line of Enosh. The people who call on YHWH in the Bible are not the strong — they are the ones who know they are dust and breath. Call on His name from there.", "cross": ["Gen 4:26", "Ps 8:4", "Joel 2:32 ('whoever calls on the name of YHWH shall be saved')", "Rom 10:13"]}};
  if(window.DEFINITIONS){
    for(const k in NEW_DEFS){
      window.DEFINITIONS[k] = NEW_DEFS[k];
      window.DEFINITIONS[k.toLowerCase()] = NEW_DEFS[k];
    }
    console.log('Genesis 1-4 deep build: '+Object.keys(NEW_DEFS).length+' new deep definitions added');
  }
  // Merge Exodus 1-2 deep definitions
  if(window.DEFINITIONS && window.EXODUS_DEFINITIONS){
    for(const k in window.EXODUS_DEFINITIONS){
      window.DEFINITIONS[k] = window.EXODUS_DEFINITIONS[k];
      window.DEFINITIONS[k.toLowerCase()] = window.EXODUS_DEFINITIONS[k];
    }
    console.log('Exodus 1-2 deep build: '+Object.keys(window.EXODUS_DEFINITIONS).length+' new deep definitions added');
  }
  // Merge Exodus 3-4 deep build into Exodus structures
  if(window.EXODUS_PLOT_PANELS && window.EXODUS34_PLOT_PANELS){
    for(const k in window.EXODUS34_PLOT_PANELS) window.EXODUS_PLOT_PANELS[k] = window.EXODUS34_PLOT_PANELS[k];
  }
  if(window.EXODUS_HEARTBEAT_CALLOUTS && window.EXODUS34_HEARTBEAT){
    for(const k in window.EXODUS34_HEARTBEAT) window.EXODUS_HEARTBEAT_CALLOUTS[k] = window.EXODUS34_HEARTBEAT[k];
  }
  if(window.EXODUS_CULTURE_BOXES && window.EXODUS34_CULTURE){
    for(const k in window.EXODUS34_CULTURE) window.EXODUS_CULTURE_BOXES[k] = window.EXODUS34_CULTURE[k];
  }
  if(window.EXODUS_AMP_STYLE && window.EXODUS34_AMP_STYLE){
    for(const k in window.EXODUS34_AMP_STYLE) window.EXODUS_AMP_STYLE[k] = window.EXODUS34_AMP_STYLE[k];
  }
  if(window.DEFINITIONS && window.EXODUS34_DEFINITIONS){
    for(const k in window.EXODUS34_DEFINITIONS){
      window.DEFINITIONS[k] = window.EXODUS34_DEFINITIONS[k];
      window.DEFINITIONS[k.toLowerCase()] = window.EXODUS34_DEFINITIONS[k];
    }
    console.log('Exodus 3-4 deep build: '+Object.keys(window.EXODUS34_DEFINITIONS).length+' new deep definitions added');
  }
  // Merge Exodus 5-7 deep build
  if(window.EXODUS_PLOT_PANELS && window.EXODUS57_PLOT_PANELS){
    for(const k in window.EXODUS57_PLOT_PANELS) window.EXODUS_PLOT_PANELS[k] = window.EXODUS57_PLOT_PANELS[k];
  }
  if(window.EXODUS_HEARTBEAT_CALLOUTS && window.EXODUS57_HEARTBEAT){
    for(const k in window.EXODUS57_HEARTBEAT) window.EXODUS_HEARTBEAT_CALLOUTS[k] = window.EXODUS57_HEARTBEAT[k];
  }
  if(window.EXODUS_CULTURE_BOXES && window.EXODUS57_CULTURE){
    for(const k in window.EXODUS57_CULTURE) window.EXODUS_CULTURE_BOXES[k] = window.EXODUS57_CULTURE[k];
  }
  if(window.EXODUS_AMP_STYLE && window.EXODUS57_AMP_STYLE){
    for(const k in window.EXODUS57_AMP_STYLE) window.EXODUS_AMP_STYLE[k] = window.EXODUS57_AMP_STYLE[k];
  }
  if(window.DEFINITIONS && window.EXODUS57_DEFINITIONS){
    for(const k in window.EXODUS57_DEFINITIONS){
      window.DEFINITIONS[k] = window.EXODUS57_DEFINITIONS[k];
      window.DEFINITIONS[k.toLowerCase()] = window.EXODUS57_DEFINITIONS[k];
    }
    console.log('Exodus 5-7 deep build: '+Object.keys(window.EXODUS57_DEFINITIONS).length+' new deep definitions added');
  }
  // Merge Exodus 8-12 deep build
  if(window.EXODUS_PLOT_PANELS && window.EXODUS812_PLOT_PANELS){
    for(const k in window.EXODUS812_PLOT_PANELS) window.EXODUS_PLOT_PANELS[k] = window.EXODUS812_PLOT_PANELS[k];
  }
  if(window.EXODUS_HEARTBEAT_CALLOUTS && window.EXODUS812_HEARTBEAT){
    for(const k in window.EXODUS812_HEARTBEAT) window.EXODUS_HEARTBEAT_CALLOUTS[k] = window.EXODUS812_HEARTBEAT[k];
  }
  if(window.EXODUS_CULTURE_BOXES && window.EXODUS812_CULTURE){
    for(const k in window.EXODUS812_CULTURE) window.EXODUS_CULTURE_BOXES[k] = window.EXODUS812_CULTURE[k];
  }
  if(window.EXODUS_AMP_STYLE && window.EXODUS812_AMP_STYLE){
    for(const k in window.EXODUS812_AMP_STYLE) window.EXODUS_AMP_STYLE[k] = window.EXODUS812_AMP_STYLE[k];
  }
  if(window.DEFINITIONS && window.EXODUS812_DEFINITIONS){
    for(const k in window.EXODUS812_DEFINITIONS){
      window.DEFINITIONS[k] = window.EXODUS812_DEFINITIONS[k];
      window.DEFINITIONS[k.toLowerCase()] = window.EXODUS812_DEFINITIONS[k];
    }
    console.log('Exodus 8-12 deep build: '+Object.keys(window.EXODUS812_DEFINITIONS).length+' new deep definitions added');
  }
})();

function renderGen14Enrichments(ch, verseNum){
  const book = window.currentBook || 'Genesis';
  // Pick data sources by book
  let PRE_HISTORY_DATA, PLOT_PANELS_DATA, HEARTBEAT_DATA, CULTURE_DATA, AMP_DATA, deepRange;
  if(book === 'Genesis'){
    PRE_HISTORY_DATA = window.PRE_HISTORY;
    PLOT_PANELS_DATA = window.PLOT_PANELS;
    HEARTBEAT_DATA   = window.HEARTBEAT_CALLOUTS;
    CULTURE_DATA     = window.CULTURE_BOXES_DEEP;
    AMP_DATA         = window.AMP_STYLE;
    deepRange = {min:1, max:4};
  } else if(book === 'Exodus'){
    PRE_HISTORY_DATA = window.EXODUS_PRE_HISTORY;
    PLOT_PANELS_DATA = window.EXODUS_PLOT_PANELS;
    HEARTBEAT_DATA   = window.EXODUS_HEARTBEAT_CALLOUTS;
    CULTURE_DATA     = window.EXODUS_CULTURE_BOXES;
    AMP_DATA         = window.EXODUS_AMP_STYLE;
    deepRange = {min:1, max:12};
  } else {
    return ''; // No deep layer yet for other books
  }
  if(ch > deepRange.max || ch < deepRange.min) return '';
  
  let h='';
  
  // Check for AMP-style text
  const ampRanges = Object.keys(AMP_DATA || {}).filter(k => {
    const m = k.match(/^(\d+):(\d+)(?:-(\d+))?$/);
    if(!m || parseInt(m[1]) !== ch) return false;
    const lo = parseInt(m[2]), hi = m[3] ? parseInt(m[3]) : lo;
    return verseNum >= lo && verseNum <= hi;
  });
  for(const k of ampRanges){
    const a = AMP_DATA[k];
    const m = k.match(/^(\d+):(\d+)/);
    if(parseInt(m[2]) !== verseNum) continue;
    h += '<div class="amp-text">';
    h += '<div style="font-size:11px;color:var(--strongs);font-weight:700;letter-spacing:0.05em;margin-bottom:8px;">AMP-STYLE — HEBREW-AUDITED RENDERING ('+book+' '+k+')</div>';
    const text = a.text.replace(/\[([^\]]+)\]/g, '<span style="color:var(--gold);font-style:italic;font-size:13px;">[$1]</span>');
    h += '<div class="amp-text-content">'+text+'</div>';
    if(a.audit) h += '<div class="amp-audit"><b>Audit:</b> '+a.audit+'</div>';
    h += '</div>';
  }
  
  // Plot panels — render at end of scene
  const plotKeys = Object.keys(PLOT_PANELS_DATA || {}).filter(k => {
    const m = k.match(/^(\d+):(\d+)(?:-(\d+))?$/);
    if(!m || parseInt(m[1]) !== ch) return false;
    const lo = parseInt(m[2]), hi = m[3] ? parseInt(m[3]) : lo;
    return verseNum === hi;
  });
  for(const k of plotKeys){
    const p = PLOT_PANELS_DATA[k];
    h += '<div class="plot-panel">';
    h += '<h4>'+p.scene+' ('+k+')</h4>';
    h += '<div class="plot-plain">'+p.plain+'</div>';
    if(p.why_it_matters) h += '<div class="plot-why">'+p.why_it_matters+'</div>';
    h += '</div>';
  }
  
  // Heartbeat
  const hbKeys = Object.keys(HEARTBEAT_DATA || {}).filter(k => {
    const m = k.match(/^(\d+):(\d+)(?:-(\d+))?$/);
    if(!m || parseInt(m[1]) !== ch) return false;
    const lo = parseInt(m[2]), hi = m[3] ? parseInt(m[3]) : lo;
    return verseNum >= lo && verseNum <= hi && verseNum === hi;
  });
  for(const k of hbKeys){
    const hb = HEARTBEAT_DATA[k];
    h += '<div class="heartbeat-callout">';
    h += '<h4>♥ '+hb.title+'</h4>';
    h += '<div class="heartbeat-body">'+hb.body+'</div>';
    if(hb.rule) h += '<div class="heartbeat-rule">'+hb.rule+'</div>';
    h += '</div>';
  }
  
  // Culture boxes
  const cbKeys = Object.keys(CULTURE_DATA || {}).filter(k => {
    const cb = CULTURE_DATA[k];
    if(cb.chapter !== ch) return false;
    const m = cb.verses.match(/^(\d+)(?:-(\d+))?$/);
    if(!m) return false;
    const hi = m[2] ? parseInt(m[2]) : parseInt(m[1]);
    return verseNum === hi;
  });
  for(const k of cbKeys){
    const cb = CULTURE_DATA[k];
    h += '<div class="culture-box-deep">';
    h += '<h4>✎ CULTURE: '+cb.title+'</h4>';
    h += '<div class="culture-body">'+cb.body+'</div>';
    if(cb.sources) h += '<div class="culture-sources"><b>Sources:</b> '+cb.sources+'</div>';
    h += '</div>';
  }
  
  return h;
}

