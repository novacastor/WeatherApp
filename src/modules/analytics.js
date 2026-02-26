import {
  generateTopBar,
  generateWeatherCardSection,
  generateHighlightsGrid,
  generateTemperatureChart,
  generateRainForecast,
  generateThreeDayForecast,
} from "./domUtils.js";
import * as DOM from "./domElements.js";
// import { initAnalyticsListeners } from "./eventHandlers.js";

export function loadAnalytics() {
  const topBar = generateTopBar();

  const weatherCardSection = generateWeatherCardSection(
    "Kolkata, West Bengal, India",
    30,
    "Rainy",
    "Monday",
    "3:04am",
  );

  const highlightsGrid = generateHighlightsGrid(
    "40",
    "70",
    "20",
    "4:39",
    "5:43",
  );

  const tempTimeArr = [
    "09am",
    "10am",
    "11am",
    "12pm",
    "01pm",
    "02pm",
    "03pm",
    "04pm",
    "05pm",
  ];
  const tempArr = [21, 23, 26, 28, 30, 29, 27, 24, 22];
  const tempChart = generateTemperatureChart(tempTimeArr, tempArr);

  const rainTimeArr = ["07am", "10am", "11am", "12pm", "01pm", "02pm", "03pm"];
  const forecastArr = [10, 15, 45, 80, 65, 30, 10];
  const rainForecast = generateRainForecast(rainTimeArr, forecastArr);

  const threeDayForecastData = [
    { day: "Friday", minTemp: 15, maxTemp: 26 },
    { day: "Saturday", minTemp: 19, maxTemp: 28 },
    { day: "Sunday", minTemp: 17, maxTemp: 24 },
  ];
  const threeDayForecastAside = generateThreeDayForecast(threeDayForecastData);

  DOM.main.innerHTML = "";
  DOM.main.appendChild(topBar);
  DOM.main.appendChild(weatherCardSection);
  DOM.main.appendChild(highlightsGrid);
  DOM.main.appendChild(tempChart);
  DOM.main.appendChild(rainForecast);
  DOM.main.appendChild(threeDayForecastAside);

  // initAnalyticsListeners();
}
