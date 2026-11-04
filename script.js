/* ================= Settings ================= */

const START_DATE = new Date(2024, 11, 20, 0, 0, 0);    // 20/12/2024
const ANNIVERSARY = new Date(2026, 11, 20, 0, 0, 0);   // 20/12/2026

const SCREENS = ["welcome", "lock", "story", "memories", "gallery-screen", "letters", "reasons", "quiz", "countdown", "question", "final"];

const PHOTOS = [
  { file: "photo-01.jpg", cap: "Nti w ana ❤️" },
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

const LETTERS = [
  ["💌", "Mli tw7chini", `Ila chi nhar tw7chtini...

Tal3i chofi sma ❤️

W fekri bli wakha b3ad,
kayn ana f 9albek w f 3a9lek,
kanb9a kanfker fik w kanfra7.

W ghadi nb9a 7yati kamla m3ak,
w ghadi yji nhar li n7a99o fih l7lm dyalna,
w ntjm3o w ma tb9ach dik lmasafa.

W daba fima twa7chtini, sonni liya…
ghadi tl9ayni dima kantsnak.

W kanbghik bzaf ❤️`],
  ["❤️", "Mli tkouni m9el9a", `Ila knti m9el9a daba,
khdi nafas 3mi9
w ma tfekrich joj marrat…
ji 3awdi liya ach m9el9ek w ach bik.

7it nti machi bo7dek,
w 3mmrek ghadi tkouni bo7dek.

W ana hna dima,
f lfar7 9bel l7ozn,
f l'ayam zwina
w 7ta f l'ayam lkhayba.

Dima 3ndek wa7ed kaybghik ❤️`],
  ["😂", "Mli t7taji tbtasmi", `Dhektek zwina a 7bibti 😂❤️

Khassek tdhki daba.

Tfekri dakchi zwin binatna,
li kaydhek b tabi3at l7al,
w li kaykhllik tbtasmi bla ma t7essi...

W ila ma khdemch hadchi,
tsawri wjhi
w ana kan7awel ndhhkek
b ay tari9a 😂❤️`],
  ["🥺", "Mli tchkki wach kanbghik", `Ila chi nhar dkhel lik chak
w glti:

"Wach bss7 kaybghini?"

Ljawab howa:

AH.

Nti hiya 7yati w kolchi 3ndi.
Fima kat koun biya chi 7aja, kanji 3ndek nti,
7it nti hiya rou7i w lmalja2 dyali f had dnya.

Nti li m3awda kolchi li kont m7taj,
w nhar 3la nhar kanzid nbghik ktar mn li 9blo ❤️`],
  ["🎂", "Nhar 2 ans dyalna", `Joyeux 2 ans a 7bibti ❤️🎂

Joj snin hadi w nti m3aya,
f lfar7 w f l7ozn,
f l9rib w f lb3id.

Chokran 3la kol nhar 3titih liya,
3la kol dhka, kol kelma zwina,
w 3la sbrek 3liya.

Hadchi ghir lbdya…
w li jay a7ssen mn li fat, inchallah ❤️✨`],
];

const REASONS = [
  "Dhektek… katbeddel nhari kaml f tanya.",
  "3inik — fihom ldar dyali.",
  "7it nti sadi9a dyali 9bel ma tkouni 7bibti.",
  "Sbrek 3liya, 7ta f l'ayam s3ab.",
  "Katfhmini bla ma ngoul walo.",
  "Katkhllini nwelli wa7ed a7ssen.",
  "9albek lkbir m3a nas kamlin.",
  "7it nti… nti. W ma kaynach b7alek ❤️",
];

const QUESTIONS = [
  { q: "Fo9ach bdat l7kaya dyalna?", a: ["14/02/2025", "20/12/2024 ❤️", "01/01/2025"], c: 1 },
  { q: "Chno lon li kna labsin f awel tswira m3a ba3diyatna?", a: ["L k7el 🖤", "Lbyad 🤍", "L7mer ❤️"], c: 1 },
  { q: "Chkon m7dod aktar f had l3ala9a?", a: ["Ana 😎", "Nti ❤️", "Bjoujna 😂"], c: 2 },
  { q: "Chno khasna njm3o aktar?", a: ["Lmachakil 😂", "Dkriyat zwina 📸", "Lwatay9 😭"], c: 1 },
  { q: "Chno aktar 7aja kat3jbni fik?", a: ["Dhektek", "9albek", "Kolchi fik ❤️"], c: 2 },
];

/* ============================================ */

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const forceParty = location.hash === "#fete";

const gf = $("gfonts"); if (gf) gf.media = "all";

/* ---------- confetti (hearts + paper) ---------- */
const canvas = $("confetti"), ctx = canvas.getContext("2d");
let parts = [], raf = null;
function sizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
sizeCanvas(); addEventListener("resize", sizeCanvas);
const COLORS = ["#ff4f9a", "#9d4edd", "#ff9ac3", "#ffd6e8", "#ffffff", "#c58bff", "#ffcf6b"];
function heart(s) {
  ctx.beginPath();
  ctx.moveTo(0, s * .3);
  ctx.bezierCurveTo(0, 0, -s * .5, 0, -s * .5, s * .3);
  ctx.bezierCurveTo(-s * .5, s * .6, 0, s * .8, 0, s);
  ctx.bezierCurveTo(0, s * .8, s * .5, s * .6, s * .5, s * .3);
  ctx.bezierCurveTo(s * .5, 0, 0, 0, 0, s * .3);
  ctx.fill();
}
function burst(count = 140, originY = 0.4) {
  if (reduceMotion) return;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9;
    parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 100, y: innerHeight * originY,
      vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 6, s: 7 + Math.random() * 9,
      rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: COLORS[(Math.random() * COLORS.length) | 0], h: Math.random() < .5, life: 0,
    });
  }
  if (!raf) loop();
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach((p) => {
    p.vy += .22; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - p.life / 220);
    if (p.h) { ctx.translate(0, -p.s / 2); heart(p.s * 1.3); } else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  });
  parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 220);
  raf = parts.length ? requestAnimationFrame(loop) : (ctx.clearRect(0, 0, innerWidth, innerHeight), null);
}

