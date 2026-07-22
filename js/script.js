// Reveal ficha sections gently on scroll (no-op if reduced motion is preferred)
(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sections = document.querySelectorAll(".ficha");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    sections.forEach(function (s) { s.style.opacity = 1; });
    return;
  }

  sections.forEach(function (s) {
    s.style.opacity = 0;
    s.style.transform = "translateY(14px)";
    s.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach(function (s) { observer.observe(s); });
})();
