import * as DOM from "./domElements.js";
import { loadSettings } from "./settings.js";
import { loadAnalytics } from "./analytics.js";
import { load_locations } from "./locations.js";
import { setCurrentSection } from "./domUtils.js";

function removeActiveSidebar() {
  DOM.sidebarList.forEach((e) => {
    e.classList.remove("active");
  });
}
export function initSidebarListeners() {
  DOM.sidebarSettings.addEventListener("click", () => {
    removeActiveSidebar();
    DOM.sidebarSettings.classList.add("active");
    setCurrentSection("settings");
    loadSettings();
  });
  DOM.sidebarAnalytics.addEventListener("click", () => {
    removeActiveSidebar();
    DOM.sidebarAnalytics.classList.add("active");
    setCurrentSection("analytics");
    loadAnalytics();
  });
  DOM.sidebarLocations.addEventListener("click", () => {
    removeActiveSidebar();
    DOM.sidebarLocations.classList.add("active");
    setCurrentSection("locations");
    load_locations();
  });
  //     function debounce(fn, delay) {
  //     let timeout;
  //     return function () {
  //         clearTimeout(timeout);
  //         timeout = setTimeout(() => fn(), delay);
  //     };
  //     }

  //     window.addEventListener(
  //     "resize",
  //     debounce(() => {
  //         console.log("Resized to:", window.innerWidth);
  //           const tenVw = window.innerWidth * 0.1;

  //   // get dynamic border width
  //   const styles = getComputedStyle(DOM.sidebar);
  //   const borderLeft = parseFloat(styles.borderLeftWidth) || 0;
  //   const borderRight = parseFloat(styles.borderRightWidth) || 0;

  //   // subtract borders (like your -4px)
  //   const finalWidth = tenVw - borderRight;

  //   DOM.sidebar.style.width = `${finalWidth}px`;
  //     }, 200)
  //     );
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

export function initLocationsListeners() {
  const locationBtns = document.querySelectorAll(".location-button");
  locationBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeActiveSidebar();
      DOM.sidebarAnalytics.classList.add("active");
      setCurrentSection("analytics");
      loadAnalytics();
    });
  });
}
