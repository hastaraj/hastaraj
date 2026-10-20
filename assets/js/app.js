(function () {
  var doc = document;
  var year = doc.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  var btn = doc.querySelector('.mobile-menu-button');
  var menu = doc.getElementById('mobile-menu');
  if (btn && menu) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
    };
    btn.addEventListener('click', function () { setOpen(menu.hasAttribute('hidden')); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  // Scroll reveal
  var targets = doc.querySelectorAll('.section-number, .section-heading, .about-content, .about-facts > div, .skill-card, .stack-note, .projects-heading, .project-card, .timeline-item, .contact-copy, .contact-form-wrap');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    doc.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', ((i % 3) * 0.08) + 's');
      io.observe(el);
    });
  }

  // Contact form -> opens the visitor's email app (no server)
  var form = doc.getElementById('contact-form');
  var status = doc.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var body = encodeURIComponent(d.get('message') + '\n\n— ' + d.get('name') + ' (' + d.get('email') + ')');
      var subject = encodeURIComponent('Portfolio enquiry from ' + d.get('name'));
      window.location.href = 'mailto:hastaraj16@gmail.com?subject=' + subject + '&body=' + body;
      if (status) status.textContent = 'Opening your email app…';
    });
  }
})();
