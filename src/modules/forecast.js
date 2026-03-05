import * as DOM from "./domElements.js";
import { getCurrentLocation, loadWeeklyForecast } from "./storageManager.js";
import {
  setCurrentSection,
  getSunriseIcon,
  getSunsetIcon,
  getHumidityIcon,
  getPrecipitationIcon,
  getCloudIcon,
  getWindIcon,
  getMaxTempIcon,
  getMinTempIcon,
} from "./domUtils.js";

/**
 * Creates a "Mini Card" using pure JS DOM methods
 */
function createMiniCard(iconSrc, labelText, valueText) {
  const miniCard = document.createElement("div");
  miniCard.classList.add("mini-card");

  const img = document.createElement("img");
  img.src = iconSrc;
  img.classList.add("mini-icon");

  const info = document.createElement("div");
  info.classList.add("mini-info");

  const label = document.createElement("span");
  label.classList.add("mini-label");
  label.textContent = labelText;

  const value = document.createElement("span");
  value.classList.add("mini-value");
  value.textContent = valueText;

  info.append(label, value);
  miniCard.append(img, info);
  return miniCard;
}

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("forecast-card");

  const leftCol = document.createElement("div");
  leftCol.classList.add("day-column");
  const dayName = document.createElement("span");
  dayName.textContent = data.day;
  leftCol.appendChild(dayName);

  const row1 = document.createElement("div");
  row1.classList.add("card-row", "row-1");

  const maxTemp = createMiniCard(
    getMaxTempIcon(),
    "Daytime High",
    data.maxTemp + "°C",
  );
  maxTemp.classList.add("max-temp");
  const minTemp = createMiniCard(
    getMinTempIcon(),
    "Overnight Low",
    data.minTemp + "°C",
  );
  minTemp.classList.add("min-temp");
  row1.append(
    maxTemp,
    createMiniCard(getSunriseIcon(), "Sunrise", data.sunrise),
    createMiniCard(getPrecipitationIcon(), "Rain", `${data.precipitation}%`),
    createMiniCard(getWindIcon(), "Wind", `${data.wind} km/h`),
  );

  const row2 = document.createElement("div");
  row2.classList.add("card-row", "row-2");
  row2.append(
    minTemp,
    createMiniCard(getSunsetIcon(), "Sunset", data.sunset),
    createMiniCard(getHumidityIcon(), "Humidity", `${data.humidity}%`),
    createMiniCard(getCloudIcon(), "Clouds", `${data.cloudCover}%`),
  );

  card.append(leftCol, row1, row2);
  return card;
}

export async function loadForecast() {
  if (!DOM.main) return;
  DOM.main.innerHTML = "";
  setCurrentSection("forecast");

  const header = document.createElement('div');
  const container = document.createElement("div");
  
  const forecasts = await loadWeeklyForecast();
  container.classList.add("forecasts-container");
  header.classList.add('forecasts-header');
  header.innerHTML = `<span>${getCurrentLocation().toUpperCase()}</span>`;

  forecasts.forEach((f) => container.appendChild(createCard(f)));
  DOM.main.append(header, container);
}