/* ---------- navigation ---------- */
const historyStack = [];
let currentScreen = "welcome";
function goTo(id, isBack = false) {
  if (!isBack && currentScreen !== id) historyStack.push(currentScreen);
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
  currentScreen = id;
  window.scrollTo({ top: 0, behavior: "auto" });
  $("progress-bar").style.width = (SCREENS.indexOf(id) / (SCREENS.length - 1)) * 100 + "%";
  $("back-btn").hidden = id === "welcome";
  if (id === "quiz") startQuiz();
  if (id === "countdown" && (partyTime())) setTimeout(() => burst(180, .3), 300);
  if (id === "final") setTimeout(() => burst(160, .35), 300);
  if (id === "lock") setTimeout(() => $("secret").focus(), 400);
}
document.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => goTo(b.dataset.go)));
$("back-btn").addEventListener("click", () => { const prev = historyStack.pop(); if (prev) goTo(prev === "lock" ? "welcome" : prev, true); });

/* ---------- lock ---------- */
function isOurDate(value) {
  const g = (value.match(/\d+/g) || []);
  if (g.length >= 3 && g[0].length === 4) return +g[0] === 2024 && +g[1] === 12 && +g[2] === 20;
  if (g.length >= 3) {
    let y = g[2]; if (y.length === 2) y = "20" + y;
    return +y === 2024 && ((+g[0] === 20 && +g[1] === 12) || (+g[0] === 12 && +g[1] === 20));
  }
  if (g.length === 1) {
    const s = g[0];
    return s === "20122024" || s === "201224";
  }
  return false;
}
function tryUnlock() {
  const input = $("secret"), err = $("lock-error"), card = input.closest(".card");
  if (isOurDate(input.value.trim())) {
    err.textContent = "";
    $("lock-icon").textContent = "🔓";
    $("lock-icon").classList.add("unlocked");
    burst(90, .35);
    setTimeout(() => goTo("story"), 900);
  } else {
    err.textContent = input.value.trim() ? "Hadi machi hiya 😂 jerrbi tarikh s7i7 ❤️" : "Ktbi chi tarikh a 7bibti 😅";
    card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
  }
}
$("unlock-btn").addEventListener("click", tryUnlock);
$("secret").addEventListener("keydown", (e) => { if (e.key === "Enter") tryUnlock(); });

