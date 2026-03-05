import { fetchWeatherAPI } from "./apiServices.js";
import {
  shouldFetchFreshData,
  saveToStorage,
  getFromStorage,
} from "./storageUtils.js";

let locations = [];
let currentCity = localStorage.getItem("selectedCity") || "Kolkata";

export const getCurrentLocation = () => {
  return currentCity;
};

export const setCurrentLocation = (cityName) => {
  currentCity = cityName;
  localStorage.setItem("selectedCity", cityName);
};
let themes = [
  "default",
  "aurora",
  "editorial",
  "alpine",
  "ember-spectrum",
  "slate-pro",
  "carbon-dark",
  "notion-clean",
  "midnight-glass",
];

let initialCities = [
  "Srinagar",
  "Guwahati",
  "Kargil",
  "Jammu",
  "Mumbai",
  "Makkah",
  "Jakarta",
  "Beijing",
  "Murshidabad",
];
export const getThemes = () => {
  return themes;
};
export const getLocations = () => {
  return locations;
};

export const initLocations = async () => {
  try {
    const promises = initialCities.map((city) => getData(city, true));
    await Promise.all(promises);
  } catch (error) {
    console.error("Failed to seed initial locations: ", error);
  }
};

export const markForPermanentStorage = (city_name = currentCity) => {
  let location = locations.find(
    (loc) => loc.city.toLowerCase() === city_name.toLowerCase(),
  );
  if (location) {
    location.toSave = true;
  }
};

async function fetchData(city_name = currentCity, to_save = false) {
  const raw = await fetchWeatherAPI(city_name);

  if (!raw) {
    console.log("Data fetch Unsuccessful for: " + city_name);
    return null;
  }

  console.log("Data fetch successful for: " + city_name);

  const currentHourISO = raw.current.time.split(":")[0] + ":00";
  const startIndex = raw.hourly.time.findIndex(
    (time) => time === currentHourISO,
  );
  const safeStart = startIndex !== -1 ? startIndex : 0;

  const newLocationData = {
    toSave: to_save,
    city: city_name,
    country: raw.country,

    current: {
      temperature: Math.round(raw.current.temperature_2m),
      feelslike: Math.round(raw.current.apparent_temperature),
      weatherDescription: getWeatherText(raw.current.weather_code),
      time: raw.current.time.split("T")[1],
    },
    dailyForecast: raw.daily.time.map((date, index) => {
      const dayIndex = index * 24 + 12;
      return {
        day: new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "UTC",
        }),
        maxTemp: Math.round(raw.daily.temperature_2m_max[index]),
        minTemp: Math.round(raw.daily.temperature_2m_min[index]),
        precipitation: raw.daily.precipitation_probability_max[index],
        sunrise: raw.daily.sunrise[index].split("T")[1],
        sunset: raw.daily.sunset[index].split("T")[1],
        wind: Math.round(raw.daily.wind_speed_10m_max[index]),
        humidity: raw.hourly.relative_humidity_2m
          ? raw.hourly.relative_humidity_2m[dayIndex]
          : raw.current.relative_humidity_2m,
        cloudCover: raw.hourly.cloud_cover
          ? raw.hourly.cloud_cover[dayIndex]
          : 0,
      };
    }),
    hourlyForecast: raw.hourly.time
      .slice(safeStart, safeStart + 7)
      .map((time, index) => {
        index = index + safeStart;
        return {
          time: time.split("T")[1].split(":")[0],
          temp: Math.round(raw.hourly.temperature_2m[index]),
          rainChance: raw.hourly.precipitation_probability[index],
        };
      }),
  };
  let locationIndex = locations.findIndex(
    (loc) => loc.city.toLowerCase() === city_name.toLowerCase(),
  );
  if (locationIndex !== -1) {
    locations[locationIndex] = newLocationData;
  } else {
    locations.push(newLocationData);
  }
  saveAllData();
}
async function getData(city_name = currentCity, to_save = false) {
  let locationIndex = locations.findIndex(
    (loc) => loc.city.toLowerCase() === city_name.toLowerCase(),
  );

  const dataKey = `weatherDataFor-${city_name}`;
  const timeKey = `lastFetchFor-${city_name}`;

  if (locationIndex === -1) {
    const cached = getFromStorage(dataKey);
    if (cached) {
      locations.push(cached);
      locationIndex = locations.length - 1;
    }
  }
  if (locationIndex !== -1) {
    if (!shouldFetchFreshData(timeKey)) {
      console.log("Cache hit for: " + city_name);
      return locations[locationIndex];
    } else {
      console.log("Cache expired for: " + city_name);
    }
  }
  await fetchData(city_name, to_save);

  return locations.find(
    (loc) => loc.city.toLowerCase() === city_name.toLowerCase(),
  );
}
function getWeatherText(code) {
  const descriptions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Drizzle",
    61: "Rain",
    71: "Snow",
    80: "Rain Showers",
    95: "Thunderstorm",
  };
  return descriptions[code] || "Cloudy";
}
export const loadData = (city_name = currentCity) => {
  getData(city_name);
};
export const saveAllData = () => {
  locations.forEach((loc) => {
    const dataKey = `weatherDataFor-${loc.city}`;
    const timeKey = `lastFetchFor-${loc.city}`;
    if (loc.toSave) {
      saveToStorage(dataKey, loc);
      saveToStorage(timeKey, Date.now());
    }
  });
};

export const loadCurrentDayHighlights = async (city_name = currentCity) => {
  const data = await getData(city_name);
  if (!data) return null;

  const today = data.dailyForecast[0];
  const now = new Date(Date.now());
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const current_time = `${hours}:${minutes}`;
  return {
    city: data.city,
    country: data.country,
    curr_temp: data.current.temperature,
    feelslike: data.current.feelslike,
    time: current_time,
    weatherDescription: data.current.weatherDescription,
    day: today.day,
    maxTemp: today.maxTemp,
    minTemp: today.minTemp,
    sunrise: today.sunrise,
    sunset: today.sunset,
    precipitation: today.precipitation,
    humidity: today.humidity,
    wind: today.wind,
    cloudCover: today.cloudCover,
  };
};

export const loadHourlyTempForecast = async (city_name = currentCity) => {
  const data = await getData(city_name);
  if (!data) return null;

  return data.hourlyForecast.map((f) => ({
    time: f.time,
    temp: f.temp,
  }));
};

export const loadHourlyRainForecast = async (city_name = currentCity) => {
  const data = await getData(city_name);
  if (!data) return null;

  return data.hourlyForecast.map((f) => ({
    time: f.time,
    precipitation: f.rainChance,
  }));
};

export const loadWeeklyForecast = async (city_name = currentCity) => {
  const data = await getData(city_name);
  if (!data) return null;

  return data.dailyForecast.slice(1, 8);
};

export const loadThreeDayForecast = async (city_name = currentCity) => {
  const data = await getData(city_name);
  if (!data) return null;

  return data.dailyForecast.slice(1, 4).map((f) => ({
    day: f.day,
    minTemp: f.minTemp,
    maxTemp: f.maxTemp,
  }));
};
