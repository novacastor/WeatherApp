export async function getCityImageUrl(name) {
  try {
    const location = encodeURIComponent(name);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${location}&gsrlimit=1&prop=pageimages&pithumbsize=300&format=json&origin=*`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response failed!");
    }

    const data = await response.json();

    if (!data.query || !data.query.pages) {
      console.log("Umm didn't get any data" + data);
      return null;
    }
    const pages = Object.values(data.query.pages);
    const firstPage = pages[0];

    if (!firstPage?.thumbnail?.source) {
      console.log("missing source: " + data);
    }
    return firstPage?.thumbnail?.source || null;
  } catch (error) {
    console.error("Image Fetching failed!" + error);
    return null;
  }
}

export async function fetchWeatherAPI(cityName) {
  const apiKey = "";
  try{
    const location = await getGeoCoordinates(cityName);
    if(!location) {
      return null;
    }
    const {latitude, longitude, name, country} = location;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&timezone=auto`; 
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
    }

    const raw = await response.json();
    return { ...raw, city: name, country: country };
  } catch(error) {
    console.error("Error fetching data for this location " + error);
    return null;
  }
}
export async function verifySearch(name) {
  try{
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=en&format=json`
    );
    const data = await response.json();
    if(data.results && data.results.length > 0) {
      return {
        isValid: true,
        name: data.results[0].name,
        country: data.results[0].country,
      };
    }
    return {isValid: false};
  } catch(error) {
    console.error("Geocoding error: "+ error);
    return {isValid: false};
  }
}
async function getGeoCoordinates(cityName) {
  const location = encodeURIComponent(cityName.trim());
  const url =  `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
  try{
    const response = await fetch(url);
    const data = await response.json();

    return data.results ? data.results[0] : null;
  } catch (error) {
    console.error("Failed to get coordinates for " + cityName +": " + error);
  }
}