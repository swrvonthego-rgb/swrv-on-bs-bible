// Dead Sea Scrolls — chronological placement map
//
// Maps specific DSS manuscripts to the canonical books/chapters they bear
// on, so the reader can surface them directly inside the Bible reading
// flow (see js/app.js renderDSSPlacement) instead of only as a standalone
// library entry (openDSSReader in js/app.js, data from window.DSS).
//
// Schema per entry:
//   scroll_id                    — stable key, unique
//   name                         — manuscript name + standard siglum
//   date_range                   — paleographic/radiocarbon date estimate
//   corresponding_book           — canonical book name as used by currentBook,
//                                   or null for entries not tied to a specific book
//   corresponding_chapter_start  — first chapter this entry concerns, or null
//   corresponding_chapter_end    — last chapter, or null if same as start
//   text_content                 — short factual description of what the
//                                   manuscript contains/preserves (not a
//                                   fabricated retranslation of lost text)
//   manuscript_notes             — the scholarly significance: what it shows,
//                                   how it compares to the Masoretic Text,
//                                   why it matters
//   placement                    — 'before' (intro fragment, shown on the
//                                   book's first chapter) | 'inline' (shown
//                                   on the specific chapter(s) named) |
//                                   'after' (manuscript-tradition note, shown
//                                   on the book's last chapter) | 'epoch'
//                                   (not tied to a canonical book — these
//                                   describe the Second Temple-era sectarian
//                                   texts already readable in full via the
//                                   Library's Dead Sea Scrolls section;
//                                   openDSSReader(scroll_id) opens them)
//
// Only claims that are well-established in DSS scholarship are included —
// no invented verse-by-verse "reconstructed" translations. Where a reading
// is genuinely debated among scholars, the note says so.

