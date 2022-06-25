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

                  
                  