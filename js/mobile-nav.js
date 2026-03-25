document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const panel = document.getElementById("mobile-nav-panel");

  if (!toggle || !panel) return;

  toggle.addEventListener("click", function () {
    const isOpen = panel.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      panel.removeAttribute("hidden");
    } else {
      panel.setAttribute("hidden", "");
    }
  });

  // 点击手机菜单里的链接后自动收起
  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      panel.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("hidden", "");
    });
  });
});