/* ---------- counters ---------- */
function diffParts(from, to) {
  let y = to.getFullYear() - from.getFullYear(), m = to.getMonth() - from.getMonth(), d = to.getDate() - from.getDate();
  let h = to.getHours() - from.getHours(), min = to.getMinutes() - from.getMinutes(), s = to.getSeconds() - from.getSeconds();
  if (s < 0) { s += 60; min--; }
  if (min < 0) { min += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); m--; }
  if (m < 0) { m += 12; y--; }
  return { y, m, d, h, min, s };
}
const partyTime = () => forceParty || new Date() >= ANNIVERSARY;
function tick() {
  const now = new Date();
  const p = diffParts(START_DATE, now);
  $("c-years").textContent = p.y;
  $("l-years").textContent = p.y > 1 ? "snin" : "3am";
  $("c-months").textContent = p.m;
  $("c-days").textContent = p.d;
  $("c-hours").textContent = pad(p.h);
  $("c-mins").textContent = pad(p.min);
  $("c-secs").textContent = pad(p.s);
  $("c-total").textContent = Math.floor((now - START_DATE) / 86400000);

  if (partyTime()) {
    $("cd-waiting").hidden = true; $("cd-party").hidden = false;
  } else {
    const secs = Math.floor((ANNIVERSARY - now) / 1000);
    $("cd-days").textContent = Math.floor(secs / 86400);
    $("cd-hours").textContent = pad(Math.floor(secs / 3600) % 24);
    $("cd-mins").textContent = pad(Math.floor(secs / 60) % 60);
    $("cd-secs").textContent = pad(secs % 60);
  }
}
tick(); setInterval(tick, 1000);
$("party-btn").addEventListener("click", () => burst(180, .3));

/* ---------- gallery + lightbox ---------- */
const gallery = $("gallery");
PHOTOS.forEach((ph, i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.style.setProperty("--r", (i % 2 ? 1 : -1) * (1 + (i * 7) % 3) + "deg");
  b.style.setProperty("--d", (i * 0.06) + "s");
  b.setAttribute("aria-label", ph.cap);
  b.innerHTML = `<img src="images/thumbs/${ph.file}" alt="${ph.cap}" loading="lazy"><span class="cap">${ph.cap}</span>`;
  b.addEventListener("click", () => openLightbox(i));
  gallery.appendChild(b);
});
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
function openLightbox(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); }
function closeLightbox() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); stopAuto(); }
function startAuto() { stopAuto(); timer = setInterval(() => show(current + 1), 3500); lbPlay.textContent = "❚❚ Pause"; }
function stopAuto() { clearInterval(timer); timer = null; lbPlay.textContent = "▶ Auto"; }
lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
lb.querySelector(".lb-prev").addEventListener("click", () => { stopAuto(); show(current - 1); });
lb.querySelector(".lb-next").addEventListener("click", () => { stopAuto(); show(current + 1); });
lbPlay.addEventListener("click", () => (timer ? stopAuto() : startAuto()));
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-figure")) closeLightbox(); });
$("play-all").addEventListener("click", () => { openLightbox(0); startAuto(); });
let touchX = null;
lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 45) { stopAuto(); show(current + (dx < 0 ? 1 : -1)); }
  touchX = null;
});

/* ---------- letters ---------- */
const grid = $("letters-grid");
LETTERS.forEach(([icon, title, text], i) => {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "letter-btn" + (i === LETTERS.length - 1 ? " special" : "");
  b.innerHTML = `${icon}<span>${title}</span>`;
  b.addEventListener("click", () => {
    $("letter-icon").textContent = icon;
    $("letter-title").textContent = title;
    $("letter-text").textContent = text;
    $("letter-modal").classList.add("show");
    b.classList.add("read");
  });
  grid.appendChild(b);
});
function closeModal(modal) { modal.classList.remove("show"); }
document.querySelectorAll(".modal").forEach((m) => {
  m.addEventListener("click", (e) => { if (e.target === m || e.target.classList.contains("close")) closeModal(m); });
});

