---
layout: post
title: "Our New Work on the Liquid Flow through Membranes"
date: 2021-03-20 18:38:10
categories: research
tags: flow graphite-oxide nano
---

Arguing with Nobel laureates is not an everyday thing for a scientist. Yet that was exactly what we had to do quite recently. Working on the paper "[Liquid Flow through Defective Layered Membranes: A Phenomenological Description](https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.14.044038)" was an important and exciting time for me.

![Model of a GO membrane and a schematic route of water through it](/assets/images/go_membrane-2.png)
*Model of a GO membrane and a schematic route of water through it*

Nanomaterials represent great promise for almost all areas of human life. Every researcher working in the field feel great excitement about them and wants to find a killer application. It does not always happen quickly though. For example, "[nano emissive display](https://www.azonano.com/article.aspx?ArticleID=259)", a technology, developed in the early 2000s, is still not on the market. So, the years have passed in studying properties of carbon nanotubes, graphene and buckyballs, but we are still not using them in our everyday life as wide as the futurists predicted. However, disregards how strongly we want to make progress in this direction, it does not mean that rigorous checkup of the experimental results and underlying theoretical concepts can be ignored...

We have met claims about the magical properties of graphene and graphene oxide (GO) for water filtration. They were mostly about the "ultrafast water flow" through the membranes made of GO. These claims were published in several papers by the research group of prominent Andre Geim ([1](https://science.sciencemag.org/content/335/6067/442), [2](https://science.sciencemag.org/content/343/6172/752)). In these works, water flow through GO membranes was measured and compared to the calculated values based on an idealized membrane. The discrepancies of several orders of magnitude were found and the authors attributed them to the unique effects of the membrane materials used. The setup and conclusions of the works were largely discussed by experimentalists and theoreticians ([3](https://pubpeer.com/publications/369B42246A53878677399C3A5172A4), [4](https://onlinelibrary.wiley.com/doi/abs/10.1002/adfm.201202601), [5](https://www.sciencedirect.com/science/article/abs/pii/S0376738817316058?via%3Dihub), [6](https://arxiv.org/abs/1812.03941)).

Although we share the excitement about the bright future of nanomaterials, our skepticism calls us to check the theoretically calculated values first. The biggest concern was that the actual structure of the membrane in solution may be different from the one that is elucidated by the examination of parts of dry membrane. As the pore diameter enters the equation of liquid flow through a membrane in 4th power, even a small error in the average pore diameter estimate can make a big difference in the calculated flow speeds.

So what we have done in the paper boils down to the following. Firstly, we checked if the Hagen-Poiselle law describing laminar water flow through a pipe holds for nanopores. It does. Then we took an ideal membrane with the known density of pores of known diameter and calculated flow speed through it. After that we modeled the different types of defects in the membrane and looked at how the permeability changes. Not surprisingly, one can easily change the permeability entering relatively small defects in the membrane structure. Sparse micrometer-wide holes had the biggest effect, changing the total flow by a factor of 10^6!

The main modeling takeaways were:

- small defects make a big difference. Modifying thickness of a membrane or pore densities in some regions can change the membrane permeability dramatically
- proper estimation of pore densities and sizes is extremely important, very difficult (and maybe impossible...). The main difficulty is swelling. GO membranes are known to change geometry and size in water, and one needs to find out the pore parameters exactly in the swelled state, while electron microscopy is done in the dry state.

For me the excitement of the work was not only in the debatable subject, but also in the methods used. As a computational chemist, I tend to make computational experiments, i.e. use complicated software to solve some problem. But here I had to use simple equations to model the membrane permeability. I have done it before during my undergrad studies, for a subject named "Processes and Apparatus of Chemical Technology", which has a section on "Fluid Flow and Heat Transfer". I must admit, that was not the most inspiring discipline I was taught, but now I am excited to use part of the knowledge in this work.

I would like to thank [**Professor David Tomanek**](https://nanoten.com/tomanek/index.html) for the inspiration and driving the effort. And my special thanks go to **Inna Barysh** and **The Fulbright Office in Ukraine** for all their help and making my fellowship at MSU real!

[Quandt, A., Kyrylchuk, A., Seifert, G., & Tomanek, D. (2020). Liquid Flow through Defective Layered Membranes: A Phenomenological Description. *Physical Review Applied*, *14*(4), 044038.](https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.14.044038)
