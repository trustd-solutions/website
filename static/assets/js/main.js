(() => {
  const header = document.querySelector("#header");
  const backToTop = document.querySelector(".back-to-top");
  function updateScrollState() {
    const scrolled = window.scrollY > 100;
    header.classList.toggle("header-scrolled", scrolled);
    backToTop.classList.toggle("active", scrolled);
  }
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const nav = document.querySelector("#navbar");
  const menu = nav.querySelector(".mobile-nav-toggle");
  function setMenu(open) {
    nav.classList.toggle("navbar-mobile", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.firstElementChild.className = open ? "bi bi-x" : "bi bi-list";
  }
  menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") === "false"));
  nav.addEventListener("focusout", (event) => {
    if (!nav.contains(event.relatedTarget)) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("navbar-mobile")) {
      setMenu(false);
      menu.focus();
    }
  });
  window.matchMedia("(max-width: 991px)").addEventListener("change", () => setMenu(false));

  document.querySelectorAll(".booking-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !window.Calendly?.initPopupWidget) return;
      window.Calendly.initPopupWidget({ url: link.href });
      event.preventDefault();
    });
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        }
      }
    });
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
  }

  document.querySelectorAll(".carousel-container").forEach((container) => {
    const viewport = container.querySelector(".carousel-wrapper");
    const controls = container.querySelector(".navigation");
    const prev = controls.querySelector(".prev");
    const next = controls.querySelector(".next");
    function updateControls() {
      const end = viewport.scrollWidth - viewport.clientWidth;
      controls.hidden = end <= 1;
      prev.disabled = viewport.scrollLeft <= 1;
      next.disabled = viewport.scrollLeft >= end - 1;
    }
    function advance(direction) {
      const slides = viewport.querySelectorAll(".slide");
      const step = slides[1].offsetLeft - slides[0].offsetLeft;
      viewport.scrollBy({ left: direction * step, behavior: "instant" });
      updateControls();
    }
    prev.addEventListener("click", () => advance(-1));
    next.addEventListener("click", () => advance(1));
    viewport.addEventListener("scroll", updateControls, { passive: true });
    new ResizeObserver(updateControls).observe(viewport);
    updateControls();
  });
})();
