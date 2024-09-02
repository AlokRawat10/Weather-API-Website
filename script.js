//-------------------------background grid-----------------
document.addEventListener("DOMContentLoaded", function() {
    const section = document.querySelector("section");
    const spanCount = 200; // Adjust the number of spans as needed
    for (let i = 0; i < spanCount; i++) {
        const span = document.createElement("span");
        section.appendChild(span);
    }
});







//-------------Const  for API key------------//
const apiKey = 'cbb9b7ee3c5b720e56d69bbf59ca3474'; // Allways replace with your actual OpenWeather.


//---------------------Async/Await with Fetch---------------------//
async function getWeather() {
    //----------------------Template Literals and Const----------------//
    const city = document.getElementById("cityInput").value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        //--------------------Await with Fetch------------------//
        const response = await fetch(url);
        if (!response.ok) {
            //---------------------Throw in Async/Await Contrxt------------//
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //---------------------Destructuring JSON Response----------------//
        const data = await response.json();
        displayWeather(data);
    }catch (error) {
        console.error('Failed to fetch weather data:',error);
        alert('Failed to fetch weather data.');
    }
}

function displayWeather(data) {
    //---------Destructuring for Easier Access to Nested Data--------//
    const {main: {temp,humidity}, weather, wind: {speed}, sys: {country}, name } = data;
    const [{main: weatherMain, description, icon }] = weather;

    //----------- Const DOM Manipulation --------------//
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (data.cod !==200) {
        weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }


//--------------------Template Literals for HTML Generation--------------//
const weatherHTML = `
    <div class="weather-card">
        <div class="temperature">${temp}°</div>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
        <h2>Weather in ${name}, ${country}</h2>
        <div class="description">${weatherMain} (${description})</div>
        <div class="details">
            <div>
                <p>Humidity</p>
                <p>${humidity}%</p>
            </div>
            <div>
                <p>Wind</p>
                <p>${speed} m/s</p>
            </div>
        </div>
    </div>
`;

weatherDisplay.innerHTML = weatherHTML;
}



