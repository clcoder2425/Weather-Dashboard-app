
function GetInfo() {
    var newName = document.getElementById("cityInput").value;
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName + "--";
    var weatherIcon = document.querySelectorAll("img");
    var currentDay = document.getElementById("currentDay");
    var dayMin = document.getElementById("dayMin");
    var dayMax = document.getElementById("dayMax");

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName + '&appid=17aa77e5f4b69a04ed8710ebd2feeb9e')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Display current day
            const todayIndex = new Date().getDay();
            currentDay.innerHTML = "Today: " + weekday[todayIndex];
            //Display current temp_min and temp_max
            let tempMinCelsius = data.list[1].main.temp_min - 273.15;
            let tempMinFahrenheit = tempMinCelsius * 9 / 5 + 32;
            let tempMaxCelsius = data.list[1].main.temp_max - 273.15;
            let tempMaxFahrenheit = tempMaxCelsius * 9 / 5 + 32;
            dayMin.innerHTML = "Min: " + tempMinFahrenheit.toFixed(2) + "°F";
            dayMax.innerHTML = "Max: " + tempMaxFahrenheit.toFixed(2) + "°F";

            // Getting the temperature for the upcoming days
            for (let i = 1; i < 6; i++) {
                let tempMinCelsius = data.list[i].main.temp_min - 273.15;
                let tempMinFahrenheit = tempMinCelsius * 9 / 5 + 32;
                document.getElementById("day" + i + "Min").innerHTML = "Min: " + tempMinFahrenheit.toFixed(2) + "°F";

               let tempMaxCelsius = data.list[i].main.temp_max - 273.15;
                let tempMaxFahrenheit = tempMaxCelsius * 9 / 5 + 32;
                document.getElementById("day" + i + "Max").innerHTML = "Max: " + tempMaxFahrenheit.toFixed(2) + "°F";
            }

            // display weather icons

            for (let i = 1; i < 6; i++) {
                let icon = data.list[i].weather[1].icon;
                weatherIcon[i].src = "https://openweathermap.org/img/wn/" + icon + ".png";
            } 
        })
        .catch(err => {
            console.log("error: ", err);
        });
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "London";
    GetInfo();
}

// Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (let i = 0; i < 5; i++) {
    document.getElementById("Day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

