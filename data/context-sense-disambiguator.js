// SWRV Kingdom Bible — Context-Sense Disambiguator
// For ambiguous English words whose actual meaning depends on the underlying
// Hebrew/Greek source word in this specific verse, this layer routes to the
// right card. Consumed by showDef(word, {strongsTags, ref}) in app.js.
// When a verse's strongsTags include any of the IDs below, the chip-and-card
// renders the disambiguated entry instead of a single flattened definition.

window.CONTEXT_SENSE = {
  "love":{
    defaultStrongs:"G26",
    byStrongs:{
      "G26":{lang:"Greek",word:"ἀγάπη",translit:"agape",gloss:"Self-giving covenant love. The love God IS (1 John 4:8). Volitional and active."},
      "G25":{lang:"Greek",word:"ἀγαπάω",translit:"agapao",gloss:"Verb form of agape — to love sacrificially. Watch John 21:15-17 where Jesus uses agapao, Peter answers phileo."},
      "G5368":{lang:"Greek",word:"φιλέω",translit:"phileo",gloss:"To love with warm friendship affection. Real love, distinct from agape."},
      "G5384":{lang:"Greek",word:"φίλος",translit:"philos",gloss:"Friend, dear one. 'No greater agape than to lay down one's life for one's philos' (John 15:13)."},
      "H157":{lang:"Hebrew",word:"אָהַב",translit:"ahab",gloss:"To love / choose / cleave to. The Shema's verb (Deut 6:5)."},
      "H2617":{lang:"Hebrew",word:"חֶסֶד",translit:"hesed",gloss:"Covenant lovingkindness. Loyal love within covenant (the OT dominant love-word — 248x)."}
    }
  },
  "kingdom":{
    defaultStrongs:"G932",
    byStrongs:{
      "G932":{lang:"Greek",word:"βασιλεία",translit:"basileia",gloss:"Reign, royal rule, kingdom-realm. In Gal 5:21 it is THE kingdom of God that the persistently-fleshly will not inherit."},
      "G935":{lang:"Greek",word:"βασιλεύς",translit:"basileus",gloss:"King."},
      "H4438":{lang:"Hebrew",word:"מַלְכוּת",translit:"malkut",gloss:"Royal rule / dominion."},
      "H4467":{lang:"Hebrew",word:"מַמְלָכָה",translit:"mamlakah",gloss:"Kingdom / dominion (Ex 19:6: Israel a kingdom of priests)."},
      "H4428":{lang:"Hebrew",word:"מֶלֶךְ",translit:"melek",gloss:"King."}
    }
  },
  "flesh":{
    defaultStrongs:"G4561",
    byStrongs:{
      "G4561":{lang:"Greek",word:"σάρξ",translit:"sarx",gloss:"Five distinct senses: body, kinship, mortality, fallen nature opposed to the Spirit, or sphere of human boasting. Check the qualifier in context."},
      "G4559":{lang:"Greek",word:"σαρκικός",translit:"sarkikos",gloss:"Fleshly / carnal."},
      "H1320":{lang:"Hebrew",word:"בָּשָׂר",translit:"basar",gloss:"Flesh / body / kindred."}
    }
  },
  "soul":{
    defaultStrongs:"H5315",
    byStrongs:{
      "H5315":{lang:"Hebrew",word:"נֶפֶשׁ",translit:"nephesh",gloss:"Living self — breath-life, person, appetite. Used of animals and humans alike."},
      "G5590":{lang:"Greek",word:"ψυχή",translit:"psyche",gloss:"Soul / life — translates nephesh in LXX. Source of 'psychology.'"},
      "H5397":{lang:"Hebrew",word:"נְשָׁמָה",translit:"neshamah",gloss:"Breath (the divine in-breathing of Gen 2:7)."}
    }
  },
  "spirit":{
    defaultStrongs:"G4151",
    byStrongs:{
      "H7307":{lang:"Hebrew",word:"רוּחַ",translit:"ruach",gloss:"Wind / breath / spirit / Spirit. Context decides."},
      "G4151":{lang:"Greek",word:"πνεῦμα",translit:"pneuma",gloss:"Wind / breath / spirit / Spirit."},
      "H5397":{lang:"Hebrew",word:"נְשָׁמָה",translit:"neshamah",gloss:"Breath of life."}
    }
  },
  "grace":{
    defaultStrongs:"G5485",
    byStrongs:{
      "G5485":{lang:"Greek",word:"χάρις",translit:"charis",gloss:"Favor, gift, divine empowerment, gratitude."},
      "H2580":{lang:"Hebrew",word:"חֵן",translit:"chen",gloss:"Favor — especially 'in the eyes of' someone (Gen 6:8)."},
      "H2617":{lang:"Hebrew",word:"חֶסֶד",translit:"hesed",gloss:"Covenant lovingkindness — often rendered 'mercy' or shades of 'grace.'"}
    }
  },
  "faith":{
    defaultStrongs:"G4102",
    byStrongs:{
      "G4102":{lang:"Greek",word:"πίστις",translit:"pistis",gloss:"Trust / faithfulness / body of belief / assurance."},
      "G4100":{lang:"Greek",word:"πιστεύω",translit:"pisteuo",gloss:"To trust / entrust."},
      "G4103":{lang:"Greek",word:"πιστός",translit:"pistos",gloss:"Faithful, trustworthy."},
      "H530":{lang:"Hebrew",word:"אֱמוּנָה",translit:"emunah",gloss:"Firmness / faithfulness."},
      "H539":{lang:"Hebrew",word:"אָמַן",translit:"aman",gloss:"To confirm / believe / be faithful (root of 'amen')."}
    }
  },
  "works":{
    defaultStrongs:"G2041",
    byStrongs:{
      "G2041":{lang:"Greek",word:"ἔργον",translit:"ergon",gloss:"Deed/work. Watch the qualifier: 'of the law,' 'good,' 'dead,' 'of the flesh.'"},
      "G2038":{lang:"Greek",word:"ἐργάζομαι",translit:"ergazomai",gloss:"To work / labor."},
      "H4639":{lang:"Hebrew",word:"מַעֲשֶׂה",translit:"ma'aseh",gloss:"Deed / work."}
    }
  },
  "law":{
    defaultStrongs:"G3551",
    byStrongs:{
      "G3551":{lang:"Greek",word:"νόμος",translit:"nomos",gloss:"Law — can mean Torah (the five books), Mosaic law, principle, Roman law, or legalism. Context decides."},
      "H8451":{lang:"Hebrew",word:"תּוֹרָה",translit:"torah",gloss:"Instruction / teaching / law — broader than 'rules.'"}
    }
  },
  "righteousness":{
    defaultStrongs:"G1343",
    byStrongs:{
      "G1343":{lang:"Greek",word:"δικαιοσύνη",translit:"dikaiosyne",gloss:"Righteousness — moral, judicial, covenant-faithful."},
      "G1342":{lang:"Greek",word:"δίκαιος",translit:"dikaios",gloss:"Righteous, just."},
      "G1344":{lang:"Greek",word:"δικαιόω",translit:"dikaioo",gloss:"To justify."},
      "H6664":{lang:"Hebrew",word:"צֶדֶק",translit:"tsedeq",gloss:"Rightness / justice / norm-conformity."},
      "H6666":{lang:"Hebrew",word:"צְדָקָה",translit:"tsedaqah",gloss:"Righteousness / righteous act / vindication."}
    }
  },
  "peace":{
    defaultStrongs:"H7965",
    byStrongs:{
      "H7965":{lang:"Hebrew",word:"שָׁלוֹם",translit:"shalom",gloss:"Wholeness / completeness / peace / prosperity."},
      "G1515":{lang:"Greek",word:"εἰρήνη",translit:"eirene",gloss:"Peace / harmony."}
    }
  },
  "holy":{
    defaultStrongs:"H6918",
    byStrongs:{
      "H6918":{lang:"Hebrew",word:"קָדוֹשׁ",translit:"qadosh",gloss:"Holy / set apart."},
      "G40":{lang:"Greek",word:"ἅγιος",translit:"hagios",gloss:"Holy / set apart / saint."}
    }
  },
  "heart":{
    defaultStrongs:"H3820",
    byStrongs:{
      "H3820":{lang:"Hebrew",word:"לֵב",translit:"lev",gloss:"Heart — the whole inner self: thinking, willing, desiring."},
      "H3824":{lang:"Hebrew",word:"לֵבָב",translit:"levav",gloss:"Heart, inner self."},
      "G2588":{lang:"Greek",word:"καρδία",translit:"kardia",gloss:"Heart — the whole inner self."}
    }
  },
  "world":{
    defaultStrongs:"G2889",
    byStrongs:{
      "G2889":{lang:"Greek",word:"κόσμος",translit:"kosmos",gloss:"World — can mean the created order (John 3:16), humanity (John 1:10), or the fallen world-system opposed to God (1 John 2:15-17). Watch context."},
      "G165":{lang:"Greek",word:"αἰών",translit:"aion",gloss:"Age / world (temporal sense: 'this age' vs 'the age to come')."},
      "G3625":{lang:"Greek",word:"οἰκουμένη",translit:"oikoumene",gloss:"Inhabited world / empire."}
    }
  },
  "knowledge":{
    defaultStrongs:"G1108",
    byStrongs:{
      "G1108":{lang:"Greek",word:"γνῶσις",translit:"gnosis",gloss:"Knowledge — propositional or experiential."},
      "G1922":{lang:"Greek",word:"ἐπίγνωσις",translit:"epignosis",gloss:"Full / experiential knowledge."},
      "H1847":{lang:"Hebrew",word:"דַּעַת",translit:"da'at",gloss:"Knowledge — intimate, experiential."}
    }
  },
  "god":{
    defaultStrongs:"H430",
    byStrongs:{
      "H430":{lang:"Hebrew",word:"אֱלֹהִים",translit:"elohim",gloss:"The most common Hebrew word for God, a plural form used with singular verbs throughout Genesis, signaling what theologians call the 'plural of majesty' or an anticipation of the triune nature of God revealed later in Scripture. Elohim is the cosmic creator-title: it is the name under which God creates the heavens and the earth (Gen 1:1), speaks existence into being, and evaluates his work as good. While pagan cultures used elohim for a divine council, in Israel's usage the singular verbs and absolute monotheism of Deuteronomy make clear that Elohim is one — the utterly unique God who alone creates, rules, and saves."},
      "H410":{lang:"Hebrew",word:"אֵל",translit:"el",gloss:"The shorter, more elemental Hebrew root for God, conveying raw power, might, and divine authority. El appears in compound divine names: El Shaddai (God Almighty), El Elyon (God Most High), El Roi (God who sees), each capturing a facet of divine power and presence. It is also the ancient Semitic word for deity shared across the ANE, which is precisely why Isaiah uses El sarcastically for the powerless idols (Isa 44:10) — they have the name but not the nature. When the OT uses El of Israel's God, it is emphatically claiming that the full weight of divine power belongs to YHWH alone."},
      "G2316":{lang:"Greek",word:"θεός",translit:"theos",gloss:"The standard Greek word for God, used in the NT for the one true God (usually with the article: ho theos = the God) and occasionally for pagan deities where the context makes clear they are false gods (Acts 14:11; 1 Cor 8:5, 'there are many so-called theoi'). In John 1:1, theos without the article is used as a predicate nominative ('the Word was God') — a construction that affirms the divine nature of the Son without collapsing the distinction between Father and Son. The LXX (Greek OT) uses theos to translate both Elohim and El, making theos the bridge word by which Hebrew theology entered the Greek-speaking world."}
    }
  },
  "lord":{
    defaultStrongs:"H3068",
    byStrongs:{
      "H3068":{lang:"Hebrew",word:"יהוה",translit:"YHWH",gloss:"The personal covenant name of God, consisting of the four Hebrew consonants Yod-Heh-Vav-Heh (the Tetragrammaton), never vocalized aloud by observant Jews out of reverence — the vowels of Adonai were substituted when reading, producing the hybrid 'Jehovah' in later tradition. The name derives from the verb hayah (to be/exist) as God himself explains in Exodus 3:14 ('I AM WHO I AM / I WILL BE WHAT I WILL BE'), making YHWH the self-existent, self-defining, eternally present One who is bound to his people by covenant oath. In English Bibles, YHWH is conventionally rendered 'LORD' in small capitals to distinguish it from Adonai; recognizing when you are reading YHWH vs. Adonai is crucial for tracking covenant-name theology throughout the OT."},
      "H136":{lang:"Hebrew",word:"אֲדֹנָי",translit:"adonai",gloss:"A plural honorific form meaning 'my Lord/Master' or 'my Lords,' used as the spoken substitute for YHWH in Jewish reading tradition and also as a standalone title of divine authority. Adonai emphasizes sovereignty and authority — YHWH is the owner and master of all creation and of his covenant people. When Psalm 110:1 says 'YHWH said to my Adonai,' David uses the two distinct words to point to a figure who is simultaneously David's lord and YHWH's appointed king — a passage Jesus explicitly cites as referring to the Messiah (Matt 22:41-46)."},
      "H113":{lang:"Hebrew",word:"אָדוֹן",translit:"adon",gloss:"The basic word for master, owner, or lord, applicable to human masters (Gen 24:9 — Abraham is adon to his servant), to kings, to husbands, and to God. Unlike YHWH (personal covenant name) or Adonai (divine honorific), adon is the everyday authority word, covering the full range from a household head to the divine ruler. When applied to God, adon carries the implication of complete ownership and rightful governance over everything he has made."},
      "G2962":{lang:"Greek",word:"κύριος",translit:"kyrios",gloss:"The most theologically loaded title in the NT, meaning Lord, master, or owner — and carrying an enormous weight because the LXX used kyrios to translate YHWH everywhere in the OT, so any first-century Jew hearing kyrios applied to Jesus was hearing an implicit claim to the divine covenant name. Paul's foundational confession 'Jesus is Lord' (kyrios, Rom 10:9; 1 Cor 12:3) and the Christ-hymn of Phil 2:9-11 ('the name above every name... every tongue confess Jesus Christ is Lord') deliberately echo Isaiah 45:23 where YHWH says every knee will bow to HIM — applying YHWH's identity to Jesus is the heart of NT Christology. In non-theological contexts kyrios simply means master or owner (a slave's kyrios, a woman's kyrios in marriage law), so context determines whether it carries the divine weight or the everyday authority meaning."}
    }
  },
  "light":{
    defaultStrongs:"H216",
    byStrongs:{
      "H216":{lang:"Hebrew",word:"אוֹר",translit:"or",gloss:"Physical light, created on Day 1 of Genesis before the sun and stars (Day 4), signaling that light in Scripture is first God's own creative act rather than a property of the sun. Or carries powerful metaphorical range throughout the OT: it is associated with life ('in your light we see light,' Ps 36:9), with salvation (Ps 27:1 'YHWH is my light and my salvation'), with Torah ('your word is a lamp... and a light,' Ps 119:105), and with God's own presence and glory. Isaiah 60:19-20 pictures the eschatological future where YHWH himself replaces the sun as Israel's or — the creation-narrative light and the divine-presence light converge at the end of history."},
      "G5457":{lang:"Greek",word:"φῶς",translit:"phos",gloss:"The primary NT word for light, used both for physical light and — dominantly in John and the Epistles — for the divine self-revelation and moral clarity that Jesus brings into the dark world. John's Gospel uniquely presents Jesus not as one who brings phos but as the phos himself: 'I am the light (phos) of the world' (John 8:12); 'In him was life, and the life was the phos of men' (John 1:4). This is more than metaphor — it identifies Jesus with the divine presence-light of the OT Shekinah and with the creative or of Genesis 1:3, grounding his identity in the deepest structures of creation and covenant."}
    }
  },
  "darkness":{
    defaultStrongs:"H2822",
    byStrongs:{
      "H2822":{lang:"Hebrew",word:"חֹשֶׁךְ",translit:"choshek",gloss:"The Hebrew word for darkness, covering the full range from physical absence of light (Gen 1:2, 4-5 — the pre-creation darkness God names 'Night') to the darkness of the plagues of Egypt (Ex 10:21-22 — a darkness that could be felt, a divine judgment), to the darkness associated with death and Sheol (Ps 88:12 'the land of darkness and forgetting'). Importantly, choshek in Genesis 1 is not yet evil — God separates it from light and names it, giving it its proper place in the created order; but as the narrative progresses, darkness increasingly becomes the realm associated with divine judgment, enemy territory, and moral blindness."},
      "G4655":{lang:"Greek",word:"σκότος",translit:"skotos",gloss:"Darkness as a moral and spiritual domain in the NT, used especially by Paul for the state of humanity apart from God and for the realm of evil powers. Ephesians 5:8 makes the most striking use: 'You WERE darkness' (not just 'in darkness' — you were the darkness itself), 'but now you are light in the Lord' — the transfer from skotos to phos is a transfer of identity, not just location. Skotos is also used for the darkness that covered the land during the crucifixion (Matt 27:45) and for the outer darkness of final judgment (Matt 8:12)."},
      "G4653":{lang:"Greek",word:"σκοτία",translit:"skotia",gloss:"The most frequent Johannine word for darkness, used in John 1:5 for the darkness that 'did not overcome' the light, and throughout 1 John for the moral-spiritual environment of sin and hatred. Skotia and skotos are closely related (both from the same root) but skotia tends to function more as a realm or environment — the darkness as the place where the enemy operates, the unbeliever lives, and sin is concealed — while skotos can carry more the sense of the power or condition of darkness. John 1:5 uses skotia precisely because the darkness is a realm the light entered and was not conquered by."}
    }
  },
  "good":{
    defaultStrongs:"H2896",
    byStrongs:{
      "H2896":{lang:"Hebrew",word:"טוֹב",translit:"tov",gloss:"The most common Hebrew word for good, covering a remarkable range: physically pleasant (Gen 2:9 — trees good to look at), functionally fit (Gen 1:4 — light is good, i.e., it works), morally right (Mic 6:8 — what is good), and aesthetically beautiful. The repeated refrain 'God saw that it was tov' in Genesis 1 is primarily a declaration of functional fitness — creation is working as God designed, ordered and flourishing — not merely a statement of moral innocence. Tov's breadth means that in any passage one must ask: is this good in the sense of useful, pleasant, morally right, or beautiful? The answer usually involves more than one of these simultaneously."},
      "G18":{lang:"Greek",word:"ἀγαθός",translit:"agathos",gloss:"Moral and intrinsic goodness in Greek thought — the good that is good in itself, beneficial and right in character. In the NT, agathos is used for God alone in the absolute sense ('No one is good — agathos — but God alone,' Mark 10:18), for 'good works' that demonstrate genuine faith (Eph 2:10), and for the 'good and faithful servant' (Matt 25:21). It must be distinguished from kalos (G2570), which emphasizes the beautiful, excellent, and fitting — kalos is the word for 'good shepherd' in John 10:11, stressing the ideal, noble quality of the shepherd rather than mere moral virtue."}
    }
  },
  "evil":{
    defaultStrongs:"H7451",
    byStrongs:{
      "H7451":{lang:"Hebrew",word:"רַע",translit:"ra",gloss:"The broad Hebrew term for what is bad, harmful, displeasing, or morally wicked — covering everything from physical disaster (Amos 6:3 — a day of ra calamity) to moral wickedness (Gen 6:5 — every intention of man's heart was ra) to God's judicial 'evil' against unrepentant nations (Jer 18:8 — the ra I planned). This semantic breadth means that the 'tree of the knowledge of good and evil' (tov and ra, Gen 2:17) encompasses all moral opposites, the full spectrum of evaluative judgment — not specifically a knowledge of wickedness alone. Recognizing that ra means 'bad/harmful' in the broadest sense prevents importing only moral evil when the text may mean disaster, ugliness, or adversity."},
      "G4190":{lang:"Greek",word:"πονηρός",translit:"poneros",gloss:"Actively malignant, dangerous evil — not just passively bad but viciously working harm. Poneros is the dominant NT word for the devil ('the evil one,' ho poneros, Matt 6:13; 1 John 5:18-19 — the world lies in the poneros), for the evil heart that produces evil deeds (Matt 12:35), and for the evil generation that demands signs (Matt 12:39). The distinction between poneros (active, aggressive malice) and kakos (G2556 — bad quality, defective character) is important: poneros implies movement toward harm, not merely the absence of good."},
      "G2556":{lang:"Greek",word:"κακός",translit:"kakos",gloss:"Bad quality, moral defectiveness, the absence of what ought to be present — the most general Greek word for evil in the sense of badness of character or condition. Kakos can refer to a bad tree (Matt 7:17-18), a bad slave (Matt 24:48), or moral evil generally (Rom 7:19 — 'the evil I do not want to do, that I practice'). Unlike poneros (which is actively harmful and aggressive), kakos tends to be more neutral on the axis of active malice — it describes something or someone as lacking the quality it should have."}
    }
  },
  "word":{
    defaultStrongs:"G3056",
    byStrongs:{
      "H1697":{lang:"Hebrew",word:"דָּבָר",translit:"dabar",gloss:"The Hebrew dabar is simultaneously word, thing, matter, event, and command — a semantic range that reveals the Hebrew worldview: a spoken word is a real event, not merely a sound. When God speaks (dabar), something happens — Gen 1 is structured around God's dabar-acts, and Ps 33:6 says 'by the word (dabar) of YHWH the heavens were made.' Dabar carries weight and reality; it is not abstract but active. This is why the prophets introduce their messages as 'the dabar of YHWH that came to me' — the word is an event arriving, not merely information transmitted."},
      "G3056":{lang:"Greek",word:"λόγος",translit:"logos",gloss:"The richest single word in John's Gospel, carrying at least three traditions simultaneously: the Greek philosophical logos as the rational principle ordering the cosmos (Heraclitus, Stoics), the Jewish Wisdom/Word tradition where God's Word is the agent of creation and revelation (Prov 8; Ps 33:6; Philo's logos), and the Hebrew dabar as the creative, reality-making speech of God. John 1:1-14 hijacks all three and identifies the logos as a person who was with God, was God, created all things, became flesh, and is Jesus Christ. The logos is not an idea or a force but a person — the divine self-expression who enters history as a human being."},
      "G4487":{lang:"Greek",word:"ῥῆμα",translit:"rhema",gloss:"A specific spoken utterance or saying, as distinct from logos (which can be the totality of a message or the Word-as-person). Rhema is the word in its spoken, particular, voiced form — Romans 10:17 says 'faith comes by hearing, and hearing by the rhema of Christ,' meaning a specific audible proclamation. Luke uses rhema for the angel's specific message to Mary (Luke 1:37-38) and for the specific sayings of Jesus that Peter remembered (Luke 22:61). The difference is subtle but real: logos tends toward the comprehensive and personal; rhema tends toward the particular, spoken, hearing-event."}
    }
  },
  "truth":{
    defaultStrongs:"H571",
    byStrongs:{
      "H571":{lang:"Hebrew",word:"אֱמֶת",translit:"emet",gloss:"Hebrew truth is fundamentally relational and covenantal — emet means faithfulness, reliability, steadfastness, the quality of being rock-solid and trustworthy. It is one of YHWH's defining covenant attributes ('abounding in chesed and emet,' Ex 34:6), meaning God is the one who always comes through on his promises, whose word matches reality because he makes reality match his word. Emet does not primarily mean 'correct propositions,' though it includes that — it means the kind of truth that can bear weight, be leaned on, be trusted with your life."},
      "G225":{lang:"Greek",word:"ἀλήθεια",translit:"aletheia",gloss:"Greek aletheia (from a- 'not' + lēthē 'hidden') literally means 'unhiddenness' or 'unveiled reality' — truth as what is genuinely real as opposed to what is concealed, illusory, or false. In John's Gospel, aletheia takes on the Hebrew emet colouring and becomes charged with the identity of Jesus himself: 'I am the way, the truth (aletheia), and the life' (John 14:6) does not mean Jesus gives correct information — it means Jesus IS unveiled reality, the person in whom the real nature of God and humanity are disclosed. John 8:32 ('the truth will set you free') refers to this person-as-truth, not merely to correct doctrine."}
    }
  },
  "way":{
    defaultStrongs:"H1870",
    byStrongs:{
      "H1870":{lang:"Hebrew",word:"דֶּרֶךְ",translit:"derek",gloss:"Road, path, journey, manner of life, and God's prescribed way of living — derek is the OT's primary word for the moral/spiritual path that a person takes through life. Psalm 1 structures the entire book of Psalms around two dereks: the way of the righteous (v.6a) and the way of the wicked (v.6b). Proverbs repeatedly calls young people to the right derek. The Deuteronomic literature speaks of 'walking in all his ways (derakim)' as the summary of covenant obedience — derek encompasses direction, manner, and destination together."},
      "G3598":{lang:"Greek",word:"ὁδός",translit:"hodos",gloss:"Road, way, journey, and — in John 14:6 — the person of Jesus as the living path to the Father. The early Christians were called followers of 'the Way' (hē hodos, Acts 9:2; 19:9; 24:14) — a self-description that drew on both Greek travel imagery and the OT derek traditions. When Jesus says 'I am the hodos' (John 14:6), he does not offer a method or a route-map — he says that he himself is the way, that access to the Father is not a technique to be learned but a person to be trusted and followed. The hodos is not traveled without him; it is traveled in union with him."}
    }
  },
  "life":{
    defaultStrongs:"G2222",
    byStrongs:{
      "H2416":{lang:"Hebrew",word:"חַי",translit:"chai",gloss:"The Hebrew chai (adjective: living, alive) and its noun form chayyim (life, lives) cover biological life, the vitality that distinguishes the living from the dead, and the rich life of covenant blessing that God promises. Gen 2:7 calls Adam a nephesh chayah (living being/soul) — the same phrase used of animals in Gen 1:24, grounding human life in the same creatureliness as all living things while the divine neshamah marks the special dignity. 'Choose life' (Deut 30:19) is not merely biological survival but the fullness of covenant relationship with YHWH."},
      "G2222":{lang:"Greek",word:"ζωή",translit:"zoe",gloss:"The life of God, divine life, eternal life — in John's Gospel, zoe is the signature word for what Jesus brings and what Jesus IS. 'In him was life (zoe)' (John 1:4); 'I came that they may have life (zoe) and have it abundantly' (John 10:10); 'I am the resurrection and the life (zoe)' (John 11:25). Zoe is distinguished from mere biological existence precisely by being the life that belongs to God and is shared with humanity through union with Christ. John 17:3 defines it: 'This is eternal life (zoe aionios) — that they know you, the only true God, and Jesus Christ whom you have sent.'"},
      "G979":{lang:"Greek",word:"βίος",translit:"bios",gloss:"Physical, biological, everyday life — the mundane existence of getting, spending, and experiencing in the world. Bios is the word for the 'life' of this world as opposed to the life of God: Luke 8:14 warns that the cares and riches and pleasures of bios choke the word; 1 John 2:16 warns against 'the pride of bios' (worldly life-as-boasting). Bios is not evil in itself (1 Tim 2:2 — a quiet and peaceable bios is good), but it is categorically different from zoe, and confusing the two leads to a materialistic Christianity that mistakes biological comfort for kingdom life."}
    }
  },
  "death":{
    defaultStrongs:"H4194",
    byStrongs:{
      "H4194":{lang:"Hebrew",word:"מָוֶת",translit:"mavet",gloss:"Death, the state of being dead, and the realm of the dead (often parallel with Sheol) — mavet is the dark counterpart to chayyim (life) in Hebrew thought. Genesis 2:17 uses the doubled form muth tamuth ('dying you shall die' or 'you shall surely die') to emphasize the certainty and totality of the death-consequence for disobedience. Mavet in the OT is both biological death (the end of physical nephesh-life) and a spiritual-relational state of separation from YHWH — Ps 88 uses mavet imagery for the experience of divine abandonment while still alive, and Ezekiel 37's valley of dry bones uses the same imagery for Israel's covenant death-in-exile."},
      "G2288":{lang:"Greek",word:"θάνατος",translit:"thanatos",gloss:"Death in the NT — biological, spiritual, and eternal — and the personified power of death that Christ defeats. Paul's most concentrated analysis is in Romans 5-8: thanatos entered the world through sin (5:12), reigned as a power over humanity (5:14), and is described as 'the wages of sin' (6:23) — the just return on a life of sin-service. But Christ's resurrection is the victory over thanatos (1 Cor 15:54-57 — 'Death (thanatos) is swallowed up in victory'), and John 5:24 makes the astonishing promise that those who hear and believe have 'passed from death (thanatos) into life (zoe)' — they have crossed the fundamental ontological boundary already, in the present."}
    }
  },
  "glory":{
    defaultStrongs:"H3519",
    byStrongs:{
      "H3519":{lang:"Hebrew",word:"כָּבוֹד",translit:"kavod",gloss:"Heaviness, weight, honor, and the manifest splendor of God's presence — kavod comes from the root kaved (to be heavy/weighty), so glory is literally what has weight and substance. The 'glory of YHWH' in Exodus is the visible, weighty, sometimes dangerous divine presence — it fills the tabernacle so that Moses cannot enter (Ex 40:34-35), it appears on Sinai as consuming fire (Ex 24:17), it departs from the temple in Ezekiel's vision (Ezek 10-11). Moses asks to see YHWH's kavod (Ex 33:18) and is shown God's name and character — kavod and character/name are linked in Hebrew thought."},
      "G1391":{lang:"Greek",word:"δόξα",translit:"doxa",gloss:"Originally in Greek, doxa meant opinion or reputation — what others think of you. But the LXX translated kavod with doxa everywhere, completely recharging the Greek word with the Hebrew sense of manifest splendor, weighty divine presence, and radiant honor. In John 1:14, 'we beheld his glory (doxa)' — the disciples saw the kavod/shekinah of God in the flesh of Jesus, the same glory that filled the tabernacle. In John 17:5, Jesus speaks of 'the glory I had with you before the world existed' — doxa as the eternal, pre-incarnate radiance of divine being that the Son laid aside and then was restored to in the resurrection."}
    }
  },
  "name":{
    defaultStrongs:"H8034",
    byStrongs:{
      "H8034":{lang:"Hebrew",word:"שֵׁם",translit:"shem",gloss:"Name, but in Hebrew thought a name is never merely a label — it is identity, character, reputation, and the totality of what someone is. To know someone's name is to know their nature; to act 'in someone's name' is to act with their authority and on their behalf; to 'make a name for yourself' is to build a reputation. The third commandment (Ex 20:7) forbids using YHWH's shem in vain — which is not primarily about the word 'God' as a swear word but about invoking God's identity to validate falsehood, to claim divine authority for your own agenda, or to treat God as a magic word at your service rather than the sovereign Lord whose name summons his presence."},
      "G3686":{lang:"Greek",word:"ὄνομα",translit:"onoma",gloss:"Name, carrying the Hebrew sense of identity and authority in NT usage, especially in the phrase 'in the name of Jesus.' To pray, heal, baptize, or act 'in Jesus' name' (en tō onomati Iēsou) is to do so by his authority, representing his character, within his covenant relationship — it is not a verbal formula but an expression of identification with and authorization by him. Acts 4:12 ('there is no other name under heaven... by which we must be saved') uses onoma to claim that Jesus' entire identity, authority, and saving power is uniquely operative — no other person contains that saving reality."}
    }
  },
  "blood":{
    defaultStrongs:"H1818",
    byStrongs:{
      "H1818":{lang:"Hebrew",word:"דָּם",translit:"dam",gloss:"Blood, and by extension the life itself — Leviticus 17:11 makes the equation explicit: 'the life (nephesh) of the flesh is in the blood (dam),' which is why blood is the medium of atonement ('I have given it to you on the altar to make atonement for your souls'). Covenant-making in the OT involves blood: the Abrahamic covenant (Gen 15 — the blood of the slaughtered animals), the Mosaic covenant (Ex 24:8 — Moses sprinkles 'the blood of the covenant' on the people). Dam is never casual in the OT — it is always the most serious substance, because to shed blood is to deal with life itself."},
      "G129":{lang:"Greek",word:"αἷμα",translit:"haima",gloss:"Blood in the NT, carrying all the OT covenantal and sacrificial weight of dam. Hebrews 9:22 states the principle: 'Without the shedding of blood (haima) there is no forgiveness' — drawing on the entire sacrificial system to show why Christ's haima is the final, complete atonement. John 6:53-56 is deliberately shocking: 'Unless you eat the flesh of the Son of Man and drink his blood (haima), you have no life in you' — to drink the blood is the most extreme metaphor for total, life-receiving union with the one who has given his life completely. Rev 7:14 speaks of robes washed white in the Lamb's haima — cleansing through the very substance of sacrifice."}
    }
  },
  "covenant":{
    defaultStrongs:"H1285",
    byStrongs:{
      "H1285":{lang:"Hebrew",word:"בְּרִית",translit:"berit",gloss:"Covenant — a binding agreement established by oath, sometimes by blood, that creates a relationship more like family than like a business contract. A berit changes the identity of the parties: after Sinai, Israel is YHWH's people and YHWH is their God. Berits in the OT are initiated by oath (the Abrahamic covenant sworn by YHWH himself, Gen 15), sealed by blood or sacrifice (Ex 24:8), often have sign-marks (circumcision, Gen 17; Sabbath, Ex 31:16-17), and have blessing-and-curse clauses (Deut 28-29). The new covenant (Jer 31:31-34) is still a berit — still a covenant — but one written on the heart rather than stone tablets."},
      "G1242":{lang:"Greek",word:"διαθήκη",translit:"diatheke",gloss:"The NT's Greek word for covenant, chosen from among several options because diatheke in Greek law primarily meant a last will and testament — a one-party, unilateral document that takes effect at the death of the maker. This is not accident: Hebrews 9:15-17 exploits both meanings simultaneously — the diatheke is a covenant AND a testament/will, and it required the death of the covenant-maker (Christ) to come into effect. This gives the new covenant a unique character: it is not a bilateral negotiation between equals but the sovereign, death-enacted gift of a covenant Lord who became the sacrifice to ratify his own covenant."}
    }
  },
  "salvation":{
    defaultStrongs:"H3444",
    byStrongs:{
      "H3444":{lang:"Hebrew",word:"יְשׁוּעָה",translit:"yeshuah",gloss:"Deliverance, rescue, victory — the OT word for God's saving acts that encompasses the exodus, military victories, and the personal salvation of the individual. The name Joshua (Yehoshua) means 'YHWH saves,' and Jesus is the Greek form of the same name (Iēsous = Yeshua) — so Matthew 1:21 makes a Hebrew pun: 'You shall call his name Jesus (Yeshua) because he will save (yoshia) his people.' Yeshuah is concrete rescue in Hebrew thought, not merely spiritual transaction; it covers deliverance from enemies, from sin, from death, and from divine judgment."},
      "G4991":{lang:"Greek",word:"σωτηρία",translit:"soteria",gloss:"Rescue, preservation, deliverance, and comprehensive salvation — soteria in the NT is as broad as its Hebrew equivalent yeshuah: it covers past justification (Eph 2:8 — 'you have been saved'), present sanctification (Phil 2:12 — 'work out your salvation'), and future glorification (Rom 13:11 — 'our salvation is nearer than when we first believed'). Soteria is never merely 'going to heaven when you die' — it is God's total rescue operation for humanity: from the guilt of sin (justification), from sin's power (sanctification), from sin's presence (glorification), and ultimately the renewal of all creation (Rom 8:21-23)."}
    }
  },
  "hope":{
    defaultStrongs:"G1680",
    byStrongs:{
      "G1680":{lang:"Greek",word:"ἐλπίς",translit:"elpis",gloss:"Confident expectation of future good, not wishful thinking or optimism — elpis in the NT is grounded in the character of God and the resurrection of Christ, not in feelings or circumstances. Romans 5:2-5 traces the elpis-chain: suffering produces endurance, endurance produces proven character, proven character produces elpis — and 'elpis does not disappoint, because God's love has been poured out in our hearts through the Holy Spirit.' The eschatological dimension is crucial: elpis looks forward to the return of Christ, the resurrection, and the renewal of creation (Rom 8:20-24) — it is a present orientation toward a certain future, not a passive wish."},
      "H8615":{lang:"Hebrew",word:"תִּקְוָה",translit:"tiqvah",gloss:"Hope, expectation — literally a cord or thread (from the root qavah, to bind together, to wait). The word carries the physical image of holding on to something: hope is that which you grip, the lifeline you clutch in difficulty. Its most famous use is in Jeremiah 29:11 ('plans for shalom and not for ra, to give you a future and a tiqvah'), where YHWH promises hope to exiles — not that the exile is not real, but that it is not the end. Ruth 1:12 uses tiqvah for the hope of children Naomi no longer has — a word for the thing you still reach toward even when it seems gone."}
    }
  },
  "joy":{
    defaultStrongs:"H8057",
    byStrongs:{
      "H8057":{lang:"Hebrew",word:"שִׂמְחָה",translit:"simchah",gloss:"Gladness, mirth, rejoicing — the most common Hebrew word for joy, heavily associated with communal celebration, festivals (the great festivals of Israel are commanded occasions of simchah), and worship. Nehemiah 8:10 contains the famous declaration 'the joy (simchah) of YHWH is your strength' — spoken to a people weeping over their failures when they heard the Torah read, reassuring them that their relationship with YHWH is itself the source of inner strength. Simchah is typically outward and communal; it is celebrated visibly in song, dance, feasting, and gathering."},
      "G5479":{lang:"Greek",word:"χαρά",translit:"chara",gloss:"Joy in the NT — a deep, stable gladness that is independent of circumstances, rooted in the gospel and in the presence of God. Philippians 4:4 commands 'Rejoice (chairete) in the Lord always' — the present tense implies ongoing, habitual rejoicing, and 'in the Lord' grounds it in relationship rather than circumstances. Chara is one of the fruit of the Spirit (Gal 5:22), meaning it is not manufactured by the believer but grown by the Spirit in the one who walks with him. Jesus speaks of his own chara being in the disciples (John 15:11; 17:13) — the joy of the Son shared with those who abide in him."}
    }
  },
  "praise":{
    defaultStrongs:"H1984",
    byStrongs:{
      "H1984":{lang:"Hebrew",word:"הָלַל",translit:"halal",gloss:"To shine, to boast about, to celebrate loudly — and the root of 'Hallelujah' (hallelu-Yah = praise YHWH!). The most exuberant of the Hebrew praise-words, halal carries the sense of radiant, exuberant commendation. Fascinatingly, halal can also mean 'to act like a fool' or 'to be mad' (1 Sam 21:13 — David feigned madness, wayithalel) — the same word, suggesting that genuine praise of God shares something with the abandonment of self-conscious dignity. The Psalms that end with 'Hallelu-Yah' are calling for this full-throated, undignified celebration of YHWH's greatness."},
      "H8416":{lang:"Hebrew",word:"תְּהִלָּה",translit:"tehillah",gloss:"Praise, song of praise, hymn — the noun derived from halal, and the singular form of tehillim, the Hebrew title of the Psalter ('The Book of Praises'). Tehillah is the formal, composed praise-offering — the structured song as opposed to the spontaneous shout. Isaiah 61:3 promises 'a garment of praise (tehillah) instead of a spirit of heaviness' — the praise itself is a covering, a new identity put on those who grieve."},
      "G134":{lang:"Greek",word:"αἰνέω",translit:"aineo",gloss:"To praise, specifically of praising God — the verb used for the angels praising God at the birth of Christ (Luke 2:13), the disciples praising God at the triumphal entry (Luke 19:37), and Jesus himself praising the Father (Matt 11:25 — 'I praise you, Father'). Aineo is the NT's most concentrated praise-of-God word; it is what the worshipping community does before the throne (Rev 19:5 — 'Praise (aineite) our God, all his servants')."}
    }
  },
  "prayer":{
    defaultStrongs:"G4335",
    byStrongs:{
      "H8605":{lang:"Hebrew",word:"תְּפִלָּה",translit:"tephillah",gloss:"Prayer, intercession — the standard OT noun for prayer, from the verb palal (to pray, to intervene, to judge/arbitrate). Tephillah is the word in the Psalter's superscriptions ('A prayer of David') and in Solomon's dedication of the temple (1 Kings 8 — the great tephillah establishing the temple as the house of prayer for all nations, quoted by Jesus in Mark 11:17). The root palal's sense of intercession and mediation gives tephillah a covenantal dimension: prayer is not merely personal conversation but engagement in the covenant mediator's work."},
      "G4335":{lang:"Greek",word:"προσευχή",translit:"proseuche",gloss:"The most common NT Greek word for prayer, meaning prayer directed toward God (pros = toward + euche = vow/prayer). Proseuche is the general, comprehensive word that encompasses adoration, confession, thanksgiving, and supplication — whereas specific words like deesis (G1162, petition/request) or enteuxis (G1783, intercession) name narrower acts within the broader proseuche. 1 Timothy 2:1 lists four together: 'I urge that deesis, proseuche, enteuxis, and eucharistia be made for all people' — the fact that they are listed separately indicates they are distinct modes of communication with God, not synonyms."},
      "G1783":{lang:"Greek",word:"ἔντευξις",translit:"enteuxis",gloss:"Intercession, petition — technically the word for approaching a king with a petition on behalf of another person (from entynchano = to meet/approach for conversation). Enteuxis is the NT's most specific word for intercessory prayer — standing before God on behalf of someone else. First Timothy 2:1 lists it among four kinds of prayer, and 1 Tim 4:5 says food is sanctified by the word of God and enteuxis — implying that intercession-prayer consecrates even ordinary acts like eating."}
    }
  },
  "angel":{
    defaultStrongs:"H4397",
    byStrongs:{
      "H4397":{lang:"Hebrew",word:"מַלְאָךְ",translit:"malak",gloss:"Messenger — applicable to both human messengers sent by kings or prophets and to divine messengers sent by YHWH. The Hebrew word does not in itself specify supernatural vs. human; context determines which. The 'Angel of YHWH' (malak YHWH) in the OT is a particularly mysterious figure who speaks as YHWH in the first person (Gen 16:13; Ex 3:2-6; Judg 13:21-22), suggesting that this malak is a pre-incarnate appearance of the divine Son rather than a created angel — a possibility the NT encourages without explicitly stating."},
      "G32":{lang:"Greek",word:"ἄγγελος",translit:"angelos",gloss:"Messenger or angel — the same semantic range as Hebrew malak, covering human messengers (John the Baptist is called an angelos in Luke 7:24; the disciples sent ahead of Jesus in Luke 9:52 are angeloi) and the supernatural divine messengers of the heavenly court. The NT uses angelos primarily for the supernatural beings who appear in the gospel narratives, serve God's purposes in Acts and the Epistles, and appear prominently in Revelation. Hebrews 1-2 carefully distinguishes Jesus from the angeloi, showing him to be categorically above them — the Son who inherits everything, whom the angels worship."}
    }
  },
  "fire":{
    defaultStrongs:"H784",
    byStrongs:{
      "H784":{lang:"Hebrew",word:"אֵשׁ",translit:"esh",gloss:"Fire — the most theologically loaded natural phenomenon in the OT, simultaneously the symbol of God's presence (the burning bush of Ex 3:2, the pillar of fire in the wilderness, the fire on Sinai in Ex 19:18), of God's purifying holiness (Malachi 3:2 — 'he is like a refiner's fire'), and of God's consuming judgment (Deut 4:24 — 'your God is a consuming fire'). Esh is never religiously neutral in the OT: where there is esh from God, something decisive is happening — presence, commissioning, purification, or judgment. The fact that the same esh can represent both God's saving presence and his destroying judgment reflects the double-edged nature of divine holiness."},
      "G4442":{lang:"Greek",word:"πῦρ",translit:"pur",gloss:"Fire in the NT, carrying the same theological range as esh but applied to Christ and to final eschatological realities. Hebrews 12:29 directly quotes Deuteronomy 4:24 ('our God is a consuming fire') in the context of the new covenant — God's holiness has not diminished under grace. Revelation 1:14 describes the risen Christ's eyes as 'flames of fire (pur)' — the divine presence-fire, now in the person of Jesus, the one who will judge the world. Pentecost (Acts 2) brings divided tongues of pur that rest on each believer — the purifying, empowering fire of God's Spirit distributed to the entire community."}
    }
  },
  "power":{
    defaultStrongs:"G1411",
    byStrongs:{
      "H2428":{lang:"Hebrew",word:"חַיִל",translit:"chayil",gloss:"Strength, valor, might — specifically the power of the warrior and the army. Chayil is the word for a mighty man of valor (gibbor chayil), for a woman of valor (Prov 31:10 — eshet chayil, often translated 'virtuous woman' but better 'a woman of strength/ability/valor'), and for an army (chayil as a military force). The word conveys the kind of power that gets things done against resistance — not theoretical ability but demonstrated strength in the face of difficulty."},
      "G1411":{lang:"Greek",word:"δύναμις",translit:"dynamis",gloss:"Inherent power, miraculous ability, the energy that accomplishes what is beyond normal human capacity — the root of the English 'dynamite.' Dynamis in the NT is primarily the operative power of God: Acts 1:8 ('you will receive power/dynamis when the Holy Spirit comes upon you'), Romans 1:16 ('the gospel is the power/dynamis of God for salvation'), and 1 Corinthians 1:18 ('the message of the cross is the power/dynamis of God to those being saved'). The repeated identification of the gospel itself as dynamis is crucial: the power for transformation is not a technique layered onto the message but IS the message operatively proclaimed by the Spirit."},
      "G1849":{lang:"Greek",word:"ἐξουσία",translit:"exousia",gloss:"Authority, right, jurisdiction — the power of office and position rather than the inherent power of dynamis. Exousia is the power you have because of who you are or the position you hold, not the raw energy you carry in yourself. Matthew 28:18 ('All exousia in heaven and on earth has been given to me') is the risen Christ's claim to universal jurisdiction — not that he now has new inherent power, but that all rightful authority has been placed under his rule. The distinction from dynamis is consistent: a king has exousia (the right to command) while a soldier has dynamis (the strength to fight) — Jesus has both, but the Great Commission rests on his exousia."}
    }
  },
  "judgment":{
    defaultStrongs:"H4941",
    byStrongs:{
      "H4941":{lang:"Hebrew",word:"מִשְׁפָּט",translit:"mishpat",gloss:"Justice, legal decision, righteous ordinance — the OT's comprehensive word for the right ordering of society according to God's standards. Mishpat is what the prophets demand: Amos 5:24 ('Let mishpat roll down like waters'), Micah 6:8 ('what does YHWH require but to do mishpat, love chesed, and walk humbly'). It encompasses both the legal process (a fair trial) and the outcome (the righteous verdict), and extends outward to the structural organization of society so that the vulnerable are protected and the powerful are held accountable. Mishpat is not merely 'punishment for evildoers' — it is the condition of shalom where every person receives what is their due."},
      "G2920":{lang:"Greek",word:"κρίσις",translit:"krisis",gloss:"Judgment, decision, the crisis-moment of evaluation — and the source of the English 'crisis.' In John 3:19, Jesus announces 'this is the krisis: light has come into the world, and people loved darkness rather than light.' The coming of Christ is itself a judgment — not because he condemns, but because his presence forces a decision that reveals what people truly love. John 5:24 says the believer has passed OUT of krisis ('does not come into judgment') because they have passed from death to life — the verdict has been rendered in advance by faith."},
      "G2917":{lang:"Greek",word:"κρίμα",translit:"krima",gloss:"The verdict or sentence rendered in judgment — the legal outcome as opposed to the process (krisis). Krima tends to appear in contexts of condemnation: Romans 3:8 ('their krima is just'), Romans 13:2 ('those who resist will receive krima'), James 3:1 ('teachers will receive a stricter krima'). Unlike krisis (the crisis-moment), krima is the concluded verdict — the sentence pronounced. In eschatological contexts it is often the sentence of condemnation, though Romans 11:33 speaks of God's krimata (plural) as unsearchably deep, encompassing all his judicial decisions including his purposes of mercy."}
    }
  },
  "heaven":{
    defaultStrongs:"H8064",
    byStrongs:{
      "H8064":{lang:"Hebrew",word:"שָׁמַיִם",translit:"shamayim",gloss:"Heaven and sky — the same Hebrew word covers both the physical sky (Gen 1:8 — God calls the expanse 'shamayim') and the dwelling place of God (Ps 11:4 — 'YHWH's throne is in shamayim'), with no clean distinction between the two levels. The plural form (like elohim) may reflect the ancient three-tiered cosmology (lower atmosphere, outer space, God's throne-room), and 2 Corinthians 12:2 explicitly speaks of the 'third heaven.' The theological point is that God is not distant from his creation — his dwelling-realm (shamayim) is above and over the physical world, sustaining it, not removed from it."},
      "G3772":{lang:"Greek",word:"οὐρανός",translit:"ouranos",gloss:"Heaven, sky — the Greek counterpart to shamayim, used by the NT to cover the physical sky (birds of ouranos, Matt 6:26), the cosmic realm (stars falling from ouranos, Rev 6:13), and the dwelling place of God (the Father who is in ouranos, Matt 6:9; the kingdom of ouranos, Matt 5:3). Jesus consistently speaks of 'the kingdom of heaven' (basileia ton ouranon in Matthew) rather than 'kingdom of God' (Matthew's Jewish sensitivity to God's name) — but the two phrases refer to the same reality. The eschatological vision of Revelation 21:1 promises a new ouranos and new earth — the complete renewal of both God's dwelling and the human realm."}
    }
  },
  "earth":{
    defaultStrongs:"H776",
    byStrongs:{
      "H776":{lang:"Hebrew",word:"אֶרֶץ",translit:"eretz",gloss:"Earth, land, country, ground — a word whose referent shifts dramatically by context. In Genesis 1:1 eretz is the cosmic earth (the second half of the heavens-and-earth merism for all creation). In Genesis 1:2 it is the shapeless physical ground awaiting God's ordering. In Genesis 12:1 it is the specific land promised to Abraham. In Exodus and Deuteronomy it is the promised land of Canaan as the central covenant territory. In the Psalms it is often the whole earth as God's domain ('the earth is YHWH's, Ps 24:1). Distinguishing these senses is essential: a text about 'the land' may be covenantal-geographical, not cosmological."},
      "G1093":{lang:"Greek",word:"γῆ",translit:"ge",gloss:"Earth, land, soil, ground — carrying the same contextual range as Hebrew eretz. In the Beatitudes, Matthew 5:5 ('the meek will inherit the ge') echoes Psalm 37:11 ('the meek will inherit the land/eretz') and the promised-land theology of the OT, so ge there is both the specific inherited land and the renewed earth. In eschatological contexts, the new ge of Revelation 21:1 is the thoroughly renewed earth, God's final dwelling with humanity (Rev 21:3) — not a spiritual non-material realm but the transformed, glorified creation that is the ultimate destination of redemption."}
    }
  },
  "create":{
    defaultStrongs:"H1254",
    byStrongs:{
      "H1254":{lang:"Hebrew",word:"בָּרָא",translit:"bara",gloss:"To create — a verb whose subject in the entire Hebrew Bible is exclusively God, never a human craftsman, farmer, or artist. Humans make (asah, H6213), form (yatsar, H3335), and build (banah, H1129), but only God baras. This grammatical exclusivity is theologically foundational: the universe is not self-originating, self-organizing, or a product of human or semi-divine work — it is God's bara-act. The verb appears at decisive moments: Gen 1:1 (the cosmos), Gen 1:21 (the sea creatures), Gen 1:27 (humanity), Ps 51:10 (a clean heart — David asks God to apply the Genesis-1 creative power to his inner life), and Isa 65:17-18 (the new heavens and earth)."},
      "G2936":{lang:"Greek",word:"κτίζω",translit:"ktizo",gloss:"To create, found, establish — the NT's primary word for God's creative act, carrying the same exclusive divine sense as Hebrew bara. Ephesians 2:10 says 'we are his poiema (masterpiece/poem), created (ktismenoi) in Christ Jesus for good works' — the new creation in Christ uses ktizo language, connecting regeneration to the original creation-act. Colossians 1:16 states that 'all things were created (ektisthe) in him, through him, and for him' — Christ as the sphere, agent, and goal of all ktizo-work. Revelation 4:11 grounds worship itself in the fact that God ktiizo: 'You created (ektisas) all things, and by your will they exist and were created.'"}
    }
  },
  "fear":{
    defaultStrongs:"H3374",
    byStrongs:{
      "H3374":{lang:"Hebrew",word:"יִרְאָה",translit:"yirah",gloss:"Reverential awe, the fear that is the beginning of wisdom (Prov 9:10; Ps 111:10). Yirah of YHWH is not terror of a capricious deity but the appropriate response to encountering the holy — a reverence so deep that it governs all of life and produces the wisdom, obedience, and humility that constitute covenant fidelity. The 'fear of YHWH' is simultaneously the starting point (Prov 1:7 — 'beginning of knowledge') and the ongoing disposition of the wise person; it is not a stage to move past but the permanent posture of one who knows who God is."},
      "H6343":{lang:"Hebrew",word:"פַּחַד",translit:"pachad",gloss:"Dread, terror, the fear of a threatening enemy or of imminent catastrophe. Pachad is distinguished from yirah by its object and its effect: yirah produces wisdom and obedience; pachad produces flight, paralysis, or panic. Job 3:25 uses pachad for the dread of anticipated evil ('the thing I feared/dreaded has come upon me'). Pachad is often used for the fear of enemies in battle (Ps 14:5; 53:5) and for the dread of YHWH's judgment when it falls — it is the terror of judgment, not the reverence of worship."},
      "G5401":{lang:"Greek",word:"φόβος",translit:"phobos",gloss:"Fear, in the full range from reverential awe to sheer terror — the NT's primary fear-word, whose range maps onto both yirah and pachad depending on context. Philippians 2:12 ('work out your salvation with phobos and trembling') uses phobos in the yirah sense — reverent, life-governing awe that shapes ongoing covenant faithfulness. First John 4:18 ('perfect agape casts out phobos') addresses the terror-end of the range — the fear of punishment that torments. The same Greek word; the context determines which kind of fear is in view, and careful readers ask every time: is this the fear of reverence or the fear of punishment?"}
    }
  },
  "believe":{
    defaultStrongs:"G4100",
    byStrongs:{
      "H982":{lang:"Hebrew",word:"בָּטַח",translit:"batach",gloss:"To trust, rely on, be confident in — a leaning-weight kind of faith. Psalm 37:3 ('Trust/batach in YHWH and do good') uses the word for the kind of settled, active reliance that produces action; you do not merely feel confident in YHWH, you lean your weight on him. Batach frequently appears with prepositions: trust IN YHWH, trust IN chariots, trust IN riches — the object of batach determines whether the trust is wisdom or folly. Psalm 20:7 draws the line clearly: 'Some trust (batach) in chariots and some in horses, but we trust (zakar = call to mind, but batach is the disposition) the name of YHWH our God.'"},
      "H539":{lang:"Hebrew",word:"אָמַן",translit:"aman",gloss:"To be firm, reliable, confirmed, faithful — the root of 'amen' (so be it, truly). Aman as a verb means to consider something or someone firm and reliable enough to rest your weight on — which is why Genesis 15:6 says 'Abraham amened God' (usually translated 'believed') and it was counted as righteousness. This is not intellectual agreement; it is treating God as firm ground. The repeated 'amen' in the Psalms and synagogue worship is the congregation declaring that what has been said is firm and reliable — they are placing their weight on it."},
      "G4100":{lang:"Greek",word:"πιστεύω",translit:"pisteuo",gloss:"To believe, trust, entrust oneself to — the NT's central faith-verb, whose objects determine its full meaning. To pisteuo into (eis) someone is to cast yourself toward and into them in reliance — the most personal and committed form. To pisteuo that (hoti) something is true is propositional belief. John 3:16 uses pisteuo eis (believe into) the Son — it is not merely acknowledging facts about Jesus but a full personal entrusting. Present tense forms in John (ho pisteuon = the one who keeps believing) emphasize ongoing, continuous trust rather than a single past event, countering the idea that faith is merely a moment of initial decision."}
    }
  },
  "servant":{
    defaultStrongs:"H5650",
    byStrongs:{
      "H5650":{lang:"Hebrew",word:"עֶבֶד",translit:"eved",gloss:"Servant, slave, worshipper — a word that carries enormous dignity in the OT when used of YHWH's servants. Moses is YHWH's eved (Num 12:7-8 — the highest prophetic honor), the kings of Israel are YHWH's avadim, and 'the Servant of YHWH' in Isaiah's servant songs is the mysterious figure who suffers for the people's sins (Isa 42-53). To be YHWH's eved is not degradation but the highest possible identity — it is to be the one through whom YHWH works his purposes in the world. Israel's identity as YHWH's avadim (servants/worshippers) is what distinguished them from the nations: they serve YHWH alone, not Pharaoh or any other lord."},
      "G1401":{lang:"Greek",word:"δοῦλος",translit:"doulos",gloss:"Slave — the most unambiguous word for total ownership and belonging in the Roman world, stronger than servant (which could be free). When Paul opens his letters as 'Paul, doulos of Christ Jesus' (Rom 1:1; Phil 1:1) and Peter, James, and Jude do the same, they are not being self-deprecating — they are claiming the highest honor: total belonging to the Lord of the universe. The doulos has no personal agenda, no independent rights, no private life separate from the master's will — which is Paul's point about the transformed Christian life. The paradox is that being Christ's doulos is the only path to true freedom (John 8:34-36; Rom 6:15-23)."}
    }
  },
  "repent":{
    defaultStrongs:"H7725",
    byStrongs:{
      "H7725":{lang:"Hebrew",word:"שׁוּב",translit:"shuv",gloss:"To return, to turn back — the OT's dominant word for repentance, and it reveals the fundamentally relational understanding of repentance in Hebrew thought. To repent is not primarily to feel sorry, perform rituals, or make amends — it is to TURN BACK to YHWH from whom you have wandered. Hosea 6:1 ('Come, let us return/shuv to YHWH') and Lamentations 5:21 ('Turn us back to you, YHWH') make shuv an active movement of reorientation. The prophets call Israel to shuv from idols to YHWH; it is always a relational return, not merely a behavioral change."},
      "G3340":{lang:"Greek",word:"μετανοέω",translit:"metanoeo",gloss:"To change one's mind, to turn around in thinking and direction — metanoeo (meta = change + noeo = to think/perceive) is a cognitive and volitional transformation, not merely an emotional experience of remorse. John the Baptist's call (Matt 3:2) and Jesus' opening announcement (Mark 1:15) both begin with 'metanoeite' — repent, change your whole orientation. The NT distinguishes this from mere remorse (lype, grief): 2 Corinthians 7:9-10 says godly lype produces metanoia (the noun form), but worldly lype produces only death. Metanoeite is a life-reorientation, not just a feeling."},
      "G3341":{lang:"Greek",word:"μετάνοια",translit:"metanoia",gloss:"Repentance — the noun form of metanoeo, naming the state and fruit of having changed one's mind and direction. Matthew 3:8 calls for 'fruit worthy of metanoia' — showing that metanoia is not merely internal but productive of visible change. Acts 2:38, 3:19, and 17:30 present metanoia as the human side of the response to the gospel, paired with pistis (faith). Acts 20:21 encapsulates Paul's preaching as 'repentance (metanoia) toward God and faith (pistis) toward our Lord Jesus' — the two-sided human response to the good news of God's grace."}
    }
  },
  "forgive":{
    defaultStrongs:"H5545",
    byStrongs:{
      "H5545":{lang:"Hebrew",word:"סָלַח",translit:"salach",gloss:"To pardon, forgive — a verb whose subject in the OT is always YHWH, never a human being. No human salaches another person in the Hebrew Bible; salach is exclusively divine action. This is theologically significant: pardon at the deepest level is something only God can grant. Exodus 34:9 ('Pardon/salach our iniquity and our sin'), Numbers 14:19-20 (Moses intercedes and YHWH salaches), and Isaiah 55:7 ('he will freely pardon/salach') all present salach as the sovereign divine release of the accumulated debt of sin — something no human authority or religious system can substitute for."},
      "H3722":{lang:"Hebrew",word:"כָּפַר",translit:"kaphar",gloss:"To atone, to cover, to ransom — the priestly and sacrificial word that underlies the entire Levitical system. The Day of Atonement (Yom Kippur, from kaphar) is the annual act by which the high priest applies kaphar-blood to the mercy seat (kapporet, the 'atonement cover' on the ark), covering the accumulated sin of the year. Kaphar involves both covering sin from God's sight and ransoming the sinner from the penalty of death — Leviticus 17:11 ties kaphar to the blood-as-life principle. The NT presents Christ's death as the final kaphar: 1 John 2:2 (hilasmos, propitiation/atonement) and Romans 3:25 (hilasterion, the mercy seat/atonement) draw directly on kaphar imagery."},
      "G863":{lang:"Greek",word:"ἀφίημι",translit:"aphiemi",gloss:"To send away, release, let go, forgive — the most common NT forgiveness verb, carrying the image of a debt or obligation being sent away and released. Matthew 6:12 ('Forgive us our debts as we also have forgiven our debtors') uses aphiemi for both divine and human forgiveness: the same action of releasing, sending away what is owed. James 5:15 says the prayer of faith will 'save' the sick and 'the Lord will forgive (aphiemi) him' — the forgiveness is a release, a freeing from the burden of accumulated transgression."},
      "G5483":{lang:"Greek",word:"χαρίζομαι",translit:"charizomai",gloss:"To grace-gift, to graciously give or forgive — a verb built on charis (grace), used when forgiveness is highlighted as pure gift rather than earned pardon. Ephesians 4:32 ('Be kind to one another, tenderhearted, forgiving one another as God in Christ charizomai you') and Colossians 3:13 use charizomai for the grace-character of forgiveness: it is not a transaction or a legal release alone but an act of gracious generosity that mirrors God's own charis-character. Charizomai connects forgiveness to the very nature of grace, showing that the forgiver acts out of the same free-gift quality as God."}
    }
  },
  "wisdom":{
    defaultStrongs:"H2451",
    byStrongs:{
      "H2451":{lang:"Hebrew",word:"חָכְמָה",translit:"chokmah",gloss:"Skill, practical wisdom, insight into the right way of living — not primarily abstract or theoretical knowledge but the capacity to navigate life well according to God's order. Proverbs 8 presents chokmah as a woman calling in the streets, present at creation before God made anything ('I was beside him, like a master craftsman,' Prov 8:30), offering herself to all who will listen. This personified Wisdom of Proverbs 8 is the direct background for John's logos theology and Paul's identification of Christ as 'the chokmah of God' (1 Cor 1:24) — the living embodiment of the practical intelligence by which God made and orders the world."},
      "G4678":{lang:"Greek",word:"σοφία",translit:"sophia",gloss:"Wisdom — the Greek word used to translate chokmah throughout the LXX, and taken up by the NT to identify Christ as the personal Wisdom of God (1 Cor 1:24, 30). James 3:17 describes the sophia that comes from above ('pure, then peaceable, gentle, open to reason, full of mercy and good fruits') in contrast to earthly pseudo-sophia that is 'earthly, unspiritual, demonic.' Paul's theology in 1 Corinthians 1-2 consistently opposes the sophia of the world (Greek philosophical rhetoric and argument) to the sophia of God revealed in the cross — foolish to the world but the power and wisdom of God."}
    }
  },
  "eternal":{
    defaultStrongs:"H5769",
    byStrongs:{
      "H5769":{lang:"Hebrew",word:"עוֹלָם",translit:"olam",gloss:"Age, long duration, perpetuity — a word that refers to the distant past or future but does not inherently mean infinite in the strict philosophical sense. 'Everlasting' covenants (berit olam) may mean age-lasting, duration-without-specified-end, rather than necessarily infinite eternity. The difference matters: the Mosaic covenant was olam but was superseded (Jer 31:31-32 — a new covenant because the old was broken); the Abrahamic and Davidic covenants are olam in the unconditional sense. Context and the nature of the covenant being discussed determine whether olam means 'for an age' or 'forever without end.'"},
      "G165":{lang:"Greek",word:"αἰών",translit:"aion",gloss:"Age, eon, era — the NT's word for a defined period of time ('this age' vs 'the age to come') but also stretched to mean 'forever' when combined in phrases like 'unto the ages of the ages' (eis tous aionas ton aionon, the strongest NT expression for everlasting, used in Revelation for God's eternal reign). The distinction between 'this aion' (the present evil age, Gal 1:4) and 'the coming aion' (the age of resurrection and kingdom) is one of Paul's and the NT's foundational theological frameworks — salvation is passing from one aion to another, or rather beginning to live in the coming aion while still in this one."},
      "G166":{lang:"Greek",word:"αἰώνιος",translit:"aionios",gloss:"Belonging to the age, age-characterized — the adjective from aion, used for 'eternal life' (zoe aionios) throughout John's Gospel and the NT. Zoe aionios is not primarily 'life that goes on forever' (though it does) but 'life that belongs to and characterizes the coming age' — the resurrection life of God's new creation, already available in Christ. John 17:3 defines it relationally: 'This is eternal/aionios life — that they know you, the only true God, and Jesus Christ whom you have sent.' The emphasis is on quality and source (the life of God's new age) rather than quantity (endless duration), though both are implied."}
    }
  },
  "church":{
    defaultStrongs:"G1577",
    byStrongs:{
      "G1577":{lang:"Greek",word:"ἐκκλησία",translit:"ekklesia",gloss:"Assembly, gathering, called-out congregation — the NT's word for the Christian community, derived from ek (out) + kaleo (to call), meaning those called together as a gathered body. Crucially, ekklesia was NOT a religious word in Greek culture — it was the civic assembly of free citizens called out from their homes to conduct public business. Acts 19:32 uses ekklesia for a pagan mob assembly in Ephesus. This means the church is not a 'spiritual society' set apart from civic life but a public gathering with public claims. The ekklesia never refers to a building in the NT — it is always the people gathered, whether house-sized (Rom 16:5) or city-wide (1 Cor 1:2) or universal (Eph 1:22)."}
    }
  },
  "baptism":{
    defaultStrongs:"G908",
    byStrongs:{
      "G908":{lang:"Greek",word:"βάπτισμα",translit:"baptisma",gloss:"Immersion, dipping, washing — the NT practice of water baptism as the initiatory rite into the covenant community and as a sign of identification with Christ's death and resurrection. Romans 6:3-4 is the theological heart: 'Don't you know that as many as were baptized (ebaptisthemen) into Christ Jesus were baptized into his death? We were therefore buried with him through baptism into death, in order that, just as Christ was raised from the dead... so we too may walk in newness of life.' Baptism is not merely a public profession but a symbolic dying-and-rising that enacts the believer's union with Christ's own death and resurrection — an enacted gospel."}
    }
  },
  "resurrection":{
    defaultStrongs:"G386",
    byStrongs:{
      "G386":{lang:"Greek",word:"ἀνάστασις",translit:"anastasis",gloss:"Standing up again, rising from the dead — not resuscitation (returning to the same mortal life that will die again) but transformation into an imperishable, glorified bodily existence. First Corinthians 15 is the great treatise on anastasis: if there is no resurrection, the Christian faith is empty (15:14), Christ is not raised (15:17), and believers are of all people most pitiful (15:19). But Christ IS raised as the 'firstfruits' (aparche) of the anastasis of all (15:20-23) — his resurrection is the down-payment and guarantee of the general resurrection. The anastasis body is not immaterial: it is a soma pneumatikon (spiritual body, 15:44) — a body governed and empowered by the Spirit, imperishable, glorious, powerful."}
    }
  },
  "gospel":{
    defaultStrongs:"G2098",
    byStrongs:{
      "G2098":{lang:"Greek",word:"εὐαγγέλιον",translit:"euangelion",gloss:"Good news, royal proclamation — a word whose political background is crucial for understanding what the NT authors are doing. In the Roman imperial world, euangelion was the formal announcement of a new emperor's accession, a military victory, or a birth in the imperial family — a public proclamation of new governance with real political implications. When Paul announces the euangelion of Jesus Christ (Mark 1:1 — 'the beginning of the euangelion of Jesus Christ, the Son of God'), he is making an imperial counter-proclamation: there is a new King, a new Lord, a new world order — not Caesar's son, but God's Son, and his kingdom overturns all others. The euangelion is not merely personal salvation information; it is the announcement that Jesus is Lord of everything."}
    }
  },
  "witness":{
    defaultStrongs:"G3141",
    byStrongs:{
      "H5707":{lang:"Hebrew",word:"עֵד",translit:"ed",gloss:"Witness, one who testifies to what they have seen or heard — the ed in the OT legal system plays a decisive role: Deuteronomy 19:15 requires two or three edim (witnesses) for a charge to stand, preventing false accusation. The word extends beyond the courtroom: Israel is YHWH's ed (Isa 43:10 — 'You are my witnesses') — the people who have seen God's saving acts and are called to testify to the nations. The covenant itself is witnessed (Josh 24:22 — 'You are witnesses against yourselves') — the covenant-making ceremony has the people as self-witnesses to their own commitments."},
      "G3141":{lang:"Greek",word:"μαρτυρία",translit:"martyria",gloss:"Testimony, witness, evidence — and the word from which 'martyr' comes, because those who gave their martyria about Christ often died for it. In John's Gospel, martyria is central: John the Baptist came to give martyria about the light (John 1:7-8), the works Jesus does give martyria (John 5:36), the Spirit gives martyria (John 15:26), and the disciples are to give martyria (John 15:27). The martyria of Jesus is the content of Revelation (Rev 1:2, 9; 12:17) — it is not just 'testimony about Jesus' but 'the witness that Jesus himself bore,' which his followers then carry."},
      "G3144":{lang:"Greek",word:"μάρτυς",translit:"martys",gloss:"Witness — the person who bears testimony, and the root of the English 'martyr.' Acts 1:8 ('you will be my martyres in Jerusalem, in all Judea and Samaria, and to the ends of the earth') commissions the disciples as witnesses to everything Jesus did and said, especially the resurrection (Acts 1:22 — the new apostle must be a martys of the resurrection). The transition from martys (witness) to martyr (one who dies for their testimony) happened naturally as bearing witness to Christ's lordship increasingly resulted in death under Roman persecution — Stephen (Acts 7) is the first martyred martys."}
    }
  },
  "amen":{
    defaultStrongs:"H543",
    byStrongs:{
      "H543":{lang:"Hebrew",word:"אָמֵן",translit:"amen",gloss:"Truly, so be it, firm and reliable — from the root aman (to be firm, faithful, reliable). Placing 'amen' at the END of a statement or prayer is the ancient Jewish response of the congregation: 'This is true and reliable, we stake ourselves on it' (Deut 27:15-26 — the Levites pronounce curses and the people respond 'Amen!'). What Jesus did was unique and unprecedented in Jewish practice: he placed 'Amen' (or 'Amen, Amen' in John) BEFORE his own statements — 'Truly I say to you' (Matt 5:18, etc.). No rabbi spoke this way; it claimed that his words carried their own authority, the same authority as YHWH's own word."},
      "G281":{lang:"Greek",word:"ἀμήν",translit:"amen",gloss:"The same Semitic word transliterated into Greek, retained untranslated in the NT because no Greek word captured its full force. In John's Gospel, Jesus uses a distinctive doubled form: 'Amēn amēn legō hymin' ('Truly, truly I say to you') — 26 times, only in John, as a unique authenticating formula unlike anything in Jewish or Greek literature. The double amen (never found in OT or rabbinic usage before a statement) is John's consistent marker of authoritative divine teaching: what follows is not interpretation or tradition — it is the direct, self-authenticating word of the one who IS the truth."}
    }
  },
  "holy":{
    defaultStrongs:"H6944",
    byStrongs:{
      "H6944":{lang:"Hebrew",word:"קֹדֶשׁ",translit:"qodesh",gloss:"Holiness, set-apartness, the quality of belonging exclusively to God and being categorically different from the ordinary. Qodesh is the fundamental OT category for understanding God's nature and what it means to relate to him — YHWH is qadosh (holy) in a way that is utterly unlike any creature (Isa 6:3 — 'Holy, holy, holy is YHWH of armies; the whole earth is full of his glory'), and this holiness is simultaneously terrifying (Ex 19:12 — no one may touch the mountain) and the goal of Israel's existence ('be holy because I am holy,' Lev 19:2). The 'holy of holies' (qodesh qodashim) is the Hebrew superlative: the most holy place, the innermost sanctuary where only the high priest enters once a year with blood (Heb 9:3)."},
      "G40":{lang:"Greek",word:"ἅγιος",translit:"hagios",gloss:"Holy, set apart, saint — the NT's primary word for both divine holiness and the identity of believers as the holy people of God. Every letter of Paul opens by addressing the letter to 'the hagioi (saints/holy ones) in [city]' — hagios is not an honor title for the exceptionally devout but the default identity of every believer as one who has been set apart in Christ. The Holy Spirit (pneuma hagion) is the one who actualizes in believers the holiness that belongs to God — 1 Peter 1:15-16 applies the Levitical call ('be holy because I am holy') to the NT community, grounding Christian ethics in the ontology of divine holiness shared through the Spirit."}
    }
  },
  "priest":{
    defaultStrongs:"H3548",
    byStrongs:{
      "H3548":{lang:"Hebrew",word:"כֹּהֵן",translit:"kohen",gloss:"Priest, the one who mediates between God and the people — offering sacrifice, making atonement, pronouncing blessing, and teaching Torah. The kohen stands in the gap between the holy God and the sinful people, performing the rituals that maintain the covenant relationship and repair it when broken. The Aaronic priesthood is established in Exodus 28-29 and Leviticus, with the kohen gadol (high priest) as the one who alone may enter the Holy of Holies on Yom Kippur. Hebrews 4:14-16 presents Jesus as the great kohen gadol who has passed through the heavens, who is touched by our weaknesses, and at whose throne we may approach with confidence."},
      "G749":{lang:"Greek",word:"ἀρχιερεύς",translit:"archiereus",gloss:"High priest — the NT's word for the chief priest of the Jerusalem temple and, more importantly, the title used for Jesus throughout Hebrews. Hebrews 7:26-27 makes the definitive contrast: 'Such a high priest (archiereus) truly befits us — holy, innocent, unstained, separated from sinners, exalted above the heavens — who has no need, like those high priests, to offer sacrifices daily... He did this once for all when he offered up himself.' Jesus is the archiereus who performs the once-for-all atoning sacrifice by offering himself, thereby ending the repetitive Levitical system and making permanent access to God available to all who come through him."}
    }
  },
  "sacrifice":{
    defaultStrongs:"H2077",
    byStrongs:{
      "H2077":{lang:"Hebrew",word:"זֶבַח",translit:"zebach",gloss:"Sacrifice involving blood-slaughter, distinguished from minchah (grain/meal offering, bloodless). The zebach is the basic OT blood-sacrifice in which an animal is killed, its blood manipulated (poured out, sprinkled, applied to the altar), and its body wholly or partly consumed. The theology of zebach rests on Leviticus 17:11's equation: nephesh (life) is in the dam (blood), and God has given the blood on the altar to make kapparah (atonement) for the nephesh — life covers life. The whole system points forward to Christ's haima (blood) as the final zebach."},
      "H5930":{lang:"Hebrew",word:"עֹלָה",translit:"olah",gloss:"Burnt offering, the sacrifice wholly consumed by fire on the altar — the most complete offering of dedication. The olah ('that which goes up' — referring to the smoke ascending) gives the entire animal to God with nothing returned to the worshipper or priest. It represents total consecration: the entire life offered to YHWH with nothing held back. Romans 12:1 ('present your bodies as a living sacrifice, holy and acceptable to God') echoes olah language — the NT believer's body-life as the living olah, the total offering of the whole self."},
      "G2378":{lang:"Greek",word:"θυσία",translit:"thusia",gloss:"Offering, sacrifice — the NT's comprehensive word for both the OT system of sacrifices and the final sacrifice of Christ. Ephesians 5:2 makes the connection explicit: 'Christ loved us and gave himself up for us, a fragrant offering (prosphora) and sacrifice (thusia) to God' — deliberately combining OT sacrificial language (the 'fragrant aroma' of Lev 1:9 describing YHWH's acceptance of the whole burnt offering) with the once-for-all death of Christ. Hebrews 9:26 declares that Christ 'appeared to put away sin by the sacrifice (thusia) of himself' — the entire OT thusia system finds its fulfillment and conclusion in the one definitive thusia of the Son."}
    }
  }
};
