/* ================= Settings ================= */

const START_DATE = new Date(2024, 11, 20, 0, 0, 0);       // 20/12/2024
const ANNIVERSARY = new Date(2026, 11, 20, 0, 0, 0);      // 20/12/2026
const FUTURE_LETTER_DATE = new Date(2027, 11, 20, 0, 0, 0); // 20/12/2027

const PHOTOS = [
  { file: "photo-01.jpg", cap: "Nti w ana 🤍" },
  { file: "photo-04.jpg", cap: "Ma Samia" },
  { file: "photo-05.jpg", cap: "Zwina dima" },
  { file: "photo-06.jpg", cap: "Bin lwrd 🌸" },
  { file: "photo-02.jpg", cap: "Dhkat dyalna" },
  { file: "photo-07.jpg", cap: "Golden hour" },
  { file: "photo-09.jpg", cap: "Amira dyali" },
  { file: "photo-08.jpg", cap: "Nour dyali" },
  { file: "photo-10.jpg", cap: "Classe" },
  { file: "photo-03.jpg", cap: "7na ❤️" },
  { file: "photo-11.jpg", cap: "Ma préférée" },
  { file: "photo-12.jpg", cap: "3inya" },
  { file: "photo-13.jpg", cap: "Click 📸" },
  { file: "photo-14.jpg", cap: "Dima nti" },
];

const LANGS = [
  ["I love you", 1.3], ["Je t'aime", 1.5], ["Te quiero", 1.1], ["Ti amo", 1.3], ["Ich liebe dich", 1],
  ["Eu te amo", 1.1], ["Seni seviyorum", 1], ["我爱你", 1.5], ["사랑해", 1.2], ["愛してる", 1.1],
  ["Я тебя люблю", 1], ["Σ' αγαπώ", 1.1], ["Ana ba7ebek", 1.2], ["Kocham cię", 1], ["Ik hou van jou", .95],
  ["Mahal kita", 1], ["Jeg elsker deg", .95],
];

const REASONS = [
  "Dhektek… katbeddel nhari kaml f tanya.",
  "3inik — fihom ldar dyali.",
  "7it nti sadi9a dyali 9bel ma tkouni 7bibti.",
  "Sbrek 3liya, 7ta f l'ayam s3ab.",
  "Katfhmini bla ma ngoul walo.",
  "Katkhllini nwelli wa7ed a7ssen.",
  "9albek lkbir m3a nas kamlin.",
  "Kat3tini lhedra li kont m7taj, f lw9t li kont m7tajha.",
  "Dik dhka dyalek f awel tswira dyalna 🤍",
  "Katfekri fina bjoj, machi ghir f rassek.",
  "7it m3ak, l7aja l3adiya katwelli dkra.",
  "7it nti… nti. W ma kaynach b7alek.",
];

const STARS = [
  { x: 18, y: 22, t: "Nti njma dyali f lyali lmdlmin." },
  { x: 46, y: 12, t: "Kol mra katdhki, kayd3wi 9albi." },
  { x: 80, y: 20, t: "M3ak, l'ayam kat douz dghya." },
  { x: 64, y: 40, t: "Kanfker fik 9bel man3es, w mli kanfi9." },
  { x: 28, y: 48, t: "Nti a7ssen « sba7 lkhir » f nhari." },
  { x: 86, y: 58, t: "Lhedra m3ak hiya ra7a dyali." },
  { x: 12, y: 70, t: "Nti lmalja2 dyali f had dnya." },
  { x: 50, y: 66, t: "Kol dkra m3ak kankhbbiha f 9albi." },
  { x: 72, y: 84, t: "Ila kan l7ob njma… nti sma kamla." },
  { x: 34, y: 88, t: "W ana m3ak, kolchi momkin." },
];

const DREAMS = [
  ["🤝", "Ntjm3o", "W ma tb9ach lmasafa binatna"],
  ["✈️", "Nsafro bjoj", "N3erfo blayes jdad m3a ba3d"],
  ["🏡", "Dar sghira dyalna", "3amra b dhk w b l7nan"],
  ["📸", "Album dyal dkriyat", "Kol 3am, tsawer jdad"],
  ["🎂", "Nfaltiw ga3 l3yad", "20/12 kol 3am, m3a ba3d"],
  ["🌙", "Nchoufo l9mar bjoj", "Mn nfs lblassa, machi mn b3id"],
];

