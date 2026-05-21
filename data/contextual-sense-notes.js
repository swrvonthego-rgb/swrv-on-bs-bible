// SWRV Kingdom Bible — Contextual Sense Notes
// Passage-keyed overrides for the word-sense resolver. When the resolver
// finds a verse that has a curated contextual sense note for the tapped
// word, the Study Sheet uses these passage-specific notes instead of the
// generic dictionary entry — so "flesh" in Galatians 5:17 reads
// differently from "flesh" in John 1:14, even though both are sarx.
//
// Schema:
//   window.CONTEXTUAL_SENSE_NOTES["Book Chapter:Verse"][english_word_lower] = {
//     sense:    "What the word means in THIS exact passage.",
//     notMeant: "Generic senses the reader should NOT import into this verse.",
//     matters:  "Why the distinction matters for reading this verse."
//   }
//
// Source-honest: every entry below cites Strong's, lexicon, or known
// scholarly background. Where exact mapping cannot be confirmed for a
// given verse, the entry is omitted rather than guessed.

window.CONTEXTUAL_SENSE_NOTES = {
"Galatians 5:17":{
  flesh:{
    sense:"σάρξ (sarx, G4561) here means the FALLEN HUMAN PATTERN of desire and action that operates apart from and against the Spirit. Paul is naming a power/orientation — not the physical body. The same Greek word in 1 Cor 15:39 means literal animal flesh; in John 1:14 means real embodied humanity. Context here, set against pneuma (Spirit), is the unrenewed self-pattern.",
    notMeant:"Do not read this as 'the body is evil.' Do not assume it is Hebrew basar (H1320, physical flesh/kinship). Paul never says the body is evil — he says the flesh-pattern is at war with the Spirit-pattern. The body itself is to be presented as a living sacrifice (Rom 12:1) and is destined for resurrection (Rom 8:11; 1 Cor 15).",
    matters:"This is one of the most misread words in the NT. Reading sarx here as 'body' collapses Paul's Spirit-vs-flesh argument into a body-vs-soul Greek dualism that Scripture rejects. Get this wrong and Romans 8 and Galatians 5 read as anti-body asceticism instead of as the Spirit's victory over the unrenewed self."
  }
},
"John 1:14":{
  flesh:{
    sense:"σάρξ (sarx, G4561) here means real, embodied, ordinary HUMANITY. The Word — eternal, divine, with God and being God (1:1) — became sarx. John's word choice is deliberately scandalous: not 'took on a body' or 'appeared as a man,' but became sarx, the same lowly word Paul uses for fallen human pattern in Gal 5:17. The Incarnation is full identification with our actual humanity.",
    notMeant:"Do NOT import the negative Pauline sense (fallen orientation against the Spirit) into this verse — that would make Christ sinful. Do not soften to 'human-looking' or 'spiritual appearance' (the Docetist heresy John writes against in 1 John 4:2-3).",
    matters:"The same Greek word, two opposite kinds of context. John 1:14 sarx is the dignifying of humanity in the Incarnation. Gal 5:17 sarx is the unrenewed nature opposed to the Spirit. The word does not change; the referent does."
  }
},
"Genesis 2:24":{
  flesh:{
    sense:"בָּשָׂר (basar, H1320) here means physical flesh — and by metonymy, the KINSHIP UNION created by marriage. 'One flesh' is the Hebrew phrase ECHAD BASAR — one-kinship-body. The covenant of marriage makes the two parties one bonded person before God.",
    notMeant:"This is not the Pauline σάρξ (sarx, Greek). It is not 'fallen nature.' It is not merely sexual union — it is the entire covenant-kinship reality of which sexual union is the seal.",
    matters:"Jesus quotes this in Matt 19:5-6 to ground marriage's permanence: 'what God hath joined together, let not man put asunder.' The 'one flesh' kinship is divinely formed, not just a contract."
  }
},
"1 Corinthians 3:3":{
  carnal:{
    sense:"σαρκικός (sarkikos, G4559) — adjective form of sarx — meaning FLESHLY-IN-CONDUCT. Paul rebukes the Corinthians as still acting from the unrenewed-nature pattern (envy, strife, division) rather than from the Spirit. The word is precisely chosen: not the noun sarx (the pattern itself) but the adjective sarkikos (someone whose behavior matches that pattern).",
    notMeant:"Not 'sensual' in the modern English narrow sense. Not 'body-oriented' as a slur on the body. Sarkikos here describes Christian believers behaving in a way that mismatches their Spirit-given identity — childishness, factionalism, jealousy.",
    matters:"Paul calls baptized believers 'carnal' here — proving that the unrenewed pattern can still operate in genuine Christians. The remedy is not asceticism but maturation in the Spirit (1 Cor 3:1-3; Heb 5:11-14)."
  },
  fleshly:{
    sense:"σαρκικός (sarkikos, G4559) — same as 'carnal' above. See that note.",
    notMeant:"Not 'sensual.' Not 'body-related.' Conduct-pattern matching the fallen orientation.",
    matters:"Same as 'carnal' — believers can still walk fleshly; Paul's call is to grow up."
  }
},
"Genesis 1:26":{
  man:{
    sense:"אָדָם (adam, H120) here means HUMANITY / MANKIND collectively, not just male individual. 'Let us make adam in our image' refers to humanity as image-bearer. Verse 27 immediately specifies 'male and female' — both equally adam, both equally image. 'Adam' as the proper name of the first man comes later (Gen 2:7 onward); here it is the species/category.",
    notMeant:"Not 'male only.' Not 'Adam the individual' yet. Not ish (H376, male individual / husband). Not enosh (H582, mortal weakness). Not geber (H1397, strong man / warrior). The word for image-bearing creation in 1:26-27 is the inclusive humanity-word.",
    matters:"Reducing Gen 1:26 to 'male only' collapses the foundation of male-and-female-both-bear-the-image. Both halves of humanity are image-bearers; the kingdom vocation belongs to humanity together."
  }
},
"Genesis 2:7":{
  man:{
    sense:"אָדָם (adam, H120) here is BOTH the species AND the personal name. The Hebrew wordplay: adam (the man) is formed from adamah (the ground, H127). Same root cluster — earth-creature from earth.",
    notMeant:"Not 'breath.' Not 'spirit.' The word adam itself does not mean breath — breath comes in v.7 via neshamah (H5397).",
    matters:"Genesis grounds human dignity in DUST + DIVINE BREATH together — neither pure spirit nor mere animal. The wordplay adam/adamah is the entire anthropology in two words."
  },
  breath:{
    sense:"נְשָׁמָה (neshamah, H5397) — the divine in-breathing that animates the dust-formed body into a living being. Specifically God's life-breath, distinguished from ruach (general wind/spirit) and from later nephesh (the living-self that the body+breath produced).",
    notMeant:"Not ruach (H7307, broader wind/spirit/breath). Not nephesh (H5315, soul/living self — which is what adam BECOMES after the in-breathing, not what is breathed). Neshamah is specifically the divine breath that initiates human life.",
    matters:"Job 32:8 — 'There is a spirit (ruach) in man: and the inspiration of the Almighty (neshamah Shaddai) giveth them understanding.' Acts 17:25 — God 'giveth to all life, and breath (pnoē), and all things.' Human life is gifted; we did not generate it."
  },
  soul:{
    sense:"נֶפֶשׁ (nephesh, H5315) — the LIVING SELF/CREATURE that the body+breath produced. 'Man became a living nephesh.' Nephesh is the whole self as alive — not a detachable invisible part. Used of animals too (Gen 1:20-24).",
    notMeant:"Not a Greek-philosophical disembodied 'soul' that pre-exists the body. Not the immortal-part-vs-perishable-part dualism imported from Plato. Nephesh is the embodied living self.",
    matters:"Hebrew anthropology is unified: dust + breath = living nephesh. Resurrection (1 Cor 15) restores the whole nephesh, body included. Reading Gen 2:7 with Greek dualism distorts the gospel of bodily resurrection."
  }
},
"John 3:16":{
  loved:{
    sense:"ἠγάπησεν — aorist of ἀγαπάω (agapao, G25). Decisive, self-giving covenant love — historically expressed in the giving of the Son. The aorist tense here points to the cross as the act that defines what 'God so loved the world' means.",
    notMeant:"Not phileo (G5368, friendship affection). Not eros (not used in the NT). Not generic sentiment. The verb is the active form of agape and points to the cross, not to feelings.",
    matters:"'God so loved' = God so agape-ed. The proof of God's love is not in our experience first; it is in Christ given for us (Rom 5:8). The aorist verb anchors love in a historical act."
  },
  love:{
    sense:"See 'loved' — same verb stem ἀγαπάω.",
    notMeant:"Not phileo. Not eros.",
    matters:"Anchored in the cross."
  }
},
"1 Corinthians 13:1":{
  charity:{
    sense:"ἀγάπη (agape, G26) — self-giving covenant love. KJV uses 'charity' here because 'love' in 1611 English was too narrowly romantic. Same word as agape elsewhere in the NT.",
    notMeant:"Not 'almsgiving' in the modern English sense. Not phileo. Not eros.",
    matters:"1 Cor 13 is the love-chapter — but more precisely the AGAPE chapter. The gifts of the Spirit operate within agape or they are 'sounding brass.' Reading 'charity' as 'donations to the poor' shrinks the whole argument."
  },
  love:{
    sense:"ἀγάπη (agape, G26) — see 'charity.'",
    notMeant:"Not phileo. Not eros.",
    matters:"AGAPE is the climate of the gifts."
  }
},
"John 21:15":{
  love:{
    sense:"Jesus uses ἀγαπάω (agapao, G25) — 'do you agape me?' Peter answers with φιλέω (phileo, G5368) — 'I phileo you.' Different words. Jesus asks for covenant self-giving love; Peter, humbled by his denial, can only claim friendship affection. Same exchange in v.16. In v.17 Jesus condescends and uses Peter's word (phileo), and Peter is grieved.",
    notMeant:"Not interchangeable. The word-swap is the point of the passage — Peter cannot match Jesus' word.",
    matters:"This is the restoration of Peter after his triple denial (John 18). Three questions, three answers, three commissions. Reading 'love' as one flat word loses the entire drama of grace meeting Peter where he is."
  }
},
"John 21:16":{
  love:{
    sense:"Same dynamic as v.15: Jesus ἀγαπάω (G25), Peter φιλέω (G5368).",
    notMeant:"See v.15.",
    matters:"See v.15."
  }
},
"John 21:17":{
  love:{
    sense:"This time Jesus uses Peter's word: φιλέω (phileo, G5368). 'Lovest (phileis) thou me?' Peter is grieved because the third time matched his weaker word — exposing his denial-grief. Yet Christ still commissions him.",
    notMeant:"This is NOT Peter winning the argument. Jesus condescends to where Peter is.",
    matters:"Grace meets failure. Three denials, three restorations, three 'feed my sheep' commissions. Phileo here is grace condescension, not equivalence."
  }
},
"Galatians 5:21":{
  kingdom:{
    sense:"βασιλεία (basileia, G932) — REIGN / royal authority / domain — specifically the KINGDOM OF GOD that Paul has been preaching. He says those who persistently practice the works-of-the-flesh listed in vv.19-21 'shall not inherit the basileia of God.' The kingdom is God's active reign through Christ; inheritance is the share in that reign.",
    notMeant:"Not 'heaven as a location after death' alone. Not merely 'the church.' Not an earthly political kingdom Israel hoped for. Basileia here is the active reign of God in Christ — present in inauguration (Mark 1:15) and future in consummation (Rev 11:15).",
    matters:"Persistent unrepentant practice of the works of the flesh forfeits inheritance in the kingdom — not as arbitrary punishment but as incompatibility with the King's nature. The grace that justifies (Gal 2:16) also transforms (Gal 5:22-25)."
  }
},
"Romans 8:2":{
  law:{
    sense:"νόμος (nomos, G3551) here means PRINCIPLE / PATTERN, not the Mosaic Torah. Paul writes 'the law (nomos) of the Spirit of life in Christ Jesus hath made me free from the law (nomos) of sin and death.' Two competing principles, each called nomos by Paul. The same Greek word, different referents within the same sentence.",
    notMeant:"Not the Mosaic Torah (that would be ho nomos in many other Pauline uses). Not Roman law. Not legalism here. Paul plays on nomos as 'governing principle.'",
    matters:"Misreading 'law of sin and death' as 'the Mosaic Law' produces anti-Torah theology Paul never taught. He upholds the Torah (Rom 7:12 'the law is holy') while distinguishing the principle of sin's pull from God's law itself."
  }
},
"James 2:14":{
  works:{
    sense:"ἔργα (erga, plural of ergon, G2041) — DEEDS / actions — specifically the deeds that prove genuine faith. James is not contradicting Paul; Paul rules out 'works of the law' as the basis of justification, while James insists 'faith without works is dead' — meaning fruitless invisible 'faith' is not real faith. Different qualifier on the same word.",
    notMeant:"Not 'works of the law' (Paul's negative target). Not human boasting. Not earning. Works here = evidence/fruit that a faith claim is real.",
    matters:"Paul: justified by faith, not by works of the law (Rom 3:28). James: faith without works is dead (Jas 2:17). Not contradictory. Justifying faith always works through love (Gal 5:6) and bears fruit (Jas 2:18-26). Same gospel, different angles."
  }
},
"Galatians 2:16":{
  law:{
    sense:"νόμος (nomos, G3551) here = MOSAIC LAW specifically — the Torah-system that Paul is arguing CANNOT justify. The phrase 'works of the law' (erga nomou) names the specific covenant-boundary deeds (circumcision, food laws, Sabbath) that Paul's opponents required of Gentile believers.",
    notMeant:"Not 'principle' here (that's Rom 8:2's nomos). Not 'all moral effort generally.' Specifically the Mosaic covenant-boundary works.",
    matters:"Paul does not abolish moral obedience — he denies that Torah-observance JUSTIFIES. The just shall live by faith (2:20; Hab 2:4)."
  }
}
};
