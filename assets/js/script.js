$(document).ready(function () {
  var apiKey = "2c9bcb2e033ed7202d80b7f29fc73541";
  
  $("#search-button").on("click", function () {
    var inputValue = $("#search-input").val();

    if (inputValue) {
      searchForCity(inputValue);
    }
  });

  function searchForCity(cityName) {
    var apiUrl =
      "http://api.openweathermap.org/geo/1.0/direct?" +
      "q=" +
      cityName +
      "&limit=5&appid=" +
      apiKey;
    fetch(apiUrl) 
      .then(function (response) {
        if (!response.ok) {
          console.error("Network response failed");
          return;
        }
        return response.json();
      })
      .then(function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var secondApiUrl =
          "http://api.openweathermap.org/data/2.5/forecast?" +
          "lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          apiKey;
        fetch(secondApiUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            var mainContainer = document.getElementById("current-weather");
            var forecastContainer = document.getElementById("forecast-container");
            var weatherHTML = displayWeatherData(
              data.list[0],
              data.city.name,
              true
            );
            mainContainer.style.height = "auto";
            mainContainer.innerHTML = weatherHTML;
            for (let i = 0; i < 5; i++) {
              var forecastHTML = displayWeatherData(
                data.list[i * 8 + 1],
                data.city.name,
                false
              );
              forecastContainer.style.height = "auto";
              forecastContainer.children[i].innerHTML = forecastHTML;
            }
          });
        $("#search-input").val("");

        function displayWeatherData(data, cityName, isCurrent) {
          var date = dayjs.unix(data.dt);
          var tempF = ((data.main.temp - 273.15) * 9) / 5 + 32;
          tempF = Math.round(tempF * 10) / 10;
          var windSpeed = data.wind.speed;
          var humidity = data.main.humidity;
          var weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          var dateString = date.format("MM/DD/YYYY");
          if (isCurrent) {
            header = "<h2>" + cityName + " (" + dateString + ')<img src="' +weatherIcon +'" alt="' + data.weather[0].description + '" /></h2>';
          } else  {
            header = "<h5>" + dateString + '<img src="' + weatherIcon + '" alt="' + data.weather[0].description + '" /></h5>';
          }
          var weatherDataHTML =
            header +
            "<p>Temp: " +
            tempF +
            " °F</p>" +
            "<p>Wind: " +
            windSpeed +
            " MPH</p>" +
            "<p>Humidity: " +
            humidity +
            "%</p>";

          return weatherDataHTML;
        }
      });
  }
});