const COUPONS = [
  ["🤗", "Bon pour 1 3n9a twila", "Valable f ay w9t"],
  ["🍦", "Bon pour 1 sortie", "Nti li katkhtari fin"],
  ["🕊️", "Bon pour sma7 f 1 dda3wa", "Bla ma nzid nhder fiha 😅"],
  ["📞", "Bon pour 1 appel 7ta l sba7", "Ila wa7chtini bzaf"],
  ["🎁", "Bon pour 1 cadeau sghir", "Surprise mni"],
  ["💬", "Bon pour 1 compliment kol nhar", "Pendant 1 mois kaml"],
];

/* ============================================ */

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const forceParty = location.hash === "#fete";
const fmt = (n) => Math.floor(n).toLocaleString("fr-FR");
const daysUntil = (d) => Math.max(0, Math.ceil((d - new Date()) / 86400000));
const buzz = (ms = 15) => { try { if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(ms); } catch (e) {} };

const gf = $("gfonts"); if (gf) gf.media = "all";

let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- confetti + fireworks ---------- */
const canvas = $("confetti"), ctx = canvas.getContext("2d");
let parts = [], raf = null;
function sizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeCanvas(); addEventListener("resize", sizeCanvas);
const COLORS = ["#c8553d", "#e07a5f", "#e0a73b", "#8a9a5b", "#e58f8f", "#fff8ef", "#f2cc8f"];
function heart(s) {
  ctx.beginPath(); ctx.moveTo(0, s * .3);
  ctx.bezierCurveTo(0, 0, -s * .5, 0, -s * .5, s * .3);
  ctx.bezierCurveTo(-s * .5, s * .6, 0, s * .8, 0, s);
  ctx.bezierCurveTo(0, s * .8, s * .5, s * .6, s * .5, s * .3);
  ctx.bezierCurveTo(s * .5, 0, 0, 0, 0, s * .3); ctx.fill();
}
function burst(count = 120, oy = .4, ox = .5, power = 1) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, sp = (3 + Math.random() * 8) * power;
    parts.push({ x: innerWidth * ox, y: innerHeight * oy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4 * power,
      s: 6 + Math.random() * 8, rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: COLORS[(Math.random() * COLORS.length) | 0], h: Math.random() < .5, life: 0 });
  }
  if (!raf) loop();
}
function fireworks() {
  [[.25, .3], [.75, .25], [.5, .45], [.3, .6], [.7, .55]].forEach(([x, y], i) => setTimeout(() => burst(70, y, x, .8), i * 380));
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach((p) => {
    p.vy += .2; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - p.life / 200);
    if (p.h) { ctx.translate(0, -p.s / 2); heart(p.s * 1.3); } else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  });
  parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 200);
  raf = parts.length ? requestAnimationFrame(loop) : (ctx.clearRect(0, 0, innerWidth, innerHeight), null);
}

/* ---------- gate: typewriter + scratch ticket ---------- */
const gate = $("gate");
function openBook() {
  gate.classList.add("gone");
  document.body.classList.remove("locked");
  buzz(30); burst(140, .4);
  setTimeout(layoutMap, 300);
}
(function typewriter() {
  const el = $("typed"), text = el.getAttribute("aria-label");
  let i = 0;
  const step = () => { el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(step, 70); else el.classList.add("done"); };
  setTimeout(step, 400);
})();

