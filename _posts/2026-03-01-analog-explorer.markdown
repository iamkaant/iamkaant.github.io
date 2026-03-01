---
layout: post
title: "Analog Explorer: SAR Visualization by MCS Regions"
date: 2026-03-01 12:00:00
categories: chemistry tools
---

A browser-based SAR viewer that groups analogs of a parent compound by where they differ structurally, using Maximum Common Substructure (MCS) detection. Runs entirely in your browser via [RDKit.js](https://github.com/rdkit/rdkit-js) (WebAssembly) -- no installation required.

### How to use

1. Load molecules from an **SDF or SMILES file** (or paste SMILES/ID pairs directly into the text box).
2. Select the **parent molecule** -- either the first molecule in your input or a separate reference SMILES.
3. Click **Build grouped view**. The tool computes the MCS between the parent and each analog, then highlights atoms that fall outside the MCS (i.e., where the analog differs from the parent).
4. Analogs are arranged in **trays** grouped by the region of the parent they modify.

### Features

- **MCS-based highlighting** -- atoms outside the maximum common substructure are highlighted, immediately showing what changed between parent and analog.
- **ECFP4 similarity filter** -- slider to show only analogs above a chosen Tanimoto similarity threshold to the parent.
- **Custom SAR regions** -- define named regions by clicking atoms on the parent structure, then analogs are grouped by which region their change attaches to.
- **Auto left/middle/right grouping** -- automatic tray layout based on the spatial position of the change site in the 2D depiction.
- **Side drawer editor** -- click any analog thumbnail to open a detail view where you can toggle MCS highlights, drag atoms, rotate, or mirror the structure.
- **Configurable rendering** -- adjust atom label size, bond width, highlight radius, highlight color, and thumbnail size.
- **Data fields** -- load additional properties from SMILES columns or SDF tags and display them under each analog card.
- **High-resolution PNG export** -- export the grouped SAR view at up to 3× resolution.

<iframe src="/assets/analog-explorer.html"
        width="100%"
        height="1200px"
        frameborder="0"
        style="border: none;">
</iframe>