window.DSS_PLACEMENTS = [

  // ============= ISAIAH =============
  {
    scroll_id: 'isaiah-1qisaa-intro',
    name: 'Great Isaiah Scroll (1QIsaᵃ)',
    date_range: 'c. 125 BC',
    corresponding_book: 'Isaiah',
    corresponding_chapter_start: 1,
    corresponding_chapter_end: null,
    placement: 'before',
    text_content: 'A complete copy of Isaiah on 17 stitched sheets of leather, 24 feet long, found in Cave 1 in 1947 — the single best-preserved biblical scroll from Qumran and about 1,000 years older than any previously known Hebrew manuscript of Isaiah.',
    manuscript_notes: "Line for line, this scroll matches the much later Masoretic Text with striking consistency — mostly spelling and minor wording differences, almost nothing that changes meaning. For a book copied by hand for a thousand years before this discovery, that's the headline finding: it shows the Hebrew text of Isaiah was transmitted with real care long before any manuscript we'd previously had to check it against."
  },
  {
    scroll_id: 'isaiah-40-1qisaa',
    name: 'Great Isaiah Scroll (1QIsaᵃ), col. XXXIII',
    date_range: 'c. 125 BC',
    corresponding_book: 'Isaiah',
    corresponding_chapter_start: 40,
    corresponding_chapter_end: null,
    placement: 'inline',
    text_content: "Isaiah 40's opening — \"Comfort, comfort my people\" and \"a voice crying in the wilderness\" — is preserved in the scroll essentially as the Masoretic Text has it.",
    manuscript_notes: "This is the passage Mark's Gospel (1:3) and all three Synoptics quote to introduce John the Baptist. Having it confirmed in a Hebrew manuscript a century or more before John preached removes any question of the wording being adjusted after the fact to fit the Gospel writers' purposes."
  },
  {
    scroll_id: 'isaiah-53-1qisaa',
    name: 'Great Isaiah Scroll (1QIsaᵃ), col. XLIV',
    date_range: 'c. 125 BC',
    corresponding_book: 'Isaiah',
    corresponding_chapter_start: 52,
    corresponding_chapter_end: 53,
    placement: 'inline',
    text_content: 'The Suffering Servant passage (Isaiah 52:13–53:12) survives in the scroll with only minor orthographic variants from the Masoretic Text.',
    manuscript_notes: "This chapter is the one most often claimed, in popular polemic, to have been quietly reworded by later Jewish scribes to blunt a messianic reading. The Great Isaiah Scroll predates Christianity by over a century, and it reads the way the much later Masoretic Text does — so whatever one makes of the passage, the wording itself wasn't altered after the fact."
  },
  {
    scroll_id: 'isaiah-66-manuscript-tradition',
    name: 'Isaiah manuscripts at Qumran',
    date_range: 'c. 150 BC – 1st century AD',
    corresponding_book: 'Isaiah',
    corresponding_chapter_start: 66,
    corresponding_chapter_end: null,
    placement: 'after',
    text_content: 'Beyond the Great Isaiah Scroll, a second, more fragmentary Isaiah scroll (1QIsaᵇ) and roughly twenty-one further Isaiah fragments from Cave 4 (4QIsaᵃ–4QIsaʳ) were found at Qumran — more copies of Isaiah than of any prophetic book except the Minor Prophets as a group.',
    manuscript_notes: "1QIsaᵇ, though it preserves far less of the book, actually agrees with the Masoretic Text even more closely than the Great Isaiah Scroll does — suggesting the community held and copied more than one textual tradition of Isaiah side by side, not a single fixed version."
  },

  // ============= PSALMS =============
  {
    scroll_id: 'psalms-qumran-intro',
    name: 'Psalms manuscripts at Qumran',
    date_range: 'c. 150 BC – 1st century AD',
    corresponding_book: 'Psalms',
    corresponding_chapter_start: 1,
    corresponding_chapter_end: null,
    placement: 'before',
    text_content: 'About 36 separate Psalms manuscripts were found across the Qumran caves — more than any other biblical book, including Isaiah and Deuteronomy.',
    manuscript_notes: 'That sheer volume reflects how central the Psalms were to the community\'s own worship and prayer life, not just as scripture read about but as scripture prayed daily.'
  },
  {
    scroll_id: 'psalms-145-11qpsa',
    name: 'Great Psalms Scroll (11QPsᵃ / 11Q5), Psalm 145',
    date_range: 'c. 30–50 AD',
    corresponding_book: 'Psalms',
    corresponding_chapter_start: 145,
    corresponding_chapter_end: null,
    placement: 'inline',
    text_content: "This copy of the acrostic Psalm 145 inserts a refrain — \"Blessed be the LORD and blessed be his name forever and ever\" — after every single verse, not just at the end.",
    manuscript_notes: 'That refrain matches a line preserved separately in later synagogue liturgy, so this scroll looks like a snapshot of Psalm 145 already being used exactly the way it would go on being used in Jewish worship for the next two thousand years.'
  },
  {
    scroll_id: 'psalms-150-11qpsa',
    name: 'Great Psalms Scroll (11QPsᵃ / 11Q5)',
    date_range: 'c. 30–50 AD',
    corresponding_book: 'Psalms',
    corresponding_chapter_start: 150,
    corresponding_chapter_end: null,
    placement: 'after',
    text_content: "This large scroll from Cave 11 contains most of the last third of the biblical Psalter, but in a different internal order than the Masoretic Text, and with several compositions appended after it that never entered the Hebrew Bible — including a Hebrew form of Psalm 151 (canonical in Eastern Orthodox and some other traditions), an \"Apostrophe to Zion,\" a \"Plea for Deliverance,\" and a short prose note crediting David with 4,050 songs and psalms.",
    manuscript_notes: "Scholars are genuinely divided on what this means: whether 11QPsᵃ represents a real alternative edition of the Psalter still in flux at this point, or a liturgical collection that draws on the Psalms without claiming to replace them. Either way, it's a direct window into how fluid the edges of the Psalms collection still looked in the century before the New Testament, even while its core was already treated as settled scripture."
  },

  // ============= DEUTERONOMY =============
  {
    scroll_id: 'deuteronomy-qumran-intro',
    name: 'Deuteronomy manuscripts at Qumran',
    date_range: 'c. 200 BC – 1st century AD',
    corresponding_book: 'Deuteronomy',
    corresponding_chapter_start: 1,
    corresponding_chapter_end: null,
    placement: 'before',
    text_content: 'Around 30 copies of Deuteronomy were found at Qumran, making it — alongside Psalms and Isaiah — one of the three most-copied books in the entire collection.',
    manuscript_notes: "That popularity lines up with what the sectarian writings themselves show: the Qumran community read its own covenant renewal, in the Community Rule and elsewhere, as a direct continuation of the covenant language of Deuteronomy."
  },
  {
    scroll_id: 'deuteronomy-6-tefillin',
    name: 'Tefillin fragments (Deuteronomy 6:4–9)',
    date_range: 'c. 50 BC – 50 AD',
    corresponding_book: 'Deuteronomy',
    corresponding_chapter_start: 6,
    corresponding_chapter_end: null,
    placement: 'inline',
    text_content: 'The Shema ("Hear, O Israel: the LORD our God, the LORD is one") appears repeatedly among the small parchment fragments found rolled up inside tefillin (phylactery) cases at Qumran, alongside Deuteronomy 11:13–21 and Exodus 13:1–16.',
    manuscript_notes: 'These were not copies kept on a shelf — they were worn, literally bound to the hand and forehead per Deuteronomy 6:8, which Jesus references (Matthew 23:5) as common practice in his own time. Finding the actual physical objects from that practice, with this exact text inside them, is about as direct a confirmation as archaeology gets.'
  },
  {
    scroll_id: 'deuteronomy-32-4qdeutq',
    name: '4QDeutᵠ (4Q44), Song of Moses',
    date_range: 'c. 50 BC',
    corresponding_book: 'Deuteronomy',
    corresponding_chapter_start: 32,
    corresponding_chapter_end: null,
    placement: 'inline',
    text_content: 'This fragment of the Song of Moses preserves Deuteronomy 32:8 reading that God "fixed the borders of the peoples according to the number of the sons of God" (or "divine beings") — where the standard Masoretic Text reads "sons of Israel."',
    manuscript_notes: "The Greek Septuagint, translated centuries before this scroll was copied, already had \"angels of God\" at this verse — so this fragment shows the \"sons of God\" reading wasn't a late Christian-era invention; it's an older Hebrew tradition the Masoretic scribes later smoothed over, likely to avoid any suggestion of other divine beings alongside God. It's one of the clearer places where a Qumran manuscript preserves an older reading than the text that became standard."
  },
  {
    scroll_id: 'deuteronomy-34-manuscript-tradition',
    name: 'Deuteronomy manuscript tradition',
    date_range: 'c. 200 BC – 1st century AD',
    corresponding_book: 'Deuteronomy',
    corresponding_chapter_start: 34,
    corresponding_chapter_end: null,
    placement: 'after',
    text_content: 'Across its roughly 30 copies, Deuteronomy shows some of the clearest examples at Qumran of more than one Hebrew textual tradition circulating side by side — some manuscripts close to the later Masoretic Text, others closer to the tradition behind the Samaritan Pentateuch.',
    manuscript_notes: 'That diversity is a reminder that "the Hebrew Bible" wasn\'t a single fixed document yet in this period — it was a family of closely related texts, which only later converged into the single standardized version used today.'
  },

  // ============= GENESIS =============
  {
    scroll_id: 'genesis-qumran-intro',
    name: 'Genesis manuscripts at Qumran',
    date_range: 'c. 150 BC – 1st century AD',
    corresponding_book: 'Genesis',
    corresponding_chapter_start: 1,
    corresponding_chapter_end: null,
    placement: 'before',
    text_content: 'About 20 fragmentary copies of Genesis were found at Qumran, alongside a very different kind of text: the Genesis Apocryphon (1QapGen), an Aramaic retelling and expansion of the patriarchal narratives, not a direct copy of the biblical text itself.',
    manuscript_notes: 'The Genesis Apocryphon is read in full in Library → Dead Sea Scrolls → Second Temple Context. It shows how, alongside carefully copying Genesis word for word, this community also freely retold and expanded its stories — filling in details the biblical text leaves out, in a genre scholars now call "rewritten Bible."'
  },
  {
    scroll_id: 'genesis-6-apocryphon',
    name: 'Genesis Apocryphon (1QapGen), col. II',
    date_range: 'c. 1st century BC – 1st century AD',
    corresponding_book: 'Genesis',
    corresponding_chapter_start: 5,
    corresponding_chapter_end: 6,
    placement: 'inline',
    text_content: "The Genesis Apocryphon expands on Genesis's brief account of Noah's birth: Lamech, troubled that his newborn son's appearance seems otherworldly, questions his wife Bitenosh about the child's true parentage before Enoch reassures him the boy is his.",
    manuscript_notes: 'This expansion is reading the same "sons of God" verses right before the flood (Genesis 6:1–4) that this app\'s own Genesis 6 note already flags as one of the Bible\'s more debated early passages — the Genesis Apocryphon shows Second Temple readers were already wrestling with exactly that ambiguity, two thousand years before modern commentators.'
  },
  {
    scroll_id: 'genesis-12-apocryphon',
    name: 'Genesis Apocryphon (1QapGen), col. XIX–XX',
    date_range: 'c. 1st century BC – 1st century AD',
    corresponding_book: 'Genesis',
    corresponding_chapter_start: 12,
    corresponding_chapter_end: null,
    placement: 'inline',
    text_content: "The best-preserved columns of the Genesis Apocryphon dramatically retell Abram and Sarai's trip to Egypt (Genesis 12:10–20) — adding a vivid description of Sarai's beauty, a scene at Pharaoh's court, and a dream in which Abram is warned of the danger in advance.",
    manuscript_notes: "It's the single longest surviving passage of the whole scroll, which on its own suggests this episode held particular interest for Second Temple readers — read the full retelling in Library → Dead Sea Scrolls → Second Temple Context."
  },
  {
    scroll_id: 'genesis-50-manuscript-tradition',
    name: 'Genesis manuscript tradition',
    date_range: 'c. 150 BC – 1st century AD',
    corresponding_book: 'Genesis',
    corresponding_chapter_start: 50,
    corresponding_chapter_end: null,
    placement: 'after',
    text_content: "Genesis's roughly 20 Qumran manuscripts are mostly small fragments scattered across its 50 chapters, rather than one large near-complete copy like Isaiah's — so the picture for Genesis comes from piecing together many partial witnesses rather than one dominant scroll.",
    manuscript_notes: 'Where those fragments do overlap with the Masoretic Text, they generally confirm it closely; the real alternative witness to Genesis at Qumran isn\'t a rival textual tradition but the free retelling found in the Genesis Apocryphon.'
  },

  // ============= EXODUS =============
  {
    scroll_id: 'exodus-qumran-intro',
    name: 'Exodus manuscripts at Qumran',
    date_range: 'c. 250 BC – 1st century AD',
    corresponding_book: 'Exodus',
    corresponding_chapter_start: 1,
    corresponding_chapter_end: null,
    placement: 'before',
    text_content: 'About 17 copies of Exodus were found at Qumran, including 4QpaleoExodᵐ, written not in the square Aramaic script used for most of the scrolls but in Paleo-Hebrew — the older script Israel used before the Babylonian exile.',
    manuscript_notes: 'Using the ancient script for a Torah scroll appears to have been a deliberate, conservative choice rather than an accident of the copyist\'s background — a way of marking the text\'s special status by writing it the way it would have looked in Moses\'s own era.'
  },
  {
    scroll_id: 'exodus-13-tefillin',
    name: 'Tefillin fragments (Exodus 13:1–16)',
    date_range: 'c. 50 BC – 50 AD',
    corresponding_book: 'Exodus',
    corresponding_chapter_start: 13,
    corresponding_chapter_end: null,
    placement: 'inline',
    text_content: "Exodus 13's instructions on consecrating the firstborn and keeping the Feast of Unleavened Bread are among the four passages found copied inside the small parchment cases of actual tefillin recovered at Qumran, alongside Deuteronomy 6 and 11.",
    manuscript_notes: 'Exodus 13:9 is itself the verse that commands this practice ("it shall be... as a reminder on your forehead") — so these fragments are physical evidence of the command being carried out, not just copied as scripture.'
  },
  {
    scroll_id: 'exodus-4qexodb-text-type',
    name: '4QExodᵇ',
    date_range: 'c. 250–200 BC',
    corresponding_book: 'Exodus',
    corresponding_chapter_start: 40,
    corresponding_chapter_end: null,
    placement: 'after',
    text_content: 'One of the oldest biblical manuscripts found at Qumran, 4QExodᵇ belongs to a Hebrew textual tradition closer to the one later preserved by the Samaritan Pentateuch than to the Masoretic Text.',
    manuscript_notes: "Before this discovery, the longer, more expansive Samaritan-type readings in Exodus were assumed to be late changes the Samaritan community made on its own. Finding the same readings in a Jewish manuscript from Qumran, centuries earlier, showed instead that this was simply one of the legitimate Hebrew text traditions already in circulation — the Samaritan Pentateuch preserved it rather than invented it."
  },

  // ============= LEVITICUS =============
  {
    scroll_id: 'leviticus-paleo-intro',
    name: 'Paleo-Leviticus Scroll (11QpaleoLevᵃ)',
    date_range: 'c. 100 BC',
    corresponding_book: 'Leviticus',
    corresponding_chapter_start: 1,
    corresponding_chapter_end: null,
    placement: 'before',
    text_content: 'Large sections of Leviticus survive written entirely in Paleo-Hebrew script — the pre-exilic Hebrew alphabet — rather than the square Aramaic-derived script used for most Qumran manuscripts, including most other copies of Leviticus itself.',
    manuscript_notes: 'This is one of the best-preserved Paleo-Hebrew biblical manuscripts found at Qumran, and its text aligns closely with the later Masoretic Text — the archaic script appears to be a mark of reverence for the Torah\'s antiquity, not a sign of a different textual tradition underneath it.'
  },
  {
    scroll_id: 'leviticus-27-manuscript-tradition',
    name: 'Leviticus manuscripts at Qumran',
    date_range: 'c. 250 BC – 1st century AD',
    corresponding_book: 'Leviticus',
    corresponding_chapter_start: 27,
    corresponding_chapter_end: null,
    placement: 'after',
    text_content: 'In total around 15 separate Leviticus manuscripts were recovered from the Qumran caves, split between the ordinary square script and the archaic Paleo-Hebrew script noted above.',
    manuscript_notes: 'Across both scripts, Leviticus is textually one of the most stable books at Qumran relative to the later Masoretic Text — fitting for a book whose priestly regulations the community cared about getting exactly right.'
  },

  // ============= SECOND TEMPLE CONTEXT (inter-testamental epoch) =============
  // Not tied to a canonical book or chapter — these describe the sectarian
  // writings already readable in full via Library → Dead Sea Scrolls, which
  // functions as this app's Second Temple Context section. Window.DSS (see
  // data/dead-sea-scrolls.js) holds the full scholarly-paraphrase text;
  // openDSSReader(scroll_id) opens it.
  {
    scroll_id: 'Community Rule',
    name: 'Community Rule (1QS)',
    date_range: 'c. 100–75 BC (community founded c. 150 BC)',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'The governing charter of the Qumran community: initiation rites, communal property, rank, and a penal code.',
    manuscript_notes: "Its \"Two Spirits\" teaching — a cosmic divide between light and darkness governing human choice — is some of the clearest Second Temple background for John's Gospel and Paul's language of spiritual warfare."
  },
  {
    scroll_id: 'War Scroll',
    name: 'War Scroll (1QM)',
    date_range: '1st century BC',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'A liturgical-military manual for a prophesied forty-year war between the "Sons of Light" and the "Sons of Darkness."',
    manuscript_notes: "Its cosmic-battle imagery is close background for Revelation's war in heaven and Paul's \"armor of God\" (Ephesians 6)."
  },
  {
    scroll_id: 'Temple Scroll',
    name: 'Temple Scroll (11Q19)',
    date_range: '2nd–1st century BC',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'The longest scroll found at Qumran, laying out detailed plans for an idealized future Temple, written in God\'s own first-person voice.',
    manuscript_notes: 'It shows how urgently at least some Jews of this era were reimagining Temple worship — directly relevant background to Jesus\'s own Temple actions and to Hebrews\' argument about a better sanctuary.'
  },
  {
    scroll_id: 'Damascus Document',
    name: 'Damascus Document (CD)',
    date_range: '1st century BC (first found in Cairo in 1896, confirmed at Qumran in the 1940s–50s)',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'A sectarian history and law code describing a community in covenant exile, waiting for a coming "Teacher" figure.',
    manuscript_notes: 'Its picture of a faithful remnant living apart from a corrupted Jerusalem establishment is useful background for understanding groups like John the Baptist\'s wilderness movement.'
  },
  {
    scroll_id: 'Pesher Habakkuk',
    name: 'Pesher Habakkuk (1QpHab)',
    date_range: 'c. 50–25 BC',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'A verse-by-verse commentary reading the prophet Habakkuk as a direct, coded prediction of the Qumran community\'s own recent history.',
    manuscript_notes: "This \"pesher\" method — reading older prophecy as secretly about one's own present moment — is the same interpretive move the New Testament authors repeatedly make with Old Testament prophecy."
  },
  {
    scroll_id: 'Genesis Apocryphon',
    name: 'Genesis Apocryphon (1QapGen)',
    date_range: '1st century BC – 1st century AD',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'An Aramaic retelling and expansion of the Genesis patriarchal narratives — Noah, then Abram and Sarai in Egypt.',
    manuscript_notes: 'Also linked inline at Genesis 5–6 and Genesis 12 above, where the biblical text it expands is being read.'
  },
  {
    scroll_id: 'Thanksgiving Hymns',
    name: 'Thanksgiving Hymns (1QHᵃ — Hodayot)',
    date_range: '1st century BC',
    corresponding_book: null,
    corresponding_chapter_start: null,
    corresponding_chapter_end: null,
    placement: 'epoch',
    text_content: 'A collection of personal psalm-like hymns, many apparently composed by or for the community\'s founding "Teacher of Righteousness."',
    manuscript_notes: 'Their intense first-person language of unworthiness and grace rescued by God alone anticipates themes Paul develops at length, particularly in Romans.'
  },
];