const sc = $("scratch"), sctx = sc.getContext("2d", { willReadFrequently: true });
let scratched = false, moves = 0, lastPt = null;
function paintScratch() {
  const r = sc.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
  sc.width = r.width * dpr; sc.height = r.height * dpr; sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const g = sctx.createLinearGradient(0, 0, r.width, r.height);
  g.addColorStop(0, "#d9b77a"); g.addColorStop(.5, "#f2d7a0"); g.addColorStop(1, "#c99a55");
  sctx.fillStyle = g; sctx.fillRect(0, 0, r.width, r.height);
  sctx.fillStyle = "rgba(255,255,255,.35)";
  for (let i = 0; i < 40; i++) { sctx.font = `${10 + Math.random() * 10}px serif`; sctx.fillText("♥", Math.random() * r.width, Math.random() * r.height); }
  sctx.fillStyle = "#6f4a2a"; sctx.textAlign = "center";
  sctx.font = "700 26px Caveat, 'Segoe Print', cursive";
  sctx.fillText("Kherbchi hna ✨", r.width / 2, r.height / 2 + 8);
}
function scratchAt(x, y) {
  sctx.globalCompositeOperation = "destination-out";
  sctx.lineWidth = 44; sctx.lineCap = "round";
  if (lastPt) { sctx.beginPath(); sctx.moveTo(lastPt.x, lastPt.y); sctx.lineTo(x, y); sctx.stroke(); }
  sctx.beginPath(); sctx.arc(x, y, 22, 0, Math.PI * 2); sctx.fill();
  sctx.globalCompositeOperation = "source-over";
  lastPt = { x, y };
  if (++moves % 10 === 0) checkScratch();
}
function checkScratch() {
  if (scratched) return;
  const d = sctx.getImageData(0, 0, sc.width, sc.height).data;
  let clear = 0, total = 0;
  for (let i = 3; i < d.length; i += 4 * 24) { total++; if (d[i] < 40) clear++; }
  if (clear / total > .45) revealTicket();
}
function revealTicket() {
  if (scratched) return;
  scratched = true;
  sc.classList.add("cleared"); buzz(40); burst(90, .45);
  $("gate-hint").hidden = true; $("skip-scratch").hidden = true; $("open-book").hidden = false;
}
const pt = (e) => { const r = sc.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
let scratching = false;
sc.addEventListener("pointerdown", (e) => { scratching = true; try { sc.setPointerCapture(e.pointerId); } catch (_) {} lastPt = null; const p = pt(e); scratchAt(p.x, p.y); });
sc.addEventListener("pointermove", (e) => { if (scratching) { const p = pt(e); scratchAt(p.x, p.y); } });
["pointerup", "pointercancel", "pointerleave"].forEach((t) => sc.addEventListener(t, () => { scratching = false; lastPt = null; checkScratch(); }));
$("open-book").addEventListener("click", openBook);
$("skip-scratch").addEventListener("click", revealTicket);
setTimeout(() => { if (!scratched) $("skip-scratch").hidden = false; }, 7000);
requestAnimationFrame(paintScratch);
if (document.fonts) document.fonts.ready.then(() => { if (!scratched && moves === 0) paintScratch(); });
if (location.hash) { gate.classList.add("gone"); document.body.classList.remove("locked"); }

/* ---------- scroll progress + reveal ---------- */
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("hp").style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  drawMap();
}
addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
document.querySelectorAll(".page > :not(.map):not(.sky)").forEach((el) => el.classList.add("fx"));
document.querySelectorAll(".stop").forEach((el) => el.classList.add("fx"));
const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .1 });
document.querySelectorAll(".fx").forEach((el) => io.observe(el));

