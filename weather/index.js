function getWeather() {
    const apiKey = '69b324327f1febe92e02fcd8e2a0a441';
    const city = document.getElementById('cityInput').value;
    const errorMessageElement = document.getElementById('error-message');

    if (city === '') {
      errorMessageElement.textContent = 'Please enter a city name.';
      clearWeatherInfo();
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
        errorMessageElement.textContent = '';
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        errorMessageElement.textContent = 'City not found. Please enter a valid city name.';
        clearWeatherInfo();
      });
  }

  function displayWeather(data) {
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const windSpeedElement = document.getElementById('wind-speed');

    cityElement.textContent = data.name;
    temperatureElement.textContent = `Temperature: ${data.main.temp} °C`;
    descriptionElement.textContent = `Description: ${data.weather[0].description}`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  }

  function clearWeatherInfo() {
    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const windSpeedElement = document.getElementById('wind-speed');

    cityElement.textContent = '';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    windSpeedElement.textContent = '';
  }