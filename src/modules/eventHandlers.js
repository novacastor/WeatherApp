import * as DOM from "./domElements.js";
import { loadSettings } from "./settings.js";
import { loadHome } from "./home.js";
import { loadLocations } from "./locations.js";
import { loadForecast } from "./forecast.js";
import { setCurrentSection } from "./domUtils.js";
import {
  getCurrentLocation,
  markForPermanentStorage,
  saveAllData,
} from "./storageManager.js";
import { setCurrentLocation } from "./storageManager.js";
import { verifySearch } from "./apiServices.js";

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
}

export function initHomeListeners() {
  const searchInput = document.getElementById("search");
  const searchIcon = document.querySelector(".search-icon");
  const addCityBtn = document.querySelector(".add-btn");

  addCityBtn.addEventListener("click", () => {
    const curr_city = getCurrentLocation();
    if (curr_city) markForPermanentStorage(curr_city);
    saveAllData();
    setCurrentSection("locations");
    loadLocations();
  });
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
  searchIcon.addEventListener("click", handleSearch);
}

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
      setCurrentLocation(btn.id);
      setCurrentSection("home");

      loadHome();
    });
  });
}
async function handleSearch() {
  const city_name = document.querySelector("#search").value.trim();
  if (!city_name) {
    return;
  }
  console.log("Inside handle Search");
  console.log("Search disabled");
  DOM.searchInput.disabled = true;
  DOM.searchWrapper.classList.add("loading");
  try {
    const result = await verifySearch(city_name);
    if (result.isValid) {
      setCurrentLocation(result.name);
      await loadHome();
      DOM.searchInput.value = "";
    } else {
      alert("Sorry couldn't find the city");
    }
  } catch (error) {
    alert("Connection Error");
  } finally {
    DOM.searchWrapper.classList.remove("loading");
    DOM.searchInput.disabled = false;
    DOM.searchInput.focus();
    console.log("Search enabled");
  }
}