/* ---------- counters ---------- */
function diffParts(from, to) {
  let y = to.getFullYear() - from.getFullYear(), m = to.getMonth() - from.getMonth(), d = to.getDate() - from.getDate();
  let h = to.getHours() - from.getHours(), min = to.getMinutes() - from.getMinutes(), s = to.getSeconds() - from.getSeconds();
  if (s < 0) { s += 60; min--; } if (min < 0) { min += 60; h--; } if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); m--; } if (m < 0) { m += 12; y--; }
  return { y, m, d, h, min, s };
}
const partyTime = () => forceParty || new Date() >= ANNIVERSARY;
function tick() {
  const now = new Date(), ms = now - START_DATE, p = diffParts(START_DATE, now);
  $("c-years").textContent = p.y; $("l-years").textContent = p.y > 1 ? "ans" : "3am";
  $("c-months").textContent = p.m; $("c-days").textContent = p.d;
  $("c-hours").textContent = pad(p.h); $("c-mins").textContent = pad(p.min); $("c-secs").textContent = pad(p.s);
  const days = ms / 86400000;
  $("c-total").textContent = fmt(days);
  $("n-beats").textContent = fmt(ms / 60000 * 72);
  $("n-sunsets").textContent = fmt(days);
  $("n-nights").textContent = fmt(days);
  $("n-hours").textContent = fmt(ms / 3600000);

  if (partyTime()) { $("cd-wait").hidden = true; $("cd-now").hidden = false; }
  else {
    const secs = Math.floor((ANNIVERSARY - now) / 1000);
    $("cd-days").textContent = Math.floor(secs / 86400);
    $("cd-hours").textContent = pad(Math.floor(secs / 3600) % 24);
    $("cd-mins").textContent = pad(Math.floor(secs / 60) % 60);
    $("cd-secs").textContent = pad(secs % 60);
  }
  $("bottle-days").textContent = fmt(daysUntil(FUTURE_LETTER_DATE));
}
tick(); setInterval(tick, 1000);

/* ---------- easter egg: tap "&" five times ---------- */
let ampTaps = 0, ampTimer;
$("secret-amp").addEventListener("click", (e) => {
  const el = e.currentTarget; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); buzz(10);
  ampTaps++; clearTimeout(ampTimer); ampTimer = setTimeout(() => (ampTaps = 0), 1500);
  if (ampTaps >= 5) { ampTaps = 0; $("secret-modal").classList.add("show"); burst(100, .4); buzz([30, 40, 30]); }
});
document.querySelectorAll(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target === m || e.target.classList.contains("close")) m.classList.remove("show"); }));

/* ---------- languages ---------- */
const cloud = $("lang-cloud");
LANGS.forEach(([word, size, hl], i) => {
  const s = document.createElement("span");
  s.textContent = word;
  s.style.fontSize = size + "rem";
  s.style.animationDelay = (-(i * .7)) + "s";
  if (hl) s.classList.add("hl", "hand");
  cloud.appendChild(s);
});

/* ---------- love map path ---------- */
const mapWrap = $("map-wrap"), mapSvg = $("map-svg"), dashPath = $("dash-path"), maskPath = $("mask-path");
let mapLen = 0;
function layoutMap() {
  const box = mapWrap.getBoundingClientRect();
  if (!box.width) return;
  const pins = [...mapWrap.querySelectorAll(".pin")].map((p) => { const r = p.getBoundingClientRect(); return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }; });
  const end = mapWrap.querySelector(".map-end").getBoundingClientRect();
  pins.push({ x: end.left - box.left + end.width / 2, y: end.top - box.top });
  let d = `M ${pins[0].x} ${pins[0].y}`;
  for (let i = 1; i < pins.length; i++) {
    const a = pins[i - 1], b = pins[i], my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  mapSvg.setAttribute("width", box.width); mapSvg.setAttribute("height", box.height);
  mapSvg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  dashPath.setAttribute("d", d); maskPath.setAttribute("d", d);
  mapLen = maskPath.getTotalLength();
  maskPath.style.strokeDasharray = mapLen;
  drawMap();
}
function drawMap() {
  if (!mapLen) return;
  const r = mapWrap.getBoundingClientRect();
  const prog = Math.min(1, Math.max(0, (innerHeight * .75 - r.top) / r.height));
  maskPath.style.strokeDashoffset = mapLen * (1 - prog);
}
addEventListener("resize", layoutMap);
addEventListener("load", layoutMap);
mapWrap.querySelectorAll("img").forEach((img) => img.addEventListener("load", layoutMap));
setTimeout(layoutMap, 500);

