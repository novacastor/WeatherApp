// import { dependencies } from "webpack";
import * as DOM from "./domElements.js";
import { getCityImageUrl } from "./apiServices";
import { initLocationsListeners } from "./eventHandlers.js";
import { getCurrentSection, getWeatherIcon } from "./domUtils.js";
import { getLocations } from "../assets/weather-data/loadData.js";

async function createLocationButton(location) {
  const btn = document.createElement("button");
  btn.classList.add("location-button");

  // --- HEADER SECTION (City, Country, Time) ---
  const headerContainer = document.createElement("div");
  headerContainer.classList.add("card-header");

  const citySpan = document.createElement("div");
  citySpan.classList.add("city-name");
  citySpan.textContent = location.city + ", " + location.country;

  const dayTimeContainer = document.createElement("div");
  dayTimeContainer.classList.add("day-time");

  const daySpan = document.createElement("div");
  daySpan.classList.add("day");
  daySpan.textContent = location.day;

  const timeSpan = document.createElement("div");
  timeSpan.classList.add("time");
  timeSpan.textContent = location.time;

  dayTimeContainer.append(daySpan, timeSpan);
  headerContainer.append(citySpan, dayTimeContainer);

  // --- MAIN SECTION (Big Temp & Icon) ---
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("card-main");

  const currTempSpan = document.createElement("div");
  currTempSpan.classList.add("current-temperature");
  currTempSpan.innerHTML = `${location.curr_temp}&deg;`; // using HTML entity for crisp degree symbol

  const icon = document.createElement("img");
  icon.classList.add("weather-icon");
  icon.src = getWeatherIcon(location.weatherDescription);

  mainContainer.append(currTempSpan, icon);

  // --- FOOTER SECTION (Description, High/Low, Feels Like) ---
  const footerContainer = document.createElement("div");
  footerContainer.classList.add("card-footer");

  const weatherDescriptionSpan = document.createElement("div");
  weatherDescriptionSpan.classList.add("description");
  weatherDescriptionSpan.textContent = location.weatherDescription;

  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  const lowestTempSpan = document.createElement("div");
  lowestTempSpan.classList.add("lowest_temperature");
  lowestTempSpan.innerHTML = "L: " + location.lowest_temp + "&deg;";

  const highestTempSpan = document.createElement("div");
  highestTempSpan.classList.add("highest_temperature");
  highestTempSpan.innerHTML = "H: " + location.highest_temp + "&deg;";

  const lowHighTempContainer = document.createElement("div");
  lowHighTempContainer.classList.add("low-high-temp");
  lowHighTempContainer.append(lowestTempSpan, highestTempSpan);

  const feelslikeSpan = document.createElement("div");
  feelslikeSpan.classList.add("feelslike");
  feelslikeSpan.innerHTML = "Feels like " + location.feelslike + "&deg;";

  statsContainer.append(lowHighTempContainer, feelslikeSpan);
  footerContainer.append(weatherDescriptionSpan, statsContainer);

  // --- APPLY BACKGROUND ---
  const url = await getCityImageUrl(location.city);

  // Create a nice gradient that is lighter at the top and darker at the bottom for readability
  const gradient = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 1) 100%)`;

  if (url) {
    btn.style.backgroundImage = `${gradient}, url("${url}")`;
  } else {
    btn.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))`;
  }

  // Ensure background scales perfectly
  btn.style.backgroundSize = "cover";
  btn.style.backgroundPosition = "center";
  btn.style.backgroundRepeat = "no-repeat";

  // Append all sections to the button
  btn.append(headerContainer, mainContainer, footerContainer);

  return btn;
}

export async function loadLocations() {
  DOM.main.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("location-buttons-container");

  const buttons = await Promise.all(
    getLocations().map((locationData) => createLocationButton(locationData)),
  );
  buttons.forEach((button) => container.appendChild(button));
  if (getCurrentSection() === "locations") {
    DOM.main.appendChild(container);
    initLocationsListeners();
  } else {
    console.log("currentSection: " + getCurrentSection());
  }
}
