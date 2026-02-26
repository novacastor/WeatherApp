import * as DOM from "./domElements.js";
import { initSettingsListeners } from "./eventHandlers.js";

function createThemeBtn(name) {
  const btn = document.createElement("button");
  btn.classList.add("theme-btn");
  btn.id = name;
  btn.textContent = name.replace(/-/g, " ");

  return btn;
}
let themes = [
  "default",
  "aurora",
  "editorial",
  "alpine",
  "ember-spectrum",
  "slate-pro",
  "carbon-dark",
  "notion-clean",
  "midnight-glass",
];
export function loadSettings() {
  DOM.main.innerHTML = "";
  const themeGrid = document.createElement("div");
  themeGrid.classList.add("theme-grid");

  themes.forEach((theme) => {
    let themeBtn = createThemeBtn(theme);
    themeGrid.appendChild(themeBtn);
    if ("theme-" + themeBtn.id === document.body.className) {
      themeBtn.classList.add("active");
    }
  });
  DOM.main.appendChild(themeGrid);
  initSettingsListeners();
}