/* ---------- swipe deck ---------- */
const deck = $("deck");
const cards = PHOTOS.map((ph, i) => {
  const c = document.createElement("div");
  c.className = "card"; c.dataset.i = i;
  c.innerHTML = `<img src="images/thumbs/${ph.file}" alt="${ph.cap}" draggable="false"><span class="hand">${ph.cap}</span>`;
  deck.appendChild(c);
  return c;
});
let order = cards.map((_, i) => i);
function renderDeck() {
  order.forEach((ci, pos) => {
    const c = cards[ci];
    c.classList.toggle("top", pos === 0);
    c.style.zIndex = 100 - pos;
    c.style.opacity = pos < 4 ? 1 : 0;
    const rot = pos === 0 ? 0 : (ci % 2 ? 1 : -1) * (2 + pos);
    c.style.transform = `translateY(${pos * 8}px) scale(${1 - pos * .04}) rotate(${rot}deg)`;
  });
  $("deck-count").textContent = `${order[0] + 1} / ${PHOTOS.length}`;
}
function nextCard(dir = 1) {
  const top = cards[order[0]];
  top.style.transform = `translateX(${dir * 520}px) rotate(${dir * 30}deg)`;
  top.style.opacity = 0;
  buzz(12);
  setTimeout(() => { order.push(order.shift()); renderDeck(); }, 260);
}
function prevCard() { order.unshift(order.pop()); renderDeck(); buzz(12); }
renderDeck();
let drag = null;
deck.addEventListener("pointerdown", (e) => {
  const top = cards[order[0]];
  if (!top.contains(e.target)) return;
  drag = { x: e.clientX, y: e.clientY, dx: 0, el: top };
  try { top.setPointerCapture(e.pointerId); } catch (_) {}
  top.classList.add("dragging");
});
deck.addEventListener("pointermove", (e) => {
  if (!drag) return;
  drag.dx = e.clientX - drag.x;
  drag.el.style.transform = `translateX(${drag.dx}px) rotate(${drag.dx / 14}deg)`;
});
function endDrag() {
  if (!drag) return;
  const { el, dx } = drag; drag = null; el.classList.remove("dragging");
  if (Math.abs(dx) > 80) nextCard(dx > 0 ? 1 : -1);
  else if (Math.abs(dx) < 6) { renderDeck(); openLightbox(+el.dataset.i); }
  else renderDeck();
}
deck.addEventListener("pointerup", endDrag);
deck.addEventListener("pointercancel", () => { if (drag) { drag.el.classList.remove("dragging"); drag = null; renderDeck(); } });
$("deck-next").addEventListener("click", () => nextCard(1));
$("deck-prev").addEventListener("click", prevCard);

const lb = $("lightbox");
function openLightbox(i) {
  $("lb-img").src = `images/${PHOTOS[i].file}`; $("lb-cap").textContent = PHOTOS[i].cap;
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
}
lb.addEventListener("click", () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); });

/* ---------- jar of reasons ---------- */
const glass = $("jar-glass");
const jarIcons = ["♥", "💌", "✿", "♥", "❤"];
for (let i = 0; i < 26; i++) {
  const it = document.createElement("i");
  it.textContent = jarIcons[i % jarIcons.length];
  it.style.left = (8 + Math.random() * 78) + "%";
  it.style.bottom = (4 + Math.random() * 62) + "%";
  it.style.color = COLORS[i % 5];
  it.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
  glass.appendChild(it);
}
let pool = [];
function refillPool() { pool = REASONS.map((_, i) => i).sort(() => Math.random() - .5); }
refillPool();
function pickReason() {
  const jar = $("jar");
  jar.classList.remove("shake"); void jar.offsetWidth; jar.classList.add("shake"); buzz(20);
  if (!pool.length) { refillPool(); toast("Kamlin 💯… walakin 3ndi ktar mn had chi ❤️"); }
  const idx = pool.shift();
  const note = $("jar-note");
  note.hidden = true; void note.offsetWidth;
  $("jar-text").textContent = REASONS[idx];
  $("jar-num").textContent = `— sbab ${REASONS.length - pool.length}/${REASONS.length}`;
  note.hidden = false;
  $("jar-left").textContent = pool.length;
  const items = glass.querySelectorAll("i:not(.gone)");
  if (items.length > 4) { const it = items[items.length - 1]; it.classList.add("gone"); it.style.opacity = 0; it.style.transform = "translateY(-120px) scale(1.6)"; }
}
$("jar-btn").addEventListener("click", pickReason);
$("jar").addEventListener("click", pickReason);

