export function generateHighlightsGrid(
  precipitation,
  humidity,
  wind,
  sunrise,
  sunset,
) {
  const precipitationCard = document.createElement("div");
  const precipitationLabel = document.createElement("p");
  const precipitationValue = document.createElement("p");

  precipitationCard.classList.add("card", "precipitation");
  precipitationLabel.classList.add("label");
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

  return { precipitationCard, humidityCard, windCard, sundataCard };
}
