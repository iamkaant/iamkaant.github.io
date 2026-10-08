// Gray-Scott reaction-diffusion rendered as ASCII, for the top of the Tools page.
// Markup lives in _includes/ascii-hero.html, styles in assets/main.scss.
(function () {
  var root = document.getElementById('ascii-rd');
  var pre = root.querySelector('.ascii-field');
  var cap = root.querySelector('.ascii-caption');
  var RAMP = ' .:-=+*#%@';
  var ROWS = 20;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cw, lh, W, H, U, V, nU, nV;
  var hint = window.matchMedia('(hover: none)').matches ? 'tap to add reagent' : 'move the cursor to add reagent';
  var F = 0.0545, K = 0.0620, t0 = performance.now(), frames = 0, visible = true, lastDrop = 0;

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
    W = Math.max(24, Math.floor(pre.clientWidth / cw));
    H = ROWS * 2;                       // two sim rows per text row keeps cells square
    U = new Float32Array(W * H).fill(1);
    V = new Float32Array(W * H);
    nU = new Float32Array(W * H);
    nV = new Float32Array(W * H);
    // random, not evenly spaced: regularly spaced seeds starve each other and all die
    for (var i = 0; i < 8; i++) drop(Math.random() * W, Math.random() * H, 3);
  }

  function drop(cx, cy, r) {
    cx = Math.round(cx); cy = Math.round(cy);
    for (var y = -r; y <= r; y++) for (var x = -r; x <= r; x++) {
      if (x * x + y * y > r * r) continue;
      var xx = ((cx + x) % W + W) % W, yy = ((cy + y) % H + H) % H;
      V[yy * W + xx] = 1;
    }
  }

  // Gray-Scott, Karl Sims' formulation: Du = 1, Dv = 0.5, 3x3 Laplacian, dt = 1
  function step() {
    for (var y = 0; y < H; y++) {
      var ym = ((y - 1 + H) % H) * W, y0 = y * W, yp = ((y + 1) % H) * W;
      for (var x = 0; x < W; x++) {
        var xm = (x - 1 + W) % W, xp = (x + 1) % W, i = y0 + x;
        var u = U[i], v = V[i];
        var lu = 0.2 * (U[y0 + xm] + U[y0 + xp] + U[ym + x] + U[yp + x]) +
                 0.05 * (U[ym + xm] + U[ym + xp] + U[yp + xm] + U[yp + xp]) - u;
        var lv = 0.2 * (V[y0 + xm] + V[y0 + xp] + V[ym + x] + V[yp + x]) +
                 0.05 * (V[ym + xm] + V[ym + xp] + V[yp + xm] + V[yp + xp]) - v;
        var uvv = u * v * v;
        var a = u + lu - uvv + F * (1 - u);
        var b = v + 0.5 * lv + uvv - (K + F) * v;
        nU[i] = a < 0 ? 0 : a > 1 ? 1 : a;
        nV[i] = b < 0 ? 0 : b > 1 ? 1 : b;
      }
    }
    var t = U; U = nU; nU = t; t = V; V = nV; nV = t;
  }

  function render() {
    var out = [];
    for (var r = 0; r < ROWS; r++) {
      var a = 2 * r * W, b = a + W, line = '';
      for (var c = 0; c < W; c++) {
        var t = (V[a + c] + V[b + c]) * 0.5 / 0.32;
        if (t > 1) t = 1;
        line += RAMP[(t * (RAMP.length - 1) + 0.5) | 0];
      }
      out.push(line);
    }
    pre.textContent = out.join('\n');
  }

  // drift slowly between the "coral" and "mitosis" regimes so the field keeps changing;
  // starts at coral, which grows reliably (mitosis alone sits close to extinction)
  function params(now) {
    var s = 0.5 + 0.5 * Math.cos((now - t0) / 1000 * 2 * Math.PI / 90);
    F = 0.0367 + (0.0545 - 0.0367) * s;
    K = 0.0649 + (0.0620 - 0.0649) * s;
  }

  function caption() {
    cap.textContent = 'Gray–Scott reaction–diffusion · F = ' + F.toFixed(4) +
      ' · k = ' + K.toFixed(4) + ' · ' + hint;
  }

  function frame(now) {
    if (visible) {
      params(now);
      for (var i = 0; i < 10; i++) step();
      render();
      if (++frames % 20 === 0) caption();
      if (now - lastDrop > 6000) { drop(Math.random() * W, Math.random() * H, 2); lastDrop = now; }
      if (frames % 60 === 0) {
        var live = 0;
        for (var j = 0; j < V.length; j++) if (V[j] > 0.1) live++;
        if (live < 20) for (var k = 0; k < 4; k++) drop(Math.random() * W, Math.random() * H, 3);
      }
    }
    requestAnimationFrame(frame);
  }

  function at(e) {
    var r = pre.getBoundingClientRect();
    return [(e.clientX - r.left) / cw, (e.clientY - r.top) / lh * 2];
  }
  pre.addEventListener('pointermove', function (e) { var p = at(e); drop(p[0], p[1], 2); lastDrop = performance.now(); });
  pre.addEventListener('pointerdown', function (e) { var p = at(e); drop(p[0], p[1], 4); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(pre);
  }
  var lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(window.__rdResize);
    window.__rdResize = setTimeout(function () {
      if (Math.abs(pre.clientWidth - lastW) > cw) { init(); lastW = pre.clientWidth; }
    }, 200);
  });

  function start() {
    init(); lastW = pre.clientWidth;
    for (var j = 0; j < (reduce ? 2500 : 1500); j++) step();   // start with structure already grown
    render(); caption();
  }
  start();
  // the web font can change the glyph width after first layout: rebuild if it does
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      var old = cw; measure();
      if (Math.abs(cw - old) > 0.05) start();
    });
  }
  if (!reduce) requestAnimationFrame(frame);
})();
