---
layout: post
title: "Using docking for prediction of binding poses of PXR ligands"
date: 2026-06-29 12:00:00
categories: computational-chemistry
tags: docking PXR DOCK MOPAC
---

A short write-up of the workflow I used to predict binding poses of PXR (pregnane X receptor) ligands by molecular docking.

### Method

- **Software:** [UCSF DOCK](https://dock.compbio.ucsf.edu/).
- **Receptor structure:** PDB entry **8SVX**, used as the docking target.
- **Grids:** generated with the standard settings -- **no optimization or hand-tuning of the scoring grids** was performed.
- **Ligand preparation:** the **standard UCSF DOCK ligand building pipeline** was followed to construct and prepare the ligands for docking.
- **Geometry fixes:** two ligand structures failed validation in the building pipeline. These two were re-optimized with **MOPAC** at the **PM7** semi-empirical level before being passed back into the docking workflow.

This is a deliberately lightweight setup -- default grids and the out-of-the-box ligand pipeline -- intended as a first pass at the binding poses rather than a finely tuned protocol.
