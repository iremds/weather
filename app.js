const havaDurumu = document.querySelector('.havaDurumu'); // Class name corrected
const sehir = document.querySelector('#sehir'); // Corrected selector to match id
const card = document.querySelector('.card');
const apiKey = '90ff7e6929d5e5fcac974848169a3c2f';

havaDurumu.addEventListener('submit', async event => {
    event.preventDefault();

    const city = sehir.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData); // Fixed function name typo
        } catch (error) {
            console.error(error);
            displayError(error.message);
        }
    }
    else {
        displayError('Lütfen bir şehir girin');
    }
});

async function getWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);

    if(!response.ok){ //ok true anlamında ! false yapıyo
        throw new Error('Veri alınamadı');
    }       
    return await response.json();
}

function displayWeatherInfo(data){ // Fixed function name typo
    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]
    } = data;
    card.textContent = '';
    card.style.display= 'flex';

    const cityDisplay = document.createElement('h2');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherDisplay = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Sıcaklık: ${(temp - 273.15).toFixed(2)}°C`; // Kelvin to Celsius
    humidityDisplay.textContent = `Nem: ${humidity}%`;
    descDisplay.textContent = description;
    weatherDisplay.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherDisplay.classList.add('weatherEmoji');

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherDisplay);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "⛄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "💨";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}