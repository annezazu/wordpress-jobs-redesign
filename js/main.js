// WordPress Jobs — Main JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Menu Toggle ----
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.site-header__nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }

  // ---- Category Filter Pills ----
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.job-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const category = pill.dataset.category;

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      let visibleCount = 0;
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show empty state if no cards match
      const emptyState = document.querySelector('.jobs-empty');
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? '' : 'none';
      }
    });
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if wasn't open)
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

});