/* ---------- night sky ---------- */
const sky = $("sky"), lines = $("sky-lines");
let lastStar = null, readCount = 0;
const heartPos = STARS.map((_, i) => {
  const t = (i / STARS.length) * Math.PI * 2;
  const x = 16 * Math.sin(t) ** 3, y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: 50 + x * 2.5, y: 46 - y * 2.6 };
});
STARS.forEach((s, i) => {
  const b = document.createElement("button");
  b.className = "star"; b.textContent = "★";
  b.style.left = s.x + "%"; b.style.top = s.y + "%";
  b.style.animationDelay = (-i * .3) + "s";
  b.setAttribute("aria-label", "Njma " + (i + 1));
  b.addEventListener("click", () => {
    buzz(10);
    $("star-text").textContent = s.t;
    if (b.classList.contains("read") || sky.classList.contains("heart")) return;
    b.classList.add("read"); readCount++;
    if (lastStar) {
      const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
      l.setAttribute("x1", lastStar.x); l.setAttribute("y1", lastStar.y); l.setAttribute("x2", s.x); l.setAttribute("y2", s.y);
      lines.appendChild(l);
    }
    lastStar = s;
    if (readCount === STARS.length) setTimeout(formHeart, 900);
  });
  sky.appendChild(b);
});
function formHeart() {
  lines.innerHTML = "";
  sky.querySelectorAll(".star").forEach((b, i) => { b.style.left = heartPos[i].x + "%"; b.style.top = heartPos[i].y + "%"; });
  sky.classList.add("heart");
  for (let k = 0; k < 30; k++) {
    const t = ((k + .5) / 30) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3, y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const m = document.createElement("span");
    m.className = "mini"; m.textContent = "✦";
    m.style.left = (50 + x * 2.5) + "%"; m.style.top = (46 - y * 2.6) + "%";
    m.style.animationDelay = (1 + k * .04) + "s";
    sky.appendChild(m);
  }
  $("star-text").textContent = "Chofi… ga3 njoum dyali katrsem 9alb wa7ed ❤️";
  setTimeout(() => burst(90, .5), 1200); buzz([20, 60, 20]);
}

/* ---------- dreams ---------- */
const dreamList = $("dream-list");
DREAMS.forEach(([e, t, s]) => {
  const b = document.createElement("button");
  b.className = "dream";
  b.innerHTML = `<span class="e">${e}</span><b>${t}</b><small>${s}</small>`;
  b.addEventListener("click", () => {
    b.classList.toggle("on"); buzz(12);
    $("dream-line").classList.toggle("show", !!dreamList.querySelector(".on"));
  });
  dreamList.appendChild(b);
});

/* ---------- coupons ---------- */
const couponList = $("coupon-list");
COUPONS.forEach(([e, t, s]) => {
  const b = document.createElement("button");
  b.className = "coupon";
  b.innerHTML = `<span class="left">${e}</span><span class="right"><small>Bon dyal l7ob · Amine</small><b>${t}</b><span>${s}</span></span><span class="used hand">M9tou3 ✓</span>`;
  b.addEventListener("click", () => {
    if (b.classList.contains("claimed")) { toast("Had l bon deja m9tou3 😌"); return; }
    b.classList.add("claimed"); buzz(25);
    toast("Sifti liya screenshot dyal l bon bach nkhlles 😉");
  });
  couponList.appendChild(b);
});

/* ---------- envelope ---------- */
$("env-btn").addEventListener("click", () => { $("envelope").classList.add("open"); buzz(20); burst(60, .5); setTimeout(layoutMap, 100); });

/* ---------- promises ---------- */
const promises = [...document.querySelectorAll(".promise")];
promises.forEach((p) => p.addEventListener("click", () => {
  if (p.classList.contains("signed")) return;
  p.classList.add("signed"); buzz(18);
  if (promises.every((x) => x.classList.contains("signed"))) { $("promise-done").hidden = false; burst(90, .5); }
}));

