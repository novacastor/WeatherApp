const forecasts = [
  {
    day: "Sunday",
    maxTemp: 30,
    minTemp: 20,
    sunrise: "06:13",
    sunset: "19:45",
    humidity: 78,
    precipitation: 50,
    cloudCover: 83,
    wind: 5,
    uv: 4,
  },
  {
    day: "Monday",
    maxTemp: 28,
    minTemp: 18,
    sunrise: "06:12",
    sunset: "19:45",
    humidity: 65,
    precipitation: 20,
    cloudCover: 40,
    wind: 15,
    uv: 7,
  },
  {
    day: "Tuesday",
    maxTemp: 31,
    minTemp: 21,
    sunrise: "06:13",
    sunset: "19:44",
    humidity: 72,
    precipitation: 35,
    cloudCover: 55,
    wind: 10,
    uv: 8,
  },
  {
    day: "Wednesday",
    maxTemp: 25,
    minTemp: 17,
    sunrise: "06:14",
    sunset: "19:42",
    humidity: 60,
    precipitation: 10,
    cloudCover: 30,
    wind: 18,
    uv: 6,
  },
  {
    day: "Thursday",
    maxTemp: 22,
    minTemp: 15,
    sunrise: "06:15",
    sunset: "19:40",
    humidity: 80,
    precipitation: 60,
    cloudCover: 75,
    wind: 22,
    uv: 4,
  },
  {
    day: "Friday",
    maxTemp: 29,
    minTemp: 19,
    sunrise: "06:16",
    sunset: "19:39",
    humidity: 68,
    precipitation: 25,
    cloudCover: 45,
    wind: 12,
    uv: 7,
  },
  {
    day: "Saturday",
    maxTemp: 33,
    minTemp: 23,
    sunrise: "06:17",
    sunset: "19:37",
    humidity: 55,
    precipitation: 5,
    cloudCover: 20,
    wind: 9,
    uv: 9,
  },
  {
    day: "Sunday",
    maxTemp: 27,
    minTemp: 18,
    sunrise: "06:18",
    sunset: "19:35",
    humidity: 70,
    precipitation: 40,
    cloudCover: 60,
    wind: 14,
    uv: 6,
  },
];

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

const locations = [
  {
    city: "Paris",
    country: "France",
    curr_temp: 12,
    highest_temp: 15,
    lowest_temp: 8,
    feelslike: 11,
    day: "Monday",
    time: "14:30",
    weatherDescription: "Partly cloudy",
  },
  {
    city: "New York",
    country: "US",
    curr_temp: 18,
    highest_temp: 22,
    lowest_temp: 14,
    feelslike: 17,
    day: "Tuesday",
    time: "09:15",
    weatherDescription: "Sunny",
  },
  {
    city: "Tokyo",
    country: "Japan",
    curr_temp: 22,
    highest_temp: 30,
    lowest_temp: 20,
    feelslike: 24,
    day: "Wednesday",
    time: "20:45",
    weatherDescription: "Clear sky",
  },
  {
    city: "London",
    country: "UK",
    curr_temp: 9,
    highest_temp: 12,
    lowest_temp: 6,
    feelslike: 8,
    day: "Thursday",
    time: "11:00",
    weatherDescription: "Light rain",
  },
  {
    city: "Sydney",
    country: "Australia",
    curr_temp: 25,
    highest_temp: 29,
    lowest_temp: 21,
    feelslike: 27,
    day: "Friday",
    time: "16:10",
    weatherDescription: "Warm and sunny",
  },
  {
    city: "Cairo",
    country: "Egypt",
    curr_temp: 30,
    highest_temp: 35,
    lowest_temp: 24,
    feelslike: 32,
    day: "Saturday",
    time: "13:50",
    weatherDescription: "Hot and dry",
  },
];

const tempForecastData = [
  { time: "09", temp: 21 },
  { time: "10", temp: 23 },
  { time: "11", temp: 26 },
  { time: "12", temp: 28 },
  { time: "13", temp: 30 },
  { time: "14", temp: 29 },
  { time: "15", temp: 27 },
  { time: "16", temp: 24 },
  { time: "17", temp: 22 },
];

const rainForecastData = [
  { time: "07", precipitation: 10 },
  { time: "10", precipitation: 15 },
  { time: "11", precipitation: 45 },
  { time: "12", precipitation: 80 },
  { time: "13", precipitation: 65 },
  { time: "14", precipitation: 30 },
  { time: "15", precipitation: 10 },
];

export function getTodayHighlights() {
  const today = forecasts[0];
  return {
    precipitation: today.precipitation,
    humidity: today.humidity,
    sunrise: today.sunrise,
    sunset: today.sunset,
    wind: today.wind,
  };
}
export function getLocations() {
  return locations;
}
export function getThemes() {
  return themes;
}
export function getWeekForecast() {
  return forecasts.slice(1, 7);
}
export function getRainForecast() {
  return rainForecastData;
}
export function getTempForecast() {
  return tempForecastData;
}
export function getThreeDayForecast() {
  return forecasts
    .map((forecast) => ({
      day: forecast.day,
      minTemp: forecast.minTemp,
      maxTemp: forecast.maxTemp,
    }))
    .slice(1, 4);
}
