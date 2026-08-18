/**
 * High-priority biblical terms missing from the main dictionary.
 * These words appear hundreds or thousands of times in Scripture and have
 * significant ANE cultural meaning that changes their interpretation.
 *
 * Will be merged into window.ENGLISH_BIBLE_DICT on app load.
 */

window.HIGH_PRIORITY_DEFINITIONS = {

"king": {
  word: "king",
  plain: "A ruler with supreme authority over a territory and its people; in the ANE, often considered semi-divine.",
  deep: "Hebrew MELEK (H4428) and Greek BASILEUS (G935) denote both the human ruler and his authority. In the ANE, kings were typically viewed as either representatives of the gods or as the gods' adopted sons. Israel uniquely confessed YHWH as king (Psalm 47:7-8, 'For God is the King of all the earth'; 1 Samuel 8:7, where God says 'they have rejected me from being king over them'). The Hebrew Bible reserves the highest kingship for God alone; earthly kings are stewards. The NT applies BASILEUS to Jesus (Matt 27:37: 'Jesus, the King of the Jews') and to God the Father (1 Tim 1:17: 'the only wise God'). A 'king' is not merely political but covenantal — he binds his people to himself and God.",
  misunderstood: "Modern democracies don't have kings; this can make biblical kingship language seem foreign or irrelevant. But kingship was the only governmental form the ANE knew. Jesus taught radical kingship — a king who serves (John 13:1-17) rather than dominates.",
  matters: "Jesus' central message is the kingdom. Misunderstanding 'king' means misunderstanding what kind of rule the Messiah brings. The Incarnation is Emmanuel, God-with-us as King — not distant from His people but living among them (John 1:14).",
  originals: [
    {lang: "Hebrew", word: "מֶלֶךְ", translit: "melek", strongs: "H4428", note: "King; also used of God as King (Psalm 93:1: 'YHWH reigns'). Carried the weight of covenant leadership."},
    {lang: "Greek", word: "βασιλεύς", translit: "basileus", strongs: "G935", note: "King; the political and often theological leader. Applied to Jesus: 'King of Kings and Lord of Lords' (Rev 19:16)."}
  ],
  rangeOfMeaning: ["human ruler with legal/covenantal authority", "God as King over all creation", "Jesus as Messiah-King", "the authority and right to rule", "the realm or kingdom ruled"],
  notMean: "Not a dictator who ignores law (in the ANE, kings had law codes). Not purely political (the king represented the gods). Not identical to democracy or elected leadership.",
  cultural: "In Egypt, the king was called 'the son of Ra' — literally divine. In Mesopotamia, kings claimed divine appointment. Israel broke this mold: Psalm 2:7 applies 'You are my son' to the Davidic king, but always as God's *adopted* son, not inherently divine. This is why Jesus' claim 'I am the Son of God' (John 10:36) was so explosive — it challenged the entire ANE framework of kingship. Jesus is King, but as a servant (Phil 2:5-8).",
  kingdomSignificance: "Jesus came as King—not to Rome's Caesar or any earthly throne, but to establish God's kingdom that 'is not of this world' (John 18:36). His kingship inverts ANE expectations: the King washes feet (John 13), suffers (Isaiah 53), and rules by love rather than force (Zech 9:9: 'He comes to you, righteous and victorious, yet humble, riding on a donkey').",
  contextDisambiguation: {
    byStrongs: {
      "H4428": "MELEK — human or divine king; ruler in covenant relationship with subjects.",
      "G935": "BASILEUS — king; used of Jesus, Caesar, and God. Context determines reference."
    }
  },
  relatedVerses: ["2 Samuel 7:12-16", "Psalm 2:7", "Psalm 47:7-8", "Isaiah 9:6-7", "Zechariah 9:9", "Matthew 2:2", "Matthew 21:5", "Luke 1:32-33", "John 18:33-37", "Revelation 19:16"],
  relatedWords: ["kingdom", "reign", "throne", "authority", "covenant", "anointed", "Messiah"],
  category: "government / kingship",
  sources: ["Strong's H4428", "Strong's G935", "BDB (melek)", "Thayer's (basileus)", "ANE kingship theology (Kline, Treaty of the Great King)"],
  confidence: "direct-source"
},

"son": {
  word: "son",
  plain: "A male child or descendant; in ancient contexts, also means 'member of a group' or 'one who exhibits a trait'.",
  deep: "Hebrew BEN (H1121) and Greek HUIOS (G5207) mean both literal male child and metaphorical relationship. Crucial: 'son of' often means 'member of' (e.g., 'sons of the prophets' = members of the prophetic school, 1 Kings 20:35). 'Son of God' in OT refers to angels (Job 1:6), Israelites collectively (Exodus 4:22), or the Davidic king (Psalm 2:7). In the NT, HUIOS applied to Jesus is theologically loaded: it claims unique, intimate relationship with God. Mark 1:11 ('You are my beloved son') deliberately echoes Psalm 2:7 — Jesus is the ultimate Davidic son-king.",
  misunderstood: "Modern ears hear 'son of God' and think biological offspring or genetic relationship. In ANE covenant language, 'son' meant intimate relationship and subordinate loyalty. The Trinity is not explained by 'son' meaning biological child.",
  matters: "Jesus' identity rests partly on being called 'the Son' (John 1:14, 18; Hebrews 1:2-3). Believers also become 'sons and daughters' (2 Corinthians 6:18) — not biologically, but by adoption into God's covenant family (Romans 8:15: 'You received the Spirit of adoption as sons'). This is the ANE family-law metaphor applied to salvation.",
  originals: [
    {lang: "Hebrew", word: "בֵן", translit: "ben", strongs: "H1121", note: "Son; also 'member of' or 'one who exhibits.' 'Sons of the prophets' = prophetic community."},
    {lang: "Greek", word: "υἱός", translit: "huios", strongs: "G5207", note: "Son; intimate relationship with a father figure. Used 376x in NT, 158x of Jesus as 'the Son.'"}
  ],
  rangeOfMeaning: ["male child", "adult male descendant", "member of a group (e.g., 'sons of Belial' = wicked people)", "one who exhibits a quality (e.g., 'son of thunder')", "heir or subordinate in a covenantal relationship"],
  notMean: "Not always biological. In 'sons of disobedience' (Ephesians 2:2) it means 'those who practice disobedience,' not literal children.",
  cultural: "ANE father-son language encoded covenant hierarchy: the son owed obedience to the father, who owed protection. God calls Israel 'my son' (Exodus 4:22; Hosea 11:1), establishing covenant obligation and divine care. When Jesus calls God 'Father' (Abba, Mark 14:36), He claims the most intimate covenant relationship in Jewish thought.",
  kingdomSignificance: "Believers are 'sons and daughters' of God (2 Corinthians 6:18) not by nature but by adoption (Romans 8:15). This is the inheritance: to be co-heirs with Christ (Romans 8:17), joint-sons. The kingdom family is entered through becoming children of the King.",
  contextDisambiguation: {
    byStrongs: {
      "H1121": "BEN — literal or metaphorical 'son'; context determines. 'Sons of Israel' = Israelites; 'sons of the prophets' = prophetic school.",
      "G5207": "HUIOS — son in relationship. 'Son of God' = one in intimate relation with God. Never used casually in theology."
    }
  },
  relatedVerses: ["Exodus 4:22", "Psalm 2:7", "Hosea 11:1", "Matthew 3:17", "Mark 1:11", "John 1:14", "John 3:16-18", "Romans 8:15", "Romans 8:29", "Galatians 4:4-7", "Hebrews 1:2-3", "1 John 3:1-2"],
  relatedWords: ["father", "daughter", "child", "heir", "family", "adoption", "covenant"],
  category: "family / covenant",
  sources: ["Strong's H1121", "Strong's G5207", "BDB (ben)", "Thayer's (huios)", "ANE adoption studies (Kitchen)"],
  confidence: "direct-source"
},

"house": {
  word: "house",
  plain: "A physical building where people live; also the family, dynasty, or lineage inhabiting it.",
  deep: "Hebrew BAYIT (H1004) and Greek OIKOS (G3624) mean the structure but more often the occupants—the family or household as a unit. 'House of David' = David's dynasty (2 Samuel 7:16). 'House of Israel' = the nation or God's people (1 Kings 12:21). This is identity language: you don't just *live in* a house, you *are* of a house. The Incarnation itself is housing language: John 1:14 'the Word became flesh and dwelt (Greek eskenōsen, 'pitched His tent') among us.' God 'moving in' with humanity.",
  misunderstood: "We hear 'house' and think building. The Bible often means the people, the dynasty, the entire lineage and its future.",
  matters: "God's entire covenant plan involves building a 'house' — first for David (2 Samuel 7), later transformed into the Church (Ephesians 2:19-22: 'you are built together into a dwelling place of God'). Believers are living stones in God's spiritual house (1 Peter 2:5). The ultimate fulfillment is the New Jerusalem, God's house forever with humanity (Revelation 21:3-4).",
  originals: [
    {lang: "Hebrew", word: "בַיִת", translit: "bayit", strongs: "H1004", note: "House; dwelling, household, family lineage. 'House of David' occurs 30x in OT — each time it means the dynasty and its future."},
    {lang: "Greek", word: "οἶκος", translit: "oikos", strongs: "G3624", note: "House; dwelling and household. 1 Peter 2:5 'you are built into a spiritual house' (oikos pneumatikos)."}
  ],
  rangeOfMeaning: ["physical building", "household / family unit", "dynasty / royal line", "nation or people", "spiritual dwelling place"],
  notMean: "Not a metaphor for church buildings in the NT sense — 'house' can mean the people gathered there, but 'church' (ekklesia) is the preferred term for the gathered body of Christ.",
  cultural: "In ANE society, the house was the basic economic and social unit. A 'head of house' had legal authority. To be 'taken into someone's house' was to become part of their family unit. When Ruth joins Naomi's household (Ruth 3:11), she becomes legally part of the family. When Jesus says 'Let the dead bury their dead' (Matthew 8:22), He's saying: 'Leave behind your old household identity; come into My house instead — the kingdom family.'",
  kingdomSignificance: "The Church is God's house, built on Christ the cornerstone (Ephesians 2:20-22). Believers are co-heirs in this household (Romans 8:17). The kingdom is a family, a house, a dwelling where God lives with His people forever (Revelation 21:3).",
  contextDisambiguation: {
    byStrongs: {
      "H1004": "BAYIT — physical house or family/dynasty. 'House of David' = Davidic dynasty. 'My father's house' = family lineage and future.",
      "G3624": "OIKOS — household and its occupants. In Acts 16:31 'Believe in the Lord Jesus and you will be saved, you and your household' — the oikos is the family unit."
    }
  },
  relatedVerses: ["2 Samuel 7:11-16", "1 Kings 12:21", "Psalm 27:4", "Matthew 10:25", "John 1:14", "John 14:2", "Acts 16:31", "1 Corinthians 3:16", "Ephesians 2:19-22", "1 Peter 2:5", "Revelation 21:3"],
  relatedWords: ["family", "household", "dynasty", "dwelling", "lineage", "inheritance"],
  category: "family / dwelling",
  sources: ["Strong's H1004", "Strong's G3624", "BDB (bayit)", "Thayer's (oikos)", "ANE household structures"],
  confidence: "direct-source"
},

"father": {
  word: "father",
  plain: "A male parent; metaphorically, a source, origin, or authority figure.",
  deep: "Hebrew AV (H1, also AB H1) and Greek PATER (G3962) mean both biological parent and authority figure. Crucial: 'father' was the covenantal language for God. God says to Israel (Exodus 4:22), 'Israel is My son, My firstborn'; Isaiah 63:16, 'You, O YHWH, are our Father.' By the Intertestamental period, addressing God as 'Father' was standard Jewish piety (though still intimate and rare compared to later Christianity). Jesus' use of Abba ('Father,' Aramaic, Mark 14:36) was characteristic but not unprecedented—what was revolutionary was His exclusive, singular claim to God as His Father in a way no other human could replicate (John 5:18: the Jews understood this as a claim to deity).",
  misunderstood: "Modern readers sometimes think biblical 'fatherhood' means permissiveness or sentimentality. ANE fatherhood meant authority, covenantal care, and moral instruction. God the Father is not soft.",
  matters: "The entire salvation story is God reestablishing an adopted son-relationship with humanity (Romans 8:15: 'the Spirit of adoption as sons, by whom we cry Abba, Father'). Jesus' entire prayer life was relational and filial (John 17). The Trinity formula (Father, Son, Spirit) is relational, not biological.",
  originals: [
    {lang: "Hebrew", word: "אָב", translit: "av / ab", strongs: "H1 / H1", note: "Father; both biological and spiritual. God is 'Father' of Israel (Isaiah 64:8) and of the righteous (Psalm 103:13)."},
    {lang: "Greek", word: "πατήρ", translit: "pater", strongs: "G3962", note: "Father; used 413x in NT, frequently of God. Jesus uniquely and exclusively calls God 'My Father' — all others say 'Our Father.'"}
  ],
  rangeOfMeaning: ["biological parent", "source or origin", "authority figure / head", "God as covenant father to Israel", "teacher or mentor figure"],
  notMean: "Not merely biological contributor — fatherhood includes covenantal care and moral authority. Not absent or uninvolved (Hebrews 12:5-6 cites Proverbs on God's loving discipline).",
  cultural: "In ANE society, the father held absolute household authority. He was lawgiver, judge, provider, and protector. To call God 'Father' was to place oneself under His authority and care. This is why Jesus teaching 'Our Father in heaven' (Matthew 6:9) recalibrated Israel's relationship to God as intimate but not irreverent—children of the King, bound by covenant.",
  kingdomSignificance: "The Gospel is adoption: 'You received the Spirit of adoption as sons, by whom we cry Abba, Father' (Romans 8:15). The kingdom is a family with God as Father. This changes everything: sin is rebellion against the Father; repentance is returning to the Father (Luke 15, the Prodigal Son). Sanctification is learning to trust the Father's character (Matthew 6:25-34: 'Your Father knows...').",
  contextDisambiguation: {
    byStrongs: {
      "H1": "AV / AB — father; both biological and metaphorical authority. 'God, Father of Israel' establishes covenant relationship.",
      "G3962": "PATER — father; Jesus' exclusive language for God. He says 'My Father' (John 5:18); believers say 'Our Father' (Matthew 6:9)."
    }
  },
  relatedVerses: ["Exodus 4:22", "Isaiah 64:8", "Malachi 1:6", "Matthew 6:9", "John 5:18", "John 14:6-11", "Romans 8:15", "Galatians 4:4-6", "Ephesians 1:3", "Hebrews 12:5-6", "1 John 3:1-2"],
  relatedWords: ["son", "family", "household", "covenant", "authority", "inheritance"],
  category: "family / covenant",
  sources: ["Strong's H1", "Strong's G3962", "BDB (av/ab)", "Thayer's (pater)", "Jewish Fatherhood studies (Jeremias)"],
  confidence: "direct-source"
},

};

// Merge into main dictionary if it exists
if (typeof window.ENGLISH_BIBLE_DICT === 'object') {
  Object.assign(window.ENGLISH_BIBLE_DICT, window.HIGH_PRIORITY_DEFINITIONS);
}
