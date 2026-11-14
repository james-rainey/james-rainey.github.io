// Theme toggle, mobile nav, project filters, BibTeX toggles and image zoom.
(function () {
  var root = document.documentElement;

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // Project category filter
  var filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-filter");
      filterButtons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
      document.querySelectorAll(".card[data-category]").forEach(function (card) {
        card.hidden = category !== "all" && card.getAttribute("data-category") !== category;
      });
    });
  });

  document.querySelectorAll(".bibtex-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var block = document.getElementById(button.getAttribute("aria-controls"));
      var open = block.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  if (window.mediumZoom) {
    mediumZoom(".prose figure img", { margin: 24, background: "rgba(0, 0, 0, 0.85)" });
  }
})();
