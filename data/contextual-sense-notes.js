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
    // Covers KJV "carnal" AND BSB "worldly" via the engine's lemma-aware
    // lookup (lemma of "worldly" does not collapse to "carnal", so the
    // BSB-side tap still routes to this entry through Strong's G4559
    // resolved by the word-family map — see resolveContextualWordSense).
    sense:"σαρκικός (sarkikos, G4559) — adjective form of sarx — meaning FLESHLY-IN-CONDUCT. Paul rebukes the Corinthians as still acting from the unrenewed-nature pattern (envy, strife, division) rather than from the Spirit. The word is precisely chosen: not the noun sarx (the pattern itself) but the adjective sarkikos (someone whose behavior matches that pattern). BSB renders this 'worldly'; KJV renders it 'carnal'; both translate the same Greek adjective.",
    notMeant:"Not 'sensual' in the modern English narrow sense. Not 'body-oriented' as a slur on the body. Sarkikos here describes Christian believers behaving in a way that mismatches their Spirit-given identity — childishness, factionalism, jealousy.",
    matters:"Paul calls baptized believers 'carnal/worldly' here — proving that the unrenewed pattern can still operate in genuine Christians. The remedy is not asceticism but maturation in the Spirit (1 Cor 3:1-3; Heb 5:11-14)."
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
},

