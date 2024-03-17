document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "846bd8b1e03322168d7cde9f27c73d54";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&appid=846bd8b1e03322168d7cde9f27c73d54&units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBttn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"
      }

      const data = await response.json();
      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Km/Hr";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./assets/clouds.png";
      } 
      
      else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./assets/clear.png";
      } 
      
      else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./assets/rain.png";
      }
      
      else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./assets/drizzle.png";
      }

      else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./assets/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";

    } catch (error) {
      console.error("problem with the fetch operation:", error);
    }
  }
  if (searchBttn) {
    searchBttn.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });
  } 
  else {
    console.error("Search button not found!");
  }
});

