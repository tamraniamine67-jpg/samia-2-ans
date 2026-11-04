/* ================= Settings ================= */

const START_DATE = new Date(2024, 11, 20, 0, 0, 0);       // 20 décembre 2024
const ANNIVERSARY = new Date(2026, 11, 20, 0, 0, 0);      // 20 décembre 2026

const PHOTOS = [
  { file: "photo-01.jpg", cap: "Nti w ana ♥" },
  { file: "photo-04.jpg", cap: "Ma Samia" },
  { file: "photo-05.jpg", cap: "Zwina dima" },
  { file: "photo-06.jpg", cap: "Bin lwrd" },
  { file: "photo-02.jpg", cap: "Dhkat dyalna" },
  { file: "photo-07.jpg", cap: "Golden hour" },
  { file: "photo-09.jpg", cap: "Princesse" },
  { file: "photo-08.jpg", cap: "Sun-kissed" },
  { file: "photo-10.jpg", cap: "Classe" },
  { file: "photo-03.jpg", cap: "7na" },
  { file: "photo-11.jpg", cap: "Ma préférée" },
  { file: "photo-12.jpg", cap: "Nour dyali" },
  { file: "photo-13.jpg", cap: "Click ♥" },
  { file: "photo-14.jpg", cap: "Toujours toi" },
];

const REASONS = [
  "Dhektek… katbeddel nhari kaml f thanya.",
  "3inik — fihom ldar dyali.",
  "Hit nti sadi9a dyali 9bel ma tkouni 7bibti.",
  "Sbrek 3liya, 7ta f l'ayyam li ma kontch sahel.",
  "Katfhmini bla ma ngoul walo.",
  "Ton style — kol outfit dyalek, une photo de magazine.",
  "Kat5alini nwli wa7ed a7ssen.",
  "M3ak, ana ana — bla masques.",
  "Katdhki 3la blagues dyali, 7ta l9bi7in 😅",
  "L9alb dyalek lkbir m3a nas kaml.",
  "7ta f l'b3d, kat7essesni bli nti 7daya.",
  "Hit nti… nti. W ma kaynach b7alek.",
];

/* ============================================ */

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// load Google fonts without blocking the page
const gf = $("gfonts"); if (gf) gf.media = "all";

/* ---------- confetti ---------- */
const canvas = $("confetti"), ctx = canvas.getContext("2d");
let parts = [], raf = null;
function sizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeCanvas(); addEventListener("resize", sizeCanvas);
const COLORS = ["#e79aa6", "#c4566b", "#f6c9d0", "#c9a26b", "#ffffff", "#ff8fa3"];
function heartPath(x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * .3);
  ctx.bezierCurveTo(x, y, x - s * .5, y, x - s * .5, y + s * .3);
  ctx.bezierCurveTo(x - s * .5, y + s * .6, x, y + s * .8, x, y + s);
  ctx.bezierCurveTo(x, y + s * .8, x + s * .5, y + s * .6, x + s * .5, y + s * .3);
  ctx.bezierCurveTo(x + s * .5, y, x, y, x, y + s * .3);
  ctx.fill();
}
function burst(count = 140, originY = 0.35) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9;
    parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * originY,
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 6,
      s: 7 + Math.random() * 9, rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: COLORS[(Math.random() * COLORS.length) | 0], heart: Math.random() < .45, life: 0,
    });
  }
  if (!raf) loop();
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach((p) => {
    p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
    ctx.globalAlpha = Math.max(0, 1 - p.life / 220);
    if (p.heart) heartPath(0, -p.s / 2, p.s * 1.3); else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  });
  parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 220);
  raf = parts.length ? requestAnimationFrame(loop) : (ctx.clearRect(0, 0, innerWidth, innerHeight), null);
}

/* ---------- intro ---------- */
const forceParty = location.hash === "#fete";
function openIntro() {
  $("intro").classList.add("gone");
  document.body.classList.remove("locked");
  burst(120, 0.45);
}
$("open-btn").addEventListener("click", openIntro);
if (location.hash) { $("intro").classList.add("gone"); document.body.classList.remove("locked"); }

/* ---------- countdown + together counter ---------- */
function diffParts(from, to) {
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  let h = to.getHours() - from.getHours();
  let min = to.getMinutes() - from.getMinutes();
  let s = to.getSeconds() - from.getSeconds();
  if (s < 0) { s += 60; min--; }
  if (min < 0) { min += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); m--; }
  if (m < 0) { m += 12; y--; }
  return { y, m, d, h, min, s };
}

let partyShown = false;
function showParty() {
  if (partyShown) return;
  partyShown = true;
  $("cd-waiting").hidden = true;
  $("cd-party").hidden = false;
  const io = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { burst(180, 0.3); io.disconnect(); }
  }, { threshold: 0.4 });
  io.observe($("cd-party"));
}
$("party-btn").addEventListener("click", () => burst(180, 0.3));

