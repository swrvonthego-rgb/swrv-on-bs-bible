/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SOURCE_META = {
  tanakh: { label: "JPS Tanakh 1917", color: "#c9a84c", desc: "The traditional Hebrew Bible text in English." },
  enoch: { label: "Book of Enoch", color: "#8b6fc9", desc: "Jay Winter translation. Essential Second Temple context." },
  dss: { label: "Dead Sea Scrolls", color: "#7aaa8a", desc: "García Martínez translation. Fragments from Qumran." },
  amplified: { label: "Amplified Bible", color: "#d4845a", desc: "Expanded word meanings for deeper nuance." },
  chronological: { label: "Chronological Study", color: "#5a9ed4", desc: "NKJV text arranged by historical order." },
  jewish_nt: { label: "Jewish Annotated NT", color: "#d45a7a", desc: "New Testament through a Jewish lens." },
  lxx: { label: "Septuagint (LXX)", color: "#b09a60", desc: "Brenton 1851. The Greek translation used by the Apostles." },
  josephus: { label: "Josephus", color: "#a0c878", desc: "Complete works of the 1st-century historian." },
  zondervan: { label: "Zondervan Dictionary", color: "#b87878", desc: "Illustrated historical and cultural context." }
};

export const TIMELINE = [
  { id: "creation", label: "Creation & Antediluvian", period: "Pre-2500 BC", color: "#8b6fc9", books: ["GEN.1", "GEN.2", "GEN.3", "GEN.4", "GEN.5", "GEN.6", "GEN.7", "GEN.8", "GEN.9", "GEN.10", "GEN.11"], sources: ["enoch", "josephus"] },
  { id: "patriarchs", label: "Era of Patriarchs", period: "2100 - 1800 BC", color: "#c9a84c", books: ["GEN.12", "GEN.14", "GEN.15", "GEN.22", "JOB.1", "JOB.38", "JOB.40", "JOB.41"], sources: ["tanakh"] },
  { id: "exodus", label: "Exodus & Conquest", period: "1450 - 1350 BC", color: "#d4845a", books: ["EXO.3", "EXO.12", "EXO.20", "EXO.24", "LEV.16", "NUM.22", "DEU.6", "DEU.32", "DEU.33", "JOS.1", "JOS.5"], sources: ["tanakh", "lxx", "josephus"] },
  { id: "monarchy", label: "United Monarchy", period: "1050 - 930 BC", color: "#5a9ed4", books: ["1SA.16", "1SA.28", "2SA.7", "2SA.22", "1KI.3", "1KI.8", "PSA.2", "PSA.8", "PSA.19", "PSA.22", "PSA.24", "PSA.45", "PSA.68", "PSA.82", "PSA.89", "PSA.104", "PSA.110"], sources: ["tanakh", "dss"] },
  { id: "exile", label: "Prophets & Exile", period: "740 - 530 BC", color: "#b87878", books: ["ISA.6", "ISA.7", "ISA.9", "ISA.11", "ISA.14", "ISA.53", "ISA.61", "JER.31", "EZE.1", "EZE.10", "EZE.28", "DAN.2", "DAN.7", "DAN.9", "DAN.10", "DAN.12"], sources: ["tanakh", "dss", "lxx"] },
  { id: "second_temple", label: "Second Temple Period", period: "515 BC - 70 AD", color: "#7aaa8a", books: ["EZR.1", "NEH.1", "MAL.3", "1MA.1"], sources: ["dss", "josephus"] },
  { id: "apostolic", label: "Apostolic Age", period: "30 - 100 AD", color: "#d45a7a", books: ["MAT.1", "MAT.5", "MAT.6", "MAT.7", "MAT.24", "JHN.1", "ACT.2", "ROM.1", "ROM.5", "ROM.8", "HEB.1", "HEB.5", "HEB.7", "HEB.11", "REV.1", "REV.4", "REV.12", "REV.20", "REV.22"], sources: ["jewish_nt"] },
  { id: "destruction", label: "Post-70 AD", period: "70 AD - Present", color: "#a0c878", books: [], sources: ["josephus"] }
];

