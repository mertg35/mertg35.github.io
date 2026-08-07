// ========================
// Language Toggle
// ========================
const html = document.documentElement;
const langBtn = document.getElementById('langToggle');
let currentLang = localStorage.getItem('mg-lang') || 'tr';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('mg-lang', lang);
  if (langBtn) langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
  html.lang = lang;
  document.querySelectorAll('[data-tr]').forEach(el => {
    el.textContent = lang === 'tr' ? el.dataset.tr : el.dataset.en;
  });
}

applyLang(currentLang);

if (langBtn) {
  langBtn.addEventListener('click', () => {
    applyLang(currentLang === 'tr' ? 'en' : 'tr');
  });
}

// ========================
// Mobile Menu Toggle
// ========================
const menuBtn = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav__links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ========================
// Theme Toggle
// ========================
const btn = document.getElementById('themeToggle');
const icon = document.getElementById('toggleIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('mg-theme', theme);
}

// Load saved or default (dark)
const saved = localStorage.getItem('mg-theme') || 'dark';
applyTheme(saved);

btn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

// ========================
// Scroll Fade-In
// ========================
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.blog-card, .expertise-card, .interest-card, .contact-card, .section__header')
  .forEach((el) => {
    el.classList.add('fade-in');
    io.observe(el);
  });

// ========================
// Sticky nav shadow, scroll progress, back-to-top, active nav
// ========================
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const navAnchors = document.querySelectorAll('.nav__links a');

function getActiveSection() {
  const probe = window.scrollY + 100;
  let id = '';
  navAnchors.forEach((a) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target && target.offsetTop <= probe) id = target.id;
  });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
    const contact = document.getElementById('contact');
    if (contact) id = contact.id;
  }
  return id;
}

function updateScrollUI() {
  nav.style.boxShadow =
    window.scrollY > 40 ? '0 4px 24px rgba(0,0,0,.15)' : 'none';

  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? (window.scrollY / max) * 100 + '%' : '0';
  }

  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);

  const active = getActiveSection();
  navAnchors.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + active);
  });
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ========================
// Cursor glow
// ========================
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  let raf = null;
  window.addEventListener('mousemove', (e) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      glow.style.transform = `translate(${e.clientX - 240}px, ${e.clientY - 240}px)`;
      raf = null;
    });
  });
}

// ========================
// 3D tilt on expertise cards
// ========================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.expertise-card').forEach((card) => {
    card.classList.add('tilt');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 8;
      const ry = (px - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ========================
// Magnetic hero buttons
// ========================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.hero__cta .btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ========================
// vCard QR Code (Using API for maximum compatibility)
// ========================
const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'FN:Mert Güventürk',
  'N:Güventürk;Mert;;;',
  'TEL;TYPE=CELL:+905335680048',
  'EMAIL:mert@suya.info',
  'URL:https://www.linkedin.com/in/mertguventurk',
  'ORG:SUYA Danışmanlık & Yazılım',
  'TITLE:Kurucu Ortak · Satış Danışmanlığı',
  'END:VCARD'
].join('\n');

function buildQR() {
  const el = document.getElementById('qr-canvas');
  if (!el) return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const color = isDark ? 'e0e0ff' : '13131f';
  const bgcolor = isDark ? '1a1a2e' : 'ffffff';
  
  const encodedVcard = encodeURIComponent(VCARD);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedVcard}&size=180x180&color=${color}&bgcolor=${bgcolor}&margin=0`;

  el.innerHTML = `<img src="${qrUrl}" alt="vCard QR Code" width="180" height="180" style="border-radius: 6px; display: block;">`;
}

window.addEventListener('DOMContentLoaded', buildQR);
buildQR();

const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => setTimeout(buildQR, 50));
}

const vcfBtn = document.getElementById('vcf-download');
if (vcfBtn) {
  const blob = new Blob([VCARD], { type: 'text/vcard;charset=utf-8' });
  vcfBtn.href = URL.createObjectURL(blob);
}
