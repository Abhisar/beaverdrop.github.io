(() => {
  const APP_STORE_URL = "https://apps.apple.com/app/beaverdrop/id0000000000";

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

  const base = `${location.origin}${location.pathname.replace(/\/[^/]*$/, "/")}`.replace(/index\.html$/, "");
  const urls = {
    support: `${base}support.html`,
    marketing: `${base}`,
    privacy: `${base}privacy.html`,
    help: `${base}help.html`,
  };

  for (const el of document.querySelectorAll("[data-url]")) {
    const key = el.getAttribute("data-url");
    if (!key || !(key in urls)) continue;
    el.textContent = urls[key];
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
