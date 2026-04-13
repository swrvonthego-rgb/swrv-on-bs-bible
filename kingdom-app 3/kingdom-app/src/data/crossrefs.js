// SWRV Kingdom Historical Bible Study Library
// Cross-reference map — cleaned, verified, and doctrinally sound
// Philo REMOVED entirely — imposed Greek Platonism onto Hebrew text
// Jewish Annotated NT commentary REMOVED — editors do not affirm Jesus as Messiah
//
// HOW EACH SOURCE IS READ:
// tanakh       — Hebrew Masoretic text. Original covenant language. Always the baseline for OT.
// lxx          — Septuagint (Brenton 1851). Greek OT used by NT writers. Flag every place it
//                differs from the Hebrew and explain why. NT writers quoting OT almost always
//                quote from the LXX — that is not an accident, it is the Holy Spirit.
// amplified    — Amplified Study Bible (Zondervan/Lockman 2015). Used to unpack the full
//                range of meaning in the Greek and Hebrew. Not a replacement for the original
//                languages — a tool to reveal what a single English word is carrying.
// chronological— NKJV Chronological Study Bible (Thomas Nelson). Spirit-breathed translation.
//                Primary NT source. Cross-reference with LXX when NT writers quote the OT.
// enoch        — Book of Enoch (Jay Winter, Standard English, trans. from Ethiopic). Not
//                Scripture. Used to illuminate Second Temple Jewish worldview — what the
//                original audience already believed when they read Genesis 1-11 and Daniel.
// dss          — Dead Sea Scrolls (García Martínez). Confirms what the Qumran community
//                understood. Use for textual confirmation and worldview context only.
// josephus     — Complete Works of Josephus (Whiston). Eyewitness Jewish historian, not a
//                believer in Jesus. Cite for historical facts, geography, and cultural record
//                only — never for theology.
// zondervan    — Zondervan Illustrated Bible Dictionary (Douglas/Tenney/Silva). Used for
//                Hebrew and Greek word studies, cultural background, ANE context, and
//                identifying where tradition has obscured the text. The dictionary illuminates
//                Scripture — it does not interpret it. Scripture is always final authority.
//
// Sources: tanakh, enoch, dss, amplified, chronological, lxx, josephus, zondervan

