const apiKey = "636a13530f55e030983334f5787f92f1";
const URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

// fetch data
async function fetchWeatherData() {
  const response = await fetch(
    URL + `${input.value}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  console.log(data);
  displayWeather(data);
}

// click event
const searchBtn = document.querySelector(".search-btn");
const input = document.getElementById("search-input");

searchBtn.addEventListener("click", () => {
  fetchWeatherData();
});

// display weather
function displayWeather(data) {
  const windSpeedEle = document.querySelector(".wind-speed");
  console.log(windSpeedEle);
  // sky cover
  const weather = data.weather;
  const [{ main: cloudCover }] = weather;
  console.log(cloudCover);
  // temperatures
  const temp = data.main;
  const {
    temp: currentTemp,
    temp_min: minTemp,
    temp_max: maxTemp,
    humidity,
  } = temp;
  console.log(currentTemp, maxTemp, minTemp, humidity);
  // wind speed
  const wind = data.wind;
  const { speed: windSpeed } = wind;
  console.log(windSpeed);

  windSpeedEle.textContent = `Windspeed: ${windSpeed}km/h`;
  // country and city name
}
