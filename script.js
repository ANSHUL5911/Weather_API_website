const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');
const forecastItemsContainer = document.querySelector('.forecast-items-container');

const apiKey = '7340732d64ca65f29096eb31cf06a892';
let isCelsius = true; // Default to Celsius

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
    }
});

async function getFetchData(endPoint, city) {
    try {
        const unit = isCelsius ? 'metric' : 'imperial';
        const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=${unit}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch data:', error);
        alert('Failed to fetch weather data. Please try again later.');
        return null;
    }
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id <= 800) return 'clear.svg';
    return 'clouds.svg';
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'short', day: '2-digit' };
    return currentDate.toLocaleDateString('en-GB', options);
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if (!weatherData || weatherData.cod != 200) {
        showDisplaySection(notFoundSection);
        return;
    }

    const { name: country, main: { temp, humidity }, weather: [{ id, main }], wind: { speed } } = weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = `${Math.round(temp)}°C`;
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = `${humidity}%`;
    windValueTxt.textContent = `${speed} km/h`;

    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `./assets/weather/${getWeatherIcon(id)}`;

    await updateForecastsInfo(city);
    showDisplaySection(weatherInfoSection);
}

async function updateForecastsInfo(city) {
    const forecastsData = await getFetchData('forecast', city);
    if (!forecastsData) return;

    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];

    forecastItemsContainer.innerHTML = '';

    forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastsItems(forecastWeather);
        }
    });
}

function updateForecastsItems(weatherData) {
    const { dt_txt: date, weather: [{ id }], main: { temp } } = weatherData;
    const dateTaken = new Date(date);
    const dateOptions = { day: '2-digit', month: 'short' };
    const dateResult = dateTaken.toLocaleDateString('en-US', dateOptions);

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
        </div>
    `;

    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem);
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection].forEach((section) => {
        section.style.display = 'none';
    });
    section.style.display = 'flex';
}

function setBackgroundBasedOnTime() {
    const now = new Date();
    const hour = now.getHours();
    let backgroundImage;

    if (hour >= 6 && hour < 12) {
        backgroundImage = 'url("assets/backgrounds/morning.jpg")';
    } else if (hour >= 12 && hour < 18) {
        backgroundImage = 'url("assets/backgrounds/afternoon.png")';
    } else if (hour >= 18 && hour < 21) {
        backgroundImage = 'url("assets/backgrounds/evening.png")';
    } else if (hour >= 21 || hour < 6) {
        backgroundImage = 'url("assets/backgrounds/night.png")';
    } else {
        backgroundImage = 'url("assets/backgrounds/morning.png")';
    }

    document.body.style.backgroundImage = backgroundImage;
}

setBackgroundBasedOnTime();

const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', (event) => {
    event.preventDefault();
    const currentCity = countryTxt.textContent;
    if (currentCity) {
        updateWeatherInfo(currentCity);
    }
});

const settingsModal = document.getElementById('settings-modal');
const settingsButton = document.getElementById('settings-button');
const closeModal = document.querySelector('.close-modal');
const settingsForm = document.getElementById('settings-form');

function openModal() {
    settingsModal.style.display = 'flex';
    setTimeout(() => {
        settingsModal.classList.add('active');
    }, 10);
}

function closeModalFunc() {
    settingsModal.classList.remove('active');
    setTimeout(() => {
        settingsModal.style.display = 'none';
    }, 300);
}

settingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
});

closeModal.addEventListener('click', closeModalFunc);

window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        closeModalFunc();
    }
});

settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const unit = document.getElementById('unit').value;
    localStorage.setItem('temperatureUnit', unit);
    alert('Settings saved!');
    closeModalFunc();
});

function updateTemperatureDisplay() {
    const currentTemperature = parseFloat(tempTxt.textContent);
    const unitSwitch = document.getElementById('unit-switch');
    
    if (isCelsius) {
        const fahrenheit = (currentTemperature * 9 / 5) + 32;
        tempTxt.textContent = `${fahrenheit.toFixed(0)} °F`;
        unitSwitch.checked = true;
    } else {
        const celsius = (currentTemperature - 32) * 5 / 9;
        tempTxt.textContent = `${celsius.toFixed(0)} °C`;
        unitSwitch.checked = false;
    }

    document.querySelectorAll('.forecast-item-temp').forEach(tempElement => {
        const forecastTemp = parseFloat(tempElement.textContent);
        if (isCelsius) {
            const fahrenheit = (forecastTemp * 9 / 5) + 32;
            tempElement.textContent = `${fahrenheit.toFixed(0)} °F`;
        } else {
            const celsius = (forecastTemp - 32) * 5 / 9;
            tempElement.textContent = `${celsius.toFixed(0)} °C`;
        }
    });

    isCelsius = !isCelsius;
    localStorage.setItem('isCelsius', isCelsius);
}


const toggleUnitButton = document.createElement('label');
toggleUnitButton.className = 'toggle-switch';
toggleUnitButton.innerHTML = `
    <input type="checkbox" id="unit-switch">
    <span class="slider"></span>
`;
toggleUnitButton.addEventListener('change', (event) => {
    event.preventDefault();
    updateTemperatureDisplay();
});

if (!document.querySelector('.toggle-switch')) {
    const weatherSummaryInfo = document.querySelector('.weather-summary-info');
    weatherSummaryInfo.appendChild(toggleUnitButton);
}


window.addEventListener('DOMContentLoaded', () => {
    const savedUnit = localStorage.getItem('isCelsius');
    if (savedUnit !== null) {
        isCelsius = JSON.parse(savedUnit);
        if (!isCelsius) {
            updateTemperatureDisplay();
            document.getElementById('unit-switch').checked = true;
        }
    }
});