export const CROSS_REFS = {

  // ── Genesis 1 — Creation ────────────────────────────────────────────────
  "GEN.1": [
    { source: "enoch", ref: "Enoch 2-5", note: "Enoch's meditation on the order of creation — the sun, moon, stars, and seasons all obey God perfectly. Everything in creation submits to its Creator. This is the context for why human rebellion in Genesis 3 is so catastrophic." },
    { source: "enoch", ref: "Enoch 69:16-25", note: "The oath by which heaven and earth were established — the covenant of creation itself. Shows Second Temple Jews understood creation as a binding covenant between God and the physical world." },
    { source: "lxx", ref: "LXX Genesis 1:1-2", note: "The Septuagint reads 'the earth was invisible and unformed' where Hebrew says tohu wabohu (formless and empty). Both confirm a physical creation — God bringing order out of chaos, not creating an abstract spiritual realm." },
    { source: "dss", ref: "DSS: Hymn Scroll 1QH 9", note: "The Dead Sea community's hymn of creation — praises God for making the physical world with purpose and design. Confirms the Second Temple Jewish understanding of Genesis 1 as literal physical creation." },
    { source: "josephus", ref: "Josephus: Antiquities 1.1.1", note: "Josephus records creation as a straightforward historical account — light on the first day, firmament on the second, dry land on the third, through six days. He is recording what Jewish tradition held as literal history, not allegory." },
    { source: "zondervan", ref: "Zondervan: Creation, Bara, Tohu Wabohu", note: "Dictionary entries on the Hebrew bara (create from nothing, always used of God's direct action), and tohu wabohu — confirming the physical, tangible nature of what God made." },
    { source: "amplified", ref: "Amplified Genesis 1:1-2", note: "The Amplified unpacks Elohim — the plural intensive name for God that hints at the complex unity within the Godhead, active and present from the beginning. 'Bara' is amplified as creating something entirely new out of nothing. The Spirit 'hovering' (rachaph) is expanded as brooding over, moving dynamically — God's active presence over the unformed creation before the first word was spoken." },
  ],

  // ── Genesis 2 — Adam, Garden, Royal Priesthood ──────────────────────────
  "GEN.2": [
    { source: "lxx", ref: "LXX Genesis 2:15", note: "LXX translates Adam's assignment as 'to work and to keep' — the exact same two Hebrew words (abad and shamar) used in Numbers 3:7-8 to describe the Levitical priests serving and guarding the Tabernacle. Adam was the first priest of the first temple." },
    { source: "enoch", ref: "Enoch 24-25", note: "Enoch's vision of the holy mountain and the tree of life — places Eden on a sacred mountain sanctuary, confirming the ancient understanding that the Garden was a temple. The tree of life is reserved for the righteous in the age to come." },
    { source: "dss", ref: "DSS: Jubilees 3:9-14", note: "Jubilees — a Second Temple text found at Qumran — explicitly describes Eden as a holy sanctuary and Adam as its first priestly servant. This understanding was widespread in the world Jesus walked in." },
    { source: "josephus", ref: "Josephus: Antiquities 1.1.2", note: "Josephus records that God gave Adam dominion over every living creature and command over the earth. He documents the naming of the animals and the formation of Eve from Adam's side — consistent with the Genesis account." },
    { source: "zondervan", ref: "Zondervan: Adam, Image of God, Tselem", note: "The Hebrew tselem (image) was used in ancient Near Eastern cultures for a king's statue placed in a conquered territory to represent his authority. Adam as tselem means he was God's royal representative on earth." },
    { source: "amplified", ref: "Amplified Genesis 2:7, 15", note: "The Amplified expands 'breathed into his nostrils the breath of life' — the Hebrew neshamah is not just biological breath but the divine life-breath that makes humans uniquely alive in God's image. 'Abad and shamar' (work and keep) are amplified as serve and protect — the same language used for priestly service, confirming Adam's role was liturgical before it was agricultural." },
  ],

  // ── Genesis 3 — The Fall ────────────────────────────────────────────────
  "GEN.3": [
    { source: "enoch", ref: "Enoch 69:6", note: "Enoch names the entity who approached Eve — Gadreel, one of the Watchers, who led humanity astray and taught the instruments of death. The serpent in Genesis 3 was not just an animal. This was a supernatural being with an agenda against God's kingdom." },
    { source: "lxx", ref: "LXX Genesis 3:15", note: "The Protoevangelion — the first gospel. God promises enmity between the serpent's seed and the woman's seed. The LXX is important here because NT writers quoted it: 'He will watch your head and you will watch his heel' — the first prophecy of Christ crushing the enemy." },
    { source: "dss", ref: "DSS: 4Q422", note: "Qumran paraphrase of Genesis 1-3 — shows how the Second Temple community understood the Fall as a cosmic event, not merely a personal moral failure. Adam's failure had kingdom-wide consequences." },
    { source: "josephus", ref: "Josephus: Antiquities 1.1.4", note: "Josephus records the serpent as an actual entity that spoke to Eve and led her to eat the forbidden fruit. He documents the curse — the serpent condemned to move on its belly, Adam to labor, Eve to pain in childbirth. He records the expulsion from the garden." },
    { source: "zondervan", ref: "Zondervan: Serpent, Nachash, Satan", note: "The Hebrew nachash connects to shining/brightness — consistent with the 'angel of light' language Paul uses in 2 Corinthians 11:14. The Zondervan entry traces the serpent's identity through Scripture." },
    { source: "amplified", ref: "Amplified Genesis 3:15", note: "The Amplified expands the protoevangelion — the first gospel. 'He will bruise your head' is amplified with the note that this is a fatal, crushing blow to Satan's authority; 'you will bruise his heel' is a temporary, painful wound. The Amplified makes explicit what the Hebrew contains: this is the first announcement of the Messiah's ultimate victory over the serpent." },
  ],

  // ── Genesis 6 — The Watchers / Nephilim ─────────────────────────────────
  "GEN.6": [
    { source: "enoch", ref: "Enoch 6-16", note: "The most important parallel in the entire library. Enoch gives the full account: 200 angelic Watchers led by Semyaza descend on Mount Hermon, take human wives, produce Nephilim giants, and teach forbidden knowledge — weapons, sorcery, divination. This is the reason for the flood. Not just human sin — a supernatural corruption of the created order." },
    { source: "enoch", ref: "Enoch 86-88", note: "The Animal Apocalypse retells Genesis 6 as fallen stars descending to earth. Confirms the supernatural reading was the standard interpretation among Second Temple Jews." },
    { source: "dss", ref: "DSS: Book of Giants 4Q531", note: "The Dead Sea Scrolls contain an entire lost Book of Giants — the Nephilim's own dreams, their violence, their awareness of coming judgment. This text was widely read at Qumran alongside Genesis." },
    { source: "dss", ref: "DSS: Damascus Document CD 2:17-19", note: "The Qumran community cited the Watchers as the premier example of those who fell — used as a warning to their own members. Shows Genesis 6 was not controversial to understand supernaturally." },
    { source: "lxx", ref: "LXX Genesis 6:2", note: "The Septuagint reads 'angels of God' not 'sons of God' — the Jewish scholars who translated the Hebrew into Greek understood these as supernatural beings, not human kings or righteous men." },
    { source: "josephus", ref: "Josephus: Antiquities 1.3.1", note: "Josephus records that angels descended and had children by women, and that their offspring were violent and arrogant. He records this as historical fact — the same account Genesis 6 gives, without softening or spiritualizing it." },
    { source: "chronological", ref: "Jude 1:6, 2 Peter 2:4", note: "Two New Testament writers — Jude and Peter — directly reference the angels who left their proper dwelling and the judgment that followed. They treat the Watcher story as settled history, not allegory. The NT assumes you know Genesis 6 the way Enoch explains it." },
    { source: "amplified", ref: "Amplified Genesis 6:2, 4", note: "The Amplified Study Bible notes on 'sons of God' acknowledge the supernatural interpretation — angelic beings who crossed the boundary between the divine and human realms. The Nephilim are amplified as fallen ones, giants, men of violence and renown. The Amplified does not flatten this into a merely human story — it preserves the cosmic dimension that makes the flood judgment necessary." },
  ],

  // ── Genesis 14 — Melchizedek ─────────────────────────────────────────────
  "GEN.14": [
    { source: "dss", ref: "DSS: 11QMelchizedek", note: "One of the most significant Dead Sea Scrolls texts. Melchizedek is portrayed as a heavenly figure — a divine being who will execute God's judgment and bring atonement for the sons of light in the last days. This is the background to Hebrews 5-7, not Greek philosophy." },
    { source: "lxx", ref: "LXX Genesis 14:18-20", note: "LXX preserves the text closely — priest of El Elyon (God Most High). This title is significant: Melchizedek served the same God Abraham served, confirming he was not a pagan priest but a servant of the one true God." },
    { source: "chronological", ref: "Hebrews 5-7", note: "The author of Hebrews builds an entire argument around Melchizedek's priesthood being greater than Aaron's — using Psalm 110:4. This argument only makes full sense when you understand what the DSS Melchizedek scroll shows about what Second Temple Jews believed about him." },
    { source: "josephus", ref: "Josephus: Antiquities 1.10.2", note: "Josephus records Melchizedek as a Canaanite chief who was righteous and who first built a temple in Jerusalem, calling the city formerly Solyma. He records Abraham paying tithes to him and receiving his blessing — consistent with Genesis 14." },
    { source: "zondervan", ref: "Zondervan: Melchizedek, Salem, El Elyon", note: "Dictionary entries connecting Melchizedek to Jerusalem (Salem), confirming the priestly-royal combination of his office, and the significance of Psalm 110:4 in NT theology." },
    { source: "amplified", ref: "Amplified Genesis 14:18-20", note: "The Amplified expands Melchizedek as king of righteousness and king of peace — both titles that Hebrews applies directly to Jesus. 'Priest of God Most High' is noted as a unique, non-Levitical priesthood that predates and supersedes Aaron's line. The tithe Abraham paid is amplified as a voluntary act of recognition — Abraham acknowledged Melchizedek's authority as higher than his own." },
  ],

  // ── Exodus 20 — The Ten Commandments ────────────────────────────────────
  "EXO.20": [
    { source: "lxx", ref: "LXX Exodus 20", note: "The order of commandments in the Septuagint differs slightly from the Hebrew Masoretic text — this is why Catholic and Protestant Bibles number them differently today. Not a contradiction, but a textual variant that explains centuries of confusion." },
    { source: "dss", ref: "DSS: Nash Papyrus", note: "One of the oldest known Hebrew manuscripts ever found — contains the Decalogue and the Shema together. Confirms these two texts were paired in Jewish liturgy long before Jesus." },
    { source: "josephus", ref: "Josephus: Antiquities 3.5.4-6", note: "Josephus records the giving of the Ten Commandments at Sinai — the thunder, the trumpet, the cloud on the mountain, Moses ascending, the people standing at a distance in fear. He documents the physical setting and the sequence of events as historical record." },
    { source: "zondervan", ref: "Zondervan: Ten Commandments, Covenant", note: "The commandments are a covenant treaty document — structured exactly like ancient Near Eastern suzerainty treaties between a king and his vassal people. God is the sovereign king; Israel is the covenant people." },
    { source: "amplified", ref: "Amplified Exodus 20:1-17", note: "The Amplified prefaces the commandments with the full weight of who is speaking: 'I am the LORD your God who brought you out of Egypt, out of the house of slavery' — amplified to show this is not a generic deity but the specific God who acted historically to redeem this specific people. The commands are covenant obligations of a redeemed people, not requirements to earn redemption." },
  ],

  // ── Deuteronomy 6 — The Shema ────────────────────────────────────────────
  "DEU.6": [
    { source: "dss", ref: "DSS: 4QDeuteronomy", note: "Dead Sea Scrolls version of Deuteronomy shows textual variants in the most sacred Jewish prayer — confirming the text was actively copied and meditated on by the Qumran community as living covenant language." },
    { source: "lxx", ref: "LXX Deuteronomy 6:4", note: "LXX reads 'The Lord our God is one Lord' — the Greek translation that Greek-speaking Jews and early Christians prayed from. The oneness of God is the foundation of everything that follows in Scripture." },
    { source: "chronological", ref: "Mark 12:29-30", note: "Jesus quotes the Shema as the greatest commandment — in a debate with scribes who agreed with him. His entire identity and mission are built on the foundation that Israel's God is the one true God and King." },
    { source: "josephus", ref: "Josephus: Against Apion 2.190", note: "Josephus documents that Jewish law required daily recitation of the Shema — morning and evening — and that this declaration of God's oneness was central to Jewish daily life in the first century. It was not an abstract doctrine but a daily practice." },
    { source: "amplified", ref: "Amplified Deuteronomy 6:4-5", note: "The Amplified unpacks the Shema in full — 'Hear, O Israel: the LORD our God is one LORD' is amplified to show that this oneness (echad) is the same word used in Genesis 2:24 where husband and wife become 'one' flesh — a compound unity, not a mathematical singularity. Loving God with all your heart, soul, and strength is amplified as every capacity of your entire being — intellectual, emotional, physical, spiritual." },
  ],

  // ── Job 1 — The Divine Council ───────────────────────────────────────────
  "JOB.1": [
    { source: "lxx", ref: "LXX Job 1:6", note: "The LXX uses 'angels of God' where Hebrew says 'sons of God' (bene elohim) — confirming the divine council was understood as a real assembly of supernatural beings presenting themselves before God." },
    { source: "enoch", ref: "Enoch 40:7", note: "Enoch's vision of four presences before the throne of God includes one whose role is to accuse those who dwell on earth. The accuser in Job 1 is not a metaphor — he is a real being with a real role in the heavenly court." },
    { source: "dss", ref: "DSS: 11QJob", note: "The Dead Sea Scrolls Targum of Job — the Aramaic translation shows how Second Temple Jews read this text. The divine council scene was taken literally." },
    { source: "zondervan", ref: "Zondervan: Satan, Accuser, Divine Council", note: "The Hebrew word satan means 'accuser' or 'adversary' — in Job 1 it functions as a title describing his role in the divine court. By the New Testament it becomes his proper name because accusation defines his entire existence." },
    { source: "amplified", ref: "Amplified Job 1:6-12", note: "The Amplified expands the divine council scene — 'the sons of God presented themselves before the LORD' is noted as angelic beings, not humans. The Adversary's challenge is amplified: 'Does Job fear God for nothing?' — the oldest attack in existence: claiming that human faithfulness is always transactional. God's response demonstrates that genuine covenant love can withstand every test the Adversary can bring." },
  ],

  // ── Psalm 82 — The Divine Council Judgment ───────────────────────────────
  "PSA.82": [
    { source: "dss", ref: "DSS: 4Q82", note: "Dead Sea Scrolls fragment confirms the divine council reading — the Most High presiding over an assembly of divine beings who were given authority over the nations and failed in their assignment." },
    { source: "lxx", ref: "LXX Psalm 81", note: "The Septuagint reads 'gods' (theoi) — the Jewish translators who knew Hebrew best did not soften this into a metaphor. They understood that God judged real divine beings who had corrupted their stewardship of the nations." },
    { source: "enoch", ref: "Enoch 14-16", note: "Enoch's throne room vision — the Most High on his fiery throne, the divine assembly around him. This is the same scene Psalm 82 describes. The divine council was not a new idea — it was the consistent picture of heaven throughout the entire Hebrew tradition." },
    { source: "chronological", ref: "John 10:34-36", note: "Jesus quotes Psalm 82:6 directly — 'I said you are gods' — as his defense against the charge of blasphemy. He is not saying all humans are divine. He is making a legal argument from the divine council text to establish that a being sent by God can legitimately carry the title of Son of God." },
    { source: "zondervan", ref: "Zondervan: Elohim, Divine Council, Nations", note: "The Zondervan entry on elohim explains that the word is used in Scripture for multiple categories of beings — the Most High God, lesser divine beings, and occasionally human judges. Context determines which." },
    { source: "amplified", ref: "Amplified Psalm 82:1-8", note: "The Amplified expands 'God stands in the divine assembly' — the word assembly (edah) is a legal term for a formal gathering with judicial authority. God is the judge presiding over the judges. The amplification of 'you are gods' (elohim) includes the note that these are divine beings who were given authority — authority they abused. The Psalm ends with a call for God to judge the earth — which Jesus used as his framework in John 10." },
  ],

  // ── Isaiah 7:14 — The Sign of Immanuel ──────────────────────────────────
  "ISA.7": [
    { source: "lxx", ref: "LXX Isaiah 7:14", note: "The Septuagint translates almah as parthenos (virgin) — this was not a mistranslation. The Jewish scholars who translated the Hebrew into Greek centuries before Christ understood this passage carried a deeper meaning beyond its immediate historical context. Matthew quotes this version because the Holy Spirit had already prepared the translation." },
    { source: "tanakh", ref: "JPS Isaiah 7:14", note: "The JPS translates almah as 'young woman' — the word's base meaning. But Scripture regularly has near and far fulfillments. The immediate sign was for Ahaz in his day. The ultimate fulfillment was the virgin birth of Yeshua, which the LXX translation points toward." },
    { source: "chronological", ref: "Matthew 1:23", note: "Matthew, writing under the Holy Spirit, quotes Isaiah 7:14 as fulfilled in the virgin birth of Jesus. This is prophetic fulfillment — the Spirit who inspired Isaiah also directed Matthew. Both are equally authoritative." },
    { source: "josephus", ref: "Josephus: Antiquities 10.2.1", note: "Josephus documents Isaiah's prophetic ministry during the reign of Hezekiah — the historical context of Isaiah 7-8. He records Isaiah as a genuine prophet whose words were verified by events. He does not apply Isaiah 7:14 to any future figure." },
    { source: "zondervan", ref: "Zondervan: Immanuel, Virgin, Prophecy Fulfillment", note: "The dictionary entry explains the near/far fulfillment pattern throughout prophetic Scripture — a common structure where a prophecy has an immediate historical fulfillment and a greater eschatological one. Isaiah 7:14 is the clearest example in the Bible." },
    { source: "amplified", ref: "Amplified Isaiah 7:14", note: "The Amplified renders almah as 'the young woman who is unmarried and a virgin' — capturing both the historical near fulfillment and the prophetic far fulfillment in a single translation. The name Immanuel is amplified as 'God with us' — not a title but a declaration of the incarnation itself. The Amplified Study Bible notes confirm this is a dual fulfillment prophecy pointing ultimately to the virgin birth of Christ." },
  ],

  // ── Daniel 7 — The Son of Man ────────────────────────────────────────────
  "DAN.7": [
    { source: "enoch", ref: "Enoch 46-48, 62-63", note: "The Similitudes of Enoch — the Son of Man as a preexistent heavenly figure named before the sun and stars, who sits on the throne of glory and will judge all kings and the mighty. Every first-century Jew who heard Jesus call himself 'Son of Man' had this background in their heads. This was not a humble title. It was a claim to cosmic authority." },
    { source: "dss", ref: "DSS: 4Q246 (Son of God Text)", note: "An Aramaic apocalypse from Qumran describes a coming figure called 'Son of God' and 'Son of the Most High' who will rule an everlasting kingdom. This text shows these titles were in active circulation at the time of Jesus — his claims were understood immediately by those who heard them." },
    { source: "lxx", ref: "LXX Daniel 7:13", note: "The Septuagint translates 'one like a son of man coming with the clouds of heaven' — clouds are consistently a mark of divine presence throughout Scripture (Exodus 13, Psalm 104, Revelation 1). Jesus coming on clouds is a claim to divinity." },
    { source: "chronological", ref: "Mark 14:62", note: "Jesus at his trial combines Daniel 7:13 with Psalm 110:1 in one sentence. The high priest tears his robes because he understood exactly what was being claimed — not a political threat but a claim to be the cosmic judge of Daniel's vision. That is why the charge was blasphemy." },
    { source: "josephus", ref: "Josephus: Antiquities 10.10.4", note: "Josephus documents Daniel's life and records the visions in detail — the statue, the four beasts, the Ancient of Days. When he reaches the Son of Man vision he stops and states it is not appropriate for him to describe what it means. He moves on without interpretation." },
    { source: "amplified", ref: "Amplified Daniel 7:13-14", note: "The Amplified expands 'one like a Son of Man' — noting that this figure approaches the Ancient of Days and receives authority, glory, and sovereign power. The amplification makes explicit: all peoples, nations, and men of every language worshiped him — this is divine worship, not political allegiance. His dominion is everlasting and his kingdom will not be destroyed. The Amplified confirms this is the messianic Son who shares God's throne." },
    { source: "zondervan", ref: "Zondervan: Son of Man, Daniel, Messiah", note: "The dictionary traces the Son of Man title from Daniel through the Enochian tradition to Jesus' consistent self-identification — the most important messianic title in the Gospels." },
  ],

  // ── Ezekiel 28 — The Anointed Cherub ────────────────────────────────────
  "EZE.28": [
    { source: "enoch", ref: "Enoch 18-19, 54", note: "Enoch describes the place of imprisonment prepared for the stars that fell from heaven — the angelic beings who abandoned their station. Ezekiel 28's anointed cherub who was cast from the mountain of God fits exactly into this framework of a heavenly being who fell through pride." },
    { source: "dss", ref: "DSS: Songs of Sabbath Sacrifice 4Q400-407", note: "Elaborate descriptions of the cherubim and their role in the heavenly temple — the most detailed picture of angelic worship in all of Second Temple literature. Shows what Ezekiel's audience understood about the rank and function of the being described in chapter 28." },
    { source: "lxx", ref: "LXX Ezekiel 28:14", note: "LXX reads 'with the cherub I placed you on the holy mountain of God' — confirming this is about a heavenly being of the highest order, not merely a human king. The king of Tyre is addressed as the earthly embodiment of this supernatural power behind his throne." },
    { source: "zondervan", ref: "Zondervan: Cherub, Satan, Fall of Lucifer", note: "The dictionary entry connects Ezekiel 28 to Isaiah 14 and Revelation 12 — the consistent biblical picture of a powerful heavenly being whose pride led to his fall and whose agenda ever since has been the destruction of God's image-bearers." },
    { source: "amplified", ref: "Amplified Ezekiel 28:12-17", note: "The Amplified expands the description of the anointed cherub in full — 'full of wisdom and perfect in beauty' — with notes confirming this goes beyond any human king to describe a supernatural being of the highest order. 'The seal of perfection' is amplified as the pinnacle of created excellence. 'Your heart was lifted up because of your beauty' — the Amplified makes the cause of the fall explicit: pride in one's own glory rather than God's. This is the origin of all sin." },
  ],

  // ── John 1 — The Word ────────────────────────────────────────────────────
  "JHN.1": [
    { source: "tanakh", ref: "Proverbs 8:22-31", note: "Wisdom speaking as a distinct presence beside God before creation — 'I was beside him like a master workman.' This is the Hebrew Wisdom tradition that John 1 builds on directly. The Word of God was with God and was God — not a Greek idea but a Hebrew one." },
    { source: "tanakh", ref: "Psalm 33:6", note: "By the Word of the LORD the heavens were made — the same creative Word of God that Genesis 1 shows speaking the world into existence. John 1 is the revelation that this eternal creative Word of God took on flesh." },
    { source: "lxx", ref: "LXX Genesis 1 (Septuagint backdrop)", note: "In the Septuagint, God repeatedly speaks (legei) and creation obeys. John's opening 'In the beginning was the Word (Logos)' echoes the LXX's opening exactly — 'In the beginning God made...' John is saying: the one through whom God spoke creation into existence has now entered creation." },
    { source: "dss", ref: "DSS: 11QMelchizedek", note: "The heavenly Melchizedek figure at Qumran — a divine being who executes God's will and brings atonement. Part of the Second Temple Jewish understanding that God works through a heavenly agent. John 1 reveals that agent is the eternal Son." },
    { source: "enoch", ref: "Enoch 48:2-7", note: "Enoch describes the Son of Man whose name was given before the sun and stars — preexistent, concealed until the time of revelation. 'The light of the nations' and 'the hope of those in distress.' John 1:9 calls Jesus 'the true light that enlightens every man.' Both are drawing from the same Hebrew prophetic tradition." },
    { source: "tanakh", ref: "Isaiah 55:10-11", note: "God's Word goes out from his mouth and does not return empty — it accomplishes what God sends it to do. John 1 is the revelation that this living, active, purposeful Word of God took on a body. The Word became flesh. That is the entire message of the incarnation." },
    { source: "amplified", ref: "Amplified John 1:1-14", note: "The Amplified expands 'In the beginning was the Word (Logos)' — noting that Logos means the living expression of God, the personal Word. 'Was with God' is amplified as face to face, in intimate relationship with God — not separate from God but distinguishable. 'Was God' is the full divine nature. Verse 14 — 'the Word became flesh' — is amplified as God incarnate, the divine taking on human nature permanently. The Amplified makes the incarnation impossible to flatten into metaphor." },
  ],

  // ── Acts 2 — Pentecost ───────────────────────────────────────────────────
  "ACT.2": [
    { source: "lxx", ref: "LXX Joel 2:28-32", note: "Peter quotes Joel from the Septuagint — 'in the last days I will pour out my Spirit on all flesh.' The crowd at Pentecost knew this prophecy. Peter is saying: what you are witnessing right now is the fulfillment of what Joel promised. The last days have begun." },
    { source: "dss", ref: "DSS: Temple Scroll 11Q19 — Shavuot", note: "Qumran's expanded liturgy for Shavuot (Pentecost) frames the feast as covenant renewal — the giving of the Torah at Sinai. Peter's audience understood they were gathered for the anniversary of God's covenant with Israel. The Spirit coming on that exact day was not coincidence." },
    { source: "josephus", ref: "Josephus: Antiquities 3.10.6", note: "Josephus describes the Feast of Weeks (Shavuot/Pentecost) — confirms why Jerusalem was packed with diaspora Jews from every nation. The crowd in Acts 2 was not random. God gathered witnesses from every corner of the known world to see the birth of the church." },
    { source: "josephus", ref: "Josephus: Against Apion 2.282", note: "Josephus documents the spread of Jewish communities across every nation of the known world — Parthians, Medes, Elamites, Egyptians, Romans and more. Acts 2's list of nations was not random. Every people group that heard the gospel at Pentecost had a Jewish community to carry it home." },
    { source: "amplified", ref: "Amplified Acts 2:1-4, 17", note: "The Amplified expands 'they were all together in one place' — the unity of the assembly was part of the fulfillment condition. The Spirit's arrival as rushing wind and tongues of fire is amplified with notes on how both elements signify the presence of God throughout Scripture — the pillar of fire, the theophanic wind. Peter's quote of Joel is amplified: 'in the last days' — the Amplified notes this signals that the messianic age has arrived with the outpouring of the Spirit." },
  ],

  // ── Revelation 12 — The Woman, Dragon, and War ──────────────────────────
  "REV.12": [
    { source: "enoch", ref: "Enoch 86-88", note: "The Animal Apocalypse — fallen stars sweeping other stars from heaven. Revelation 12:4 uses this exact image — the dragon's tail sweeping a third of the stars. John's audience knew Enoch and would have immediately recognized the Watcher tradition behind this imagery." },
    { source: "dss", ref: "DSS: War Scroll 1QM", note: "The War Scroll describes the final cosmic battle between the Sons of Light and Sons of Darkness in military detail. This is the framework Revelation 12 inhabits — a real war in both the heavenly and earthly realms that has already begun and will reach its conclusion." },
    { source: "lxx", ref: "LXX Isaiah 14:12", note: "Isaiah 14's fallen one — 'How you have fallen from heaven, shining one, son of the dawn.' The Septuagint preserves this language that connects directly to Revelation 12's dragon cast down. Jesus references this in Luke 10:18 — 'I saw Satan fall like lightning from heaven.'" },
    { source: "chronological", ref: "Revelation 20:1-3, 10", note: "The Dragon's end is already written. He is bound, then released briefly, then thrown into the lake of fire. John is not writing political commentary about Rome — he is showing the conclusion of a war that started in Genesis 3. The serpent who deceived in the garden meets his final judgment." },
    { source: "josephus", ref: "Josephus: War 6.5.3", note: "Josephus records terrifying signs in the sky before Jerusalem fell in 70 CE — armies in the clouds, a star shaped like a sword standing over the city. John's Revelation was written in this context. His audience had seen with their own eyes that heaven and earth are not separate." },
    { source: "amplified", ref: "Amplified Revelation 12:7-12", note: "The Amplified expands the war in heaven — Michael and his angels fighting the dragon and his angels. This is not metaphor. The Amplified notes confirm this is a literal cosmic battle that results in Satan being permanently cast out of his position as the accuser before God's throne. 'The accuser of our brothers has been thrown down' — amplified as the one who accused them day and night before God. His ejection from heaven is the direct result of the blood of the Lamb and the testimony of the saints." },
  ],
}

