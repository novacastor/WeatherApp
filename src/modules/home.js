import {
  generateTopBar,
  generateWeatherCardSection,
  generateHighlightsGrid,
  generateTemperatureChart,
  generateRainForecast,
  generateThreeDayForecast,
} from "./domUtils.js";

import {
  getTempForecast,
  getRainForecast,
  getThreeDayForecast,
  getTodayHighlights,
} from "../assets/weather-data/loadData.js";
import * as DOM from "./domElements.js";
// import { initAnalyticsListeners } from "./eventHandlers.js";

export function loadHome() {
  const topBar = generateTopBar();

  const weatherCardSection = generateWeatherCardSection(
    "Kolkata, West Bengal, India",
    30,
    "Rainy",
    "Monday",
    "3:04",
  );

  // console.log("forecas: " + getThreeDayForecast());
  const highlightsGrid = generateHighlightsGrid(getTodayHighlights());
  const tempChart = generateTemperatureChart(getTempForecast());
  const rainForecast = generateRainForecast(getRainForecast());
  const threeDayForecastAside = generateThreeDayForecast(getThreeDayForecast());

  DOM.main.innerHTML = "";
  DOM.main.append(
    topBar,
    weatherCardSection,
    highlightsGrid,
    tempChart,
    rainForecast,
    threeDayForecastAside,
  );
  // initAnalyticsListeners();
}
