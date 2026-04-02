/* ===== ZENISCALE — SCRIPTS ===== */

/* Page routing */
function goTo(page) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
    p.style.opacity = '0';
  });

  var target = document.getElementById('page-' + page);
  if (!target) return;

  document.getElementById('mobileMenu').classList.remove('open');

  setTimeout(function() {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(function() {
      target.style.opacity = '1';
    }, 20);

    document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function(a) {
      if (a.dataset.page === page) {
        a.classList.add('active-link');
      } else {
        a.classList.remove('active-link');
      }
    });

    initReveal();
  }, 200);
}

/* Mobile menu toggle */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* Scroll reveal observer */
function initReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.page.active .reveal:not(.visible)').forEach(function(el) {
    obs.observe(el);
  });
}

/* Card mouse-follow glow effect */
document.querySelectorAll('.card').forEach(function(card) {
  card.addEventListener('mousemove', function(e) {
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

/* Init on load */
initReveal();