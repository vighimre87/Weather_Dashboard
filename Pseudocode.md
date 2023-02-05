## Pseudocode

# Steps to create the application
1. Create the HTML layout
    - header with blue background and white color
    - search bar on the left side (the elements under the horizontal row will dynamically be created with JS)
    - add 5 cards for the 5 days weather forecast
2. style the initial HTML elements
3. identify the elements that we are interacting with, maybe create the variables to store them
4. create a function that displays the current date
5. add an eventListener to the search button
6. Create a function called getGeoCodes() for the first ajax call to get the geocoding data (long, lat, name)
    - store the city name in a variable and save it to the local storage as a key
    - create a variable for the current time so we can find out which 3 hours' data to pull from the API
    - we call the getWeather(lat, lon) function and pass the latitude and longitude as parameters
7. Create a function called getWeather(lat, lon) for the second ajax call where we can get the weather icons, temp (in Kelvin), speed and humidity
    - store the weather datas in variables
    - create the right HTML tags for the weather datas, populate and append them to the right parent element
    - also create a button on the side with last searched city's name and append it to the history div
8. create a function to store the weather datas in the local storage
9. create the event listeners for every single buttons on the side to get the data from local storage and populate the right hand side panel with the data