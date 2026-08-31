/* =============================================================================
   Portfolio BTS SIO SISR - Scripts d'interface
   Aucune dependance externe : le site fonctionne aussi en ouverture locale.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. Theme clair / sombre (memorise dans le navigateur)
     --------------------------------------------------------------------- */
  var THEME_KEY = 'portfolio-theme';

  function readStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null; // navigation privee ou stockage bloque
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* stockage indisponible : le theme reste actif pour la session */
    }
  }

  function initTheme() {
    var stored = readStoredTheme();
    var prefersLight = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    document.documentElement.setAttribute(
      'data-theme', stored || (prefersLight ? 'light' : 'dark')
    );

    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  /* ---------------------------------------------------------------------
     2. Menu mobile
     --------------------------------------------------------------------- */
  function initNav() {
    var burger = document.getElementById('nav-burger');
    var links = document.getElementById('nav-links');
    if (!burger || !links) return;

    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        links.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------------------
     3. Lien de navigation actif (selon le nom du fichier courant)
     --------------------------------------------------------------------- */
  function initActiveLink() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#nav-links a[href]');

    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute('href');
      if (href === page) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Une fiche projet met en avant l'entree "Projets"
    if (page.indexOf('projet-') === 0) {
      var projets = document.querySelector('#nav-links a[href="projets.html"]');
      if (projets) projets.classList.add('is-active');
    }
  }

  /* ---------------------------------------------------------------------
     4. Apparition progressive au defilement + jauges de competences
     --------------------------------------------------------------------- */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(targets, function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(targets, function (el, index) {
      el.style.transitionDelay = Math.min(index % 4, 3) * 70 + 'ms';
      observer.observe(el);
    });
  }

  function initSkillBars() {
    var bars = document.querySelectorAll('.skill__fill[data-level]');
    if (!bars.length) return;

    function fill(bar) {
      var level = parseInt(bar.getAttribute('data-level'), 10) || 0;
      bar.style.width = Math.max(0, Math.min(100, level)) + '%';
    }

    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(bars, fill);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        fill(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    Array.prototype.forEach.call(bars, function (bar) { observer.observe(bar); });
  }

  /* ---------------------------------------------------------------------
     5. Filtres de la page Projets
     --------------------------------------------------------------------- */
  function initProjectFilters() {
    var buttons = document.querySelectorAll('.filter[data-filter]');
    var cards = document.querySelectorAll('.project[data-cat]');
    if (!buttons.length || !cards.length) return;

    var counter = document.getElementById('project-count');

    function apply(value) {
      var visible = 0;
      Array.prototype.forEach.call(cards, function (card) {
        var cats = card.getAttribute('data-cat') || '';
        var match = value === 'all' || cats.split(' ').indexOf(value) !== -1;
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });
      if (counter) {
        counter.textContent = visible + (visible > 1 ? ' projets' : ' projet');
      }
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener('click', function () {
        Array.prototype.forEach.call(buttons, function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');
        apply(button.getAttribute('data-filter'));
      });
    });

    apply('all');
  }

  /* ---------------------------------------------------------------------
     6. Bouton retour en haut
     --------------------------------------------------------------------- */
  function initToTop() {
    var button = document.getElementById('to-top');
    if (!button) return;

    function update() {
      button.classList.toggle('is-visible', window.scrollY > 520);
    }

    window.addEventListener('scroll', update, { passive: true });
    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
  }

  /* ---------------------------------------------------------------------
     7. Formulaire de contact (ouverture du client mail, sans serveur)
     --------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var to = form.getAttribute('data-mailto') || '';
      var name = (form.elements.nom.value || '').trim();
      var email = (form.elements.email.value || '').trim();
      var subject = (form.elements.sujet.value || 'Contact portfolio').trim();
      var message = (form.elements.message.value || '').trim();

      var body = 'Nom : ' + name + '\nEmail : ' + email + '\n\n' + message;
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      var note = document.getElementById('form-note');
      if (note) {
        note.textContent = 'Votre logiciel de messagerie vient de s’ouvrir avec le message pre-rempli.';
        note.hidden = false;
      }
    });
  }

  /* ---------------------------------------------------------------------
     8. Annee courante dans le pied de page
     --------------------------------------------------------------------- */
  function initYear() {
    var slots = document.querySelectorAll('[data-year]');
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(slots, function (slot) { slot.textContent = year; });
  }

  /* ---------------------------------------------------------------------
     Initialisation
     --------------------------------------------------------------------- */
  function init() {
    initTheme();
    initNav();
    initActiveLink();
    initReveal();
    initSkillBars();
    initProjectFilters();
    initToTop();
    initContactForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