/* ---------- reasons ---------- */
const cards = $("cards");
REASONS.forEach((text, i) => {
  const c = document.createElement("button");
  c.type = "button";
  c.className = "flip";
  c.innerHTML = `<div class="flip-inner"><div class="face f-front"><b>${i + 1}</b><small>klixi ❤️</small></div><div class="face f-back">${text}</div></div>`;
  c.addEventListener("click", () => c.classList.toggle("flipped"));
  cards.appendChild(c);
});

/* ---------- quiz ---------- */
let qIndex = 0, score = 0, locked = false;
function startQuiz() { qIndex = 0; score = 0; renderQuiz(); }
function renderQuiz() {
  const box = $("quiz-box");
  if (qIndex >= QUESTIONS.length) {
    const msg = score === QUESTIONS.length ? "Kat3rfini mzyan bzaaf 😍" : score >= 3 ? "Mzyan! Walakin kayn chwiya dyal lkhdma 😏" : "Hmm… khassna nhdro ktar 😂";
    box.innerHTML = `<div class="icon bounce">🎉</div>
      <h3>Jebti ${score}/${QUESTIONS.length}!</h3>
      <p class="soft">${msg}<br>Walakin bss7… a7ssen natija hiya ch7al kanbghik ❤️</p>
      <button class="primary" id="quiz-next">Kmmli ❤️</button>`;
    $("quiz-next").addEventListener("click", () => goTo("countdown"));
    if (score === QUESTIONS.length) burst(120, .35);
    return;
  }
  const q = QUESTIONS[qIndex];
  box.innerHTML = `<p class="quiz-step">${qIndex + 1} / ${QUESTIONS.length}</p>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">${q.a.map((a, i) => `<button class="quiz-option" data-i="${i}">${a}</button>`).join("")}</div>
    <p class="quiz-feedback" id="quiz-feedback"></p>`;
  locked = false;
  box.querySelectorAll(".quiz-option").forEach((b) => b.addEventListener("click", () => answer(+b.dataset.i)));
}
function answer(i) {
  if (locked) return;
  locked = true;
  const q = QUESTIONS[qIndex], opts = document.querySelectorAll(".quiz-option");
  const ok = i === q.c;
  if (ok) score++;
  opts.forEach((o, k) => o.classList.add(k === q.c ? "right" : "wrong"));
  $("quiz-feedback").textContent = ok ? "Bravo a 7bibti! ❤️" : "La la 😂 hadi hiya ❤️";
  setTimeout(() => { qIndex++; renderQuiz(); }, 1200);
}

/* ---------- question (the "La" button runs away) ---------- */
const noBtn = $("no-btn");
const noTexts = ["La", "Matb9aych 😅", "Akid? 🥺", "Fekri mzyan…", "Ah ❤️"];
let dodges = 0;
const lastDodge = () => dodges >= noTexts.length - 1;
function dodge(e) {
  if (lastDodge()) return;
  if (e) e.preventDefault();
  dodges++;
  const x = (Math.random() * 2 - 1) * Math.min(90, innerWidth * 0.2);
  const y = 6 + Math.random() * 30;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  noBtn.textContent = noTexts[dodges];
  if (lastDodge()) { noBtn.style.transform = ""; noBtn.classList.replace("secondary", "primary"); }
}
noBtn.addEventListener("mouseenter", () => dodge());
noBtn.addEventListener("touchstart", dodge, { passive: false });
noBtn.addEventListener("click", (e) => (lastDodge() ? goTo("final") : dodge(e)));
$("yes-btn").addEventListener("click", () => goTo("final"));

/* ---------- final ---------- */
$("surprise-btn").addEventListener("click", () => { $("surprise-modal").classList.add("show"); burst(200, .3); });
$("restart-btn").addEventListener("click", () => { historyStack.length = 0; goTo("welcome", true); });

/* ---------- floating hearts ---------- */
const heartsBox = $("hearts");
function spawnHeart() {
  if (document.hidden) return;
  const h = document.createElement("span");
  h.textContent = ["❤", "♡", "✦"][(Math.random() * 3) | 0];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 10 + Math.random() * 22 + "px";
  h.style.setProperty("--o", (0.2 + Math.random() * 0.5).toFixed(2));
  h.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
  h.style.animationDuration = 7 + Math.random() * 5 + "s";
  heartsBox.appendChild(h);
  h.addEventListener("animationend", () => h.remove());
}
if (!reduceMotion) setInterval(spawnHeart, 650);
