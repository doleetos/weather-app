
// get HTML elements
const searchBtn = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");
const mainBody = document.querySelector('body');

const cityName1 = document.getElementById('city-name1');
const cityName2 = document.getElementById('city-name2');
const cityName3 = document.getElementById('city-name3');

const icon1 = document.getElementById('weather-icon1');
const icon2 = document.getElementById('weather-icon2');
const icon3 = document.getElementById('weather-icon3');

const temp1 = document.getElementById('temp1');
const temp2 = document.getElementById('temp2');
const temp3 = document.getElementById('temp3');

const desc1 = document.getElementById('desc1');
const desc2 = document.getElementById('desc2');
const desc3 = document.getElementById('desc3');


// loads and displays data 
window.addEventListener('load', getWeather);
timeOfDay();
searchBtn.addEventListener('click', getWeather);
searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});


// fetch weather API data and display contents on app
function getWeather() {
    let cityValue = searchBox.value;
    if (cityValue == 0) {
        alert('Please enter a city name.');
    } else {
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=imperial`;
        searchBox.value = "";
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                
                cityName1.innerHTML = `${data.city.name} <span>Today</span>`;
                cityName2.innerHTML = `${data.city.name} <span>${timeConverter(data.list[7].dt)}</span>`;
                cityName3.innerHTML = `${data.city.name} <span>${timeConverter(data.list[15].dt)}</span>`;

                icon1.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;
                icon2.src = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@4x.png`;
                icon3.src = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@4x.png`;

                temp1.innerHTML = `${parseInt(data.list[0].main.temp)} °F`;
                temp2.innerHTML = `${parseInt(data.list[7].main.temp)} °F`;
                temp3.innerHTML = `${parseInt(data.list[15].main.temp)} °F`;

                desc1.innerHTML = `${data.list[0].weather[0].description}`;
                desc2.innerHTML = `${data.list[7].weather[0].description}`;
                desc3.innerHTML = `${data.list[15].weather[0].description}`;
              
            })
            .catch(() => { alert('City not found.'); });
    }
}

document.getElementById('carouselExampleIndicators').style.removeProperty("display");

// converts UNIX timestamp to regular date in month day format
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date ;
    return time;
}


// gets user's current time to change background color
function timeOfDay() {
    const d = new Date();
    let hour = d.getHours();
    if (hour < 12 && hour > 5) {
        mainBody.style.background = 'linear-gradient(#F7F7EE, #E6B15D)';
    } else if (hour < 18 && hour >= 12) {
        mainBody.style.background = 'linear-gradient(#FFDCAE, #E28F83)';
    } else {
        mainBody.style.background = 'linear-gradient(#424874, #5E6073)';
    }
}



