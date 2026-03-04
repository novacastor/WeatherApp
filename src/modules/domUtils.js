let currentSection = null;
import sunnyIcon from "./../assets/weather-icons/wi-day-sunny.svg";
import partlyCloudyIcon from "./../assets/weather-icons/wi-day-cloudy.svg";
import cloudyIcon from "./../assets/weather-icons/wi-cloudy.svg";
import rainIcon from "./../assets/weather-icons/wi-rain.svg";
import heavyRainIcon from "./../assets/weather-icons/wi-thunderstorm.svg";
import snowIcon from "./../assets/weather-icons/wi-snow.svg";
import fogIcon from "./../assets/weather-icons/wi-fog.svg";
import hotIcon from "./../assets/weather-icons/wi-hot.svg";
import naIcon from "./../assets/weather-icons/wi-na.svg";

import arrowUp from "./../assets/weather-icons/wi-direction-up.svg";
import arrowDown from "./../assets/weather-icons/wi-direction-down.svg";
import arrowLeft from "./../assets/weather-icons/wi-direction-left.svg";
import arrowRight from "./../assets/weather-icons/wi-direction-right.svg";

import sunriseIcon from "./../assets/weather-icons/wi-sunrise.svg";
import sunsetIcon from "./../assets/weather-icons/wi-sunset.svg";

import humidityIcon from "./../assets/weather-icons/wi-humidity.svg";
import precipitationIcon from "./../assets/weather-icons/wi-umbrella.svg";
import cloudIcon from "./../assets/weather-icons/wi-cloud.svg";
import windIcon from "./../assets/weather-icons/wi-strong-wind.svg";
import uvIcon from "./../assets/weather-icons/wi-day-sunny.svg"; // generic UV icon

import * as DOM from "./domElements.js";

export function generateTopBar() {
  const topBar = document.createElement("header");
  topBar.classList.add("top-bar");
  topBar.innerHTML = `
    <div class="search-wrapper">
      <input
        type="text"
        id="search"
        placeholder="Search here.."
        aria-label="Enter the name of a city"
      />
      <span class="search-icon">
        <svg
          class="search-icon"
          width="20"
          height="31"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
    </div>
  `;
  return topBar;
}

export function generateWeatherCardSection(
  location,
  temperature,
  weatherDescription,
  day,
  time,
) {
  const weatherCardSection = document.createElement("section");
  weatherCardSection.classList.add("main-hero");

  const locationHeader = document.createElement("div");
  locationHeader.classList.add("location-header");

  const locationLabel = document.createElement("p");
  locationLabel.classList.add("location-label");
  locationLabel.textContent = "Current Location";

  const locationName = document.createElement("h4");
  locationName.classList.add("location-name");
  locationName.textContent = location;

  locationHeader.appendChild(locationLabel);
  locationHeader.appendChild(locationName);

  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  const temp = document.createElement("p");
  temp.classList.add("temperature");
  temp.textContent = `${temperature}°C`;

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = weatherDescription;

  const dateTime = document.createElement("p");
  dateTime.classList.add("date-time");
  dateTime.textContent = `${day}, ${time}`;

  weatherCard.appendChild(temp);
  weatherCard.appendChild(description);
  weatherCard.appendChild(dateTime);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("action-area");

  const btn = document.createElement("button");
  btn.classList.add("add-btn");
  btn.setAttribute("aria-label", "Add City");

  const addPlus = document.createElement("p");
  addPlus.classList.add("add-plus");
  addPlus.textContent = "+";

  btn.appendChild(addPlus);
  btn.appendChild(document.createTextNode("Add City"));

  btnContainer.appendChild(btn);

  weatherCardSection.appendChild(locationHeader);
  weatherCardSection.appendChild(weatherCard);
  weatherCardSection.appendChild(btnContainer);

  return weatherCardSection;
}

