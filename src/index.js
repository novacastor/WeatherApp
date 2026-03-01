import "./styles/main.css";
import {
  generateHighlightsGrid,
  generateTemperatureChart,
  generateRainForecast,
  generateThreeDayForecast,
  generateWeatherCardSection,
  generateTopBar,
} from "./modules/domUtils.js";
import * as DOM from "./modules/domElements.js";
import { initSidebarListeners } from "./modules/eventHandlers.js";

export let currentSection = DOM.sidebarAnalytics;

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

const newHighlightsGrid = generateHighlightsGrid(
  "40",
  "70",
  "20",
  "4:39",
  "5:43",
);
DOM.highlightsGrid.replaceWith(newHighlightsGrid);

const newTempChart = generateTemperatureChart(tempTimeArr, tempArr);
DOM.tempChart.replaceWith(newTempChart);

const rainTimeArr = ["07am", "10am", "11am", "12pm", "01pm", "02pm", "03pm"];
const forecastArr = [10, 15, 45, 80, 65, 30, 10];

const newRainForecast = generateRainForecast(rainTimeArr, forecastArr);
DOM.rainForecast.replaceWith(newRainForecast);

const threeDayForecastData = [
  { day: "Friday", minTemp: 15, maxTemp: 26 },
  { day: "Saturday", minTemp: 19, maxTemp: 28 },
  { day: "Sunday", minTemp: 17, maxTemp: 24 },
];

const newThreeDayForecastAside = generateThreeDayForecast(threeDayForecastData);
DOM.threeDayForecastAside.replaceWith(newThreeDayForecastAside);

const newWeatherCardSection = generateWeatherCardSection(
  "Kolkata, West Bengal, India",
  30,
  "Rainy",
  "Monday",
  "3:04am",
);
DOM.weatherCardSection.replaceWith(newWeatherCardSection);

const newTopBar = generateTopBar();
DOM.topBar.replaceWith(newTopBar);

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