// ── TIMELINE ─────────────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    id: "creation",
    label: "Creation & The Garden",
    period: "In the beginning",
    color: "#a07c50",
    desc: "God creates the physical world, establishes His kingdom on earth, and appoints Adam as royal priest over the garden-temple.",
    books: ["GEN.1", "GEN.2", "GEN.3"],
    sources: ["tanakh", "lxx", "enoch", "dss", "josephus"],
  },
  {
    id: "antediluvian",
    label: "The Watchers & The Flood",
    period: "Before the Flood",
    color: "#507ca0",
    desc: "Supernatural beings corrupt the created order. The Nephilim. God judges the earth and preserves His covenant through Noah.",
    books: ["GEN.4", "GEN.5", "GEN.6"],
    sources: ["tanakh", "enoch", "dss", "lxx", "josephus"],
  },
  {
    id: "patriarchs",
    label: "Abraham, Isaac & Jacob",
    period: "~2100–1700 BCE",
    color: "#a07050",
    desc: "God establishes His covenant with Abraham — a people, a land, and a promise that all nations will be blessed through his seed.",
    books: ["GEN.12", "GEN.14", "GEN.22"],
    sources: ["tanakh", "lxx", "josephus", "dss"],
  },
  {
    id: "exodus",
    label: "Exodus, Torah & Covenant",
    period: "~1446–1406 BCE",
    color: "#508050",
    desc: "God delivers Israel from Egypt, gives the Torah at Sinai, and establishes the covenant that defines His kingdom people.",
    books: ["EXO.3", "EXO.20", "DEU.6"],
    sources: ["tanakh", "lxx", "josephus", "dss"],
  },
  {
    id: "kingdom",
    label: "Kingdom, Prophets & Exile",
    period: "~1050–539 BCE",
    color: "#7050a0",
    desc: "The rise and fall of Israel's kingdom. The prophets reveal God's plan — a coming king from David's line who will rule forever.",
    books: ["PSA.82", "ISA.7", "EZE.28", "DAN.7", "DAN.9"],
    sources: ["tanakh", "lxx", "josephus", "dss", "enoch"],
  },
  {
    id: "second_temple",
    label: "Second Temple Period",
    period: "~400 BCE – 30 CE",
    color: "#505080",
    desc: "400 years of silence between the testaments. Enoch, the Dead Sea Scrolls, and Jewish apocalyptic literature prepare the world for the Messiah.",
    books: ["JOB.1"],
    sources: ["enoch", "dss", "lxx", "josephus", "zondervan"],
  },
  {
    id: "first_century",
    label: "The First Century — Christ & Church",
    period: "~4 BCE – 100 CE",
    color: "#806040",
    desc: "God becomes flesh. The Kingdom arrives in person. The cross, resurrection, and the pouring out of the Spirit launch the age of the church.",
    books: ["JHN.1", "ACT.2", "REV.12"],
    sources: ["chronological", "josephus", "lxx", "dss", "enoch"],
  },
]

// ── SOURCE METADATA ───────────────────────────────────────────────────────────
export const SOURCE_META = {
  tanakh:       { label: "JPS Tanakh 1917",               short: "TANAKH", color: "#c9a84c", bg: "#2a2410" },
  enoch:        { label: "Book of Enoch",                  short: "ENOCH",  color: "#8b6fc9", bg: "#1e1a2e" },
  dss:          { label: "Dead Sea Scrolls",               short: "DSS",    color: "#6aaa7a", bg: "#162616" },
  amplified:    { label: "Amplified Study Bible",          short: "AMP",    color: "#d4845a", bg: "#2a1a10" },
  chronological:{ label: "Chronological NKJV",            short: "CHRON",  color: "#5a9ed4", bg: "#101e2a" },
  lxx:          { label: "Septuagint — Brenton 1851",      short: "LXX",    color: "#b09a60", bg: "#201e10" },
  josephus:     { label: "Complete Works of Josephus",     short: "JOS",    color: "#90b860", bg: "#182210" },
  zondervan:    { label: "Zondervan Bible Dictionary",     short: "DICT",   color: "#b87878", bg: "#220f0f" },
}
