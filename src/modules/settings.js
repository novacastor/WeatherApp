import * as DOM from "./domElements.js";
import { initSettingsListeners } from "./eventHandlers.js";
import { getThemes } from "./storageManager.js";

function createThemeBtn(name) {
  const btn = document.createElement("button");
  btn.classList.add("theme-btn");
  btn.id = name;
  btn.textContent = name.replace(/-/g, " ");

  return btn;
}
export function loadSettings() {
  DOM.main.innerHTML = "";
  const themeGrid = document.createElement("div");
  themeGrid.classList.add("theme-grid");

  const themeLabel = document.createElement("div");
  themeLabel.classList.add("label");
  themeLabel.textContent = "Themes";

  getThemes().forEach((theme) => {
    let themeBtn = createThemeBtn(theme);
    themeGrid.appendChild(themeBtn);
    if ("theme-" + themeBtn.id === document.body.className) {
      themeBtn.classList.add("active");
    }
  });

  DOM.main.appendChild(themeLabel);
  DOM.main.appendChild(themeGrid);
  initSettingsListeners();
}
