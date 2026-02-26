import * as DOM from "./domElements.js";
import { loadSettings } from "./settings.js";
import { loadAnalytics } from "./analytics.js";

export function initSidebarListeners() {
  DOM.settings.addEventListener("click", () => {
    DOM.sidebarList.forEach((e) => {
      if (e.classList.remove("active"));
    });
    DOM.settings.classList.add("active");
    loadSettings();
  });
  DOM.analytics.addEventListener("click", () => {
    DOM.sidebarList.forEach((e) => {
      if (e.classList.remove("active"));
    });
    DOM.analytics.classList.add("active");
    loadAnalytics();
  });
}
// export function initAnalyticsListeners(context) {
// }
export function initSettingsListeners() {
  const btns = document.querySelectorAll(".theme-btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.className = "theme-" + btn.id;

      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}