export const CROSS_REFS = {
  "GEN.1": [
    { source: "lxx", ref: "Genesis 1:1-3", note: "The Greek 'Logos' concept in the Septuagint pre-dates the NT usage. It uses 'egeneto' (became/came to be) for creation." },
    { source: "enoch", ref: "Enoch 69:16-25", note: "Describes the 'Oath' (Akae) by which the heavens were suspended and the earth founded." },
    { source: "josephus", ref: "Antiquities 1.1.1", note: "Josephus notes that Moses began with the creation of the world to show God's providence over all." },
    { source: "zondervan", ref: "Creation", note: "Ancient Near Eastern parallels (Enuma Elish) show Israel's unique monotheistic polemic against chaos gods." },
    { source: "dss", ref: "4Q422 (Genesis Paraphrase)", note: "A retelling that emphasizes God's wisdom and the order of the cosmos." }
  ],
  "GEN.2": [
    { source: "lxx", ref: "Genesis 2:7", note: "Uses 'pnoe' (breath/blast) for the breath of life." },
    { source: "josephus", ref: "Antiquities 1.1.2", note: "Explains the name 'Adam' as meaning 'red' because he was formed from red earth." },
    { source: "dss", ref: "4QGen-h", note: "One of the oldest fragments, preserving the Sabbath institution in Gen 2:1-3." },
    { source: "zondervan", ref: "Eden", note: "The garden as a divine sanctuary or temple-prototype in ANE thought." }
  ],
  "GEN.3": [
    { source: "enoch", ref: "Enoch 32:3-6", note: "Enoch visits the Garden of Righteousness and sees the Tree of Knowledge, described as a beautiful tamarind." },
    { source: "josephus", ref: "Antiquities 1.1.4", note: "Argues that before the fall, all living creatures had a common language and the serpent spoke with a human voice." },
    { source: "dss", ref: "4Q423 (Sapiential Work)", note: "Uses the imagery of the 'thorns and thistles' to describe the struggle of the righteous in a fallen world." },
    { source: "zondervan", ref: "The Serpent", note: "ANE motifs of serpents as guardians of wisdom or chaos-monsters (Leviathan/Rahab)." }
  ],
  "GEN.4": [
    { source: "josephus", ref: "Antiquities 1.2.1", note: "Describes Cain as a man of wicked temper who first invented weights and measures to deceive." },
    { source: "dss", ref: "4Q252 (Commentary on Genesis)", note: "Discusses the genealogy of Cain and the 'sevenfold' vengeance." },
    { source: "enoch", ref: "Enoch 22:7", note: "The spirit of Abel makes suit in the underworld against Cain until his seed is destroyed." }
  ],
  "GEN.5": [
    { source: "enoch", ref: "Enoch 1:1-9", note: "The 'Seventh from Adam' prophecy regarding the final judgment." },
    { source: "josephus", ref: "Antiquities 1.3.1", note: "Claims the descendants of Seth invented the science of astronomy and recorded it on two pillars." },
    { source: "dss", ref: "4Q201 (En-a)", note: "Fragments of the Aramaic Book of Enoch containing the antediluvian genealogies." }
  ],
  "GEN.6": [
    { source: "enoch", ref: "Enoch 6-11", note: "The detailed account of the 200 Watchers led by Semyaza who descended to Mount Hermon." },
    { source: "dss", ref: "1Q20 (Genesis Apocryphon)", note: "A detailed retelling of the birth of Noah and Lamech's suspicion that the child was fathered by a Watcher." },
    { source: "josephus", ref: "Antiquities 1.3.1", note: "Confirms the tradition of 'angels of God' cohabiting with women and producing a race of giants." },
    { source: "zondervan", ref: "Nephilim", note: "The 'fallen ones' or 'mighty ones' (Gibborim) in the context of ANE semi-divine hero myths." },
    { source: "lxx", ref: "Genesis 6:2", note: "Many manuscripts read 'Angels of God' instead of 'Sons of God'." },
    { source: "amplified", ref: "Genesis 6:4", note: "Emphasizes that the Nephilim were on the earth 'in those days—and also afterward'." }
  ],
  "GEN.7": [
    { source: "enoch", ref: "Enoch 10:1-3", note: "The Most High sends Uriel to Noah to warn him of the coming deluge." },
    { source: "josephus", ref: "Antiquities 1.3.2", note: "Notes that the flood began in the second month, called Dius by the Macedonians." },
    { source: "dss", ref: "4Q252", note: "A chronological commentary on the flood, calculating the exact days of the rising and falling waters." }
  ],
  "GEN.8": [
    { source: "josephus", ref: "Antiquities 1.3.5", note: "Claims the ark rested on a mountain in Armenia called 'The Place of Descent'." },
    { source: "zondervan", ref: "Ararat", note: "The Urartu region in modern-day Turkey/Armenia, consistent with historical geography." },
    { source: "lxx", ref: "Genesis 8:7", note: "The raven 'did not return' until the water was dried up, unlike some MT interpretations." }
  ],
  "GEN.9": [
    { source: "tanakh", ref: "Genesis 9:13", note: "I have set My bow in the cloud, and it shall be for a token of a covenant between Me and the earth." },
    { source: "dss", ref: "4Q252", note: "Discusses the curse of Canaan and the blessing of Shem and Japheth." },
    { source: "josephus", ref: "Antiquities 1.4.1", note: "Explains the Noahic laws as the foundation for human society after the flood." }
  ],
  "GEN.10": [
    { source: "josephus", ref: "Antiquities 1.6.1-4", note: "A massive historical breakdown of the Table of Nations, identifying Gomer as the Galatians, Magog as the Scythians, etc." },
    { source: "zondervan", ref: "Table of Nations", note: "The ethnography of the 70 nations as understood in the Bronze/Iron Age Near East." },
    { source: "dss", ref: "4QGen-h", note: "Preserves the lineage of the sons of Noah." }
  ],
  "GEN.11": [
    { source: "josephus", ref: "Antiquities 1.4.1", note: "Identifies Nimrod as the one who incited the people to build the tower as a rebellion against God." },
    { source: "dss", ref: "4Q559 (Biblical Chronology)", note: "Calculates the years from the flood to the division of languages." },
    { source: "zondervan", ref: "Ziggurat", note: "The historical context of Mesopotamian temple-towers as 'gateways to the gods'." }
  ],
  "PSA.2": [
    { source: "dss", ref: "4Q174 (Florilegium)", note: "Applies the 'Why do the nations rage' to the end-times war against the community of the elect." },
    { source: "jewish_nt", ref: "Acts 4:25-28", note: "The early church applies this Psalm to the conspiracy of Herod and Pilate against Jesus." },
    { source: "tanakh", ref: "Psalm 2:7", note: "YHWH said to me: 'You are My son; this day have I begotten you'." },
    { source: "josephus", ref: "Antiquities 7.12.3", note: "Refers to David's composition of songs and hymns in various meters." },
    { source: "lxx", ref: "Psalm 2:12", note: "Translates 'Kiss the son' as 'Lay hold of instruction' (draxasthe paideias)." }
  ],
  "PSA.8": [
    { source: "jewish_nt", ref: "Hebrews 2:6-9", note: "Applies the 'little lower than the angels' specifically to the incarnation of Jesus." },
    { source: "lxx", ref: "Psalm 8:5", note: "Uses 'angelous' (angels) for the Hebrew 'Elohim' (gods/God)." },
    { source: "dss", ref: "11Q5 (Great Psalms Scroll)", note: "Preserves this Psalm in a collection used for liturgical worship at Qumran." }
  ],
  "PSA.22": [
    { source: "jewish_nt", ref: "Matthew 27:46", note: "Jesus quotes the opening line on the cross: 'Eli, Eli, lama sabachthani?'" },
    { source: "dss", ref: "4QPs-f", note: "Contains the controversial reading 'they pierced' (ka'aru) instead of 'like a lion' (ka'ari) in verse 16." },
    { source: "lxx", ref: "Psalm 21:17", note: "The Greek text explicitly says 'they pierced my hands and my feet'." },
    { source: "tanakh", ref: "Psalm 22:1", note: "My God, my God, why hast Thou forsaken me? Why art Thou so far from helping me?" },
    { source: "zondervan", ref: "Crucifixion", note: "The historical accuracy of the physical descriptions of suffering in this Psalm." }
  ],
  "PSA.45": [
    { source: "jewish_nt", ref: "Hebrews 1:8", note: "Quotes verse 6 ('Your throne, O God, is forever') as evidence of the Son's deity." },
    { source: "dss", ref: "4Q171 (Pesher Psalms)", note: "Interprets the 'King' as the messianic figure who will judge the wicked." },
    { source: "lxx", ref: "Psalm 44:7", note: "The Greek address 'O Theos' (O God) is used for the King." },
    { source: "tanakh", ref: "Psalm 45:7", note: "Therefore God, thy God, hath anointed thee with the oil of gladness above thy fellows." }
  ],
  "PSA.82": [
    { source: "dss", ref: "11Q13 (Melchizedek)", note: "Interprets the 'Elohim' in the divine council as Melchizedek leading the heavenly host against Belial." },
    { source: "jewish_nt", ref: "John 10:34", note: "Jesus quotes 'I said, you are gods' to defend his claim to be the Son of God." },
    { source: "tanakh", ref: "Psalm 82:1", note: "God standeth in the congregation of the mighty; He judgeth among the gods." },
    { source: "enoch", ref: "Enoch 15:1-12", note: "The judgment of the Watchers who were intended to be 'holy ones' but became corrupt." },
    { source: "zondervan", ref: "Divine Council", note: "The 'Elohim' as celestial beings (bene ha-elohim) in the Ugaritic and Israelite worldview." }
  ],
  "PSA.89": [
    { source: "dss", ref: "4Q174", note: "Links the 'steadfast love' of David to the coming of the Branch of David." },
    { source: "tanakh", ref: "Psalm 89:7", note: "A God greatly to be feared in the council of the holy ones." },
    { source: "lxx", ref: "Psalm 88:7", note: "Uses 'en boule hagion' (in the council of the saints) for the divine assembly." },
    { source: "jewish_nt", ref: "Revelation 1:5", note: "Identifies Jesus as the 'faithful witness' and 'firstborn from the dead', titles from Psalm 89." }
  ],
  "PSA.110": [
    { source: "jewish_nt", ref: "Hebrews 7", note: "The primary text for the 'Order of Melchizedek' priesthood, superior to the Levites." },
    { source: "dss", ref: "11Q13", note: "Melchizedek as the heavenly high priest who executes the judgment of Psalm 110." },
    { source: "tanakh", ref: "Psalm 110:1", note: "YHWH saith unto my lord: 'Sit thou at My right hand, until I make thine enemies thy footstool'." },
    { source: "josephus", ref: "Antiquities 1.10.2", note: "Describes Melchizedek as the 'Righteous King' of Jerusalem and priest of God." },
    { source: "lxx", ref: "Psalm 109:3", note: "Contains the phrase 'from the womb before the morning star I have begotten thee'." }
  ],
  "ISA.7": [
    { source: "lxx", ref: "Isaiah 7:14", note: "Uses 'parthenos' (virgin) instead of the Hebrew 'almah' (young woman), a crucial shift for NT theology." },
    { source: "jewish_nt", ref: "Matthew 1:23", note: "The NT author relies specifically on the LXX translation to argue for the virgin birth of Jesus." },
    { source: "dss", ref: "1QIsa-a", note: "The Great Isaiah Scroll confirms the Hebrew text 'almah' was the standard reading in 100 BC." },
    { source: "zondervan", ref: "Immanuel", note: "The historical context of the Syro-Ephraimite war and the sign given to King Ahaz." }
  ],
  "ISA.9": [
    { source: "tanakh", ref: "Isaiah 9:5", note: "For a child is born unto us... and his name is called Pele-joez-el-gibbor-Abi-ad-sar-shalom." },
    { source: "lxx", ref: "Isaiah 9:6", note: "Translates the titles as 'Messenger of Great Counsel' (Megales boules angelos)." },
    { source: "dss", ref: "4Q175", note: "Includes this passage in a list of messianic 'Testimonia' regarding the coming King." },
    { source: "jewish_nt", ref: "Matthew 4:14-16", note: "Applies the 'light in Galilee' prophecy to the beginning of Jesus' ministry." }
  ],
  "ISA.11": [
    { source: "dss", ref: "4Q161 (Pesher Isaiah)", note: "Interprets the 'Shoot of Jesse' as the Messiah who will lead the army of the elect." },
    { source: "jewish_nt", ref: "Romans 15:12", note: "Paul quotes 'The Root of Jesse' as the hope for the Gentiles." },
    { source: "tanakh", ref: "Isaiah 11:1", note: "And there shall come forth a shoot out of the stock of Jesse, and a twig shall grow forth out of his roots." },
    { source: "lxx", ref: "Isaiah 11:2", note: "Lists the seven-fold Spirit of God: wisdom, understanding, counsel, might, knowledge, godliness, and fear of God." }
  ],
  "ISA.14": [
    { source: "lxx", ref: "Isaiah 14:12", note: "Uses 'Heosphoros' (Light-bringer) for the Hebrew 'Helel' (Shining One)." },
    { source: "enoch", ref: "Enoch 86", note: "The fall of the stars (angels) from heaven, mirroring the fall of the Day Star." },
    { source: "zondervan", ref: "King of Babylon", note: "The taunt-song uses ANE mythological language (Mount of Assembly) to describe the pride of the tyrant." }
  ],
  "ISA.53": [
    { source: "dss", ref: "1QIsa-a", note: "The Great Isaiah Scroll confirms the 'Suffering Servant' text was virtually identical to the Masoretic text in 100 BC." },
    { source: "jewish_nt", ref: "Acts 8:32-35", note: "Philip uses this passage to preach Jesus to the Ethiopian eunuch." },
    { source: "lxx", ref: "Isaiah 53:7-8", note: "The Greek text used by the author of Acts emphasizes the 'humiliation' and 'judgment' of the servant." },
    { source: "zondervan", ref: "Suffering Servant", note: "Debate over whether the servant is the nation of Israel or an individual messianic figure." },
    { source: "josephus", ref: "Antiquities 10.11.7", note: "Mentions Isaiah's prophecies regarding the future of the nation." }
  ],
  "ISA.61": [
    { source: "jewish_nt", ref: "Luke 4:18-21", note: "Jesus reads this passage in the Nazareth synagogue and declares: 'Today this scripture is fulfilled in your hearing'." },
    { source: "dss", ref: "11Q13", note: "Directly links the 'Year of YHWH's favor' to the coming of Melchizedek as the heavenly redeemer." },
    { source: "tanakh", ref: "Isaiah 61:1", note: "The spirit of the Lord GOD is upon me; because YHWH hath anointed me to bring good tidings unto the humble." },
    { source: "lxx", ref: "Isaiah 61:1", note: "Uses 'euangelisasthai' (to preach the gospel) for bringing good tidings." }
  ],
  "EZE.1": [
    { source: "dss", ref: "4Q405", note: "The 'Songs of the Sabbath Sacrifice' draw heavily on Ezekiel's chariot (Merkabah) imagery." },
    { source: "josephus", ref: "Antiquities 10.5.1", note: "Notes that Ezekiel wrote two books about the destruction of Jerusalem." },
    { source: "zondervan", ref: "Merkabah", note: "The mobile throne of God, signifying His presence is not limited to the Temple in Jerusalem." }
  ],
  "EZE.28": [
    { source: "lxx", ref: "Ezekiel 28:13-16", note: "Describes the 'anointed cherub' in the Garden of God, covered in precious stones." },
    { source: "enoch", ref: "Enoch 24-25", note: "Enoch sees the mountain of God and the tree of life, similar to the 'holy mountain' in Ezekiel." },
    { source: "zondervan", ref: "King of Tyre", note: "The oracle uses the 'Fall of the Primal Man' motif to judge the pride of the Phoenician king." }
  ],
  "DAN.2": [
    { source: "josephus", ref: "Antiquities 10.10.4", note: "Josephus explains the four kingdoms as Babylon, Medo-Persia, Greece, and Rome, but stops before explaining the 'stone'." },
    { source: "dss", ref: "4Q243 (Pseudo-Daniel)", note: "Fragments of a Daniel-like figure interpreting dreams in the Persian court." },
    { source: "tanakh", ref: "Daniel 2:44", note: "And in the days of those kings shall the God of heaven set up a kingdom which shall never be destroyed." },
    { source: "zondervan", ref: "Nebuchadnezzar", note: "The historical reality of the Neo-Babylonian empire and its dream-interpretation culture." }
  ],
  "DAN.7": [
    { source: "enoch", ref: "Enoch 46-48", note: "The 'Son of Man' (Son of Woman) and 'Ancient of Days' imagery is expanded into a full heavenly biography." },
    { source: "jewish_nt", ref: "Mark 14:62", note: "Jesus' claim to be the Son of Man coming on the clouds is a direct Daniel 7:13 reference." },
    { source: "dss", ref: "4Q246 (Son of God Text)", note: "Describes a figure who will be called 'Son of God' and 'Son of the Most High', mirroring Daniel's language." },
    { source: "tanakh", ref: "Daniel 7:13", note: "I saw in the night visions, and, behold, there came with the clouds of heaven one like unto a son of man." },
    { source: "lxx", ref: "Daniel 7:13", note: "The 'Old Greek' version has the Son of Man coming 'as' the Ancient of Days in some manuscripts." }
  ],
  "DAN.9": [
    { source: "josephus", ref: "Antiquities 10.11.7", note: "Josephus notes that Daniel predicted the Roman desolation of Jerusalem and the Temple." },
    { source: "dss", ref: "11Q13", note: "Calculates the '70 weeks' as ending with the appearance of Melchizedek and the final atonement." },
    { source: "jewish_nt", ref: "Matthew 24:15", note: "Jesus refers to the 'abomination of desolation' spoken of by Daniel the prophet." },
    { source: "tanakh", ref: "Daniel 9:24", note: "Seventy weeks are decreed upon thy people... to finish the transgression, and to make an end of sin." }
  ],
  "DAN.10": [
    { source: "enoch", ref: "Enoch 20", note: "Lists the seven archangels, including Michael, who is the 'prince' of Israel in Daniel 10." },
    { source: "dss", ref: "4Q544 (Visions of Amram)", note: "Describes the struggle between the Prince of Light (Michael) and the Prince of Darkness (Melchiresha)." },
    { source: "tanakh", ref: "Daniel 10:13", note: "But the prince of the kingdom of Persia withstood me one and twenty days; but, lo, Michael, one of the chief princes, came to help me." },
    { source: "zondervan", ref: "Territorial Spirits", note: "The ANE concept of patron deities or angels assigned to specific nations." }
  ],
  "DAN.12": [
    { source: "dss", ref: "12Q12", note: "Fragments emphasizing the 'wise' who will shine like the brightness of the firmament." },
    { source: "jewish_nt", ref: "Matthew 13:43", note: "Jesus quotes Daniel 12:3: 'Then the righteous will shine like the sun in the kingdom of their Father'." },
    { source: "tanakh", ref: "Daniel 12:2", note: "And many of them that sleep in the dust of the earth shall awake, some to everlasting life, and some to reproaches and everlasting abhorrence." },
    { source: "josephus", ref: "Antiquities 10.11.7", note: "Discusses Daniel's prophecies regarding the end of the world and the resurrection." },
    { source: "enoch", ref: "Enoch 102-104", note: "A detailed description of the resurrection of the righteous and the judgment of the wicked." }
  ],
  "MAT.5": [
    { source: "jewish_nt", ref: "Matthew 5:17", note: "Jesus' claim that he came not to abolish the Torah but to 'fulfill' (properly interpret) it." },
    { source: "josephus", ref: "Antiquities 18.1.3", note: "Describes the Pharisees' strict adherence to the Law, providing context for 'unless your righteousness exceeds...'" }
  ],
  "MAT.24": [
    { source: "josephus", ref: "The Jewish War 6", note: "An eyewitness account of the destruction of the Temple in 70 AD, fulfilling Jesus' 'not one stone left' prophecy." },
    { source: "dss", ref: "1QM (War Scroll)", note: "Describes the final battle between the Sons of Light and the Sons of Darkness, mirroring the 'wars and rumors of wars'." },
    { source: "enoch", ref: "Enoch 91-93 (Apocalypse of Weeks)", note: "A historical-prophetic overview of world history ending in a final judgment." },
    { source: "jewish_nt", ref: "Matthew 24:30", note: "The 'Sign of the Son of Man' appearing in heaven, a direct link to Daniel 7." }
  ],
  "ROM.1": [
    { source: "josephus", ref: "Antiquities 18.1.1", note: "Describes the various Jewish sects and their responses to Roman rule and pagan culture." },
    { source: "tanakh", ref: "Habakkuk 2:4", note: "The source for Paul's 'The righteous shall live by faith'." },
    { source: "dss", ref: "1QpHab", note: "The Qumran commentary on Habakkuk 2:4, applying it to those who follow the Teacher of Righteousness." }
  ],
  "ROM.5": [
    { source: "dss", ref: "4QInstruction", note: "Discusses the 'inheritance of Adam' and the struggle of the 'spirit of flesh' against the 'spirit of truth'." },
    { source: "jewish_nt", ref: "Romans 5:12", note: "The doctrine of original sin through Adam, a concept also explored in 4 Ezra (2 Esdras)." },
    { source: "zondervan", ref: "Adam", note: "The corporate identity of Adam in Jewish thought: the one representing the many." }
  ],
  "ROM.8": [
    { source: "jewish_nt", ref: "Romans 8:19", note: "The 'groaning of creation' for the revelation of the sons of God, a theme found in apocalyptic literature." },
    { source: "enoch", ref: "Enoch 108", note: "The final transformation of the righteous into beings of light." }
  ],
  "HEB.1": [
    { source: "enoch", ref: "Enoch 48", note: "The pre-existence of the Son of Man before the sun and stars were created." },
    { source: "lxx", ref: "Psalm 103:4", note: "The source for 'He makes his angels spirits and his ministers a flame of fire'." }
  ],
  "HEB.7": [
    { source: "josephus", ref: "Antiquities 1.10.2", note: "Historical account of Melchizedek as the first priest of God in Jerusalem." },
    { source: "tanakh", ref: "Psalm 110:4", note: "The divine oath: 'Thou art a priest for ever after the manner of Melchizedek'." }
  ],
  "HEB.11": [
    { source: "enoch", ref: "Enoch 70-71", note: "The translation of Enoch into heaven, a key example of faith in Hebrews 11:5." },
    { source: "dss", ref: "4QInstruction", note: "Exhortations to the 'elect of righteousness' to remain faithful despite suffering." }
  ],
  "REV.1": [
    { source: "enoch", ref: "Enoch 46", note: "The vision of the 'Head of Days' with hair like white wool, mirrored in the vision of the glorified Christ." },
    { source: "dss", ref: "4Q529 (Words of Michael)", note: "A vision of a heavenly being with a face like lightning and eyes like fire." },
    { source: "tanakh", ref: "Daniel 7:13-14", note: "The 'Son of Man' coming with clouds, the primary source for the imagery in Revelation 1." },
    { source: "jewish_nt", ref: "Revelation 1:4", note: "The 'Seven Spirits before the throne', likely the seven archangels mentioned in Enoch 20." }
  ],
  "REV.4": [
    { source: "enoch", ref: "Enoch 14", note: "Enoch's vision of the heavenly palace, the crystal throne, and the flaming cherubim." },
    { source: "dss", ref: "4Q405 (Songs of the Sabbath Sacrifice)", note: "Liturgical descriptions of the heavenly throne-room and the angelic 'holy, holy, holy' chant." },
    { source: "tanakh", ref: "Ezekiel 1", note: "The vision of the four living creatures and the chariot-throne (Merkabah)." },
    { source: "zondervan", ref: "Throne Room", note: "The ANE concept of the divine assembly (Divine Council) meeting in the heavenly court." }
  ],
  "REV.12": [
    { source: "enoch", ref: "Enoch 20", note: "The war in heaven led by Michael against the dragon/rebel angels." },
    { source: "dss", ref: "4Q544 (Visions of Amram)", note: "Describes the struggle between the Prince of Light (Michael) and the Prince of Darkness (Melchiresha)." },
    { source: "josephus", ref: "Antiquities 1.1.4", note: "The ancient enmity between the serpent and the woman's seed." },
    { source: "zondervan", ref: "The Dragon", note: "The chaos-monster (Tiamat/Leviathan) motif in ANE mythology as a symbol of anti-divine power." }
  ],
  "REV.20": [
    { source: "enoch", ref: "Enoch 10", note: "The binding of Azazel (the leader of the Watchers) for 70 generations until the day of judgment." },
    { source: "dss", ref: "1QM (War Scroll)", note: "The final defeat of Belial and the host of darkness after a series of cosmic battles." },
    { source: "tanakh", ref: "Isaiah 24:21-22", note: "The host of the high ones in the high place being gathered together as prisoners in a pit." },
    { source: "jewish_nt", ref: "Revelation 20:4", note: "The 'thousand years' (Millennium) as a period of transition before the final new creation." }
  ],
  "REV.21": [
    { source: "tanakh", ref: "Isaiah 65:17", note: "For, behold, I create new heavens and a new earth; and the former things shall not be remembered." }
  ]
};

