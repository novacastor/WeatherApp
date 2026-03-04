import * as DOM from "./domElements.js";
import { loadSettings } from "./settings.js";
import { loadHome } from "./home.js";
import { loadLocations } from "./locations.js";
import { loadForecast } from "./forecast.js";
import { setCurrentSection } from "./domUtils.js";

export function initSidebarListeners() {
  DOM.sidebarSettings.addEventListener("click", () => {
    setCurrentSection("settings");
    loadSettings();
  });
  DOM.sidebarHome.addEventListener("click", () => {
    setCurrentSection("home");
    loadHome();
  });
  DOM.sidebarLocations.addEventListener("click", () => {
    setCurrentSection("locations");
    loadLocations();
  });
  DOM.sidebarForecast.addEventListener("click", () => {
    setCurrentSection("forecast");
    loadForecast();
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
      setCurrentSection("home");
      loadHome();
    });
  });
}
