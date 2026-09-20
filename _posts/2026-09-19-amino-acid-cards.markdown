---
layout: post
title: "Amino Acid Cards: Spaced Repetition for the 20 Residues"
date: 2026-09-19 12:00:00
categories: chemistry tools learning
---

<iframe src="/assets/amino-acid-cards.html"
        width="100%"
        height="860px"
        frameborder="0"
        style="border: none;">
</iframe>

Every structural biology course starts with the same wall: twenty side chains, twenty names, twenty one-letter codes that mostly do not match the first letter of the name. A browser-based flashcard deck for exactly that, with a Leitner box scheduler and real 2D depictions of each side chain. Runs entirely in your browser -- nothing to install, no account, and your progress stays in your own browser's local storage.

### How to use

1. Pick what the deck should **ask you** -- letter → name, name → letter, structure → name, or name → structure (or shuffle all four).
2. Answer the card. The letter/name modes are multiple choice; the structure modes are self-graded -- reveal the answer, then say whether you got it.
3. Rate yourself honestly. **Got it** promotes the residue one Leitner box; **Not yet** demotes it and pushes the card back three places in the current pass, so you see it again before the session ends.
4. Work through the pass. The strip along the bottom is your whole deck at a glance -- each letter brightens as its box goes up, and clicking one jumps straight to that residue.

### Features

- **Leitner scheduling (5 boxes)** -- cards you miss come back soon, cards you know drift to the back. Progress persists between visits.
- **Four question directions** -- recognition and recall are different skills, and going name → structure is a lot harder than the reverse.
- **Confusable distractors** -- the multiple-choice options are not random. Asn pulls Gln and Asp, Lys pulls Arg, Phe pulls Tyr and Trp. If you can tell those apart you actually know them.
- **Real side-chain depictions** -- each residue is drawn as a proper 2D structure rather than a photograph of a textbook page.
- **Family filters** -- restrict the deck to nonpolar aliphatic, aromatic, polar uncharged, acidic, basic, or the special cases (Gly and Pro) when you want to drill one group.
- **A hook per residue** -- a mnemonic for the one-letter code, plus a note on what the side chain actually does in a protein.
- **Keyboard driven** -- `1`–`4` pick a multiple-choice option, `space` reveals, `←`/`→` grade the self-graded cards.
- **Dim mode** -- a brightness control, because this is the kind of thing you end up doing in bed the night before an exam.

### Notes

Progress is stored in your browser under `aa.progress.v1` -- it does not sync across devices, and clearing site data resets the deck. **Clear all progress** in the Deck panel does the same thing deliberately.