export const BOOK_NOTES = {
  "GEN": "Genesis sets the stage for the Israelite worldview, blending ancient Near Eastern motifs with a unique monotheistic polemic. It covers the origins of the cosmos and the patriarchal foundations.",
  "EXO": "Exodus is the national epic of liberation, detailing the transition from family to nationhood under the pressure of Egyptian hegemony.",
  "LEV": "Leviticus provides the ritual framework for holiness, defining how a people can host the divine presence in their midst.",
  "NUM": "Numbers chronicles the wilderness wanderings, a period of transition and testing between Egypt and the Promised Land.",
  "DEU": "Deuteronomy is a series of farewell speeches by Moses, re-stating the covenant for a new generation about to enter the land.",
  "PSA": "The Psalms are the liturgical heartbeat of Second Temple Judaism, reflecting a wide range of theological and emotional states.",
  "ISA": "Isaiah contains some of the most complex messianic and social justice themes in the Hebrew Bible, spanning multiple historical crises.",
  "DAN": "Daniel is the primary apocalyptic text of the Hebrew Bible, introducing the 'Son of Man' and resurrection concepts central to the NT.",
  "JHN": "John's Gospel identifies the 'Logos' (Word) as the personal, eternal, incarnate Son of God, rooted in the Hebrew 'Memra' tradition rather than Greek philosophy.",
  "REV": "Revelation is a high-stakes apocalyptic vision that draws heavily on Daniel, Ezekiel, and Enoch to describe the final cosmic struggle."
};
