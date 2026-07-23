# SWRV Kingdom Bible — App Store Submission Kit

Everything needed to get the app onto the Apple App Store. Sections marked
**[YOU — needs a Mac]** require macOS + Xcode + an Apple Developer account
($99/yr). Everything else is ready in this repo.

App identity (already set in `capacitor.config.json`):
- **App name:** SWRV Kingdom Bible
- **Bundle ID:** `com.swrvonthego.bible`
- **Live web app / API:** https://swrv-on-bs-bible.swrvonthego.workers.dev
- **Publisher:** SWRV On The Go LLC — Villa Rica, GA

---

## 1. Listing copy (paste into App Store Connect)

**App Name (30 char max):**
`SWRV Kingdom Bible`

**Subtitle (30 char max):**
`Bible study in original context`

**Promotional Text (170 char, editable anytime):**
`All 66 books, Hebrew & Greek word definitions, ancient Near East context, and read-aloud — built to show what Scripture actually meant to those who first read it.`

**Description:**
```
SWRV Kingdom Bible is a multi-source study Bible built for people who want to
understand what Scripture actually meant to the people who first read it —
not a watered-down retelling.

WHAT'S INSIDE
• All 66 books — full text, offline capable
• Tap any word to see the Hebrew or Greek behind it, with full lexicon depth
  (Strong's Hebrew & Greek, Brown-Driver-Briggs)
• Cultural & historical context from the ancient Near East, verse by verse
• Accurate people and place profiles drawn from the historical record
• Translation-loss flags that show where English narrows the original
• Read-aloud (text-to-speech) with selectable voices
• Fast search across verses, words, people, places, and lexicons
• Personal notes, bookmarks, and reading progress that sync when you sign in
• An Approved Library of companion texts (1 Enoch, Tobit, Judith, Wisdom,
  Sirach, 1-2 Maccabees, and more), each clearly labeled with its source

THE STANDARD
Every claim is traceable to a named source. Nothing added, nothing removed —
the text is the authority. Companion and non-canonical texts are shelved
separately and labeled honestly, never mixed into the 66 books.

Free to use. No ads. No tracking.
```

**Keywords (100 char max, comma-separated, no spaces):**
`bible,study,hebrew,greek,strongs,lexicon,scripture,kjv,septuagint,kingdom,enoch,concordance,gospel`

**Support URL:** `https://swrvonthego.pro`
**Marketing URL:** `https://swrvonthego.pro`
**Privacy Policy URL:** `https://swrv-on-bs-bible.swrvonthego.workers.dev/privacy.html`

**Primary category:** Reference
**Secondary category:** Education
**Age rating:** 4+ (no objectionable content)
**Price:** Free

---

## 2. App Privacy "nutrition label" (App Store Connect → App Privacy)

Answer the questionnaire to match `privacy.html`. Declare:

| Data type | Collected? | Linked to user? | Used for tracking? | Purpose |
|-----------|-----------|-----------------|--------------------|---------|
| Email address | Yes (only if user signs in) | Yes | No | App Functionality (account) |
| Name | Yes (only via Google sign-in) | Yes | No | App Functionality (account) |
| User Content (notes, bookmarks) | Yes | Yes | No | App Functionality (sync) |
| Other usage (reading progress) | Yes | Yes | No | App Functionality (sync) |

- **Tracking:** No. Do NOT enable App Tracking Transparency — the app does not track.
- Everything is optional and used only to run features the user chooses. Nothing
  is sold or used for advertising.
- If Google sign-in is not enabled at launch, you may omit "Name."

---

## 3. Screenshots & assets you'll upload **[YOU]**

Apple requires screenshots at these sizes (take them in the iOS Simulator or on device):
- 6.9" iPhone (1320 × 2868) — required
- 6.5" iPhone (1242 × 2688) — required
- 13" iPad (2064 × 2752) — required only if you ship an iPad build

Good screens to capture (5-8 total):
1. A chapter open with the multi-source verse text
2. A tapped word showing the Hebrew/Greek definition card
3. Search results (e.g. "bone of my bone" → Genesis 2:23 + the word study)
4. A cultural-context card
5. The Library of companion texts
6. Read-aloud bar active

App icon for the store: `assets/icons/icon-1024.png` (already 1024×1024, present).

---

## 4. Build & submit **[YOU — needs a Mac + Apple Developer account]**

From a Mac with Xcode installed, in a clone of this repo on branch `main`:

```bash
npm install
npx cap add ios            # generates the ios/ Xcode project (first time only)
npx cap sync ios           # copies the web app + config into the iOS project
npx cap open ios           # opens the project in Xcode
```

In Xcode:
1. Select the **App** target → **Signing & Capabilities** → choose your Team
   (your Apple Developer account). Xcode auto-manages the provisioning profile.
2. Set the **Version** (e.g. `1.0.0`) and **Build** (e.g. `1`).
3. Choose **Any iOS Device (arm64)** as the destination.
4. **Product → Archive**. When the Organizer opens, click **Distribute App →
   App Store Connect → Upload**.

In App Store Connect (appstoreconnect.apple.com):
1. **My Apps → +** → New App. Platform iOS, Bundle ID `com.swrvonthego.bible`,
   SKU `swrv-kingdom-bible`.
2. Fill in the listing from Section 1, upload screenshots (Section 3), and
   complete **App Privacy** (Section 2).
3. Under **Build**, select the build you uploaded from Xcode.
4. **Add for Review → Submit**.

Typical review time is 1-3 days.

---

## 5. Before you submit — checklist

- [ ] `ELEVENLABS_API_KEY` added as a Cloudflare Worker secret, so read-aloud
      uses real voices (otherwise it falls back to the device voice — still
      works, just robotic). Verify at `/api/health` → `hasElevenLabsKey: true`.
- [ ] Privacy policy live at the URL above (it deploys with the site).
- [ ] App opens offline after first load (airplane-mode test).
- [ ] Sign-in works (email at minimum; Google only if you enabled the provider
      in Supabase — otherwise it shows a clean "use email" message).
- [ ] No red errors in Safari Web Inspector when the app runs.

---

## 6. Guideline 4.2 note ("minimum functionality")

Apple can reject apps that are just a website in a wrapper. This app's defense:
it works offline with the full Bible bundled, has real search, a tap-to-define
lexicon, notes, and read-aloud — native-feeling depth, not a thin web view.
Keep the offline-first behavior; it is the strongest argument for approval.
