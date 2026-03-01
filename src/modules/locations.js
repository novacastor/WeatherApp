// import { dependencies } from "webpack";
import * as DOM from "./domElements.js";
import { getCityImageUrl } from "./apiServices";
import { initLocationsListeners } from "./eventHandlers.js";
import { getCurrentSection } from "./domUtils.js";
const locations = [
  {
    city: "Paris",
    temp: 12,
    day: "Monday",
    time: "14:30",
    description: "Partly cloudy",
  },
  {
    city: "New York",
    temp: 18,
    day: "Tuesday",
    time: "09:15",
    description: "Sunny",
  },
  {
    city: "Tokyo",
    temp: 22,
    day: "Wednesday",
    time: "20:45",
    description: "Clear sky",
  },
  {
    city: "London",
    temp: 9,
    day: "Thursday",
    time: "11:00",
    description: "Light rain",
  },
  {
    city: "Sydney",
    temp: 25,
    day: "Friday",
    time: "16:10",
    description: "Warm and sunny",
  },
  {
    city: "Cairo",
    temp: 30,
    day: "Saturday",
    time: "13:50",
    description: "Hot and dry",
  },
];

async function createLocationButton(location) {
  const btn = document.createElement("button");
  btn.classList.add("location-button");

  const citySpan = document.createElement("span");
  citySpan.classList.add("city-name");
  citySpan.textContent = location.city;

  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("weather-info");

  const tempSpan = document.createElement("span");
  tempSpan.classList.add("temperature");
  tempSpan.textContent = location.temp + "°C";

  const descriptionSpan = document.createElement("span");
  descriptionSpan.classList.add("weather-description");
  descriptionSpan.textContent = location.description;

  weatherContainer.appendChild(tempSpan);
  weatherContainer.appendChild(descriptionSpan);

  const dayTimeContainer = document.createElement("div");
  dayTimeContainer.classList.add("day-time");

  const daySpan = document.createElement("span");
  daySpan.classList.add("day");
  daySpan.textContent = location.day;

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("time");
  timeSpan.textContent = location.time;

  dayTimeContainer.appendChild(daySpan);
  dayTimeContainer.appendChild(timeSpan);

  const url = await getCityImageUrl(location.city);
  if (url) {
    btn.style.background = `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
            url("${url}")
        `;
  } else {
    btn.style.background = `
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))
        `;
  }

  btn.appendChild(citySpan);
  btn.appendChild(weatherContainer);
  btn.appendChild(dayTimeContainer);

  return btn;
}

export async function load_locations() {
  DOM.main.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("location-buttons-container");

  const buttons = await Promise.all(
    locations.map((locationData) => createLocationButton(locationData)),
  );
  buttons.forEach((button) => container.appendChild(button));
  if (getCurrentSection() === "locations") {
    DOM.main.appendChild(container);
    initLocationsListeners();
  } else {
    console.log("currentSection: " + getCurrentSection());
  }
}
