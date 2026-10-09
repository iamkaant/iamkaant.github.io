// A rotating ball-and-stick molecule, ray-cast into shaded ASCII.
// Click fetches a random compound with a 3D conformer from PubChem.
// Markup lives in _includes/ascii-hero.html, styles in assets/main.scss.
// Built-in coordinates: RDKit ETKDG + MMFF, all hydrogens, aligned on principal axes.
(function () {
  var root = document.getElementById('ascii-mol');
  var pre = root.querySelector('.ascii-field');
  var cap = root.querySelector('.ascii-caption');
  var LIBRARY = [{"name":"caffeine","formula":"C8H10N4O2","atoms":[["C",-3.22,-0.84,-0.0],["N",-2.16,0.12,0.0],["C",-2.3,1.49,0.0],["N",-1.13,2.1,0.0],["C",-0.22,1.08,0.0],["C",-0.82,-0.14,0.0],["C",-0.09,-1.36,0.0],["O",-0.64,-2.46,0.0],["N",1.29,-1.17,0.0],["C",1.95,0.08,0.0],["O",3.18,0.15,0.0],["N",1.15,1.22,-0.0],["C",1.75,2.55,-0.0],["C",2.15,-2.34,-0.0],["H",-4.19,-0.32,-0.0],["H",-3.14,-1.46,-0.9],["H",-3.14,-1.46,0.9],["H",-3.26,1.98,-0.0],["H",1.42,3.09,-0.89],["H",1.42,3.09,0.89],["H",2.84,2.5,-0.0],["H",2.79,-2.31,0.89],["H",2.79,-2.31,-0.89],["H",1.58,-3.27,0.0]],"bonds":[[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[6,8,1],[8,9,1],[9,10,2],[9,11,1],[11,12,1],[8,13,1],[5,1,1],[11,4,1],[0,14,1],[0,15,1],[0,16,1],[2,17,1],[12,18,1],[12,19,1],[12,20,1],[13,21,1],[13,22,1],[13,23,1]],"cid":2519},{"name":"serotonin","formula":"C10H12N2O","atoms":[["C",-3.33,-0.02,-0.29],["C",-2.69,1.22,-0.3],["C",-1.32,1.24,-0.01],["C",-0.59,0.09,0.29],["C",-1.26,-1.15,0.3],["C",-2.63,-1.18,0.01],["O",-3.24,-2.4,0.03],["C",0.77,0.49,0.54],["C",0.81,1.86,0.38],["N",-0.44,2.3,0.05],["C",1.91,-0.4,0.89],["C",2.63,-1.01,-0.32],["N",3.48,-0.05,-1.03],["H",-4.4,-0.06,-0.51],["H",-3.23,2.13,-0.53],["H",-0.73,-2.07,0.53],["H",-4.18,-2.27,-0.2],["H",1.63,2.56,0.46],["H",-0.69,3.26,-0.13],["H",1.54,-1.22,1.52],["H",2.63,0.15,1.51],["H",1.9,-1.43,-1.03],["H",3.26,-1.84,0.02],["H",4.19,0.31,-0.4],["H",3.97,-0.53,-1.78]],"bonds":[[0,1,1],[1,2,2],[2,3,1],[3,4,2],[4,5,1],[5,6,1],[3,7,1],[7,8,2],[8,9,1],[7,10,1],[10,11,1],[11,12,1],[5,0,2],[9,2,1],[0,13,1],[1,14,1],[4,15,1],[6,16,1],[8,17,1],[9,18,1],[10,19,1],[10,20,1],[11,21,1],[11,22,1],[12,23,1],[12,24,1]],"cid":5202},{"name":"aspirin","formula":"C9H8O4","atoms":[["C",-3.41,-0.48,-0.04],["C",-1.98,-0.51,-0.47],["O",-1.6,-0.49,-1.63],["O",-1.17,-0.59,0.67],["C",0.19,-0.52,0.36],["C",0.88,-1.74,0.32],["C",2.25,-1.74,0.06],["C",2.92,-0.54,-0.16],["C",2.23,0.67,-0.11],["C",0.85,0.7,0.16],["C",0.12,1.98,0.26],["O",-1.05,2.14,0.56],["O",0.89,3.04,-0.04],["H",-3.67,-1.42,0.45],["H",-4.05,-0.36,-0.92],["H",-3.59,0.36,0.63],["H",0.36,-2.67,0.5],["H",2.79,-2.69,0.01],["H",3.99,-0.55,-0.37],["H",2.78,1.6,-0.27],["H",0.28,3.81,0.04]],"bonds":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[10,12,1],[9,4,1],[0,13,1],[0,14,1],[0,15,1],[5,16,1],[6,17,1],[7,18,1],[8,19,1],[12,20,1]],"cid":2244},{"name":"dopamine","formula":"C8H11NO2","atoms":[["C",-0.5,1.3,0.26],["C",-1.87,1.37,0.04],["C",-2.6,0.19,-0.06],["C",-1.97,-1.04,0.05],["C",-0.6,-1.12,0.28],["C",0.15,0.05,0.39],["C",1.64,-0.02,0.61],["C",2.42,-0.01,-0.72],["N",3.86,-0.08,-0.5],["O",-2.7,-2.2,-0.05],["O",-3.95,0.19,-0.28],["H",0.08,2.22,0.34],["H",-2.35,2.34,-0.05],["H",-0.13,-2.1,0.36],["H",1.95,0.83,1.23],["H",1.88,-0.92,1.19],["H",2.19,0.89,-1.29],["H",2.11,-0.87,-1.34],["H",4.16,0.69,0.09],["H",4.09,-0.93,0.01],["H",-3.61,-1.89,-0.2],["H",-4.25,1.12,-0.34]],"bonds":[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,6,1],[6,7,1],[7,8,1],[3,9,1],[2,10,1],[5,0,1],[0,11,1],[1,12,1],[4,13,1],[6,14,1],[6,15,1],[7,16,1],[7,17,1],[8,18,1],[8,19,1],[9,20,1],[10,21,1]],"cid":681},{"name":"nicotine","formula":"C10H14N2","atoms":[["C",-0.9,1.44,1.13],["N",-1.09,1.02,-0.26],["C",-2.5,0.7,-0.51],["C",-2.68,-0.77,-0.14],["C",-1.27,-1.34,-0.03],["C",-0.38,-0.24,-0.61],["C",1.1,-0.27,-0.3],["C",1.71,-1.32,0.38],["N",3.04,-1.39,0.65],["C",3.8,-0.37,0.22],["C",3.31,0.72,-0.48],["C",1.94,0.76,-0.74],["H",-1.49,2.34,1.33],["H",-1.2,0.67,1.86],["H",0.14,1.71,1.33],["H",-3.2,1.35,0.02],["H",-2.71,0.83,-1.58],["H",-3.21,-0.88,0.82],["H",-3.26,-1.3,-0.9],["H",-1.05,-1.54,1.02],["H",-1.17,-2.28,-0.58],["H",-0.43,-0.34,-1.71],["H",1.15,-2.18,0.74],["H",4.86,-0.45,0.45],["H",3.96,1.52,-0.81],["H",1.52,1.6,-1.29]],"bonds":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[5,1,1],[11,6,1],[0,12,1],[0,13,1],[0,14,1],[2,15,1],[2,16,1],[3,17,1],[3,18,1],[4,19,1],[4,20,1],[5,21,1],[7,22,1],[9,23,1],[10,24,1],[11,25,1]],"cid":89594},{"name":"paracetamol","formula":"C8H9NO2","atoms":[["C",-3.72,-0.14,0.0],["C",-2.36,0.53,-0.0],["O",-2.26,1.75,-0.03],["N",-1.33,-0.39,0.01],["C",0.06,-0.13,0.0],["C",0.61,1.16,0.01],["C",2.0,1.33,0.0],["C",2.83,0.22,0.0],["C",2.31,-1.06,-0.0],["C",0.92,-1.23,-0.0],["O",4.18,0.44,-0.0],["H",-3.98,-0.42,-1.02],["H",-3.71,-1.03,0.64],["H",-4.46,0.56,0.39],["H",-1.59,-1.37,0.0],["H",-0.01,2.05,0.01],["H",2.42,2.33,0.01],["H",2.95,-1.94,-0.01],["H",0.52,-2.25,-0.0],["H",4.64,-0.42,-0.0]],"bonds":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,9,1],[7,10,1],[9,4,2],[0,11,1],[0,12,1],[0,13,1],[3,14,1],[5,15,1],[6,16,1],[8,17,1],[9,18,1],[10,19,1]],"cid":1983},{"name":"melatonin","formula":"C13H16N2O2","atoms":[["C",-5.59,1.39,0.16],["C",-4.47,0.54,0.71],["O",-4.52,0.05,1.83],["N",-3.41,0.39,-0.16],["C",-2.19,-0.28,0.27],["C",-1.4,-0.82,-0.91],["C",-0.11,-1.45,-0.49],["C",0.11,-2.79,-0.22],["N",1.42,-2.96,0.13],["C",2.07,-1.75,0.1],["C",1.15,-0.79,-0.28],["C",1.58,0.55,-0.39],["C",2.91,0.89,-0.11],["C",3.81,-0.1,0.28],["C",3.41,-1.44,0.39],["O",3.19,2.22,-0.25],["C",4.52,2.63,0.04],["H",-5.55,2.38,0.62],["H",-6.54,0.91,0.39],["H",-5.51,1.5,-0.92],["H",-3.34,1.05,-0.92],["H",-2.45,-1.09,0.97],["H",-1.6,0.46,0.83],["H",-1.19,-0.02,-1.63],["H",-2.0,-1.56,-1.45],["H",-0.57,-3.64,-0.25],["H",1.84,-3.84,0.39],["H",0.88,1.33,-0.69],["H",4.84,0.13,0.5],["H",4.11,-2.21,0.69],["H",5.24,2.16,-0.64],["H",4.78,2.43,1.09],["H",4.58,3.71,-0.11]],"bonds":[[0,1,1],[1,2,2],[1,3,1],[3,4,1],[4,5,1],[5,6,1],[6,7,2],[7,8,1],[8,9,1],[9,10,1],[10,11,2],[11,12,1],[12,13,2],[13,14,1],[12,15,1],[15,16,1],[10,6,1],[14,9,2],[0,17,1],[0,18,1],[0,19,1],[3,20,1],[4,21,1],[4,22,1],[5,23,1],[5,24,1],[7,25,1],[8,26,1],[11,27,1],[13,28,1],[14,29,1],[16,30,1],[16,31,1],[16,32,1]],"cid":896},{"name":"ibuprofen","formula":"C13H18O2","atoms":[["C",-4.74,-0.44,0.09],["C",-3.28,-0.03,0.34],["C",-3.16,1.49,0.29],["C",-2.37,-0.72,-0.7],["C",-0.9,-0.56,-0.41],["C",-0.11,0.29,-1.2],["C",1.26,0.44,-0.93],["C",1.86,-0.25,0.13],["C",1.07,-1.1,0.92],["C",-0.3,-1.25,0.65],["C",3.34,-0.09,0.45],["C",3.7,1.35,0.8],["C",4.26,-0.58,-0.66],["O",4.06,-0.57,-1.87],["O",5.44,-1.03,-0.19],["H",-5.08,-0.13,-0.9],["H",-4.86,-1.52,0.16],["H",-5.4,0.02,0.83],["H",-3.01,-0.37,1.35],["H",-2.15,1.81,0.56],["H",-3.39,1.88,-0.71],["H",-3.85,1.96,1.0],["H",-2.6,-0.35,-1.7],["H",-2.59,-1.8,-0.73],["H",-0.54,0.83,-2.03],["H",1.84,1.09,-1.57],["H",1.5,-1.65,1.75],["H",-0.89,-1.91,1.27],["H",3.56,-0.71,1.33],["H",3.07,1.73,1.61],["H",4.74,1.43,1.12],["H",3.57,2.02,-0.06],["H",5.92,-1.3,-1.0]],"bonds":[[0,1,1],[1,2,1],[1,3,1],[3,4,1],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,9,1],[7,10,1],[10,11,1],[10,12,1],[12,13,2],[12,14,1],[9,4,2],[0,15,1],[0,16,1],[0,17,1],[1,18,1],[2,19,1],[2,20,1],[2,21,1],[3,22,1],[3,23,1],[5,24,1],[6,25,1],[8,26,1],[9,27,1],[10,28,1],[11,29,1],[11,30,1],[11,31,1],[14,32,1]],"cid":3672},{"name":"adrenaline","formula":"C9H13NO3","atoms":[["C",-3.83,-0.74,0.15],["N",-3.19,0.36,-0.56],["C",-1.74,0.13,-0.73],["C",-0.94,0.34,0.58],["C",0.55,0.3,0.34],["C",1.22,-0.94,0.35],["C",2.59,-0.99,0.09],["C",3.31,0.18,-0.14],["C",2.67,1.41,-0.17],["C",1.29,1.47,0.07],["O",4.66,0.13,-0.3],["O",3.2,-2.2,0.04],["O",-1.33,1.6,1.15],["H",-3.48,-0.82,1.18],["H",-4.91,-0.55,0.19],["H",-3.68,-1.69,-0.37],["H",-3.61,0.43,-1.49],["H",-1.54,-0.86,-1.16],["H",-1.39,0.86,-1.47],["H",-1.2,-0.42,1.32],["H",0.68,-1.86,0.53],["H",3.23,2.32,-0.36],["H",0.79,2.43,0.05],["H",4.99,-0.45,0.4],["H",3.94,-2.1,-0.59],["H",-2.28,1.68,0.92]],"bonds":[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,5,2],[5,6,1],[6,7,2],[7,8,1],[8,9,2],[7,10,1],[6,11,1],[3,12,1],[9,4,1],[0,13,1],[0,14,1],[0,15,1],[1,16,1],[2,17,1],[2,18,1],[3,19,1],[5,20,1],[8,21,1],[9,22,1],[10,23,1],[11,24,1],[12,25,1]],"cid":5816}];
  var ROWS = 40;
  var RAMP = ' .:-=+*#%@';
  var PUG = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/';
  var MAX_HEAVY = 40;                        // bigger molecules get too small to read
  // ball radii (angstrom) and colour class per element; anything else is drawn as carbon-sized grey
  var ELEM = { H: [0.30, 'mH'], C: [0.48, 'mC'], N: [0.46, 'mN'], O: [0.45, 'mO'], S: [0.60, 'mS'],
               P: [0.58, 'mP'], F: [0.42, 'mX'], Cl: [0.55, 'mX'], Br: [0.60, 'mBr'], I: [0.66, 'mI'],
               B: [0.46, 'mB2'], Si: [0.60, 'mC'], Se: [0.60, 'mS'] };
  var Z2SYM = { 1: 'H', 5: 'B', 6: 'C', 7: 'N', 8: 'O', 9: 'F', 14: 'Si', 15: 'P', 16: 'S', 17: 'Cl', 34: 'Se', 35: 'Br', 53: 'I' };
  var CLS = ['mBond', 'mC', 'mH', 'mN', 'mO', 'mS', 'mP', 'mX', 'mBr', 'mI', 'mB2'];
  var BOND_R = 0.2, MULTI_R = 0.12, MULTI_OFF = 0.17;
  var LIGHT = unit([-0.45, -0.55, 0.70]);   // screen frame: x right, y down, z toward the viewer
  var SUB = '₀₁₂₃₄₅₆₇₈₉';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touchy = window.matchMedia('(hover: none)').matches;
  var cw, lh, W, SW, SH, zb, ink, hit, counts = new Int16Array(CLS.length);
  var view = { mol: null, yaw: 0, pitch: 0.35, vyaw: 0.007, appear: 1, touched: 0, born: 0 };
  var nextBuiltin = 0, loading = false, note = '', visible = true, drag = null;

  function unit(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }

  // Centre a molecule and rotate it onto its principal axes (longest along x, flattest along z).
  function align(pos) {
    var n = pos.length, c = [0, 0, 0], i, a, b;
    pos.forEach(function (p) { c[0] += p[0] / n; c[1] += p[1] / n; c[2] += p[2] / n; });
    pos = pos.map(function (p) { return sub(p, c); });
    var M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    pos.forEach(function (p) { for (a = 0; a < 3; a++) for (b = 0; b < 3; b++) M[a][b] += p[a] * p[b]; });
    var V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    for (var sweep = 0; sweep < 30; sweep++) {             // Jacobi eigen-decomposition, 3x3 symmetric
      for (a = 0; a < 2; a++) for (b = a + 1; b < 3; b++) {
        if (Math.abs(M[a][b]) < 1e-12) continue;
        var th = 0.5 * Math.atan2(2 * M[a][b], M[b][b] - M[a][a]), co = Math.cos(th), si = Math.sin(th);
        for (i = 0; i < 3; i++) { var x = M[i][a], y = M[i][b]; M[i][a] = co * x - si * y; M[i][b] = si * x + co * y; }
        for (i = 0; i < 3; i++) { var x2 = M[a][i], y2 = M[b][i]; M[a][i] = co * x2 - si * y2; M[b][i] = si * x2 + co * y2; }
        for (i = 0; i < 3; i++) { var x3 = V[i][a], y3 = V[i][b]; V[i][a] = co * x3 - si * y3; V[i][b] = si * x3 + co * y3; }
      }
    }
    var order = [0, 1, 2].sort(function (p, q) { return M[q][q] - M[p][p]; });   // largest variance first
    return pos.map(function (p) {
      return order.map(function (k) { return p[0] * V[0][k] + p[1] * V[1][k] + p[2] * V[2][k]; });
    });
  }

  // Turn a molecule into spheres and cylinders in its own frame (done once per molecule).
  function prepare(m) {
    if (m.prims) return m;
    var pos = m.atoms.map(function (a) { return [a[1], a[2], a[3]]; });
    var nb = pos.map(function () { return []; });
    m.bonds.forEach(function (b) { nb[b[0]].push(b[1]); nb[b[1]].push(b[0]); });
    var spheres = m.atoms.map(function (a, i) {
      var e = ELEM[a[0]] || [0.5, 'mC'];
      return { p: pos[i], r: e[0], c: CLS.indexOf(e[1]) };
    });
    var cyl = [];
    m.bonds.forEach(function (b) {
      var A = pos[b[0]], B = pos[b[1]], o = b[2];
      if (o !== 2 && o !== 3) { cyl.push({ a: A, b: B, r: BOND_R }); return; }
      // offset multiple bonds within the plane of a neighbouring atom, so they read as parallel sticks
      var k = nb[b[0]].filter(function (x) { return x !== b[1]; })[0];
      if (k === undefined) k = nb[b[1]].filter(function (x) { return x !== b[0]; })[0];
      var ax = sub(B, A), n = k !== undefined ? cross(ax, sub(pos[k], A)) : cross(ax, [0.3, 0.9, 0.1]);
      var p = unit(cross(n, ax));
      (o === 2 ? [-0.5, 0.5] : [-1, 0, 1]).forEach(function (f) {
        var d = [p[0] * f * MULTI_OFF * 2, p[1] * f * MULTI_OFF * 2, p[2] * f * MULTI_OFF * 2];
        cyl.push({ a: [A[0] + d[0], A[1] + d[1], A[2] + d[2]], b: [B[0] + d[0], B[1] + d[1], B[2] + d[2]], r: MULTI_R });
      });
    });
    // fit for a spin about the vertical axis at the default tilt
    var rh = 0, rv = 0, tilt = 0.35;
    spheres.forEach(function (s) {
      var horiz = Math.hypot(s.p[0], s.p[2]);
      rh = Math.max(rh, horiz + s.r);
      rv = Math.max(rv, Math.abs(s.p[1]) * Math.cos(tilt) + horiz * Math.sin(tilt) + s.r);
    });
    m.prims = { spheres: spheres, cyl: cyl, rh: rh, rv: rv };
    return m;
  }

  function measure() {
    var s = document.createElement('span');
    s.textContent = 'MMMMMMMMMM';
    pre.appendChild(s);
    cw = s.getBoundingClientRect().width / 10;
    pre.removeChild(s);
    lh = parseFloat(getComputedStyle(pre).lineHeight);
  }

  function init() {
    measure();
    pre.style.height = (ROWS * lh) + 'px';
    W = Math.max(24, Math.floor(pre.clientWidth / cw));
    SW = W * 2; SH = ROWS * 2;                 // 2x2 samples per character cell
    zb = new Float32Array(SW * SH); ink = new Float32Array(SW * SH); hit = new Int8Array(SW * SH);
  }

  function shade(nx, ny, nz, zf) {
    var d = nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2];
    var diff = d > 0 ? d : 0;
    var rz = 2 * d * nz - LIGHT[2];
    var spec = rz > 0 ? Math.pow(rz, 24) : 0;
    var dark = 1 - (0.15 + 0.85 * diff);                            // 0 lit .. 0.85 shadow
    var v = 0.42 + 0.58 * dark - 0.45 * spec - 0.22 * (1 - zf);     // highlight and far side lighten
    return v < 0.1 ? 0.1 : v > 1 ? 1 : v;
  }

  function draw() {
    var m = prepare(view.mol).prims;
    var cx = W / 2, cy = ROWS;                  // in square units (1 column = 1, 1 row = 2)
    var ease = 1 - Math.pow(1 - view.appear, 3);
    var s = Math.min(W / 2 / m.rh, ROWS / m.rv) * 0.94 * (0.55 + 0.45 * ease);
    var cyw = Math.cos(view.yaw), syw = Math.sin(view.yaw), cp = Math.cos(view.pitch), sp = Math.sin(view.pitch);
    function proj(p) {
      var x = cyw * p[0] + syw * p[2], z = -syw * p[0] + cyw * p[2], y = p[1];
      return [cx + s * x, cy - s * (cp * y - sp * z), s * (sp * y + cp * z)];
    }
    var zmax = s * Math.max(m.rh, m.rv) * 1.2;

    m.spheres.forEach(function (sp0) {
      var P = proj(sp0.p), r = s * sp0.r, r2 = r * r;
      var i0 = Math.max(0, Math.floor((P[0] - r) * 2)), i1 = Math.min(SW - 1, Math.ceil((P[0] + r) * 2));
      var j0 = Math.max(0, Math.floor(P[1] - r)), j1 = Math.min(SH - 1, Math.ceil(P[1] + r));
      for (var j = j0; j <= j1; j++) {
        var dy = (j + 0.5) - P[1];
        for (var i = i0; i <= i1; i++) {
          var dx = (i + 0.5) * 0.5 - P[0], d2 = dx * dx + dy * dy;
          if (d2 >= r2) continue;
          var dz = Math.sqrt(r2 - d2), z = P[2] + dz, k = j * SW + i;
          if (z <= zb[k]) continue;
          zb[k] = z; hit[k] = sp0.c;
          ink[k] = shade(dx / r, dy / r, dz / r, 0.5 + z / (2 * zmax));
        }
      }
    });

    m.cyl.forEach(function (c) {
      var A = proj(c.a), B = proj(c.b), r = s * c.r;
      var ax = B[0] - A[0], ay = B[1] - A[1], az = B[2] - A[2], len = Math.hypot(ax, ay, az);
      if (len < 1e-6) return;
      var ux = ax / len, uy = ay / len, uz = az / len;
      var Aa = 1 - uz * uz;                       // ray direction (0,0,-1)
      if (Aa < 1e-4) return;                      // pointing straight at us: hidden by the atoms
      var i0 = Math.max(0, Math.floor((Math.min(A[0], B[0]) - r) * 2)), i1 = Math.min(SW - 1, Math.ceil((Math.max(A[0], B[0]) + r) * 2));
      var j0 = Math.max(0, Math.floor(Math.min(A[1], B[1]) - r)), j1 = Math.min(SH - 1, Math.ceil(Math.max(A[1], B[1]) + r));
      var Z0 = 1e3, axr = uz * ux, ayr = uz * uy, azr = -1 + uz * uz;
      for (var j = j0; j <= j1; j++) for (var i = i0; i <= i1; i++) {
        var wx = (i + 0.5) * 0.5 - A[0], wy = (j + 0.5) - A[1], wz = Z0 - A[2];
        var wu = wx * ux + wy * uy + wz * uz;
        var bx = wx - wu * ux, by = wy - wu * uy, bz = wz - wu * uz;
        var Bq = 2 * (axr * bx + ayr * by + azr * bz), Cq = bx * bx + by * by + bz * bz - r * r;
        var disc = Bq * Bq - 4 * Aa * Cq;
        if (disc < 0) continue;
        var t = (-Bq - Math.sqrt(disc)) / (2 * Aa);
        var qz = Z0 - t, k = j * SW + i;
        if (qz <= zb[k]) continue;
        var qzz = qz - A[2], along = wx * ux + wy * uy + qzz * uz;
        if (along < 0 || along > len) continue;
        var nx = wx - along * ux, ny = wy - along * uy, nz = qzz - along * uz, nl = Math.hypot(nx, ny, nz) || 1;
        zb[k] = qz; hit[k] = 0;
        ink[k] = shade(nx / nl, ny / nl, nz / nl, 0.5 + qz / (2 * zmax));
      }
    });
  }

  function render() {
    zb.fill(-1e9); ink.fill(0); hit.fill(-1);
    draw();
    var html = '';
    for (var r = 0; r < ROWS; r++) {
      var run = '', rc = null;
      for (var c = 0; c < W; c++) {
        var a = (2 * r) * SW + 2 * c, b = a + SW, sum = ink[a] + ink[a + 1] + ink[b] + ink[b + 1];
        var ch = RAMP[Math.round(sum / 4 * (RAMP.length - 1))], cls = '';
        if (ch !== ' ') {
          counts.fill(0);
          if (hit[a] >= 0) counts[hit[a]]++; if (hit[a + 1] >= 0) counts[hit[a + 1]]++;
          if (hit[b] >= 0) counts[hit[b]]++; if (hit[b + 1] >= 0) counts[hit[b + 1]]++;
          var best = 0; for (var q = 1; q < CLS.length; q++) if (counts[q] > counts[best]) best = q;
          cls = CLS[best];
        }
        if (cls !== rc) { html += flush(run, rc); run = ''; rc = cls; }
        run += ch;
      }
      html += flush(run, rc) + (r < ROWS - 1 ? '\n' : '');
    }
    pre.innerHTML = html;
  }
  function flush(s, c) { return !s ? '' : c ? '<span class="' + c + '">' + s + '</span>' : s; }

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function caption() {
    var m = view.mol, name = m.name.length > 52 ? m.name.slice(0, 50) + '…' : m.name;
    var hint = (touchy ? 'drag to rotate · tap' : 'drag to rotate · click') + ' for a random PubChem compound';
    cap.innerHTML = esc(name) + ' · ' + esc(m.formula.replace(/\d/g, function (d) { return SUB[d]; })) +
      ' · <a href="https://pubchem.ncbi.nlm.nih.gov/compound/' + m.cid + '" target="_blank" rel="noopener">CID ' + m.cid + '</a>' +
      '  —  ' + (loading ? 'fetching a random compound…' : note || hint);
  }

  function show(mol) {
    view.mol = mol; view.appear = reduce ? 1 : 0; view.born = performance.now();
    caption();
    if (reduce) render();
  }

  function builtin() { return LIBRARY[nextBuiltin++ % LIBRARY.length]; }

  // PubChem PUG REST: a random CID, its 3D conformer, then its title and formula.
  function fromPubChem(json, cid) {
    var c = json.PC_Compounds[0], conf = c.coords[0].conformers[0], aids = c.coords[0].aid;
    var idx = {}, pos = [], els = [];
    c.atoms.aid.forEach(function (aid, i) { idx[aid] = i; els.push(Z2SYM[c.atoms.element[i]] || 'X'); });
    aids.forEach(function (aid, i) { pos[idx[aid]] = [conf.x[i], conf.y[i], conf.z[i]]; });
    var heavy = els.filter(function (e) { return e !== 'H'; }).length;
    if (heavy > MAX_HEAVY) throw new Error('too big');
    var xyz = align(pos);
    return {
      name: 'unnamed compound', formula: '', cid: cid,
      atoms: els.map(function (e, i) { return [e, xyz[i][0], xyz[i][1], xyz[i][2]]; }),
      bonds: c.bonds.aid1.map(function (a1, i) { return [idx[a1], idx[c.bonds.aid2[i]], c.bonds.order[i]]; })
    };
  }
  function getJSON(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }
  function randomCompound(tries) {
    var cid = 1 + Math.floor(Math.random() * 170000000);
    return getJSON(PUG + cid + '/record/JSON?record_type=3d')
      .then(function (j) { return fromPubChem(j, cid); })
      .then(function (mol) {
        return getJSON(PUG + cid + '/property/Title,MolecularFormula/JSON')
          .then(function (p) { p = p.PropertyTable.Properties[0]; mol.name = p.Title || mol.name; mol.formula = p.MolecularFormula || ''; return mol; })
          .catch(function () { return mol; });
      })
      .catch(function (e) {                      // no 3D conformer, too big, or a dead CID: try another
        if (tries > 1) return new Promise(function (ok) { setTimeout(ok, 250); }).then(function () { return randomCompound(tries - 1); });
        throw e;
      });
  }
  function fetchRandom() {
    if (loading) return;
    loading = true; note = ''; caption();
    randomCompound(6).then(function (mol) {
      loading = false; show(mol);
    }).catch(function (e) {
      if (window.console) console.warn('[molecule] PubChem fetch failed:', e);
      var why = String(e && e.message || e).slice(0, 60);
      loading = false; note = 'PubChem unreachable (' + why + '), showing a built-in molecule'; show(builtin());
    });
  }

  function frame(now) {
    if (visible) {
      if (!drag) {
        view.yaw += view.vyaw;
        view.vyaw += ((view.vyaw >= 0 ? 0.007 : -0.007) - view.vyaw) * 0.02;   // momentum settles to a slow spin
      }
      if (view.appear < 1) view.appear = Math.min(1, view.appear + 0.04);
      // idle for a while: rotate through the built-in set (no network unless someone clicks)
      if (now - view.born > 30000 && now - view.touched > 10000 && !loading) { note = ''; show(builtin()); }
      render();
    }
    requestAnimationFrame(frame);
  }

  pre.addEventListener('pointerdown', function (e) {
    drag = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t: performance.now(), id: e.pointerId };
    view.touched = performance.now();
    try { pre.setPointerCapture(e.pointerId); } catch (err) {}
  });
  pre.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    view.yaw += dx * 0.012; view.vyaw = dx * 0.012;
    view.pitch = Math.max(-1.3, Math.min(1.3, view.pitch + dy * 0.012));
    drag.x = e.clientX; drag.y = e.clientY; view.touched = performance.now();
    if (reduce) render();
  });
  function end(e) {
    if (!drag || e.pointerId !== drag.id) return;
    var click = e.type === 'pointerup' && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6 && performance.now() - drag.t < 400;
    drag = null;
    if (click) fetchRandom();
  }
  pre.addEventListener('pointerup', end);
  pre.addEventListener('pointercancel', end);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(pre);
  }
  var lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(window.__molResize);
    window.__molResize = setTimeout(function () {
      if (Math.abs(pre.clientWidth - lastW) > cw) { init(); lastW = pre.clientWidth; render(); }
    }, 200);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { var old = cw; measure(); if (Math.abs(cw - old) > 0.05) { init(); lastW = pre.clientWidth; render(); } });
  }

  init(); lastW = pre.clientWidth;
  nextBuiltin = Math.floor(Math.random() * LIBRARY.length);     // a different opener on each visit
  view.yaw = Math.random() * 6.28;
  show(builtin()); view.appear = 1;
  render();
  if (!reduce) requestAnimationFrame(frame);
})();
