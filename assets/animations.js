(() => {
  const sections = [...document.querySelectorAll('.section')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;

  function stop() {
    observer?.disconnect();
    sections.forEach(section => section.classList.remove('is-entering'));
  }

  function start() {
    stop();
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-entering');
        observer.unobserve(entry.target);
      });
    });
    sections.forEach(section => observer.observe(section));
  }

  sections.forEach(section => {
    section.addEventListener('animationend', event => {
      if (event.target === section && event.animationName === 'fadeUp') {
        section.classList.remove('is-entering');
      }
    });
  });
  reducedMotion.addEventListener('change', start);
  window.addEventListener('beforeprint', stop);
  window.addEventListener('afterprint', start);
  start();
})();
