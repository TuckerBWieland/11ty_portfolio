/*
 * Strata: a living contour field for the whole site.
 * Layered sine noise drifts like slow water across a fixed
 * full viewport canvas behind everything. The pointer parts
 * the lines the way a stone parts a stream. Touch devices get
 * a slow autonomous drift instead of a cursor. Reduced motion
 * renders one composed still frame.
 */
(function () {
    'use strict';

    var canvas = document.getElementById('strata');
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    var W = 0;
    var H = 0;
    var lines = [];
    var baseGrad = null;
    var accentGrad = null;
    var pointer = { x: -10000, y: -10000, tx: -10000, ty: -10000 };
    var running = false;
    var elapsed = 0;
    var last = 0;

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    // Muted spectral sweep, echoing the link gradients at low alpha.
    // Dusty rose to violet to blue to teal to sage to warm tan.
    var SPECTRUM = [
        [0.0, 216, 110, 150],
        [0.22, 150, 120, 205],
        [0.45, 110, 130, 230],
        [0.68, 80, 185, 190],
        [0.85, 170, 175, 150],
        [1.0, 225, 200, 160]
    ];

    function makeSpectrum(alpha) {
        var g = ctx.createLinearGradient(0, 0, W, 0);
        for (var i = 0; i < SPECTRUM.length; i++) {
            var s = SPECTRUM[i];
            g.addColorStop(s[0], 'rgba(' + s[1] + ', ' + s[2] + ', ' + s[3] + ', ' + alpha.toFixed(3) + ')');
        }
        return g;
    }

    function buildLines() {
        lines = [];
        var baseGap = H < 520 ? 22 : 30;
        // Irregular spacing so the field never reads as mechanical banding.
        // Accent lines land organically instead of every Nth line.
        var y = -baseGap;
        while (y < H + baseGap) {
            lines.push({
                y: y,
                a1: rand(9, 24),
                f1: rand(0.0015, 0.003),
                s1: rand(0.08, 0.2),
                p1: rand(0, 6.2832),
                a2: rand(5, 14),
                f2: rand(0.004, 0.0085),
                s2: rand(0.12, 0.28),
                p2: rand(0, 6.2832),
                a3: rand(2, 7),
                f3: rand(0.011, 0.022),
                s3: rand(0.18, 0.4),
                p3: rand(0, 6.2832),
                accent: Math.random() < 0.16,
                jitter: rand(0.7, 1.25)
            });
            y += baseGap * rand(0.65, 1.45);
        }
    }

    function resize() {
        var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = Math.max(1, Math.round(W * dpr));
        canvas.height = Math.max(1, Math.round(H * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        baseGrad = makeSpectrum(0.15);
        accentGrad = makeSpectrum(0.34);
        buildLines();
        if (reduceMotion) draw(8.0);
    }

    function field(x, L, t) {
        return (
            L.a1 * Math.sin(x * L.f1 + t * L.s1 + L.p1) +
            L.a2 * Math.sin(x * L.f2 - t * L.s2 + L.p2) +
            L.a3 * Math.sin(x * L.f3 + t * L.s3 + L.p3)
        );
    }

    function draw(t) {
        ctx.clearRect(0, 0, W, H);

        pointer.x += (pointer.tx - pointer.x) * 0.07;
        pointer.y += (pointer.ty - pointer.y) * 0.07;
        var px = pointer.x;
        var py = pointer.y;

        // Warm light that follows the cursor through the field,
        // like light moving through water
        if (px > -9000) {
            var glowR = Math.max(260, W * 0.2);
            var g = ctx.createRadialGradient(px, py, 0, px, py, glowR);
            g.addColorStop(0, 'rgba(232, 206, 168, 0.16)');
            g.addColorStop(0.5, 'rgba(216, 190, 154, 0.07)');
            g.addColorStop(1, 'rgba(216, 190, 154, 0)');
            ctx.fillStyle = g;
            ctx.fillRect(px - glowR, py - glowR, glowR * 2, glowR * 2);
        }

        var sigma = Math.max(130, W * 0.1);
        var twoSigmaSq = 2 * sigma * sigma;
        var step = W < 640 ? 9 : 7;

        for (var i = 0; i < lines.length; i++) {
            var L = lines[i];
            ctx.beginPath();
            for (var x = -10; x <= W + 10; x += step) {
                var y = L.y + field(x, L, t);
                var dx = x - px;
                var fall = Math.exp(-(dx * dx) / twoSigmaSq);
                if (fall > 0.01) {
                    var dy = y - py;
                    // Smooth sign so lines flow around the pointer with no kinks
                    var bend = dy / (60 + Math.abs(dy));
                    y += bend * fall * 60 * Math.exp(-Math.abs(dy) / 200);
                }
                if (x === -10) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            var dyLine = L.y - py;
            var glow = Math.exp(-(dyLine * dyLine) / (2 * 190 * 190));
            ctx.strokeStyle = L.accent ? accentGrad : baseGrad;
            ctx.globalAlpha = Math.min(1, L.jitter * (0.7 + glow * 1.6));
            ctx.lineWidth = L.accent ? 1.5 : 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    function frame(now) {
        if (!running) return;
        if (!last) last = now;
        elapsed += Math.min((now - last) / 1000, 0.1);
        last = now;
        if (coarsePointer) {
            pointer.tx = W * (0.5 + 0.3 * Math.sin(elapsed * 0.11));
            pointer.ty = H * (0.46 + 0.26 * Math.sin(elapsed * 0.17 + 1.4));
        }
        draw(elapsed);
        requestAnimationFrame(frame);
    }

    function play() {
        if (running || document.hidden) return;
        running = true;
        last = 0;
        requestAnimationFrame(frame);
    }

    function stop() {
        running = false;
    }

    window.addEventListener('resize', resize);

    if (reduceMotion) {
        resize();
        return;
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop();
        else play();
    });

    if (!coarsePointer) {
        window.addEventListener('pointermove', function (event) {
            pointer.tx = event.clientX;
            pointer.ty = event.clientY;
        });
        document.documentElement.addEventListener('mouseleave', function () {
            pointer.tx = -10000;
            pointer.ty = -10000;
        });
    }

    resize();
    play();
})();
