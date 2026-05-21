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
    matters:"Paul does not abolish moral obedience — he denies that Torah-observance JUSTIFIES. The just shall live by faith (2:20; Hab 2:4).",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Galatians 5:18":{
  Spirit:{
    sense:"πνεῦμα (pneuma, G4151) here = THE HOLY SPIRIT specifically — God's Spirit as the active, governing, indwelling guide who leads the believer. Paul contrasts being 'led by the Spirit' with being 'under the law,' so pneuma here is the personal divine agent who replaces the law's external constraint with internal direction.",
    notMeant:"NOT wind. NOT breath. NOT the human spirit. NOT a generic spiritual force. NOT one's mood or attitude. Context (Spirit vs law in Galatians 5; the Spirit's fruit in vv.22-23; the Spirit walked-in in v.25) demands the Holy Spirit.",
    matters:"Reading 'spirit' as the human spirit here makes the verse self-help ethics. Reading it as the Holy Spirit makes it the gospel: God's own Spirit governs the believer where the law could not. The whole Gal 5 argument collapses without this distinction.",
    why:"Three contextual proofs: (1) Paul's running contrast with 'the law' (5:18) only works if 'Spirit' is divine — a human spirit cannot replace Torah as covenant authority. (2) The 'fruit of the Spirit' in 5:22-23 is the result of the Spirit's work, not the human spirit's striving. (3) 5:25 'walk in the Spirit' parallels Rom 8:4 — explicitly the Holy Spirit.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  led:{
    sense:"ἄγω (ago, G71) — to lead, conduct, bring. Passive 'be led' (ἄγεσθε). The Spirit ACTS; the believer is led. The verb's force is ongoing governance, not a one-time prompting.",
    notMeant:"Not 'inspired in a moment.' Not 'felt a nudge.' Ongoing governance.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  law:{
    sense:"νόμος (nomos, G3551) here = the MOSAIC LAW as covenant administration. Paul argues those led by the Spirit are no longer under that administration (cf. Rom 6:14; 7:6).",
    notMeant:"Not 'principle' here. Not 'moral effort generally.' Mosaic Torah as the prior covenant order.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"John 3:5":{
  Spirit:{
    sense:"πνεῦμα (pneuma, G4151) here = THE HOLY SPIRIT. 'Born of water and of the Spirit' identifies the agent of the new birth — the divine Spirit who regenerates (cf. Titus 3:5; Ezek 36:25-27).",
    notMeant:"Not wind here. Not human spirit. Jesus speaks of new BIRTH BY GOD'S Spirit.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"John 3:8":{
  wind:{
    sense:"πνεῦμα (pneuma, G4151) here = LITERAL WIND. Jesus deliberately uses the SAME Greek word he used for Spirit in v.5 — making a pun on pneuma's double meaning. The wind blows freely, unseen yet evident; so it is with everyone born of the Spirit.",
    notMeant:"Not the Holy Spirit in this clause — though the analogy points to Him. The wordplay is the point.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  Spirit:{
    sense:"πνεῦμα (pneuma, G4151) — at the end of v.8, back to the HOLY SPIRIT. The verse uses pneuma TWICE in two senses to make the analogy: as you cannot trace the wind, you cannot trace the Spirit's regenerating work — yet you see its effect.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 8:9":{
  Spirit:{
    sense:"πνεῦμα (pneuma, G4151) — used four times in this verse, alternating between (a) the HOLY SPIRIT ('the Spirit of God,' 'the Spirit of Christ') and (b) the SPHERE of being indwelt by Him ('ye are not in the flesh, but in the Spirit'). The same word; different referents distinguished by qualifier and context.",
    notMeant:"Not the human spirit in any of the four uses here. Qualifiers ('of God,' 'of Christ') and the contrast with 'in the flesh' force the divine reading.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Genesis 1:2":{
  Spirit:{
    sense:"רוּחַ אֱלֹהִים (ruach elohim) — THE SPIRIT OF GOD, hovering over the waters. Ruach (H7307) means wind/breath/spirit; qualified by 'of God' it identifies God's Spirit as creative agent.",
    notMeant:"Not 'a mighty wind' (some modern translations). The construct 'ruach elohim' with the verb merachefet (hovering, brooding — used in Deut 32:11 of a mother eagle over her young) describes intentional, life-tending presence — not weather.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Ezekiel 37:9":{
  breath:{
    sense:"רוּחַ (ruach, H7307) here = the LIFE-BREATH that animates the dry bones into living people. The valley-of-dry-bones vision turns on ruach's triple meaning (wind/breath/Spirit); v.14 makes explicit that this ruach is God's Spirit put within His people.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Genesis 8:1":{
  wind:{
    sense:"רוּחַ (ruach, H7307) here = literal WIND that God sent over the earth to dry the flood waters. Same word as Gen 1:2's Spirit, here in its weather sense.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Acts 17:25":{
  breath:{
    sense:"πνοή (pnoē, G4157) — wind/breath, the life-breath God gives to all. Paul echoes Gen 2:7 in Greek vocabulary at the Areopagus to make his case to Greek polytheists.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 8:5":{
  flesh:{
    sense:"σάρξ (sarx, G4561) here = the FALLEN HUMAN PATTERN/ORIENTATION opposed to the Spirit — same sense as Gal 5:17. 'They that are after the flesh do mind the things of the flesh' identifies a mode of life, not a physical body.",
    notMeant:"Not physical body (the body is destined for resurrection — Rom 8:11, 23). Not Hebrew basar/kinship. Not 'sensual' in the modern English narrow sense.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  Spirit:{
    sense:"πνεῦμα (pneuma, G4151) here = THE HOLY SPIRIT — the divine indwelling agent who governs the believer's orientation. Paired with sarx as opposite modes of life.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"1 Corinthians 15:39":{
  flesh:{
    sense:"σάρξ (sarx, G4561) here = LITERAL ANIMAL FLESH/MEAT — the physical substance of bodies. Paul lists the different fleshes of men, beasts, fishes, birds. This is the plainly physical sense.",
    notMeant:"NOT fallen pattern. NOT kinship. Plain biological flesh.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 9:3":{
  flesh:{
    sense:"σάρξ (sarx, G4561) here = KINSHIP/ETHNIC DESCENT. 'My kinsmen according to the flesh' = my fellow Israelites by physical descent.",
    notMeant:"Not fallen nature. Not physical body. Family/ethnic line.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Matthew 5:8":{
  heart:{
    sense:"καρδία (kardia, G2588) here = the INNER PERSON as a unity — thought, will, intention, moral center. 'Pure in heart' = single-aimed, undivided inner orientation toward God.",
    notMeant:"Not modern English 'heart' as emotion-only. The Hebrew/Greek heart thinks, decides, desires — the whole inner self.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Proverbs 4:23":{
  heart:{
    sense:"לֵב (lev, H3820) here = the INNER WELLSPRING of life — thought, will, desire flowing from the same center. 'Keep your heart with all diligence; for out of it are the issues of life.'",
    notMeant:"Not feelings only. Not 'follow your heart' as modern intuition-worship — Jer 17:9 says the heart can deceive.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Matthew 6:33":{
  kingdom:{
    sense:"βασιλεία (basileia, G932) here = GOD'S ACTIVE REIGN as the priority of life — His rule applied in the believer's daily orientation. Jesus pairs it with 'his righteousness' (the just ordering of life under that reign).",
    notMeant:"Not 'heaven as a destination.' Not 'church.' The active reign of God to be sought first.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Mark 1:15":{
  kingdom:{
    sense:"βασιλεία (basileia, G932) here = THE INAUGURATED REIGN OF GOD breaking into history through Jesus' ministry. 'The kingdom of God is at hand' = the long-awaited reign has begun. Calls for repentance and faith as the response.",
    notMeant:"Not future-only. Not a place. The arrival of God's active rule in person.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Luke 17:21":{
  kingdom:{
    sense:"βασιλεία (basileia, G932) here = GOD'S REIGN AMONG/WITHIN you — already operating where Jesus is, not requiring outward markers. Whether 'within you' (internal) or 'among you' (in your midst, with Jesus standing there) is debated; both readings affirm the reign's present-and-personal nature.",
    notMeant:"Not 'sometime far off when you see signs.' Not 'an inner private experience' alone.",
    auditStatus:"context-reviewed", confidence:"medium"
  }
},
"1 John 4:8":{
  love:{
    sense:"ἀγάπη (agape, G26) here = SELF-GIVING COVENANT LOVE as God's very identity. 'God is love' — agape is who God IS, not a feeling He has.",
    notMeant:"Not 'God is loving' (which would make love an attribute among many). Not feeling. Identity-language: God IS agape.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 5:8":{
  love:{
    sense:"ἀγάπη (agape, G26) here = SELF-GIVING SACRIFICIAL LOVE proven historically. 'God commends his agape toward us, in that, while we were yet sinners, Christ died for us.' The cross is the proof and definition.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 3:23":{
  sin:{
    sense:"ἁμαρτία (hamartia, G266) here = UNIVERSAL HUMAN FAILURE to reach God's standard. 'All have sinned (hēmarton) and come short of the glory of God' — the verb pictures missing the target; the noun summarizes the human condition.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 6:14":{
  sin:{
    sense:"ἁμαρτία (hamartia, G266) here = SIN AS POWER/DOMINION over the unbelieving life. Paul personifies it: sin shall not have dominion. The believer is now under grace's rule, not sin's.",
    notMeant:"Not just individual acts of sin. The personified power.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"1 John 1:8":{
  sin:{
    sense:"ἁμαρτία (hamartia, G266) here = INDWELLING SIN PRINCIPLE that believers still carry. 'If we say we have no sin' = if we deny remaining sin-presence. Calls for ongoing confession (v.9).",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Hebrews 11:1":{
  faith:{
    sense:"πίστις (pistis, G4102) here = ASSURED CONVICTION of unseen realities — the substance/foundation of hope. The chapter then illustrates this conviction in action across OT figures.",
    notMeant:"Not 'blind belief.' Not 'feeling sure.' Grounded conviction that acts.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 1:17":{
  faith:{
    sense:"πίστις (pistis, G4102) here = the FAITH-RESPONSE by which God's saving righteousness is received. The 'from faith to faith' phrasing emphasizes faith as the entry AND ongoing path.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"James 2:17":{
  faith:{
    sense:"πίστις (pistis, G4102) here = the CLAIM TO FAITH that has no fruit — what James calls 'dead' (nekra). Not opposing Paul; insisting that justifying faith always produces works as evidence.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Ephesians 2:8":{
  grace:{
    sense:"χάρις (charis, G5485) here = SAVING DIVINE FAVOR/GIFT — the free, unearned ground of salvation. 'By grace are ye saved through faith; and that not of yourselves: it is the gift of God.'",
    notMeant:"Not 'God overlooks sin.' Not human effort enabled. The free divine gift that grounds salvation.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"2 Corinthians 12:9":{
  grace:{
    sense:"χάρις (charis, G5485) here = DIVINE EMPOWERING SUFFICIENCY in weakness. 'My grace is sufficient for thee: for my strength is made perfect in weakness.' Active divine power supplied in human weakness.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Genesis 6:8":{
  grace:{
    sense:"חֵן (chen, H2580) here = FAVOR/REGARD in the eyes of YHWH. 'Noah found chen in the eyes of the LORD.' Hebrew idiom for being looked-upon-with-favor.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Ephesians 2:10":{
  works:{
    sense:"ἔργα ἀγαθά (erga agatha, G2041) here = GOOD WORKS PREPARED by God for the believer to walk in. The fruit-side of salvation: created in Christ for these works. Not the basis of salvation (v.8-9) but the result.",
    notMeant:"Not 'works of the law.' Not earning. The fruit of grace.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"John 1:1":{
  Word:{
    sense:"λόγος (logos, G3056) here = THE ETERNAL DIVINE WORD — the personal Logos who was with God and was God from the beginning. John borrows philosophical/wisdom vocabulary and redirects it to identify Christ as the divine self-expression.",
    notMeant:"Not 'a word spoken.' Not just 'reason' or 'principle' in the Greek-philosophical sense alone. The personal pre-incarnate Christ.",
    matters:"This single word grounds Christ's deity AND His historical incarnation (v.14). The logos was God AND became flesh.",
    why:"v.1: 'with God' (companionship) + 'was God' (identity); v.3: creator of all things; v.14: 'became flesh' — the same logos. Personal, divine, incarnate.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"John 1:5":{
  light:{
    sense:"φῶς (phos, G5457) here = THE DIVINE LIGHT brought by the Logos into the world's spiritual darkness. Cosmic/spiritual light, not physical illumination.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  darkness:{
    sense:"σκοτία (skotia, G4653) here = SPIRITUAL/MORAL DARKNESS — the realm and condition of unbelief and evil that opposes the divine light. 'Comprehended it not' = did not overcome / did not grasp it.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"1 John 2:15":{
  world:{
    sense:"κόσμος (kosmos, G2889) here = THE FALLEN HUMAN SYSTEM organized apart from God — values, drives, structures that oppose Him. 'Love not the world' = don't be conformed to this system.",
    notMeant:"Not humanity (which God loves, John 3:16). Not creation. The fallen world-pattern.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 12:1":{
  body:{
    sense:"σῶμα (soma, G4983) here = the WHOLE PHYSICAL PERSON offered to God as living worship. Paul deliberately uses soma (body) to anchor worship in tangible bodily life, not just inner spirituality.",
    notMeant:"Not 'inner self only.' Not 'spiritual life apart from the body.' The actual body offered.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"1 Corinthians 6:19":{
  body:{
    sense:"σῶμα (soma, G4983) here = the BELIEVER'S PHYSICAL BODY as the Spirit's temple. Grounds Paul's sexual-ethics argument: the body matters because it belongs to the indwelling Spirit.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 8:14":{
  sons:{
    sense:"υἱοί (huioi, G5207) here = MATURE COVENANT HEIRS who are Spirit-led. Paul's son-language carries the full Roman heir-status (inheritance, authority) — not just minor children.",
    notMeant:"Not gender-restrictive (women equally heirs, Gal 3:28). Not minor offspring. Mature heirs.",
    auditStatus:"context-reviewed", confidence:"high"
  }
}
};
