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
"Genesis 1:1":{
  beginning:{
    sense:"בְּרֵאשִׁית (bereshit, H7225) — the opening word of Scripture, from rosh (head, chief, first in primacy). Not merely a timestamp but a declaration of God's sovereign priority: everything that follows has its origin and source in God's creative act. John 1:1 deliberately echoes this word (en archē, 'in the beginning') but with the imperfect tense 'was' — showing the Word already existed before the beginning that Genesis describes.",
    notMeant:"Not a date or clock-start. Not implying that something else co-existed before it. Bereshit does not say 'at time-point zero' but announces that the beginning itself was God's creative starting point — he is prior to and the source of the beginning.",
    why:"Genesis 1:1 is a superscription-summary of everything that follows: the entire creative work is framed as originating in God. The word reshit elsewhere means 'firstfruits' (the best, the choicest offered first) — so the beginning is also the premier, the primacy-declaration.",
    matters:"If the beginning is God's, nothing is self-originating or eternal alongside him. This is the foundation of all biblical theology: Creator/creature distinction, the goodness of creation as gift, and the ground of redemption — what God made he can renew.",
    auditStatus:"context-reviewed"
  },
  created:{
    sense:"בָּרָא (bara, H1254) — a verb whose grammatical subject in the entire Hebrew Bible is exclusively God. Humans make (asah), form (yatsar), build (banah) — but only God baras. Whether or not the verse implies creatio ex nihilo (from nothing) is debated, but the verb itself marks the act as categorically beyond human capacity and distinguishes it from the ordinary fashioning described in later verses (asah in 1:7, 16, 25).",
    notMeant:"Not the same as asah (H6213, to make/fashion from existing material). Not artistic craft in the human sense. Bara is the God-only creative act that initiates what did not exist before.",
    why:"Genesis uses bara at three pivotal moments: 1:1 (the cosmos), 1:21 (living creatures), 1:27 (humanity). Each marks a qualitative threshold that only divine action can cross. Psalm 51:10 draws on this: 'Create (bara) in me a clean heart' — David asks God to apply Genesis-1 creative power to his inner life.",
    matters:"The universe is not divine, not self-originating, not eternal alongside God. It is the free, purposeful act of a Creator who stands outside and above it — which is why he can also redeem it.",
    auditStatus:"context-reviewed"
  },
  God:{
    sense:"אֱלֹהִים (Elohim, H430) — the plural form of El used with a singular verb (bara, 'he created'). Not polytheism: the plural is either the 'plural of majesty' expressing fullness and transcendence, or an early hint of the inner-divine plurality that is more fully revealed later (cf. 1:26 'let us make'). In Genesis 1, Elohim is the sole, unrivaled Creator — no council approves his work, no chaos-dragon opposes him. He speaks, and it is.",
    notMeant:"Not multiple gods. Not pagan divine assembly. Not angels assisting in creation. The singular verb throughout Genesis 1 is grammatically definitive: one God acts.",
    why:"Genesis chose Elohim (the cosmic power-title) rather than YHWH (the covenant personal name) for the creation narrative — presenting God as the universal Creator before revealing him as the covenant-partner. YHWH appears in Gen 2:4 when the personal, relational dimension of God's dealing with humanity begins.",
    matters:"The opening of Scripture defines God as Creator-sovereign before anything else. Every other divine attribute — love, justice, covenant faithfulness — is exercised by the one who first created everything out of nothing.",
    auditStatus:"context-reviewed"
  },
  heavens:{
    sense:"הַשָּׁמַיִם (hashamayim, H8064) — the heavens/sky, always plural in Hebrew (like 'skies' in English). In 1:1 it forms the first half of the Hebrew merism 'heavens and earth' — a figure pairing polar opposites to mean the totality: everything from top to bottom, the entire created order. The merism signals comprehensiveness: God created not some things but ALL things.",
    notMeant:"Not only the spiritual realm where God dwells. Not only outer space. The merism 'heavens and earth' is a single statement about the whole of reality.",
    why:"The Hebrew merism is confirmed by how the rest of Genesis 1 fills in the details — the text then proceeds to describe what the heavens and earth consist of, systematically filling the totality that 1:1 declared.",
    matters:"Genesis 1:1 stakes a totalizing claim: every dimension of existence — seen and unseen, sky and ground, physical and whatever is beyond — has God as its source. Nothing is outside the scope of his creative act.",
    auditStatus:"context-reviewed"
  },
  earth:{
    sense:"הָאָרֶץ (ha-aretz, H776) — earth, land, ground. In 1:1 it completes the cosmic merism 'heavens and earth' and means the entire material realm. In 1:2 the same word narrows to the physical ground that was tohu va-bohu (formless and empty) before God's ordering work. The word eretz carries different scope at different scales: cosmic (1:1), physical terrain (1:2, 9-10), promised land (Gen 12:1).",
    notMeant:"In 1:1 it is not only the planet's surface or only the land of Israel — it is the cosmic counterpart to shamayim in the merism. From 1:2 onward the scope narrows progressively to the terra firma being shaped.",
    why:"Recognizing the merism prevents reducing 'God created the heavens and the earth' to only Earth-the-planet. The verse announces the creation of the entire cosmos; the verses that follow describe how God ordered it.",
    matters:"The earth as God's creation is declared good (1:4, 10, 12, 18, 21, 25, 31). Material reality is not a lesser realm to escape but the very thing God made, evaluated, and will ultimately renew (Rev 21:1 — new heavens and new earth).",
    auditStatus:"context-reviewed"
  }
},
"Genesis 1:2":{
  formless:{
    sense:"תֹּהוּ (tohu, H8414) — waste, desolation, not-yet-shaped emptiness. The same word Isaiah uses for the result of divine judgment (Isa 34:11; 45:18 — 'he did not create it tohu; he formed it to be inhabited'). In Gen 1:2, tohu is the pre-ordered state of the earth before God's creative work gives it form and function — not evil in itself but potential awaiting actualization.",
    notMeant:"Not a permanent evil state or chaos opposed to God. Not proof that God created something bad. Tohu is the not-yet — like an unformed lump of clay before the potter works it.",
    why:"The contrast between the tohu va-bohu of 1:2 and the tov (good) declarations of 1:4-31 is the structural drama of Genesis 1: God transforms formless emptiness into ordered, inhabited, flourishing creation. Each day gives form (days 1-3) or fills (days 4-6) what was tohu and bohu.",
    matters:"Creation is not God battling chaos but God graciously forming and filling what was simply not yet. This shapes the theology of redemption: God's new creation work (2 Cor 5:17; Rev 21) similarly transforms what is disordered into what is gloriously ordered.",
    auditStatus:"context-reviewed"
  },
  void:{
    sense:"בֹּהוּ (bohu, H922) — emptiness, void. Appears only three times in the OT (Gen 1:2; Isa 34:11; Jer 4:23), always paired with tohu. The compound tohu va-bohu (formless and empty) became a fixed phrase for chaos and desolation — Jeremiah 4:23 uses it to describe the devastation of judgment as an 'un-creation,' reversing Genesis 1.",
    notMeant:"Not the same as darkness (a different word, choshek). Bohu is about the absence of content/inhabitants, while tohu is about the absence of form/structure.",
    why:"The pairing tohu va-bohu frames the entire first creation account: days 1-3 address the tohu (giving shape to formless realms: light/dark, sky/sea, land/vegetation), days 4-6 address the bohu (filling the empty realms: luminaries, birds/fish, land animals/humans).",
    matters:"The literary structure of Gen 1 is theologically intentional — God systematically addresses both the formlessness and the emptiness, showing that his creative work is comprehensive and purposeful, not random.",
    auditStatus:"context-reviewed"
  },
  darkness:{
    sense:"חֹשֶׁךְ (choshek, H2822) — darkness, the absence of light and order. In Gen 1:2 it covers the deep before God speaks light into existence. In this verse choshek is not yet evil — it is simply the not-yet-ordered condition. God does not destroy it but names it and assigns it its place (1:5 — 'darkness he called Night'). The later biblical association of darkness with evil and judgment (Isa 5:20; John 1:5) develops from this foundational cosmology.",
    notMeant:"Do not import the later moral-spiritual sense of darkness into Gen 1:2. Here it is the pre-creation condition receiving God's ordering, not a power opposed to God.",
    why:"God's first creative word (1:3) is 'let there be light' — directly responding to the choshek of 1:2. The ordering of creation begins with the most fundamental separation: light from darkness. This pattern of separation (badal, 1:4, 6, 7, 14, 18) is God's primary creative technique.",
    matters:"The fact that God names and orders darkness rather than eliminating it grounds the biblical realism about dark seasons — darkness has its place in God's ordered creation. The eschatological vision (Rev 22:5 — 'no night there') is not creation's original state restored but something beyond it.",
    auditStatus:"context-reviewed"
  },
  deep:{
    sense:"תְּהוֹם (tehom, H8415) — the primordial waters, the deep. A cognate of the Babylonian Tiamat (the chaos-dragon whom Marduk battles in the Enuma Elish creation myth), but Genesis systematically demythologizes it: tehom in Gen 1:2 is not a divine opponent or chaos monster — it is simply water, a material reality that God's Spirit broods over and that God later names and limits (1:9-10). The mythological background makes Genesis's theology sharper by contrast: what pagans feared as a divine enemy is, for Israel, just water under God's control.",
    notMeant:"Not a chaos-being or divine opponent. Not the equivalent of Tiamat with personhood and will. The demythologizing is the point — tehom is water, not deity.",
    why:"Genesis 1 is written against the background of ANE creation myths and deliberately reframes everything. The deep that terrified the nations is just the substrate over which God's Spirit moves — utterly under his governance from the first verse.",
    matters:"Israel's God does not fight his way to creation; he speaks creation into being effortlessly. This shapes the theology of God's sovereignty: no power in creation is a true rival to him, not even the most fearsome natural forces.",
    auditStatus:"context-reviewed"
  },
  Spirit:{
    sense:"רוּחַ אֱלֹהִים (ruach Elohim, H7307) — the Spirit of God, moving/hovering over the face of the waters. Ruach means wind, breath, or spirit — context and the genitive 'of God' make this the divine Spirit actively present over the pre-creation waters. The verb merachephet (hovering, H7363) appears elsewhere only in Deut 32:11 where a mother eagle hovers protectively over her young — nurturing, life-sustaining presence, not passive observation.",
    notMeant:"Not 'a mighty wind' (some modern translations prefer this, but the construct ruach Elohim with the personal, life-tending verb strongly favors the Spirit reading). Not a weather phenomenon. Not a later editorial insertion of pneumatology.",
    why:"The Spirit's brooding presence in 1:2 anticipates the entire theology of the Spirit as the life-giver: the Spirit who animates Adam (Gen 2:7, neshamah), who fills the craftsmen who build the tabernacle (Ex 31:3), who raises the dry bones (Ezek 37:14), and who regenerates believers (John 3:5-8). Creation and new creation share the same Spirit.",
    matters:"The Spirit is present at the very inception of creation — which grounds Trinitarian creation theology (the Father creates through the Son and by the Spirit) and establishes the Spirit as the agent of all life, order, and flourishing.",
    auditStatus:"context-reviewed"
  }
},
"Genesis 1:3":{
  light:{
    sense:"אוֹר (or, H216) — physical light, created on Day 1 before the sun, moon, and stars (which come on Day 4). Or is the first thing God speaks into existence, establishing that light is God's own creative act, prior to and independent of any celestial instrument. The same Hebrew word carries the full range of metaphorical light throughout Scripture: salvation (Ps 27:1), Torah (Ps 119:105), and God's own radiant presence (Isa 60:19-20).",
    notMeant:"Not the sun (created Day 4 as the 'great light-bearer,' meor). Not yet spiritual or moral light — in this verse or is the physical reality God creates by his word. The metaphorical sense develops from this physical foundation.",
    why:"Light on Day 1, light-bearers on Day 4: the deliberate separation shows that light's ultimate source is God's creative word, not the astronomical objects that carry it. This shapes the eschatological vision of Rev 21:23 — 'the city has no need of sun or moon, for the glory of God gives it light.'",
    matters:"The first act of creation is God speaking light into darkness — which becomes the paradigm for all divine action: 'God who said, Let light shine out of darkness, has shone in our hearts' (2 Cor 4:6). Creation-light and new-creation-light share the same divine source.",
    auditStatus:"context-reviewed"
  },
  said:{
    sense:"וַיֹּאמֶר (wayyomer, from amar, H559) — God spoke, said, declared. The ten divine speech-acts of Genesis 1 ('And God said') are the structural skeleton of the creation account — creation proceeds by God's word alone, with no physical effort, no battle, no raw materials fetched. The word goes out and reality conforms to it (cf. Ps 33:6, 9 — 'By the word of YHWH the heavens were made; he spoke and it came to be').",
    notMeant:"Not a magical incantation. Not divine thought without utterance. The form wayyomer emphasizes the actual speaking — the creative word is a real event, not merely a metaphor for divine intention.",
    why:"The creation-by-word pattern in Genesis 1 is the direct background for John 1:1-3 (the Word through whom all things were made) and for Hebrews 11:3 ('by faith we understand that the universe was ordered by the word/rhema of God').",
    matters:"God's word has creative, reality-making power. This grounds the theology of Scripture (God's word accomplishes what he sends it to do, Isa 55:10-11), of proclamation (the gospel is the power of God, Rom 1:16), and of prayer (the word spoken in faith carries divine authority).",
    auditStatus:"context-reviewed"
  }
},
"Genesis 1:4":{
  good:{
    sense:"טוֹב (tov, H2896) — good in the sense of functionally fit, well-ordered, aligned with God's purpose — not merely aesthetically pleasing. The repeated divine evaluation 'God saw that it was tov' (1:4, 10, 12, 18, 21, 25) and the climactic 'very tov' (1:31) declare that each element of creation is working exactly as God intended, fitting its purpose in the ordered whole. Tov here is simultaneously functional (it works), relational (God approves it), and aesthetic (it is beautiful).",
    notMeant:"Not morally perfect in the human ethical sense — tov in this context is about creation flourishing according to God's design. Not merely a human aesthetic judgment about pleasing appearance.",
    why:"The tov evaluations structure the creation narrative and build toward the climax of 1:31 — everything together is 'very tov.' This divine approval is what makes the fall (Gen 3) so devastating: sin corrupts what God himself declared tov.",
    matters:"The goodness of creation is God's declaration, grounded in his character. This rules out the Gnostic view that matter is evil or that the physical world is a lesser realm — God looked at the material world and said tov. The gospel restores and renews tov creation; it does not escape it.",
    auditStatus:"context-reviewed"
  },
  separated:{
    sense:"וַיַּבְדֵּל (wayyavdel, from badal, H914) — to divide, separate, distinguish. God's primary creative technique in Genesis 1 is badal: separating light from darkness (1:4), waters above from waters below (1:6-7), day from night (1:14, 18). The same verb is used for the Levitical call to distinguish clean from unclean (Lev 10:10) and for Israel being set apart from the nations (Lev 20:24-26). Separation/distinction is how God creates order from chaos.",
    notMeant:"Not rejection or condemnation of what is separated from. God separates light from darkness but names and gives a place to both. Badal is ordering, not destroying.",
    why:"The pattern of badal in Genesis 1 establishes the principle that order requires distinction — the created world is structured by differentiation, not uniformity. Collapsing God's distinctions (mixing the sacred and profane, the holy and common) is the underlying pattern of sin throughout the OT.",
    matters:"Creation's goodness is inseparable from its ordered distinctions. The new creation (Rev 21-22) does not abolish all distinction but fulfills it — the new Jerusalem is the ultimate ordered space, with walls, gates, foundations, river, and tree each in their proper place.",
    auditStatus:"context-reviewed"
  }
},
"Genesis 2:7":{
  formed:{
    sense:"וַיִּיצֶר (wayyitzer, from yatsar, H3335) — to form, shape, mold as a potter shapes clay. The same word is used of a potter working clay (Isa 29:16; Jer 18:2-6) and of God forming the nation of Israel (Isa 43:1; 44:2). God's formation of Adam from dust is a potter's act — intimate, hands-on, purposeful craftsmanship. The doubled yod in the Hebrew (וַיִּיצֶר) is unusual and has been interpreted as hinting at a dual nature (body and spirit) in the creature being formed.",
    notMeant:"Not bara (the God-exclusive creative act of Gen 1:1). Not asah (to make generally). Yatsar is specifically the craftsman's shaping — suggesting intimacy and intentionality in the creation of the human person.",
    why:"The shift from bara (1:27) to yatsar (2:7) in the parallel accounts reflects two different theological emphases: bara highlights the divine initiative and categorical newness of human existence; yatsar highlights the intimate, artisanal care with which God shaped each human body.",
    matters:"God is not a distant manufacturer of humanity but a craftsman who handles and shapes. This intimacy grounds the theology of human dignity: we are each formed by the hands (metaphorically) of God, not mass-produced.",
    auditStatus:"context-reviewed"
  },
  dust:{
    sense:"עָפָר (aphar, H6083) — dry earth, fine particles of ground, dust. The same word used for the dirt of the ground (Gen 3:19 — 'for dust you are and to dust you shall return'), for ashes (Num 19:17), and for the soil of the earth. The wordplay adam (humanity) from adamah (ground, H127) is the interpretive key: the human creature's material composition comes from the earth itself — humanity is intrinsically earthy, creaturely, not divine in its material origin.",
    notMeant:"Not a statement that humans are worthless or contemptible (though Gen 18:27 uses aphar for self-abasement). The dust-origin is not degradation but grounding — humans are creatures, not gods, and their dignity comes from what is added to the dust (God's breath), not from denying the dust.",
    why:"The aphar/adamah wordplay is Genesis's anthropology compressed: human beings are simultaneously lowly (formed from soil) and elevated (animated by divine breath). Both truths are essential — the denial of either produces distortion.",
    matters:"Paul in 1 Cor 15:47-49 uses the 'dust' of Adam ('the first man is from the earth, earthy/choikos') against the 'heavenly' of the last Adam (Christ) to explain resurrection: the dusty-body is sown, the spiritual-body raised. Gen 2:7's aphar is the background of resurrection anthropology.",
    auditStatus:"context-reviewed"
  },
  breath:{
    sense:"נִשְׁמַת (nishmat, from neshamah, H5397) — the divine breath-spark breathed directly by God into the formed dust. Neshamah is distinct from ruach (the general word for wind/breath/spirit) and appears specifically for the divine life-breath that makes humanity uniquely alive. God did not merely speak Adam into existence (as with other creatures) — he breathed personally into Adam's nostrils, the most intimate creative act in Genesis.",
    notMeant:"Not ruach (H7307, the broader spirit/breath/wind). Not nephesh (which is what Adam becomes AFTER the neshamah is breathed in — nephesh is the result, not the breath itself). Neshamah is specifically the divine animating breath, not the resulting living state.",
    why:"Job 32:8 ('the neshamah of the Almighty gives understanding') and Job 33:4 ('the neshamah of the Almighty has made me alive') show that neshamah is the ongoing source of human intellectual and spiritual life, not just the initial animation event.",
    matters:"Human intellectual, moral, and spiritual capacity is grounded in the divine neshamah — which grounds both human dignity (we are breath-of-God creatures) and human accountability (the One whose breath we carry is the One to whom we answer).",
    auditStatus:"context-reviewed"
  },
  "living soul":{
    sense:"נֶפֶשׁ חַיָּה (nephesh chayah, H5315 + H2416) — a living being, a living creature. The exact same phrase is used of animals in Gen 1:20, 24 — 'let the waters teem with nephesh chayah.' Adam is a nephesh, not merely has one. Nephesh is the whole self as alive, the unified personal existence that results from body + divine breath — not a separable soul-part that pre-exists or survives the body independently.",
    notMeant:"Not a Greek-philosophical disembodied soul that inhabits a body. Not a detachable immortal fragment distinct from the physical person. The Hebrew nephesh is the whole living being — dust animated by divine breath.",
    why:"This verse directly contradicts the popular notion that humans have a soul separate from the body. The biblical anthropology is: dust + neshamah = nephesh. The human person IS the nephesh — body-spirit unity, not a body containing a soul.",
    matters:"Resurrection (1 Cor 15) restores the whole nephesh — body included. The goal of salvation is not escaping the body but the redemption of the body (Rom 8:23). Reading Gen 2:7 with Greek dualism systematically distorts eschatology from resurrection to disembodied afterlife.",
    auditStatus:"context-reviewed"
  }
},
"Genesis 2:15":{
  tend:{
    sense:"לְעָבְדָהּ (leovdah, from abad, H5647) — to serve, work, till — but abad is the most theologically loaded work-word in Hebrew, because it is the same root used for serving God (Ex 3:12 — 'you shall serve/abad God on this mountain'), for priestly temple service (Num 3:7-8 — the Levites abad the tabernacle), and for worshipping pagan gods (Deut 4:19 — 'do not abad them'). Adam's work in the garden is priestly service — he is the priest-gardener of God's temple-garden.",
    notMeant:"Not merely agricultural labor in the modern sense. Not a curse (that comes in Gen 3:17-19 when abad-work becomes painful). In 2:15, the garden-work is dignified, priestly, joyful service before the fall.",
    why:"The identification of Eden as a temple and Adam as a priest-servant is confirmed by the verbal parallels between Gen 2:15 (abad and shamar) and the commands given to Levitical priests in Num 3:7-8 (the same two verbs for guarding and serving the tabernacle).",
    matters:"Work is pre-fall, priestly, and worshipful. The curse of Gen 3 does not introduce work but introduces the pain and futility of work. The gospel vision of Revelation (Rev 22:3 — 'his servants will abad him') restores the priestly service of Eden in the new creation.",
    auditStatus:"context-reviewed"
  },
  keep:{
    sense:"וּלְשָׁמְרָהּ (uleshomrah, from shamar, H8104) — to guard, keep, watch over, protect. The same word used for keeping God's covenant (Gen 17:9; Deut 6:17), keeping the commandments (Deut 4:2), and guarding the sanctuary (Num 3:7-8). Adam's task to shamar the garden means he is its guardian — responsible for its protection against anything that would violate it. The failure of this guarding becomes pointed when the serpent enters in Gen 3.",
    notMeant:"Not merely maintenance (tending is abad). Shamar implies watchful guardianship against potential threat — implying that even before the fall there was something to guard against.",
    why:"The appearance of the serpent in Gen 3:1 immediately after the shamar command in 2:15 is narratively pointed: Adam, commissioned as guardian, fails to guard. His presence at the conversation (3:6 — 'with her' suggests he was there) without exercising his shamar role is the first failure of the covenant guardian.",
    matters:"Spiritual leadership (for Adam, for fathers, for pastors) is shamar-work — not domination but protective guardianship. The High Priestly prayer of John 17 shows Jesus as the perfect shamar: 'Holy Father, keep (tērēson, the Greek equivalent) them in your name... I kept (etērēsa) them.'",
    auditStatus:"context-reviewed"
  }
},
"Genesis 2:17":{
  die:{
    sense:"מוֹת תָּמוּת (mot tamut, from mut, H4191) — the Hebrew infinitive absolute + finite verb construction, meaning 'dying you shall die' or 'you shall surely die.' The construction intensifies certainty and possibly process: not merely that death will eventually happen, but that a death-process begins the moment of disobedience. The phrase could encompass both the spiritual death (separation from God, immediately evident in 3:8 when they hide) and the physical death that eventually follows.",
    notMeant:"Not 'you might die' or 'death is possible.' The doubling removes all ambiguity: the consequence is certain. Not only spiritual death (the physical death of Gen 3:19 is also in view) and not only physical death (the broken fellowship of Gen 3 is immediate evidence of the sentence executing).",
    why:"Paul interprets this death as universal in Rom 5:12 ('through one man sin entered the world, and death through sin, and so death spread to all men') and as the 'wages of sin' in Rom 6:23. The mot tamut of Gen 2:17 is the death Christ reverses.",
    matters:"The death-sentence of 2:17 shapes the entire biblical narrative: everything from the sacrificial system (blood/life for blood/life) to the cross (Christ bearing the death we earned) is the unfolding of and response to this single divine word.",
    auditStatus:"context-reviewed"
  }
},
"Genesis 3:1":{
  serpent:{
    sense:"נָחָשׁ (nachash, H5175) — serpent, snake. The word also shares a root with nachash meaning 'to practice divination/enchantment' and is related to nechoshet (bronze/shining). The serpent in Gen 3 is identified in Rev 12:9 as 'the ancient serpent, who is the devil and Satan' — but Genesis presents him as a creature (3:1 — 'among the wild animals that YHWH God had made'), raising the question of how a creature became the tempter. The theological tradition identifies this as a creature who became the vehicle or embodiment of evil.",
    notMeant:"Not merely a snake in the zoological sense with no further significance. Not yet explicitly named as Satan in Genesis itself — that identification develops through the canon (Ezek 28, Isa 14, Rev 12-20).",
    why:"The serpent's entrance in 3:1 is narratively shocking: the garden that Adam was to guard (shamar, 2:15) has been entered by an adversary. The wordplay between arum (crafty, 3:1) and arumim (naked, 2:25) is pointed — the shrewdness that should distinguish the wise (Prov 12:16) is here turned toward deception.",
    matters:"The nachash introduces the questioning of God's word ('Did God really say...?') as the fundamental move of temptation. Every subsequent temptation in Scripture and in human experience follows this pattern: doubt the word, reinterpret the word, replace the word with self-defined wisdom.",
    auditStatus:"context-reviewed"
  },
  crafty:{
    sense:"עָרוּם (arum, H6175) — shrewd, clever, prudent. The same word used positively in Proverbs for the wise person who foresees danger and acts wisely (Prov 12:16; 14:8, 15). In Gen 3:1 it describes the serpent as more arum than any other creature — the wordplay with arumim (naked, 2:25, from the same root differently applied) sets up the irony: the nakedness-without-shame of 2:25 will be undone by the shrewdness-toward-evil of 3:1.",
    notMeant:"Not morally evil in itself — arum simply means shrewd and clever. The serpent's arum is real intelligence directed toward a destructive goal. The word does not condemn intelligence; it shows what happens when intelligence serves the wrong master.",
    why:"The arum/arumim wordplay frames the transition from Gen 2 to Gen 3: what begins with innocent nakedness (arumim, nothing to hide) ends with the serpent's shrewdness (arum) producing shame that drives them to cover themselves (3:7). The vocabulary marks the fall's trajectory.",
    matters:"The NT calls believers to be 'wise as serpents and innocent as doves' (Matt 10:16, using phronimos/serpent) — wisdom is to be redeemed and redirected, not abandoned. James 3:13-17 distinguishes earthly, demonic 'wisdom' from the wisdom from above.",
    auditStatus:"context-reviewed"
  }
},
"Genesis 3:15":{
  enmity:{
    sense:"אֵיבָה (eybah, H342) — hostility, enmity, deep-seated hatred. Not merely tension but active opposition between two parties. God himself places (shet, I will put) this enmity between the serpent and the woman — it is divinely initiated, not naturally arising. This divine-placed hostility is the beginning of cosmic conflict between the seed of the woman and the seed of the serpent that runs through all of Scripture.",
    notMeant:"Not a casual discomfort between humans and snakes. Eybah is relational warfare, covenantal opposition. The hostility is personal and perpetual — 'between you and the woman, between your seed and her seed.'",
    why:"This verse, the proto-euangelion (first gospel), is the earliest announcement of God's redemptive plan: the conflict is real, it will be costly, but it will end with the serpent's defeat. Every subsequent biblical narrative of struggle between good and evil is the outworking of this Genesis 3:15 eybah.",
    matters:"The church's conflict with evil is not a surprise but a promised reality rooted in Gen 3:15. Ephesians 6:12 ('we wrestle not against flesh and blood') and Revelation's cosmic warfare imagery both presuppose the Gen 3:15 framework of divinely-ordered cosmic conflict.",
    auditStatus:"context-reviewed"
  },
  seed:{
    sense:"זֶרַע (zera, H2233) — seed, offspring, descendants. The grammatical unusual feature of 'her seed' (zar'ah, feminine possessive) rather than 'his seed' or 'their seed' is pointed: in the ANE, seed/lineage was traced through the father. The reference to the woman's seed hints toward a specific, individual descendant of the woman who will deal the fatal blow — the Messiah born of a woman (Gal 4:4), without a human father (Isa 7:14).",
    notMeant:"Not simply the collective human race vs. snakes. Not merely metaphorical. The singular 'he' (hu, masculine) who crushes the serpent's head points toward an individual champion within the collective seed.",
    why:"Paul in Gal 3:16 employs the same singular/collective seed argument: 'to Abraham and to his seed — he does not say seeds, as of many, but seed, as of one, who is Christ.' The same interpretive move applies in Gen 3:15 — the collective seed has one ultimate representative.",
    matters:"Genesis 3:15 is the entire gospel in embryo: conflict (eybah), suffering (bruised heel), and victory (crushed head). Every prophet, every sacrifice, every king in Israel's history is the partial working-out of this promise until its fulfillment in the death and resurrection of Jesus.",
    auditStatus:"context-reviewed"
  },
  heel:{
    sense:"עָקֵב (aqev, H6119) — heel, and by extension the rear of an army (Gen 49:19), or what follows behind. The serpent strikes the aqev — the vulnerable heel — while the seed crushes the serpent's head (rosh). The contrast is between a wounding blow and a fatal blow: the serpent can hurt but not kill; the seed can and does kill. The cross is the aqev-striking (the pain of crucifixion) that paradoxically accomplishes the rosh-crushing (the defeat of the serpent).",
    notMeant:"Not an equal contest — head-crushing vs. heel-bruising is inherently asymmetric. The serpent's wound to the seed is severe but temporary; the seed's wound to the serpent is fatal and permanent.",
    why:"The contrast of aqev and rosh (heel/head) carries the logic of the cross and resurrection: Christ's crucifixion is the heel-wound (real, agonizing, apparently fatal), but his resurrection is the proof that the head-crushing blow has been landed and the serpent's authority over death is broken.",
    matters:"Colossians 2:15 ('he disarmed the rulers and authorities and put them to open shame, triumphing over them in him') and Heb 2:14-15 ('through death he might destroy the one who has the power of death') are the NT's commentary on Gen 3:15's aqev and rosh.",
    auditStatus:"context-reviewed"
  }
},
"Exodus 3:14":{
  "I AM":{
    sense:"אֶהְיֶה אֲשֶׁר אֶהְיֶה (Ehyeh Asher Ehyeh, H1961) — 'I AM WHO I AM' or 'I WILL BE WHAT I WILL BE.' From the verb hayah (to be, exist, become), this divine self-designation defines God as the self-existent One who does not derive his existence or identity from anything outside himself. The name is simultaneously past ('I was'), present ('I am'), and future ('I will be') — God's existence is not sequential but eternal and unified. The name YHWH (the Tetragrammaton) is derived from this same hayah root in causative form: 'He causes to be / He who makes things happen.'",
    notMeant:"Not merely a philosophical claim about existence. Not evasion ('I am what I am, figure it out'). The name in its context (Ex 3:12-17) is a covenant declaration: the same God who was with Abraham, Isaac, and Jacob will be with Moses and Israel — his 'I AM' is both his eternal nature and his covenant-faithfulness-promise.",
    why:"When Jesus says 'Before Abraham was, I AM (egō eimi)' in John 8:58, he directly invokes the Ehyeh of Exodus 3:14 — the divine self-designation — which is why the crowd picks up stones. And in John's Gospel, the seven 'I AM' statements (I am the bread of life, the light of the world, etc.) all carry this Exodus-3 freight.",
    matters:"The divine name grounds all prayer, all covenant, and all theology: God's people are always appealing to the I AM — the One whose existence is underived, whose presence is guaranteed, and whose purposes do not change because his being does not change.",
    auditStatus:"context-reviewed"
  }
},
"Exodus 20:3":{
  "other gods":{
    sense:"אֱלֹהִים אֲחֵרִים (elohim acherim, H430 + H312) — other gods, strange gods. The first commandment does not say other gods do not exist — it forbids giving them allegiance and worship. Israel lived among cultures with elaborate pantheons; the command is not primarily a metaphysical claim about other gods' ontological status but an exclusive loyalty demand: YHWH alone receives Israel's worship, service (abad), trust (batach), and love (ahab). The Shema (Deut 6:4-5) is the positive counterpart: YHWH is our God, YHWH alone.",
    notMeant:"Not a concession that other gods are equally real. The OT's trajectory is toward denying their reality (Isa 44:6-20 — idols are nothing), but the first commandment's force is relational and covenantal, not primarily ontological.",
    why:"The covenant context of Ex 20 is crucial: YHWH has just rescued Israel from Egypt (20:2 — 'I am YHWH your God, who brought you out of Egypt, out of the house of slavery'). The commandment flows from the relationship already established by grace — you are already mine, so worship none other.",
    matters:"Paul in 1 Cor 8:4-6 addresses the underlying reality: 'an idol is nothing in the world' and 'there is no God but one' — yet real spiritual powers operate behind the idols (1 Cor 10:20). The first commandment addresses both: ontologically, YHWH alone is God; relationally, he alone receives our total allegiance.",
    auditStatus:"context-reviewed"
  },
  "before me":{
    sense:"עַל פָּנַי (al panay, H6440) — 'before my face, in my presence, over against me.' The preposition al panay is spatial and relational: no other god may occupy the space before YHWH's face — which is everywhere. There is no private life, no secret corner of loyalty, no internal room where another god may reign. The face (panim) of YHWH is his full personal presence — the commandment says his presence tolerates no rival in any dimension of life.",
    notMeant:"Not merely 'no idols in the temple.' Not a public-only rule allowing private idolatry. Al panay means in YHWH's sight, which is everywhere and always — there is no zone outside his face.",
    why:"The Psalms make the same point positively: 'Where shall I go from your Spirit? Or where shall I flee from your presence (panim)?' (Ps 139:7). There is no place outside the panay of God — which makes the first commandment's scope absolute.",
    matters:"Heart-idolatry (Ezek 14:3-5 — idols in the heart, not just the shrine) is covered by al panay. Jesus' summary 'Love the Lord your God with all your heart, soul, mind, and strength' is the positive fulfillment: total inner loyalty, no divided face.",
    auditStatus:"context-reviewed"
  }
},
"Exodus 20:7":{
  name:{
    sense:"שֵׁם (shem, H8034) — name as identity, character, authority, and reputation. The third commandment is not primarily about saying 'Oh my God' as a swear word — it is about invoking YHWH's name (his person, his identity, his authority) in ways that misuse that invocation. The Hebrew lashav (for emptiness, falsehood, vanity) covers: swearing falsely in God's name, making promises in God's name you don't intend to keep, using God's name to validate your own agenda, or treating the divine name as a magic formula.",
    notMeant:"Not restricted to verbal profanity alone. The commandment is about all forms of taking the divine shem (identity-authority) for trivial, false, or self-serving purposes — including claiming divine authorization for what God has not authorized.",
    why:"The broader context of covenants sworn in God's name (Lev 19:12 — do not swear falsely by my name), prophetic speech ('thus says YHWH' when YHWH did not say it, Jer 23:25-32), and religious fraud all fall under this commandment.",
    matters:"Jesus addresses the heart of this commandment in Matt 5:33-37 ('Let your yes be yes') — the person whose word is perfectly reliable has no need to invoke God's name. The commandment's goal is truthfulness so complete that divine-name-invoking becomes unnecessary.",
    auditStatus:"context-reviewed"
  }
},
"Psalm 22:1":{
  forsaken:{
    sense:"עֲזַבְתָּנִי (azavtani, from azav, H5800) — you have forsaken me, abandoned me, left me behind. Azav is used for a spouse abandoning another (Isa 54:7 — 'for a brief moment I azav you'), for children forsaking their parents, and here for the most agonizing experience of divine abandonment. Jesus quotes this verse in Aramaic from the cross (Matt 27:46; Mark 15:34 — Eli, Eli, lema sabachthani), deliberately identifying himself with the suffering righteous of Psalm 22 and, more profoundly, bearing the actual God-forsakenness that human sin deserves.",
    notMeant:"Not a statement that Jesus was confused or doubting. Not theological error on the cross. The cry is the fulfillment of the psalm's pattern: the righteous sufferer cries out in real abandonment-experience and is ultimately vindicated (Ps 22:24 — 'he has not despised or scorned the suffering of the afflicted one; he has not hidden his face from him').",
    why:"2 Corinthians 5:21 ('he made him who knew no sin to be sin for us') and Gal 3:13 ('Christ became a curse for us') are the theological explanation of the azav-cry: the forsaking is real, substitutionary, and temporary — reversed in the resurrection.",
    matters:"The cross is the only place where true divine azav occurs — so that those who trust in Christ need never experience it. Romans 8:38-39 is the reversal: nothing 'will be able to separate (chorizo) us from the love of God' — the azav of the cross purchases the inseparability of the believer from God.",
    auditStatus:"context-reviewed"
  },
  "my God":{
    sense:"אֵלִי (Eli, H410) — my God, the possessive form of El (God). Even in the cry of desolation, the psalmist — and Jesus on the cross — does not release the possessive: 'MY God.' The relationship claimed by the possessive 'my' is not abandoned even in the experience of abandonment. This is the grammar of faith under extreme duress: God is still 'mine' even when his presence is not felt.",
    notMeant:"Not an ironic or abandoned relationship-claim. The possessive is deliberate and theologically significant — it holds the covenant relationship even when experiential access to God is lost.",
    why:"Psalm 22 moves from the desolate 'my God, my God, why?' (vv.1-21) to the triumphant 'they will proclaim his righteousness' (vv.22-31). The possessive 'my God' in verse 1 is the thread of faith that persists through the darkness and anchors the eventual vindication.",
    matters:"The believer's ultimate security is not in the experience of God's presence but in the covenant relationship expressed in 'my God.' Lamentations 3:24 ('YHWH is my portion, therefore I will hope in him') makes the same move: the possessive holds even when the experience is anguish.",
    auditStatus:"context-reviewed"
  }
},
"Psalm 23:1":{
  shepherd:{
    sense:"רֹעֶה (ro'eh, H7462) — shepherd, one who pastures, feeds, leads, and protects a flock. In the ANE, 'shepherd' was the standard political metaphor for a king's care of his people — and the OT uses it to evaluate and condemn Israel's leaders who failed this role (Ezek 34 — the shepherds who fed themselves instead of the flock). Psalm 23 takes the ultimate royal metaphor and assigns it to YHWH himself: the covenant God IS the shepherd, doing what no human king fully did.",
    notMeant:"Not merely a pastoral image of gentleness or softness. The shepherd in the ANE is a figure of responsibility, authority, and courageous protection — the shepherd carries a rod (shebet, Ps 23:4) and fights off lions and bears (1 Sam 17:34-35).",
    why:"Jesus claims this psalm for himself in John 10:11 ('I am the good shepherd') and in John 10:14 ('I know my sheep and my sheep know me') — directly placing himself as the YHWH of Psalm 23. The identification is the most explicit self-claim to divine identity in the Fourth Gospel's shepherd discourse.",
    matters:"The shepherd Psalm grounds every subsequent biblical shepherd-theology: the eschatological shepherd of Ezek 34:23 (David my servant as shepherd), the good shepherd of John 10, and the great shepherd of Heb 13:20. What Psalm 23 declares about YHWH, the NT ascribes to Jesus.",
    auditStatus:"context-reviewed"
  },
  lack:{
    sense:"אֶחְסָר (echsar, from chasar, H2637) — to lack, be without, be in need. 'I shall not lack/want' is a present-tense faith declaration — not a description of David's circumstances (he was often in desperate need, hunted, in exile) but a statement of covenant certainty: under YHWH's shepherding, ultimate need will not be my condition. The verb's force is in the 'shall not' — it is a volitional future certainty, not a factual present report.",
    notMeant:"Not a prosperity-gospel claim that the believer will lack for nothing materially. David wrote Psalm 23 in various circumstances of difficulty. The chasar is existential completeness under God's care, not material abundance.",
    why:"Philippians 4:19 ('my God will supply every need of yours according to his riches in glory in Christ Jesus') is the NT echo — the supply is real but its measure is divine riches, and its form is shaped by the cross-and-resurrection economy rather than the world's.",
    matters:"The opening declaration sets the tone for the entire psalm: because YHWH is my shepherd, everything that follows (green pastures, still waters, valley of shadow, enemies) is navigated within a relationship of sufficiency. The starting point is trust, not assessment of circumstances.",
    auditStatus:"context-reviewed"
  }
},
"Psalm 23:4":{
  "valley of the shadow of death":{
    sense:"גֵּיא צַלְמָוֶת (ge tsalmavet, H1516 + H6757) — valley of deep darkness or death-shadow. Tsalmavet combines tsalal (to be dark) and mavet (death) — producing either 'deep darkness' or 'death's shadow,' and possibly both simultaneously. The ge (valley) is a wadi or narrow ravine where danger could lurk, light was scarce, and predators could ambush flocks. Whether or not this is a reference to literally dying, the phrase evokes the most threatening, sight-depriving, and fear-inducing terrain the shepherd could lead the sheep through.",
    notMeant:"Not merely metaphorical darkness without real danger. Not death-anxiety alone. The valley is a place of genuine mortal risk — the rod and staff (v.4b) are tools the shepherd uses precisely because real threats are present.",
    why:"Jesus walks through the ge tsalmavet of the cross (the darkest valley) as the shepherd who goes before the sheep — John 10:15 ('I lay down my life for the sheep'). The comfort for the believer in their own darkest valleys is that the shepherd has walked this way and knows every turn.",
    matters:"Psalm 23:4 has accompanied the dying throughout Jewish and Christian history precisely because it does not minimize the darkness — 'even though I walk through' acknowledges real danger — while insisting that the shepherd's presence ('you are with me') transforms the experience from abandonment to accompanied.",
    auditStatus:"context-reviewed"
  },
  rod:{
    sense:"שֵׁבֶט (shebet, H7626) — rod, club, scepter. Used by shepherds as a weapon against predators (the weapon that drives off wolves and lions), as a counting tool (shepherds passed sheep under the rod, Lev 27:32), and as a symbol of authority (the ruler's scepter is a shebet, Gen 49:10). In Psalm 23:4, the rod is comfort because it represents the shepherd's protective authority — his capacity and willingness to fight for the sheep.",
    notMeant:"Not a punishment tool here (though shebet is used for discipline in Prov 13:24 — 'spare the shebet, hate the child'). In the shepherd context, the shebet is protective weaponry and authority-symbol.",
    why:"The rod (protective force) and staff (supportive guide) together represent the shepherd's dual role: fighting for the sheep and guiding them. The comfort is in the combination — strength and gentleness, protection and direction.",
    matters:"Hebrews 4:12 pairs God's word with a sharp sword; Rev 2:27 and 12:5 speak of Christ ruling with a rod (rhabdos) of iron — the royal-shepherd's authority is real, and for the sheep it is the ground of safety, not threat.",
    auditStatus:"context-reviewed"
  },
  staff:{
    sense:"מִשְׁעַנְתֶּךָ (mishantecha, from mishen/mishenah, H4938) — your support-staff, walking staff. The shepherd's staff (distinct from the club/rod) is the long crook used for guiding sheep, pulling them back from edges, lifting them from pits, and leaning on when walking. Its presence is comfort because it signals the shepherd is near enough to physically intervene in the sheep's path.",
    notMeant:"Not the same as the rod (shebet). The mishenah is support and guidance; the shebet is protection and authority. Together they represent comprehensive shepherding: both 'I will fight for you' and 'I am walking with you.'",
    why:"Isaiah 36:6 uses mishenah negatively ('the staff of broken reeds — Egypt') — a staff that snaps under your weight is worse than no staff. YHWH's mishenah does not snap; his support is reliable because he is the self-existent I AM.",
    matters:"The comfort of 23:4 is not that the valley is eliminated or made pleasant but that the shepherd is present — the rod and staff together say 'I am here, I can protect, and I am guiding you through, not around.' This is the biblical pattern of suffering: not removal but accompanied passage.",
    auditStatus:"context-reviewed"
  }
},
"Psalm 51:1":{
  mercy:{
    sense:"חַסְדְּךָ (chasdecha, from chesed, H2617) — your lovingkindness, your covenant love. David does not appeal to God's general mercy (chen, H2580, which he will use in v.1b) but to YHWH's chesed — his covenant-faithful love, the love that cannot abandon the covenant partner even when they have violated it. This is significant: David's sin with Bathsheba and against Uriah was enormous — he appeals not to merit or even to basic mercy but to the very covenant-character of YHWH that makes forgiveness possible.",
    notMeant:"Not chen (general favor). Not general sentimentality. Not what David deserves. Chesed is covenant love — the love YHWH chose to bind himself to Israel by, and which David trusts will not be revoked even now.",
    why:"Exodus 34:6-7 is the background: 'YHWH, YHWH, a God merciful and gracious, slow to anger, and abounding in chesed and emet, keeping chesed for thousands, forgiving iniquity and transgression and sin.' David is appealing to the divine self-disclosure of Sinai — to the God who already revealed himself as chesed-abounding.",
    matters:"The basis of repentance is not human sincerity but divine character. Psalm 51 begins not with David's contrition but with YHWH's chesed — the ground for the whole prayer is what God is, not what David deserves. This is the structure of all true repentance and prayer.",
    auditStatus:"context-reviewed"
  },
  "blot out":{
    sense:"מְחֵה (mecheh, from machah, H4229) — to wipe out, erase, blot out. The metaphor is a written record — in the ANE, accounts and records were written on clay tablets or papyrus and could be erased by wiping. David asks for his transgressions to be erased from whatever divine ledger they are recorded on. Isaiah 43:25 and 44:22 use machah the same way: 'I, I am he who blots out (macheh) your transgressions for my own sake.'",
    notMeant:"Not 'overlook' or 'ignore' — machah is the complete erasure of what was written, not a looking-away. The record is actually removed, not filed and forgotten.",
    why:"The machah metaphor anticipates the NT's apographo/exaleipho imagery: Colossians 2:14 says Christ 'canceled the record of debt (cheirographon) that stood against us... nailing it to the cross.' The divine record of our sin is not filed away but crucified.",
    matters:"Forgiveness in Scripture is not amnesia or moral relativity — it is the real cancellation of a real record. The legal and covenantal weight of sin is actually borne (by the sacrificial system in shadow, by Christ in reality), not simply dismissed.",
    auditStatus:"context-reviewed"
  }
},
"Psalm 51:10":{
  create:{
    sense:"בְּרָא (bera, H1254) — the God-exclusive bara of Genesis 1, used here by David for the creation of a new heart. This is deliberate and extraordinary: David knows that moral renewal is beyond human capacity, beyond self-improvement, beyond religious discipline — it requires the same creative act that brought the cosmos into existence. 'Create in me a clean heart' is a new-creation prayer.",
    notMeant:"Not 'restore' or 'repair' or 'help me improve.' David uses the one verb in Hebrew that can only have God as its subject — he is explicitly asking for what only God can do.",
    why:"The connection between Ps 51:10 and the new covenant promise of Ezekiel 36:26 ('I will give you a new heart and put a new spirit within you') is profound: both use creation/newness language for inner transformation. Paul's 'new creation' (2 Cor 5:17; ktisis kaine) stands in this OT stream.",
    matters:"This verse is the proof-text that human transformation is not self-improvement but divine creative act — which grounds the entire theology of regeneration (John 3:3, 'born again/from above'), sanctification by the Spirit (Gal 5:22-25), and ultimate glorification (Phil 1:6 — 'he who began a good work in you will complete it').",
    auditStatus:"context-reviewed"
  },
  clean:{
    sense:"טָהוֹר (tahor, H2889) — clean, pure — both ceremonially (the ritual purity required for approaching God in worship) and morally (the inner condition of integrity and uprightness). David asks for a lev tahor (clean heart) — the inner self (lev) made fit for God's presence. The same tahor standard required for the priests who served in the sanctuary is here asked for as the inner reality of the worshipper's own heart.",
    notMeant:"Not merely external compliance. Not ritual purity alone (which a priest could achieve by washing). David asks for the inner lev to be tahor — which the law's external rites could point toward but not produce.",
    why:"Jesus' sixth beatitude (Matt 5:8 — 'blessed are the pure/katharos in heart') is the NT echo: the goal of redemption is not behavioral modification but inner purification that produces clear vision of God. Hebrews 10:22 promises 'hearts sprinkled clean (katharizō) from an evil conscience' through the blood of Christ.",
    matters:"The tahor heart is the prerequisite for the vision of God (Matt 5:8) and for authentic worship (John 4:24 — worship in spirit and truth comes from the inside). External religion without lev tahor is exactly what all the prophets condemned.",
    auditStatus:"context-reviewed"
  }
},
"Isaiah 53:4":{
  borne:{
    sense:"נָשָׂא (nasa, H5375) — to lift up, carry, bear. The servant literally lifts and carries the griefs (cholayenu) and sorrows (mak'oveynu) of others — the porter-image is physically concrete. The same word is used for bearing sin (Lev 5:17 — the one who sins nasa his iniquity) and for the scapegoat bearing (nasa) the sins of Israel into the wilderness (Lev 16:22). The servant is the ultimate sin-bearer, the one who takes what belongs to others and physically carries it as his own.",
    notMeant:"Not merely sympathizing or feeling alongside. Nasa is active transference — the griefs are moved from the people onto the servant. Matthew 8:17 quotes this verse in connection with Jesus' healing ministry: 'He took (elaben, but citing Isa 53:4) our infirmities and bore our diseases.' Both physical and spiritual bearing are in view.",
    why:"The structure of Isa 53:4 is substitutionary in grammar: 'surely he has borne OUR griefs and carried OUR sorrows — yet we esteemed him stricken by GOD.' The people are surprised to discover the servant's suffering was not his own guilt but theirs.",
    matters:"The nasa-theology grounds NT substitutionary atonement: Christ bore (nasa) what belonged to us (our guilt, judgment, curse) so that what belongs to him (righteousness, blessing, life) might become ours. 2 Cor 5:21 and Gal 3:13 are the theological unpackings.",
    auditStatus:"context-reviewed"
  },
  smitten:{
    sense:"מֻכֵּה (mukkeh, from nakah, H5221) — struck, smitten. The same verb used for the plagues of Egypt (YHWH struck/nakah Egypt), for God striking an individual in judgment, and for the shepherd being struck (Zech 13:7 — 'strike the shepherd and the sheep will scatter,' quoted by Jesus in Matt 26:31). In Isa 53:4, the people assumed the servant was 'mukkeh Elohim' — struck by God as punishment for his own sin (the common ANE assumption that suffering = divine punishment for personal guilt).",
    notMeant:"Not struck by human enemies primarily. The verse says the people thought he was struck by God (mukkeh Elohim) — and they were right in the mechanism (v.10 — 'it was YHWH's will to crush him') but wrong in the reason (not his own sin but ours).",
    why:"The divine passives in Isa 53 (struck, crushed, wounded) indicate that behind the human agents of crucifixion is divine purpose — Acts 4:27-28 makes this explicit: Herod, Pilate, and the Gentiles did 'whatever your hand and your plan had predestined to take place.'",
    matters:"The fact that the servant is both genuinely punished by God AND innocent of personal sin is the heart of atonement: God is both the judge who executes the sentence and the Savior who provides the substitute. Romans 3:25-26 explains the same logic.",
    auditStatus:"context-reviewed"
  }
},
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
},
"Isaiah 53:6":{
  iniquity:{
    sense:"עָוֹן (avon, H5771) — iniquity, guilt, and the punishment of that guilt, all three at once in a single Hebrew word. 'YHWH has laid on him the avon of us all' means our guilt, our moral twistedness, and the punishment it merits have all been transferred to the servant. This triple meaning makes avon more comprehensive than the English 'iniquity': it covers the sin committed, the culpability incurred, and the consequence deserved.",
    notMeant:"Not only the acts of sin (chattat). Not only the guilt-feeling. Avon encompasses the objective reality of moral corruption and its penal weight — all of which falls on the servant.",
    why:"The Hebrew of 53:6 is structurally elegant: 'All of us like sheep went astray... YHWH has caused to fall on him the iniquity (avon) of all of us.' The all (kullanu) appears twice — the universality of the straying and the universality of the transfer are matched.",
    matters:"Romans 4:25 ('he was delivered over for our trespasses') and 2 Cor 5:21 ('he made him who knew no sin to be sin for us') are the NT articulations of this avon-transfer. The servant bears the full avon — guilt, guilt-consequence, and punishment — so that those who were the straying sheep bear it no more.",
    auditStatus:"context-reviewed"
  },
  sheep:{
    sense:"צֹאן (tson, H6629) — sheep, flock. 'All we like sheep (tson) have gone astray; each one has turned to his own way.' The tson metaphor here emphasizes not woolly innocence but the directional helplessness of sheep — they wander not because they are malicious but because they have no inherent sense of direction and follow their own immediate inclination rather than the shepherd's path. The 'own way' (darko — his own derek) is the individual self-direction that leaves the path of the good shepherd.",
    notMeant:"Not a flattering comparison — sheep in the ancient world were not admired for intelligence. The comparison highlights human tendency to scatter, to follow individual appetite, to stray without realizing the danger.",
    why:"Jesus picks up this exact language in John 10 and Luke 15 — the lost sheep is found by the shepherd who leaves the ninety-nine. The tson of Isa 53:6 (straying sheep) become the found sheep of the NT through the work of the servant-shepherd.",
    matters:"The diagnosis of the human condition in Isa 53:6 is not 'rebellious' (though rebellion is real) but 'wandering' — we have each gone our own way, which is both the definition of sin (missing the mark/path) and the predicament that requires a seeking shepherd rather than merely a legal transaction.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 5:3":{
  blessed:{
    sense:"μακάριος (makarios, G3107) — spiritually prosperous, divinely fortunate, in the state of God's favor. In classical Greek, the makarios person was the one who had everything needed for flourishing — wealth, health, honor. Jesus applies makarios systematically to people the world accounts destitute (poor in spirit, mourning, meek, hungry). This is not wishful thinking but a divine declaration: these are the ones upon whom the kingdom's blessings actually rest, regardless of present appearances.",
    notMeant:"Not 'emotionally happy' in the modern subjective sense. Not a congratulation for virtue achieved. Makarios is a status-pronouncement: these people are in the position of genuine God-favored flourishing, not because of how they feel but because of what the kingdom is doing for them.",
    why:"The Beatitudes are royal proclamations at the opening of the Sermon on the Mount — Jesus speaks as the King of the kingdom, pronouncing the new economy of blessing that his reign inaugurates. The shock is that the blessed are the exact opposite of who Rome, or conventional religion, would name.",
    matters:"The Beatitudes function as the new economy against which all human systems of honor and success are evaluated. They establish that under God's kingdom, the world's calculus is inverted — which is why they are simultaneously comfort (to the suffering) and confrontation (to the comfortable).",
    auditStatus:"context-reviewed"
  },
  "poor in spirit":{
    sense:"πτωχοὶ τῷ πνεύματι (ptōchoi tō pneumati, G4434 + G4151) — destitute in spirit, spiritually bankrupt. Ptōchos is the most severe Greek poverty word — not merely 'not rich' (penes) but the absolute beggar who crouches and has nothing of his own to offer. 'In spirit' (tō pneumati, dative of sphere) localizes the poverty: it is spiritual destitution, the recognition of total dependence on God with no spiritual capital to bring. Matthew's version adds 'in spirit' to Luke's plain 'poor' (Luke 6:20), specifying the inner orientation rather than economic status.",
    notMeant:"Not simply materially poor (Luke's version addresses that application). Not moderately humble or casually self-deprecating. Ptōchos is begging-poor — utterly without spiritual self-sufficiency.",
    why:"The connection to Isaiah 66:2 is important: 'to this one I will look: to the one who is humble and contrite in spirit and trembles at my word.' The poor in spirit of Matt 5:3 are those who have arrived at the Isaiah 66:2 posture — the ones God looks toward, the ones to whom the kingdom belongs.",
    matters:"This beatitude is the gateway to all the others: only those who recognize their own spiritual poverty are capable of mourning their sin (v.4), submitting in meekness (v.5), hungering for righteousness (v.6), showing mercy (v.7), and pursuing peace (v.9). The entire kingdom life flows from acknowledged poverty.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 5:4":{
  mourn:{
    sense:"πενθέω (pentheō, G3996) — to grieve deeply, to mourn with active lamentation. This is not passive sadness or wistful melancholy — pentheō is the word for mourning the dead (Mark 16:10; Rev 18:15), for intense grief that shows itself outwardly. In Matt 5:4, the mourning is not specified as mourning over a particular thing, but the context of 'poor in spirit' suggests that seeing one's own spiritual poverty produces genuine grief — the grief that the world calls weakness but God calls readiness for comfort.",
    notMeant:"Not clinical depression or chronic sadness as a spiritual virtue. Not the mourning of hopeless despair. Pentheō here is the acute, active grief of those who see clearly — the opposite of spiritual numbness or self-satisfaction.",
    why:"Isaiah 61:2-3 is the background: the Spirit-anointed servant comes 'to comfort all who mourn (penthountas)' — the same word — and to give 'a garment of praise instead of a spirit of heaviness.' The mourning of Matt 5:4 is the condition that makes one receptive to Isaiah's consolation.",
    matters:"Jesus himself mourns (John 11:35 at Lazarus's tomb; Luke 19:41 weeping over Jerusalem) — the makarios mourners are those who grieve what God grieves, which is the beginning of prophetic sensitivity and compassionate ministry.",
    auditStatus:"context-reviewed"
  },
  comforted:{
    sense:"παρακληθήσονται (paraklēthēsontai, from parakaleō, G3870) — they will be called alongside, comforted, encouraged. The verb shares its root with Paraclete (paraklētos, G3875 — the Comforter/Advocate, the Holy Spirit in John 14-16). Parakaleō literally means 'to call alongside' — the comforter comes to stand with the grieving person. The future passive indicates divine action: God will do the calling-alongside; the comforted do not generate their own comfort.",
    notMeant:"Not 'things will eventually get better' in a general optimistic sense. Not self-consolation. The divine passive (they will be comforted by God himself) grounds the comfort in God's active initiative, not in the passage of time.",
    why:"The eschatological comfort promised here (they WILL be comforted — future tense) connects to the new creation where 'God will wipe away every tear' (Rev 21:4) — the ultimate fulfillment of the beatitude. But the Spirit as Paraclete gives present foretastes of that final comfort (John 14:16-18).",
    matters:"The second beatitude pairs mourning and comfort as inseparable: you cannot receive the comfort without the mourning, and the mourning is not the end — it is the threshold to God's active consoling presence. This is the pattern of resurrection: through death to life, through grief to comfort.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 5:5":{
  meek:{
    sense:"πραεῖς (praeis, from praus, G4239) — gentle, meek — not in the sense of weakness or passivity. Praus in Greek described a horse trained to obey commands — powerful, capable, but with that power under the direction of the rider. Aristotle used praus for the mean between excessive anger and no anger at all — appropriate, directed, controlled response. Moses is called the meekest man on earth (Num 12:3, LXX uses praus) — not because he was timid but because his extraordinary power was fully submitted to God's direction.",
    notMeant:"Not weakness, timidity, or the absence of strength. Not the virtue of those who have no power. Praus is power that is redirected, controlled, submitted — the opposite of the tyrannical use of strength for self-assertion.",
    why:"Jesus applies praus to himself in Matt 11:29 ('I am meek/praus and lowly in heart') — not a description of weakness but of the one who has all power and uses it entirely in submission to the Father's will and in service of the weak.",
    matters:"The makarios who are praus inherit the ge (earth/land) — echoing Psalm 37:11. The meek, not the powerful, are the covenant heirs. This is the upside-down economy of the kingdom: power submitted to God is the only power that inherits the earth, while power grasped for self loses everything.",
    auditStatus:"context-reviewed"
  },
  inherit:{
    sense:"κληρονομήσουσιν (klēronomēsousin, from klēronomeō, G2816) — to inherit, to receive as a covenant heir. The klēros (lot/allotment) + nomos (law/rule) together form the word for receiving what is legally and covenantally yours as an heir. In the OT background, Israel inherits (nachal) the Promised Land as covenant heirs of the Abrahamic promise. The meek inheriting the ge (earth) in Matt 5:5 expands the Promised Land promise to its ultimate scope — the renewed earth of the new creation as the inheritance of God's covenant people.",
    notMeant:"Not earning by merit. Not taking by force (which would contradict meekness). Inheritance is received, not achieved — it is the legal right of those who are in the family and in the covenant.",
    why:"Galatians 3:29 ('if you belong to Christ, then you are Abraham's seed, heirs according to the promise') shows that the meek-inherit-the-earth beatitude is covenant-heir language. Romans 8:17 ('heirs of God and co-heirs with Christ') extends this further.",
    matters:"The earth (ge) is the inheritance, not an escape from it — which grounds the theology that the goal of redemption is not evacuation of the earth but its renewal and inheritance by the meek. Rev 21:1 ('new earth') is the beatitude's fulfillment.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 5:6":{
  hunger:{
    sense:"πεινῶντες (peinōntes, from peinaō, G3983) — to be famished, starving, experiencing the most urgent physical need for food. Jesus takes the most basic biological drive — the survival-level hunger of a person who has not eaten — and applies it to the hunger for dikaiosynē (righteousness). The intensity of physical starvation-hunger is what the kingdom appetite for righteousness should feel like: not a casual preference, not a moderate interest, but the urgency of survival.",
    notMeant:"Not 'interested in righteousness' or 'generally appreciating justice.' Peinaō is the word for genuine starvation — the desperation that makes every other priority secondary.",
    why:"The pairing with dipsaō (thirst) doubles the intensity: hunger and thirst together represent the most extreme physical deprivation. Jesus says those whose kingdom-appetite reaches this survival-level urgency will be satisfied (chortasthēsontai — filled to fullness).",
    matters:"The beatitude diagnoses the problem of nominal religion: it lacks hunger. Religious routine can coexist with the absence of desperate desire for God's righteousness. The kingdom calls people into hunger — the recognition that righteousness is not a supplement but the food the soul requires to live.",
    auditStatus:"context-reviewed"
  },
  thirst:{
    sense:"διψῶντες (dipsōntes, from dipsaō, G1372) — to be parched with thirst, to experience the physiological urgency of water-need. John 4:14 and 7:37-38 use the same verb when Jesus offers himself as living water to those who thirst — the dipsaō of Matt 5:6 creates the readiness for what Jesus offers in John's Gospel. The physical image is the most direct possible: as a parched person can think of nothing but water, so the blessed person's entire orientation is toward dikaiosynē.",
    notMeant:"Not moderate desire. Not the thirst of someone who would like a drink eventually. Dipsaō is physiological need at the survival level — the thirst of the desert traveler.",
    why:"Isaiah 55:1 ('Come, everyone who thirsts, come to the waters') uses the same survival-thirst metaphor for the invitation to eschatological blessing. Jesus in John 7:37 ('If anyone thirsts, let him come to me and drink') explicitly fulfills the Isa 55 invitation.",
    matters:"Revelation 22:17 ('Let the one who is thirsty come; let the one who desires take the water of life without price') is the eschatological satisfaction — the fullness that the beatitude promises. The dipsaō begins the journey that ends at the river of life.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 6:9":{
  Father:{
    sense:"Πάτερ (pater, G3962) — father. Jesus teaches his disciples to address God as Father — an intimacy that was almost entirely absent from Jewish prayer prior to Jesus. The OT speaks of God as father of Israel corporately (Deut 32:6; Isa 63:16; 64:8) but personal address to God as 'my Father' in daily prayer was extremely rare. Jesus' use of Abba (his Aramaic equivalent, Mark 14:36) and his teaching of 'our Father' introduced unprecedented intimacy in approaching God.",
    notMeant:"Not a metaphysical claim that God is biologically a father. Not merely a cultural title. The pater of the Lord's Prayer is relational, covenantal, and intimate — a term of family access, not of formal religious distance.",
    why:"Galatians 4:6 and Romans 8:15-16 make the adoption-basis explicit: 'God sent the Spirit of his Son into our hearts, crying Abba, Father.' The Spirit enables the pater-address because believers have been adopted into the family of God through Christ. Prayer as pater-address is a Spirit-enabled, adoption-grounded reality.",
    matters:"Every time the Lord's Prayer is prayed, the one praying is claiming the status of God's adopted child — which requires Christ's mediation and the Spirit's enabling. It is simultaneously the most intimate and the most theologically weighted word in the prayer.",
    auditStatus:"context-reviewed"
  },
  hallowed:{
    sense:"ἁγιασθήτω (hagiasthētō, from hagiazō, G37) — let it be sanctified, let your name be treated as holy. The aorist passive imperative: a prayer that God would act to cause his name to be treated as holy — both by the one praying and throughout the world. Ezekiel 36:23 uses the same verb (hagiazō in LXX): 'I will vindicate the holiness of my great name... the nations will know that I am YHWH' — God himself will make his name holy by acting in history.",
    notMeant:"Not merely 'may we say your name reverently.' Not a request for private piety alone. Hagiasthētō is eschatological: the prayer is for God to vindicate his own name before the world — to make it unmistakably clear who he is and that he is holy.",
    why:"The prayer begins with God's glory ('hallowed be your name') before human need ('give us our bread') — establishing the priority structure: the petitioner prays from within God's story and purpose, not using God to serve the petitioner's agenda.",
    matters:"Ezekiel 36:22-27 shows that the sanctification of God's name happens through the new-covenant work of the Spirit: God acts to vindicate his name by transforming his people. The Lord's Prayer's first petition is therefore a new-covenant prayer.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 6:10":{
  kingdom:{
    sense:"βασιλεία (basileia, G932) — reign, royal rule, dominion. 'Your kingdom come' is a prayer for God's active reign to arrive — to be established and recognized on earth as it is in the realm of heaven. Basileia is not primarily a territory but a dynamic event: the active exercise of royal authority. The prayer is not 'may your kingdom location expand' but 'may your reign happen here as it already happens there.'",
    notMeant:"Not the institutional church. Not merely 'may more Christians exist.' Not a prayer for a political theocracy alone. Basileia here is the active reign of God — his will being done, his justice established, his kingship recognized.",
    why:"Jesus' opening proclamation in Mark 1:15 ('the kingdom of God is at hand, repent and believe the gospel') and the entire Sermon on the Mount describe the kingdom's character. The prayer 'your kingdom come' is the petition that this inaugurated reality would be consummated — that what began in Jesus' ministry would be fully realized.",
    matters:"The Lord's Prayer is eschatological: 'your kingdom come, your will be done on earth as in heaven' is a prayer for the new creation, for the resurrection, for the return of Christ when 'the kingdom of the world has become the kingdom of our Lord and of his Christ' (Rev 11:15).",
    auditStatus:"context-reviewed"
  },
  will:{
    sense:"θέλημά (thelēma, G2307) — will, desire, purpose. 'Your will (thelēma) be done on earth as it is in heaven' pairs with 'your kingdom come' — the two petitions interpret each other. The thelēma of God is done perfectly in the heavenly realm; the prayer is for earth to be brought into the same alignment. Jesus himself prays this prayer in Gethsemane (Matt 26:39, 42 — 'not my will but your thelēma') — the Lord's Prayer in its deepest form is modeled by Jesus in his hour of greatest testing.",
    notMeant:"Not resignation to whatever happens ('I guess it's God's will'). Not passive fatalism. Thelēma here is the active, purposeful divine desire that is currently being done in heaven — the prayer asks for that active divine purpose to be enacted on earth.",
    why:"The heaven/earth contrast is crucial: heaven is not a distant realm where God's will is wished for — it is the realm where it is already perfectly done. The prayer brings the petitioner into alignment with that heavenly reality and asks for it to break through into the earthly.",
    matters:"Romans 12:2 ('be transformed... to test what is the good and acceptable and perfect thelēma of God') shows that knowing and doing God's thelēma is the central Christian calling. The Lord's Prayer establishes this as the central petition.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 6:11":{
  "daily bread":{
    sense:"τὸν ἄρτον ἡμῶν τὸν ἐπιούσιον (ton arton hēmōn ton epiousion) — our bread for today / for the coming day. The word epiousion (G1967) is a hapax legomenon — it appears nowhere else in all surviving Greek literature before Matthew and Luke, suggesting Jesus may have coined it or Matthew used a term without literary precedent. Its meaning is debated: from epi + ousia (necessary/subsistence bread) or from epi + ousan hēmeran (for the coming day). Jerome rendered it 'supersubstantial' in Matthew, possibly connecting it to eucharistic bread.",
    notMeant:"Not a request for abundance or luxury. The prayer is for sufficient bread for today — no more, echoing the manna pattern (Ex 16:4 — 'they shall gather a day's portion every day') where hoarding was forbidden and trust for tomorrow was required.",
    why:"The manna background is crucial: Deuteronomy 8:3 ('he fed you with manna... that he might make you know that man does not live by bread alone but by every word that comes from the mouth of God') — Jesus quotes this in Matt 4:4. The daily-bread petition is a manna-prayer: daily dependence on God's provision, trust for today, not anxiety about tomorrow (Matt 6:25-34).",
    matters:"The Lord's Prayer structures time: past (forgive us our debts), present (give us today's bread), future (deliver us from evil). The bread petition teaches the discipline of present-moment dependence — the antidote to both hoarding and anxiety.",
    auditStatus:"context-reviewed"
  }
},
"Matthew 6:12":{
  debts:{
    sense:"ὀφειλήματα (opheilēmata, G3783) — debts, what is owed. Matthew uniquely uses the financial metaphor of debt for sin — 'forgive us our opheilēmata' — while Luke uses 'sins' (hamartias, Luke 11:4). The debt metaphor is precise: sin creates an obligation, a liability, something genuinely owed to the one sinned against. God is the creditor; the sinner is the debtor. The prayer asks for debt-cancellation (aphes — release, send away).",
    notMeant:"Not literal financial debts (though the Aramaic underlying 'debts' is hova, which can mean both). Not an accounting that God is calculating to the cent. The metaphor grounds the reality of sin's moral weight — something is genuinely owed, and genuine release is required.",
    why:"The parable of the unforgiving servant (Matt 18:21-35) immediately develops this debt-forgiveness language: the servant forgiven 10,000 talents (an impossible debt) refuses to forgive a fellow servant's 100 denarii. The Lord's Prayer's debt-forgiveness petition is embedded in this parable's theology.",
    matters:"'As we also have forgiven our debtors' — the prayer links receiving and extending forgiveness. Not as merit (we earn forgiveness by forgiving) but as congruence: those who have been freed from impossible debt by grace cannot withold forgiveness from those who owe them small amounts.",
    auditStatus:"context-reviewed"
  },
  forgive:{
    sense:"ἄφες (aphes, from aphiēmi, G863) — release, send away, let go. The imperative of aphiēmi: 'send away our debts.' The same verb Jesus uses from the cross ('Father, aphes them, for they do not know what they do,' Luke 23:34). The image is of releasing a prisoner, canceling a written debt, or sending something away — active removal, not passive forgetting.",
    notMeant:"Not 'overlook' or 'tolerate.' Aphes is active release — the debt does not remain and get overlooked; it is sent away. Not a feeling of forgiveness but the legal-relational act of release.",
    why:"Colossians 2:14 uses a parallel image: God 'erased the record of debt (cheirographon) that stood against us with its legal demands... nailing it to the cross.' The aphes of the Lord's Prayer is accomplished through the cross.",
    matters:"The daily recitation of this petition trains the believing community to inhabit the posture of the forgiven — knowing that the debt is sent away, not accumulated — and to extend that same release to others.",
    auditStatus:"context-reviewed"
  }
},
"John 1:1":{
  beginning:{
    sense:"ἀρχή (archē, G746) — beginning, origin, first principle. John deliberately echoes the LXX of Genesis 1:1 (en archē epoiēsen ho theos, 'in the beginning God made'), but with a crucial difference: Genesis says 'in the beginning God CREATED (past action)'; John says 'in the beginning WAS (ēn, imperfect) the Word.' The imperfect tense signals pre-existence before the beginning that Genesis describes — the Word was already there when the beginning began.",
    notMeant:"Not the beginning of the Word's existence. Not 'when things started for the logos.' The grammar (was, not came to be) explicitly places the Word before any beginning — he is not part of the creation, he is the agent of it (John 1:3).",
    why:"The deliberate Genesis echo frames the entire Prologue as a new creation account: just as God spoke light into darkness in Genesis, so the divine Word brings light into the world's darkness (John 1:4-5). The Gospel of John is the story of the new Genesis.",
    matters:"John 1:1's en archē grounds the pre-existence of Christ — which is the foundation of the Incarnation (1:14), the new creation (2 Cor 5:17), and all Trinitarian theology. If the Word was already at the beginning, he is not a creature but the Creator.",
    auditStatus:"context-reviewed"
  },
  Word:{
    sense:"λόγος (logos, G3056) — Word, reason, the divine self-expression. John's logos deliberately engages three backgrounds: (1) Greek philosophy: logos as the rational ordering principle of the cosmos (Heraclitus, Stoics); (2) Jewish wisdom tradition: the Word/Wisdom of God as creator and revealer (Prov 8:22-31; Ps 33:6); (3) Hebrew dabar: the powerful, reality-making word of God that is also an event. John takes all three and transcends them: the logos is not an impersonal principle or a secondary intermediary but a divine Person who is with God (pros ton theon — face to face, in intimate relation) and who IS God (theos ēn ho logos).",
    notMeant:"Not Greek philosophical logos as merely an abstract organizing principle of the universe. Not Philo's logos as a secondary divine mind subordinate to God. Not simply 'a word spoken.' The logos in John 1 is personal, divine, relational, and Incarnate.",
    why:"In 1:14, 'the logos became flesh' — the very Word who was with God from eternity entered human existence as a specific human being, Jesus of Nazareth. This is the answer to every background: the Greeks' rational principle is a person; the Jews' creating Word is a person; and he has now been seen and touched (1 John 1:1-3).",
    matters:"The identification of Jesus as logos is John's primary Christological claim: Jesus is God's own self-expression, the one through whom God has said everything there is to say (Heb 1:1-2). Everything Jesus says and does is God's own word and act.",
    auditStatus:"context-reviewed"
  },
  God:{
    sense:"θεός (theos, G2316) — God. In the clause 'and the Word was God' (kai theos ēn ho logos), theos appears without the definite article as a predicate nominative. This Greek construction affirms divine nature without making the Word identical to the Father. 'The Word was God' (fully God in nature) and 'the Word was with God' (in relationship with the Father) together preserve both full deity and personal distinction — the grammatical heart of Trinitarian grammar.",
    notMeant:"Not 'a god' (the Jehovah's Witnesses' translation) — the absence of the article does not mean indefiniteness; it means the focus is on quality/nature. Not 'divine-ish.' Theos ēn ho logos makes the strongest possible Greek claim about divine nature short of making the Word identical to the Father.",
    why:"The three clauses of John 1:1 together are the most compact Trinitarian statement in the NT: (1) the Word was in the beginning (eternal); (2) the Word was with God (personal distinction within God); (3) the Word was God (full divine nature). All three are required together.",
    matters:"John 1:1 is the christological foundation of the Gospel — if the Word is fully God, then his words are God's definitive word, his works are God's definitive acts, and his death is God himself dying for humanity. Everything that follows in John 20 ('my Lord and my God') is the unfolding of this opening claim.",
    auditStatus:"context-reviewed"
  }
},
"John 1:14":{
  Word:{
    sense:"λόγος (logos, G3056) — the same divine Word of John 1:1, now declared to have 'became (egeneto) flesh.' The aorist egeneto ('became') contrasts with the imperfect ēn ('was') of 1:1 — the Word who always WAS now at a specific point in time BECAME. This is the Incarnation in its most compressed form: not an appearance or an illusion but a genuine becoming, a real taking on of human existence.",
    notMeant:"Not that the logos changed into something else and ceased to be logos. Not merely that he appeared in human form (Docetism). The logos fully became sarx while remaining logos — both natures, one person.",
    why:"1 John 4:2 uses 'coming in the flesh' as the test of authentic Christian teaching — rejection of the Incarnation is the spirit of antichrist. John's Gospel from the beginning (logos) to the end (the physical appearances of the risen Jesus, 20:19-29) insists on the bodily, historical reality of the Son of God.",
    matters:"The Incarnation is the hinge of all history and all theology: if the logos became sarx, then God has fully entered human experience, suffering, and death — and the resurrection is the reversal of the worst that can happen to human flesh.",
    auditStatus:"context-reviewed"
  },
  flesh:{
    sense:"σάρξ (sarx, G4561) — full human embodiment, real physical human existence. 'The Word became flesh' uses the most deliberately physical word for human bodily existence — not 'took on a human nature' (abstract), not 'appeared as a man' (appearance-language), but became sarx. John chooses the most vulnerable, earthy word for human physical existence — the same word Paul uses in Gal 5:17 for the fallen human pattern. The Incarnation is full identification with our concrete physical humanity.",
    notMeant:"Do not import the negative Pauline sense (unrenewed human nature opposed to the Spirit) into John 1:14 — that would make Christ sinful. The word sarx here means real, embodied, ordinary physical humanity.",
    why:"The same Greek word functions differently in John 1:14 (the dignity of the Incarnation) and Gal 5:17 (the fallen human pattern). This is the single most important disambiguation in the NT: sarx can exalt (God himself took on sarx) or diagnose (sarx opposes the Spirit). Context is decisive.",
    matters:"John 1:14 is the theological refutation of all spiritualized, gnostic versions of Christianity that downplay the physical. The Son of God became physical — which means the body matters, physical suffering matters, physical resurrection matters, and the new creation is physical.",
    auditStatus:"context-reviewed"
  },
  dwelt:{
    sense:"ἐσκήνωσεν (eskēnōsen, from skēnoō, G4637) — tabernacled, pitched his tent, dwelt in a tent. The verb is built on skēnē (tent/tabernacle) — the same word for the wilderness tabernacle (LXX). 'The Word tabernacled among us' deliberately echoes Exodus 25:8 ('let them make me a sanctuary, that I may dwell — shakan — among them') and 40:34-35 (the glory filling the tabernacle). The Incarnation is the ultimate tabernacling: God's presence dwelling with humanity, not in a tent of cloth and wood but in the tent of human flesh.",
    notMeant:"Not merely 'lived among us' in the general sense. Skēnoō is specifically tent/tabernacle language — John is deliberately identifying the Incarnation with the Mosaic tabernacle, saying: what the tabernacle was as shadow, Jesus is as reality.",
    why:"The Shekinah (shakan = to dwell, same root) that filled the tabernacle and temple is now personalized in Jesus. John 2:19-21 makes this explicit: 'Destroy this temple, and in three days I will raise it up' — he was speaking of his own body as the temple.",
    matters:"The theology of tabernacle/temple is fulfilled in Christ (body), extended to the church (1 Cor 3:16), and consummated in the new creation (Rev 21:3 — 'the tabernacle of God is with humanity'). John 1:14 is the pivot between shadow and fulfillment.",
    auditStatus:"context-reviewed"
  },
  glory:{
    sense:"δόξαν (doxan, from doxa, G1391) — glory, the manifest divine presence-splendor. 'We beheld his glory' — the disciples saw the kavod/Shekinah of God in the flesh of Jesus. This is the same glory that filled the tabernacle (Ex 40:34) and the temple (1 Kings 8:11) so that Moses and the priests could not enter. John says that the disciples saw this same divine glory in the person of Jesus — most strikingly in the Transfiguration (Matt 17:2; 2 Pet 1:16-18) but throughout his ministry.",
    notMeant:"Not merely 'impressive' or 'honorable.' Doxa here is the specific OT kavod/Shekinah — the weighty, radiant, consuming presence of God that makes the place of encounter holy.",
    why:"John 17:5 ('glorify me with the glory I had with you before the world existed') shows that the doxa of 1:14 is the pre-incarnate divine glory, veiled in flesh during the ministry but restored and displayed in resurrection.",
    matters:"The disciples' witness ('we beheld') is the ground of the Gospel's authority (1 John 1:1-3 — 'we have seen, heard, and touched'). The doxa-witness is not subjective spiritual experience but the testimony of those who physically encountered the embodied divine glory.",
    auditStatus:"context-reviewed"
  }
},
"John 3:3":{
  "born again":{
    sense:"γεννηθῇ ἄνωθεν (gennēthē anōthen, G1080 + G509) — born from above OR born again. Anōthen is genuinely ambiguous in Greek and can mean either 'again' (temporal repetition) or 'from above' (spatial origin). The narrative exploits this deliberately: Nicodemus hears 'again' and asks how a grown man can re-enter his mother's womb (v.4); Jesus means 'from above' (as clarified by the water-and-Spirit language of v.5 and the descend/ascend theology of v.13). The double meaning is the theological pun that drives the dialogue.",
    notMeant:"Not a human decision or second attempt at self-improvement. Not a moral restart. The 'from above' sense controls the theology: the new birth originates in God (the Spirit, v.5-8), not in human striving.",
    why:"Nicodemus's misunderstanding (v.4) is not stupidity — it is the natural reading of 'again.' Jesus' clarification (v.5 — born of water and Spirit) redirects: the origin is divine. The ambiguity is pedagogical: it forces Nicodemus to reckon with something beyond natural repetition.",
    matters:"John 1:13 already stated this principle: believers are born 'not of blood, nor of the will of the flesh, nor of the will of man, but of God.' The born-from-above language grounds regeneration in divine initiative, not human effort — which is why it can be compared to wind (v.8): sovereign, uncontrollable, discernible only by its effects.",
    auditStatus:"context-reviewed"
  }
},
"John 3:16":{
  loved:{
    sense:"ἠγάπησεν (ēgapēsen, aorist of agapaō, G25) — loved, with self-giving volitional love. The aorist tense points to a specific historical act: God's love is not an eternal feeling but a concrete deed, defined by the giving of the Son. 'God so loved the world that he gave' — the giving is the proof and the content of the love. The houtōs ('so/in this way') does not primarily mean 'so very much' but 'in the following manner': God loved the world in this specific manner — he gave his only Son.",
    notMeant:"Not phileo (friendship affection). Not eros (desire-love). Not a general warm feeling toward humanity. Agapaō here is specifically defined by the cross: the love that gives the most precious gift at the greatest cost.",
    why:"Romans 5:8 is the commentary: 'God demonstrates his own agape toward us in that while we were still sinners, Christ died for us.' The agapē of John 3:16 is not an inference from creation or from human experience of love — it is demonstrated historically and definitively at the cross.",
    matters:"The definition of love in Scripture is always cross-shaped (1 John 4:10). John 3:16's agapaō anchors Christian ethics: 'we love because he first loved us' (1 John 4:19).",
    auditStatus:"context-reviewed"
  },
  world:{
    sense:"κόσμον (kosmon, G2889) — the world, specifically fallen humanity in its alienation from God. In John's Gospel, kosmos is the object of God's love (3:16) and saving mission (3:17) but simultaneously the realm that opposes and rejects the light (1:10; 7:7; 15:18-19). The kosmos of 3:16 is precisely the hostile, alienated world that God loves anyway.",
    notMeant:"Not the cosmos as physical creation alone. Not only the elect. The kosmos of 3:16 is fallen humanity — the very thing that does not know him (1:10), the very world he did not come to condemn but to save (3:17).",
    why:"The tension between 'God loved the kosmos' (3:16) and 'do not love the kosmos' (1 John 2:15) is resolved: in 3:16 kosmos is the object of redeeming love (people alienated from God); in 1 John 2:15 kosmos is the world-system as a rival to God.",
    matters:"The scope of God's love in John 3:16 is universal (the entire fallen world) even as its benefit is conditioned by faith ('whoever believes'). This preserves both the unlimited reach of God's love and the particular reception by faith.",
    auditStatus:"context-reviewed"
  },
  perish:{
    sense:"ἀπόληται (apolētai, from apollymi, G622) — to perish, be destroyed, be utterly lost. Apollymi in the NT covers the lost sheep (Luke 15:4-6), the lost coin (Luke 15:8-9), and the ultimate ruin of those who reject the Son (John 3:16). It is not philosophical annihilation but the complete ruin of what was meant to flourish — the sheep is not destroyed but lost, yet the lostness is total ruin. In John 3:16's eschatological context, apollymi is the condition of those who never receive the zoe aionios the Son brings.",
    notMeant:"Not merely 'cease to exist' in a neutral sense. Not 'going somewhere else.' Apollymi is ruination — the total loss of what was made for God's purpose.",
    why:"John 17:12 uses apollymi for Judas: 'none of them is lost (apollymi) except the son of destruction (apollymi).' The word carries intentional weight — the opposite of eternal life is not peaceful nonexistence but utter loss.",
    matters:"John 3:16's grammar sets the contrast starkly: whoever believes has zoe aionios; whoever does not believe already stands condemned (v.18). The apollymi/zoe aionios contrast is the sharpest possible statement of what is at stake in the encounter with the Son.",
    auditStatus:"context-reviewed"
  },
  "eternal life":{
    sense:"ζωὴν αἰώνιον (zōēn aiōnion, G2222 + G166) — life of the age, age-abiding life. Zōē is God's own life, divine life — not biological life (bios). Aiōnios means belonging to the coming age, characterized by the eschatological reign of God. Together, zōē aiōnios is the life of God's new age — resurrection life, kingdom life — which John says begins NOW for those who believe (John 5:24 — 'has eternal life,' present tense). John 17:3 defines it relationally: knowing the Father and the Son.",
    notMeant:"Not merely 'living forever' in the sense of endless biological duration. Not something only received after physical death. Zōē aiōnios is qualitatively different life — the life of God's new creation — that the believer enters now through faith.",
    why:"The present-tense language is crucial: John 3:16 says whoever believes 'has (echei, present tense) eternal life.' Not 'will eventually get.' The life of the age to come is already present in the believer through union with Christ, who IS the zōē (John 14:6; 11:25).",
    matters:"The gospel is not primarily about getting to heaven after death but about receiving the life of God's new age now — which transforms the present and guarantees the future. Eternal life is the relationship, and the relationship begins at faith.",
    auditStatus:"context-reviewed"
  }
},
"John 10:10":{
  life:{
    sense:"ζωήν (zōēn, G2222) — zoe, divine life, the life of God — not biological life (bios). 'I came that they may have life (zōēn) and have it abundantly (perissōs).' Jesus claims to be the source of zoe, not merely a teacher about it or a facilitator of it. Perissos (G4053 — exceeding, overflowing, beyond measure) qualifies the zoe: not just divine life but divine life to overflowing fullness. John 10:10 is one of the purpose-of-Incarnation statements — why he came.",
    notMeant:"Not material prosperity or health-and-wealth abundance. Not bios (biological life) made comfortable. The zoe here is the same word as John 1:4 ('in him was zoe') and John 14:6 ('I am the... zoe') — God's own life shared with those who are in him.",
    why:"The contrast with 'the thief who comes to steal and kill and destroy' (apollymi — the same word as John 3:16's 'perish') is stark: the thief brings apollymi; Jesus brings zoe perissos. The antonyms define each other.",
    matters:"John 10:10 is the mission statement of the Good Shepherd's ministry, grounding Christian life not in obedience-driven fear but in zoe-fullness received from the shepherd who lays down his life (v.11) to give it.",
    auditStatus:"context-reviewed"
  }
},
"John 14:6":{
  way:{
    sense:"ὁδός (hodos, G3598) — road, path, way. 'I am the way (hodos).' Jesus does not say 'I will show you the way' or 'I will point to the way' — he says he IS the hodos. Access to the Father is not a route to navigate but a person to trust and follow. The early Christians called themselves 'the Way' (hē hodos, Acts 9:2; 19:9) — a self-description grounded in this verse. The hodos is traveled not by human effort but by union with Christ: 'no one comes to the Father except through me.'",
    notMeant:"Not a method, technique, or spiritual discipline. Not one way among many equivalent paths. The 'I AM' (egō eimi) construction echoes Ex 3:14, giving the statement divine-name weight: the self-existent I AM is the hodos.",
    why:"Thomas's question in 14:5 ('we don't know where you are going, so how can we know the way?') receives not directions but a person: 'I am the way.' The question assumes a route-map; the answer gives a guide who is himself the road.",
    matters:"John 14:6 is the most exclusive statement in the NT — 'no one comes to the Father except through me' — and its exclusivity is grounded in the uniqueness of who Jesus is (the only one who is simultaneously hodos, alētheia, and zōē), not in arbitrary restriction.",
    auditStatus:"context-reviewed"
  },
  truth:{
    sense:"ἀλήθεια (alētheia, G225) — unveiled reality, truth in the fullest sense. Jesus does not say 'I speak the truth' or 'I teach the truth' but 'I am the truth (alētheia).' He is the unveiled reality of God — the person in whom what God is actually like is fully and definitively disclosed. John 18:37-38 sets Jesus' alētheia against Pilate's 'what is truth?' — the collision of the one who IS truth with the relativism of imperial power.",
    notMeant:"Not merely propositional correctness. Not a claim to perfect teaching technique. Alētheia as identity means Jesus is the standard against which all claims to truth are measured — the unveiled reality of God in person.",
    why:"John 1:14 says the logos was 'full of grace and alētheia' — connecting the Incarnation and truth. John 8:32 ('you will know the alētheia and the alētheia will set you free') makes knowing the truth relational: you know the truth by knowing the person who is truth.",
    matters:"If Jesus IS alētheia, then his words are not one perspective among many but the definitive disclosure of reality. This grounds Christian epistemology: knowledge of God, self, creation, and ethics comes through encounter with the one who is truth incarnate.",
    auditStatus:"context-reviewed"
  },
  life:{
    sense:"ζωή (zōē, G2222) — divine life, God's own life. 'I am the life (zōē).' Not 'I give life' alone (though he does, John 10:10), but 'I am the life' — he is the source and substance of the zoe that believers receive. John 11:25 makes the same claim differently: 'I am the resurrection and the life — whoever lives and believes in me shall never die.' The zoe is not something Jesus distributes separately from himself; it is received by being in him.",
    notMeant:"Not biological life (bios). Not merely endless duration. Not a spiritual resource Jesus manages on behalf of others. He IS the zoe — union with him is itself the life.",
    why:"John 1:4 ('in him was zoe') and John 5:26 ('as the Father has zoe in himself, so he has granted the Son to have zoe in himself') are the background: the Son possesses divine life in himself and shares it with those who come to him.",
    matters:"John 14:6's three 'I am' claims (hodos, alētheia, zōē) together say: the path to God, the disclosure of God, and the life of God are all one person. Receiving any one of them means receiving the person — which is why the verse ends 'no one comes to the Father except through me.'",
    auditStatus:"context-reviewed"
  }
},
"Romans 1:16":{
  ashamed:{
    sense:"ἐπαισχύνομαι (epaischunomai, G1870) — to be dishonored, to be put to shame in the sight of others. Paul emphatically is NOT ashamed (ou gar epaischunomai) — the negation is the point. In the Roman honor-shame culture of the first century, the gospel was shameful news: it announced that a crucified criminal from Judea was Lord of the world, that the empire's supreme sentence (crucifixion) had been reversed by God, and that the sophisticated Romans should submit to this executed Jew. Paul writes from within Rome itself, the heart of the empire that crucified Jesus.",
    notMeant:"Not a private feeling of embarrassment. Epaischunomai is public, social shame — the honor-loss of being associated with something the culture considers beneath contempt. Paul is naming the cultural pressure and refusing it.",
    why:"Romans 5:5 ('hope does not put us to shame') and 9:33, 10:11 ('whoever believes in him will not be put to shame') develop the same shame-reversal theme: the very gospel that appears shameful by Roman standards is the thing that prevents ultimate shame before God.",
    matters:"The gospel's social cost is named at the outset of Romans: it is shameful by the world's standards but is actually God's power. This frames the entire letter's argument — what looks weak (the cross) is God's wisdom and power (1 Cor 1:18-25).",
    auditStatus:"context-reviewed"
  },
  power:{
    sense:"δύναμις (dunamis, G1411) — inherent power, miraculous ability, operative energy. Paul does not say the gospel has power or conveys power — he says the gospel IS the power (dunamis) of God. The gospel as proclamation is itself the active, operative power of God working salvation. This is not rhetoric about a good idea — it is the claim that when the euangelion is faithfully announced, God's own transforming energy is at work in that announcement.",
    notMeant:"Not the power of persuasion or rhetorical skill (which Paul explicitly rejects in 1 Cor 2:1-5). Not merely inspirational content. Dunamis here is the same word used for miracles (Matt 11:20) — God's own operative power.",
    why:"1 Corinthians 1:18-24 unpacks this directly: 'the word of the cross is foolishness to those who are perishing, but to us who are being saved it is the dunamis of God.' The same gospel is simultaneously apparent foolishness (to the world) and actual divine power (in those being saved).",
    matters:"This verse rules out both the 'gospel + something else' approach (human wisdom, emotional manipulation) and the 'gospel minus something' approach (removing the offense of the cross). The unadorned gospel, faithfully proclaimed, is itself the dunamis.",
    auditStatus:"context-reviewed"
  },
  salvation:{
    sense:"σωτηρία (sōtēria, G4991) — salvation, rescue, wholeness. In the OT background (yeshua, H3444), salvation is God's act of delivering Israel from slavery, enemies, and death. In Paul, salvation encompasses justification (declared righteous, past), sanctification (being made holy, present), and glorification (transformation at resurrection, future). The gospel is the power of God FOR this complete salvation.",
    notMeant:"Not only 'going to heaven when you die.' Not only the forgiveness of past sins. Sōtēria is comprehensive rescue: from guilt, from sin's power, from final condemnation, toward restored relationship with God and ultimate renewal of creation.",
    why:"Paul says the gospel brings sōtēria 'to everyone who believes — to the Jew first, and also to the Greek.' The scope is universal; the condition is faith; the source is God's dunamis.",
    matters:"The name Jesus (Iēsous = Yeshua = YHWH saves) encodes the sōtēria program — Matt 1:21 makes the etymology explicit. The gospel announces the fulfillment of what the name always promised.",
    auditStatus:"context-reviewed"
  }
},
"Romans 3:23":{
  sinned:{
    sense:"ἥμαρτον (hēmarton, from hamartanō, G264) — sinned, missed the mark. Aorist tense — a completed historical fact about the entire human race. The verb's root image (from archery) is missing the target, failing to hit the mark. Paul's aorist states it as a past, universal fact: all (pantes) have sinned — the history of humanity is the history of missing the target (God's standard, his image, his glory). No exceptions are implied because the universality is the point (cf. Rom 3:10-18).",
    notMeant:"Not 'occasionally made mistakes.' Not only gross moral failings. Hamartanō encompasses the full range: intentional transgression, falling short, missing the standard — everything from overt rebellion to structural failure to embody the image of God.",
    why:"The aorist (completed action) and the universal scope (pantes = all) together make this the most compressed statement of universal sin in Paul. The verse serves as the universal diagnosis before the universal remedy of 3:24-25.",
    matters:"The universality of Rom 3:23 is the foundation of the universality of the gospel's offer: because all have sinned (v.23), all may be justified freely by grace (v.24). The 'all' of the diagnosis matches the 'all' of the provision.",
    auditStatus:"context-reviewed"
  },
  "fall short":{
    sense:"ὑστεροῦνται (husterountai, from hystereō, G5302) — to fall short, to lack, to come behind. Present tense passive — an ongoing state. While 'sinned' (aorist) describes the historical event, 'fall short' (present) describes the continuing condition: humanity continuously, presently lacks the glory of God. The verb's range includes material lack (Mark 10:21 — 'one thing you lack/hystereō'), falling behind in a race, and being genuinely deficient in what is required.",
    notMeant:"Not 'almost achieved the glory.' Hystereō is to be genuinely without, to lack entirely what is needed. The present tense indicates this is not a past mistake being corrected but an ongoing condition of deficiency.",
    why:"The pairing of aorist (sinned) + present (fall short) is theologically precise: the historical act of sin (aorist) produced the ongoing condition of lacking God's glory (present). Both the event and its consequence are named in the verse.",
    matters:"The 'glory of God' humans fall short of is the divine image/likeness they were created to reflect (Gen 1:26-27) — sin is fundamentally image-failure. Romans 8:29-30 and 2 Cor 3:18 describe how the Spirit progressively restores this doxa in believers.",
    auditStatus:"context-reviewed"
  },
  "glory of God":{
    sense:"δόξης τοῦ θεοῦ (doxēs tou theou, G1391) — the glory of God, his radiant nature and the image-reflection humans were meant to embody. Falling short of the doxa tou theou is not merely failing to reach a high standard — it is failing to be what humanity was created to be: image-bearers who reflect God's glory into the world (Gen 1:26-27; Ps 8:5). The image/glory connection is confirmed by 2 Cor 3:18 ('being transformed into the same image from glory to glory') and Rom 8:29 ('conformed to the image of his Son').",
    notMeant:"Not falling short of God's approval in a general sense. Not merely ethical failure. The doxa tou theou here is specifically the glory that humans were designed to reflect as image-bearers.",
    why:"The context of Rom 1-3 has been building to this diagnosis: Gentiles suppressed the truth and exchanged God's glory for idols (1:23); Jews had the law but broke it (2:23-24). Both end up failing to reflect the doxa tou theou. The universal diagnosis prepares for the universal solution of Rom 3:24-25.",
    matters:"If sin is image-failure (falling short of God's glory), salvation is image-restoration — which is exactly how Paul describes sanctification and glorification (Rom 8:29-30; 2 Cor 3:18; 1 Cor 15:49). The gospel restores what sin broke at the level of ontology, not just behavior.",
    auditStatus:"context-reviewed"
  }
},
"Romans 5:1":{
  justified:{
    sense:"δικαιωθέντες (dikaiōthentes, from dikaioō, G1344) — declared righteous, acquitted. Aorist passive participle — 'having been justified,' a completed action with ongoing standing. Paul's use of dikaioō throughout Romans is forensic (courtroom): the judge pronounces the verdict 'not guilty' and 'righteous' over the defendant. This is not 'being made morally righteous in character' (that is sanctification); it is the judicial declaration of right standing before God based on Christ's righteousness credited to the believer (Rom 4:5-8; 5:18-19).",
    notMeant:"Not 'made morally righteous' as a description of inner character change. Not a reward for becoming good. Not God overlooking sin — the righteousness of Christ is the actual basis of the acquittal (Rom 3:24-26).",
    why:"'Justified by faith' (ek pisteōs, by means of faith) is the instrument — faith is the empty hand that receives what Christ's righteousness provides. Romans 4:3-5 makes it explicit: Abraham believed God and it was credited (elogisthē) as righteousness — imputed, not earned.",
    matters:"Justification is the foundational courtroom verdict on which all subsequent Christian life rests: no condemnation (Rom 8:1), peace with God (5:1), access to grace (5:2), hope of glory (5:2) — all flow from the prior verdict of 'justified.'",
    auditStatus:"context-reviewed"
  },
  peace:{
    sense:"εἰρήνην (eirēnēn, G1515) — peace, cessation of hostility. 'We have peace (eirēnēn) with God through our Lord Jesus Christ.' This is not a feeling of peace but an objective relational reality: the hostility between God and sinful humanity (Rom 5:10 — 'while we were enemies') has been resolved through the death of the Son. The enmity is over; peace has been established. Paul moves from the judicial (justified) to the relational (peace) — both are objective realities.",
    notMeant:"Not the subjective experience of inner calm (though that can follow). Eirēnē here is the objective state of reconciliation — the war is over. Romans 5:10 makes clear that reconciliation was achieved 'while we were enemies,' not because we became peaceable.",
    why:"Ephesians 2:14-17 develops this theology: 'he himself is our peace (eirēnē)' — the peace is a person (Christ) before it is a state. The peace with God in Rom 5:1 is not a condition we maintain but a reality Christ established and mediates.",
    matters:"'Having peace with God' is the relational foundation of the entire Christian life: prayer is possible (Rom 5:2 — access), suffering is navigable (5:3-5), and hope is secure (5:5) — all because the fundamental enmity has been abolished.",
    auditStatus:"context-reviewed"
  },
  access:{
    sense:"προσαγωγήν (prosagōgēn, G4318) — access, introduction into a royal court. From prosagō (to bring toward, to introduce formally) — the word used for formal introduction into the presence of a king or emperor, by an intermediary who brings you into the presence you could not reach alone. 'Through whom we have gained access (prosagōgē) into this grace in which we stand.' Christ is the one who brings believers into the Father's presence as the mediator — a role that fits with his high priesthood (Heb 4:14-16).",
    notMeant:"Not merely permission to try to approach God. Not a door you must find and unlock. Prosagōgē is active introduction by an intermediary — Christ brings believers into the Father's presence.",
    why:"Ephesians 2:18 ('through him we both have access/prosagōgē in one Spirit to the Father') and 3:12 ('in whom we have boldness and access/prosagōgē') repeat this language. The OT background is the high priest's access on Yom Kippur — through blood, into the Holy of Holies — which Christ fulfills and supersedes (Heb 9-10).",
    matters:"Romans 5:2's prosagōgē grounds Christian prayer: we do not approach God tentatively or on probation — we have been formally introduced into the divine presence by Christ the mediator, and we stand there ('in which we stand,' 5:2b) as those who belong.",
    auditStatus:"context-reviewed"
  }
},
"Romans 8:1":{
  condemnation:{
    sense:"κατάκριμα (katakrima, G2631) — the verdict of condemnation AND its execution, the punishment of the sentence. Paul says 'there is now NO katakrima for those in Christ Jesus.' This is not 'no bad feelings about yourself' or 'no consequences for sin in this life' — katakrima is the legal sentence of condemnation and its penal execution. The death-penalty that sin earns (Rom 6:23 — thanatos) is the katakrima; and that sentence has been executed in Christ's death on behalf of those in him (Rom 8:3-4 — God condemned/katekrinen sin in the flesh of Christ).",
    notMeant:"Not 'no conviction of sin' (the Spirit does convict, John 16:8). Not 'no discipline' (Heb 12:5-11). Not 'no earthly consequences for sin.' Katakrima is specifically the judicial condemnation-verdict and its penal execution — and that is gone for those in Christ.",
    why:"Romans 8:3-4 explains the mechanism: God sent his Son 'in the likeness of sinful flesh and as a sin offering, and condemned (katekrinen) sin in the flesh — in order that the righteous requirement of the law might be fulfilled in us.' The katakrima was carried out — in Christ, not in the believer.",
    matters:"'No condemnation' is the foundation of Romans 8 — the great liberation chapter. The entire chapter's theology (life in the Spirit, adoption, groaning creation, intercession, final glorification, the unbreakable love of God) rests on this single foundational fact: the sentence has been served.",
    auditStatus:"context-reviewed"
  },
  "in Christ":{
    sense:"ἐν Χριστῷ Ἰησοῦ (en Christō Iēsou, G1722 + G5547 + G2424) — in Christ Jesus. This is Paul's most characteristic phrase, appearing over 160 times in his letters, expressing the believer's positional, covenantal union with the Messiah. To be 'in Christ' is to be incorporated into him — sharing his death (Rom 6:3-4), his resurrection (6:5), his righteousness (1 Cor 1:30), his inheritance (Gal 3:29), and now in Rom 8:1, his freedom from condemnation. It is not primarily about moral imitation ('living like Christ') but ontological union ('located in Christ').",
    notMeant:"Not merely 'believing in Christ' as an intellectual proposition. Not 'following Christ's example.' En Christo is a spatial/positional metaphor for the most intimate possible union — Paul also describes Christ being 'in you' (Col 1:27), showing the union is mutual.",
    why:"The condition of freedom from condemnation is not 'for those who are being good enough' but 'for those who are in Christ' — a fact established by faith and baptism (Rom 6:3-4), not by performance.",
    matters:"En Christo is the answer to 'how does justification work?' — Christ's history (death and resurrection) becomes the believer's history by union, not by transfer of merit alone but by actual incorporation. Union with Christ is the deepest category of Pauline soteriology.",
    auditStatus:"context-reviewed"
  }
},
"Romans 8:15":{
  adoption:{
    sense:"υἱοθεσία (huiothesia, G5206) — adoption, the legal placement of a child with full legal rights of a firstborn son. In Roman law (the likely background for Paul's Greek-speaking audience), adoption was a formal legal act that gave the adopted person ALL the rights of a biological heir — including the right of inheritance, the family name, and the father's legal protection. Paul uses this specific legal language to say that believers are not spiritual second-classers or probationary children — they have been given the full legal standing of heirs (Rom 8:17 — 'heirs of God and co-heirs with Christ').",
    notMeant:"Not second-tier status. Not a conditional relationship that can be revoked if performance falls off. Huiothesia is the irrevocable legal placement — the adoption deed has been signed.",
    why:"Galatians 4:4-7 develops the same theme: God sent his Son to redeem those under law 'so that we might receive the huiothesia of sons... God sent the Spirit of his Son into our hearts, crying Abba, Father.' The Spirit's cry of 'Abba' in both Gal 4:6 and Rom 8:15 is the Spirit's internal witness to the adoption-reality.",
    matters:"The theology of adoption transforms Christian identity from 'forgiven criminal' to 'beloved child and full heir.' Romans 8:17 — 'if children, then heirs — heirs of God and co-heirs with Christ' — means the believer's inheritance is the inheritance of Christ himself.",
    auditStatus:"context-reviewed"
  },
  Abba:{
    sense:"Ἀββᾶ (Abba, Aramaic) — the Aramaic word for father, with the intimacy of 'papa' or 'dad.' Jesus used this word in Gethsemane (Mark 14:36 — 'Abba, Father, all things are possible for you... yet not what I will but what you will'), the only place in the Gospels where Jesus is recorded using this Aramaic term directly for God in the narrative. Joachim Jeremias's scholarship noted that while God could be addressed as Father in Jewish liturgy, Abba was the intimate daily family word not used of God in Jewish prayer — making Jesus' use unprecedented.",
    notMeant:"Not formal address. Not distant reverence. Abba is the word a child addresses their father with in the home — intimate, secure, familial.",
    why:"That the Spirit of adoption causes believers to cry out 'Abba' (both in Gal 4:6 and Rom 8:15) means the Spirit enables the same intimacy with the Father that Jesus himself had. The believer's prayer-access is not inferior to Jesus' own access but participates in it.",
    matters:"Every time a believer says 'Abba' — in prayer, in conscious trust — the Spirit is witnessing to the adoption. Romans 8:16 follows immediately: 'The Spirit himself bears witness with our spirit that we are children of God.' The word Abba is not just a prayer-word but a Spirit-authenticated identity claim.",
    auditStatus:"context-reviewed"
  }
},
"Galatians 5:22":{
  fruit:{
    sense:"καρπός (karpos, G2590) — fruit, singular. Paul deliberately uses the singular 'fruit (karpos) of the Spirit' rather than 'fruits' (plural). This is not nine separate fruits but one unified fruit of the Spirit's work with nine facets — like a single fruit with different qualities visible from different angles. The Spirit produces one integrated character in the believer; the nine qualities listed are not separate achievements to be checked off but the unified expression of the Spirit's life within.",
    notMeant:"Not 'fruits' (plural) as nine separate gifts to acquire individually. Not human virtues achieved by effort. The singular karpos insists that this is the Spirit's production, not the believer's — which is why Gal 5:25 follows: 'if we live by the Spirit, let us also walk by the Spirit.' The fruit grows; we walk in step with the Grower.",
    why:"The contrast with 'works of the flesh' (erga tēs sarkos, v.19 — plural, works) is structural: the flesh produces many disconnected deeds of self; the Spirit produces one integrated character. The plural/singular contrast is theologically intentional.",
    matters:"The singular karpos means that love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control are inseparable in the Spirit's work — they grow together. You cannot have genuine Spirit-joy without Spirit-love. They are one fruit, nine facets.",
    auditStatus:"context-reviewed"
  },
  love:{
    sense:"ἀγάπη (agapē, G26) — self-giving, volitional, other-centered love. Listed first in the fruit-sequence because it is the root from which the others grow. 1 Corinthians 13 shows that love (agapē) is patient, kind, not envious, not proud — which maps almost directly onto the subsequent items in Gal 5:22-23. The fruit is love-shaped from its foundation.",
    notMeant:"Not feeling-love or romantic love. Agapē is volitional, directed, sacrificial — the same word used for God's love in John 3:16 and Rom 5:8.",
    why:"Romans 5:5 ('the agapē of God has been poured out in our hearts through the Holy Spirit') connects the Spirit and agapē directly — the Spirit's work is to pour divine love into the believer, which is why agapē is the first fruit.",
    matters:"All subsequent ethical commands of the NT are grounded in agapē (Matt 22:37-40 — the two love-commands sum all the law). The fruit-list of Gal 5:22-23 is the Spirit's production of the love-character that the law required but could not produce.",
    auditStatus:"context-reviewed"
  },
  joy:{
    sense:"χαρά (chara, G5479) — deep, stable gladness independent of circumstances. Chara is the joy of the kingdom (Rom 14:17 — 'the kingdom of God is righteousness, peace, and chara in the Holy Spirit') — rooted in what God has done and who God is, not in the presence of favorable circumstances. Philippians 4:4 commands 'rejoice (chairete) in the Lord always' precisely because this joy can coexist with any circumstance, including imprisonment.",
    notMeant:"Not happiness (happiness is circumstance-dependent). Not emotional elation. Chara persists in suffering (Rom 5:3) because it is grounded in the gospel facts, not in how life feels.",
    why:"Jesus speaks of his own chara being given to the disciples (John 15:11; 17:13) — the fruit of chara in Gal 5:22 is not a different joy from Christ's own; it is Christ's joy, shared through the Spirit.",
    matters:"Chara as a Spirit-fruit means it is not manufactured by positive thinking or circumstances management but grown in the believer by the Spirit. The same Spirit who raised Christ from the dead (Rom 8:11) produces the resurrection-joy in believers.",
    auditStatus:"context-reviewed"
  },
  peace:{
    sense:"εἰρήνη (eirēnē, G1515) — wholeness, cessation of inner and relational hostility. As a fruit of the Spirit, eirēnē is the inner shalom the Spirit produces — the opposite of the anxiety, strife, and division that characterize the works of the flesh (v.20 — enmities, strife, jealousy). Philippians 4:7 describes it as 'the peace (eirēnē) of God that surpasses all understanding' — the Spirit's peace exceeds rational explanation.",
    notMeant:"Not the absence of difficulty. Not conflict-avoidance as a character trait. Eirēnē is the positive shalom-wholeness of the Spirit's presence, coexisting with external difficulty.",
    why:"Romans 14:17 places eirēnē in the Spirit alongside dikaiosynē and chara as the character of the kingdom. The fruit-list's eirēnē is the outworking of 'peace with God' (Rom 5:1) — the objective reconciliation with God produces the subjective inner wholeness of the Spirit.",
    matters:"The Spirit-produced eirēnē is the foundation of Christian peacemaking (Matt 5:9 — 'blessed are the peacemakers') — you can only bring peace to others if the Spirit's eirēnē is already your inner reality.",
    auditStatus:"context-reviewed"
  }
},
"Ephesians 2:8":{
  saved:{
    sense:"σεσῳσμένοι (sesōsmenoi, from sōzō, G4982) — saved, rescued, delivered. The perfect passive participle is the most theologically precise Greek form possible: 'you HAVE BEEN saved' (completed past action) with the result 'you ARE in the state of being saved' (ongoing present reality). The perfect tense denies that salvation is a future hope alone or a present process alone — it is a completed act with permanent ongoing effect. The passive voice denies that the believer did the saving — it was done to them, by God.",
    notMeant:"Not a process still being completed (that would use present tense). Not uncertain about the outcome. The perfect passive is unambiguous: the saving act is done, the state endures.",
    why:"The perfect sesōsmenoi matches the perfect of justification (Rom 5:1 — dikaiōthentes): both are completed actions with permanent standing. Together they describe the believer's unalterable covenantal position before God.",
    matters:"The grammar of Eph 2:8 rules out both 'I hope to be saved someday' and 'I need to keep earning my salvation.' The rescue is done; the question is whether the believer lives from that completed reality or continues striving as if it were not.",
    auditStatus:"context-reviewed"
  },
  grace:{
    sense:"χάριτί (chariti, G5485, dative — by/through grace) — unmerited divine favor and gift. 'By grace (chariti) you have been saved through faith.' The dative of means: grace is the means/source of salvation, not human merit, effort, or faith (faith is the instrument through which grace reaches the person, not the cause). The structure is: grace → faith → salvation; all originating in God's charis, not in the human's pisteuo.",
    notMeant:"Not 'God is lenient and overlooks sin.' Not 'God helps those who help themselves.' Not earned divine favor. Charis is the pure, unilateral, unrequested gift of God to those who deserved the opposite (his wrath — 2:3).",
    why:"Verse 9 adds the negative: 'not of works, lest any man should boast.' The exclusion of works confirms that charis here is entirely outside the human, not a collaboration. And v.10 adds the positive: good works are the RESULT of salvation, not the BASIS.",
    matters:"Ephesians 2:8-10 is Paul's most compact statement of the grace-faith-works relationship: grace is the source, faith is the instrument, works is the fruit. Getting the sequence right is the difference between the gospel and moralism.",
    auditStatus:"context-reviewed"
  },
  faith:{
    sense:"πίστεως (pisteōs, G4102) — through faith, trust, the open hand that receives what grace provides. Dia pisteōs ('through faith') identifies faith as the instrument of salvation, not its cause. Faith adds nothing to God's grace — it is the empty receptive posture that allows grace to do its work. The controversial phrase 'and that not of yourselves' (kai touto ouk ex hymōn) — whether 'that' refers to the faith or the entire salvation — in either case the point is the same: the source is entirely outside the human.",
    notMeant:"Not the cause of salvation (that would make faith a work). Not human-generated belief that earns the right to be saved. Faith is receptive, not productive — it is the hand that receives the gift, not the purchase price.",
    why:"Romans 4:4-5 makes the same point: 'to the one who works, wages are not counted as a gift (charis) but as obligation. To the one who does not work but trusts him who justifies the ungodly, their faith is counted as righteousness.'",
    matters:"The instrument-vs-cause distinction preserves the grace-character of salvation: if faith were the cause, salvation would be a reward for believing — just another form of works-righteousness. Faith as instrument receives freely; grace as source gives freely.",
    auditStatus:"context-reviewed"
  }
},
"Ephesians 2:10":{
  workmanship:{
    sense:"ποίημα (poiēma, G4161) — work of art, masterpiece, what has been made. The source of the English 'poem.' 'We are his poiēma' — his made thing, his crafted work. Paul reverses the works-language of v.9: we cannot boast of our works because WE are God's work. The Creator who bara-d everything is the one who has crafted the believer — using the same new-creation category (ktismenoi — created, v.10) as Gen 1.",
    notMeant:"Not a second-rate product. Poiēma in context (God as maker, the new creation, the prepared good works) carries the sense of purposeful artistry. Each believer is God's intentional creation, not an accident.",
    why:"The shift from poiēma (we are his masterpiece) to erga agatha (created for good works) is the flow of Eph 2:8-10: we do not do good works to earn salvation; we are God's made-thing in order to do good works. The works flow from the identity, not the other way around.",
    matters:"Christian identity is first and always the identity of the crafted — made by God, for God's purposes. Before ethics (good works) comes ontology (poiēma). This prevents both moralism (working to establish identity) and passivity (identity without works).",
    auditStatus:"context-reviewed"
  },
  "good works":{
    sense:"ἔργοις ἀγαθοῖς (ergois agathois, G2041 + G18) — morally excellent deeds, good works. The erga agatha of v.10 are the RESULT of salvation (Eph 2:8-9), not the basis of it. They were 'prepared beforehand (proētoimasen) that we should walk in them' — God not only planned the destination (salvation) but also the path (good works to walk in).",
    notMeant:"Not 'works of the law.' Not earning anything. Not works that supplement grace. Erga agatha are the Spirit-produced fruit that naturally flows from the new creation identity — the poiēma doing what it was made for.",
    why:"Galatians 5:6 ('faith working through agapē') and Titus 2:14 ('a people... zealous for good works') make the same point: the genuinely justified person is characterized by good works, not because they earn salvation but because the new creation produces them.",
    matters:"The theological sequence of Eph 2:8-10 is the answer to every works-righteousness vs. antinomian debate: grace saves (v.8-9), the saved person is God's masterpiece (v.10a), crafted for the good works God prepared (v.10b). Grace produces, not precludes, good works.",
    auditStatus:"context-reviewed"
  }
},
"Hebrews 11:1":{
  faith:{
    sense:"Πίστις (pistis, G4102) — faith, trust, conviction. Hebrews 11:1 is the only definitional statement about pistis in the NT, and it defines faith not as an escape from evidence but as a form of evidence itself: 'faith IS the substance (hupostasis) of things hoped for, the evidence (elenchos) of things not seen.' The chapter proves this definition by 17 OT examples who acted on God's promises before those promises were visible — Abel, Noah, Abraham, Moses, Rahab.",
    notMeant:"Not 'believing what you know isn't true.' Not optimism or positive thinking. Not the absence of reason. Faith in Hebrews 11 is always grounded in God's specific word and demonstrated character — the examples trust God's word, not their feelings or circumstances.",
    why:"The word hupostasis (substance/assurance) grounds faith in what is objectively real: the hoped-for things have hupostasis (present reality, title-deed) because God has promised them, not because they are currently visible. The elenchos (proof/evidence) of unseen things is the faith itself.",
    matters:"The Hebrews 11 hall-of-faith narrative shows faith as the through-line of all OT obedience. The definition in v.1 is not abstract; it is demonstrated in the community of faith across centuries — each act of faith is the visible elenchos of invisible conviction grounded in the God who promised.",
    auditStatus:"context-reviewed"
  },
  substance:{
    sense:"ὑπόστασις (hupostasis, G5287) — foundation, substance, that which underlies and supports. In classical Greek, hupostasis was used for a legal guarantee, a title deed, the backing behind a claim. In the Greek papyri, it appears in property title deeds. 'Faith is the hupostasis of things hoped for' means that faith is the present title-deed of future realities — the substance that makes the hoped-for thing presently real to faith, not yet visible but genuinely owned by covenant promise.",
    notMeant:"Not that faith creates the hoped-for things (God's promises do that). Not a subjective feeling of certainty. Hupostasis is foundational reality — the backing under a claim, the title to property not yet handed over.",
    why:"Hebrews 1:3 uses hupostasis for the Father's own nature ('the exact imprint of his hupostasis') — what is most foundationally real about God. In 11:1, faith is the believers' hupostasis of future promise — their grip on what God's word makes most real.",
    matters:"This definition transforms the relationship between faith and hope: hope looks forward; faith makes the forward-looking thing present. Faith does not wait passively for the promise — it acts as if the promise is already, in the most important sense, in hand.",
    auditStatus:"context-reviewed"
  },
  evidence:{
    sense:"ἔλεγχος (elenchos, G1650) — proof, conviction, legal demonstration. Elenchos in Greek is not 'subjective conviction' but the objective logical proof that convicts or convinces — it is the legal evidence that establishes a fact, or the refutation that disproves a claim. 'The elenchos of things not seen' means faith is the proof — the demonstrating conviction — of what is invisible. The very act of faith is itself the evidence for what cannot be seen.",
    notMeant:"Not wishful thinking. Not closing your eyes and hoping. The elenchos-word is the strongest possible evidence-word in Greek — the irrefutable proof in a courtroom argument. Faith is the evidence precisely because it is grounded in the faithfulness of the God who promised.",
    why:"The examples that follow in Hebrews 11 are the elenchos made visible: Noah's building the ark IS the evidence that he was convinced of the invisible flood; Abraham's leaving Ur IS the evidence that he was convinced of the invisible city (11:10).",
    matters:"Faith is not anti-rational; it is trans-rational — it operates on evidence the world cannot process (God's word, God's character, God's resurrection of Jesus) and acts on that evidence with greater certainty than the visible world seems to warrant.",
    auditStatus:"context-reviewed"
  }
},
"Revelation 1:8":{
  "Alpha and Omega":{
    sense:"Ἄλφα καὶ τὸ Ὦ (Alpha kai to Ō) — the first and last letters of the Greek alphabet. 'I am the Alpha and the Omega' declares that God encompasses all reality from its absolute beginning to its absolute end — no letter, no word, no event, no history exists outside his scope. The same claim appears in Isaiah 44:6 ('I am the first and I am the last; besides me there is no God') and 48:12 ('I am he; I am the first, and I am the last') — John's Greek idiom renders the Hebrew aleph-taw declaration.",
    notMeant:"Not merely that God is ancient and will be around at the end. Alpha and Omega is a claim to comprehensive ontological priority and final authority — he IS the beginning and the end, not merely present at them.",
    why:"Revelation 22:13 applies the same title to Jesus ('I am the Alpha and the Omega, the first and the last, the beginning and the end') — making the same divine identity claim for the risen Christ as is made for the Father in 1:8. The shared title is one of Revelation's clearest claims about Christ's full divinity.",
    matters:"'Alpha and Omega' grounds eschatological confidence: if God is the Omega (the final letter, the end), then history's conclusion is in his hands, not in the hands of the empires, powers, or chaos-forces that Revelation describes. The saints in Revelation can endure because they know how the last letter reads.",
    auditStatus:"context-reviewed"
  },
  Almighty:{
    sense:"παντοκράτωρ (pantokratōr, G3841) — ruler of all, all-powerful, the one who holds all things in his grasp. From panta (all) + kratēs (rule/power). This word appears almost exclusively of God in the LXX and NT — it is the standard LXX translation of YHWH Sabaoth (LORD of hosts/armies, the God of the angelic armies who is sovereign over all powers). Pantokratōr appears 9 times in Revelation (1:8; 4:8; 11:17; 15:3; 16:7, 14; 19:6, 15; 21:22) and once in Paul (2 Cor 6:18), always designating God's universal, unrivaled sovereignty.",
    notMeant:"Not 'very powerful among other powerful beings.' Not a comparative title. Pantokratōr is the absolute: all power, without exception or rival, is in his grasp. The title is the grammar of monotheism.",
    why:"In Revelation, pantokratōr appears at every theological climax: when the elders worship (4:8), when the kingdom is proclaimed (11:17), when God's judgments are complete (19:6), and when the new creation's temple is the Lord God Almighty himself (21:22). The word marks the moments when God's ultimate sovereignty breaks through.",
    matters:"The context of Rev 1:8 is pastoral as well as theological: John writes to persecuted churches in Asia Minor who face the power of Rome. The pantokratōr designation is comfort to the suffering saints — the God who calls himself the All-Ruler will defeat every power that persecutes his people.",
    auditStatus:"context-reviewed"
  }
}
};