export function generateHighlightsGrid(data) {
  const highlightsGrid = document.createElement("section");
  highlightsGrid.classList.add("highlights-grid");

  const precipitationCard = document.createElement("div");
  precipitationCard.classList.add("card", "precipitation");

  const precipitationLabel = document.createElement("p");
  precipitationLabel.classList.add("label");

  const precipitationValue = document.createElement("p");
  precipitationValue.classList.add("value");

  precipitationLabel.textContent = "Precipitation";
  precipitationValue.textContent = data.precipitation + "%";

  precipitationCard.appendChild(precipitationLabel);
  precipitationCard.appendChild(precipitationValue);
  /*------------------------------------------------------------------------*/

  const humidityCard = document.createElement("div");
  const humidityLabel = document.createElement("p");
  const humidityValue = document.createElement("p");

  humidityCard.classList.add("card", "wind");
  humidityLabel.classList.add("label");
  humidityValue.classList.add("value");

  humidityLabel.textContent = "Humidity";
  humidityValue.textContent = data.humidity + "%";

  humidityCard.appendChild(humidityLabel);
  humidityCard.appendChild(humidityValue);
  /*------------------------------------------------------------------------*/

  const windCard = document.createElement("div");
  const windLabel = document.createElement("p");
  const windValue = document.createElement("p");

  windCard.classList.add("card", "wind");
  windLabel.classList.add("label");
  windValue.classList.add("value");

  windLabel.textContent = "Wind";
  windValue.textContent = data.wind + " KM/H";

  windCard.appendChild(windLabel);
  windCard.appendChild(windValue);
  /*------------------------------------------------------------------------*/

  const sundataCard = document.createElement("div");
  const sundataLabel = document.createElement("p");
  const sunTimes = document.createElement("div");
  const sunriseTime = document.createElement("p");
  const sunsetTime = document.createElement("p");

  sundataCard.classList.add("card", "sun-data");
  sundataLabel.classList.add("label");
  sunTimes.classList.add("sun-times");
  sunriseTime.classList.add("value");
  sunsetTime.classList.add("value");

  sundataLabel.textContent = "Sunrise & Sunset";
  sunriseTime.textContent = data.sunrise;
  sunsetTime.textContent = data.sunset;

  sunTimes.appendChild(sunriseTime);
  sunTimes.appendChild(sunsetTime);
  sundataCard.appendChild(sundataLabel);
  sundataCard.appendChild(sunTimes);
  highlightsGrid.appendChild(windCard);
  /*------------------------------------------------------------------------*/

  highlightsGrid.appendChild(precipitationCard);
  highlightsGrid.appendChild(humidityCard);
  highlightsGrid.appendChild(sundataCard);

  return highlightsGrid;
}

export function generateTemperatureChart(data) {
  const tempSection = document.createElement("section");
  tempSection.classList.add("hourly-chart");

  const label = document.createElement("p");
  label.classList.add("label");
  label.textContent = "Temperature";

  const tempChart = document.createElement("div");
  tempChart.classList.add("chart");

  data.forEach((pt) => {
    const tempBar = createTempBar(pt.time, pt.temp);
    tempChart.appendChild(tempBar);
  });

  tempSection.appendChild(label);
  tempSection.appendChild(tempChart);

  return tempSection;
}
function createTempBar(time, temp) {
  const dataPt = document.createElement("div");
  dataPt.classList.add("data-point");

  const tempBar = document.createElement("div");
  tempBar.classList.add("bar");
  tempBar.style.height = temp * 2.5 + "%";
  tempBar.title = `${temp}°`;

  const timeSpan = document.createElement("div");
  timeSpan.textContent = time;

  dataPt.appendChild(tempBar);
  dataPt.appendChild(timeSpan);

  return dataPt;
}

export function generateRainForecast(data) {
  const rainAside = document.createElement("aside");
  rainAside.classList.add("rain-forecast");

  const label = document.createElement("p");
  label.classList.add("label");
  label.textContent = "Chance of Rain";

  const rainChart = document.createElement("div");
  rainChart.classList.add("rain-chart");

  data.forEach((pt) => {
    const rainBar = createRainBar(pt.time, pt.precipitation);
    rainChart.appendChild(rainBar);
  });

  const rainLegend = document.createElement("ul");
  rainLegend.classList.add("rain-legend");

  const rainSwatchSunny = document.createElement("li");
  rainSwatchSunny.textContent = "Sunny";

  const rainSwatchRainy = document.createElement("li");
  rainSwatchRainy.textContent = "Rainy";

  const rainSwatchHeavyRain = document.createElement("li");
  rainSwatchHeavyRain.textContent = "Heavy Rain";

  rainLegend.append(rainSwatchSunny, rainSwatchRainy, rainSwatchHeavyRain);

  rainAside.append(label, rainChart, rainLegend);

  return rainAside;
}
function createRainBar(time, forecast) {
  const dataPt = document.createElement("div");
  dataPt.classList.add("rain-data-point");

  const timeSpan = document.createElement("div");
  timeSpan.textContent = time;

  const forecastBar = document.createElement("div");
  forecastBar.classList.add("bar");
  forecastBar.style.width = forecast + "%";

  dataPt.appendChild(timeSpan);
  dataPt.appendChild(forecastBar);

  return dataPt;
}

