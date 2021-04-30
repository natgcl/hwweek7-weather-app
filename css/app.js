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


function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

 let forecastHTML = `<div class=columns>`;
 let days = ["Thu", "Fri", "Sat", "Sun"];
 days.forEach(function(day){

 })

forecastHTML =
  forecastHTML = forecastHTML + `
  <div class="row">
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>Mon</h2>
                        </li>
                        <li class="forecasticon" >
                            <img src="http://openweathermap.org/img/wn/04d@2x.png" />
                            <p>
                                <br />
                                ClAUDY <br />
                            </p>
                        </li>
                        <li class="forecasttemp">10|20</li>
                    </ul>
                    <hr />
                </div>
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>TUE</h2>
                        </li>
                        <li class="forecasticon">
                            <img src="http://openweathermap.org/img/wn/10d@2x.png" />
                            <p>
                                <br />
                                RAINY <br />
                            </p>
                        </li>
                        <li class="forecasttemp">20|25</li>
                    </ul>
                    <hr />
                </div>
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>WED</h2>
                        </li>
                        <li class="forecasticon">
                            <img src="http://openweathermap.org/img/wn/01d@2x.png" />
                            <p>
                                <br />
                                SUNNY <br />
                            </p>
                        </li>
                        <li class="forecasttemp">30|35</li>
                    </ul>
                    <hr />
                </div>
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>THU</h2>
                        </li>
                        <li class="forecasticon">
                            <img src="http://openweathermap.org/img/wn/01d@2x.png" />
                            <p>
                                <br />
                                SUNNY <br />
                            </p>
                        </li>
                        <li class="forecasttemp">30|35</li>
                    </ul>
                    <hr />
                </div>
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>Fri</h2>
                        </li>
                        <li class="forecasticon">
                            <img src="http://openweathermap.org/img/wn/11n@2x.png" />
                            <p>
                                <br />
                                THUNDERSTORM <br />
                            </p>
                        </li>
                        <li class="forecasttemp">10|15</li>
                    </ul>
                    <hr />
                </div>
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>SAT</h2>
                        </li>
                        <li class="forecasticon">
                            <img src="http://openweathermap.org/img/wn/10d@2x.png" />
                            <p>
                                <br />
                                RAINY <br />
                            </p>
                        </li>
                        <li class="forecasttemp">10|15</li>
                    </ul>
                    <hr />
                </div>
                <div class="col-6">
                    <ul>
                        <li class="forecastday">
                            <h2>SUN</h2>
                        </li>
                        <li class="forecasticon">
                            <img src="http://openweathermap.org/img/wn/01d@2x.png" />
                            <p>
                                <br />
                                SUNNY <br />
                            </p>
                        </li>
                        <li class="forecasttemp">10|15</li>
                    </ul>
                    <hr />
                </div>
            </div>
            `;
     forecastHTML = forecastHTML+ `</div>`;      

  forecastElement.innerHTML = forecastHTML;
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

    

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].main;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind;
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
    iconElement.setAttribute ("alt", response.data.weather[0].description);

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
displayForecast();