/* ---------- bottle (letter for 2027) ---------- */
$("bottle").addEventListener("click", (e) => {
  const b = e.currentTarget;
  if (new Date() >= FUTURE_LETTER_DATE) { $("future-letter").hidden = false; $("bottle-msg").hidden = true; burst(80, .5); return; }
  b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); buzz(30);
  toast(`Mazal 🔒 ba9i ${fmt(daysUntil(FUTURE_LETTER_DATE))} nhar… sbri 😉`);
});

/* ---------- candles (20/12/2026) ---------- */
const candles = [...document.querySelectorAll(".candle")];
candles.forEach((c) => c.addEventListener("click", () => {
  if (!partyTime()) { buzz(20); toast(`Sbri chwiya 😉 ba9i ${daysUntil(ANNIVERSARY)} nhar l 20/12`); return; }
  if (c.classList.contains("lit")) return;
  c.classList.add("lit"); c.classList.remove("out"); buzz(15);
  if (candles.every((x) => x.classList.contains("lit"))) $("blow-btn").hidden = false;
}));
$("blow-btn").addEventListener("click", () => {
  candles.forEach((c) => { c.classList.remove("lit"); c.classList.add("out"); });
  $("blow-btn").hidden = true; $("party-line").hidden = false;
  buzz([40, 60, 40]); fireworks();
});

/* ---------- question: "La" runs away ---------- */
const noBtn = $("no-btn");
const noTexts = ["La", "Matb9aych 😅", "Akid? 🥺", "Fekri mzyan…", "Ah ❤️"];
let dodges = 0;
const lastDodge = () => dodges >= noTexts.length - 1;
function dodge(e) {
  if (lastDodge()) return;
  if (e) e.preventDefault();
  dodges++; buzz(8);
  const x = (Math.random() * 2 - 1) * Math.min(100, innerWidth * .22), y = 10 + Math.random() * 30;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  noBtn.textContent = noTexts[dodges];
  if (lastDodge()) { noBtn.style.transform = ""; noBtn.classList.remove("ghost"); }
}
function sayYes() {
  $("answers").hidden = true; $("final-letter").hidden = false;
  buzz([30, 50, 30, 50, 80]); fireworks();
}
noBtn.addEventListener("mouseenter", () => dodge());
noBtn.addEventListener("touchstart", dodge, { passive: false });
noBtn.addEventListener("click", (e) => (lastDodge() ? sayYes() : dodge(e)));
$("yes-btn").addEventListener("click", sayYes);

/* ---------- last page ---------- */
$("chapter-btn").addEventListener("click", (e) => { e.currentTarget.hidden = true; $("chapter3").hidden = false; burst(160, .4); buzz(40); });

/* ---------- greeting by time of day ---------- */
(function greet() {
  const h = new Date().getHours();
  const g = h >= 5 && h < 12 ? "Sba7 lkhir a Samia ☀️" : h < 18 ? "Nhar sa3id a Samia 🌤️" : h < 23 ? "Msa lkhir a Samia 🌙" : "Lila sa3ida a Samia ✨";
  $("greeting").textContent = g;
})();

/* ---------- word of the day ---------- */
const DAILY = [
  "Nti a7ssen 7aja w9e3at liya f 7yati.",
  "Kol nhar m3ak kayswa 3am.",
  "Ila tbasmti lyoum, rak dirti nhari zwin.",
  "Kanfker fik… dima, w bla ma n3ya.",
  "Nti ra7a dyali f had dnya.",
  "Wakha lb3d, 9albi 3ndek.",
  "Dhektek hiya lmusic li kanbghi.",
  "M3ak, kolchi kaywelli sahel.",
  "Kanbghik lyoum ktar mn lbar7.",
  "Nti l7olm li 3aych m3aya f lw9i3.",
  "Ma kaynch b7alek, w ma ghadich ykoun.",
  "Ila 3yiti lyoum, 3ndek wa7ed kaybghik bzaf.",
  "Kol message mnek kayfer7ni.",
  "Nti lmalja2 dyali.",
  "7ta l'ayam l3adiya katwelli zwina m3ak.",
  "Ana fakhour bik, dima.",
  "Kantmenna nchouf dhektek daba.",
  "Nti a7ssen « sba7 lkhir » w a7ssen « tsb7i 3la khir ».",
  "Ghadi nb9a m3ak, f lfar7 w f l7ozn.",
  "Lyoum, ghedda, w dima: nti.",
];
(function wordOfDay() {
  const now = new Date();
  const dayIndex = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - START_DATE) / 86400000);
  $("today-text").textContent = DAILY[((dayIndex % DAILY.length) + DAILY.length) % DAILY.length];
  $("today-date").textContent = "Kelma dyal lyoum · " + now.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
})();

