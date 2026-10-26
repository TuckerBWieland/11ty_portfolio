// Logo heap hero — source. Bundled + minified into src/assets/js/heap.min.js
// by scripts/build-heap.mjs (esbuild). See PR notes in heap-src/PR-NOTES.md.
//
// Behavior (approved prototype): six brand blocks drop chronologically
// (oldest first, landing at the bottom) with a squish on impact, settle with
// hand stacked imperfections, and sleep. Click a block and it arcs forward
// with one full spin into a hero pose while its story card opens (logo top
// left); click anywhere outside and it spins back to its exact rest pose.
// prefers-reduced-motion: the stack appears pre settled, no motion at all.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

const ASSET = '/assets/heap';
const stage = document.getElementById('heap-stage');

if (stage) {
  const lightScheme = window.matchMedia('(prefers-color-scheme: light)').matches;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Chronological, oldest first (bottom) to newest (top). UPS predates GA (Tucker, Oct 26).
  const ORDER = ['ups', 'ga', 'shopify', 'justworks', 'dreamer', 'meta'];
  const COMPANIES = {
    ga: { name: 'General Assembly', role: 'Senior Product Manager', dates: 'Aug 2018 – Nov 2020',
      body: `<p>Managed a $5M product portfolio spanning consumer and enterprise, driving 16% YoY revenue growth.</p><p>Launched four new courses, adding $700K in first year revenue.</p>` },
    shopify: { name: 'Shopify', role: 'Marketing Lead, Developer Marketing', dates: 'Nov 2020 – Jul 2022',
      body: `<p>Directed global developer campaigns across growth and brand, and built the marketing operations system behind Dev Degree, from acquisition to nurture.</p><p>Applications grew to record volume while operating costs came down.</p>` },
    justworks: { name: 'Justworks', role: 'Director, GTM Strategy and Operations', dates: 'Nov 2022 – Dec 2025',
      body: `<p>Owned fiscal planning and management of a $40M marketing budget, and built the cross channel investment model tying spend to LTV, CAC, pipeline coverage, and payback.</p><p>Ran the operating cadence for 70+ marketers.</p>` },
    ups: { name: 'UPS', role: 'Agency owner, UPS partner', dates: 'Before General Assembly',
      body: `<p>Ran a small agency. UPS paid for 150+ go to market consultations I delivered on behalf of its clients, and I leveraged that work into a partnership with UPS.</p><p>Through the partnership, I built a $35M ad placement business.</p>` },
    dreamer: { name: 'Dreamer', role: 'Growth and Marketing Operations', dates: 'Nov 2025 – Mar 2026',
      body: `<p>Led growth and marketing operations for the Dreamer AI agent platform through its public beta launch in February 2026.</p><p>The team joined Meta's Superintelligence Lab in March 2026.</p>` },
    meta: { name: 'Meta', role: 'Product Marketing Manager, Muse', dates: 'Mar 2026 – Present',
      body: `<p>GTM operations and strategy for Muse, Meta's personal AI agent, from early access through public launch in September 2026.</p><p>Muse reached No. 1 on the US App Store and passed 10 million users in the six weeks after launch.</p>` },
  };
  // Hand stacked imperfection, per block (same order as ORDER): x/z offset, yaw, pitch, roll (deg).
  // The two wordmark blocks (justworks, dreamer) keep the straightened yaw from the v2 fix.
  const FLAWS = [
    { x: 0.03, z: -0.02, yaw: -4, pitch: 2.0, roll: -0.5 },
    { x: 0.00, z: 0.00, yaw: 5, pitch: 1.0, roll: -1.5 },
    { x: 0.05, z: -0.03, yaw: -7, pitch: -1.5, roll: 1.0 },
    { x: -0.04, z: 0.04, yaw: 1, pitch: 0.5, roll: 1.0 },
    { x: -0.05, z: 0.03, yaw: 1, pitch: -1.0, roll: 1.0 },
    { x: 0.02, z: -0.01, yaw: -5, pitch: 1.5, roll: -1.0 },
  ];
  const DEG = Math.PI / 180;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.insertBefore(renderer.domElement, stage.firstChild);

  const scene = new THREE.Scene();
  // Prebaked environment: the Poly Haven studio_small_09 HDRI, baked down to a
  // 1024x512 equirect JPEG (~50 KB instead of the 1.6 MB .hdr). Three converts
  // it internally; the key light below carries the shadows.
  const envTex = new THREE.TextureLoader().load(`${ASSET}/env/env-1024.jpg`, t => {
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.colorSpace = THREE.SRGBColorSpace;
    scene.environment = t;
    scene.environmentIntensity = lightScheme ? 0.55 : 0.5;
  });

  const key = new THREE.DirectionalLight(0xfff1de, 2.4);
  key.position.set(3.2, 7.5, 3.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -4.6; key.shadow.camera.right = 4.6;
  key.shadow.camera.top = 8.5; key.shadow.camera.bottom = -1;
  key.shadow.camera.near = 1; key.shadow.camera.far = 22;
  key.shadow.bias = -0.0002; key.shadow.normalBias = 0.03; key.shadow.radius = 6;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xdfe8ff, 0.65);
  rim.position.set(-4.5, 3.0, -3.0);
  scene.add(rim);

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ opacity: lightScheme ? 0.18 : 0.32 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
  const CAM_POS = new THREE.Vector3(4.7, 5.3, 9.1);
  const CAM_TGT = new THREE.Vector3(0, 2.72, 0);
  function frameCamera() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    const back = camera.aspect < 0.85 ? 1.52 : (camera.aspect < 1.15 ? 1.15 : 1.0);
    camera.position.copy(CAM_POS).multiplyScalar(back);
    camera.lookAt(CAM_TGT);
    camera.updateProjectionMatrix();
  }
  frameCamera();

  // ---------- ambient glow (v3): ONE soft general wash behind the whole stack ----------
  // A single large, very soft radial sprite in a faint warm neutral. It reads as
  // atmosphere, not as light sources: no per block color pooling. Nearly
  // invisible on the light theme.
  const glowTexture = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,255,255,0.55)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.18)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const ambientGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture, color: new THREE.Color('#cfc4b0'),
    transparent: true, opacity: lightScheme ? 0.05 : 0.16, depthWrite: false,
    blending: lightScheme ? THREE.NormalBlending : THREE.AdditiveBlending,
  }));
  ambientGlow.position.set(0, 2.9, -2.4);
  ambientGlow.scale.set(11.5, 10.0, 1);
  scene.add(ambientGlow);

  // ---------- physics ----------
  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.allowSleep = true;
  const matBlock = new CANNON.Material('block');
  const matGround = new CANNON.Material('ground');
  world.addContactMaterial(new CANNON.ContactMaterial(matBlock, matGround, { friction: 0.7, restitution: 0.05 }));
  world.addContactMaterial(new CANNON.ContactMaterial(matBlock, matBlock, { friction: 0.65, restitution: 0.05 }));
  world.defaultContactMaterial.friction = 0.5;
  const groundBody = new CANNON.Body({ type: CANNON.Body.STATIC, material: matGround, shape: new CANNON.Plane() });
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(groundBody);

  const loader = new GLTFLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const blocks = {};
  for (const slug of ORDER) {
    const g = await loader.loadAsync(`${ASSET}/blocks/block-${slug}.glb`);
    const mesh = g.scene;
    mesh.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true; o.receiveShadow = true;
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        for (const m of ms) {
          if (m.map) m.map.anisotropy = maxAniso;
          if (m.normalMap) m.normalMap.anisotropy = maxAniso;
        }
      }
    });
    scene.add(mesh);
    const body = new CANNON.Body({
      mass: 1, material: matBlock,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
      angularDamping: 0.25, linearDamping: 0.05,
      sleepSpeedLimit: 0.14, sleepTimeLimit: 0.6,
    });
    body.allowSleep = true;
    world.addBody(body);
    const rec = { slug, mesh, body, rest: null, squish: null, lastSquish: -9 };
    body.addEventListener('collide', e => {
      const v = Math.abs(e.contact.getImpactVelocityAlongNormal());
      const now = performance.now() / 1000;
      if (!RM && v > 1.05 && now - rec.lastSquish > 0.28 && !openSlug) {
        rec.squish = { t0: now, amp: Math.min(0.15, 0.045 + v * 0.032) };
        rec.lastSquish = now;
      }
    });
    blocks[slug] = rec;
  }
  const loadingEl = document.getElementById('heap-loading');
  if (loadingEl) loadingEl.style.display = 'none';

  function spawnTransform(i) {
    const f = FLAWS[i];
    const p = new THREE.Vector3(f.x, 1.65 + i * 1.0, f.z);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(f.pitch * DEG, f.yaw * DEG, f.roll * DEG, 'YXZ'));
    return { p, q };
  }
  function placeBody(rec, i, dropExtra) {
    const { p, q } = spawnTransform(i);
    rec.body.type = CANNON.Body.DYNAMIC;
    rec.body.position.set(p.x, p.y + dropExtra, p.z);
    rec.body.quaternion.set(q.x, q.y, q.z, q.w);
    rec.body.velocity.setZero();
    rec.body.angularVelocity.setZero();
    rec.body.wakeUp();
  }
  function syncMesh(rec) {
    rec.mesh.position.copy(rec.body.position);
    rec.mesh.quaternion.copy(rec.body.quaternion);
  }
  function allCalm() {
    return ORDER.every(s => {
      const b = blocks[s].body;
      return b.sleepState === CANNON.Body.SLEEPING ||
        (b.velocity.length() < 0.05 && b.angularVelocity.length() < 0.05);
    });
  }
  function recordRest() {
    for (const s of ORDER) {
      const rec = blocks[s];
      rec.rest = { p: rec.mesh.position.clone(), q: rec.mesh.quaternion.clone() };
    }
  }

  // ---------- open / close ----------
  const story = document.getElementById('heap-story');
  let openSlug = null, anim = null;
  const HERO_BASE = new THREE.Vector3(0.15, 2.95, 2.7);
  const HERO_Q = (() => {
    const m = new THREE.Matrix4().lookAt(CAM_POS, HERO_BASE, new THREE.Vector3(0, 1, 0));
    return new THREE.Quaternion().setFromRotationMatrix(m);
  })();
  function heroPos() {
    const back = camera.aspect < 0.85 ? 1.52 : (camera.aspect < 1.15 ? 1.15 : 1.0);
    return new THREE.Vector3(HERO_BASE.x * back, HERO_BASE.y, HERO_BASE.z * back);
  }
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  function fillStory(slug) {
    const c = COMPANIES[slug];
    const logo = document.getElementById('heap-logo');
    logo.src = `${ASSET}/logos/${slug}-logo-white.png`;   // story assets load on first open only
    logo.alt = c.name;
    logo.style.filter = lightScheme ? 'invert(1) brightness(0.25)' : 'none';
    document.getElementById('heap-name').textContent = c.name;
    document.getElementById('heap-role').textContent = c.role;
    document.getElementById('heap-dates').textContent = c.dates;
    document.getElementById('heap-body').innerHTML = c.body;
  }
  function openBlock(slug, instant = false) {
    const rec = blocks[slug];
    openSlug = slug;
    fillStory(slug);
    story.classList.add('open');
    story.setAttribute('aria-hidden', 'false');
    rec.body.type = CANNON.Body.STATIC;
    rec.body.velocity.setZero(); rec.body.angularVelocity.setZero();
    if (instant || RM) {
      rec.mesh.position.copy(heroPos());
      rec.mesh.quaternion.copy(HERO_Q);
      anim = null;
      renderer.render(scene, camera);
      return;
    }
    anim = { rec, phase: 'open', t0: performance.now() / 1000, dur: 0.95,
             fromP: rec.mesh.position.clone(), fromQ: rec.mesh.quaternion.clone(),
             toP: heroPos(), toQ: HERO_Q.clone() };
  }
  function closeBlock(instant = false) {
    if (!openSlug) return;
    const rec = blocks[openSlug];
    story.classList.remove('open');
    story.setAttribute('aria-hidden', 'true');
    if (instant || RM) {
      rec.mesh.position.copy(rec.rest.p);
      rec.mesh.quaternion.copy(rec.rest.q);
      restoreBody(rec);
      openSlug = null; anim = null;
      renderer.render(scene, camera);
      return;
    }
    anim = { rec, phase: 'close', t0: performance.now() / 1000, dur: 0.8,
             fromP: rec.mesh.position.clone(), fromQ: rec.mesh.quaternion.clone(),
             toP: rec.rest.p.clone(), toQ: rec.rest.q.clone() };
  }
  function restoreBody(rec) {
    rec.body.position.copy(rec.rest.p);
    rec.body.quaternion.set(rec.rest.q.x, rec.rest.q.y, rec.rest.q.z, rec.rest.q.w);
    rec.body.type = CANNON.Body.DYNAMIC;
    rec.body.velocity.setZero(); rec.body.angularVelocity.setZero();
    rec.body.sleep();
  }
  document.getElementById('heap-close').addEventListener('click', e => { e.stopPropagation(); closeBlock(); });
  story.addEventListener('click', e => e.stopPropagation());

  const ray = new THREE.Raycaster();
  const ptr = new THREE.Vector2();
  let mouseX = 0, mouseY = 0;
  renderer.domElement.addEventListener('click', e => {
    if (anim) return;
    if (openSlug) { closeBlock(); return; }
    const r = renderer.domElement.getBoundingClientRect();
    ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ptr, camera);
    const meshes = ORDER.map(s => blocks[s].mesh);
    const hits = ray.intersectObjects(meshes, true);
    if (hits.length) {
      let node = hits[0].object, slug = null;
      while (node && !slug) { slug = ORDER.find(s => blocks[s].mesh === node) || null; node = node.parent; }
      if (slug) openBlock(slug);
    }
  });
  renderer.domElement.addEventListener('pointermove', e => {
    if (openSlug || anim || RM) { renderer.domElement.style.cursor = ''; return; }
    const r = renderer.domElement.getBoundingClientRect();
    ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ptr, camera);
    const hits = ray.intersectObjects(ORDER.map(s => blocks[s].mesh), true);
    renderer.domElement.style.cursor = hits.length ? 'pointer' : '';
    mouseX = ptr.x; mouseY = ptr.y;
  });

  // ---------- settle / main loop ----------
  const clock = new THREE.Clock();
  let started = false, dropIndex = 0, nextDrop = 0, settled = false;

  function settleSynchronously() {
    const FIXED = 1 / 60;
    ORDER.forEach((s, i) => { blocks[s].body.type = CANNON.Body.STATIC; blocks[s].body.position.set(0, -60 - i * 2, 0); });
    ORDER.forEach((s, i) => {
      placeBody(blocks[s], i, 0.35);
      let steps = 0, calm = 0;
      while (steps < 60 * 25) {
        world.step(FIXED);
        steps++;
        const b = blocks[s].body;
        const thisCalm = b.sleepState === CANNON.Body.SLEEPING ||
          (b.velocity.length() < 0.05 && b.angularVelocity.length() < 0.05);
        if (steps > 120 && thisCalm && allCalm()) { calm++; if (calm > 40) break; } else calm = 0;
      }
    });
    ORDER.forEach(s => { syncMesh(blocks[s]); blocks[s].body.sleep(); });
    recordRest();
    settled = true;
    renderer.render(scene, camera);
  }

  if (RM) {
    settleSynchronously();
    window.__READY = true;
  } else {
    function animate() {
      requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const now = performance.now() / 1000;
      if (!started) { started = true; nextDrop = now + 0.35; }
      if (dropIndex < ORDER.length && now >= nextDrop) {
        const i = dropIndex;
        placeBody(blocks[ORDER[i]], i, 1.15);
        dropIndex++;
        nextDrop = now + 0.62;
      }
      world.step(1 / 60, dt, 3);
      for (const s of ORDER) {
        const rec = blocks[s];
        if (anim && anim.rec === rec) continue;
        if (openSlug === s && !anim) continue;
        syncMesh(rec);
        if (rec.squish) {
          const tau = now - rec.squish.t0;
          if (tau > 1.1) { rec.squish = null; rec.mesh.scale.set(1, 1, 1); }
          else {
            const k = Math.exp(-5.2 * tau) * Math.cos(13.5 * tau);
            const sy = 1 - rec.squish.amp * k;
            const sxz = 1 + rec.squish.amp * 0.55 * k;
            rec.mesh.scale.set(sxz, sy, sxz);
          }
        }
      }
      if (!settled && dropIndex >= ORDER.length) {
        const maxV = Math.max(...ORDER.map(s => blocks[s].body.velocity.length()));
        const maxW = Math.max(...ORDER.map(s => blocks[s].body.angularVelocity.length()));
        if ((maxV < 0.12 && maxW < 0.12) || (now - nextDrop > 7 && maxV < 0.4)) {
          settled = true;
          ORDER.forEach(s => blocks[s].body.sleep());
          ORDER.forEach(s => syncMesh(blocks[s]));
          recordRest();
        }
      }
      if (anim) {
        const t = Math.min(1, (now - anim.t0) / anim.dur);
        const e = anim.phase === 'open' ? easeOut(t) : easeInOut(t);
        const rec = anim.rec;
        rec.mesh.position.lerpVectors(anim.fromP, anim.toP, e);
        rec.mesh.position.y += Math.sin(e * Math.PI) * 0.55;
        const spin = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0), (anim.phase === 'open' ? 1 : -1) * Math.PI * 2 * easeOut(t));
        rec.mesh.quaternion.copy(anim.fromQ).slerp(anim.toQ, e).multiply(spin);
        if (t >= 1) {
          if (anim.phase === 'close') { restoreBody(rec); openSlug = null; }
          anim = null;
        }
      }
      const sway = Math.sin(now * 0.32) * 0.012;
      const px = CAM_POS.x + mouseX * 0.35, py = CAM_POS.y - mouseY * 0.22 + sway * 4;
      const back = camera.aspect < 0.85 ? 1.52 : (camera.aspect < 1.15 ? 1.15 : 1.0);
      camera.position.lerp(new THREE.Vector3(px * back, py * back, CAM_POS.z * back), 0.04);
      camera.lookAt(CAM_TGT);
      renderer.render(scene, camera);
    }
    ORDER.forEach((s, i) => { blocks[s].body.type = CANNON.Body.STATIC; blocks[s].body.position.set(0, -60 - i * 2, 0); syncMesh(blocks[s]); });
    animate();
  }

  window.addEventListener('resize', () => { frameCamera(); if (RM) renderer.render(scene, camera); });
  window.__heap = { blocks, ORDER, camera, renderer, openBlock, closeBlock,
                    isSettled: () => settled, getOpen: () => openSlug };
}
