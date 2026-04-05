(() => {
  const APP_STORE_URL =
    "https://apps.apple.com/in/app/beaverdrop-inventory-pos/id6761336959";

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  for (const a of document.querySelectorAll('a[href="#app-store"]')) {
    a.setAttribute("href", APP_STORE_URL);
  }

  const nav = document.querySelector(".nav");
  const menuBtn = document.querySelector("[data-menu]");
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!(e.target instanceof Element)) return;
      if (e.target.closest(".nav") || e.target.closest("[data-menu]")) return;
      nav.classList.remove("open");
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    for (const el of document.querySelectorAll("[data-reveal]")) io.observe(el);
  } else {
    for (const el of document.querySelectorAll("[data-reveal]")) el.classList.add("is-visible");
  }
})();
