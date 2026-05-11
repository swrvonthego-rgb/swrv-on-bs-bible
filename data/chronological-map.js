// Chronological Master Map — interleaves Bible, 1 Enoch, and Josephus in narrative order.
// Reading-order references the standard Chronological Study Bible (Thomas Nelson).
// Approximate dates are scholarly conventions; precision intentionally limited.

window.CHRONO_MAP = [
 {
  "period": "Primeval",
  "time": "Before Time",
  "label": "Pre-creation rebellion (Satan's fall, the morning stars)",
  "source": "bible",
  "ref": "Job 38:4-7 + Isaiah 14:12-15 + Ezekiel 28:12-19",
  "anchor": {
   "type": "bible-chapter",
   "book": "Job",
   "chapter": 38
  }
 },
 {
  "period": "Primeval",
  "time": "Day 1-6",
  "label": "Six days of creation",
  "source": "bible",
  "ref": "Genesis 1",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 1
  }
 },
 {
  "period": "Primeval",
  "time": "Day 7",
  "label": "The Sabbath; the garden formed",
  "source": "bible",
  "ref": "Genesis 2",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 2
  }
 },
 {
  "period": "Primeval",
  "time": "After creation",
  "label": "Enoch's cosmology: the luminaries, calendar, divisions of the year",
  "source": "enoch",
  "ref": "1 Enoch Astronomy 72-82",
  "anchor": {
   "type": "enoch",
   "section": "Astronomy",
   "chapter": 1
  }
 },
 {
  "period": "Primeval",
  "time": "After creation",
  "label": "The Fall — serpent, expulsion, first promise of a redeemer",
  "source": "bible",
  "ref": "Genesis 3",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 3
  }
 },
 {
  "period": "Primeval",
  "time": "Adam's family",
  "label": "Cain and Abel; line of Cain; the first murder",
  "source": "bible",
  "ref": "Genesis 4",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 4
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 622 of creation",
  "label": "Lineage of Seth — Enoch born",
  "source": "bible",
  "ref": "Genesis 5",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 5
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 887 of creation",
  "label": "Enoch's prologue — his commission as scribe of righteousness",
  "source": "enoch",
  "ref": "1 Enoch Watchers 1",
  "anchor": {
   "type": "enoch",
   "section": "Watchers",
   "chapter": 1
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 1000 of creation",
  "label": "Descent of the Watchers (200 angels, Mt Hermon, days of Jared)",
  "source": "enoch",
  "ref": "1 Enoch Watchers 3 (= classical 6-8)",
  "anchor": {
   "type": "enoch",
   "section": "Watchers",
   "chapter": 3
  }
 },
 {
  "period": "Primeval",
  "time": "Same era",
  "label": "Genesis 6: sons of God, daughters of men, Nephilim",
  "source": "bible",
  "ref": "Genesis 6:1-4",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 6
  }
 },
 {
  "period": "Primeval",
  "time": "Same era",
  "label": "Archangels intercede; Azazel bound; flood announced",
  "source": "enoch",
  "ref": "1 Enoch Watchers 4 (= classical 9-10)",
  "anchor": {
   "type": "enoch",
   "section": "Watchers",
   "chapter": 4
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 987-1656",
  "label": "Enoch's ministry to the Watchers; commissioning",
  "source": "enoch",
  "ref": "1 Enoch Watchers 5-7",
  "anchor": {
   "type": "enoch",
   "section": "Watchers",
   "chapter": 5
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 987",
  "label": "Enoch translated — 'God took him'",
  "source": "bible",
  "ref": "Genesis 5:21-24",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 5
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 1656",
  "label": "Josephus' antediluvian witness",
  "source": "josephus",
  "ref": "Antiquities Bk 1, Ch 2",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "Now this posterity of Seth"
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 1656-1657",
  "label": "The Flood",
  "source": "bible",
  "ref": "Genesis 7-8",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 7
  }
 },
 {
  "period": "Primeval",
  "time": "After the Flood",
  "label": "Josephus on the Flood, ark, dove",
  "source": "josephus",
  "ref": "Antiquities Bk 1, Ch 3",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "Now the deluge"
  }
 },
 {
  "period": "Primeval",
  "time": "After the Flood",
  "label": "Noahic covenant; curse of Canaan",
  "source": "bible",
  "ref": "Genesis 9",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 9
  }
 },
 {
  "period": "Primeval",
  "time": "After the Flood",
  "label": "Table of Nations",
  "source": "bible",
  "ref": "Genesis 10",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 10
  }
 },
 {
  "period": "Primeval",
  "time": "After the Flood",
  "label": "Josephus expands Table of Nations",
  "source": "josephus",
  "ref": "Antiquities Bk 1, Ch 6",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "Now they were the grandchildren of Noah"
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 1996",
  "label": "Tower of Babel",
  "source": "bible",
  "ref": "Genesis 11",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 11
  }
 },
 {
  "period": "Primeval",
  "time": "~Year 1996",
  "label": "Josephus on Nimrod and Babel",
  "source": "josephus",
  "ref": "Antiquities Bk 1, Ch 4",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "Now it was Nimrod"
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2091 BC",
  "label": "Abram called from Ur",
  "source": "bible",
  "ref": "Genesis 12",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 12
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2091 BC",
  "label": "Job — earliest written book of the Bible (set in Uz, patriarchal era)",
  "source": "bible",
  "ref": "Job (whole book — set in patriarchal era)",
  "anchor": {
   "type": "bible-chapter",
   "book": "Job",
   "chapter": 1
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2085 BC",
  "label": "Abram + Lot separate",
  "source": "bible",
  "ref": "Genesis 13",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 13
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2085 BC",
  "label": "Battle of kings; Melchizedek",
  "source": "bible",
  "ref": "Genesis 14",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 14
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2080 BC",
  "label": "Covenant with Abram",
  "source": "bible",
  "ref": "Genesis 15",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 15
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2080 BC",
  "label": "Hagar and Ishmael",
  "source": "bible",
  "ref": "Genesis 16",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 16
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2067 BC",
  "label": "Circumcision covenant",
  "source": "bible",
  "ref": "Genesis 17",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 17
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2067 BC",
  "label": "Three visitors; Sodom destroyed",
  "source": "bible",
  "ref": "Genesis 18-19",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 18
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2066 BC",
  "label": "Isaac born",
  "source": "bible",
  "ref": "Genesis 21",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 21
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2050 BC",
  "label": "Binding of Isaac (Akedah)",
  "source": "bible",
  "ref": "Genesis 22",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 22
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2030 BC",
  "label": "Sarah dies; Rebekah found",
  "source": "bible",
  "ref": "Genesis 23-24",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 23
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.2006 BC",
  "label": "Jacob and Esau born; Esau sells birthright",
  "source": "bible",
  "ref": "Genesis 25",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 25
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1929 BC",
  "label": "Jacob's ladder at Bethel",
  "source": "bible",
  "ref": "Genesis 28",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 28
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1929-1909 BC",
  "label": "Jacob's 20 years with Laban; Leah, Rachel, the twelve sons",
  "source": "bible",
  "ref": "Genesis 29-31",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 29
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1909 BC",
  "label": "Jacob wrestles God; becomes Israel",
  "source": "bible",
  "ref": "Genesis 32",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 32
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1898 BC",
  "label": "Joseph sold into Egypt",
  "source": "bible",
  "ref": "Genesis 37",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 37
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1885 BC",
  "label": "Joseph rises; Pharaoh's dreams",
  "source": "bible",
  "ref": "Genesis 39-41",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 39
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1876 BC",
  "label": "Jacob's family settles in Egypt",
  "source": "bible",
  "ref": "Genesis 46-47",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 46
  }
 },
 {
  "period": "Patriarchs",
  "time": "c.1859 BC",
  "label": "Jacob's blessings; deaths of Jacob and Joseph",
  "source": "bible",
  "ref": "Genesis 49-50",
  "anchor": {
   "type": "bible-chapter",
   "book": "Genesis",
   "chapter": 49
  }
 },
 {
  "period": "Egypt",
  "time": "c.1859-1446 BC",
  "label": "400 years of bondage (silent period)",
  "source": "bible",
  "ref": "Exodus 1",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 1
  }
 },
 {
  "period": "Egypt",
  "time": "c.1526 BC",
  "label": "Moses born",
  "source": "bible",
  "ref": "Exodus 2",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 2
  }
 },
 {
  "period": "Egypt",
  "time": "c.1486 BC",
  "label": "Burning bush; Moses commissioned",
  "source": "bible",
  "ref": "Exodus 3-4",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 3
  }
 },
 {
  "period": "Egypt",
  "time": "c.1446 BC",
  "label": "Plagues 1-10",
  "source": "bible",
  "ref": "Exodus 5-12",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 5
  }
 },
 {
  "period": "Egypt",
  "time": "c.1446 BC",
  "label": "Josephus on the plagues",
  "source": "josephus",
  "ref": "Antiquities Bk 2, Ch 13",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "the plagues that came upon"
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1446 BC",
  "label": "Passover; Exodus; Red Sea",
  "source": "bible",
  "ref": "Exodus 12-15",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 12
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1446 BC",
  "label": "Manna, water from the rock, Amalek, Jethro",
  "source": "bible",
  "ref": "Exodus 16-18",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 16
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1446 BC",
  "label": "Sinai theophany; Ten Commandments; covenant ratified",
  "source": "bible",
  "ref": "Exodus 19-24",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 19
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1446 BC",
  "label": "Josephus on Sinai",
  "source": "josephus",
  "ref": "Antiquities Bk 3, Ch 5",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "Now when Moses had been delivered the laws"
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1446-1445 BC",
  "label": "Tabernacle built; golden calf; glory fills the tabernacle",
  "source": "bible",
  "ref": "Exodus 25-40",
  "anchor": {
   "type": "bible-chapter",
   "book": "Exodus",
   "chapter": 25
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1445 BC",
  "label": "Leviticus — sacrificial system, holiness code, feasts",
  "source": "bible",
  "ref": "Leviticus",
  "anchor": {
   "type": "bible-chapter",
   "book": "Leviticus",
   "chapter": 1
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1445-1406 BC",
  "label": "40 years wandering — Numbers",
  "source": "bible",
  "ref": "Numbers",
  "anchor": {
   "type": "bible-chapter",
   "book": "Numbers",
   "chapter": 1
  }
 },
 {
  "period": "Wilderness",
  "time": "c.1406 BC",
  "label": "Moses' farewell — Deuteronomy",
  "source": "bible",
  "ref": "Deuteronomy",
  "anchor": {
   "type": "bible-chapter",
   "book": "Deuteronomy",
   "chapter": 1
  }
 },
 {
  "period": "Conquest",
  "time": "c.1406-1390 BC",
  "label": "Joshua: conquest of Canaan",
  "source": "bible",
  "ref": "Joshua",
  "anchor": {
   "type": "bible-chapter",
   "book": "Joshua",
   "chapter": 1
  }
 },
 {
  "period": "Judges",
  "time": "c.1390-1050 BC",
  "label": "Judges — cycle of apostasy and deliverance",
  "source": "bible",
  "ref": "Judges",
  "anchor": {
   "type": "bible-chapter",
   "book": "Judges",
   "chapter": 1
  }
 },
 {
  "period": "Judges",
  "time": "c.1100 BC",
  "label": "Ruth — set in the time of the Judges",
  "source": "bible",
  "ref": "Ruth",
  "anchor": {
   "type": "bible-chapter",
   "book": "Ruth",
   "chapter": 1
  }
 },
 {
  "period": "Judges",
  "time": "c.1080-1050 BC",
  "label": "1 Samuel 1-15: Samuel, Saul anointed",
  "source": "bible",
  "ref": "1 Samuel 1-15",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Samuel",
   "chapter": 1
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.1050-1010 BC",
  "label": "Saul's reign; David anointed",
  "source": "bible",
  "ref": "1 Samuel 16-31",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Samuel",
   "chapter": 16
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.1010-970 BC",
  "label": "David's reign",
  "source": "bible",
  "ref": "2 Samuel + 1 Chronicles 10-29",
  "anchor": {
   "type": "bible-chapter",
   "book": "2 Samuel",
   "chapter": 1
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.1010-970 BC",
  "label": "Psalms of David interspersed with his life",
  "source": "bible",
  "ref": "Psalms (many by David)",
  "anchor": {
   "type": "bible-chapter",
   "book": "Psalms",
   "chapter": 1
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.970-930 BC",
  "label": "Solomon's reign; temple built",
  "source": "bible",
  "ref": "1 Kings 1-11 + 2 Chronicles 1-9",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Kings",
   "chapter": 1
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.965 BC",
  "label": "Song of Solomon",
  "source": "bible",
  "ref": "Song of Songs",
  "anchor": {
   "type": "bible-chapter",
   "book": "Song of Solomon",
   "chapter": 1
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.950 BC",
  "label": "Proverbs (largely by Solomon)",
  "source": "bible",
  "ref": "Proverbs",
  "anchor": {
   "type": "bible-chapter",
   "book": "Proverbs",
   "chapter": 1
  }
 },
 {
  "period": "United Monarchy",
  "time": "c.935 BC",
  "label": "Ecclesiastes",
  "source": "bible",
  "ref": "Ecclesiastes",
  "anchor": {
   "type": "bible-chapter",
   "book": "Ecclesiastes",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.930-722 BC",
  "label": "Kingdom divides; Israel (N) and Judah (S)",
  "source": "bible",
  "ref": "1 Kings 12 + 2 Chronicles 10",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Kings",
   "chapter": 12
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.875-848 BC",
  "label": "Elijah and Elisha",
  "source": "bible",
  "ref": "1 Kings 17 - 2 Kings 13",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Kings",
   "chapter": 17
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.785 BC",
  "label": "Jonah",
  "source": "bible",
  "ref": "Jonah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Jonah",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.760-750 BC",
  "label": "Amos prophesies in Israel",
  "source": "bible",
  "ref": "Amos",
  "anchor": {
   "type": "bible-chapter",
   "book": "Amos",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.755 BC",
  "label": "Hosea prophesies in Israel",
  "source": "bible",
  "ref": "Hosea",
  "anchor": {
   "type": "bible-chapter",
   "book": "Hosea",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.740-700 BC",
  "label": "Isaiah prophesies in Judah",
  "source": "bible",
  "ref": "Isaiah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Isaiah",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.735 BC",
  "label": "Micah prophesies in Judah",
  "source": "bible",
  "ref": "Micah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Micah",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.722 BC",
  "label": "Israel (N) falls to Assyria",
  "source": "bible",
  "ref": "2 Kings 17",
  "anchor": {
   "type": "bible-chapter",
   "book": "2 Kings",
   "chapter": 17
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.640-621 BC",
  "label": "Zephaniah, Nahum, Habakkuk in Judah",
  "source": "bible",
  "ref": "Zephaniah · Nahum · Habakkuk",
  "anchor": {
   "type": "bible-chapter",
   "book": "Zephaniah",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.627-586 BC",
  "label": "Jeremiah's ministry to Judah's last days",
  "source": "bible",
  "ref": "Jeremiah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Jeremiah",
   "chapter": 1
  }
 },
 {
  "period": "Divided Kingdom",
  "time": "c.605 BC",
  "label": "First Babylonian exile (incl. Daniel)",
  "source": "bible",
  "ref": "Daniel 1",
  "anchor": {
   "type": "bible-chapter",
   "book": "Daniel",
   "chapter": 1
  }
 },
 {
  "period": "Exile",
  "time": "c.605-536 BC",
  "label": "Daniel in Babylonian court",
  "source": "bible",
  "ref": "Daniel",
  "anchor": {
   "type": "bible-chapter",
   "book": "Daniel",
   "chapter": 1
  }
 },
 {
  "period": "Exile",
  "time": "c.593-571 BC",
  "label": "Ezekiel's visions in exile",
  "source": "bible",
  "ref": "Ezekiel",
  "anchor": {
   "type": "bible-chapter",
   "book": "Ezekiel",
   "chapter": 1
  }
 },
 {
  "period": "Exile",
  "time": "586 BC",
  "label": "Jerusalem falls; Lamentations",
  "source": "bible",
  "ref": "2 Kings 25 + Lamentations",
  "anchor": {
   "type": "bible-chapter",
   "book": "Lamentations",
   "chapter": 1
  }
 },
 {
  "period": "Exile",
  "time": "c.586-538 BC",
  "label": "Obadiah on Edom's gloating",
  "source": "bible",
  "ref": "Obadiah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Obadiah",
   "chapter": 1
  }
 },
 {
  "period": "Return",
  "time": "c.538 BC",
  "label": "Cyrus' decree; first return",
  "source": "bible",
  "ref": "Ezra 1-6",
  "anchor": {
   "type": "bible-chapter",
   "book": "Ezra",
   "chapter": 1
  }
 },
 {
  "period": "Return",
  "time": "c.520 BC",
  "label": "Haggai + Zechariah encourage temple rebuilding",
  "source": "bible",
  "ref": "Haggai · Zechariah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Haggai",
   "chapter": 1
  }
 },
 {
  "period": "Return",
  "time": "c.483-473 BC",
  "label": "Esther in Persia",
  "source": "bible",
  "ref": "Esther",
  "anchor": {
   "type": "bible-chapter",
   "book": "Esther",
   "chapter": 1
  }
 },
 {
  "period": "Return",
  "time": "c.458 BC",
  "label": "Ezra's second return",
  "source": "bible",
  "ref": "Ezra 7-10",
  "anchor": {
   "type": "bible-chapter",
   "book": "Ezra",
   "chapter": 7
  }
 },
 {
  "period": "Return",
  "time": "c.445 BC",
  "label": "Nehemiah rebuilds the wall",
  "source": "bible",
  "ref": "Nehemiah",
  "anchor": {
   "type": "bible-chapter",
   "book": "Nehemiah",
   "chapter": 1
  }
 },
 {
  "period": "Return",
  "time": "c.430 BC",
  "label": "Malachi — last OT prophet",
  "source": "bible",
  "ref": "Malachi",
  "anchor": {
   "type": "bible-chapter",
   "book": "Malachi",
   "chapter": 1
  }
 },
 {
  "period": "Intertestamental",
  "time": "c.400 BC - 4 BC",
  "label": "400 years of silence — Maccabean revolt, Roman occupation",
  "source": "josephus",
  "ref": "Antiquities Bks 11-17",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "After the death of Alexander"
  }
 },
 {
  "period": "Life of Christ",
  "time": "c.4 BC - AD 30",
  "label": "Matthew, Mark, Luke, John — harmonized chronologically",
  "source": "bible",
  "ref": "Matthew · Mark · Luke · John",
  "anchor": {
   "type": "bible-chapter",
   "book": "Matthew",
   "chapter": 1
  }
 },
 {
  "period": "Life of Christ",
  "time": "c.AD 30",
  "label": "Crucifixion, Resurrection, Ascension",
  "source": "bible",
  "ref": "Gospels' Passion narratives",
  "anchor": {
   "type": "bible-chapter",
   "book": "John",
   "chapter": 19
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 30-62",
  "label": "Acts of the Apostles",
  "source": "bible",
  "ref": "Acts",
  "anchor": {
   "type": "bible-chapter",
   "book": "Acts",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 49",
  "label": "Galatians",
  "source": "bible",
  "ref": "Galatians",
  "anchor": {
   "type": "bible-chapter",
   "book": "Galatians",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 50-51",
  "label": "1 & 2 Thessalonians",
  "source": "bible",
  "ref": "1-2 Thessalonians",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Thessalonians",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 55",
  "label": "1 & 2 Corinthians",
  "source": "bible",
  "ref": "1-2 Corinthians",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Corinthians",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 57",
  "label": "Romans",
  "source": "bible",
  "ref": "Romans",
  "anchor": {
   "type": "bible-chapter",
   "book": "Romans",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 60-62",
  "label": "Prison Epistles: Ephesians, Philippians, Colossians, Philemon",
  "source": "bible",
  "ref": "Eph · Phil · Col · Phlm",
  "anchor": {
   "type": "bible-chapter",
   "book": "Ephesians",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 62-65",
  "label": "Pastoral Epistles: 1-2 Timothy, Titus",
  "source": "bible",
  "ref": "1-2 Tim · Titus",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 Timothy",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 45",
  "label": "James — earliest NT epistle",
  "source": "bible",
  "ref": "James",
  "anchor": {
   "type": "bible-chapter",
   "book": "James",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 65",
  "label": "Hebrews · 1-2 Peter · Jude (Jude quotes 1 Enoch)",
  "source": "bible",
  "ref": "Heb · 1-2 Pet · Jude",
  "anchor": {
   "type": "bible-chapter",
   "book": "Hebrews",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 75",
  "label": "Josephus' eyewitness history of the Roman-Jewish war",
  "source": "josephus",
  "ref": "Wars of the Jews · Antiquities Bks 18-20",
  "anchor": {
   "type": "source",
   "key": "josephus",
   "search": "The history of the Jews"
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 85-95",
  "label": "Johannine epistles: 1-3 John",
  "source": "bible",
  "ref": "1-3 John",
  "anchor": {
   "type": "bible-chapter",
   "book": "1 John",
   "chapter": 1
  }
 },
 {
  "period": "Early Church",
  "time": "c.AD 95",
  "label": "Revelation — Apocalypse of John",
  "source": "bible",
  "ref": "Revelation",
  "anchor": {
   "type": "bible-chapter",
   "book": "Revelation",
   "chapter": 1
  }
 }
];
