// ============================================
// CHANDIGARHTUTORHUB — SHARED INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;
    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close siblings within the same faq-list
      const parent = item.closest('.faq-list');
      if (parent) {
        parent.querySelectorAll('.faq-item.open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('open');
            openItem.querySelector('.faq-answer').style.maxHeight = null;
          }
        });
      }
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---- Tuition Type toggle (Home / Online pill buttons) ---- */
  document.querySelectorAll('.tuition-type-toggle').forEach(function (toggle) {
    const options = toggle.querySelectorAll('.toggle-option');
    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        options.forEach(function (o) { o.classList.remove('active'); });
        opt.classList.add('active');
        const input = opt.querySelector('input');
        if (input) input.checked = true;
      });
    });
  });

  /* ---- Lead form submission (all forms with .lead-form class) ---- */
  document.querySelectorAll('.lead-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
      }

      // Collect form data — in production this posts to your CRM/Sheets/Email endpoint
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Lead captured:', data);

      // Simulate network request — replace with real endpoint (e.g. fetch('/api/leads', {...}))
      setTimeout(function () {
        form.style.display = 'none';
        const successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          successEl.style.display = 'block';
        }
        // GTM/GA4 conversion event hook
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { form_id: form.id || 'lead_form' });
        }
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'lead_form_submit', form_id: form.id || 'lead_form' });
        }
      }, 700);
    });
  });

  /* ---- Tutor registration form submission ---- */
  const tutorForm = document.getElementById('tutor-registration-form');
  if (tutorForm) {
    tutorForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = tutorForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
      }
      const formData = new FormData(tutorForm);
      const data = Object.fromEntries(formData.entries());
      console.log('Tutor registration captured:', data);

      setTimeout(function () {
        tutorForm.style.display = 'none';
        const successEl = document.getElementById('tutor-form-success');
        if (successEl) successEl.style.display = 'block';
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { form_id: 'tutor_registration' });
        }
      }, 700);
    });
  }

  /* ---- File upload filename display ---- */
  const resumeInput = document.getElementById('resume-upload');
  if (resumeInput) {
    resumeInput.addEventListener('change', function () {
      const label = document.getElementById('upload-filename');
      if (label && resumeInput.files.length > 0) {
        label.textContent = resumeInput.files[0].name;
      }
    });
  }

  /* ---- Header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 8 ? '0 2px 12px rgba(15,38,71,0.08)' : 'none';
    }, { passive: true });
  }

  /* ---- WhatsApp click tracking ---- */
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', { link_location: link.dataset.loc || 'unknown' });
      }
    });
  });

  /* ---- Call click tracking ---- */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'phone_call_click', { link_location: link.dataset.loc || 'unknown' });
      }
    });
  });

});
