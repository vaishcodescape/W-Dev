// Weather API
const api_key = "aa8575ff233abbf6acd31912523da506";

// Function to get weather
async function getWeather(city) {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(api_url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log(data); // You can remove this for production

    // Update DOM elements
    document.querySelector('.city').innerText = data.name;
    document.querySelector('.temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.querySelector('.humidity').innerText = `${data.main.humidity}%`;
    document.querySelector('.wind').innerText = `${data.wind.speed} km/h`;

    // Update weather icon dynamically
    const weatherMain = data.weather[0].main.toLowerCase();
    const weatherIcon = document.querySelector('.weather-icon');

    if (weatherMain.includes("cloud")) {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherMain.includes("clear")) {
      weatherIcon.src = "images/clear.png";
    } else if (weatherMain.includes("rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (weatherMain.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain.includes("mist")) {
      weatherIcon.src = "images/mist.png";
    } else if (weatherMain.includes("snow")) {
      weatherIcon.src = "images/snow.png";
    } else {
      weatherIcon.src = "images/default.png"; // fallback icon
    }

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("City not found! Please enter a valid city name.");
  }
}

// Event listener for search button
document.querySelector('button').addEventListener('click', () => {
  const city = document.querySelector('input').value.trim();
  if (city !== "") {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Optional: Trigger search when pressing "Enter" key
document.querySelector('input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = document.querySelector('input').value.trim();
    if (city !== "") {
      getWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});