export function generateThreeDayForecast(forecast) {
  const threeDayForecastAside = document.createElement("aside");
  threeDayForecastAside.classList.add("three-day-forecast");

  const label = document.createElement("p");
  label.classList.add("label");
  label.textContent = "3 Day Forecast";

  const forecastCardList = document.createElement("ul");
  forecastCardList.classList.add("forecast-list");
  // console.log("forecast: "+ forecast);
  forecast.forEach((e, i) => {
    const forecastCard = createForecastCard(i, e.day, e.minTemp, e.maxTemp);
    forecastCardList.appendChild(forecastCard);
  });

  threeDayForecastAside.appendChild(label);
  threeDayForecastAside.appendChild(forecastCardList);

  return threeDayForecastAside;
}
function createForecastCard(i, day, minTemp, maxTemp) {
  const forecastCard = document.createElement("li");
  forecastCard.classList.add("forecast-card");

  const dayNameSpan = document.createElement("div");
  dayNameSpan.classList.add("day-name");
  dayNameSpan.textContent = day;

  const tempMinMaxSpan = document.createElement("div");
  tempMinMaxSpan.classList.add("temp-min-max");

  const minTempIcon = getDirectionIcon("down");
  const maxTempIcon = getDirectionIcon("up");

  const minTempSpan = document.createElement("div");
  minTempSpan.classList.add("min-temp");
  minTempSpan.innerHTML = `<img src="${minTempIcon}" class="temp-arrow" alt="down arrow"> ${minTemp}°C`;

  const maxTempSpan = document.createElement("div");
  maxTempSpan.classList.add("max-temp");
  maxTempSpan.innerHTML = `<img src="${maxTempIcon}" class="temp-arrow" alt="up arrow"> ${maxTemp}°C`;

  if (i !== 1) {
    forecastCard.appendChild(dayNameSpan);
  }
  tempMinMaxSpan.appendChild(minTempSpan);
  tempMinMaxSpan.appendChild(maxTempSpan);

  forecastCard.appendChild(tempMinMaxSpan);
  if (i === 1) {
    forecastCard.appendChild(dayNameSpan);
  }

  return forecastCard;
}
export function setCurrentSection(sectionName) {
  DOM.sidebarList.forEach((e) => {
    e.classList.remove("active");
  });

  currentSection = sectionName;

  if (sectionName === "home") {
    DOM.sidebarHome.classList.add("active");
  } else if (sectionName === "settings") {
    DOM.sidebarSettings.classList.add("active");
  } else if (sectionName === "locations") {
    DOM.sidebarLocations.classList.add("active");
  } else if (sectionName === "forecast") {
    DOM.sidebarForecast.classList.add("active");
  }
}
export function getCurrentSection() {
  return currentSection;
}

export function getDirectionIcon(direction) {
  const dir = direction.toLowerCase();
  if (dir.includes("up")) return arrowUp;
  if (dir.includes("down")) return arrowDown;
  if (dir.includes("right")) return arrowRight;
  if (dir.includes("left")) return arrowLeft;
}

export function getWeatherIcon(description) {
  const desc = description.toLowerCase();
  if (desc.includes("sunny") || desc.includes("clear")) return sunnyIcon;
  if (desc.includes("partly cloudy")) return partlyCloudyIcon;
  if (desc.includes("cloud")) return cloudyIcon;
  if (desc.includes("rain") && !desc.includes("heavy")) return rainIcon;
  if (desc.includes("heavy rain") || desc.includes("thunderstorm"))
    return heavyRainIcon;
  if (desc.includes("snow")) return snowIcon;
  if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze"))
    return fogIcon;
  if (desc.includes("hot")) return hotIcon;
  return naIcon;
}

export function getMaxTempIcon() {
  return getDirectionIcon("up");
}

export function getMinTempIcon() {
  return getDirectionIcon("down");
}

export function getSunriseIcon() {
  return sunriseIcon;
}

export function getSunsetIcon() {
  return sunsetIcon;
}

export function getHumidityIcon() {
  return humidityIcon;
}

export function getPrecipitationIcon() {
  return precipitationIcon;
}

export function getCloudIcon() {
  return cloudIcon;
}

export function getWindIcon() {
  return windIcon;
}

export function getUVIcon() {
  return uvIcon;
}
