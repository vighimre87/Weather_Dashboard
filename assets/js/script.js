// Declaring variables and targeting HTML elements that we are interacting with

// Create a weather object to save the city name and the geolocation datas
const weather = {};
const today = $("#today");
const searchInput = $("#search-input");
const searchBtn = $("#search-button");
const history = $("#history");
const forecast = $("#forecast");
const userEntries = [];

// Creating an event listener for the search button to get the city name and call the getGeoCodes function with the city name
searchBtn.on("click", function(event) {
    event.preventDefault();
    const lettersAndSpace = /^[A-Za-z\s]*$/;
    const onlyLetters = /^[A-Za-z\s]+$/;
    if (!searchInput.val().trim().match(onlyLetters) || !searchInput.val().trim().match(lettersAndSpace)) {
        alert("Invalid input! Please enter a valid city name!");
    } else {
        weather.city = searchInput.val().trim();
        searchInput.val("");
        userEntries.push(weather.city);
        // console.log(weather.city);
        getGeoCodes(weather.city);
    }
})

// Create a function to get longitudes and langitudes to pass them to the getWeather function 
function getGeoCodes(cityName) {
    const queryURL1 = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName
    + "&appid=166a433c57516f51dfab1f7edaed8413";
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        // console.log(queryURL1);
        // console.log(response);
        weather.lat = response[0].lat;
        weather.lon = response[0].lon;
        // console.log(weather.lat);
        // console.log(weather.lon);

        // Create a button for the historic data
        // console.log(userEntries);
        userEntries.forEach(function(userEntry) {
            // console.log(userEntry);
            if (JSON.parse(localStorage.getItem(userEntry)) !== null) {
                // console.log("Item is already in local storage");
            } else {
                const cityButton = $("<button class='btn btn-secondary cityBtn' style='margin-bottom: 10px; width: 60%;'></button>").text(weather.city);
                cityButton.attr("data-city", weather.city);
                history.append(cityButton);
            }
        });



        // Save city name, longitude and latitude in the local storage for the history
        localStorage.setItem(weather.city, JSON.stringify(weather));
        getWeather(weather.lat, weather.lon);
    })
}

// Create a function to get the weather datas from the weather API and display them in HTML elements
function getWeather(lat, lon) {
    const queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + 
        "lat=" + lat + "&lon=" + lon + "&appid=25397b764a0b6707510b0e079a20c94c";
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        // Empty the data containers before to display the new datas
        today.empty();
        forecast.empty();
        // Display the current weather datas
        let currentDate = moment().format('DD/MM/YYYY');
        const currentDateAndLocation = $("<h2>").text(weather.city + " (" + currentDate + ")");
        const currentImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon +"@2x.png");
        currentDateAndLocation.append(currentImage);
        const currentTemp = $("<p>").text("Temp: " + Math.floor(parseFloat(response.list[0].main.temp) - 273.15) + "\u2103");
        const currentWind = $("<p>").text("Wind: " + response.list[0].wind.speed + " KPH");
        const currentHumidity = $("<p>").text("Humidity: " + response.list[0].main.humidity + "%");
        today.append(currentDateAndLocation, currentTemp, currentWind, currentHumidity);
        today.attr("style", "border: 1px solid rgb(35, 34, 34); padding: 15px; background-color: rgb(168, 150, 126);");

        // Display the 5-day weather forecast
        const forecastHeader = $("<h4>").text("5-Day Forecast:");
        const cardDeck = $("<div class='card-deck'></div>");
        forecast.append(forecastHeader, cardDeck);
        let currentForecastDay;
        let daysToAdd = 1;
        // Dynamically create the weather cards inside a foor lop, populate and append them to the right HTML elements
        for (let i = 8; i<response.list.length; i=i+8) {
            const card = $("<div class='card' style='width: 200px; color: white; background-color: rgb(51, 51, 137);'></card>");
            cardDeck.append(card);
            const cardBody = $("<div class='card-body'></div>");
            card.append(cardBody);
            currentForecastDay = moment().add(daysToAdd, "days").format("DD/MM/YYYY");
            // console.log(currentForecastDay);
            const cardTitle = $("<h5 class='card-title'></h5>").text(currentForecastDay);
            daysToAdd++;
            const image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon +"@2x.png");
            const temp = $("<p>").text("Temp: " + Math.floor(parseFloat(response.list[i].main.temp) - 273.15) + "\u2103");
            const wind = $("<p>").text("Wind: " + response.list[i].wind.speed + " KPH");
            const humidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%");
            cardBody.append(cardTitle, image, temp, wind, humidity);
        }
        const card = $("<div class='card' style='width: 200px; color: white; background-color: rgb(51, 51, 137);'></card>");
        cardDeck.append(card);
        const cardBody = $("<div class='card-body'></div>");
        card.append(cardBody);
        currentForecastDay = moment().add(daysToAdd, "days").format("DD/MM/YYYY");
        const cardTitle = $("<h5 class='card-title'></h5>").text(currentForecastDay);
        const image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[response.list.length-1].weather[0].icon +"@2x.png");
        const temp = $("<p>").text("Temp: " + Math.floor(parseFloat(response.list[response.list.length-1].main.temp) - 273.15) + "\u2103");
        const wind = $("<p>").text("Wind: " + response.list[response.list.length-1].wind.speed + " KPH");
        const humidity = $("<p>").text("Humidity: " + response.list[response.list.length-1].main.humidity + "%");
        cardBody.append(cardTitle, image, temp, wind, humidity);
});
}

// Create a function to display the history buttons
function displayHistoryButtons() {
    const userCities = Object.keys(localStorage);
    userCities.forEach(function(city) {
        if (city === "debug") {}
        else {
        const cityButton = $("<button class='btn btn-secondary cityBtn' style='margin-bottom: 10px; width: 60%;'></button>").text(city);
        cityButton.attr("data-city", city);
        history.append(cityButton);
    }
    });
}

displayHistoryButtons();

// Add an event listener to the history buttons
history.on("click", ".cityBtn", function(event) {
    event.preventDefault();
    weather.city = $(this).attr("data-city");
    userEntries.push(weather.city);
    getGeoCodes(weather.city);
})