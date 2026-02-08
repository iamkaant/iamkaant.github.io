---
layout: post
title: "Interactive Molecular Structure Alignment & Highlighting"
date: 2026-02-05 12:00:00
categories: chemistry tools
---

A browser-based tool for aligning molecular structures to a common reference scaffold and highlighting the differences. It runs entirely in your browser using [RDKit.js](https://github.com/rdkit/rdkit-js) (WebAssembly) -- no installation required.

### How to use

1. Prepare a **SMILES file** (tab-separated: SMILES, Catalog ID, and any additional properties) or an **SDF file** with your molecules.
2. Enter a **reference SMILES** representing the common scaffold you want to align against.
3. Click **Load & Align**. The tool will find the maximum common substructure (MCS) between the reference and each molecule, align their 2D coordinates, and highlight atoms that differ from the reference in green.

### Features

- **Interactive highlighting** -- toggle Edit Highlights mode and click individual atoms to add or remove highlights.
- **Structure editing** -- drag atoms to reposition them and fine-tune the 2D layout of any molecule. Atom click targets are pixel-accurate, derived directly from RDKit's rendered SVG coordinates.
- **Rotation & mirroring** -- adjust the orientation of any selected molecule while keeping atom labels upright.
- **Atom selector dialog** -- bulk select/deselect atoms for highlighting via checkboxes.
- **Configurable labels** -- choose font size and which molecular property to display as a second line (e.g., price, MW).
- **Highlight appearance** -- adjust the highlight radius and pick a custom highlight color.
- **High-resolution PNG export** -- export the entire grid at 2x resolution for publications or presentations.

<iframe src="/assets/molecular-alignment.html"
        width="100%"
        height="1200px"
        frameborder="0"
        style="border: none;">
</iframe>
