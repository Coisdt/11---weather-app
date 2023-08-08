const apiKey = "636a13530f55e030983334f5787f92f1";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const weatherSection = document.querySelector(".weather-display-section");

// ============= fetch data
async function fetchWeatherData() {
  const response = await fetch(
    URL + `${input.value.trim()}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  console.log(data);

  // error
  errorMessage(data);
}

// ============ click event
const searchBtn = document.querySelector(".search-btn");
const input = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
  fetchWeatherData();
});

// ============ error message
function errorMessage(data) {
  let errorMessageElement = document.querySelector(".error-message");
  const errorCode = data.cod;
  console.log(errorCode);
  const errorMessage = data.message;
  if (errorCode === 200) {
    //please note that the error code for 200 is a number
    errorMessageElement.classList.remove("show-error");
    weatherSection.classList.add("show");
    displayWeather(data);
    showCity(data);
    console.log("200 working");
    input.value = "";
    return;
  } else {
    console.log("200 NOT working");
  }
  if (errorCode === "400" && input.value === "") {
    //please note that the error code for 400 is a string in the fAPI
    weatherSection.classList.remove("show");
    errorMessageElement.classList.add("show-error");
    errorMessageElement.textContent = `Please enter your location!`;
    console.log("400 working");
    input.value = "";
    return;
  } else {
    console.log("400 NOT working");
  }

  if (errorCode === "404") {
    //please note that the error code for 404 is a string in the API
    // this is when the city is not found
    weatherSection.classList.remove("show");
    errorMessageElement.classList.add("show-error");
    errorMessageElement.textContent = `City not found!`;
    console.log("404 working");
    // input.value.trim() = "";
    return;
  } else {
    console.log("404 NOT working");
  }
}

// show city
function showCity(data) {
  const cityNameElement = document.querySelector(".city-name");
  const cityName = data.name;
  const countryData = data.sys;
  const { country } = countryData;
  console.log(cityName);
  cityNameElement.textContent = `${cityName}, ${country}`;
}

// ============ display weather
function displayWeather(data) {
  const windSpeedElement = document.querySelector(".wind-speed");

  // sky cover
  const weather = data.weather;
  const [{ description: cloudCover }] = weather;

  const weatherImg = document.querySelector(".weather-img");
  if (cloudCover === `light rain`) {
    weatherImg.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  }
  if (cloudCover === "clear sky") {
    weatherImg.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
  if (cloudCover === "overcast clouds") {
    weatherImg.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }
  if (cloudCover === "broken clouds") {
    weatherImg.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }
  if (cloudCover === "few clouds") {
    weatherImg.innerHTML = `<i class="fa-solid fa-cloud-sun"></i>`;
  }

  const skyCoverStatus = document.querySelector(".sky-cover-status");

  skyCoverStatus.innerHTML =
    `${cloudCover.charAt(0).toUpperCase()}` + `${cloudCover.slice(1)}`;

  // update time
  const date = new Date();
  const hours = date.getHours();
  const munites = date.getMinutes();

  const timeStamp = document.querySelector(".updated-time");
  timeStamp.innerHTML = `Updated: ${hours}:${munites}`;

  // temperatures
  const temp = data.main;
  const {
    temp: currentTemp,
    temp_min: minTemp,
    temp_max: maxTemp,
    humidity,
  } = temp;
  const temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${Math.floor(
    currentTemp
  )} <span class='deg-c'>°C</span>`;
  const humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: <br> <i class="fa-solid fa-droplet"></i> ${humidity} %`;

  // min and max temperatures
  const minTempElement = document.querySelector(".min-temp");
  const maxTempElement = document.querySelector(".max-temp");

  minTempElement.innerHTML = `Min: ${Math.floor(minTemp)} °C`;
  maxTempElement.innerHTML = `Max: ${Math.floor(maxTemp)} °C`;

  // wind speed
  const wind = data.wind;
  const { speed: windSpeed } = wind;

  windSpeedElement.innerHTML = `Windspeed: <i class="fa-solid fa-wind"></i> ${Math.floor(
    windSpeed
  )} km/h`;

  // sunrise and sunset
  const sunriseElement = document.querySelector(".sunrise");
  const sunsetElement = document.querySelector(".sunset");

  const time = data.sys;
  const { sunrise: sunriseString, sunset: sunsetString } = time;

  const fullSunrise = new Date(sunriseString * 1000);
  const fullSunset = new Date(sunsetString * 1000);

  const riseHours = fullSunrise.getHours();
  const riseMunites = fullSunrise.getMinutes();

  const setHours = fullSunset.getHours();
  const setMunites = fullSunset.getMinutes();

  sunriseElement.innerHTML = `Sunrise: <i class="fa-solid fa-sun"></i> 0${riseHours}:${riseMunites} am`;
  sunsetElement.innerHTML = `Sunset: <i class="fa-solid fa-moon"></i> ${setHours}:${setMunites} pm`;
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeatherData();
  }
});
