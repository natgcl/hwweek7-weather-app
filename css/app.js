function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10){
     hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
   
     if (minutes < 10){
        minutes = `0${muinutes}`;
     }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    let day = days[date.getDay()];
       return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDate();
  let days =["Sun", "Mon", "Tue","Wed", "Thu","Fri","Sat"];
  return days[days];


}

function displayForecast(response) {

let forecast = response.data.daily; 

  let forecastElement = document.querySelector("#forecast");

  
  let forecastHTML = `<div class="row">`;
  

  forecast.forEach(function (forecastDay) {
    forecastHTML =
    forecastHTML +
    `<div class="col-6">
    <ul>
    <li class="forecastday">
    <h2>${formatDay(forecastDay.dt)}</h2>
    </li>
    <li class="forecasticon" >
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" />
    <p>
    <br />
    ClAUDY <br />
    </p>
    </li>
    <li class="forecasttemp">${forecastDay.max}|${forecastDay.max}</li>
    </ul>
    <hr />
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "005492bbca20a72f226defd2b2fda6d2";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}


function displayTemperature (response) {
  console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    
    windElement.innerHTML = response.data.wind.speed;

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].main;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
    iconElement.setAttribute ("alt", response.data.weather[0].description);


    getForecast(response.data.coord)
}


function search(city){
  let apiKey = "005492bbca20a72f226defd2b2fda6d2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?
q=${city}&appid=${apiKey}&units=metric`; 
axios.get(apiUrl).then(displayTemperature); 
}





function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
function displayfahrenheitTemperature(event){
    event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");
     celsiuslink.classList.remove ("active");
      fahrenheitlink.classList.add ("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) /5 + 32;
    temperatureElement.innerHTML = Math.round (fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
   celsiuslink.classList.add ("active");
   fahrenheitlink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrenheitlink = document.querySelector("#fahrenheit-link");

fahrenheitlink.addEventListener("click", displayfahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");

celsiuslink.addEventListener("click", displaycelsiusTemperature);


search("London")



