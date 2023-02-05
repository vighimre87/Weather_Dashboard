function getGeoCodes() {
    const cityName = "London";
    const queryURL1 = "http://api.openweathermap.org/geo/1.0/direct?q=London"
    + "&appid=166a433c57516f51dfab1f7edaed8413&limit=5";
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL1);
        console.log(response);
        const latitude = response[0].lat;
        const longitude = response[0].lon;
        console.log(latitude);
        console.log(longitude);
        getWeather(latitude, longitude);
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
        const weatherIcon = response.list[0].weather[0].icon;
        console.log(response.list[0].weather[0].icon);
        const image = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png");
        $("#today").append(image);
        console.log(response.list[0].main.temp);
        console.log(response.list[0].wind.speed);
        console.log(response.list[0].main.humidity);
    });
}

getGeoCodes();