function tick() {
  const now = new Date();
  const left = ANNIVERSARY - now;
  if (left <= 0 || forceParty) showParty();
  else {
    const secs = Math.floor(left / 1000);
    $("cd-days").textContent = Math.floor(secs / 86400);
    $("cd-hours").textContent = pad(Math.floor(secs / 3600) % 24);
    $("cd-mins").textContent = pad(Math.floor(secs / 60) % 60);
    $("cd-secs").textContent = pad(secs % 60);
  }
  const p = diffParts(START_DATE, now);
  $("c-years").textContent = p.y;
  $("l-years").textContent = p.y > 1 ? "ans" : "an";
  $("c-months").textContent = p.m;
  $("c-days").textContent = p.d;
  $("c-hours").textContent = pad(p.h);
  $("c-mins").textContent = pad(p.min);
  $("c-secs").textContent = pad(p.s);
  $("c-total").textContent = Math.floor((now - START_DATE) / 86400000).toLocaleString("fr-FR");
}
tick();
setInterval(tick, 1000);

/* ---------- gallery ---------- */
const gallery = $("gallery");
PHOTOS.forEach((ph, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.style.setProperty("--r", (i % 2 ? 1 : -1) * (1 + (i * 7) % 3) + "deg");
  b.setAttribute("aria-label", ph.cap);
  b.innerHTML = `<img src="images/thumbs/${ph.file}" alt="${ph.cap}" loading="lazy"><span class="cap">${ph.cap}</span>`;
  b.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(b);
});

/* ---------- lightbox + slideshow ---------- */
const lb = $("lightbox"), lbImg = $("lb-img"), lbCap = $("lb-cap"), lbCount = $("lb-count"), lbPlay = $("lb-play");
let current = 0, timer = null;
function show(i) {
  current = (i + PHOTOS.length) % PHOTOS.length;
  lbImg.style.opacity = 0;
  const next = new Image();
  next.onload = () => { lbImg.src = next.src; lbImg.style.opacity = 1; };
  next.src = `images/${PHOTOS[current].file}`;
  lbCap.textContent = PHOTOS[current].cap;
  lbCount.textContent = `${current + 1} / ${PHOTOS.length}`;
}
function openLightbox(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
function closeLightbox() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; stopAuto(); }
function startAuto() { stopAuto(); timer = setInterval(() => show(current + 1), 3500); lbPlay.textContent = "❚❚ Pause"; }
function stopAuto() { clearInterval(timer); timer = null; lbPlay.textContent = "▶ Auto"; }
lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
lb.querySelector(".lb-prev").addEventListener("click", () => { stopAuto(); show(current - 1); });
lb.querySelector(".lb-next").addEventListener("click", () => { stopAuto(); show(current + 1); });
lbPlay.addEventListener("click", () => (timer ? stopAuto() : startAuto()));
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-figure")) closeLightbox(); });
$("play-all").addEventListener("click", () => { openLightbox(0); startAuto(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") { stopAuto(); show(current + 1); }
  if (e.key === "ArrowLeft") { stopAuto(); show(current - 1); }
});
let touchX = null;
lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 45) { stopAuto(); show(current + (dx < 0 ? 1 : -1)); }
  touchX = null;
});

/* ---------- reasons ---------- */
const cards = $("cards");
REASONS.forEach((text, i) => {
  const c = document.createElement("button");
  c.type = "button";
  c.className = "card reveal";
  c.innerHTML = `<div class="card-inner">
      <div class="card-face card-front"><span class="num">${i + 1}</span><span class="lbl">raison</span><span class="h">♥</span></div>
      <div class="card-face card-back">${text}</div>
    </div>`;
  c.addEventListener("click", () => c.classList.toggle("flipped"));
  cards.appendChild(c);
});

/* ---------- letter ---------- */
$("env-btn").addEventListener("click", () => {
  const env = $("envelope");
  env.classList.add("open");
  document.querySelectorAll("#letter p").forEach((p, i) => { p.style.animationDelay = (0.35 + i * 0.45) + "s"; });
  burst(60, 0.5);
});

/* ---------- surprise ---------- */
const noBtn = $("no-btn");
const noTexts = ["La", "Matb9aych 😅", "Akid? 🥺", "Fekri mzyan…", "Oui ♥"];
let dodges = 0;
function dodge(e) {
  if (dodges >= noTexts.length - 1) return;
  if (e) e.preventDefault();
  dodges++;
  const x = (Math.random() * 2 - 1) * Math.min(130, innerWidth * 0.25);
  const y = (Math.random() * 2 - 1) * 40;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  noBtn.textContent = noTexts[dodges];
  if (dodges === noTexts.length - 1) { noBtn.classList.remove("btn-ghost"); noBtn.style.transform = ""; }
}
noBtn.addEventListener("mouseenter", () => dodge());
noBtn.addEventListener("touchstart", dodge, { passive: false });
noBtn.addEventListener("click", (e) => { if (dodges >= noTexts.length - 1) sayYes(); else dodge(e); });
function sayYes() {
  $("surprise-box").hidden = true;
  $("final").hidden = false;
  burst(220, 0.4);
  setTimeout(() => burst(160, 0.25), 700);
}
$("yes-btn").addEventListener("click", sayYes);

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal, .gallery button").forEach((el) => io.observe(el));

/* ---------- floating hearts ---------- */
const heartsBox = document.querySelector(".hearts");
function spawnHeart() {
  if (document.hidden) return;
  const h = document.createElement("span");
  h.textContent = Math.random() < 0.8 ? "♥" : "♡";
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 10 + Math.random() * 18 + "px";
  h.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  h.style.animationDuration = 9 + Math.random() * 8 + "s";
  heartsBox.appendChild(h);
  h.addEventListener("animationend", () => h.remove());
}
if (!reduceMotion) setInterval(spawnHeart, 900);
