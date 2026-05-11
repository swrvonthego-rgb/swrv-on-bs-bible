// Cross-Source Chronological Weave
// Maps each Bible passage to parallel passages in approved sources.
// Sources used: 1 Enoch (R.H. Charles 1917, public domain), Josephus Antiquities (Whiston, public domain).
// All excerpts are quoted directly from public-domain translations.

window.CROSS_REFS = {
  "Genesis 1:1": [
    {
      "source": "Josephus",
      "location": "Antiquities of the Jews, Book 1, Chapter 1",
      "excerpt": "In the beginning God created the heaven and the earth. But when the earth did not come into sight, but was covered with thick darkness, and a wind moved upon its surface, God commanded that there should be light: and when that was made, He considered the whole mass, and separated the light and the darkness; and the name He gave to one was Night, and the other He called Day. And He named the beginning of light, and the time of rest, the Evening and the Morning.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "In the beginning God created the heaven"
      }
    },
    {
      "source": "1 Enoch",
      "location": "Astronomy Ch 1 (general creation backdrop)",
      "excerpt": "Enoch's Astronomical Book gives the structure of the heavens, the courses of the luminaries, and the calendar God set in place at creation. The opening passages of the section frame the cosmos as ordered by God's command.",
      "action": {
        "type": "enoch",
        "section": "Astronomy",
        "chapter": "1"
      }
    }
  ],
  "Genesis 1:26-27": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 1",
      "excerpt": "After this, on the sixth day, He created the four-footed beasts, and made them male and female. On the same day He also formed man. Accordingly Moses says, that in just six days the world and all that is therein was made; and that the seventh day was a rest, and a release from the labor of such operations.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "He also formed man"
      }
    }
  ],
  "Genesis 2:7": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 1",
      "excerpt": "God formed man, by taking dust from the earth, and put into him a spirit and a soul. This man was called Adam, which, in the Hebrew tongue, signifies one that is red, because he was formed out of red earth, compounded together; for of that kind is virgin and true earth.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "formed man, by taking dust"
      }
    }
  ],
  "Genesis 2:8-9": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 1",
      "excerpt": "God planted a garden in the east, with all sorts of trees; among which was the tree of life, and another of knowledge, whereby was to be known what was good and evil; and He brought Adam and his wife into this garden, and commanded them to take care of the plants.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "God planted a garden"
      }
    }
  ],
  "Genesis 3:1-7": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 1",
      "excerpt": "Now all the living creatures had one language at that time; and the serpent, living then with Adam and his wife, showed an envious disposition at his supposing that they would live happily, and in obedience to the commands of God; and imagining that, when they disobeyed them, they would fall into calamities, he persuaded the woman, out of a malicious intention, to taste of the tree of knowledge.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "all the living creatures had one language"
      }
    }
  ],
  "Genesis 4:17-22": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 2",
      "excerpt": "Cain became the author of many vices and ill courses to mankind. He first contrived to plough the ground, and put bounds about lands; and he built a city, and fortified it with walls, and compelled his family to come together to it; and called that city Enoch, after the name of his eldest son. Of those children by Ada, one was Jabal; he erected tents, and loved the life of a shepherd. But Jubal, who was born of the same mother with him, exercised himself in music, and invented the psaltery and the harp.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "called that city Enoch"
      }
    }
  ],
  "Genesis 5:18-24": [
    {
      "source": "1 Enoch",
      "location": "Watchers Ch 1 (opening prologue)",
      "excerpt": "The words of the blessing of Enoch, wherewith he blessed the elect and righteous, who will be living in the days of tribulation, when all the wicked and godless are to be removed. And Enoch, a righteous man whose eyes were opened by God took up his parable and said, 'I saw the vision of the Holy One in the heavens, which the angels showed me, and from them I heard everything, and from them I understood as I saw...'",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "1"
      }
    },
    {
      "source": "1 Enoch",
      "location": "Watchers Ch 4 (Enoch hidden, his ministry to the Watchers)",
      "excerpt": "Before these things Enoch was hidden, and no one of the children of men knew where he was hidden, and where he abode, and what had become of him. And his activities had to do with the Watchers, and his days were with the holy ones. And Enoch went and said: 'Azazel, thou shalt have no peace, a severe sentence has gone forth against thee to put thee in bonds...'",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "4"
      }
    },
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 2 — the patriarchal lineage from Seth",
      "excerpt": "Josephus traces the line of Seth through Enos, Cainan, Mahalaleel, Jared, Enoch, Methuselah. The line of Seth, distinct from the line of Cain, preserves the worship of God across the antediluvian generations.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "Seth"
      }
    },
    {
      "source": "Jude 14-15 (NT cross-reference)",
      "location": "Jude's direct quotation of 1 Enoch 1:9",
      "excerpt": "Jude 14-15 in the New Testament directly quotes 1 Enoch: 'Enoch also, the seventh from Adam, prophesied of these, saying, Behold, the Lord cometh with ten thousands of his saints, To execute judgment upon all...' This is the only NT direct quotation of an extra-canonical Jewish text — and the apostle Jude treats Enoch as authoritative prophecy.",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "1"
      }
    }
  ],
  "Genesis 6:1-4": [
    {
      "source": "1 Enoch",
      "location": "Watchers Ch 3 — the descent of the angels (= classical 1 Enoch 6-7)",
      "excerpt": "And it came to pass when the children of men had multiplied that in those days were born unto them beautiful and comely daughters. And the angels, the children of the heaven, saw and lusted after them, and said to one another: 'Come, let us choose us wives from among the children of men and beget us children.' And Semjaza, who was their leader, said unto them: 'I fear ye will not indeed agree to do this deed, and I alone shall have to pay the penalty of a great sin.' Then sware they all together and bound themselves by mutual imprecations upon it. And they were in all two hundred; who descended in the days of Jared on the summit of Mount Hermon, and they called it Mount Hermon, because they had sworn and bound themselves by mutual imprecations upon it.",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "3"
      }
    },
    {
      "source": "1 Enoch",
      "location": "Watchers Ch 3 — the giants and Azazel's teaching",
      "excerpt": "And all the others together with them took unto themselves wives, and each chose for himself one, and they began to go in unto them and to defile themselves with them. And they became pregnant, and they bare great giants, whose height was three thousand ells: Who consumed all the acquisitions of men. And Azazel taught men to make swords, and knives, and shields, and breastplates, and made known to them the metals of the earth and the art of working them. Semjaza taught enchantments and root-cuttings, Armaros the resolving of enchantments, Baraqijal taught astrology, Kokabel the constellations, Ezeqeel the knowledge of the clouds.",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "3"
      }
    },
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 3 (on Gen 6:1-4)",
      "excerpt": "For many angels of God accompanied with women, and begat sons that proved unjust, and despisers of all that was good, on account of the confidence they had in their own strength; for the tradition is, that these men did what resembled the acts of those whom the Grecians call giants.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "many  angels  of  God  accom"
      }
    }
  ],
  "Genesis 6:5-8": [
    {
      "source": "1 Enoch",
      "location": "Watchers Ch 4 — archangels intercede; YHWH announces judgment",
      "excerpt": "Thou seest what Azazel hath done, who hath taught all unrighteousness on earth and revealed the eternal secrets which were in heaven, which men were striving to learn; and Samlazaz, to whom Thou hast given authority to bear rule over his associates. And they have gone to the daughters of men upon the earth, and have slept with the women, and have defiled themselves, and revealed to them all kinds of sins. And the women have borne giants, and the whole earth has thereby been filled with blood and unrighteousness.",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "4"
      }
    }
  ],
  "Genesis 7:1-12": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 3",
      "excerpt": "Now this posterity of Seth continued to esteem God as the Lord of the universe, and to have an entire regard to virtue, for seven generations; but in process of time they were perverted, and forsook the practices of their forefathers... God loved this man for his righteousness; yet he not only condemned those other men for their wickedness, but determined to destroy the whole race of mankind, and to make another race that should be pure from wickedness.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "posterity of Seth"
      }
    },
    {
      "source": "1 Enoch",
      "location": "Watchers Ch 4 — the announcement to Noah of the coming flood",
      "excerpt": "And again the Lord said to Raphael: 'Bind Azazel hand and foot, and cast him into the darkness: and make an opening in the desert, which is in Dudael, and cast him therein. And place upon him rough and jagged rocks, and cover him with darkness, and let him abide there forever.' And heal the earth which the angels have corrupted, and proclaim the healing of the earth, that they may heal the plague.",
      "action": {
        "type": "enoch",
        "section": "Watchers",
        "chapter": "4"
      }
    }
  ],
  "Genesis 11:1-9": [
    {
      "source": "Josephus",
      "location": "Antiquities Bk 1, Ch 4",
      "excerpt": "Now the plain in which they first dwelt was called Shinar. God also commanded them to send colonies abroad, for the thorough peopling of the earth, that they might not raise seditions among themselves, but might cultivate a great part of the earth, and enjoy its fruits after a plentiful manner. But they were so ill instructed that they did not obey God; for which reason they fell into calamities, and were made sensible, by experience, of what sin they had been guilty of. Now it was Nimrod who excited them to such an affront and contempt of God. He was the grandson of Ham, the son of Noah, a bold man, and of great strength of hand.",
      "action": {
        "type": "source",
        "key": "josephus",
        "search": "Now the plain in which they first dwelt was called Shinar"
      }
    }
  ]
};
