// ===== 1. Typing animation in the hero terminal =====
const roles = [
  "Future Full-Stack Developer",
  "Aspiring AppSec Engineer",
  "IT & Security Pro",
  "Entrepreneur & Founder",
  "CodeSquad Student"
];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
  } else if (deleting && charIndex > 0) {
    charIndex--;
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1400); // pause on the full word
    return;
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ===== 2. Reveal sections as you scroll =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== 3. Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== 4. Screenshot gallery + lightbox =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".shot img").forEach((img) => {
  // If the image file is missing, show a friendly placeholder instead
  const showPlaceholder = () => {
    const ph = document.createElement("div");
    ph.className = "placeholder";
    ph.textContent = "Add " + img.getAttribute("src");
    img.replaceWith(ph);
  };
  img.addEventListener("error", showPlaceholder);
  // The image may have already failed before this script ran
  if (img.complete && img.naturalWidth === 0) showPlaceholder();

  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
  });
});

function closeLightbox() { lightbox.classList.remove("open"); }
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

// ===== 5. Tap to flip cards on phones =====
document.querySelectorAll(".flip-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("flipped"));
});

// ===== 6. Travel brochure: stamp your passport =====
const stampCount = document.getElementById("stampCount");
document.querySelectorAll(".dest").forEach((card) => {
  const btn = card.querySelector(".stamp-btn");
  btn.addEventListener("click", () => {
    card.classList.toggle("stamped");
    btn.textContent = card.classList.contains("stamped") ? "Stamped! ✓" : "Stamp my passport";
    stampCount.textContent = document.querySelectorAll(".dest.stamped").length;
  });
});

// ===== 7. Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 8. Animated "network" background =====
// Floating dots that connect with lines when close, a nod to my networking background.
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
let dots = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.floor((canvas.width * canvas.height) / 22000);
  dots = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((d, i) => {
    d.x += d.vx;
    d.y += d.vy;
    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

    ctx.fillStyle = "rgba(57, 255, 136, 0.6)";
    ctx.beginPath();
    ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < dots.length; j++) {
      const o = dots[j];
      const dist = Math.hypot(d.x - o.x, d.y - o.y);
      if (dist < 120) {
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - dist / 120)})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();