// ─── GENESIS 1 — Creation narrative curated notes ────────────────────────────
"Genesis 1:1":{
  beginning:{
    sense:"בְּרֵאשִׁית (bereshit, H7225) — 'in the beginning.' Not merely 'first in time' but first in primacy and source. The noun rosh means head, chief, origin; bereshit announces that everything that follows has its origin here in God's creative act. John 1:1 (en archē) echoes this deliberately.",
    notMeant:"Not a date or timestamp. Not implying that something existed before it. The verse claims that the beginning itself was God's creative starting point.",
    matters:"The opening word of Scripture stakes out the foundational claim: all that exists has a source outside itself, and that source is God. Nothing about Genesis 1:1 is accidental — the Hebrew is dense and theologically loaded.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  God:{
    sense:"אֱלֹהִים (Elohim, H430) — plural form of El, used with singular verbs throughout Genesis 1. This is NOT polytheism. The plural is either the 'plural of majesty' (like royal 'we') expressing fullness and transcendence, or it anticipates the fuller revelation of God's inner life (the hint of 'Let us make' in 1:26). In the context of Genesis 1, Elohim is the one Creator who alone speaks, sees, names, and orders all creation.",
    notMeant:"Not multiple gods. Not pagan deities. Not angels speaking with God. The God of Genesis 1 acts with absolute singularity — no divine council approves his work, no battle is fought. He speaks and it is.",
    matters:"The first thing Genesis says about God is that He creates. The opening scene defines His character: sovereign, initiating, effortless, evaluating. Elohim is the cosmic title; the personal covenant name YHWH is introduced in Genesis 2.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  created:{
    sense:"בָּרָא (bara, H1254) — a verb whose subject in the Hebrew Bible is ALWAYS God, never a human. To bara is to bring forth something genuinely new. Whether or not Genesis 1:1 implies creation ex nihilo (out of nothing) is debated, but the verb itself is reserved for divine creative acts that no human or creature can perform.",
    notMeant:"Not 'made from existing materials' in the ordinary sense. Not the same as asah (H6213, to make/fashion, used in v.7, 16, 25). Bara marks the act as categorically different from human craftsmanship.",
    matters:"Genesis 1:1 does not say God formed or assembled — it says He created. The universe is not divine, not self-originating, not eternal alongside God. It had a beginning and that beginning was a free act of the Creator.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  heavens:{
    sense:"הַשָּׁמַיִם (hashamayim, H8064) — 'the heavens.' Hebrew uses the plural shamayim for the sky/heavens (like the English 'skies'). The phrase 'the heavens and the earth' is a Hebrew merism — a figure of speech pairing opposites to mean 'everything': the entire created order from top to bottom.",
    notMeant:"Not only the spiritual realm. Not only outer space. The merism 'heavens and earth' means the total created universe.",
    matters:"Genesis 1:1 declares the scope of God's creation: everything. Not some things or spiritual things — everything. This foundation makes the rest of the chapter an ordering and filling of this total creation.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  earth:{
    sense:"הָאָרֶץ (ha-aretz, H776) — 'the earth.' Used in Gen 1:1 as the second half of the merism 'heavens and earth' = the entire created order. In verse 2, aretz narrows to describe the physical land/ground that was formless and empty before God's ordering work began.",
    notMeant:"Not only the planet's surface. In 1:1 it is part of the cosmic merism for all of creation. From 1:2 onward it refers specifically to the terra firma being shaped and filled.",
    matters:"The same word aretz carries different scope in different contexts — cosmic (1:1), physical land (1:2, 9-10), the land of Israel (Gen 12:1). Recognizing the merism in 1:1 prevents reducing 'God created the heavens and the earth' to only Earth-the-planet.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Genesis 1:3":{
  light:{
    sense:"אוֹר (or, H216) — physical light, created on Day 1 before the sun, moon, and stars (Day 4). This is not the light from celestial objects — those come three days later. Or is the primordial light: whether a separate light-source, or a poetic ordering of the principle of light before its instruments, the text presents light as God's first spoken creation.",
    notMeant:"Not the sun (which is made in 1:14-18 as a 'light-bearer'). Not spiritual illumination here (though or carries that meaning elsewhere — Ps 27:1, Isa 60:19). In this creation-narrative context it is the physical reality God names and separates.",
    matters:"Light on Day 1, light-bearers (the sun, moon, stars) on Day 4: the creation narrative separates the light from its familiar instruments. This either anticipates God himself as ultimate light-source (Rev 21:23) or structures the creation pattern around the Creator's authority over even his instruments.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Genesis 1:4":{
  God:{
    sense:"אֱלֹהִים (Elohim, H430) — the one true Creator God, acting here as sovereign evaluator and ruler over creation. In verse 4, God sees (וַיַּרְא — wayyar') the light and declares it good. This divine seeing is not passive observation but authoritative evaluation: the Creator assesses His work and pronounces it aligned with His purposes.",
    notMeant:"Not pagan gods, angels, human judges, or generic mighty beings. In Genesis 1:4, the context identifies the sole Creator God acting with unrivaled authority — no rival, no council, no opposition. Elohim alone sees, evaluates, separates, and names.",
    matters:"Genesis 1 establishes God's pattern of active evaluation ('God saw that it was good'). His seeing is judicial and royal — it defines what is good by his own character. In verse 4, this is the first divine evaluation in Scripture, setting the standard for what follows.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  light:{
    sense:"אוֹר (or, H216) — the light created in verse 3, now seen, evaluated as good, and separated from darkness. By verse 4-5 light receives a name ('Day') and darkness a name ('Night'), completing the first act of divine ordering.",
    notMeant:"Not the sun (created Day 4). Not spiritual or moral light yet (though or carries that sense in Psalms and Isaiah). Here it is the physical light created on Day 1, being established in its place within the created order.",
    matters:"Naming the light 'Day' is an act of royal authority — in the ANE, naming something was an act of lordship over it. God names the light, establishing the rhythm of day and night that structures all human life.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  good:{
    sense:"טוֹב (tov, H2896) — 'good': aligned with God's purposes, functioning rightly, beautiful and ordered as intended. The repeated refrain 'God saw that it was good' (1:4, 10, 12, 18, 21, 25) and 'very good' (1:31) is not a human aesthetic judgment but a divine declaration that creation corresponds to God's creative intention.",
    notMeant:"Not merely 'nice' or 'pleasant.' Not morally perfect in the human ethical sense. In the creation narrative, tov means well-ordered, flourishing, fitting its purpose — light doing what light is meant to do.",
    matters:"The goodness of creation is God's declaration, not a property the creation possesses independently. This matters for theodicy (why does good creation include suffering?), for material theology (the physical world is good), and for the gospel (redemption restores what sin broke — it does not escape the material world).",
    auditStatus:"context-reviewed", confidence:"high"
  },
  darkness:{
    sense:"חֹשֶׁךְ (choshek, H2822) — darkness. In verse 4, God separates (וַיַּבְדֵּל — wayyavdel) the light from the darkness. The darkness is not created here (Gen 1:2 implies it preceded the creation order) but is assigned its place by God's separating act. Darkness is not portrayed as evil in the creation narrative — it is named 'Night' and given its proper sphere.",
    notMeant:"Do not import later biblical associations (darkness = evil, judgment) into Genesis 1:4. Here darkness is a part of the created order receiving its name and its place. The text does not call darkness 'bad' in the same way it calls light 'good' — it simply separates them.",
    matters:"God's ordering of creation involves separating opposites and giving each its proper place. This is the pattern of Day 1 (light/dark), Day 2 (waters above/below), and Day 3 (sea/dry land). The kingdom principle: God establishes boundaries that order creation for flourishing.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── JOHN 1 — Prologue curated notes ─────────────────────────────────────────
"John 1:1":{
  beginning:{
    sense:"ἐν ἀρχῇ (en archē, G746) — 'in the beginning.' John opens with the exact echo of Gen 1:1 (LXX: en archē). But John's beginning is different: Genesis says 'In the beginning God created' — action starts. John says 'In the beginning WAS the Word' — the Word already existed before the beginning that Genesis describes. The imperfect ēn ('was') signals pre-existence, not creation.",
    notMeant:"Not 'at the start of the Word's existence.' Not 'when things began for the Word.' The grammar insists the Word was already there when the beginning began.",
    matters:"John 1:1 frames the entire Gospel: this Jesus whose story follows is the eternal Word who preceded creation. The miracle of the Incarnation (1:14) is that the pre-existent Creator became creature.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  word:{
    sense:"λόγος (logos, G3056) — Word. In Greek philosophy, logos was the rational principle ordering the cosmos. In Jewish thought (Wisdom, Philo), the Word/Wisdom of God was the agent of creation (Prov 8:22-31). John takes both backgrounds and transcends them: the Logos is not a principle or an intermediary — he is a Person (ho logos), is with God (pros ton theon, face-to-face relation), and IS God (theos ēn ho logos). In verse 14, this Logos becomes flesh. The Logos is Jesus.",
    notMeant:"Not Greek philosophical logos as an impersonal reason-principle. Not Philo's logos as a secondary divine mind. Not simply 'a word spoken.' The logos in John 1 is personal, divine, and Incarnate.",
    matters:"John deliberately answers the two greatest philosophical and theological backgrounds of his audience: for Greeks, the logos-question; for Jews, the Wisdom/Word-of-God tradition. His answer is the same: the logos is Jesus of Nazareth.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  God:{
    sense:"θεός (theos, G2316) — God. In 'and the Word was God' (theos ēn ho logos), John makes the staggering claim: the Word IS God in terms of divine nature. The Greek construction (theos without the article as predicate nominative) affirms genuine deity while preserving the distinction between the Father and the Son ('with God' in the previous clause). This is not a mistake or lesser deity — it is full deity.",
    notMeant:"Not 'a god' (a secondary divine being). Not merely 'divine' in quality. Not 'like God.' The grammar and context of the Prologue identify the Word as fully God while being distinct from the Father — which is exactly what Trinitarian theology preserves.",
    matters:"John 1:1 is the christological foundation of the Gospel. If the Word is God, then His words are God's words, His works are God's works, and His self-giving on the cross is God's own self-giving for the world.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"John 3:16":{
  world:{
    sense:"κόσμος (kosmos, G2889) — 'the world.' In John, kosmos most often means humanity in its fallenness and alienation from God (John 1:10, 17:9). God so loved THIS kosmos — not a selection from it, not the worthy part of it. The scope is universal: God's saving initiative covers the entire fallen human order.",
    notMeant:"Not just Israel. Not just the elect. Not the material universe (though kosmos can mean that). In John 3:16, kosmos is fallen humanity — the very thing that does not know Him (1:10), the very world He did not come to condemn but to save (3:17).",
    matters:"The object of God's agape-love is the kosmos — the alienated, undeserving world. This is the grace of John 3:16: love is directed outward to what is opposite to God, not inward to what deserves it.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  believe:{
    sense:"πιστεύω (pisteuō, G4100) — to trust, entrust oneself to, rely upon. The present tense participle (pas ho pisteuōn — 'everyone who is believing/trusting') indicates ongoing trust, not one-time mental assent. To believe in (eis) the Son is to place one's whole self into the Son's care and authority.",
    notMeant:"Not intellectual agreement with facts about Jesus. Not a momentary prayer with no ongoing entrusting. The Greek eis ('into') + pisteuō means an active reliance and orientation toward the object — it is relational, not merely propositional.",
    matters:"John's Gospel repeats this phrase — 'everyone who believes into him' — as the marker of receiving eternal life. The verb is always present-tense participial (ongoing action), never a one-time past act. Faith is a living orientation, not a past event only.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── ROMANS ─ Key theological terms ──────────────────────────────────────────
"Romans 1:16":{
  gospel:{
    sense:"εὐαγγέλιον (euangelion, G2098) — 'good news.' In the Greco-Roman world, euangelion was the announcement of a great public event: a military victory, the accession of an emperor, the birth of a king's son. Paul uses the same word to announce the decisive event of human history: the death and resurrection of Jesus the Messiah. This is not merely information to believe — it is a royal announcement with the power (dunamis) to accomplish what it announces.",
    notMeant:"Not just good advice or a religious system. Not a private spiritual experience. The euangelion is a public proclamation about a real historical event with universal implications.",
    matters:"Paul says he is 'not ashamed' of the gospel (Rom 1:16) in Rome — the capital of the empire that crucified its King. The gospel is a counter-imperial announcement: the crucified Jesus is Lord, not Caesar.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  power:{
    sense:"δύναμις (dunamis, G1411) — power, force, ability. Paul says the gospel IS (present tense, ongoing reality) the power (dunamis) of God. Not that it has power or conveys power — it is power. The gospel itself, as proclaimed, is the operative force of God that produces salvation.",
    notMeant:"Not merely the power to intellectually persuade. Not a supplementary power added to the gospel. The gospel itself is the dunamis — source of 'dynamite' in English. Wherever the gospel is faithfully proclaimed, God's power is actively working.",
    matters:"This verse rules out both intellectualism (mere arguments) and experientialism (experiences separate from the word) as substitutes for the gospel itself. The message IS the power.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  salvation:{
    sense:"σωτηρία (sōtēria, G4991) — salvation, rescue, wholeness. In the OT background (yeshua, H3444), salvation is God's act of delivering Israel from slavery, enemies, and death. In Paul, salvation encompasses justification (declared righteous, past), sanctification (being made holy, present), and glorification (transformation at resurrection, future). The gospel is the power of God FOR this complete salvation.",
    notMeant:"Not only 'going to heaven when you die.' Not only the forgiveness of past sins. Sōtēria is comprehensive rescue: from guilt, from sin's power, from final condemnation, toward restored relationship with God and ultimate renewal of creation.",
    matters:"Paul says the gospel brings salvation 'to everyone who believes — to the Jew first, and also to the Greek.' The scope is universal; the condition is faith; the source is God's power.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 1:17":{
  righteousness:{
    sense:"δικαιοσύνη (dikaiosynē, G1343) — 'righteousness of God.' This phrase (dikaiosynē theou) in Paul means the covenant-keeping saving justice of God, revealed in the gospel. It is simultaneously God's OWN righteousness (His character of justice) and the righteousness God GIVES/CREDITS to believers (justification — declared right before God). The gospel reveals that God is both righteous (he does not overlook sin) and the justifier (he provides the means of right-standing).",
    notMeant:"Not merely ethical correctness. Not earned human virtue. Not God's punitive anger alone. Dikaiosynē theou in Rom 1:17 encompasses God's saving act that upholds his justice while providing right-standing to the unrighteous.",
    matters:"This verse is the thesis of Romans. Luther's rediscovery of 'the righteousness of God' as gift rather than demand launched the Reformation. Romans 3:21-26 unpacks it in full.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  faith:{
    sense:"πίστις (pistis, G4102) — trust, faithfulness, loyalty. 'From faith to faith' (ek pisteōs eis pistin) likely means the entire process is faith-shaped: it originates in God's faithfulness (the faithfulness of Christ, G4102 used of Christ's own trust/obedience in some readings) and is received by human faith. The OT proof-text 'the just shall live by his faith' (Hab 2:4) uses emunah (H530) — steadfast loyalty.",
    notMeant:"Not intellectual agreement alone. Not self-generated belief as the root cause of salvation. Faith here is trust directed at the God who acts in the gospel.",
    matters:"Hab 2:4 is quoted three times in the NT (Rom 1:17, Gal 3:11, Heb 10:38) — each time making it foundational to the life of God's people. The just person lives by ongoing trust, not by occasional belief-moments.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},
"Romans 8:1":{
  condemnation:{
    sense:"κατάκριμα (katakrima, G2631) — the verdict/penalty of condemnation. Paul says 'There is now NO katakrima for those in Christ Jesus.' This is not 'no feeling of guilt' or 'no consequences' — it is the legal/covenantal reality: the death-verdict that sin earns has been absorbed by Christ's death (Rom 8:3-4). The condemned person has been acquitted. The penalty has been paid.",
    notMeant:"Not 'no discipline' (God still disciplines sons, Heb 12). Not 'no consequences for sin in this life.' Not an emotional state. Katakrima is the judicial penalty — and that penalty is gone for those in Christ.",
    matters:"'No condemnation' is the foundation of the Christian life Paul describes in Romans 8. Everything that follows — life in the Spirit, groaning with creation, intercession, final glorification — rests on this single covenantal fact: the verdict is 'not guilty' in Christ.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── MATTHEW 5 — Beatitudes ───────────────────────────────────────────────────
"Matthew 5:3":{
  blessed:{
    sense:"μακάριος (makarios, G3107) — 'blessed / happy / fortunate.' In Greek culture, the makarios person had everything needed for flourishing — wealth, honor, position. Jesus systematically applies makarios to people who lack those things (the poor in spirit, the mourning, the meek). The word announces a divine declaration and reality, not merely a feeling: these are the ones whom God accounts fortunate and upon whom the kingdom's blessings rest.",
    notMeant:"Not simply 'happy' in the modern emotional sense. Not 'congratulations for being virtuous.' Makarios is a status-announcement: these people are in the position of flourishing before God, regardless of their current circumstances.",
    matters:"The Beatitudes reverse the world's calculus. The kingdom's blessed are those the world accounts poor, weak, or marginal. Jesus' opening words in the Sermon on the Mount redefine what a 'blessed life' looks like under kingdom rule.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  poor:{
    sense:"πτωχός (ptōchos, G4434) — destitute, absolutely poor, begging-poor. 'Poor in spirit' (ptōchos tō pneumati) does not primarily mean 'humble in attitude' (though that is an outcome). It means those who know their total spiritual bankruptcy before God — those with nothing to offer, no spiritual capital, fully dependent. Matthew 5:3's 'in spirit' localizes ptōchos: it is spiritual destitution, not necessarily material.",
    notMeant:"Not simply 'materially poor' (Luke 6:20 addresses that application; Matthew's version adds 'in spirit'). Not 'casually humble.' Ptōchos is the most severe Greek word for poverty — the beggar, not the merely middle-class.",
    matters:"The kingdom of heaven belongs to the spiritually destitute — to those who have abandoned self-reliance before God. This is the starting point of the kingdom life: not merit, not spiritual wealth, but recognized need.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── HEBREWS 11 — Faith defined ───────────────────────────────────────────────
"Hebrews 11:1":{
  faith:{
    sense:"πίστις (pistis, G4102) — faith, trust, conviction. Hebrews 11:1 gives the only definitional statement about faith in the NT: 'Now faith is the substance (hupostasis) of things hoped for, the evidence (elenchos) of things not seen.' Faith is not the opposite of evidence — it IS evidence; specifically, it is the subjective confidence that functions as the assurance and proof of future realities. Hebrews then illustrates this with 17 OT examples who acted on unseen promises.",
    notMeant:"Not 'believing what you know isn't true.' Not hoping without grounds. Not the absence of reason. Faith in Hebrews is grounded in the character of the God who promises — the examples in ch. 11 trusted God's word, not their own feelings.",
    matters:"The chapter that follows 11:1 is the 'hall of faith' — 17 OT examples of people who acted on unseen promises. The definition in 11:1 is proved by the examples that follow: faith is present-confidence in future realities based on what God has already shown Himself to be.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  substance:{
    sense:"ὑπόστασις (hupostasis, G5287) — 'substance/assurance.' Used in classical Greek for a legal guarantee or foundation of a claim; in the papyri it appears in title-deeds. In this context it means faith is the title-deed — the present possession — of future realities. The thing hoped for is future; the hupostasis (the assurance of it) is present, and that present assurance IS faith.",
    notMeant:"Not 'the physical substance' of hoped-for things. Not 'a feeling of certainty.' Hupostasis is structural assurance — the foundation under a building, the backing behind a claim.",
    matters:"This Greek word also appears in Hebrews 1:3 ('the exact imprint of his [the Father's] hupostasis'). In both places it carries the weight of what is really, foundationally real. Faith is the reality in the present of what is not yet visible.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── EPHESIANS 2 — Grace through faith ───────────────────────────────────────
"Ephesians 2:8":{
  grace:{
    sense:"χάρις (charis, G5485) here is the sovereign, unearned, unmerited GIFT of God that is the source of salvation. Paul says salvation has been given (perfect tense — permanent completed act) 'by grace' (chariti) — the means is God's gift, not human merit. The grace is the divine side of the transaction; faith (pistis) is the human reception of what grace offers.",
    notMeant:"Not 'grace' as a human virtue or charm. Not earned favor. Not God's response to human effort. Charis here is the pure initiative of God toward those who deserved the opposite.",
    matters:"Eph 2:8-9 is the most compact statement of justification by grace through faith in Paul: 'not of yourselves... not of works, lest any man should boast.' The structure: grace as source, faith as instrument, not works as the basis. Verse 10 immediately follows with works as the FRUIT: 'we are his workmanship, created in Christ Jesus FOR good works.'",
    auditStatus:"context-reviewed", confidence:"high"
  },
  faith:{
    sense:"πίστεως (pisteōs, G4102) — through faith (dia pisteōs). Faith is the instrument through which grace reaches the person, not the cause of salvation. Paul emphasizes 'and that not of yourselves' — even the faith is the gift of God, not self-generated. Whether 'that' refers to the faith or the salvation as a whole is debated; but either way, Paul removes all human boasting from the equation.",
    notMeant:"Not works. Not merit. Not effort. Not anything in the person that makes them deserve or generate the grace. Faith itself is the open hand, not the price paid.",
    matters:"'By grace through faith' is a precise formula: grace is the source, faith is the channel. The same distinction appears in Romans 5:1-2: 'justified by faith, we have access by faith into this grace.' Faith opens access to what grace provides.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── PSALM 23 — Shepherd Psalm ────────────────────────────────────────────────
"Psalms 23:1":{
  shepherd:{
    sense:"רֹעֶה (ro'eh, H7462) — shepherd, one who pastures and cares for flocks. 'The LORD is my shepherd' (YHWH ro'eh) is a royal and covenantal statement. In the ANE, the shepherd metaphor was used for kings who cared for their people (Ezek 34 uses it to condemn Israel's rulers who failed this role). Psalm 23 claims YHWH himself fulfills what human kings fail to provide: true care, provision, guidance, and protection.",
    notMeant:"Not merely a pastoral image of gentleness. Not a statement about God's personality only. The shepherd metaphor in the ANE is specifically about responsible governance and care.",
    matters:"Jesus claims this title for himself in John 10:11 ('I am the good shepherd') — deliberately identifying himself with YHWH of Psalm 23 and Ezekiel 34. The New Covenant shepherd is the one who lays down his life for the sheep.",
    auditStatus:"context-reviewed", confidence:"high"
  }
},

// ─── ISAIAH 53 — Suffering Servant ───────────────────────────────────────────
"Isaiah 53:5":{
  wounded:{
    sense:"מְחֹלָל (mecholal, H2490) — pierced, profaned, wounded. The word can mean 'pierced through' (as with a weapon) or 'profaned' (made common/unholy). In Isaiah 53:5, the servant is 'pierced/wounded FOR our transgressions' — the preposition min (for/because of) places the cause of the wounding on the people's sin. This verse is cited in connection with the Crucifixion in the NT (John 19:37, Rev 1:7).",
    notMeant:"Not metaphorically wounded (the broader suffering is described separately). Not wounded for his own reasons. The preposition structure is explicit: the wounding is ON ACCOUNT OF OUR transgressions.",
    matters:"Isaiah 53 is quoted or alluded to more than any other OT text in the NT. Verse 5 specifically identifies the substitutionary logic: the servant bears what we caused. This is the backbone of atonement theology.",
    auditStatus:"context-reviewed", confidence:"high"
  },
  peace:{
    sense:"שָׁלוֹם (shalom, H7965) — wholeness, completeness, peace, flourishing. 'The chastisement of our shalom was upon him.' The servant's punishment produces SHALOM for the people — not just the absence of conflict but the restoration of completeness and right-relation with God.",
    notMeant:"Not merely the end of hostility. Shalom in the OT is positive, not just negative: it is flourishing, wholeness, alignment, the state of nothing missing and nothing broken.",
    matters:"Isa 53:5 connects the servant's suffering to our shalom — a word that shows up in the high-priestly blessing (Num 6:24-26), in Jesus' greeting to the disciples (John 20:19-21), and in the final state of the new creation (Rev 21:4).",
    auditStatus:"context-reviewed", confidence:"high"
  }
}
};
