import "./styles/main.css";
import { loadHome } from "./modules/home.js";
import { initSidebarListeners } from "./modules/eventHandlers.js";
loadHome();

initSidebarListeners();
document.body.className = "theme-default";

// const clickEvent = new Event('click');
// DOM.sidebarLocations.dispatchEvent(clickEvent);
// document.body.className = "theme-ember-spectrum";
// document.body.className = "theme-aurora";
// document.body.className = "theme-editorial";
// document.body.className = "theme-alpine";
// document.body.className = "theme-slate-pro";
// document.body.className = "theme-carbon-dark";
// document.body.className = "theme-notion-clean";
// document.body.className = "theme-midnight-glass";
