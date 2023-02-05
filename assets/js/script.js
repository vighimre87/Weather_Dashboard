const weather = {};

$("#search-button").on("click", function(event) {
    event.preventDefault();
    weather.city = $("#search-input").val().trim();
    console.log(weather.city);
    getGeoCodes(weather.city);
})

function getGeoCodes(cityName) {
    const queryURL1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName
    + "&appid=166a433c57516f51dfab1f7edaed8413";
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL1);
        console.log(response);
        weather.lat = response[0].lat;
        weather.lon = response[0].lon;
        console.log(weather.lat);
        console.log(weather.lon);
        getWeather(weather.lat, weather.lon);
    })
}

function getWeather(lat, lon) {
    const queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?" + 
        "lat=" + lat + "&lon=" + lon + "&appid=25397b764a0b6707510b0e079a20c94c";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL2);
        console.log(response);
        weather.icon = response.list[0].weather[0].icon;
        console.log(weather.icon);
        weather.temp = Math.floor(parseFloat(response.list[0].main.temp) - 273.15);
        weather.wind = response.list[0].wind.speed;
        weather.humidity = response.list[0].main.humidity
        console.log("Temp: " + weather.temp + "\u2103");
        console.log("Wind: " + weather.wind + " KPH");
        console.log("Humidity: " + weather.humidity + "%");
        displayTodaysWeather();
    });
}

function displayTodaysWeather() {
    const currentDate = moment().format("l");
    const today = $("#today");
    console.log(currentDate);
    const currentDateAndLocation = $("<h2>").text(weather.city + " (" + currentDate + ")");
    const image = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + weather.icon +"@2x.png");
    currentDateAndLocation.append(image);
    const temp = $("<p>").text("Temp: " + weather.temp + "\u2103");
    const wind = $("<p>").text("Wind: " + weather.wind + " KPH");
    const humidity = $("<p>").text("Humidity: " + weather.humidity + "%");
    today.append(currentDateAndLocation, temp, wind, humidity);
}
