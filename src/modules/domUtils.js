let currentSection = null;
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

export function generateHighlightsGrid(
  precipitation,
  humidity,
  wind,
  sunrise,
  sunset,
) {
  const highlightsGrid = document.createElement("section");
  highlightsGrid.classList.add("highlights-grid");

  const precipitationCard = document.createElement("div");
  precipitationCard.classList.add("card", "precipitation");

  const precipitationLabel = document.createElement("p");
  precipitationLabel.classList.add("label");

  const precipitationValue = document.createElement("p");
  precipitationValue.classList.add("value");

  precipitationLabel.textContent = "Precipitation";
  precipitationValue.textContent = precipitation + "%";

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
  humidityValue.textContent = humidity + "%";

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
  windValue.textContent = wind + " KM/H";

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
  sunriseTime.textContent = sunrise + " AM";
  sunsetTime.textContent = sunset + " PM";

  sunTimes.appendChild(sunriseTime);
  sunTimes.appendChild(sunsetTime);
  sundataCard.appendChild(sundataLabel);
  sundataCard.appendChild(sunTimes);
  /*------------------------------------------------------------------------*/

  highlightsGrid.appendChild(precipitationCard);
  highlightsGrid.appendChild(humidityCard);
  highlightsGrid.appendChild(windCard);
  highlightsGrid.appendChild(sundataCard);

  return highlightsGrid;
}

export function generateTemperatureChart(timeArr, tempArr) {
  const tempSection = document.createElement("section");
  tempSection.classList.add("hourly-chart");

  const label = document.createElement("p");
  label.classList.add("label");
  label.textContent = "Temperature";

  const tempChart = document.createElement("div");
  tempChart.classList.add("chart");

  timeArr.forEach((time, i) => {
    const tempBar = createTempBar(time, tempArr[i]);
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

  const timeSpan = document.createElement("span");
  timeSpan.textContent = time;

  dataPt.appendChild(tempBar);
  dataPt.appendChild(timeSpan);

  return dataPt;
}

export function generateRainForecast(timeArr, forecastArr) {
  const rainAside = document.createElement("aside");
  rainAside.classList.add("rain-forecast");

  const label = document.createElement("p");
  label.classList.add("label");
  label.textContent = "Chance of Rain";

  const rainChart = document.createElement("div");
  rainChart.classList.add("rain-chart");

  timeArr.forEach((time, i) => {
    const rainBar = createRainBar(time, forecastArr[i]);
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

  rainLegend.appendChild(rainSwatchSunny);
  rainLegend.appendChild(rainSwatchRainy);
  rainLegend.appendChild(rainSwatchHeavyRain);

  rainAside.appendChild(label);
  rainAside.appendChild(rainChart);
  rainAside.appendChild(rainLegend);

  return rainAside;
}
function createRainBar(time, forecast) {
  const dataPt = document.createElement("div");
  dataPt.classList.add("rain-data-point");

  const timeSpan = document.createElement("span");
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

  const dayNameSpan = document.createElement("span");
  dayNameSpan.classList.add("day-name");
  dayNameSpan.textContent = day;

  const tempMinMaxSpan = document.createElement("span");
  tempMinMaxSpan.classList.add("temp-min-max");

  const minTempSpan = document.createElement("span");
  minTempSpan.textContent = `${minTemp}°C`;

  const maxTempSpan = document.createElement("span");
  maxTempSpan.textContent = `${maxTemp}°C`;

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
  currentSection = sectionName;
}
export function getCurrentSection() {
  return currentSection;
}
