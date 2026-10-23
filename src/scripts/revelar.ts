// Fade suave na entrada dos blocos marcados com data-r. Sem JS, tudo aparece normalmente.
const blocos = document.querySelectorAll<HTMLElement>('[data-r]');

if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  blocos.forEach((b) => b.classList.add('visivel'));
} else {
  const obs = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('visivel');
        obs.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  blocos.forEach((b) => obs.observe(b));
}
