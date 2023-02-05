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
    - inside of the eventlistener we make the first ajax call to get the geocoding data (long, lat, name)
    - store the city name in a variable and save it to the local storage as a key
    - create a variable for the current time so we can 
    - in the .then() we can pass those datas to make the other ajax call for the weather datas ()