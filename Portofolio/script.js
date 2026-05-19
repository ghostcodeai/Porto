/* ── MAGNETIC CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .proj-card, .skill-card, .mag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    ring.style.width = '60px'; ring.style.height = '60px';
    ring.style.borderColor = 'rgba(255,107,43,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px'; cursor.style.height = '8px';
    ring.style.width = '32px'; ring.style.height = '32px';
    ring.style.borderColor = 'rgba(255,107,43,0.35)';
  });
});

/* ── TILT CARDS ── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── ACTIVE NAV ── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(s => {
    const top = s.offsetTop - 80, bottom = top + s.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if (link) link.style.color = (scrollY >= top && scrollY < bottom) ? '#FF8C42' : '';
  });
});

/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const step = () => {
    start += Math.ceil((target - start) / 8);
    el.textContent = start + suffix;
    if (start < target) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  step();
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCounter(el, parseInt(el.dataset.target), el.dataset.suffix || '');
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ── PARALLAX HERO TEXT ── */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  if (heroLeft) heroLeft.style.transform = `translateY(${sy * 0.12}px)`;
  if (heroRight) heroRight.style.transform = `translateY(${sy * 0.07}px)`;
});

/* ── TYPEWRITER ── */
const phrases = ['Full-Stack Engineer', 'Problem Solver', 'Systems Thinker', 'Open Source Dev'];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');
function typeLoop() {
  if (!tw) return;
  const phrase = phrases[pi];
  tw.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
  if (!deleting && ci > phrase.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
  if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

/* ── GRID HOVER GLOW ── */
const grid = document.getElementById('hoverGrid');
if (grid) {
  grid.addEventListener('mousemove', e => {
    const r = grid.getBoundingClientRect();
    grid.style.setProperty('--gx', (e.clientX - r.left) + 'px');
    grid.style.setProperty('--gy', (e.clientY - r.top) + 'px');
  });
}
/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mLinks    = document.querySelectorAll('.m-link');

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mLinks.forEach(a => a.addEventListener('click', closeMobileNav));

// Close on resize back to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileNav();
});

/* ── DISABLE PARALLAX ON TOUCH ── */
const isTouch = window.matchMedia('(hover: none)').matches;
if (isTouch) {
  // Remove the scroll parallax listener entirely on touch devices
  window.removeEventListener('scroll', () => {});
}