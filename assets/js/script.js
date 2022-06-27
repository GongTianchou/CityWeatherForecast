// var searchBtn = document.querySelector("#searchBtn");
// var currentWeather = document.getElementById("current");
// var inputEl = document.getElementById("input");
// var userArray = [];
function homePage() {
    var apiKey = "3177effc51222679245922783d077adf";
      const inputEl = document.getElementById("city-input");
      const searchEl = document.getElementById("search-button");
      const clearEl = document.getElementById("clear-history");
      const nameEl = document.getElementById("city-name");
      const photoEl = document.getElementById("photo");
      const TempEl = document.getElementById("temperature");
      const HumidityEl = document.getElementById("humidity");
      const windEl = document.getElementById("windSpeed");
      const UVEl = document.getElementById("UV-index");
      const historyEl = document.getElementById("history");
      let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

      const APIKey = 'b9b6473a9278d7b2a79b1934480d6bb0';
      
      function getWeather(cityName) {
          
          let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
          axios.get(queryURL)
              .then(function(response) {
                  const currentDate = new Date(response.data.dt * 1000);
                  const day = currentDate.getDate();
                  const month = currentDate.getMonth() + 1;
                  const year = currentDate.getFullYear();
                  nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                  let weatherPic = response.data.weather[0].icon;
                  photoEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                  photoEl.setAttribute("alt", response.data.weather[0].description);
                  TempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                  HumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                  windEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                  let lat = response.data.coord.lat;
                  let lon = response.data.coord.lon;
                  let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
                  axios.get(UVQueryURL)
                      .then(function(response) {
                          let UVIndex = document.createElement("span");
                          UVIndex.setAttribute("class", "badge badge-danger");
                          UVIndex.innerHTML = response.data[0].value;
                          UVEl.innerHTML = "UV Index: ";
                          UVEl.append(UVIndex);
                      });

                  
                  let cityID = response.data.id;
                  let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                  axios.get(forecastQueryURL)
                      .then(function(response) {

                          
                          const forecastEls = document.querySelectorAll(".forecast");
                          for (i = 0; i < forecastEls.length; i++) {
                              forecastEls[i].innerHTML = "";
                              const forecastIndex = i * 8 + 4;
                              const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                              const forecastDay = forecastDate.getDate();
                              const forecastMonth = forecastDate.getMonth() + 1;
                              const forecastYear = forecastDate.getFullYear();
                              const forecastDateEl = document.createElement("p");
                              forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                              forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                              forecastEls[i].append(forecastDateEl);
                              const forecastWeatherEl = document.createElement("img");
                              forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                              forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                              forecastEls[i].append(forecastWeatherEl);
                              
                              const forecastTempEl = document.createElement("p");
                              forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                              forecastEls[i].append(forecastTempEl);
                              
                              const forecastWindEl = document.createElement("p");
                              forecastWindEl.innerHTML = "Wind: " + response.data.list[forecastIndex].wind.speed + " MPH";
                              forecastEls[i].append(forecastWindEl);
                              
                              const forecastHumidityEl = document.createElement("p");
                              forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                              forecastEls[i].append(forecastHumidityEl);
                          }
                      })
              });
      }

      searchEl.addEventListener("click", function() {
          const searchTerm = inputEl.value;
          getWeather(searchTerm);
          searchHistory.push(searchTerm);
          localStorage.setItem("search", JSON.stringify(searchHistory));
          renderSearchHistory();
      })

      clearEl.addEventListener("click", function() {
          searchHistory = [];
          renderSearchHistory();
      })

      function k2f(K) {
          return Math.floor((K - 273.15) * 1.8 + 32);
      }

      function renderSearchHistory() {
          historyEl.innerHTML = "";
          for (let i = 0; i < searchHistory.length; i++) {
              const historyItem = document.createElement("input");
              
              historyItem.setAttribute("type", "text");
              historyItem.setAttribute("style", "margin-bottom: 7px;")
              historyItem.setAttribute("readonly", true);
              historyItem.setAttribute("class", "form-control-sm d-block bg-secondary");
              historyItem.setAttribute("value", searchHistory[i]);
              historyItem.addEventListener("click", function() {
                  getWeather(historyItem.value);
              })
              historyEl.append(historyItem);
          }
      }

      displaySearchHistory();
      if (searchHistory.length > 0) {
          getWeather(searchHistory[searchHistory.length - 1]);
      }
  }
  homePage();