---
layout: post
title: "Getting fancy orbital pictures using gOpenMol"
date: 2020-12-06 16:13:48
categories: computational-chemistry
tags: gaussian gOpenMol images
---

Suppose you want to get nice molecular orbital renderings for your paper or a blog post. Let's do it using gOpenMol. It is an old program, developed by Leif Laaksonen. It was available at the web-site of [IT CENTER FOR SCIENCE](https://www.csc.fi/en/home) earlier, but only a [manual](https://research.csc.fi/documents/48467/185207/gopenmol.pdf/3c2c527d-8ff0-43b0-8bb5-ac754867de2f) is still there. I managed to download the program itself from [Softpedia](https://www.softpedia.com/get/Science-CAD/gOpenMol.shtml), and tested it uder Win7. As gOpenMol is an old piece of software, you will need a .fchk file made by Gaussian03. I tried to use G09-generated files, but the program crashes.

1. Prepare .fchk file. You will get a .chk file after a Gaussian calculation. Then perform a following command:

    ```
    formchk 1.chk
    ```

2. Launch gOpenMol and open `Tools > Plugins > FCHK Handling`. Press `Browse` in the opened window, select your .fchk file and press `Load`. You will get something like this:

    ![FCHK Handling dialog](/assets/images/fchk.png)

3. Set all `Grid parameters` to 60 (for smoother surfaces). Press `Reset Grain`.

4. Select option `Use selected orbital` and choose needed orbital. Filled MOs are denoted by asterisk in the list and ordered by energy ascending. Then press `Calculate Grid`. You will need to repeat this part as many times as the number of orbitals you want to render.

5. Close the window by pressing `Dismiss`.

6. Change the background color to white. `View > Background color > Color`. Choose white and press `OK`.

7. Change the rendering style to balls&sticks. `View > Atom type`. Select `Licorice` in the opened window. Change the thickness of bond cylinders to 0.15 in the `Cyl.rad` field. Press `Apply` and close the window.

8. Let's show the orbitals, finally! `Plot > Contour` will open the following window:

    ![Contour rendering dialog](/assets/images/rend.png)

    Orbitals with the grids calculated at step 4 will appear in the upper list. Choose one of them.

9. Put two thresholds in the first and second rows of the field named `Define contour levels`. In my case 0.04 and -0.04 were good.

10. Select colors for the positive and negative regions. I prefer dark blue and gray.

11. Press apply.

    ![Orbital rendering result](/assets/images/orb.png)

12. It's not over yet! Press green `Details...` button next to the field with entered threshold and put the settings in the window that appears as follows:

    ![Details settings dialog](/assets/images/sett.png)

13. After all the settings are done, press `Apply` and close the window. Do the same for the second threshold value in the `Define contour levels` field.

14. Almost ready. Rotate and zoom your molecule as you like. 3D rotation is done with the left mouse button pressed, the right mouse button is for zooming, and for 2D rotation you need to keep the mouse wheel pressed. Final image size will correspond to the window size, so it's better to make your molecule as big as you can. Use `Edit > Rotate/Translate` to place the molecule at the center and to translate it.

15. Save the image by choosing `File > Hardcopy...` Select BMP, enter the file name and location using `Browse` button and save the image by pressing `Apply`.

Done!

![Final rendered molecule](/assets/images/mol.png)

This way of preparation orbital images was used in our paper Kirilchuk, A. A.; Rozhenko, A. B.; Leszczynski, J. On Structure and Stability of Pyrimidine Ylidenes and Their Homologues. *[Comput. Theor. Chem.](https://doi.org/10.1016/j.comptc.2017.01.024)* **2017**, *1103*, 83--91.
