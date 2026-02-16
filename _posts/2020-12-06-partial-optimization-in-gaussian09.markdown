---
layout: post
title: "Partial optimization in Gaussian09"
date: 2020-12-06 15:05:19
categories: computational-chemistry
tags: gaussian QC tips
---

![Molecular structure](/assets/images/7a_ts.jpg)

There are several ways to do partial optimization (freeze coordinates) in Gaussian.

- One of them is to add "**ModRedundant**" to [**Opt**](https://gaussian.com/opt/) or **Geom** keyword and to write

```
F1
F2
F3
...
```

after coordinate section. "**F**" here means freeze, and integer stands for atom number.

- Another one is to add "**ReadOpt**" to **Opt** keyword and to add

```
noatoms atoms=1-4
```

after Cartesians. This will exclude the first four atoms from optimization. BTW, you definitely should read the section about "**ReadOptimize**" option if you haven't before.

- The third one is using a *[freeze-code](https://gaussian.com/molspec/)*. I came across this method in the [post](https://www.researchgate.net/post/Anybody_familiar_with_the_freezing_of_atoms_in_gaussian_software) at ResearchGate portal. The idea is [simple](https://gaussian.com/oniom/): you add **0** (or nothing) between an atom symbol and its coordinates if the position of the atom should be optimized, and **-1** if you want to freeze it.

```
C   0   1.5841970000         -2.9056620000          0.0000300000
C  -1   3.2294750000          0.7041530000          0.0001550000
```

The first atom in the example will be included in the optimization and the second will be frozen.

Just that simple!

And something more: if you restart your optimization from .chk file, freezing will be preserved. Enjoy!

P.S. Also check Dr. Barroso's post on the [topic](https://joaquinbarroso.com/2015/11/09/partial-optimizations-with-gaussian09/).

