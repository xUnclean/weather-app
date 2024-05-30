async function fetchWeatherData() {
  const apiUrl = "https://api.pirateweather.net/forecast/NAI36nYDbZW6jN2dZC7Djn0C6UZlFNml/52.520008,%2013.404954";
  const results = await fetch(apiUrl);
  return await results.json();
}         
function fahrenheitToCelsius(fahrenheit) {
  return Number.parseInt((fahrenheit - 32) * 5 / 9);
}

function insertWeatherDataIntoUI(data) {
  const temperatureDisplay = document.querySelector('#temperature');
  temperatureDisplay.innerText = data?.currently?.temperature;
  if (data && data.currently && data.currently.temperature) {
    const temperatureCelsius = fahrenheitToCelsius(data.currently.temperature);
    temperatureDisplay.innerText = `${temperatureCelsius} °C`;
} else {
    temperatureDisplay.innerText = "Keine Temperaturdaten verfügbar";
}
const currentTimeDisplay = document.querySelector('#current-time');
    const unixTimestamp = data?.currently?.time;
    if (unixTimestamp) {
        const { date, time } = convertUnixTimestampToDate(unixTimestamp);
        currentTimeDisplay.innerText = `Datum: ${date}, Uhrzeit: ${time}`;
    } else {
        currentTimeDisplay.innerText = "Keine Zeitdaten verfügbar";
    }
}

document.addEventListener('DOMContentLoaded', async function() {
  const outputDiv = document.getElementById('output');
  const weatherData = await fetchWeatherData();
  outputDiv.innerHTML = `<pre>${JSON.stringify(weatherData, 0, 2)}</pre>`;
  insertWeatherDataIntoUI(weatherData)
});
document.getElementById("button").addEventListener('click', async function(){
  const outputDiv = document.getElementById('output');
  const weatherData = await fetchWeatherData();
  outputDiv.innerHTML = `<pre>${JSON.stringify(weatherData, 0, 2)}</pre>`;
  insertWeatherDataIntoUI(weatherData);
});
function convertUnixTimestampToDate(unixTimestamp) {
  // Unix-Timestamp ist in Sekunden, aber JavaScript Date erwartet Millisekunden
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Monate sind nullbasiert
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  // Formatierte Datum- und Uhrzeit-String
  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { date: formattedDate, time: formattedTime };
}

const { date, time } = convertUnixTimestampToDate(unixTimestamp);
(`Datum: ${date}, Uhrzeit: ${time}`);
