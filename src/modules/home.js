import {
  generateTopBar,
  generateWeatherCardSection,
  generateHighlightsGrid,
  generateTemperatureChart,
  generateRainForecast,
  generateThreeDayForecast,
  getCurrentSection,
} from "./domUtils.js";

import {
  loadCurrentDayHighlights,
  loadHourlyTempForecast,
  loadHourlyRainForecast,
  loadThreeDayForecast,
} from "./storageManager.js";

import * as DOM from "./domElements.js";
import { initHomeListeners } from "./eventHandlers.js";

export async function loadHome() {
  // setCurrentLocation('Delhi');

  const highlights_data = await loadCurrentDayHighlights();
  const temp_forecast_data = await loadHourlyTempForecast();
  const rain_forecast_data = await loadHourlyRainForecast();
  const three_day_forecast_data = await loadThreeDayForecast();

  // console.log("forecas: " + getThreeDayForecast());
  const topBar = generateTopBar();
  const weatherCardSection = generateWeatherCardSection(highlights_data);
  const highlightsGrid = generateHighlightsGrid(highlights_data);
  const tempChart = generateTemperatureChart(temp_forecast_data);
  const rainForecast = generateRainForecast(rain_forecast_data);
  const threeDayForecastAside = generateThreeDayForecast(
    three_day_forecast_data,
  );

  if(getCurrentSection() === 'home') {
    DOM.main.innerHTML= '';
    DOM.main.append(
      topBar,
      weatherCardSection,
      highlightsGrid,
      tempChart,
      rainForecast,
      threeDayForecastAside,
    );
    initHomeListeners();
  }
}
