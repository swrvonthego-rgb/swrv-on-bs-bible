/**
 * Dictionary Batch 3: Foundational concepts (blood, judgment, brother)
 * Core theological and relational terms
 */

window.DICTIONARY_BATCH_3 = {

"blood": {
  word: "blood",
  plain: "Life-force; covenant symbol of binding agreement and redemptive sacrifice.",
  originals: [
    {lang: "Hebrew", word: "דָּם", translit: "dam", strongs: "H1818", note: "Blood; the life essence (nefesh). Leviticus 17:11: 'The life of the flesh is in the blood.'"},
    {lang: "Greek", word: "αἷμα", translit: "haima", strongs: "G129", note: "Blood; literal and sacrificial. 1 John 1:7: 'The blood of Jesus, his Son, purifies us from all sin.'"}
  ],
  rangeOfMeaning: ["life force", "covenant marker", "sacrifice symbol", "atonement", "redemption price"],
  theological: "Blood represents life and covenant sealing. In ANE culture, covenant partners mixed their blood or walked through slain animals. Christ's blood is the ultimate covenant—His life poured out for humanity's redemption.",
  relatedVerses: ["Genesis 9:4", "Exodus 12:7", "Leviticus 17:11", "Hebrews 9:22", "1 Peter 1:18-19", "Revelation 1:5"],
  sources: ["Strong's H1818", "Strong's G129"],
  confidence: "direct-source"
},

"judgment": {
  word: "judgment",
  plain: "God's righteous assessment and sentencing of human conduct; also discernment and wise decision-making.",
  originals: [
    {lang: "Hebrew", word: "מִשְׁפָּט", translit: "mishpat", strongs: "H4941", note: "Judgment; justice, law, decision. Psalm 1:5: 'the wicked will not stand in the judgment.'"},
    {lang: "Greek", word: "κρίσις", translit: "krisis", strongs: "G2920", note: "Judgment; decision, discernment. John 3:17-18: 'God did not send his Son into the world to condemn the world, but to save the world through him.'"}
  ],
  rangeOfMeaning: ["legal decision", "God's justice", "condemnation", "discernment", "final verdict"],
  theological: "Judgment is both present (God's discernment of human hearts) and future (final judgment at end of time). ANE kings were expected to administer justice; Israel's God is the ultimate judge who sees all hearts.",
  relatedVerses: ["Deuteronomy 32:36", "Psalm 9:8", "Isaiah 3:13", "Matthew 12:36-37", "Romans 14:10-12", "2 Corinthians 5:10"],
  sources: ["Strong's H4941", "Strong's G2920"],
  confidence: "direct-source"
},

"brother": {
  word: "brother",
  plain: "Male sibling; fellow covenant member; one united by faith and mutual obligation.",
  originals: [
    {lang: "Hebrew", word: "אָח", translit: "ach", strongs: "H251", note: "Brother; sibling, kinsman, fellow. Genesis 4:9: 'Cain... said, Am I my brother's keeper?'"},
    {lang: "Greek", word: "ἀδελφός", translit: "adelphos", strongs: "G80", note: "Brother; male sibling, fellow believer. John 13:34-35: 'Love one another. As I have loved you, so you must love one another.'"}
  ],
  rangeOfMeaning: ["male sibling", "kinsman", "fellow believer", "human peer", "covenant partner"],
  cultural: "In ANE, kinship created mutual obligation. 'Brother' language in Scripture extends biological family to covenant community—all believers become brothers/sisters, bound by Christ's love.",
  relatedVerses: ["Deuteronomy 22:1-4", "Proverbs 27:10", "Matthew 23:8", "Romans 12:10-15", "1 John 2:9-11", "1 John 4:20-21"],
  relatedWords: ["sister", "kinsman", "neighbor", "fellow", "family"],
  sources: ["Strong's H251", "Strong's G80"],
  confidence: "direct-source"
},

};

if (typeof window.ENGLISH_BIBLE_DICT === 'object') {
  Object.assign(window.ENGLISH_BIBLE_DICT, window.DICTIONARY_BATCH_3);
}