/* ---------- memory game ---------- */
const GAME_PICS = ["photo-01.jpg", "photo-04.jpg", "photo-05.jpg", "photo-06.jpg", "photo-09.jpg", "photo-16.jpg"];
let gameOpen = [], gameBusy = false, gameMoves = 0, gamePairs = 0;
function newGame() {
  const grid = $("memory-grid");
  grid.innerHTML = "";
  gameOpen = []; gameBusy = false; gameMoves = 0; gamePairs = 0;
  $("game-moves").textContent = "0 mra"; $("game-pairs").textContent = "0/6"; $("game-win").hidden = true;
  const deckPics = [...GAME_PICS, ...GAME_PICS].sort(() => Math.random() - .5);
  deckPics.forEach((pic) => {
    const c = document.createElement("button");
    c.className = "mcard"; c.dataset.pic = pic;
    c.innerHTML = `<span class="in"><span class="face front">♥</span><span class="face back"><img src="images/thumbs/${pic}" alt="" loading="lazy"></span></span>`;
    c.addEventListener("click", () => flipCard(c));
    grid.appendChild(c);
  });
}
function flipCard(c) {
  if (gameBusy || c.classList.contains("open") || c.classList.contains("done")) return;
  c.classList.add("open"); buzz(8);
  gameOpen.push(c);
  if (gameOpen.length < 2) return;
  gameMoves++; $("game-moves").textContent = gameMoves + " mra";
  const [a, b] = gameOpen;
  if (a.dataset.pic === b.dataset.pic) {
    a.classList.add("done"); b.classList.add("done"); gameOpen = [];
    gamePairs++; $("game-pairs").textContent = gamePairs + "/6"; buzz(25);
    if (gamePairs === GAME_PICS.length) { $("game-win").hidden = false; burst(120, .5); buzz([30, 40, 30]); }
  } else {
    gameBusy = true;
    setTimeout(() => { a.classList.remove("open"); b.classList.remove("open"); gameOpen = []; gameBusy = false; }, 850);
  }
}
$("game-reset").addEventListener("click", newGame);
newGame();

/* ---------- hold-to-send hug ---------- */
const hugBtn = $("hug-heart"), hugFill = $("hug-fill");
let hugLevel = 0, hugHolding = false, hugDone = false, hugLast = 0;
function hugTick(t) {
  const dt = hugLast ? (t - hugLast) / 1000 : 0; hugLast = t;
  if (!hugDone) hugLevel = Math.min(1, Math.max(0, hugLevel + (hugHolding ? dt / 2.2 : -dt / 1.2)));
  hugFill.setAttribute("y", 90 - hugLevel * 98);
  $("hug-pct").textContent = hugDone ? "∞" : Math.round(hugLevel * 100) + "%";
  if (hugLevel >= 1 && !hugDone) {
    hugDone = true; hugBtn.classList.add("full"); hugBtn.classList.remove("pressing");
    $("hug-done").hidden = false; burst(150, .5); buzz([40, 50, 40, 50, 120]);
  }
  if (hugHolding || (hugLevel > 0 && !hugDone)) requestAnimationFrame(hugTick); else hugLast = 0;
}
function hugStart(e) { e.preventDefault(); if (hugDone) return; hugHolding = true; hugBtn.classList.add("pressing"); buzz(10); if (!hugLast) requestAnimationFrame(hugTick); }
function hugEnd() { hugHolding = false; hugBtn.classList.remove("pressing"); }
hugBtn.addEventListener("pointerdown", hugStart);
["pointerup", "pointerleave", "pointercancel"].forEach((t) => hugBtn.addEventListener(t, hugEnd));
hugBtn.addEventListener("contextmenu", (e) => e.preventDefault());
