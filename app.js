const result = document.getElementById("result");
const result2 = document.getElementById("result2");
const result3 = document.getElementById("result3");
const searchBtn = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");
const greetings = document.getElementById('greeting');
const mainBody = document.querySelector('body');

function timeOfDay() {
    const d = new Date('August 19, 1975 23:15:30');
    let hour = d.getHours();
    if (hour < 11) {
        mainBody.style.background = 'linear-gradient(#F7F7EE, #E6B15D)';
    } else if (hour < 18) {
        mainBody.style.background = 'linear-gradient(#FFDCAE, #E28F83)';
    } else {
        mainBody.style.background = 'linear-gradient(#424874, #5E6073)';
    }
}
timeOfDay()

let getWeather = () => {
    let cityValue = searchBox.value;
    if(cityValue == 0) {
        alert('Please enter a city name.');
    } else {
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=imperial`;
        searchBox.value="";
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                result.innerHTML = `<h1 class="city-name">${data.city.name} <span>Today</span></h1>
                                    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" />
                                    <h1 class="temp">${parseInt(data.list[0].main.temp)} °F</h1>
                                    <h3 class="desc">${data.list[0].weather[0].description}</h3>
                                    `; 
                result2.innerHTML = `<h1 class="city-name">${data.city.name} <span>${timeConverter(data.list[7].dt)}</span></h1>
                                    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@4x.png" />
                                    <h1 class="temp">${parseInt(data.list[7].main.temp)} °F</h1>
                                    <h3 class="desc">${data.list[7].weather[0].description}</h3>
                                    `;
                result3.innerHTML = `<h1 class="city-name">${data.city.name} <span>${timeConverter(data.list[15].dt)}</span></h1>
                                    <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@4x.png" />
                                    <h1 class="temp">${parseInt(data.list[15].main.temp)} °F</h1>
                                    <h3 class="desc">${data.list[15].weather[0].description}</h3>
                                    `;                              
            })                      
            .catch(() => {alert('City not found.');});
        }
}
searchBtn.addEventListener('click', getWeather);
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather()
    }
});
window.addEventListener('load', getWeather);



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date ;
    return time;
}
