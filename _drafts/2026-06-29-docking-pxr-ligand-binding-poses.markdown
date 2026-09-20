---
layout: post
title: "Using docking for prediction of binding poses of PXR ligands"
date: 2026-06-29 12:00:00
categories: computational-chemistry
tags: docking PXR DOCK MOPAC
---

A write-up of the workflow I used to dock ligands of the pregnane X receptor (PXR, gene *NR1I2*, UniProt [O75469](https://www.uniprot.org/uniprotkb/O75469/entry)) and to validate the setup by retrospective enrichment before trusting the predicted poses.

### Tools used

- **[UCSF DOCK](https://dock.compbio.ucsf.edu/)** -- molecular docking and the ligand/decoy building pipeline.
- **[TLDR](https://tldr.docking.org/)** -- web-based ligand and decoy preparation (with heavier jobs submitted to the **Wynton** HPC cluster).
- **Juggler** -- matching-sphere optimization for the docking grids (code currently in a private repository; see the [guide on wiki.docking.org](https://wiki.docking.org/index.php?title=Juggler)).
- **MOPAC** (PM7 semi-empirical) -- geometry re-optimization of ligands that failed the build.
- **Schrödinger Maestro** -- receptor preparation (loop/cap fixing, alternative-conformation selection).
- **[ChEMBL](https://www.ebi.ac.uk/chembl/explore/target/CHEMBL3401)** -- source of actives and property-matched decoys.
- **RDKit** -- SMILES handling, physicochemical properties, and Tanimoto clustering.

### Method

- **Software:** [UCSF DOCK](https://dock.compbio.ucsf.edu/).
- **Receptor structure:** PDB entry **8SVX**, used as the docking target.
- **Grids:** generated with the standard settings -- I did try optimizing them, but **no hand-tuned grid beat the defaults** (see below).
- **Ligand preparation:** the **standard UCSF DOCK ligand building pipeline** was followed to construct and prepare the ligands for docking.
- **Geometry fixes:** a couple of ligand structures failed validation in the building pipeline. These were re-optimized with **MOPAC** at the **PM7** semi-empirical level before being passed back into the docking workflow.

### Ligands

I pulled ligands from two sources: co-crystallized PDB ligands and bioactivity data from ChEMBL ([CHEMBL3401](https://www.ebi.ac.uk/chembl/explore/target/CHEMBL3401)).

**PDB ligands.** Starting from 71 entries I ended up with **54 unique ligands**. A handful had to be treated with care: 7AXG carries a tributyltin, 4J5W an Mg²⁺, and 7AX8/8SVU/4XAO contain cosolvents rather than genuine binders. Two structures have ambiguous occupancy of the pocket -- 7AXJ holds two ligands at once (so clotrimazole's pose there is unreliable) and 8CCT has two copies of its ligand. Some of these were not built cleanly by TLDR, so the ligand and decoy building was submitted on the Wynton cluster.

**ChEMBL ligands.** For the actives/decoys set I set the activity cutoff at **10 µM** and required `standard_relation` to be `=` (not `<`), which gave **1057 actives + 2801 decoys = 3858** compounds. Because ChEMBL contains duplicate measurements with conflicting activities, I deduplicated by keeping a single row only when all measurements for a compound agreed (all < 10⁴ nM or all > 10⁴ nM) and dropping the compound entirely when the values were mixed and therefore unreliable. After filtering to viable SMILES with a heavy-atom count ≤ 50 and clustering at 0.5 Tanimoto to remove near-duplicates, the working set was:

- **515 actives** (148 cluster heads)
- **1539 decoys** (897 cluster heads)

On this set the retrospective docking reached a **LogAUC of 0.2582 ± 0.0355**. Restricting to the cleanest cases (actives < 1 µM, decoys > 30 µM) gave **0.2024 ± 0.0783** over 1000 bootstrap samples.

![Linear-log ROC plot for the ChEMBL actives vs. decoys, normalized LogAUC 0.258](/assets/images/pxr-chembl-roc.png)
*Retrospective enrichment on the ChEMBL set: the ROC curve sits well above the random-classifier diagonal (normalized LogAUC 0.258).*

I also experimented with Brian's suggestion of *anti-decoys* -- compounds structurally similar to the actives but physicochemically dissimilar. Searching the actives against a similarity library and keeping a Tanimoto threshold of 0.65 gave a genuinely close-in decoy set (~1135 decoys for 79 parents, most at Tc 0.65–0.9):

![Tanimoto similarity distribution of the anti-decoys to their parent actives, centered around 0.65-0.9](/assets/images/pxr-antidecoy-similarity.png)
*Structural similarity of the anti-decoys to their parent compounds -- by construction they overlap heavily with the actives.*

Plain anti-decoys actually hurt enrichment (negative LogAUC, i.e. worse than random), but limiting them to analogs with a logP difference ≥ 2 from the parent recovered a positive signal. The regular decoy set stayed the stronger benchmark, so it was used for the final validation.

### Receptor structure

The PXR ligand-binding domain is remarkably rigid: the backbone is nearly identical across all deposited structures, the AlphaFold model matches it, and apo (4XAO), agonist- (8SVR) and antagonist-bound (8SVP) structures superimpose. All crystal structures in the PDB are agonist-bound active states. A few binding-site residues (e.g. Met243, Ser247) show alternative conformations, but most are fixed.

My first pick was **9FZJ** for its 1.60 Å resolution, but I switched to **8SVX** (2.14 Å, bound to a 3.6 nM antagonist) so that the ligands from the same paper would fit the pocket geometry. The binding site there is clean apart from Cys284, for which I kept the major conformation (0.54 occupancy). Residue 312 had to be patched -- Maestro left it unfilled and inserted two overlapping caps, which I removed.

For reference, the pocket features I paid attention to were:

- a **"π-trap"** of F288, W299 and Y306. W299 is critical for coupling ligand binding to helix-12 positioning (the W299A mutation flips antagonists into agonists).
- a **"leucine cage"** of L206, L209, L239 and L240.
- **helix 12 (H12)** residues L428 and F429.
- in the ChEMBL docking, recurring H-bonds to Gln285, His407, Ser247 and the Val211 backbone.

### Grid optimization

I spent some time trying to beat the default scoring grids and, in short, did not.

- **A hidden HAC cap.** The initial `INDOCK` had a maximum heavy-atom count of 25, which quietly excluded larger actives. Raising the cap to 100 dropped the all-ChEMBL LogAUC to ~0.189 but on a fairer, complete set of molecules.
- **Bump filter.** Loosening the bump allowance from 100 → 1000 → 10 000 monotonically degraded enrichment (0.189 → 0.136 → 0.108 → 0.107), so the tightest setting was kept.
- **Sphere optimization (Juggler).** A 40–50 sphere run converged in 5 steps but left LogAUC essentially unchanged (~0.19); a longer 50–60 sphere run cleared only 6 stages with a similar score.

![Linear-log ROC plot after 40-50 sphere optimization, normalized LogAUC 0.19](/assets/images/pxr-grid-spheres-roc.png)
*Sphere optimization converged but did not move the needle -- LogAUC ≈ 0.19, essentially the default.*

![Linear-log ROC plot with the bump filter loosened to 1000, normalized LogAUC 0.072](/assets/images/pxr-grid-bump1000-roc.png)
*Loosening the bump filter (here to 1000) collapses enrichment toward random (LogAUC 0.072).*

Across all of these, the **out-of-the-box 8SVX grid remained the best**, landing around LogAUC 0.18–0.19. So the final protocol is deliberately lightweight -- default grids and the standard ligand pipeline -- which the retrospective enrichment showed to be as good as anything I hand-tuned.

*Note: I used Claude to summarize my chaotic notes into something resembling a narrative*
